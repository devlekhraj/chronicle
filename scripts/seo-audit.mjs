#!/usr/bin/env node
/**
 * Automated SEO validation (docs/seo-page-element-architecture-updated.md §64).
 *
 * Run against a running server — `next dev`, or `next start` for a realistic
 * check (prefetching and the proxy behave differently in dev):
 *
 *   npm run seo:audit -- http://localhost:3000
 *
 * Exits non-zero when a check fails, so it can gate CI.
 */

const BASE = (process.argv[2] || process.env.SEO_AUDIT_BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const PRODUCTION_HOST = "everestchronicle.com";

/** Top-level paths served by dedicated routes rather than an article slug. */
const RESERVED = new Set([
  "api", "author", "brand", "category", "favicon.ico", "fonts", "images",
  "login", "manifest.webmanifest", "media", "robots.txt", "sitemap.xml",
  "_next",
]);

const failures = [];
const warnings = [];
const fail = (m) => failures.push(m);
const warn = (m) => warnings.push(m);

async function fetchPage(path) {
  const url = path.startsWith("http") ? path : `${BASE}${path}`;
  try {
    const response = await fetch(url, { redirect: "manual" });
    return { status: response.status, body: await response.text(), url };
  } catch (error) {
    fail(`${path}: request failed (${error.message}). Is a server running at ${BASE}?`);
    return null;
  }
}

/** Server-rendered DOM only — the RSC payload duplicates markup in <script>. */
const dom = (html) => html.replace(/<script[\s\S]*?<\/script>/g, "");

const count = (html, tag) =>
  (html.match(new RegExp(`<${tag}(?=[\\s>/])`, "g")) || []).length;

const attr = (html, re) => (html.match(re) || [])[1];

function ldJsonBlocks(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((m) => {
      try {
        return JSON.parse(m[1].replace(/\\u003c/g, "<"));
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

function nodesOf(doc) {
  const ctx = doc["@context"];
  return doc["@graph"]
    ? doc["@graph"].map((n) => ({ ctx, ...n }))
    : [{ ctx, ...doc }];
}

/* ── Shared checks ──────────────────────────────────────────────────────── */

function checkCommon(path, html, { expectIndexable }) {
  const body = dom(html);

  if (!/<title>[^<]+<\/title>/.test(html)) fail(`${path}: no <title>`);

  const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/);
  if (expectIndexable && !canonical) {
    fail(`${path}: indexable page has no canonical`);
  }
  if (canonical && /localhost|127\.0\.0\.1|\.test\b|\.local\b/.test(canonical)) {
    fail(`${path}: canonical points at a non-production host (${canonical})`);
  }
  if (canonical && path !== "/") {
    const isHomepage = canonical.replace(/\/$/, "") === `https://${PRODUCTION_HOST}`;
    if (isHomepage) fail(`${path}: canonical points to the homepage`);
  }

  const h1 = count(body, "h1");
  if (h1 === 0) fail(`${path}: no H1`);
  if (h1 > 1) fail(`${path}: ${h1} H1 elements (expected exactly one)`);

  if (count(body, "main") !== 1) {
    fail(`${path}: ${count(body, "main")} <main> elements (expected exactly one)`);
  }

  // Navigation must not be built from headings (docs §3).
  for (const nav of body.match(/<nav[\s\S]*?<\/nav>/g) || []) {
    if (/<h[1-6](?=[\s>/])/.test(nav)) {
      fail(`${path}: a <nav> contains a heading element`);
    }
  }

  for (const doc of ldJsonBlocks(html)) {
    for (const node of nodesOf(doc)) {
      if (!node.ctx) fail(`${path}: JSON-LD "${node["@type"]}" has no @context`);
    }
  }

  const robots = attr(html, /<meta name="robots" content="([^"]*)"/) || "";
  return { body, canonical, robots, noindex: robots.includes("noindex") };
}

function checkArticle(path, html, common) {
  const docs = ldJsonBlocks(html).flatMap(nodesOf);
  const article = docs.find((n) => n["@type"] === "NewsArticle");

  if (!article) {
    fail(`${path}: article has no NewsArticle JSON-LD`);
  } else {
    if (!article.headline) fail(`${path}: NewsArticle has no headline`);
    const mainEntity = article.mainEntityOfPage?.["@id"];
    if (common.canonical && mainEntity && mainEntity !== common.canonical) {
      fail(`${path}: NewsArticle mainEntityOfPage (${mainEntity}) != canonical (${common.canonical})`);
    }
    if (!article.image || article.image.length === 0) {
      warn(`${path}: NewsArticle has no image`);
    }
  }

  // The hero image must carry meaningful alt text (docs §16).
  const hero = attr(html, /<img[^>]*class="article-hero[^"]*"[^>]*alt="([^"]*)"/)
    || attr(html, /<img[^>]*alt="([^"]*)"[^>]*class="article-hero/);
  if (hero !== undefined && hero.trim().length === 0) {
    warn(`${path}: hero image has empty alt text`);
  }

  const bc = docs.find((n) => n["@type"] === "BreadcrumbList");
  if (bc && !(bc.itemListElement || []).length) {
    warn(`${path}: BreadcrumbList has no items`);
  }
}

/* ── Run ────────────────────────────────────────────────────────────────── */

const home = await fetchPage("/");
if (!home) {
  report();
  process.exit(1);
}

const homeCommon = checkCommon("/", home.body, { expectIndexable: true });
if (home.status !== 200) fail(`/: expected 200, got ${home.status}`);
if (homeCommon.noindex) fail("/: homepage is noindex");
if (!homeCommon.canonical) fail("/: homepage has no canonical");

// Discover a representative article and category from the homepage's links.
const links = [...home.body.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1]);
const articlePath = links.find((href) => {
  const slug = href.slice(1);
  return slug && !slug.includes("/") && !slug.includes(".") && !RESERVED.has(slug);
});
const categoryPath = links.find((href) => href.startsWith("/category/") && href !== "/category/media");

if (!articlePath) {
  warn("could not discover an article link on the homepage; skipping article checks");
} else {
  const page = await fetchPage(articlePath);
  if (page) {
    if (page.status !== 200) fail(`${articlePath}: expected 200, got ${page.status}`);
    const common = checkCommon(articlePath, page.body, { expectIndexable: true });
    if (common.noindex) fail(`${articlePath}: article is noindex`);
    checkArticle(articlePath, page.body, common);
  }
}

if (categoryPath) {
  const page = await fetchPage(categoryPath);
  if (page) {
    if (page.status !== 200) fail(`${categoryPath}: expected 200, got ${page.status}`);
    const common = checkCommon(categoryPath, page.body, { expectIndexable: true });
    if (common.noindex) fail(`${categoryPath}: category is noindex`);
    if (count(dom(page.body), "h2") === 0) {
      warn(`${categoryPath}: no H2 section headings on a listing page`);
    }
  }
}

// Login must stay out of the index.
const login = await fetchPage("/login");
if (login) {
  const { noindex } = checkCommon("/login", login.body, { expectIndexable: false });
  if (!noindex) fail("/login: expected noindex, follow");
  if (attr(login.body, /<link rel="canonical" href="([^"]*)"/)) {
    const canonical = attr(login.body, /<link rel="canonical" href="([^"]*)"/);
    if (canonical.includes(PRODUCTION_HOST) && canonical.endsWith("/login") === false) {
      warn(`/login: canonical should be the login URL (${canonical})`);
    }
  }
}

// A missing article must be a real 404 (docs §28).
const missing = await fetchPage("/seo-audit-definitely-missing-9f3a1");
if (missing) {
  if (missing.status !== 404) {
    fail(`/seo-audit-definitely-missing-9f3a1: expected 404, got ${missing.status}`);
  } else {
    const body = dom(missing.body);
    if (count(body, "h1") !== 1) warn("404 page should expose exactly one H1");
    if (/<link rel="canonical"/.test(missing.body)) {
      fail("404 page must not emit a canonical");
    }
  }
}

// Sitemap: absolute production URLs, no noindex paths.
const sitemap = await fetchPage("/sitemap.xml");
if (sitemap) {
  if (sitemap.status !== 200) fail(`/sitemap.xml: expected 200, got ${sitemap.status}`);
  const locs = [...sitemap.body.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1]);
  if (locs.length === 0) fail("/sitemap.xml: contains no URLs");
  for (const loc of locs) {
    if (!loc.startsWith(`https://${PRODUCTION_HOST}`)) {
      fail(`/sitemap.xml: non-canonical or non-production URL (${loc})`);
    }
    if (/\/login|\/search|\/api\//.test(loc)) {
      fail(`/sitemap.xml: contains a non-indexable path (${loc})`);
    }
  }
  if (!locs.some((l) => l.replace(/\/$/, "") === `https://${PRODUCTION_HOST}`)) {
    warn("/sitemap.xml: no homepage entry");
  }
}

/* ── Report ─────────────────────────────────────────────────────────────── */

function report() {
  for (const w of warnings) console.warn(`warn  ${w}`);
  for (const f of failures) console.error(`FAIL  ${f}`);
  console.log(
    `\nseo audit against ${BASE}: ${failures.length} failure(s), ${warnings.length} warning(s)`
  );
}

report();
process.exit(failures.length > 0 ? 1 : 0);
