"use client";

import { useState, useEffect } from "react";

const asset =
  "https://www.figma.com/api/mcp/asset/350920fe-17bd-4c92-99a7-72ab6785ed3d";
const mark = `${asset}/f6bdc.svg`;
const searchIcon = `${asset}/203c8.svg`;
const chevron = `${asset}/d8a7f.svg`;

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

const navItems = [
  { title: "Expeditions", slug: "expeditions" },
  { title: "Environment", slug: "environment" },
  { title: "Conservation", slug: "conservation" },
  { title: "Travel", slug: "travel" },
];

const mediaDropdownItems = [
  { title: "Dataviz", slug: "dataviz" },
  { title: "3D", slug: "3d" },
  { title: "Video", slug: "video" },
  { title: "Photography", slug: "photography" },
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

const shorts = [
  {
    title: "High winds whip prayer flags on Renjo La pass at 5,360m",
    slug: "high-winds-whip-prayer-flags-renjo-la",
  },
  {
    title: "Heavy yak caravan navigates sheer Khumbu cliff trail",
    slug: "heavy-yak-caravan-navigates-sheer-cliff-trail",
  },
  {
    title: "Rope technicians traverse the knife-edge ridge on Ama Dablam",
    slug: "rope-technicians-traverse-knife-edge-ridge",
  },
  {
    title: "Rapid thaw exposes deep crevasses beneath Khumbu icefall",
    slug: "rapid-thaw-exposes-deep-crevasses",
  },
  {
    title: "Sherpa guides celebrate successful acclimatization rotation",
    slug: "sherpa-guides-celebrate-successful-rotation",
  },
];

const footerSections = [
  { title: "Expeditions", slug: "expeditions" },
  { title: "Environment", slug: "environment" },
  { title: "Conservation", slug: "conservation" },
  { title: "Travel", slug: "travel" },
  { title: "People & Opinion", slug: "people-and-opinion" },
  { title: "Video & Shorts", slug: "video-and-shorts" },
];

const footerAbout = [
  { title: "Our Story", slug: "our-story" },
  { title: "Contact Desk", slug: "contact-desk" },
  { title: "Advertise", slug: "advertise" },
  { title: "Privacy Policy", slug: "privacy-policy" },
  { title: "Terms of Service", slug: "terms-of-service" },
  { title: "Staff Login", slug: "staff-login" },
];

const footerFollow = [
  { title: "Instagram", slug: "https://instagram.com" },
  { title: "Facebook", slug: "https://facebook.com" },
  { title: "YouTube", slug: "https://youtube.com" },
  { title: "X (Twitter)", slug: "https://x.com" },
];

const defaultTags = [
  { title: "Climate", slug: "climate" },
  { title: "Mountaineering", slug: "mountaineering" },
];

function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="/" className={`logo ${className}`}>
      <img src={mark} alt="" />
      <span>
        <b>EVEREST</b> CHRONICLE
      </span>
    </a>
  );
}

function Meta() {
  return (
    <div className="meta">
      <i>July 10, 2026</i>
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
        <a href={`/articles/${currentStory.slug}`}>{currentStory.title}</a>
      </h3>
      <p>{blurb}</p>
      <Meta />
    </article>
  );
}

function Section({ category }: { category: { title: string; slug: string } }) {
  return (
    <section className="section" id={category.slug}>
      <a className="section-title" href={`#${category.slug}`}>
        {category.title}
      </a>
      <div className="card-row">
        <StoryCard index={0} />
        <StoryCard index={1} />
        <StoryCard index={2} />
        <button className="next" aria-label={`More ${category.title}`}>
          <img src={chevron} alt="" />
        </button>
      </div>
    </section>
  );
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 70);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main id="top">
      {/* Upper tier: Centered Brand Logo */}
      <div className="header-logo-row">
        <Logo />
      </div>

      {/* Lower tier: Sticky Navigation Bar */}
      <header className={`sticky-nav-bar ${isScrolled ? "is-scrolled" : ""}`}>
        <div className="nav-wrap">
          <div className="nav-left">
            {isScrolled && <Logo className="nav-sticky-logo" />}

            <nav>
              {navItems.map((item) => (
                <a href={`#${item.slug}`} key={item.slug}>
                  {item.title}
                </a>
              ))}
              <div className="nav-dropdown-wrap">
                <a href="#media" className="nav-dropdown-trigger">
                  Media
                </a>
                <div className="nav-dropdown-menu">
                  {mediaDropdownItems.map((item) => (
                    <a href={`#${item.slug}`} key={item.slug}>
                      {item.title}
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          </div>

          <form className="search" onSubmit={(e) => e.preventDefault()}>
            <input aria-label="Search" placeholder="Search" />
            <button aria-label="Submit search" type="button">
              <img src={searchIcon} alt="" />
            </button>
          </form>
        </div>
      </header>

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
          <div className="main-content-col">
            {/* Featured Stories Wrapper: 2 Items */}
            <div className="featured-stories-wrap">
              {featuredStories.map((story) => (
                <article className="featured-story" key={story.slug}>
                  <Placeholder className="featured-image" />
                  <div className="featured-copy">
                    <h2>{story.title}</h2>
                    <Tags tags={story.tags} />
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
            
            {/* Shorts Section */}
            <section className="shorts">
              <a className="section-title" href="#shorts">
                Shorts
              </a>
              <div className="short-row">
                {shorts.map((short) => (
                  <a className="short" href={`#${short.slug}`} key={short.slug}>
                    <Placeholder />
                    <b>{short.title}</b>
                  </a>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Completely reserved for Latest Items */}
          <aside className="latest-sidebar" aria-label="Latest Stories">
            <h2 className="latest-heading">Latest</h2>
            <div className="latest-headlines">
              {latestStories.map((story, i) => (
                <a href={`/articles/${story.slug}`} key={story.slug + i}>
                  {story.title}
                </a>
              ))}
            </div>
          </aside>
        </div>

      </div>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-inner">
          <span className="newsletter-eyebrow">WEEKLY DISPATCH</span>
          <h2 className="newsletter-heading">
            The Himalayas, explained every week.
          </h2>
          <p className="newsletter-desc">
            Expeditions, climate, wildlife, and deep investigative stories
            delivered directly to your inbox every Thursday morning.
          </p>
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email address"
              aria-label="Email address"
            />
            <button type="button">SUBSCRIBE</button>
          </form>
          <p className="newsletter-disclaimer">
            Free weekly edition. Zero spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Dark Footer */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-main">
            {/* Column 1: Brand & Bio */}
            <div className="footer-brand">
              <a
                href="/"
                className="footer-logo-link"
                aria-label="Everest Chronicle"
              >
                <img
                  src="/brand/logo.png"
                  alt="Everest Chronicle"
                  className="footer-brand-logo"
                />
              </a>
              <p className="footer-bio">
                Independent reporting, climate investigation, and authentic
                visual storytelling from Nepal and across the high Himalayas.
              </p>
            </div>

            {/* Column 2: Sections */}
            <div className="footer-col">
              <h3 className="footer-col-title">SECTIONS</h3>
              <div className="footer-nav-list">
                {footerSections.map((item) => (
                  <a href={`#${item.slug}`} key={item.slug}>
                    {item.title}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 3: About */}
            <div className="footer-col">
              <h3 className="footer-col-title">ABOUT</h3>
              <div className="footer-nav-list">
                {footerAbout.map((item) => (
                  <a href={`#${item.slug}`} key={item.slug}>
                    {item.title}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 4: Follow */}
            <div className="footer-col">
              <h3 className="footer-col-title">FOLLOW</h3>
              <div className="footer-nav-list">
                {footerFollow.map((item) => (
                  <a
                    href={
                      item.slug.startsWith("http")
                        ? item.slug
                        : `#${item.slug}`
                    }
                    key={item.title}
                    target={
                      item.slug.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      item.slug.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom">
            <small>© 2026 Everest Chronicle. All rights reserved.</small>
            <a href="#top" className="footer-back-to-top">
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
