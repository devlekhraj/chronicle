import Link from "next/link";
import { latestStories as defaultLatest } from "@/data/homepage";
import type { ArticleSummary } from "@/types/content";

interface LatestStoriesProps {
  stories?: ArticleSummary[];
  className?: string;
}

export default function LatestStories({
  stories = defaultLatest,
  className = "",
}: LatestStoriesProps) {
  return (
    <aside aria-label="Latest News" className={`flex flex-col ${className}`}>
      <h2 className="text-2xl font-bold tracking-tight text-text-primary mb-6">
        Latest
      </h2>
      <div className="flex flex-col space-y-6 sm:space-y-7">
        {stories.map((story) => (
          <article key={story.id} className="group">
            <Link
              href={`/articles/${story.slug}`}
              className="block focus:outline-none"
            >
              <h3 className="text-sm sm:text-[15px] font-bold leading-snug text-text-primary group-hover:text-brand transition-colors">
                {story.title}
              </h3>
            </Link>
          </article>
        ))}
      </div>
    </aside>
  );
}
