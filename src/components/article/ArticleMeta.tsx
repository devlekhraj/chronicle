interface ArticleMetaProps {
  date?: string;
  author?: string;
  className?: string;
}

export default function ArticleMeta({
  date,
  author,
  className = "",
}: ArticleMetaProps) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {date && (
        <time dateTime={date} className="ec-story-date">
          {date}
        </time>
      )}
      {author && (
        <span className="ec-author-badge">
          {author}
        </span>
      )}
    </div>
  );
}
