"use client";

import { useState } from "react";

interface SearchBoxProps {
  className?: string;
  placeholder?: string;
}

export default function SearchBox({
  className = "",
  placeholder = "Search",
}: SearchBoxProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Prepared for search route handling: e.g. router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={`ec-search h-8 w-44 sm:w-48 lg:w-52 ${className}`}
    >
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        aria-label="Search articles and stories"
        className="flex-1 min-w-0 px-2.5 text-xs text-[var(--ec-text-default-strong)] placeholder:text-[var(--ec-text-default-faded)] focus:outline-none"
      />
      <button
        type="submit"
        aria-label="Submit search"
        className="flex h-full w-8 shrink-0 items-center justify-center border-l border-[var(--ec-stroke-dark-more-weaker)] text-[var(--ec-dark-100)] hover:text-[var(--ec-brand-100)] transition-colors cursor-pointer"
      >
        {/* Dark search icon via lightweight inline SVG matching Section 26 & 27 */}
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </form>
  );
}
