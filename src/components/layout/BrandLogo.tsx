import Link from "next/link";

interface BrandLogoProps {
  className?: string;
}

export default function BrandLogo({ className = "" }: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 focus:outline-none ec-brand-logo text-[24px] sm:text-[28px] md:text-[32px] ${className}`}
      aria-label="Everest Chronicle Home"
    >
      {/* Triangular Brand Mark = Brand 100 */}
      <svg
        className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 shrink-0 transition-transform duration-200 group-hover:scale-105"
        style={{ color: "var(--ec-brand-100)" }}
        viewBox="0 0 100 100"
        fill="currentColor"
        aria-hidden="true"
      >
        <polygon points="0,100 100,0 100,100" />
      </svg>

      {/* Logo Typography: Roboto Condensed, Medium 500, 32px, 1.2 line height, -2% tracking */}
      <span className="inline-flex items-center tracking-[-0.02em] uppercase leading-[1.2]">
        <span style={{ color: "var(--ec-brand-100)" }}>EVEREST</span>
        <span className="ml-1.5" style={{ color: "var(--ec-dark-100)" }}>
          CHRONICLE
        </span>
      </span>
    </Link>
  );
}
