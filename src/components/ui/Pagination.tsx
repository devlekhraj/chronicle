import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  className?: string;
}

export function getPaginationItems(
  currentPage: number,
  totalPages: number
): (number | "...")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
}

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  className = "",
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const paginationItems = getPaginationItems(currentPage, totalPages);

  const getPageUrl = (page: number) => {
    if (page <= 1) {
      return baseUrl;
    }
    const separator = baseUrl.includes("?") ? "&" : "?";
    return `${baseUrl}${separator}page=${page}`;
  };

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav
      className={`category-pagination ${className}`}
      aria-label="Pagination Navigation"
    >
      <ul className="pagination-list">
        {/* Previous Button */}
        <li className="pagination-list-item">
          {hasPrev ? (
            <Link
              href={getPageUrl(currentPage - 1)}
              className="pagination-arrow pagination-prev"
              aria-label="Go to previous page"
            >
              <ChevronLeft size={16} aria-hidden="true" />
              <span className="pagination-arrow-text">Previous</span>
            </Link>
          ) : (
            <span
              className="pagination-arrow pagination-prev is-disabled"
              aria-disabled="true"
            >
              <ChevronLeft size={16} aria-hidden="true" />
              <span className="pagination-arrow-text">Previous</span>
            </span>
          )}
        </li>

        {/* Page Numbers */}
        {paginationItems.map((item, index) => (
          <li key={`${item}-${index}`} className="pagination-list-item">
            {item === "..." ? (
              <span className="pagination-ellipsis" aria-hidden="true">
                …
              </span>
            ) : item === currentPage ? (
              <span
                className="pagination-number is-active"
                aria-current="page"
                aria-label={`Current page, Page ${item}`}
              >
                {item}
              </span>
            ) : (
              <Link
                href={getPageUrl(item)}
                className="pagination-number"
                aria-label={`Go to page ${item}`}
              >
                {item}
              </Link>
            )}
          </li>
        ))}

        {/* Next Button */}
        <li className="pagination-list-item">
          {hasNext ? (
            <Link
              href={getPageUrl(currentPage + 1)}
              className="pagination-arrow pagination-next"
              aria-label="Go to next page"
            >
              <span className="pagination-arrow-text">Next</span>
              <ChevronRight size={16} aria-hidden="true" />
            </Link>
          ) : (
            <span
              className="pagination-arrow pagination-next is-disabled"
              aria-disabled="true"
            >
              <span className="pagination-arrow-text">Next</span>
              <ChevronRight size={16} aria-hidden="true" />
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}
