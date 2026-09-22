import type { NextConfig } from "next";
import { allowedImageHosts } from "./src/lib/image-hosts";

/**
 * `next/image` only optimises remote images from allow-listed hosts, and throws
 * for anything else. The host list lives in `src/lib/image-hosts.ts` so the
 * runtime `<SafeImage>` fallback and this config can never disagree.
 */
const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    formats: ["image/avif", "image/webp"],
    qualities: [50, 55, 64, 72, 75],
    remotePatterns: allowedImageHosts().flatMap((hostname) => [
      { protocol: "https" as const, hostname },
      { protocol: "http" as const, hostname },
    ]),
  },
};

export default nextConfig;
