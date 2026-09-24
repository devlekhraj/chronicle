import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import CategoryTag from "@/components/article/CategoryTag";
import ArticleMeta from "@/components/article/ArticleMeta";
import type { ArticleSummary } from "@/types/content";

interface HeroStoryProps {
  story: ArticleSummary;
}

export default function HeroStory({ story }: HeroStoryProps) {
  return (
    <section
      aria-label="Lead Story"
      className="pt-6 pb-12 sm:pb-14"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[38%_1fr] gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Content (approx. 38%) */}
          <div className="flex flex-col justify-center">
            {/* Title on top matching Figma */}
            <Link
              href={`/${story.slug}`}
              className="group block focus:outline-none mb-3"
            >
              <h1 className="ec-story-heading group-hover:text-[var(--ec-text-brand-strong)] transition-colors">
                {story.title}
              </h1>
            </Link>

            {/* Category tags directly under title */}
            {story.categories && story.categories.length > 0 && (
              <div className="ec-story-tags mb-3.5">
                {story.categories.map((category) => (
                  <CategoryTag
                    key={typeof category === "string" ? category : category.slug || category.title}
                    label={category}
                  />
                ))}
              </div>
            )}

            {/* Excerpt */}
            {story.excerpt && (
              <p className="ec-story-blurb">
                {story.excerpt}
              </p>
            )}

            {/* Date & Author Pill */}
            <div className="mt-5">
              <ArticleMeta date={story.publishedAt} author={story.author} />
            </div>
          </div>

          {/* Right Column: Large Image (approx. 68%) */}
          <div className="relative w-full overflow-hidden aspect-[16/10] bg-alt-light">
            <Link
              href={`/${story.slug}`}
              className="group block relative w-full h-full focus:outline-none"
              tabIndex={-1}
              aria-hidden="true"
            >
              <Image
                src={story.image || "/images/homepage/nepal-rescue.jpg"}
                alt={story.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 68vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
