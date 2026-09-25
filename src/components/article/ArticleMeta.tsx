import type { AuthorMeta } from "@/types/content";

interface ArticleMetaProps {
  /** Human-readable publication date, e.g. "Sep 18, 2026". */
  date?: string;
  /**
   * ISO 8601 timestamp for the machine-readable `datetime` attribute
   * (docs §34). Omitted rather than set to a non-parseable display string.
   */
  dateTime?: string;
  author?: string | AuthorMeta;
  className?: string;
}

export default function ArticleMeta({
  date,
  dateTime,
  author,
  className = "",
}: ArticleMetaProps) {
  const authorName = typeof author === "string" ? author : author?.name;
  return (
    <div className={`meta ${className}`}>
      {authorName && (
        <span className="meta-author">
          By {authorName}
        </span>
      )}
      {authorName && date && <span className="meta-sep" aria-hidden="true">|</span>}
      {date && <time dateTime={dateTime}>{date}</time>}
    </div>
  );
}
