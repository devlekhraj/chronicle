import Link from "next/link";
import type { AuthorMeta } from "@/types/content";

function authorSlugFromName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

interface ArticleMetaProps {
  /** Human-readable publication date, e.g. "Sep 18, 2026". */
  date?: string;
  /**
   * ISO 8601 timestamp for the machine-readable `datetime` attribute
   * (docs §34). Omitted rather than set to a non-parseable display string.
   */
  dateTime?: string;
  author?: string | AuthorMeta | { name?: string; slug?: string };
  authors?: AuthorMeta[];
  className?: string;
}

export default function ArticleMeta({
  date,
  dateTime,
  author,
  authors,
  className = "",
}: ArticleMetaProps) {
  const hasAuthorsList = Boolean(authors && authors.length > 0);
  const authorName = typeof author === "string" ? author : author?.name;
  const hasAuthor = hasAuthorsList || Boolean(authorName);

  if (!hasAuthor && !date) {
    return null;
  }

  return (
    <div className={`meta ${className}`.trim()}>
      {hasAuthor && (
        <span className="meta-author">
          By{" "}
          {hasAuthorsList ? (
            authors!.map((auth, idx) => {
              const authorSlug = auth.slug || authorSlugFromName(auth.name);
              return (
                <span key={auth.name || idx}>
                  {idx > 0 && (idx === authors!.length - 1 ? " and " : ", ")}
                  <Link
                    href={`/author/${authorSlug}`}
                    rel="author"
                    className="article-author-link"
                  >
                    {auth.name}
                  </Link>
                </span>
              );
            })
          ) : (
            (() => {
              const slug = typeof author === "object" && author?.slug
                ? author.slug
                : authorSlugFromName(authorName || "");
              return (
                <Link
                  href={`/author/${slug}`}
                  rel="author"
                  className="article-author-link"
                >
                  {authorName}
                </Link>
              );
            })()
          )}
        </span>
      )}
      {hasAuthor && date && <span className="meta-sep" aria-hidden="true">|</span>}
      {date && <time dateTime={dateTime}>{date}</time>}
    </div>
  );
}
