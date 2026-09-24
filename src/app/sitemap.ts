import type { MetadataRoute } from "next";
import { getSitemapEntries } from "@/lib/ec-api";

const baseUrl = "https://everestchronicle.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await getSitemapEntries();

  return entries.map((entry) => ({
    url: new URL(entry.path, baseUrl).toString(),
    lastModified: entry.lastModified ? new Date(entry.lastModified) : new Date(),
    changeFrequency: entry.changeFrequency ?? "weekly",
    priority: entry.priority ?? 0.7,
  }));
}
