import Image from "next/image";
import Link from "next/link";
import CategoryTag from "@/components/article/CategoryTag";
import ArticleMeta from "@/components/article/ArticleMeta";
import { featuredStory } from "@/data/homepage";
import type { ArticleSummary } from "@/types/content";

interface FeaturedStoryProps {
  story?: ArticleSummary;
  className?: string;
}

export default function FeaturedStory({
  story = featuredStory,
  className = "",
}: FeaturedStoryProps) {
  return (
    <article
      aria-label="Featured Story"
      className={`pb-10 sm:pb-12 ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-[45%_1fr] gap-6 lg:gap-8 items-center">
        {/* Left: Article Image */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-alt-light">
          <Link
            href={`/${story.slug}`}
            className="group block relative w-full h-full focus:outline-none"
            tabIndex={-1}
            aria-hidden="true"
          >
            <Image
              src={story.image || "/images/homepage/sherpa-featured.jpg"}
              alt={story.title}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            />
          </Link>
        </div>

        {/* Right: Article Content (Title on top, tags below, excerpt, meta) */}
        <div className="flex flex-col justify-center">
          <Link
            href={`/${story.slug}`}
            className="group block focus:outline-none mb-2.5"
          >
            <h2 className="text-xl sm:text-2xl lg:text-[26px] font-bold leading-tight tracking-tight text-text-primary group-hover:text-brand transition-colors">
              {story.title}
            </h2>
          </Link>

          {story.categories && story.categories.length > 0 && (
            <div className="ec-story-tags mb-3">
              {story.categories.map((category) => (
                <CategoryTag key={category} label={category} />
              ))}
            </div>
          )}

          {story.excerpt && (
            <p className="text-sm sm:text-base leading-relaxed text-text-secondary">
              {story.excerpt}
            </p>
          )}

          <div className="mt-4">
            <ArticleMeta date={story.publishedAt} author={story.author} />
          </div>
        </div>
      </div>
    </article>
  );
}
