import Image from "next/image";
import Link from "next/link";
import CategoryTag from "./CategoryTag";
import ArticleMeta from "./ArticleMeta";
import type { ArticleSummary } from "@/types/content";

interface ArticleCardProps {
  article: ArticleSummary;
  className?: string;
  imagePriority?: boolean;
}

export default function ArticleCard({
  article,
  className = "",
  imagePriority = false,
}: ArticleCardProps) {
  return (
    <article className={`flex flex-col group ${className}`}>
      {/* Prominent Image Area */}
      {article.image && (
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-alt-light mb-3.5">
          <Link
            href={`/articles/${article.slug}`}
            className="block relative w-full h-full focus:outline-none"
            tabIndex={-1}
            aria-hidden="true"
          >
            <Image
              src={article.image}
              alt={article.title}
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
            <CategoryTag key={category} label={category} />
          ))}
        </div>
      )}

      {/* Title */}
      <Link
        href={`/articles/${article.slug}`}
        className="block focus:outline-none mb-2"
      >
        <h3 className="text-[15px] sm:text-base font-bold leading-snug tracking-tight text-text-primary group-hover:text-brand transition-colors line-clamp-3">
          {article.title}
        </h3>
      </Link>

      {/* Excerpt */}
      {article.excerpt && (
        <p className="text-xs sm:text-[13px] leading-relaxed text-text-secondary line-clamp-4 mb-3">
          {article.excerpt}
        </p>
      )}

      {/* Date & Author Meta */}
      <div className="mt-auto">
        <ArticleMeta date={article.publishedAt} author={article.author} />
      </div>
    </article>
  );
}
