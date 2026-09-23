import type { NextConfig } from "next";
import { allowedImageHosts } from "./src/lib/image-hosts";

/**
 * `next/image` only optimises remote images from allow-listed hosts, and throws
 * for anything else. The host list lives in `src/lib/image-hosts.ts` so the
 * runtime `<SafeImage>` fallback and this config can never disagree.
 */
const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheLife: {
    navigation: {
      stale: 3600,
      revalidate: 1800,
      expire: 86400,
    },
    content: {
      stale: 300,
      revalidate: 300,
      expire: 86400,
    },
    listing: {
      stale: 60,
      revalidate: 60,
      expire: 3600,
    },
    longLived: {
      stale: 86400,
      revalidate: 3600,
      expire: 604800,
    },
  },
  images: {
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== "production",
    formats: ["image/avif", "image/webp"],
    qualities: [50, 55, 64, 72, 75],
    remotePatterns: allowedImageHosts().flatMap((hostname) => [
      { protocol: "https" as const, hostname },
      { protocol: "http" as const, hostname },
    ]),
  },
};

export default nextConfig;
