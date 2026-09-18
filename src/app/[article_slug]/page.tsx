import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import type { AuthorMeta } from "@/types/content";
import { authorSlugFromName } from "@/data/authors";
import {
  type ArticleBodyBlock,
  articleRegistry,
  fallbackArticle,
} from "@/data/articles";

interface PageProps {
  params: Promise<{ article_slug: string }>;
}

function getArticle(slug: string) {
  return (
    articleRegistry[slug] ?? {
      ...fallbackArticle,
      slug,
      title: fallbackArticle.title,
    }
  );
}

function formatAuthors(authors?: AuthorMeta[]): string {
  if (!authors || authors.length === 0) return "Everest Chronicle Desk";
  const names = authors.map((a) => a.name).filter(Boolean);
  if (names.length === 0) return "Everest Chronicle Desk";
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

function ArticleBodyBlockView({
  block,
}: {
  block: ArticleBodyBlock;
}) {
  switch (block.type) {
    case "heading":
      return <h2>{block.text}</h2>;
    case "paragraph":
      return <p>{block.text}</p>;
    case "imageGrid": {
      const isOddGrid = block.images.length % 2 === 1;

      return (
        <figure className="article-inline-media">
          <div
            className={`article-inline-media-grid ${
              isOddGrid ? "is-odd" : ""
            }`}
          >
            {block.images.map((image, imageIndex) =>
              image.src ? (
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  key={`${image.alt}-${imageIndex}`}
                />
              ) : (
                <div
                  className="article-inline-media-placeholder"
                  aria-label={image.alt}
                  role="img"
                  key={`${image.alt}-${imageIndex}`}
                />
              )
            )}
          </div>
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
    }
    case "wideImage":
    case "fullWideImage": {
      const className =
        block.type === "fullWideImage"
          ? "article-full-wide-media"
          : "article-wide-media";
      const placeholderClassName =
        block.type === "fullWideImage"
          ? "article-full-wide-media-placeholder"
          : "article-wide-media-placeholder";

      return (
        <figure className={className}>
          {block.image?.src ? (
            <img
              src={block.image.src}
              alt={block.image.alt}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div
              className={placeholderClassName}
              aria-label={block.image?.alt}
              role="img"
            />
          )}
          {(block.caption || block.credit) && (
            <figcaption>
              <span>{block.caption}</span>
              {block.credit && (
                <span className="article-photo-credit"> | {block.credit}</span>
              )}
            </figcaption>
          )}
        </figure>
      );
    }
    default:
      return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { article_slug } = await params;
  const article = getArticle(article_slug);
  const authorName =
    article.authors && article.authors.length > 0
      ? article.authors.map((a) => a.name).join(", ")
      : "Everest Chronicle Desk";

  const title = article.meta?.metaTitle || `${article.title} | Everest Chronicle`;
  const description = article.meta?.metaDescription || article.dek;
  const ogImage =
    article.meta?.ogImage || article.image || "/images/homepage/nepal-rescue.jpg";

  return {
    title,
    description,
    keywords: article.meta?.keywords,
    authors:
      article.authors && article.authors.length > 0
        ? article.authors.map((a) => ({ name: a.name }))
        : [{ name: authorName }],
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://everestchronicle.com/${article.slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      publishedTime: article.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { article_slug } = await params;
  const article = getArticle(article_slug);
  const formattedAuthors = formatAuthors(article.authors);

  // Build ordered list of all registered articles for prev/next
  const allSlugs = Object.keys(articleRegistry);
  const currentIndex = allSlugs.indexOf(article_slug);
  const prevSlug = currentIndex > 0 ? allSlugs[currentIndex - 1] : null;
  const nextSlug =
    currentIndex !== -1 && currentIndex < allSlugs.length - 1
      ? allSlugs[currentIndex + 1]
      : null;
  const prevArticle = prevSlug ? articleRegistry[prevSlug] : null;
  const nextArticle = nextSlug ? articleRegistry[nextSlug] : null;

  // Related articles (4 items in a row)
  const RELATED_LIMIT = 4;
  const relatedList: typeof articleRegistry[string][] = [];
  const addedSlugs = new Set<string>([article.slug]);

  // 1. If explicit relatedSlugs are defined, prioritize them
  if (article.relatedSlugs && article.relatedSlugs.length > 0) {
    for (const slug of article.relatedSlugs) {
      if (articleRegistry[slug] && !addedSlugs.has(slug)) {
        relatedList.push(articleRegistry[slug]);
        addedSlugs.add(slug);
        if (relatedList.length >= RELATED_LIMIT) break;
      }
    }
  }

  // 2. Add articles in matching categories
  if (relatedList.length < RELATED_LIMIT) {
    const currentCategorySlugs = new Set(article.categories.map((c) => c.slug));
    for (const item of Object.values(articleRegistry)) {
      if (!addedSlugs.has(item.slug) && item.categories.some((c) => currentCategorySlugs.has(c.slug))) {
        relatedList.push(item);
        addedSlugs.add(item.slug);
        if (relatedList.length >= RELATED_LIMIT) break;
      }
    }
  }

  // 3. Fallback to any remaining articles
  if (relatedList.length < RELATED_LIMIT) {
    for (const item of Object.values(articleRegistry)) {
      if (!addedSlugs.has(item.slug)) {
        relatedList.push(item);
        addedSlugs.add(item.slug);
        if (relatedList.length >= RELATED_LIMIT) break;
      }
    }
  }

  const shareUrl = `https://everestchronicle.com/${article.slug}`;
  const shareTitle = encodeURIComponent(article.title);

  return (
    <main id="top">
      <SiteHeader />

      <article className="article-detail-shell">
        <header className="article-detail-header">
          <div className="article-detail-tags" aria-label="Article categories">
            {article.categories.map((category) => (
              <Link href={`/category/${category.slug}`} key={category.title}>
                {category.title}
              </Link>
            ))}
          </div>

          <h1>{article.title}</h1>
          <p className="article-detail-dek">{article.dek}</p>

          <div className="article-header-meta">
            <time dateTime={article.publishedAt} className="article-meta-date">
              {article.publishedAt}
            </time>
            <span className="article-meta-sep" aria-hidden="true">|</span>
            <span className="article-meta-author">
              {article.authors && article.authors.length > 0 ? (
                article.authors.map((auth, idx) => {
                  const authorSlug = auth.slug || authorSlugFromName(auth.name);
                  return (
                    <span key={auth.name || idx}>
                      {idx > 0 && (idx === article.authors.length - 1 ? " and " : ", ")}
                      <Link href={`/author/${authorSlug}`} className="article-author-link">
                        {auth.name}
                      </Link>
                    </span>
                  );
                })
              ) : (
                <span>Everest Chronicle Desk</span>
              )}
            </span>
          </div>
        </header>

        <figure className="article-hero-figure">
          {article.image ? (
            <img src={article.image} alt={article.title} loading="eager" decoding="async" />
          ) : (
            <div className="article-hero-placeholder" aria-hidden="true" />
          )}
          {(article.caption || article.credit) && (
            <figcaption>
              <span>{article.caption}</span>
              {article.credit && (
                <span className="article-photo-credit"> | {article.credit}</span>
              )}
            </figcaption>
          )}
        </figure>

        <div className="article-body">
          {article.body.map((block, index) => (
            <ArticleBodyBlockView
              block={block}
              key={`${block.type}-${index}`}
            />
          ))}
        </div>
      </article>

      {/* ── Social Share ───────────────────────────────────────────── */}
      <div className="article-social-share" aria-label="Share this article">
        <span className="article-social-share-label">Share</span>
        <div className="article-social-share-buttons">
          <a
            id="share-twitter"
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareTitle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="article-share-btn article-share-btn--twitter"
            aria-label="Share on X (Twitter)"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span>Share</span>
          </a>
          <a
            id="share-facebook"
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="article-share-btn article-share-btn--facebook"
            aria-label="Share on Facebook"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span>Facebook</span>
          </a>
          <a
            id="share-linkedin"
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="article-share-btn article-share-btn--linkedin"
            aria-label="Share on LinkedIn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <span>LinkedIn</span>
          </a>
        </div>
      </div>

      {/* ── Prev / Next Navigation ─────────────────────────────────── */}
      {(prevArticle || nextArticle) && (
        <nav className="article-prev-next" aria-label="Article navigation">
          <div className="article-prev-next-inner">
            {prevArticle ? (
              <Link href={`/${prevArticle.slug}`} className="article-nav-card article-nav-card--prev" id="nav-prev-article">
                <span className="article-nav-direction">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
                  Previous
                </span>
                <span className="article-nav-title">{prevArticle.title}</span>
              </Link>
            ) : (
              <div className="article-nav-card article-nav-card--empty" />
            )}

            {nextArticle ? (
              <Link href={`/${nextArticle.slug}`} className="article-nav-card article-nav-card--next" id="nav-next-article">
                <span className="article-nav-direction">
                  Next
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </span>
                <span className="article-nav-title">{nextArticle.title}</span>
              </Link>
            ) : (
              <div className="article-nav-card article-nav-card--empty" />
            )}
          </div>
        </nav>
      )}

      {/* ── Related Articles (6 items) ────────────────────────────── */}
      {relatedList.length > 0 && (
        <section className="article-related" aria-label="Related articles">
          <div className="article-related-inner">
            <h2 className="article-related-heading">Related Articles</h2>
            <div className="article-related-grid">
              {relatedList.map((rel) => {
                const relAuthorName =
                  rel.authors?.[0]?.name ?? "Everest Chronicle Desk";
                return (
                  <article className="card" key={rel.slug}>
                    <Link href={`/${rel.slug}`} className="card-image-link" tabIndex={-1} aria-hidden="true">
                      {rel.image ? (
                        <img src={rel.image} alt={rel.title} loading="lazy" decoding="async" className="card-image" />
                      ) : (
                        <div className="placeholder card-image" aria-hidden="true" />
                      )}
                    </Link>
                    <div className="tags">
                      {rel.categories.map((c, cIdx) => (
                        <span key={`${c.slug}-${c.title}-${cIdx}`}>{c.title}</span>
                      ))}
                    </div>
                    <h3>
                      <Link href={`/${rel.slug}`}>{rel.title}</Link>
                    </h3>
                    <p>{rel.dek}</p>
                    <div className="meta">
                      <time>{rel.publishedAt}</time>
                      <span>{relAuthorName}</span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </main>
  );
}
