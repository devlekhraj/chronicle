import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import Pagination from "@/components/ui/Pagination";
import { categoryRegistry } from "@/data/categories";

interface PageProps {
  params: Promise<{ subcategory: string }>;
  searchParams?: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { subcategory } = await params;
  const data = categoryRegistry[subcategory.toLowerCase()];
  if (!data) {
    return {
      title: "Media Section Not Found | Everest Chronicle",
    };
  }

  return {
    title: `${data.title} | Media | Everest Chronicle`,
    description: data.description,
    openGraph: {
      title: `${data.title} | Media | Everest Chronicle`,
      description: data.description,
      type: "website",
      url: `https://everestchronicle.com/media/${subcategory}`,
    },
  };
}

export default async function MediaSubcategoryPage({ params, searchParams }: PageProps) {
  const { subcategory } = await params;
  const categoryData = categoryRegistry[subcategory.toLowerCase()];

  if (!categoryData) {
    notFound();
  }

  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const currentPage = Math.max(1, parseInt(resolvedSearchParams?.page || "1", 10) || 1);

  // Derive total pages from registry count
  const countMatch = categoryData.count.match(/of\s+(\d+)\s+results/i);
  const totalResults = countMatch ? parseInt(countMatch[1], 10) : 30;
  const itemsPerPage = 10;
  const totalPages = Math.max(1, Math.ceil(totalResults / itemsPerPage));

  return (
    <main id="top">
      <SiteHeader activeSlug="media" />

      <div className="category-page-shell">
        <header className="category-page-header">
          <div className="category-breadcrumb">
            <Link href="/media">Media</Link> &gt; <span>{categoryData.title}</span>
          </div>
          <h1 className="category-main-title">{categoryData.title}</h1>
          <p className="category-results-count">{categoryData.count}</p>
        </header>

        <section className="category-articles-list" aria-label={`${categoryData.title} stories`}>
          {categoryData.stories.map((story) => (
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
          totalPages={totalPages}
          baseUrl={`/media/${subcategory.toLowerCase()}`}
        />
      </div>

      <SiteFooter />
    </main>
  );
}
