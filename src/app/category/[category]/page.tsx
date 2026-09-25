import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import { ViewTransition } from "react";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import SafeImage from "@/components/ui/SafeImage";
import Pagination from "@/components/ui/Pagination";
import { getCategoryPageData, isNotFoundError } from "@/lib/ec-api";
import { breadcrumbJsonLd, buildPageMetadata, paginatedPath } from "@/lib/seo";
import type { ArticleSummary } from "@/types/content";

interface PageProps {
  params: Promise<{ category: string }>;
  searchParams?: Promise<{ page?: string }>;
}

/*
 * Listings depend on `params`/`searchParams` (URL data), which cannot live in
 * the shared App Shell, so the navigation is allowed to block. The outgoing
 * page crossfades into the incoming one instead of hard-swapping.
 */
export const instant = false;

const CATEGORY_ALIASES: Record<string, string> = {
  expeditions: "expedition",
};

interface CategoryView {
  title: string;
  slug: string;
  description?: string;
  countLabel: string;
  articles: ArticleSummary[];
  currentPage: number;
  totalPages: number;
}

/** Mirrors `Math.max(1, parseInt(searchParams?.page || "1", 10) || 1)`. */
function parsePage(value?: string): number {
  return Math.max(1, Number.parseInt(value || "1", 10) || 1);
}

async function loadCategoryView(slug: string, currentPage: number): Promise<CategoryView | null> {
  try {
    const data = await getCategoryPageData(slug, currentPage);
    const { pagination } = data;

    return {
      title: data.category.title,
      slug: data.category.slug,
      description: data.category.description,
      countLabel:
        pagination.total === 0
          ? "No results"
          : `Showing ${Math.min(pagination.page * pagination.perPage, pagination.total)} of ${pagination.total} results`,
      articles: data.articles,
      currentPage: pagination.page,
      totalPages: pagination.totalPages,
    };
  } catch (error) {
    // A 404 from the API means the category genuinely does not exist.
    if (isNotFoundError(error)) {
      return null;
    }

    throw error;
  }
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { category } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const currentPage = parsePage(resolvedSearchParams?.page);
  const canonicalCategory = CATEGORY_ALIASES[category.toLowerCase()] ?? category;

  const view = await loadCategoryView(canonicalCategory, currentPage);

  // Resolved before streaming, so an unknown category returns a real 404.
  if (!view) {
    notFound();
  }

  const title =
    currentPage > 1
      ? `${view.title} News & Stories – Page ${currentPage}`
      : `${view.title} News & Stories`;

  return buildPageMetadata({
    title,
    description:
      view.description ||
      `Latest ${view.title} reporting from Nepal and across the Himalayas.`,
    // Each paginated URL represents its own item set, so it keeps its own
    // canonical instead of collapsing into page 1 (docs §26).
    path: paginatedPath(`/category/${view.slug}`, currentPage),
  });
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { category } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const currentPage = parsePage(resolvedSearchParams?.page);
  const canonicalCategory = CATEGORY_ALIASES[category.toLowerCase()];

  if (canonicalCategory) {
    const pageQuery = currentPage > 1 ? `?page=${currentPage}` : "";
    permanentRedirect(`/category/${canonicalCategory}${pageQuery}`);
  }

  const view = await loadCategoryView(category, currentPage);

  if (!view) {
    notFound();
  }

  const breadcrumbEntries = [
    { name: "Home", path: "/" },
    { name: view.title },
  ];

  return (
    <ViewTransition default="page">
      <main>
        {/*
          No visible breadcrumb. The hierarchy is still exposed to crawlers as
          `BreadcrumbList`; a visible trail and structured breadcrumb data are
          separate decisions (docs §15).
        */}
        <JsonLd data={breadcrumbJsonLd(breadcrumbEntries)} />

        <div className="category-page-shell">
          <header className="category-page-header">
            <h1 className="category-main-title">{view.title}</h1>
            {/*
              One short editorial intro. The standard prefers a single useful
              paragraph over keyword-stuffed SEO copy (docs §22).
            */}
            {view.description && (
              <p className="category-intro">{view.description}</p>
            )}
            <p className="category-results-count">{view.countLabel}</p>
          </header>

          <section
            className="category-articles-list"
            aria-labelledby="category-latest-heading"
          >
            <h2 id="category-latest-heading" className="category-section-heading">
              Latest {view.title} Stories
            </h2>
            {view.articles.map((story) => (
              <article key={story.id || story.slug} className="category-article-card">
                <div className="category-article-content">
                  <h3 className="category-article-title">
                    <Link href={`/${story.slug}`}>{story.title}</Link>
                  </h3>

                  {story.excerpt && (
                    <p className="category-article-blurb">{story.excerpt}</p>
                  )}
                </div>

                <Link
                  href={`/${story.slug}`}
                  className="category-article-thumb-link"
                  aria-label={story.title}
                >
                  <div className="category-article-thumb placeholder">
                    {story.image ? (
                      <SafeImage
                        src={story.image}
                        alt={story.imageMeta?.alt ?? story.title}
                        width={380}
                        height={240}
                        loading="lazy"
                      />
                    ) : (
                      <div className="category-thumb-fallback" />
                    )}
                  </div>
                </Link>

                {story.categories && story.categories.length > 0 && (
                  <div className="category-article-tags">
                    {story.categories.map((tag) => {
                      const tagSlug =
                        typeof tag === "string"
                          ? tag.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
                          : tag.slug;
                      const tagLabel = typeof tag === "string" ? tag : tag.title;
                      return (
                        <Link href={`/category/${tagSlug}`} key={tagSlug}>
                          {tagLabel}
                        </Link>
                      );
                    })}
                  </div>
                )}

                <div className="category-article-meta meta">
                  {story.author && (
                    <span className="meta-author">
                      By{" "}
                      {typeof story.author === "string" ? story.author : story.author.name}
                    </span>
                  )}
                  {story.author && story.publishedAt && (
                    <span className="meta-sep" aria-hidden="true">|</span>
                  )}
                  {story.publishedAt && (
                    <time dateTime={story.publishedAtIso}>
                      {story.publishedAt}
                    </time>
                  )}
                </div>
              </article>
            ))}
          </section>

          <Pagination
            currentPage={view.currentPage}
            totalPages={view.totalPages}
            baseUrl={`/category/${view.slug}`}
          />
        </div>
      </main>
    </ViewTransition>
  );
}
