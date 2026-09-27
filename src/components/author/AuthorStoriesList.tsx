"use client";

import Link from "next/link";
import Image from "next/image";
import type { ArticleSummary } from "@/types/content";

interface AuthorStoriesListProps {
  stories: ArticleSummary[];
}

const MONTH_NAMES = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];

function getStoryDateDetails(story: ArticleSummary) {
  let date: Date | null = null;

  if (story.publishedAtIso) {
    const parsed = new Date(story.publishedAtIso);
    if (!isNaN(parsed.getTime())) {
      date = parsed;
    }
  }

  if (!date && story.publishedAt) {
    const parsed = new Date(story.publishedAt);
    if (!isNaN(parsed.getTime())) {
      date = parsed;
    }
  }

  if (date) {
    const year = date.getUTCFullYear();
    const day = date.getUTCDate();
    const month = MONTH_NAMES[date.getUTCMonth()];
    return {
      year,
      formattedDate: `${day} ${month} ${year}`,
      timestamp: date.getTime(),
    };
  }

  // Fallback if date object could not be constructed
  const fallbackMatch = (story.publishedAt || "").match(/\b(20\d\d)\b/);
  const fallbackYear = fallbackMatch
    ? parseInt(fallbackMatch[1], 10)
    : new Date().getFullYear();

  return {
    year: fallbackYear,
    formattedDate: (story.publishedAt || "").toUpperCase(),
    timestamp: 0,
  };
}

interface YearGroup {
  year: number;
  stories: ArticleSummary[];
}

export default function AuthorStoriesList({ stories }: AuthorStoriesListProps) {
  if (!stories || stories.length === 0) {
    return (
      <div className="author-empty-state">
        <p>No stories published yet.</p>
      </div>
    );
  }

  // Sort articles in descending chronological order (last / most recent on top)
  const sortedStories = [...stories].sort((a, b) => {
    const timeA = getStoryDateDetails(a).timestamp;
    const timeB = getStoryDateDetails(b).timestamp;
    return timeB - timeA;
  });

  // Group articles by year
  const yearGroups: YearGroup[] = [];
  for (const story of sortedStories) {
    const { year } = getStoryDateDetails(story);
    let group = yearGroups.find((g) => g.year === year);
    if (!group) {
      group = { year, stories: [] };
      yearGroups.push(group);
    }
    group.stories.push(story);
  }

  const currentYear = new Date().getFullYear();

  return (
    <div className="author-stories-container">
      {yearGroups.map((group, groupIndex) => {
        // Show year divider when transitioning to past years or between years
        const showYearDivider = groupIndex > 0 || group.year < currentYear;

        return (
          <section
            key={group.year}
            className="author-year-group"
            aria-label={`Stories from ${group.year}`}
          >
            {showYearDivider && (
              <div className="author-year-divider">
                <span className="author-year-label">{group.year}</span>
                <span className="author-year-line" aria-hidden="true" />
              </div>
            )}

            <div className="author-stories-list">
              {group.stories.map((story) => {
                const { formattedDate } = getStoryDateDetails(story);
                const categories =
                  story.categories && story.categories.length > 0
                    ? story.categories
                    : ["Dispatches"];

                return (
                  <article className="author-story-row" key={story.slug}>
                    <div className="author-story-thumb-wrap">
                      <Link
                        href={`/${story.slug}`}
                        className="author-story-thumb-link"
                        tabIndex={-1}
                        aria-hidden="true"
                      >
                        {story.image ? (
                          <Image
                            src={story.image}
                            alt={story.title}
                            width={380}
                            height={230}
                            loading="lazy"
                            className="author-story-thumb"
                          />
                        ) : (
                          <div className="author-story-thumb-placeholder" />
                        )}
                      </Link>
                    </div>

                    <div className="author-story-content">
                      <div className="author-story-kicker">
                        <span className="author-story-categories">
                          {categories.map((cat, catIndex) => {
                            const title =
                              typeof cat === "string"
                                ? cat
                                : cat?.title ?? "Dispatches";
                            const slug =
                              typeof cat === "string"
                                ? cat.toLowerCase().replace(/[^a-z0-9]+/g, "-")
                                : cat?.slug ?? "dispatches";

                            return (
                              <span
                                key={`${story.slug}-${slug}-${catIndex}`}
                                className="author-story-category-item"
                              >
                                {catIndex > 0 && (
                                  <span className="author-story-cat-sep">
                                    ,{" "}
                                  </span>
                                )}
                                <Link
                                  href={`/category/${slug}`}
                                  className="author-story-category"
                                >
                                  {title.toUpperCase()}
                                </Link>
                              </span>
                            );
                          })}
                        </span>
                        <span className="author-story-dot" aria-hidden="true">
                          •
                        </span>
                        <time
                          className="author-story-date"
                          dateTime={story.publishedAtIso}
                        >
                          {formattedDate}
                        </time>
                      </div>

                      <h3 className="author-story-title">
                        <Link href={`/${story.slug}`}>{story.title}</Link>
                      </h3>

                      {story.excerpt && (
                        <p className="author-story-dek">{story.excerpt}</p>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
