"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { ArticleDetail } from "@/data/articles";
import { getPaginationItems } from "@/components/ui/Pagination";

interface AuthorStoriesListProps {
  stories: ArticleDetail[];
  itemsPerPage?: number;
  initialCount?: number;
}

export default function AuthorStoriesList({
  stories,
  itemsPerPage = 4,
  initialCount,
}: AuthorStoriesListProps) {
  const pageSize = itemsPerPage || initialCount || 4;
  const [currentPage, setCurrentPage] = useState(1);
  const listTopRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.max(1, Math.ceil(stories.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const displayedStories = stories.slice(startIndex, startIndex + pageSize);
  const paginationItems = getPaginationItems(currentPage, totalPages);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    listTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="author-latest-container" ref={listTopRef}>
      <div className="author-stories-list">
        {displayedStories.map((story) => {
          const categoryTitle =
            story.categories && story.categories.length > 0
              ? story.categories[0].title
              : "Dispatches";
          const categorySlug =
            story.categories && story.categories.length > 0
              ? story.categories[0].slug
              : "dispatches";

          return (
            <article className="author-story-row" key={story.slug}>
              <div className="author-story-thumb-wrap">
                <Link
                  href={`/${story.slug}`}
                  className="author-story-thumb-link"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  {story.image ? (
                    <Image
                      src={story.image}
                      alt={story.title}
                      width={380}
                      height={240}
                      loading="lazy"
                      className="author-story-thumb"
                    />
                  ) : (
                    <div className="author-story-thumb-placeholder" />
                  )}
                </Link>
              </div>

              <div className="author-story-content">
                <h3 className="author-story-title">
                  <Link href={`/${story.slug}`}>{story.title}</Link>
                </h3>

                <div className="author-story-meta">
                  <Link
                    href={`/category/${categorySlug}`}
                    className="author-story-category"
                  >
                    {categoryTitle}
                  </Link>
                  <span className="author-story-meta-dot" aria-hidden="true">
                    ·
                  </span>
                  <time className="author-story-date">{story.publishedAt}</time>
                </div>

                {story.dek && (
                  <p className="author-story-dek">{story.dek}</p>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {totalPages > 1 && (
        <nav
          className="category-pagination author-pagination"
          aria-label="Author stories pagination"
        >
          <ul className="pagination-list">
            {/* Previous Button */}
            <li className="pagination-list-item">
              <button
                type="button"
                onClick={() => handlePageChange(currentPage - 1)}
                className={`pagination-arrow pagination-prev ${
                  currentPage <= 1 ? "is-disabled" : ""
                }`}
                disabled={currentPage <= 1}
                aria-label="Go to previous page"
              >
                <span aria-hidden="true">«</span>
                <span className="pagination-arrow-text">Previous</span>
              </button>
            </li>

            {/* Page Numbers */}
            {paginationItems.map((item, index) => (
              <li key={`${item}-${index}`} className="pagination-list-item">
                {item === "..." ? (
                  <span className="pagination-ellipsis" aria-hidden="true">
                    …
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handlePageChange(item as number)}
                    className={`pagination-number ${
                      item === currentPage ? "is-active" : ""
                    }`}
                    aria-current={item === currentPage ? "page" : undefined}
                    aria-label={`Go to page ${item}`}
                  >
                    {item}
                  </button>
                )}
              </li>
            ))}

            {/* Next Button */}
            <li className="pagination-list-item">
              <button
                type="button"
                onClick={() => handlePageChange(currentPage + 1)}
                className={`pagination-arrow pagination-next ${
                  currentPage >= totalPages ? "is-disabled" : ""
                }`}
                disabled={currentPage >= totalPages}
                aria-label="Go to next page"
              >
                <span className="pagination-arrow-text">Next</span>
                <span aria-hidden="true">»</span>
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
