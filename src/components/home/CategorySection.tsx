import SectionHeading from "@/components/ui/SectionHeading";
import ArticleCard from "@/components/article/ArticleCard";
import { ChevronRight } from "lucide-react";
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
            <ChevronRight size={32} strokeWidth={2.5} className="h-8 w-8" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
