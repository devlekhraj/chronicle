import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ViewTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Pagination from "@/components/ui/Pagination";
import { getCategoryPageData, isNotFoundError } from "@/lib/ec-api";
import { buildPageMetadata, paginatedPath } from "@/lib/seo";

interface PageProps {
  params: Promise<{ subcategory: string }>;
  searchParams?: Promise<{ page?: string }>;
}

/*
 * Media listings depend on `params`/`searchParams` (URL data), which cannot
 * live in the shared App Shell, so the navigation is allowed to block. The
 * outgoing page crossfades into the incoming one instead of hard-swapping.
 */
export const instant = false;

function parsePage(value?: string): number {
  return Math.max(1, Number.parseInt(value || "1", 10) || 1);
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { subcategory } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const currentPage = parsePage(resolvedSearchParams?.page);

  try {
    const data = await getCategoryPageData(subcategory, currentPage);
    const basePath = `/media/${data.category.slug}`;

    const title =
      currentPage > 1
        ? `${data.category.title} Videos & Media – Page ${currentPage}`
        : `${data.category.title} Videos & Media`;

    return buildPageMetadata({
      title,
      description:
        data.category.description ||
        `Watch video and visual reporting on ${data.category.title} from Everest Chronicle.`,
      // Paginated media URLs keep their own canonical (docs §26).
      path: paginatedPath(basePath, currentPage),
    });
  } catch (error) {
    /*
     * Do not throw `notFound()` here: Next only blocks metadata resolution for
     * recognised crawlers, so throwing produces a 500 for some bots while
     * normal requests still stream a 200. The page body handles the 404 UI.
     */
    if (isNotFoundError(error)) {
      return {
        title: "Media Section Not Found",
        robots: { index: false, follow: true },
      };
    }

    throw error;
  }
}

export default async function MediaSubcategoryPage({ params, searchParams }: PageProps) {
  const { subcategory } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const currentPage = parsePage(resolvedSearchParams?.page);

  let categoryData;

  try {
    categoryData = await getCategoryPageData(subcategory, currentPage);
  } catch (error) {
    if (isNotFoundError(error)) {
      notFound();
    }

    throw error;
  }

  if (!categoryData) {
    notFound();
  }

  const { category, articles, pagination } = categoryData;

  if (!category) {
    notFound();
  }

  if (!articles) {
    notFound();
  }

  const breadcrumbEntries = [
    { name: "Home", path: "/" },
    { name: "Media", path: "/category/media" },
    { name: category.title },
  ];

  return (
    <ViewTransition default="page">
      <main>
        <div className="category-page-shell">
          <Breadcrumbs entries={breadcrumbEntries} className="category-breadcrumb-nav" />

          <header className="category-page-header">
            <h1 className="category-main-title">{category.title}</h1>
            {/* One short editorial intro rather than SEO filler (docs §22). */}
            {category.description && (
              <p className="category-intro">{category.description}</p>
            )}
            <p className="category-results-count">
              {pagination.total === 0
                ? "No results"
                : `Showing ${Math.min(pagination.page * pagination.perPage, pagination.total)} of ${pagination.total} results`}
            </p>
          </header>

          <section
            className="category-articles-list"
            aria-labelledby="media-latest-heading"
          >
            <h2 id="media-latest-heading" className="category-section-heading">
              Latest {category.title} Videos &amp; Media
            </h2>
            {articles.map((story) => (
              <article key={story.id} className="category-article-card">
                <Link
                  href={`/${story.slug}`}
                  className="category-article-thumb-link"
                  aria-label={story.title}
                >
                  <div className="category-article-thumb placeholder">
                    {story.image ? (
                      <Image
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

                <div className="category-article-content">
                  <h3 className="category-article-title">
                    <Link href={`/${story.slug}`}>{story.title}</Link>
                  </h3>

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

                  {story.excerpt && (
                    <p className="category-article-blurb">{story.excerpt}</p>
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
                </div>
              </article>
            ))}
          </section>

          <Pagination
            currentPage={currentPage}
            totalPages={pagination.totalPages}
            baseUrl={`/media/${subcategory.toLowerCase()}`}
          />
        </div>
      </main>
    </ViewTransition>
  );
}
