import type { MetadataRoute } from "next";
import { getNavigationItems, getSitemapEntries } from "@/lib/ec-api";
import { SITE_URL } from "@/lib/seo";

/**
 * Only canonical, indexable URLs belong here (docs §46, §75). That means:
 *
 * - no `/login` (it is `noindex`),
 * - no search or parameter variants,
 * - no 404 URLs,
 * - every entry a self-canonical production URL.
 */
const INDEXABLE_STATIC_ROUTES: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [{ path: "/", priority: 1, changeFrequency: "daily" }];

/** Paths that must never be advertised to crawlers. */
const EXCLUDED_PREFIXES = ["/login", "/api/", "/search"];

function isIndexable(path: string): boolean {
  return !EXCLUDED_PREFIXES.some((prefix) => path.startsWith(prefix));
}

function toEntry(
  path: string,
  lastModified?: string | null
): MetadataRoute.Sitemap[number] {
  return {
    /*
      Next normalises the homepage canonical to the bare origin, so the sitemap
      uses the same form. Every other path resolves to a slash-free URL, which
      matches its canonical exactly (docs §75).
    */
    url: path === "/" ? SITE_URL : new URL(path, SITE_URL).toString(),
    lastModified: lastModified ? new Date(lastModified) : new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let entries: Awaited<ReturnType<typeof getSitemapEntries>> = [];
  let navPaths: string[] = [];

  try {
    entries = await getSitemapEntries();
  } catch (error) {
    /*
     * The content API can fail independently of this deployment. Letting that
     * throw would fail the whole `next build` (sitemap.xml is prerendered), so
     * degrade gracefully and surface the cause in the server log.
     */
    console.error("[sitemap] content API unavailable:", error);
  }

  /*
    The navigation endpoint is cached separately from the sitemap endpoint, so
    using it as a secondary source keeps the section landing pages advertised
    even when `/api/ec/sitemap` is down or incomplete.
  */
  try {
    const navItems = await getNavigationItems();
    navPaths = navItems.flatMap((item) => [
      item.href,
      ...(item.children ?? []).map((child) => child.href),
    ]);
  } catch (error) {
    console.error("[sitemap] navigation API unavailable:", error);
  }

  const byUrl = new Map<string, MetadataRoute.Sitemap[number]>();

  for (const { path, priority, changeFrequency } of INDEXABLE_STATIC_ROUTES) {
    const entry = toEntry(path);
    byUrl.set(entry.url, { ...entry, priority, changeFrequency });
  }

  for (const path of navPaths) {
    if (!isIndexable(path)) continue;
    const entry = toEntry(path);
    if (!byUrl.has(entry.url)) byUrl.set(entry.url, entry);
  }

  for (const entry of entries) {
    if (!isIndexable(entry.path)) continue;
    const mapped = toEntry(entry.path, entry.lastModified);
    byUrl.set(mapped.url, {
      ...mapped,
      changeFrequency: entry.changeFrequency ?? mapped.changeFrequency,
      priority: entry.priority ?? mapped.priority,
    });
  }

  return [...byUrl.values()];
}
