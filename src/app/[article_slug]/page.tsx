import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import {
  type ArticleBodyBlock,
  articleRegistry,
  fallbackArticle,
} from "@/data/articles";

interface PageProps {
  params: Promise<{ article_slug: string }>;
}

function getArticle(slug: string) {
  return articleRegistry[slug] ?? {
    ...fallbackArticle,
    slug,
    title: fallbackArticle.title,
  };
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
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
    }
    case "authorBios":
      return (
        <section className="article-author-bios" aria-label="Authors">
          {block.authors.map((author, authorIndex) => (
            <div className="article-author-bio" key={`${author.name}-${authorIndex}`}>
              {author.image ? (
                <img src={author.image} alt="" loading="lazy" decoding="async" />
              ) : (
                <div className="article-author-placeholder" aria-hidden="true" />
              )}
              <div>
                <h2>{author.name}</h2>
                <p>{author.bio}</p>
              </div>
            </div>
          ))}
        </section>
      );
    default:
      return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { article_slug } = await params;
  const article = getArticle(article_slug);

  return {
    title: `${article.title} | Everest Chronicle`,
    description: article.dek,
    openGraph: {
      title: `${article.title} | Everest Chronicle`,
      description: article.dek,
      type: "article",
      url: `https://everestchronicle.com/${article.slug}`,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { article_slug } = await params;
  const article = getArticle(article_slug);

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
        </header>

        <figure className="article-hero-figure">
          {article.image ? (
            <img src={article.image} alt="" loading="eager" decoding="async" />
          ) : (
            <div className="article-hero-placeholder" aria-hidden="true" />
          )}
          <figcaption>{article.caption}</figcaption>
        </figure>

        <div className="article-detail-meta">
          <time>{article.publishedAt}</time>
          <span>{article.author}</span>
        </div>

        <div className="article-body">
          {article.body.map((block, index) => (
            <ArticleBodyBlockView
              block={block}
              key={`${block.type}-${index}`}
            />
          ))}
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
