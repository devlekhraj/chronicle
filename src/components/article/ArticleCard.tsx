import Image from "next/image";
import Link from "next/link";
import CategoryTag from "./CategoryTag";
import ArticleMeta from "./ArticleMeta";
import type { ArticleSummary } from "@/types/content";

interface ArticleCardProps {
  article: ArticleSummary;
  className?: string;
  imagePriority?: boolean;
  /**
   * Heading level is owned by the page's document outline, not the card
   * (docs §5, §66). Cards nested under an `<h2>` section use the default `3`.
   */
  headingLevel?: 2 | 3 | 4;
}

export default function ArticleCard({
  article,
  className = "",
  imagePriority = false,
  headingLevel = 3,
}: ArticleCardProps) {
  const Heading = `h${headingLevel}` as "h2" | "h3" | "h4";

  return (
    <article className={`flex flex-col group ${className}`}>
      {/* Prominent Image Area */}
      {article.image && (
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-alt-light mb-3.5">
          <Link
            href={`/${article.slug}`}
            className="block relative w-full h-full focus:outline-none"
            tabIndex={-1}
            aria-hidden="true"
          >
            <Image
              src={article.image}
              alt={article.imageMeta?.alt ?? article.title}
              fill
              priority={imagePriority}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          </Link>
        </div>
      )}

      {/* Category Tags */}
      {article.categories && article.categories.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 mb-2">
          {article.categories.map((category) => (
            <CategoryTag
              key={typeof category === "string" ? category : category.slug || category.title}
              label={category}
            />
          ))}
        </div>
      )}

      {/* Title — the link lives inside the heading (docs §5). */}
      <Heading className="text-[15px] sm:text-base font-bold leading-snug tracking-tight text-text-primary mb-2">
        <Link
          href={`/${article.slug}`}
          className="focus:outline-none hover:text-brand transition-colors"
        >
          {article.title}
        </Link>
      </Heading>

      {/* Excerpt */}
      {article.excerpt && (
        <p className="text-xs sm:text-[13px] leading-relaxed text-text-secondary line-clamp-4 mb-3">
          {article.excerpt}
        </p>
      )}

      {/* Date & Author Meta */}
      <div className="mt-auto">
        <ArticleMeta
          date={article.publishedAt}
          dateTime={article.publishedAtIso}
          author={article.author}
        />
      </div>
    </article>
  );
}
