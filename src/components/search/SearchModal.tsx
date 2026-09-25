"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { Search, X } from "lucide-react";
import type { ArticleSummary, AuthorProfile } from "@/types/content";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_TOPICS = [
  "Everest",
  "Sherpa",
  "Expeditions",
  "Glaciers",
  "Climate Change",
  "Conservation",
  "Rescue",
  "Khumbu",
];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [matchingAuthors, setMatchingAuthors] = useState<AuthorProfile[]>([]);
  const [matchingArticles, setMatchingArticles] = useState<ArticleSummary[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Focus input on open and lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-backdrop-open");
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
        document.body.classList.remove("modal-backdrop-open");
      };
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-backdrop-open");
      setQuery("");
      setMatchingAuthors([]);
      setMatchingArticles([]);
    }
  }, [isOpen]);

  // Keyboard escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const trimmed = query.trim().toLowerCase();

  useEffect(() => {
    if (!isOpen || trimmed.length === 0) {
      setMatchingAuthors([]);
      setMatchingArticles([]);
      setIsSearching(false);
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setIsSearching(true);

      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Search failed with status ${response.status}`);
        }

        const data = await response.json() as {
          articles?: ArticleSummary[];
          authors?: AuthorProfile[];
        };

        setMatchingArticles(data.articles ?? []);
        setMatchingAuthors(data.authors ?? []);
      } catch (error) {
        if (!controller.signal.aborted) {
          setMatchingArticles([]);
          setMatchingAuthors([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsSearching(false);
        }
      }
    }, 250);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [isOpen, trimmed]);

  if (!isOpen || !mounted) return null;

  const hasResults = matchingAuthors.length > 0 || matchingArticles.length > 0;

  return createPortal(
    <div
      className="search-modal-root"
      role="dialog"
      aria-modal="true"
      aria-label="Search Everest Chronicle"
    >
      {/* Dedicated backdrop element purely for the blurry background */}
      <div
        className="search-modal-backdrop app-modal-backdrop bg-slate-950/30 backdrop-blur-xl"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Centering & scroll container */}
      <div
        className="search-modal-wrapper"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div className="search-modal-container">
          {/* Close Icon - Top Right */}
          <button
            type="button"
            onClick={onClose}
            className="search-modal-close-btn"
            aria-label="Close search modal"
          >
            <X size={22} strokeWidth={2.2} aria-hidden="true" />
          </button>

          {/* Modal Body */}
          <div className="search-modal-body">
            {/* Centered Search Input (~300px width) */}
            {/*
              A real `form[role=search]` with a `<label>` rather than ARIA-only
              semantics (docs §54, §55, §56). Filtering is client-side, so the
              submit is intercepted.
            */}
            <form
              className="search-input-wrap"
              role="search"
              onSubmit={(event) => event.preventDefault()}
            >
              <label htmlFor="site-search-input" className="sr-only">
                Search Everest Chronicle
              </label>
              <Search
                size={20}
                strokeWidth={2.2}
                className="search-input-icon"
                aria-hidden="true"
              />

              <input
                ref={inputRef}
                id="site-search-input"
                name="q"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search stories, authors, topics..."
                className="search-modal-input"
                autoComplete="off"
              />

              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                  className="search-clear-btn"
                  aria-label="Clear search query"
                >
                  <X size={18} strokeWidth={2.2} aria-hidden="true" />
                </button>
              )}
            </form>
          {/* Empty Query State: Show Popular Topics */}
          {!trimmed && (
            <div className="search-suggestions-block">
              <div className="search-suggestions-label">Popular Topics</div>
              <div className="search-suggestions-pills">
                {POPULAR_TOPICS.map((topic) => (
                  <button
                    type="button"
                    key={topic}
                    onClick={() => {
                      setQuery(topic);
                      inputRef.current?.focus();
                    }}
                    className="search-suggestion-pill"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* With Query: Display Results */}
          {trimmed && isSearching && (
            <div className="search-empty-state">
              <p className="search-empty-title">Searching...</p>
            </div>
          )}

          {trimmed && !isSearching && !hasResults && (
            <div className="search-empty-state">
              <p className="search-empty-title">No results found for &ldquo;{query}&rdquo;</p>
              <p className="search-empty-desc">
                Try checking for typos or searching with broader keywords like Everest, Sherpa, or Climate.
              </p>
            </div>
          )}

          {trimmed && !isSearching && hasResults && (
            <div className="search-results-wrapper">
              {/* Articles Section */}
              {matchingArticles.length > 0 && (
                <div className="search-results-section">
                  <div className="search-results-heading">
                    ARTICLES <span>({matchingArticles.length})</span>
                  </div>
                  <div className="search-articles-list">
                    {matchingArticles.map((art) => {
                      const primaryCategory = art.categories?.[0];
                      const categoryTitle =
                        typeof primaryCategory === "string"
                          ? primaryCategory
                          : primaryCategory?.title ?? "Dispatches";

                      return (
                        <Link
                          href={`/${art.slug}`}
                          key={art.slug}
                          onClick={onClose}
                          className="search-article-item"
                        >
                          {art.image && (
                            <Image
                              src={art.image}
                              alt={art.title}
                              width={76}
                              height={54}
                              className="search-article-thumb"
                            />
                          )}
                          <div className="search-article-body">
                            <div className="search-article-meta">
                              <span className="search-article-category">{categoryTitle}</span>
                              <span className="search-article-meta-dot" aria-hidden="true">·</span>
                              <span className="search-article-date">{art.publishedAt}</span>
                            </div>
                            <h4 className="search-article-title">{art.title}</h4>
                            {art.excerpt && (
                              <p className="search-article-dek">{art.excerpt}</p>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Authors Section */}
              {matchingAuthors.length > 0 && (
                <div className="search-results-section">
                  <div className="search-results-heading">
                    AUTHORS <span>({matchingAuthors.length})</span>
                  </div>
                  <div className="search-authors-grid">
                    {matchingAuthors.map((author) => (
                      <Link
                        href={`/author/${author.slug}`}
                        key={author.slug}
                        onClick={onClose}
                        className="search-author-card"
                      >
                        <Image
                          src={author.avatar || "/images/homepage/sherpa-featured.jpg"}
                          alt={author.name}
                          width={42}
                          height={42}
                          className="search-author-avatar"
                        />
                        <div className="search-author-info">
                          <h4 className="search-author-name">{author.name}</h4>
                          <p className="search-author-role">{author.role}</p>
                        </div>
                        <span className="search-author-arrow" aria-hidden="true">
                          →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>,
  document.body
);
}
