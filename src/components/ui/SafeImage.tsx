import Image from "next/image";
import { isOptimizableImageSrc } from "@/lib/image-hosts";

interface SafeImageProps {
  src?: string | null;
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  loading?: "eager" | "lazy";
  quality?: number;
}

/**
 * Renders `next/image` when the source points at a configured host, and a plain
 * `<img>` otherwise.
 *
 * `next/image` throws for unconfigured remote hosts, which turns a single
 * unexpected media URL into a 500 for the entire route (or a failed static
 * build). Downgrading to a plain `<img>` keeps the page working and makes a
 * misconfigured host a degraded image rather than an outage.
 */
export default function SafeImage({
  src,
  alt,
  width,
  height,
  className,
  sizes,
  priority = false,
  loading = "lazy",
  quality,
}: SafeImageProps) {
  if (!src) {
    return null;
  }

  if (!isOptimizableImageSrc(src)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- host is not in images.remotePatterns
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={priority ? "eager" : loading}
        decoding="async"
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : loading}
      quality={quality}
    />
  );
}
