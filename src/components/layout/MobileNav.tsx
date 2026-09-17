"use client";

import { useState } from "react";
import Link from "next/link";
import SearchBox from "@/components/ui/SearchBox";
import { type NavigationItem } from "@/data/navigation";

interface MobileNavProps {
  items: NavigationItem[];
}

export default function MobileNav({ items }: MobileNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Mobile Bar */}
      <div className="flex items-center justify-between py-2">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline-flex items-center gap-2 p-1.5 text-[var(--ec-text-default-weak)] hover:text-[var(--ec-text-brand-strong)] focus:outline-none cursor-pointer"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
          <span className="text-sm font-medium font-sans">Menu</span>
        </button>

        <div className="flex items-center">
          <SearchBox className="max-w-[150px] sm:max-w-[170px]" />
        </div>
      </div>

      {/* Collapsible Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-[var(--ec-stroke-dark-more-weaker)] bg-[var(--ec-surface-base)] px-2 py-4">
          <ul className="space-y-1">
            {items.map((item) => {
              if (item.children) {
                return (
                  <li key={item.label} className="pt-2 border-t border-[var(--ec-stroke-dark-more-weaker)]">
                    <span className="block text-xs font-semibold uppercase tracking-wider text-[var(--ec-text-default-faded)] px-2 py-1">
                      {item.label}
                    </span>
                    <ul className="pl-3 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-1.5 px-2 text-base text-[var(--ec-text-default-weak)] hover:text-[var(--ec-text-brand-strong)] transition-colors font-sans"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1.5 px-2 text-base text-[var(--ec-text-default-weak)] hover:text-[var(--ec-text-brand-strong)] transition-colors font-sans"
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
