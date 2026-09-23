import Link from "next/link";
import Image from "next/image";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import ShortsSection from "@/components/home/ShortsSection";
import {
  heroStory as fallbackHeroStory,
  featuredStories as fallbackFeaturedStories,
  latestStories as fallbackLatestStories,
  expeditionStories as fallbackExpeditionStories,
  environmentStories as fallbackEnvironmentStories,
  conservationStories as fallbackConservationStories,
  shorts as fallbackShorts,
} from "@/data/homepage";
import { IS_EC_API_CONFIGURED, getHomePageData, getNavigationItems, type HomePageData, type NavigationItem } from "@/lib/ec-api";
import type { ArticleSummary } from "@/types/content";


function OptimizedArticleImage({
  story,
  className,
  height,
  loading = "lazy",
  priority = false,
  sizes,
  width,
}: {
  story: ArticleSummary;
  className: string;
  height: number;
  loading?: "eager" | "lazy";
  priority?: boolean;
  sizes: string;
  width: number;
}) {
  const src = story.image;

  if (!src) {
    return <div className={`placeholder ${className}`} aria-hidden="true" />;
  }

  return (
    <Image
      src={src}
      alt={story.title}
      width={width}
      height={height}
      className={className}
      loading={priority ? undefined : loading}
      priority={priority}
      quality={72}
      sizes={sizes}
    />
  );
}

const fallbackHomePageData: HomePageData = {
  heroStory: fallbackHeroStory,
  featuredStories: fallbackFeaturedStories,
  latestStories: fallbackLatestStories,
  categoryStories: {
    expeditions: fallbackExpeditionStories,
    expedition: fallbackExpeditionStories,
    environment: fallbackEnvironmentStories,
    conservation: fallbackConservationStories,
  },
  shorts: fallbackShorts,
};

async function loadHomePageData(): Promise<HomePageData> {
  if (!IS_EC_API_CONFIGURED) {
    return fallbackHomePageData;
  }

  try {
    return await getHomePageData();
  } catch {
    console.warn("Using static homepage fallback because the Laravel API is unavailable.");
    return fallbackHomePageData;
  }
}

async function loadNavigationItems(): Promise<NavigationItem[] | undefined> {
  if (!IS_EC_API_CONFIGURED) {
    return undefined;
  }

  try {
    return await getNavigationItems();
  } catch {
    console.warn("Using static navigation fallback because the Laravel API is unavailable.");
    return undefined;
  }
}

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
        <OptimizedArticleImage
          story={story}
          width={400}
          height={250}
          className="card-image"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 217px"
        />
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

export default async function Home() {
  const [homePageData, navigationItems] = await Promise.all([
    loadHomePageData(),
    loadNavigationItems(),
  ]);
  const heroStory = homePageData.heroStory ?? fallbackHeroStory;
  const featuredStories = homePageData.featuredStories.length > 0
    ? homePageData.featuredStories
    : fallbackHomePageData.featuredStories;
  const latestStories = homePageData.latestStories.length > 0
    ? homePageData.latestStories
    : fallbackHomePageData.latestStories;
  const categorySections = [
    {
      title: "Expeditions",
      slug: "expedition",
      stories: homePageData.categoryStories.expedition ?? homePageData.categoryStories.expeditions ?? fallbackExpeditionStories,
    },
    {
      title: "Environment",
      slug: "environment",
      stories: homePageData.categoryStories.environment ?? fallbackEnvironmentStories,
    },
    {
      title: "Conservation",
      slug: "conservation",
      stories: homePageData.categoryStories.conservation ?? fallbackConservationStories,
    },
  ];
  const shorts = homePageData.shorts.length > 0 ? homePageData.shorts : fallbackShorts;

  return (
    <main id="top">
      <SiteHeader activeSlug="" navigationItems={navigationItems} />

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
            <OptimizedArticleImage
              story={heroStory}
              width={800}
              height={450}
              className="hero-image"
              priority
              loading="eager"
              sizes="(max-width: 1024px) calc(100vw - 32px), (max-width: 1348px) calc(100vw - 496px), 876px"
            />
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
                    <OptimizedArticleImage
                      story={story}
                      width={600}
                      height={380}
                      className="featured-image"
                      sizes="(max-width: 1024px) calc(100vw - 32px), 320px"
                    />
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

            <ShortsSection items={shorts} />
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
