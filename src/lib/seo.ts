import type { Metadata } from "next";

/**
 * Single source of truth for canonical identity and structured data.
 *
 * Every page must produce its own self-canonical URL. Never derive canonical
 * identity from the request host (localhost/staging must never leak into
 * deployed metadata), and never let a child page inherit the homepage
 * canonical — see docs/seo-page-element-architecture.md §8, §68, §74.
 */

export const SITE_URL = "https://everestchronicle.com";
export const SITE_NAME = "Everest Chronicle";

export const DEFAULT_TITLE =
  "Everest Chronicle | Journalism & Stories from the Himalaya";
export const DEFAULT_DESCRIPTION =
  "Independent reporting, climate investigation, and authentic visual storytelling from Nepal and across the high Himalayas.";

/** Absolute production URL for a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}

/**
 * Turns a `page` search param into the canonical path for a paginated
 * listing. Page 1 is the bare path; later pages keep their own URL so they
 * are not collapsed into page 1 (docs §26).
 */
export function paginatedPath(basePath: string, page: number): string {
  return page > 1 ? `${basePath}?page=${page}` : basePath;
}

export interface PageSeo {
  /** Page title without the brand suffix; the root template adds it. */
  title?: string;
  description?: string;
  /** Site-relative canonical path, e.g. `/category/conservation`. */
  path: string;
  robots?: Metadata["robots"];
  type?: "website" | "article" | "profile";
  images?: { url: string; width?: number; height?: number; alt?: string }[];
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  keywords?: string[];
}

/**
 * Builds page metadata with the canonical URL and `og:url` always aligned
 * (docs §31, §75). Callers must not set `alternates` themselves.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  robots,
  type = "website",
  images,
  publishedTime,
  modifiedTime,
  authors,
  keywords,
}: PageSeo): Metadata {
  const canonical = path;
  const ogTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;

  return {
    title,
    description: description ?? DEFAULT_DESCRIPTION,
    keywords,
    alternates: { canonical },
    ...(robots ? { robots } : {}),
    ...(authors && authors.length > 0
      ? { authors: authors.map((name) => ({ name })) }
      : {}),
    openGraph: {
      title: ogTitle,
      description: description ?? DEFAULT_DESCRIPTION,
      url: absoluteUrl(canonical),
      siteName: SITE_NAME,
      locale: "en_US",
      type,
      ...(images && images.length > 0 ? { images } : {}),
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: description ?? DEFAULT_DESCRIPTION,
      ...(images && images.length > 0
        ? { images: images.map((image) => image.url) }
        : {}),
    },
  };
}

/* ── Structured data ────────────────────────────────────────────────────── */

export interface JsonLdNode {
  "@type": string;
  [key: string]: unknown;
}

export function organizationJsonLd() {
  return {
    "@type": "NewsMediaOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/brand/logo.png"),
      width: 827,
      height: 1024,
    },
    sameAs: [
      "https://instagram.com",
      "https://facebook.com",
      "https://youtube.com",
      "https://x.com",
    ],
    description: DEFAULT_DESCRIPTION,
  };
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export interface BreadcrumbEntry {
  name: string;
  /** Site-relative path; omit for the current (last) item. */
  path?: string;
}

export function breadcrumbJsonLd(entries: BreadcrumbEntry[]) {
  return {
    // A standalone document, so it carries its own `@context` — without it the
    // BreadcrumbList is not valid JSON-LD and Google ignores it.
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: entries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      ...(entry.path ? { item: absoluteUrl(entry.path) } : {}),
    })),
  };
}

export interface NewsArticleSeo {
  path: string;
  headline: string;
  description?: string;
  images: string[];
  datePublished?: string;
  dateModified?: string;
  authors: { name: string; slug?: string }[];
  section?: string;
}

/**
 * `NewsArticle` describing the visible article (docs §19). Every value here
 * must match what the page actually shows.
 */
export function newsArticleJsonLd({
  path,
  headline,
  description,
  images,
  datePublished,
  dateModified,
  authors,
  section,
}: NewsArticleSeo) {
  const canonical = absoluteUrl(path);

  return {
    "@type": "NewsArticle",
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    headline,
    ...(description ? { description } : {}),
    image: images,
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(section ? { articleSection: section } : {}),
    author: authors.map((author) => ({
      "@type": "Person",
      name: author.name,
      ...(author.slug ? { url: absoluteUrl(`/author/${author.slug}`) } : {}),
    })),
    publisher: { "@id": `${SITE_URL}/#organization` },
    url: canonical,
  };
}

/** Wraps nodes in a single `@graph` document. */
export function jsonLdGraph(nodes: JsonLdNode[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
