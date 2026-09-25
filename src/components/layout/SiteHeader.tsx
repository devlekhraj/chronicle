"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronLeft, Search, User } from "lucide-react";
import SearchModal from "@/components/search/SearchModal";
import type { NavigationItem } from "@/lib/ec-api";

interface HeaderNavItem {
  title: string;
  slug: string;
  href: string;
  children?: HeaderNavItem[];
}

function navItemSlug(item: { href: string; title?: string; label?: string }) {
  const slug = item.href.split("/").filter(Boolean).pop();

  return slug || (item.title || item.label || "").toLowerCase().replace(/\s+/g, "-");
}

function normalizeNavItems(items: NavigationItem[]): HeaderNavItem[] {
  return [
    { title: "Home", slug: "home", href: "/" },
    ...items.map((item) => ({
      title: item.label,
      slug: item.slug || navItemSlug(item),
      href: item.href,
      children: item.children && item.children.length > 0
        ? item.children.map((child) => ({
            title: child.label,
            slug: child.slug || navItemSlug(child),
            href: child.href,
          }))
        : undefined,
    })),
  ];
}

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
  navigationItems?: NavigationItem[];
}

/**
 * Resolves `usePathname()` inside a Suspense boundary.
 *
 * The header is shared chrome rendered from the root layout, including on the
 * synthesized `/_not-found` route, which is prerendered at build time where no
 * pathname exists. Reading the hook directly in that render blocked the
 * prerender, so not-found requests were answered with a 500 and a
 * client-rendered body. Suspending here lets the fallback render the complete
 * header instead — identical markup, only active-nav highlighting is deferred.
 */
function PathnameReader({
  children,
}: {
  children: (pathname: string | null) => React.ReactNode;
}) {
  const pathname = usePathname();
  return <>{children(pathname)}</>;
}

export default function SiteHeader({ activeSlug, navigationItems }: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileAccordions, setOpenMobileAccordions] = useState<Record<string, boolean>>({});
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  const toggleMobileAccordion = (slug: string) => {
    setOpenMobileAccordions((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  const navItems = useMemo(
    () => normalizeNavItems(navigationItems ?? []),
    [navigationItems],
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 80);

      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setReadingProgress(
        docHeight > 0 ? Math.min(100, (scrollY / docHeight) * 100) : 0,
      );
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

  const renderHeader = (pathname: string | null) => {
    // Only show the progress bar on article detail pages.
    const isArticlePage =
      pathname !== null &&
      pathname !== "/" &&
      pathname !== "" &&
      !pathname.startsWith("/category");

    // Compute the active category when one is not explicitly passed.
    const currentCategory =
      activeSlug ||
      (pathname === null
        ? ""
        : pathname === "/"
          ? "home"
          : pathname.startsWith("/category/")
            ? pathname.split("/")[2] || ""
            : "");

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
            <div className="mobile-header-actions">
              <button
                type="button"
                className="mobile-action-link"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Find Story"
              >
                <Search size={18} strokeWidth={2.2} aria-hidden="true" />
                <span>Find Story</span>
              </button>
              <Link
                href="/login"
                className="mobile-action-link mobile-action-link--icon-only"
                aria-label="Login"
              >
                <User size={18} strokeWidth={2} aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Desktop Navigation Wrap */}
          <div className="nav-wrap desktop-only">
            <div className="nav-left">
              {isScrolled && <Logo className="nav-sticky-logo" />}

              <nav aria-label="Primary navigation">
                <ul className="nav-list">
                  {navItems.map((item) => {
                    const hasChildren = Boolean(item.children && item.children.length > 0);
                    const isParentActive = currentCategory === item.slug;
                    const isChildActive = hasChildren && item.children?.some((child) => currentCategory === child.slug);
                    const isActive = item.slug === "home" ? pathname === "/" : (isParentActive || isChildActive);

                    if (hasChildren) {
                      return (
                        <li key={item.slug} className="nav-dropdown-wrap">
                          <Link
                            href={item.href}
                            className={`nav-dropdown-trigger ${isActive ? "is-active" : ""}`}
                          >
                            <span>{item.title}</span>
                            <ChevronDown size={14} strokeWidth={2.2} className="nav-dropdown-chevron" aria-hidden="true" />
                          </Link>
                          <ul className="nav-dropdown-menu">
                            {item.children!.map((child) => {
                              const isSubActive = currentCategory === child.slug;
                              return (
                                <li key={child.slug}>
                                  <Link
                                    href={child.href}
                                    className={isSubActive ? "is-active" : ""}
                                  >
                                    {child.title}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </li>
                      );
                    }

                    return (
                      <li key={item.slug}>
                        <Link
                          href={item.href}
                          className={isActive ? "is-active" : ""}
                        >
                          {item.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            <div className="nav-actions">
              <button
                type="button"
                className="nav-action-link"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Find Story"
              >
                <Search size={16} strokeWidth={2} aria-hidden="true" />
                <span>Find Story</span>
              </button>

              <Link
                href="/login"
                className={`nav-action-link ${pathname === "/login" ? "is-active" : ""}`}
              >
                <User size={16} strokeWidth={2} aria-hidden="true" />
                <span>Login</span>
              </Link>
            </div>
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
              <ChevronLeft size={24} strokeWidth={2.8} stroke="#2a836a" aria-hidden="true" />
            </button>
          </div>

          <div className="mobile-drawer-search-box">
            <button
              type="button"
              className="mobile-drawer-search-trigger"
              onClick={() => {
                setIsMenuOpen(false);
                setIsSearchOpen(true);
              }}
            >
              <Search size={18} strokeWidth={2.2} aria-hidden="true" />
              <span>Search stories, authors, topics...</span>
            </button>
          </div>

          <nav className="mobile-drawer-nav" aria-label="Mobile navigation">
            <ul className="mobile-nav-list">
              {navItems.map((item) => {
                const hasChildren = Boolean(item.children && item.children.length > 0);
                const isParentActive = currentCategory === item.slug;
                const isChildActive = hasChildren && item.children?.some((child) => currentCategory === child.slug);
                const isActive = item.slug === "home" ? pathname === "/" : (isParentActive || isChildActive);

                if (hasChildren) {
                  const isOpen = Boolean(openMobileAccordions[item.slug]);
                  return (
                    <li key={item.slug} className="mobile-nav-group">
                      <button
                        type="button"
                        className="mobile-nav-link mobile-nav-accordion-btn"
                        onClick={() => toggleMobileAccordion(item.slug)}
                        aria-expanded={isOpen}
                      >
                        <span className={isActive ? "active-indicator" : ""}>{item.title}</span>
                        <ChevronDown
                          size={16}
                          strokeWidth={2.2}
                          className={`accordion-chevron ${isOpen ? "is-open" : ""}`}
                          aria-hidden="true"
                        />
                      </button>
                      {isOpen && (
                        <ul className="mobile-subnav-list">
                          <li key={`${item.slug}-all`}>
                            <Link
                              href={item.href}
                              onClick={() => setIsMenuOpen(false)}
                              className={`mobile-subnav-link ${currentCategory === item.slug ? "is-active" : ""}`}
                            >
                              All {item.title}
                            </Link>
                          </li>
                          {item.children!.map((child) => (
                            <li key={child.slug}>
                              <Link
                                href={child.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={`mobile-subnav-link ${currentCategory === child.slug ? "is-active" : ""}`}
                              >
                                {child.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                }

                return (
                  <li key={item.slug}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`mobile-nav-link ${isActive ? "is-active" : ""}`}
                    >
                      {isActive ? (
                        <span className="active-indicator">{item.title}</span>
                      ) : (
                        item.title
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                setIsSearchOpen(true);
              }}
              className="mobile-nav-link mobile-nav-find-link"
            >
              <Search size={17} strokeWidth={2} aria-hidden="true" />
              <span>Find Story</span>
            </button>

            <Link
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className={`mobile-nav-link mobile-nav-login-link ${pathname === "/login" ? "is-active" : ""}`}
            >
              <User size={17} strokeWidth={2} aria-hidden="true" />
              <span>Login</span>
            </Link>
          </nav>
        </div>

        {/* Search Modal */}
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />
        </>
    );
  };

  /*
    The fallback renders the same header with `pathname === null`: full markup
    and links, just no active-nav highlighting until the value resolves.
  */
  return (
    <Suspense fallback={renderHeader(null)}>
      <PathnameReader>{renderHeader}</PathnameReader>
    </Suspense>
  );
}
