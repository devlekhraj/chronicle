import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import AuthorStoriesList from "@/components/author/AuthorStoriesList";
import { EcApiError, getAuthorPageData, getNavigationItems } from "@/lib/ec-api";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { author } = await getAuthorPageData(slug);

    const title = `${author.name} | Everest Chronicle`;
    const description = author.bio;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "profile",
        url: `https://everestchronicle.com/author/${author.slug}`,
        images: [
          {
            url: author.avatar,
            width: 600,
            height: 600,
            alt: author.name,
          },
        ],
      },
      twitter: {
        card: "summary",
        title,
        description,
        images: [author.avatar],
      },
    };
  } catch (error) {
    if (error instanceof EcApiError && error.status === 404) {
      return {
        title: "Author Not Found | Everest Chronicle",
      };
    }

    throw error;
  }
}

export default async function AuthorDetailPage({ params }: PageProps) {
  const { slug } = await params;
  let data;
  let navigationItems;

  try {
    [data, navigationItems] = await Promise.all([
      getAuthorPageData(slug),
      getNavigationItems(),
    ]);
  } catch (error) {
    if (error instanceof EcApiError && error.status === 404) {
      notFound();
    }

    throw error;
  }

  const { author, articles, mostRead, topics: apiTopics } = data;
  const featuredArticle = articles.length > 0 ? articles[0] : null;
  const latestStories = articles.slice(1);

  // Author topics
  const topics = apiTopics ?? author.beats ?? [];

  const featuredCategory =
    featuredArticle?.categories && featuredArticle.categories.length > 0
      ? featuredArticle.categories[0]
      : null;

  return (
    <main id="top" className="author-page-wrapper">
      <SiteHeader navigationItems={navigationItems} />

      <div className="author-page-shell">
        {/* ── Breadcrumb ───────────────────────────────────────────── */}
        <nav className="author-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">HOME</Link>
          <span className="author-breadcrumb-sep" aria-hidden="true">/</span>
          <span>AUTHORS</span>
          <span className="author-breadcrumb-sep" aria-hidden="true">/</span>
          <span className="author-breadcrumb-current">{author.name.toUpperCase()}</span>
        </nav>

        {/* ── Author Profile Hero Card ─────────────────────────────── */}
        <section className="author-profile-hero" aria-label="Author Profile">
          <div className="author-hero-kicker">AUTHOR</div>

          <div className="author-hero-avatar-wrap">
            <Image
              src={author.avatar}
              alt={author.name}
              width={120}
              height={120}
              className="author-hero-avatar"
              priority
            />
          </div>

          <h1 className="author-hero-name">{author.name}</h1>
          <p className="author-hero-role">{author.role}</p>

          {author.beats && author.beats.length > 0 && (
            <div className="author-hero-beats">
              {author.beats.map((beat, i) => (
                <span key={beat} className="author-hero-beat-item">
                  {i > 0 && <span className="author-beat-dot" aria-hidden="true">·</span>}
                  {beat}
                </span>
              ))}
            </div>
          )}

          <p className="author-hero-bio">{author.bio}</p>

          <div className="author-hero-meta">
            <span>{author.location || "Kathmandu, Nepal"}</span>
            <span className="author-meta-dot" aria-hidden="true">·</span>
            <span>{articles.length || author.storyCount || 12} Stories</span>
            <span className="author-meta-dot" aria-hidden="true">·</span>
            <span>Since {author.sinceYear || 2019}</span>
          </div>

          {/* Social Links */}
          <div className="author-hero-socials" aria-label="Author Social Profiles">
            {author.socials?.twitter && (
              <a
                href={author.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="article-share-btn article-share-btn--twitter"
                aria-label="X (formerly Twitter)"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>X</span>
              </a>
            )}
            {author.socials?.facebook && (
              <a
                href={author.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="article-share-btn article-share-btn--facebook"
                aria-label="Facebook"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Facebook</span>
              </a>
            )}
            {author.socials?.linkedin && (
              <a
                href={author.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="article-share-btn article-share-btn--linkedin"
                aria-label="LinkedIn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span>LinkedIn</span>
              </a>
            )}
            {author.socials?.email && (
              <a
                href={author.socials.email}
                className="article-share-btn article-share-btn--email"
                aria-label="Email"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>Email</span>
              </a>
            )}
          </div>
        </section>

        {/* ── Featured Story Section ───────────────────────────────── */}
        {featuredArticle && (
          <section className="author-featured-section" aria-label="Featured Story">
            <h2 className="author-section-kicker">FEATURED STORY</h2>

            <article className="author-featured-card">
              <div className="author-featured-media">
                <Link href={`/${featuredArticle.slug}`} className="author-featured-img-link" tabIndex={-1} aria-hidden="true">
                  {featuredArticle.image ? (
                    <Image
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      width={640}
                      height={400}
                      className="author-featured-img"
                      priority
                    />
                  ) : (
                    <div className="author-featured-placeholder" />
                  )}
                </Link>
              </div>

              <div className="author-featured-body">
                {featuredCategory && (
                  <Link
                    href={`/category/${typeof featuredCategory === "string" ? featuredCategory.toLowerCase().replace(/[^a-z0-9]+/g, "-") : featuredCategory.slug}`}
                    className="author-featured-tag"
                  >
                    {typeof featuredCategory === "string" ? featuredCategory : featuredCategory.title}
                  </Link>
                )}

                <h3 className="author-featured-title">
                  <Link href={`/${featuredArticle.slug}`}>
                    {featuredArticle.title}
                  </Link>
                </h3>

                {featuredArticle.excerpt && (
                  <p className="author-featured-dek">{featuredArticle.excerpt}</p>
                )}

                <time dateTime={featuredArticle.publishedAt} className="author-featured-date">
                  {featuredArticle.publishedAt}
                </time>
              </div>
            </article>
          </section>
        )}

        {/* ── Main Content Split (Latest Stories + Sidebar) ────────── */}
        <div className="author-content-layout">
          {/* Left Column: Latest Stories */}
          <section className="author-main-column" aria-label="Latest Stories">
            <h2 className="author-section-kicker">LATEST STORIES</h2>

            <AuthorStoriesList
              stories={latestStories.length > 0 ? latestStories : (featuredArticle ? [featuredArticle] : [])}
              initialCount={4}
            />
          </section>

          {/* Right Column: Sidebar (Most Read + Topics) */}
          <aside className="author-sidebar-column" aria-label="Author Sidebar">
            {/* Most Read List */}
            <div className="author-sidebar-block">
              <h2 className="author-sidebar-heading">MOST READ</h2>

              <div className="author-most-read-list">
                {mostRead.map((item, index) => {
                  const numberStr = String(index + 1).padStart(2, "0");
                  return (
                    <div className="author-most-read-item" key={item.slug}>
                      <span className="author-most-read-num" aria-hidden="true">
                        {numberStr}
                      </span>
                      <div className="author-most-read-body">
                        <h4 className="author-most-read-title">
                          <Link href={`/${item.slug}`}>{item.title}</Link>
                        </h4>
                        <time className="author-most-read-date">
                          {item.publishedAt}
                        </time>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Topics Section */}
            <div className="author-sidebar-block author-sidebar-block--topics">
              <h2 className="author-sidebar-heading">TOPICS</h2>

              <div className="author-topics-cloud">
                {topics.map((topic) => (
                  <Link
                    href={`/category/${topic.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    key={topic}
                    className="author-topic-pill"
                  >
                    {topic}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
