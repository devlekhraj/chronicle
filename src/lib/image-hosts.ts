/**
 * Hosts `next/image` is allowed to optimise.
 *
 * Kept in one module because both `next.config.ts` (which fills
 * `images.remotePatterns`) and the runtime `<SafeImage>` fallback need the same
 * answer. `next/image` throws for any host that is not configured, and that
 * error takes down the whole route with a 500, so the two must never disagree.
 *
 * Hosts are environment-driven so production can serve media from a CDN without
 * a code change.
 */

const DEFAULT_HOSTS = [
  "admin-chronicle.test",
];

export function allowedImageHosts(): string[] {
  const hosts = new Set<string>(DEFAULT_HOSTS);

  const apiBaseUrl = process.env.EC_API_BASE_URL;

  if (apiBaseUrl) {
    try {
      hosts.add(new URL(apiBaseUrl).hostname);
    } catch {
      // Ignore malformed values rather than failing the build.
    }
  }

  for (const host of (process.env.EC_MEDIA_HOSTS ?? "").split(",")) {
    const trimmed = host.trim();

    if (trimmed) {
      hosts.add(trimmed);
    }
  }

  return [...hosts];
}

/**
 * Whether `next/image` can be handed this source.
 *
 * Site-relative paths are always fine. Anything else must resolve to a
 * configured host; callers fall back to a plain `<img>` when it does not.
 */
export function isOptimizableImageSrc(src?: string | null): boolean {
  if (!src) {
    return false;
  }

  if (src.startsWith("/") && !src.startsWith("//")) {
    return true;
  }

  try {
    return allowedImageHosts().includes(new URL(src).hostname);
  } catch {
    return false;
  }
}
