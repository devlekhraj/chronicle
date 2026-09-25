import type { Metadata } from "next";
import { cache, ViewTransition } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import SafeImage from "@/components/ui/SafeImage";
import {
  type ArticleCategory,
  ArticleImageRef,
  type ArticleBodyBlock,
  type ArticleSummary,
  type AuthorMeta,
  type SeoMeta,
} from "@/types/content";
import { getArticleDetail, isNotFoundError } from "@/lib/ec-api";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  buildPageMetadata,
  jsonLdGraph,
  newsArticleJsonLd,
} from "@/lib/seo";

interface PageProps {
  params: Promise<{ article_slug: string }>;
}

/*
 * Article content depends on `params`, so it can never live in the shared App
 * Shell; the navigation is allowed to block until the payload resolves. The
 * transition still reads as smooth because the header/footer persist and the
 * outgoing page crossfades into the incoming one.
 */
export const instant = false;

interface CategoryRef {
  title: string;
  slug: string;
}

interface NeighbourCard {
  slug: string;
  title: string;
}

interface RelatedCard {
  slug: string;
  title: string;
  image?: string;
  imageAlt?: string;
  categories: CategoryRef[];
  blurb?: string;
  publishedAt?: string;
  publishedAtIso?: string;
  authorName?: string;
}

interface ArticleView {
  slug: string;
  title: string;
  dek?: string;
  categories: CategoryRef[];
  publishedAt?: string;
  publishedAtIso?: string;
  updatedAtIso?: string;
  readTime?: string;
  authors: AuthorMeta[];
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  caption?: string;
  credit?: string;
  body: ArticleBodyBlock[];
  meta?: SeoMeta;
  prev: NeighbourCard | null;
  next: NeighbourCard | null;
  related: RelatedCard[];
}

/* ── Normalisation ──────────────────────────────────────────────────────── */

function normaliseCategories(
  categories?: (string | ArticleCategory)[]
): CategoryRef[] {
  if (!categories) return [];

  return categories.map((category) =>
    typeof category === "string"
      ? { title: category, slug: category.toLowerCase().replace(/\s+/g, "-") }
      : { title: category.title, slug: category.slug }
  );
}

function summaryToCard(summary: ArticleSummary): RelatedCard {
  return {
    slug: summary.slug,
    title: summary.title,
    image: summary.image,
    imageAlt: summary.imageMeta?.alt,
    categories: normaliseCategories(summary.categories),
    blurb: summary.excerpt,
    publishedAt: summary.publishedAt,
    publishedAtIso: summary.publishedAtIso ?? summary.updatedAt,
    authorName:
      typeof summary.author === "string"
        ? summary.author
        : summary.author?.name ?? summary.authors?.[0]?.name,
  };
}

function authorSlugFromName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/**
 * Whether `updatedAt` represents a real editorial revision rather than the
 * routine save that bumps the API's timestamp. Same-day edits are treated as
 * technical, so `dateModified` stays out of the structured data (docs §34).
 */
function isMaterialRevision(
  publishedIso?: string,
  updatedIso?: string
): boolean {
  if (!publishedIso || !updatedIso) return false;

  const published = Date.parse(publishedIso);
  const updated = Date.parse(updatedIso);

  if (Number.isNaN(published) || Number.isNaN(updated)) return false;

  return updated - published >= 24 * 60 * 60 * 1000;
}

/**
 * Human-readable revision date matching the API's published-date style
 * ("Sep 20, 2026"). Pinned to the newsroom timezone so the server-rendered
 * output does not depend on the host locale (docs §34).
 */
const REVISION_DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "Asia/Kathmandu",
});

function formatRevisionDate(iso?: string): string | undefined {
  if (!iso) return undefined;

  const parsed = new Date(iso);

  return Number.isNaN(parsed.getTime())
    ? undefined
    : REVISION_DATE_FORMAT.format(parsed);
}

const loadArticleView = cache(async function loadArticleView(slug: string): Promise<ArticleView | null> {
  try {
    const data = await getArticleDetail(slug);
    const article = data.article;

    return {
      slug: article.slug,
      title: article.title,
      dek: article.dek ?? article.excerpt ?? undefined,
      categories: normaliseCategories(article.categories),
      publishedAt: article.publishedAt ?? undefined,
      publishedAtIso: article.publishedAtIso ?? article.publishedAt ?? undefined,
      updatedAtIso: article.updatedAt ?? undefined,
      readTime: article.readTime ?? undefined,
      authors: article.authors ?? [],
      image: article.image ?? undefined,
      imageAlt: article.imageMeta?.alt ?? undefined,
      imageWidth: article.imageMeta?.width ?? undefined,
      imageHeight: article.imageMeta?.height ?? undefined,
      caption: article.caption ?? undefined,
      credit: article.credit ?? undefined,
      body: article.body ?? [],
      meta: article.meta,
      prev: data.prev ? { slug: data.prev.slug, title: data.prev.title } : null,
      next: data.next ? { slug: data.next.slug, title: data.next.title } : null,
      related: (data.related ?? []).map(summaryToCard),
    };
  } catch (error) {
    // A 404 from the API means the slug genuinely does not exist.
    if (isNotFoundError(error)) {
      return null;
    }

    throw error;
  }
});

/* ── Body blocks ────────────────────────────────────────────────────────── */

function formatAuthors(authors?: AuthorMeta[]): string {
  if (!authors || authors.length === 0) return "Everest Chronicle Desk";
  const names = authors.map((a) => a.name).filter(Boolean);
  if (names.length === 0) return "Everest Chronicle Desk";
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

function MediaLink({
  link,
  children,
}: {
  link?: string;
  children: React.ReactNode;
}) {
  if (!link) {
    return <div className="article-media-link">{children}</div>;
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="article-media-link"
    >
      {children}
    </a>
  );
}

function MediaCaption({
  caption,
  credit,
}: {
  caption?: string;
  credit?: string;
}) {
  if (!caption && !credit) return null;

  return (
    <figcaption>
      <span>{caption ?? ""}</span>
      {credit && <span className="article-photo-credit"> | {credit}</span>}
    </figcaption>
  );
}

function BlockImage({
  image,
  width,
  height,
  className,
}: {
  image?: ArticleImageRef;
  width: number;
  height: number;
  className: string;
}) {
  if (!image?.src) {
    return (
      <div className={className} role="img" aria-label={image?.alt || undefined} />
    );
  }

  return (
    <SafeImage
      src={image.src}
      alt={image.alt ?? ""}
      width={width}
      height={height}
      loading="lazy"
      className={className}
    />
  );
}

function ArticleBodyBlockView({ block }: { block: ArticleBodyBlock }) {
  switch (block.type) {
    case "heading": {
      const level = block.level ?? "h2";

      if (level === "p") {
        return <p className="article-paragraph">{block.text}</p>;
      }

      const Tag = level;
      return <Tag>{block.text}</Tag>;
    }

    case "paragraph":
      return <p className="article-paragraph">{block.text}</p>;

    case "richText":
      return (
        <div
          className="article-rich-text"
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      );

    case "divider":
      return <hr className="article-divider" />;

    case "quotation":
      return (
        <blockquote className="article-quotation">
          <p>{block.text}</p>
          {block.citation && <cite>— {block.citation}</cite>}
        </blockquote>
      );

    case "list": {
      const items = block.items ?? [];

      if (items.length === 0) return null;

      return block.ordered ? (
        <ol className="article-list">
          {items.map((item, index) => (
            <li key={`${item}-${index}`}>{item}</li>
          ))}
        </ol>
      ) : (
        <ul className="article-list">
          {items.map((item, index) => (
            <li key={`${item}-${index}`}>{item}</li>
          ))}
        </ul>
      );
    }

    case "imageGrid": {
      const images = (block.images ?? []).filter((image) => image.src || image.alt);
      const columns = block.columns && block.columns >= 2 && block.columns <= 4 ? block.columns : 2;
      const remainder = images.length % columns;
      const fullRow = remainder === 0 ? images : images.slice(0, -remainder);
      const lastRow = remainder === 0 ? [] : images.slice(-remainder);

      if (images.length === 0 && !block.caption && !block.credit) {
        return null;
      }

      return (
        <figure className="article-inline-media">
          {fullRow.length > 0 && (
            <div
              className="article-inline-media-grid"
              style={{ "--grid-columns": columns } as React.CSSProperties}
            >
              {fullRow.map((image, index) => (
                <MediaLink link={block.link} key={`grid-${index}`}>
                  <BlockImage
                    image={image}
                    width={600}
                    height={400}
                    className="article-inline-media-placeholder"
                  />
                </MediaLink>
              ))}
            </div>
          )}

          {lastRow.length > 0 && (
            <div className="article-inline-media-last-row">
              {lastRow.map((image, index) => (
                <MediaLink link={block.link} key={`last-${index}`}>
                  <BlockImage
                    image={image}
                    width={600}
                    height={400}
                    className="article-inline-media-placeholder"
                  />
                </MediaLink>
              ))}
            </div>
          )}

          <MediaCaption caption={block.caption} credit={block.credit} />
        </figure>
      );
    }

    case "wideImage":
    case "fullWideImage": {
      const isFullWide = block.type === "fullWideImage";
      const className = isFullWide ? "article-full-wide-media" : "article-wide-media";
      const placeholderClassName = isFullWide
        ? "article-full-wide-media-placeholder"
        : "article-wide-media-placeholder";

      return (
        <figure className={className}>
          <MediaLink link={block.link}>
            <BlockImage
              image={block.image}
              width={1200}
              height={700}
              className={placeholderClassName}
            />
          </MediaLink>

          <MediaCaption caption={block.caption} credit={block.credit} />
        </figure>
      );
    }

    case "table": {
      const columns = block.columns ?? [];
      const rows = block.rows ?? [];
      const columnCount = Math.max(
        columns.length,
        rows.reduce((max, row) => Math.max(max, row.length), 0)
      );

      if (columnCount === 0) return null;

      return (
        <figure className="article-table-figure">
          <div className="article-table-scroll">
            <table className={`article-table${block.striped ? " is-striped" : ""}`}>
              {block.hasHeader !== false && columns.length > 0 && (
                <thead>
                  <tr>
                    {columns.map((column, index) => (
                      <th scope="col" key={`${column}-${index}`}>
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr key={`row-${rowIndex}`}>
                    {Array.from({ length: columnCount }, (_, columnIndex) => (
                      <td key={`cell-${rowIndex}-${columnIndex}`}>
                        {row[columnIndex] ?? ""}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
    }

    default:
      return null;
  }
}

/* ── Metadata ───────────────────────────────────────────────────────────── */

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { article_slug } = await params;
  const article = await loadArticleView(article_slug);

  /*
   * Do not throw `notFound()` here. Next resolves metadata before streaming
   * only for recognised crawlers, so throwing here yields a 500 for some bots
   * while ordinary requests still get a streamed 200. The page body calls
   * `notFound()` instead, and this metadata keeps the fallback `noindex`.
   */
  if (!article) {
    return {
      title: "Article Not Found",
      robots: { index: false, follow: true },
    };
  }

  const title = article.meta?.metaTitle || article.title;
  const description = article.meta?.metaDescription || article.dek;
  /*
   * The visible hero is the article's representative image, so the SEO
   * override is only a fallback. That keeps hero / schema / OG / Twitter
   * pointing at the same asset where practical (docs §33).
   */
  const image = article.image ?? article.meta?.ogImage;

  return buildPageMetadata({
    title,
    description,
    path: `/${article.slug}`,
    type: "article",
    keywords: article.meta?.keywords,
    authors:
      article.authors.length > 0
        ? article.authors.map((a) => a.name)
        : [formatAuthors(article.authors)],
    images: image
      ? [
          {
            url: image,
            // Report the asset's real dimensions when the API supplies them
            // so crawlers are not given misleading metadata (docs §16).
            width: article.imageWidth ?? 1200,
            height: article.imageHeight ?? 630,
            alt: article.imageAlt ?? article.title,
          },
        ]
      : undefined,
    publishedTime: article.publishedAtIso,
    // Only advertised when it differs materially from publication (docs §34).
    modifiedTime: isMaterialRevision(article.publishedAtIso, article.updatedAtIso)
      ? article.updatedAtIso
      : undefined,
  });
}

/* ── Page ───────────────────────────────────────────────────────────────── */

export default async function ArticlePage({ params }: PageProps) {
  const { article_slug } = await params;
  const article = await loadArticleView(article_slug);

  if (!article) {
    notFound();
  }

  const shareUrl = absoluteUrl(`/${article.slug}`);
  const shareTitle = encodeURIComponent(article.title);

  /*
   * The API does not yet expose `primary_category` / `is_primary`, so the
   * first assigned category stands in as the primary one. It drives the
   * structured breadcrumb hierarchy and `articleSection` only — never the
   * canonical URL, which stays category-independent (docs §15, §48A).
   */
  const primaryCategory = article.categories[0];

  const breadcrumbEntries = [
    ...(primaryCategory
      ? [
          {
            name: primaryCategory.title,
            path: `/category/${primaryCategory.slug}`,
          },
        ]
      : [{ name: "Home", path: "/" }]),
    { name: article.title },
  ];

  /*
   * `dateModified` is only emitted for a materially later revision. The API
   * bumps `updatedAt` on every save, and the standard forbids signalling a
   * freshness change for trivial technical edits (docs §34).
   */
  const dateModified = isMaterialRevision(
    article.publishedAtIso,
    article.updatedAtIso
  )
    ? article.updatedAtIso
    : undefined;

  const updatedAtDisplay = formatRevisionDate(dateModified);

  const articleJsonLd = jsonLdGraph([
    newsArticleJsonLd({
      path: `/${article.slug}`,
      headline: article.title,
      description: article.dek,
      images: article.image ? [article.image] : [],
      datePublished: article.publishedAtIso,
      dateModified,
      section: primaryCategory?.title,
      authors: article.authors.map((author) => ({
        name: author.name,
        slug: author.slug || authorSlugFromName(author.name),
      })),
    }),
  ]);

  return (
    <ViewTransition default="page">
      <main>
        <JsonLd data={articleJsonLd} />

        {/*
          No visible breadcrumb: the category links below the header already
          give clear section context, which the standard prefers over a large
          trail. The `BreadcrumbList` above still exposes the hierarchy.
        */}
        <JsonLd data={breadcrumbJsonLd(breadcrumbEntries)} />

        <article className="article-detail-shell">
          <header className="article-detail-header">
            <div className="article-detail-tags" aria-label="Article categories">
              {article.categories.map((category) => (
                <Link href={`/category/${category.slug}`} key={category.slug}>
                  {category.title}
                </Link>
              ))}
            </div>

            <h1>{article.title}</h1>
            {article.dek && <p className="article-detail-dek">{article.dek}</p>}

            {/*
              Header order follows the standard (docs §18): byline first, then
              publication date, then reading time. None of these are headings.
            */}
            <div className="article-header-meta">
              <span className="article-meta-author">
                By{" "}
                {article.authors.length > 0 ? (
                  article.authors.map((auth, idx) => {
                    const authorSlug = auth.slug || authorSlugFromName(auth.name);
                    return (
                      <span key={auth.name || idx}>
                        {idx > 0 && (idx === article.authors.length - 1 ? " and " : ", ")}
                        <Link
                          href={`/author/${authorSlug}`}
                          rel="author"
                          className="article-author-link"
                        >
                          {auth.name}
                        </Link>
                      </span>
                    );
                  })
                ) : (
                  <span>Everest Chronicle Desk</span>
                )}
              </span>
              {article.publishedAt && (
                <>
                  <span className="article-meta-sep" aria-hidden="true">|</span>
                  <time dateTime={article.publishedAtIso} className="article-meta-date">
                    {article.publishedAt}
                  </time>
                </>
              )}
              {/*
                Shown only when the revision is material — the same condition
                that emits `dateModified` — so the visible and structured dates
                never disagree (docs §34).
              */}
              {dateModified && updatedAtDisplay && (
                <>
                  <span className="article-meta-sep" aria-hidden="true">|</span>
                  <time dateTime={dateModified} className="article-meta-updated">
                    Updated {updatedAtDisplay}
                  </time>
                </>
              )}
              {article.readTime && (
                <>
                  <span className="article-meta-sep" aria-hidden="true">|</span>
                  <span className="article-meta-readtime">{article.readTime}</span>
                </>
              )}
            </div>
          </header>

          <figure className="article-hero-figure">
            {article.image ? (
              <SafeImage
                src={article.image}
                alt={article.imageAlt ?? article.title}
                width={article.imageWidth ?? 1200}
                height={article.imageHeight ?? 700}
                priority
                quality={72}
                sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1044px) 92vw, 960px"
                className="article-hero-image"
              />
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

        {/* ── Related Articles ──────────────────────────────────────── */}
        {article.related.length > 0 && (
          <section className="article-related" aria-label="Related articles">
            <div className="article-related-inner">
              <h2 className="article-related-heading">Related Articles</h2>
              <div className="article-related-grid">
                {article.related.map((rel) => (
                  <article className="card" key={rel.slug}>
                    <Link href={`/${rel.slug}`} className="card-image-link" tabIndex={-1} aria-hidden="true">
                      {rel.image ? (
                        <SafeImage
                          src={rel.image}
                          alt={rel.imageAlt ?? rel.title}
                          width={400}
                          height={250}
                          loading="lazy"
                          quality={64}
                          sizes="(max-width: 640px) calc(50vw - 26px), (max-width: 1024px) calc(50vw - 34px), 217px"
                          className="card-image"
                        />
                      ) : (
                        <div className="placeholder card-image" aria-hidden="true" />
                      )}
                    </Link>
                    <div className="tags">
                      {rel.categories.map((category, index) => (
                        <Link
                          href={`/category/${category.slug}`}
                          key={`${category.slug}-${index}`}
                        >
                          {category.title}
                        </Link>
                      ))}
                    </div>
                    <h3>
                      <Link href={`/${rel.slug}`}>{rel.title}</Link>
                    </h3>
                    {rel.blurb && <p>{rel.blurb}</p>}
                    <div className="meta">
                      <span className="meta-author">
                        By {rel.authorName ?? "Everest Chronicle Desk"}
                      </span>
                      <span className="meta-sep" aria-hidden="true">|</span>
                      <time dateTime={rel.publishedAtIso}>{rel.publishedAt}</time>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </ViewTransition>
  );
}
