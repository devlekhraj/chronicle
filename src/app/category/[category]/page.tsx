import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import Pagination from "@/components/ui/Pagination";
import { categoryRegistry } from "@/data/categories";

interface PageProps {
  params: Promise<{ category: string }>;
  searchParams?: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const data = categoryRegistry[category.toLowerCase()];
  if (!data) {
    return {
      title: "Category Not Found | Everest Chronicle",
    };
  }

  return {
    title: `${data.title} | Everest Chronicle`,
    description: data.description,
    openGraph: {
      title: `${data.title} | Everest Chronicle`,
      description: data.description,
      type: "website",
      url: `https://everestchronicle.com/category/${category}`,
    },
  };
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { category } = await params;
  const categoryData = categoryRegistry[category.toLowerCase()];

  if (!categoryData) {
    notFound();
  }

  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const currentPage = Math.max(1, parseInt(resolvedSearchParams?.page || "1", 10) || 1);

  // Derive total pages from registry count (e.g. "Showing 35 of 78 results")
  const countMatch = categoryData.count.match(/of\s+(\d+)\s+results/i);
  const totalResults = countMatch ? parseInt(countMatch[1], 10) : 50;
  const itemsPerPage = 10;
  const totalPages = Math.max(1, Math.ceil(totalResults / itemsPerPage));

  return (
    <main id="top">
      <SiteHeader activeSlug={category.toLowerCase()} />

      <div className="category-page-shell">
        <header className="category-page-header">
          <h1 className="category-main-title">{categoryData.title}</h1>
          <p className="category-results-count">{categoryData.count}</p>
        </header>

        <section className="category-articles-list" aria-label={`${categoryData.title} stories`}>
          {categoryData.stories.map((story) => (
            <article key={story.id} className="category-article-card">
              <Link
                href={`/${story.slug}`}
                className="category-article-thumb-link"
                aria-label={story.title}
              >
                <div className="category-article-thumb placeholder">
                  {story.image ? (
                    <img
                      src={story.image}
                      alt={story.title}
                      loading="lazy"
                      decoding="async"
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
                      <span key={tag} className="category-tag-pill">
                        {tag}
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
                      {story.author}
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </section>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl={`/category/${category.toLowerCase()}`}
        />
      </div>

      <SiteFooter />
    </main>
  );
}
