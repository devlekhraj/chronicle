import type { Metadata } from "next";
import Image from "next/image";
import { ViewTransition } from "react";
import { notFound } from "next/navigation";
import { Mail } from "lucide-react";
import AuthorStoriesList from "@/components/author/AuthorStoriesList";
import AuthorFollowCard from "@/components/author/AuthorFollowCard";
import { getAuthorPageData, isNotFoundError } from "@/lib/ec-api";
import { buildPageMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/*
 * No `generateStaticParams`: under Cache Components an empty return value is a
 * hard error ("must return at least one result"), and author slugs are not
 * enumerable here. The route is fully dynamic and cached per slug instead.
 *
 * `instant = false` matches the other dynamic routes: the slug-dependent shell
 * cannot be prerendered (the layout's `usePathname()` is runtime URL data), so
 * the navigation is allowed to block and crossfades instead.
 */
export const instant = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { author } = await getAuthorPageData(slug);

    return buildPageMetadata({
      title: `${author.name} — Stories & Articles`,
      description:
        author.bio ||
        `Reporting and stories by ${author.name} for Everest Chronicle.`,
      path: `/author/${author.slug}`,
      type: "profile",
      images: [
        {
          url: author.avatar || "/images/homepage/sherpa-featured.jpg",
          width: 600,
          height: 600,
          alt: author.name,
        },
      ],
    });
  } catch (error) {
    /*
     * Do not throw `notFound()` here: Next only blocks metadata resolution for
     * recognised crawlers, so throwing produces a 500 for some bots while
     * normal requests still stream a 200. The page body handles the 404 UI.
     */
    if (isNotFoundError(error)) {
      return {
        title: "Author Not Found",
        robots: { index: false, follow: true },
      };
    }

    throw error;
  }
}

export default async function AuthorDetailPage({ params }: PageProps) {
  const { slug } = await params;
  let data;

  try {
    data = await getAuthorPageData(slug);
  } catch (error) {
    if (isNotFoundError(error)) {
      notFound();
    }

    throw error;
  }

  const { author, articles } = data;

  return (
    <ViewTransition default="page">
      <main className="author-page-wrapper">
        <div className="author-page-shell">
          {/* ── Author Profile Hero ──────────────────────────────────── */}
          <header className="author-profile-hero" aria-label="Author Profile">
            {/* Circular Avatar */}
            <div className="author-hero-avatar-wrap">
              <Image
                src={author.avatar || "/images/homepage/sherpa-featured.jpg"}
                alt={author.name}
                width={112}
                height={112}
                className="author-hero-avatar"
                priority
              />
            </div>

            {/* Author Name */}
            <h1 className="author-hero-name">{author.name}</h1>

            {/* Social Links (Matching Article Detail Page UI) */}
            <div className="article-social-share-buttons author-hero-socials" aria-label="Author Social Profiles">
              {author.socials?.twitter && (
                <a
                  href={author.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="article-share-btn article-share-btn--twitter"
                  aria-label="X (formerly Twitter)"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
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
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
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
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>
              )}

              {author.socials?.email && (
                <a
                  href={
                    author.socials.email.startsWith("mailto:")
                      ? author.socials.email
                      : `mailto:${author.socials.email}`
                  }
                  className="article-share-btn article-share-btn--email"
                  aria-label="Email"
                >
                  <Mail size={16} aria-hidden="true" />
                  <span>Email</span>
                </a>
              )}
            </div>

            {/* Blue Accent Divider Line */}
            <div className="author-accent-divider" aria-hidden="true" />

            {/* Author Bio */}
            {author.bio && <p className="author-hero-bio">{author.bio}</p>}

            {/* Follow / Notification Card */}
            <AuthorFollowCard authorName={author.name} />
          </header>

          {/* ── Stories Stream (Chronological & Grouped by Year) ─────── */}
          <AuthorStoriesList stories={articles} />
        </div>
      </main>
    </ViewTransition>
  );
}
