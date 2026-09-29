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
  "admin.everestchronicle.com",
];

function apiImageOrigin(): string {
  const configured = process.env.EC_API_BASE_URL?.trim();

  if (configured) {
    try {
      return new URL(configured).origin;
    } catch {
      // Fall back to the environment default below.
    }
  }

  return process.env.NODE_ENV === "production"
    ? "https://admin.everestchronicle.com"
    : "https://admin-chronicle.test";
}

export function resolveImageSrc(src?: string | null): string | null {
  if (!src) {
    return null;
  }

  const trimmed = src.trim();

  if (trimmed.startsWith("/uploads/")) {
    return new URL(trimmed, apiImageOrigin()).toString();
  }

  return trimmed;
}

export function allowedImageHosts(): string[] {
  const hosts = new Set<string>(DEFAULT_HOSTS);

  try {
    hosts.add(new URL(apiImageOrigin()).hostname);
  } catch {
    // Ignore malformed values rather than failing the build.
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
  const resolvedSrc = resolveImageSrc(src);

  if (!resolvedSrc) {
    return false;
  }

  if (resolvedSrc.startsWith("/") && !resolvedSrc.startsWith("//")) {
    return true;
  }

  try {
    return allowedImageHosts().includes(new URL(resolvedSrc).hostname);
  } catch {
    return false;
  }
}
