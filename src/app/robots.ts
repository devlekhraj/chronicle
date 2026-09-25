import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * `robots.txt` only controls crawling; it is not a substitute for canonical
 * tags or `noindex` (docs §10). Utility endpoints are disallowed because they
 * are not pages. Anything that must be *seen* to be de-indexed (for example a
 * `noindex` page) is deliberately left crawlable.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
