import SectionHeading from "@/components/ui/SectionHeading";
import ArticleCard from "@/components/article/ArticleCard";
import type { ArticleSummary } from "@/types/content";

interface CategorySectionProps {
  title: string;
  articles: ArticleSummary[];
  href?: string;
  className?: string;
}

export default function CategorySection({
  title,
  articles,
  className = "",
}: CategorySectionProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section
      aria-label={title}
      className={`pb-12 sm:pb-14 ${className}`}
    >
      <SectionHeading>{title}</SectionHeading>
      <div className="relative flex items-center">
        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 flex-1">
          {articles.slice(0, 3).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {/* Right Green Navigation Arrow matching Figma */}
        <div className="hidden lg:flex items-center justify-center pl-3">
          <button
            type="button"
            aria-label={`Next ${title} stories`}
            className="p-1 text-brand hover:opacity-80 transition-opacity cursor-pointer focus:outline-none"
          >
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
