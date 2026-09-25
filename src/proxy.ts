import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import http from "node:http";
import https from "node:https";

/**
 * Article existence check, run before the response is rendered.
 *
 * Under Cache Components every dynamic route streams its static shell first,
 * so by the time a page calls `notFound()` the response status is already
 * committed as 200. That produced a "soft 404" for browsers and a 500 for some
 * crawler user-agents. Checking here — before any HTML is flushed — lets a
 * missing slug be rewritten to the not-found route, which answers with a real
 * 404 (docs §28).
 *
 * The check is a plain HTTP request because `fetch` cache options have no
 * effect inside Proxy, so results are memoised in-process instead.
 */

const API_BASE_URL =
  process.env.EC_API_BASE_URL || "https://admin-chronicle.test";

const API_TIMEOUT_MS = 4000;

/** How long a slug's existence result is reused within this instance. */
const CACHE_TTL_MS = 5 * 60 * 1000;

/** Bound the map so a crawler cannot grow it without limit. */
const CACHE_MAX_ENTRIES = 500;

/**
 * Top-level segments owned by dedicated routes. These must never be treated
 * as article slugs even though they are single-segment paths.
 */
const RESERVED_SEGMENTS = new Set([
  "api",
  "author",
  "brand",
  "category",
  "favicon.ico",
  "fonts",
  "images",
  "login",
  "manifest.webmanifest",
  "media",
  "robots.txt",
  "sitemap.xml",
  "_next",
]);

const existenceCache = new Map<string, { exists: boolean; at: number }>();

/** Upstream status for an article slug, or `null` when unreachable. */
function requestStatus(slug: string): Promise<number | null> {
  const url = new URL(
    `/api/ec/articles/${encodeURIComponent(slug)}`,
    API_BASE_URL
  );

  return new Promise((resolve) => {
    const transport = url.protocol === "https:" ? https : http;
    const request = transport.request(
      url,
      {
        method: "HEAD",
        headers: { Accept: "application/json" },
        // Mirrors the API client: local Valet/Herd hosts use self-signed certs.
        rejectUnauthorized:
          process.env.EC_API_ALLOW_SELF_SIGNED !== "false" &&
          url.hostname.endsWith(".test")
            ? false
            : undefined,
      },
      (response) => {
        response.resume();
        resolve(response.statusCode ?? null);
      }
    );

    request.setTimeout(API_TIMEOUT_MS, () => {
      request.destroy();
      resolve(null);
    });
    request.on("error", () => resolve(null));
    request.end();
  });
}

async function articleExists(slug: string): Promise<boolean> {
  const cached = existenceCache.get(slug);
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) {
    return cached.exists;
  }

  const status = await requestStatus(slug);

  /*
   * Fail open. An API outage or an endpoint that rejects HEAD must not turn
   * every article URL into a 404; the page itself will surface the real error.
   */
  if (status === null || (status !== 200 && status !== 404)) {
    return true;
  }

  const exists = status !== 404;

  if (existenceCache.size >= CACHE_MAX_ENTRIES) {
    const oldest = existenceCache.keys().next().value;
    if (oldest !== undefined) existenceCache.delete(oldest);
  }
  existenceCache.set(slug, { exists, at: Date.now() });

  return exists;
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const slug = pathname.replace(/^\//, "");

  if (
    !slug ||
    slug.includes("/") ||
    slug.includes(".") ||
    RESERVED_SEGMENTS.has(slug)
  ) {
    return NextResponse.next();
  }

  if (await articleExists(slug)) {
    return NextResponse.next();
  }

  // Rewrite (not redirect) so the URL stays put. The not-found route already
  // answers with HTTP 404 and renders the site chrome.
  return NextResponse.rewrite(new URL(`/_not-found${search}`, request.url));
}

export const config = {
  /*
    Only single-segment paths can be article slugs. Everything with a deeper
    path, an extension, or a framework prefix is skipped.
  */
  matcher: ["/((?!_next/|api/)[^/]*)"],
};
