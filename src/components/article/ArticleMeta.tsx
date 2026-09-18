import type { AuthorMeta } from "@/types/content";

interface ArticleMetaProps {
  date?: string;
  author?: string | AuthorMeta;
  className?: string;
}

export default function ArticleMeta({
  date,
  author,
  className = "",
}: ArticleMetaProps) {
  const authorName = typeof author === "string" ? author : author?.name;
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {date && (
        <time dateTime={date} className="ec-story-date">
          {date}
        </time>
      )}
      {authorName && (
        <span className="ec-author-badge">
          {authorName}
        </span>
      )}
    </div>
  );
}
