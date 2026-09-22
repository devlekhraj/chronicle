"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { articleRegistry, type ArticleDetail } from "@/data/articles";
import { authorRegistry } from "@/data/authors";
import type { AuthorProfile } from "@/types/content";

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

  if (!isOpen || !mounted) return null;

  const trimmed = query.trim().toLowerCase();

  // Search logic
  let matchingAuthors: AuthorProfile[] = [];
  let matchingArticles: ArticleDetail[] = [];

  if (trimmed.length > 0) {
    const allAuthors = Object.values(authorRegistry);
    matchingAuthors = allAuthors.filter((author) => {
      const nameMatch = author.name.toLowerCase().includes(trimmed);
      const roleMatch = author.role?.toLowerCase().includes(trimmed);
      const bioMatch = author.bio?.toLowerCase().includes(trimmed);
      const beatsMatch = author.beats?.some((b) => b.toLowerCase().includes(trimmed));
      return nameMatch || roleMatch || bioMatch || beatsMatch;
    });

    const allArticles = Object.values(articleRegistry);
    matchingArticles = allArticles.filter((art) => {
      const titleMatch = art.title.toLowerCase().includes(trimmed);
      const dekMatch = art.dek?.toLowerCase().includes(trimmed);
      const catMatch = art.categories?.some((c) => c.title.toLowerCase().includes(trimmed));
      const tagMatch = art.tags?.some((t) => t.title.toLowerCase().includes(trimmed));
      const authorMatch = art.authors?.some((a) => a.name.toLowerCase().includes(trimmed));
      return titleMatch || dekMatch || catMatch || tagMatch || authorMatch;
    });
  }

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
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Modal Body */}
          <div className="search-modal-body">
            {/* Centered Search Input (~300px width) */}
            <div className="search-input-wrap">
              <svg
                className="search-input-icon"
                width="20"
                height="20"
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

              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search stories, authors, topics..."
                className="search-modal-input"
                aria-label="Search query"
                role="searchbox"
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
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>
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
          {trimmed && !hasResults && (
            <div className="search-empty-state">
              <p className="search-empty-title">No results found for &ldquo;{query}&rdquo;</p>
              <p className="search-empty-desc">
                Try checking for typos or searching with broader keywords like Everest, Sherpa, or Climate.
              </p>
            </div>
          )}

          {trimmed && hasResults && (
            <div className="search-results-wrapper">
              {/* Articles Section */}
              {matchingArticles.length > 0 && (
                <div className="search-results-section">
                  <div className="search-results-heading">
                    ARTICLES <span>({matchingArticles.length})</span>
                  </div>
                  <div className="search-articles-list">
                    {matchingArticles.map((art) => {
                      const categoryTitle =
                        art.categories && art.categories.length > 0
                          ? art.categories[0].title
                          : "Dispatches";

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
                            {art.dek && (
                              <p className="search-article-dek">{art.dek}</p>
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
