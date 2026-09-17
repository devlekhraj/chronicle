import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://everestchronicle.com";
  const routes = [
    "",
    "category/expeditions",
    "category/environment",
    "category/conservation",
    "category/travel",
    "category/media",
    "nepals-next-rescue-should-not-be-a-body-recovery",
  ].map((route) => ({
    url: route ? `${baseUrl}/${route}` : baseUrl,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  return routes;
}
