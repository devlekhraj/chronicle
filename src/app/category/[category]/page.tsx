import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import SafeImage from "@/components/ui/SafeImage";
import Pagination from "@/components/ui/Pagination";
import { categoryRegistry } from "@/data/categories";
import { EcApiError, getCategoryPageData } from "@/lib/ec-api";
import type { ArticleSummary } from "@/types/content";

interface PageProps {
  params: Promise<{ category: string }>;
  searchParams?: Promise<{ page?: string }>;
}

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

/**
 * Static registry fallback, kept for when the Laravel API is unreachable.
 * Returns null when the slug is not a known bundled category.
 */
function fallbackCategoryView(slug: string, currentPage: number): CategoryView | null {
  const data = categoryRegistry[slug.toLowerCase()];

  if (!data) {
    return null;
  }

  const countMatch = data.count.match(/of\s+(\d+)\s+results/i);
  const totalResults = countMatch ? Number.parseInt(countMatch[1], 10) : 50;
  const itemsPerPage = 10;

  return {
    title: data.title,
    slug: data.slug,
    description: data.description,
    countLabel: data.count,
    articles: data.stories,
    currentPage,
    totalPages: Math.max(1, Math.ceil(totalResults / itemsPerPage)),
  };
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
    if (error instanceof EcApiError && error.status === 404) {
      return null;
    }

    console.warn(`Using static category fallback for "${slug}" because the Laravel API is unavailable.`);

    return fallbackCategoryView(slug, currentPage);
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;

  const view = await loadCategoryView(category, 1);

  if (!view) {
    return {
      title: "Category Not Found | Everest Chronicle",
    };
  }

  return {
    title: `${view.title} | Everest Chronicle`,
    description: view.description,
    openGraph: {
      title: `${view.title} | Everest Chronicle`,
      description: view.description,
      type: "website",
      url: `https://everestchronicle.com/category/${category}`,
    },
  };
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { category } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const currentPage = parsePage(resolvedSearchParams?.page);

  const view = await loadCategoryView(category, currentPage);

  if (!view) {
    notFound();
  }

  return (
    <main id="top">
      <SiteHeader activeSlug={view.slug} />

      <div className="category-page-shell">
        <header className="category-page-header">
          <h1 className="category-main-title">{view.title}</h1>
          <p className="category-results-count">{view.countLabel}</p>
        </header>

        <section className="category-articles-list" aria-label={`${view.title} stories`}>
          {view.articles.map((story) => (
            <article key={story.id || story.slug} className="category-article-card">
              <div className="category-article-content">
                <h2 className="category-article-title">
                  <Link href={`/${story.slug}`}>{story.title}</Link>
                </h2>

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

              {story.categories && story.categories.length > 0 && (
                <div className="category-article-tags">
                  {story.categories.map((tag) => {
                    const tagKey = typeof tag === "string" ? tag : tag.slug;
                    const tagLabel = typeof tag === "string" ? tag : tag.title;
                    return (
                      <span key={tagKey} className="category-tag-pill">
                        {tagLabel}
                      </span>
                    );
                  })}
                </div>
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
            </article>
          ))}
        </section>

        <Pagination
          currentPage={view.currentPage}
          totalPages={view.totalPages}
          baseUrl={`/category/${view.slug}`}
        />
      </div>

      <SiteFooter />
    </main>
  );
}
