import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import ShortsSection from "@/components/home/ShortsSection";
import {
  heroStory,
  featuredStories,
  latestStories,
  expeditionStories,
  environmentStories,
  conservationStories,
} from "@/data/homepage";
import type { ArticleSummary } from "@/types/content";

const categorySections = [
  { title: "Expeditions", slug: "expeditions", stories: expeditionStories },
  { title: "Environment", slug: "environment", stories: environmentStories },
  { title: "Conservation", slug: "conservation", stories: conservationStories },
];

function Meta({
  date = "July 10, 2026",
  author = "Everest Chronicle",
}: {
  date?: string;
  author?: string | { name: string };
}) {
  const authorName =
    typeof author === "string" ? author : author?.name || "Everest Chronicle";
  return (
    <div className="meta">
      <time>{date}</time>
      <span>{authorName}</span>
    </div>
  );
}

function Tags({
  tags = ["Climate", "Mountaineering"],
}: {
  tags?: (string | { title: string; slug: string })[];
}) {
  return (
    <div className="tags">
      {tags.map((tag) => {
        const title = typeof tag === "string" ? tag : tag.title;
        const key = typeof tag === "string" ? tag : tag.slug;
        return <span key={key}>{title}</span>;
      })}
    </div>
  );
}

function StoryCard({ story }: { story: ArticleSummary }) {
  return (
    <article className="card">
      <Link
        href={`/${story.slug}`}
        className="card-image-link"
        aria-label={story.title}
      >
        {story.image ? (
          <img
            src={story.image}
            alt={story.title}
            className="card-image"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="placeholder card-image" aria-hidden="true" />
        )}
      </Link>
      <Tags tags={story.categories} />
      <h3>
        <Link href={`/${story.slug}`}>{story.title}</Link>
      </h3>
      {story.excerpt && <p>{story.excerpt}</p>}
      <Meta date={story.publishedAt} author={story.author} />
    </article>
  );
}

function Section({
  category,
}: {
  category: { title: string; slug: string; stories: ArticleSummary[] };
}) {
  return (
    <section className="section" id={category.slug}>
      <h2 className="section-title">
        <Link href={`/category/${category.slug}`}>{category.title}</Link>
      </h2>
      <div className="card-row">
        {category.stories.slice(0, 3).map((story) => (
          <StoryCard key={story.id || story.slug} story={story} />
        ))}
        <Link
          href={`/category/${category.slug}`}
          className="next"
          aria-label={`View all ${category.title} stories`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main id="top">
      <SiteHeader activeSlug="" />

      <div className="page-shell">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-copy">
            <h1>
              <Link href={`/${heroStory.slug}`}>{heroStory.title}</Link>
            </h1>
            <Tags tags={heroStory.categories} />
            <p>{heroStory.excerpt}</p>
            <Meta date={heroStory.publishedAt} author={heroStory.author} />
          </div>
          <Link
            href={`/${heroStory.slug}`}
            className="hero-image-link"
            aria-label={heroStory.title}
          >
            {heroStory.image ? (
              <img
                src={heroStory.image}
                alt={heroStory.title}
                className="hero-image"
                loading="eager"
                decoding="async"
              />
            ) : (
              <div className="placeholder hero-image" aria-hidden="true" />
            )}
          </Link>
        </section>

        {/* 2-Column Main Section: Left content, Right dedicated to Latest */}
        <div className="home-main-grid">
          {/* Left Column: Featured Story + Expeditions + Environment + Conservation */}
          <div className="main-content-flow">
            {/* Featured Story Stack */}
            <div className="featured-story-stack">
              {featuredStories.map((story) => (
                <article className="featured-story" key={story.slug}>
                  <Link
                    href={`/${story.slug}`}
                    className="featured-image-link"
                    aria-label={story.title}
                  >
                    {story.image ? (
                      <img
                        src={story.image}
                        alt={story.title}
                        className="featured-image"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div
                        className="placeholder featured-image"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                  <div className="feature-copy">
                    <Tags tags={story.categories} />
                    <h2>
                      <Link href={`/${story.slug}`}>{story.title}</Link>
                    </h2>
                    {story.excerpt && <p>{story.excerpt}</p>}
                    <Meta date={story.publishedAt} author={story.author} />
                  </div>
                </article>
              ))}
            </div>

            {/* Expeditions Section */}
            <Section category={categorySections[0]} />

            {/* Environment Section */}
            <Section category={categorySections[1]} />

            {/* Conservation Section */}
            <Section category={categorySections[2]} />

            <ShortsSection />
          </div>

          {/* Right Column: Dedicated to Latest Stories */}
          <aside className="latest-sidebar" aria-label="Latest Stories">
            <h2 className="latest-heading">Latest</h2>
            <div className="latest-headlines">
              {latestStories.map((story, i) => (
                <Link href={`/${story.slug}`} key={story.slug + i}>
                  {story.title}
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
