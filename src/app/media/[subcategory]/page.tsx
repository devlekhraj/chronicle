import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import Pagination from "@/components/ui/Pagination";
import { EcApiError, getCategoryPageData, getNavigationItems } from "@/lib/ec-api";

interface PageProps {
  params: Promise<{ subcategory: string }>;
  searchParams?: Promise<{ page?: string }>;
}

export const instant = false;

function parsePage(value?: string): number {
  return Math.max(1, Number.parseInt(value || "1", 10) || 1);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { subcategory } = await params;

  try {
    const data = await getCategoryPageData(subcategory, 1);

    return {
      title: `${data.category.title} | Media | Everest Chronicle`,
      description: data.category.description,
      openGraph: {
        title: `${data.category.title} | Media | Everest Chronicle`,
        description: data.category.description,
        type: "website",
        url: `https://everestchronicle.com/media/${subcategory}`,
      },
    };
  } catch (error) {
    if (error instanceof EcApiError && error.status === 404) {
      return {
        title: "Media Section Not Found | Everest Chronicle",
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

  let navigationItems;

  try {
    [categoryData, navigationItems] = await Promise.all([
      getCategoryPageData(subcategory, currentPage),
      getNavigationItems(),
    ]);
  } catch (error) {
    if (error instanceof EcApiError && error.status === 404) {
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

  return (
    <main id="top">
      <SiteHeader activeSlug="media" navigationItems={navigationItems} />

      <div className="category-page-shell">
        <header className="category-page-header">
          <div className="category-breadcrumb">
            <Link href="/category/media">Media</Link> &gt; <span>{category.title}</span>
          </div>
          <h1 className="category-main-title">{category.title}</h1>
          <p className="category-results-count">
            {pagination.total === 0
              ? "No results"
              : `Showing ${Math.min(pagination.page * pagination.perPage, pagination.total)} of ${pagination.total} results`}
          </p>
        </header>

        <section className="category-articles-list" aria-label={`${category.title} stories`}>
          {articles.map((story) => (
            <article key={story.id} className="category-article-card">
              <Link
                href={`#${story.slug}`}
                className="category-article-thumb-link"
                aria-label={story.title}
              >
                <div className="category-article-thumb placeholder">
                  {story.image ? (
                    <Image
                      src={story.image}
                      alt={story.title}
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
                <h2 className="category-article-title">
                  <Link href={`/${story.slug}`}>{story.title}</Link>
                </h2>

                {story.categories && story.categories.length > 0 && (
                  <div className="category-article-tags">
                    {story.categories.map((tag) => (
                      <span key={typeof tag === "string" ? tag : tag.slug} className="category-tag-pill">
                        {typeof tag === "string" ? tag : tag.title}
                      </span>
                    ))}
                  </div>
                )}

                {story.excerpt && (
                  <p className="category-article-blurb">{story.excerpt}</p>
                )}

                <div className="category-article-meta">
                  {story.publishedAt && (
                    <time className="category-meta-date">
                      {story.publishedAt}
                    </time>
                  )}
                  {story.author && (
                    <span className="category-author-badge">
                      {typeof story.author === "string" ? story.author : story.author.name}
                    </span>
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

      <SiteFooter />
    </main>
  );
}
