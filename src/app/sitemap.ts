import type { MetadataRoute } from "next";
import { IS_EC_API_CONFIGURED, getSitemapEntries } from "@/lib/ec-api";

const baseUrl = "https://everestchronicle.com";

const fallbackRoutes = [
    "",
    "category/expeditions",
    "category/environment",
    "category/conservation",
    "category/travel",
    "category/media",
    "nepals-next-rescue-should-not-be-a-body-recovery",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!IS_EC_API_CONFIGURED) {
    return fallbackRoutes.map((route) => ({
    url: route ? `${baseUrl}/${route}` : baseUrl,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));
  }

  try {
    const entries = await getSitemapEntries();

    return entries.map((entry) => ({
      url: new URL(entry.path, baseUrl).toString(),
      lastModified: entry.lastModified ? new Date(entry.lastModified) : new Date(),
      changeFrequency: entry.changeFrequency ?? "weekly",
      priority: entry.priority ?? 0.7,
    }));
  } catch {
    return fallbackRoutes.map((route) => ({
      url: route ? `${baseUrl}/${route}` : baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: route === "" ? 1.0 : 0.8,
    }));
  }
}
