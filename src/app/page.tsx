import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import ShortsSection from "@/components/home/ShortsSection";

const blurb =
  "As climate change makes disasters more frequent and deadly, Nepal must move beyond recovering victims after tragedy and build a modern fire and rescue service capable of saving lives during the critical golden hour.";

const leadStory = {
  title: "Nepal's next rescue should not be a body recovery",
  slug: "nepals-next-rescue-should-not-be-a-body-recovery",
};

const featuredStories = [
  {
    title: "Nepal's next rescue should not be a body recovery",
    slug: "nepals-next-rescue-should-not-be-a-body-recovery",
    tags: [
      { title: "Climate", slug: "climate" },
      { title: "Rasuwa Floods 2026", slug: "rasuwa-floods-2026" },
    ],
    blurb:
      "As climate change makes disasters more frequent and deadly, Nepal must move beyond recovering victims after tragedy and build a modern fire and rescue service capable of saving lives during the critical golden hour.",
  },
  {
    title: "The vanishing glaciers: How warming is reshaping high-altitude climbing routes",
    slug: "the-vanishing-glaciers-climbing-routes",
    tags: [
      { title: "Expeditions", slug: "expeditions" },
      { title: "Glaciology", slug: "glaciology" },
    ],
    blurb:
      "Decades of receding ice have uncovered unstable scree and opened deadly new chasms on classic Everest routes, forcing veteran Sherpas to rewrite the rules of Himalayan ascent.",
  },
];

const categorySections = [
  { title: "Expeditions", slug: "expeditions" },
  { title: "Environment", slug: "environment" },
  { title: "Conservation", slug: "conservation" },
];

const storyCards = [
  {
    title: "Nepal's next rescue should not be a body recovery",
    slug: "nepals-next-rescue-should-not-be-a-body-recovery",
  },
  {
    title: "The changing face of Himalayan expeditions",
    slug: "changing-face-of-himalayan-expeditions",
  },
  {
    title: "What it takes to protect a mountain ecosystem",
    slug: "what-it-takes-to-protect-a-mountain-ecosystem",
  },
];

const latestStories = [
  {
    title:
      "Nepal signs rescue pact with airlines, drone and rafting groups for disaster response",
    slug: "nepal-signs-rescue-pact-with-airlines-drone-and-rafting-groups",
  },
  {
    title: "Nepal to review Everest summit event after corruption complaint",
    slug: "nepal-to-review-everest-summit-event-after-corruption-complaint",
  },
  {
    title: "Monsoon rains paralyse Nepal as landslides block key highways",
    slug: "monsoon-rains-paralyse-nepal-as-landslides-block-key-highways",
  },
  {
    title:
      "Flood washes away road to Ghandruk village, stranding hundreds of tourists",
    slug: "flood-washes-away-road-to-ghandruk-village-stranding-tourists",
  },
  {
    title:
      "Nepal signs rescue pact with airlines, drone and rafting groups for disaster response",
    slug: "nepal-signs-rescue-pact-disaster-response-round-2",
  },
  {
    title: "Nepal to review Everest summit event after corruption complaint",
    slug: "nepal-to-review-everest-summit-corruption-complaint",
  },
  {
    title: "Monsoon rains paralyse Nepal as landslides block key highways",
    slug: "monsoon-rains-paralyse-nepal-landslides-update",
  },
  {
    title:
      "Flood washes away road to Ghandruk village, stranding hundreds of tourists",
    slug: "flood-washes-away-road-ghandruk-update",
  },
  {
    title:
      "Nepal signs rescue pact with airlines, drone and rafting groups for disaster response",
    slug: "nepal-signs-rescue-pact-disaster-response-round-3",
  },
  {
    title: "Nepal to review Everest summit event after corruption complaint",
    slug: "nepal-to-review-everest-summit-event-inquiry",
  },
  {
    title: "Monsoon rains paralyse Nepal as landslides block key highways",
    slug: "monsoon-rains-paralyse-nepal-highways-blocked",
  },
  {
    title:
      "Flood washes away road to Ghandruk village, stranding hundreds of tourists",
    slug: "flood-washes-away-road-to-ghandruk-stranding-hundreds",
  },
];

const defaultTags = [
  { title: "Climate", slug: "climate" },
  { title: "Mountaineering", slug: "mountaineering" },
];

function Meta() {
  return (
    <div className="meta">
      <time>July 10, 2026</time>
      <span>Author name here</span>
    </div>
  );
}

function Tags({
  tags = defaultTags,
}: {
  tags?: { title: string; slug: string }[];
}) {
  return (
    <div className="tags">
      {tags.map((tag) => (
        <span key={tag.slug}>{tag.title}</span>
      ))}
    </div>
  );
}

function Placeholder({ className = "" }: { className?: string }) {
  return <div className={`placeholder ${className}`} aria-hidden="true" />;
}

function StoryCard({ index = 0 }: { index?: number }) {
  const currentStory = storyCards[index % storyCards.length];
  return (
    <article className="card">
      <Placeholder className="card-image" />
      <Tags />
      <h3>
        <Link href={`/${currentStory.slug}`}>{currentStory.title}</Link>
      </h3>
      <p>{blurb}</p>
      <Meta />
    </article>
  );
}

function Section({ category }: { category: { title: string; slug: string } }) {
  return (
    <section className="section" id={category.slug}>
      <h2 className="section-title">
        <Link href={`/category/${category.slug}`}>{category.title}</Link>
      </h2>
      <div className="card-row">
        <StoryCard index={0} />
        <StoryCard index={1} />
        <StoryCard index={2} />
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
            <h1>{leadStory.title}</h1>
            <Tags />
            <p>{blurb}</p>
            <Meta />
          </div>
          <Placeholder className="hero-image" />
        </section>

        {/* 2-Column Main Section: Left content, Right dedicated to Latest */}
        <div className="home-main-grid">
          {/* Left Column: Featured Story + Expeditions + Environment */}
          <div className="main-content-flow">
            {/* Featured Story Stack */}
            <div className="featured-story-stack">
              {featuredStories.map((story) => (
                <article className="featured-story" key={story.slug}>
                  <Placeholder className="featured-image" />
                  <div className="feature-copy">
                    <Tags tags={story.tags} />
                    <h2>
                      <Link href={`/${story.slug}`}>{story.title}</Link>
                    </h2>
                    <p>{story.blurb}</p>
                    <Meta />
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
