"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const navItems = [
  { title: "Expeditions", slug: "expeditions" },
  { title: "Environment", slug: "environment" },
  { title: "Conservation", slug: "conservation" },
  { title: "Travel", slug: "travel" },
];

export const mediaDropdownItems = [
  { title: "Dataviz", slug: "dataviz" },
  { title: "3D", slug: "3d" },
  { title: "Video", slug: "video" },
  { title: "Photography", slug: "photography" },
];

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`logo-link ${className}`}
      aria-label="Everest Chronicle Home"
    >
      <img
        src="/brand/logo.svg"
        alt="Everest Chronicle"
        width={256}
        height={26}
        className="brand-logo-img"
      />
    </Link>
  );
}

export function HorizontalLogo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`horizontal-logo ${className}`}
      aria-label="Everest Chronicle Home"
    >
      <img
        src="/brand/logo.svg"
        alt="Everest Chronicle"
        width={217}
        height={22}
        className="horizontal-logo-img"
      />
    </Link>
  );
}

interface SiteHeaderProps {
  activeSlug?: string;
}

export default function SiteHeader({ activeSlug }: SiteHeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMediaOpen, setIsMobileMediaOpen] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  // Only show progress bar on article detail pages
  const isArticlePage = !pathname.startsWith("/category") && pathname !== "/" && pathname !== "";

  // Compute active category if not explicitly passed
  const currentCategory =
    activeSlug ||
    (pathname.startsWith("/category/expeditions")
      ? "expeditions"
      : pathname.startsWith("/category/environment")
        ? "environment"
        : pathname.startsWith("/category/conservation")
          ? "conservation"
          : pathname.startsWith("/category/travel")
            ? "travel"
            : pathname.startsWith("/category/media") || pathname.startsWith("/media")
              ? "media"
              : "");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 80);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setReadingProgress(docHeight > 0 ? Math.min(100, (scrollY / docHeight) * 100) : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Upper tier: Centered Brand Logo (Desktop only) */}
      <div className="header-logo-row desktop-only">
        <Logo />
      </div>

      {/* Navigation Bar: Sticky on Desktop, Compact on Mobile */}
      <header className={`sticky-nav-bar ${isScrolled ? "is-scrolled" : ""}`}>
        {/* Reading Progress Bar */}
        {isArticlePage && (
          <div
            className="reading-progress-bar"
            style={{ width: `${readingProgress}%` }}
            role="progressbar"
            aria-valuenow={Math.round(readingProgress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Reading progress"
          />
        )}
        {/* Mobile Header Bar */}
        <div className="mobile-header-bar">
          <button
            type="button"
            className="hamburger-btn"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
          </button>
          <HorizontalLogo />
        </div>

        {/* Desktop Navigation Wrap */}
        <div className="nav-wrap desktop-only">
          <div className="nav-left">
            {isScrolled && <Logo className="nav-sticky-logo" />}

            <nav>
              {navItems.map((item) => {
                const isActive = currentCategory === item.slug;
                return (
                  <Link
                    href={`/category/${item.slug}`}
                    key={item.slug}
                    className={isActive ? "is-active" : ""}
                  >
                    {item.title}
                  </Link>
                );
              })}
              <div className="nav-dropdown-wrap">
                <Link
                href="/category/media"
                  className={`nav-dropdown-trigger ${
                    currentCategory === "media" ? "is-active" : ""
                  }`}
                >
                  Media
                </Link>
                <div className="nav-dropdown-menu">
                  {mediaDropdownItems.map((item) => (
                    <Link href={`/media/${item.slug}`} key={item.slug}>
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>

          <form className="search" role="search" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="site-search-input" className="sr-only">
              Search Everest Chronicle
            </label>
            <input
              id="site-search-input"
              aria-label="Search"
              placeholder="Search"
            />
            <button aria-label="Submit search" type="button">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </form>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      <div
        className={`mobile-drawer-overlay ${isMenuOpen ? "is-open" : ""}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Drawer Menu */}
      <div
        className={`mobile-drawer ${isMenuOpen ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="mobile-drawer-top">
          <button
            type="button"
            className="mobile-drawer-back"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2a836a"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="15 19 8 12 15 5" />
            </svg>
          </button>
        </div>

        <div className="mobile-drawer-search-box">
          <form
            className="mobile-drawer-search"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              setIsMenuOpen(false);
            }}
          >
            <label htmlFor="drawer-search-input" className="sr-only">
              Search
            </label>
            <input
              id="drawer-search-input"
              aria-label="Search"
              placeholder="Search"
            />
            <button aria-label="Submit search" type="submit">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </form>
        </div>

        <nav className="mobile-drawer-nav">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className={`mobile-nav-link ${pathname === "/" ? "is-active" : ""}`}
          >
            {pathname === "/" ? (
              <span className="active-indicator">Home</span>
            ) : (
              "Home"
            )}
          </Link>
          {navItems.map((item) => {
            const isActive = currentCategory === item.slug;
            return (
              <Link
                key={item.slug}
                href={`/category/${item.slug}`}
                onClick={() => setIsMenuOpen(false)}
                className={`mobile-nav-link ${isActive ? "is-active" : ""}`}
              >
                {isActive ? (
                  <span className="active-indicator">{item.title}</span>
                ) : (
                  item.title
                )}
              </Link>
            );
          })}

          <div className="mobile-nav-group">
            <button
              type="button"
              className="mobile-nav-link mobile-nav-accordion-btn"
              onClick={() => setIsMobileMediaOpen(!isMobileMediaOpen)}
              aria-expanded={isMobileMediaOpen}
            >
              <span>Media</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`accordion-chevron ${isMobileMediaOpen ? "is-open" : ""}`}
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {isMobileMediaOpen && (
              <div className="mobile-subnav-list">
                {mediaDropdownItems.map((item) => (
                  <Link
                    href={`/media/${item.slug}`}
                    key={item.slug}
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsMobileMediaOpen(false);
                    }}
                    className="mobile-subnav-link"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
