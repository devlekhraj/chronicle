"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import type { LiveUpdateItem } from "@/types/content";

function formatShortTimeAgo(
  isoString?: string | null,
  fallback?: string | null
): string {
  if (!isoString) return fallback ?? "";

  const timestamp = Date.parse(isoString);
  if (Number.isNaN(timestamp)) return fallback ?? "";

  const now = Date.now();
  const diffInSeconds = Math.max(0, Math.floor((now - timestamp) / 1000));

  if (diffInSeconds < 60) {
    return "just now";
  }
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 5) {
    return `${diffInWeeks}w ago`;
  }
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths}mo ago`;
  }
  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears}y ago`;
}

interface ArticleLiveTimelineProps {
  items: LiveUpdateItem[];
}

export default function ArticleLiveTimeline({ items }: ArticleLiveTimelineProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = trackRef.current;
    if (!el) return;

    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll, items]);

  const handleScroll = (direction: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const scrollAmount = Math.max(180, Math.floor(el.clientWidth * 0.7));
    el.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
  };

  if (!items || items.length === 0) return null;

  const latest = items[0];
  const latestTimeAgo = formatShortTimeAgo(latest?.publishedAtIso, latest?.publishedAt);

  return (
    <div className="guardian-live-timeline" aria-label="Live coverage timeline">
      {/* Top Banner Bar */}
      <div className="guardian-live-topbar">
        <div className="guardian-live-topbar-left">
          <span className="guardian-live-pulse-dot" aria-hidden="true" />
          <strong className="guardian-live-topbar-badge">LIVE</strong>
          <span className="guardian-live-topbar-status" suppressHydrationWarning>
            Updated {latestTimeAgo || "now"}
          </span>
        </div>

        {latest?.title && (
          <div className="guardian-live-topbar-right">
            <span className="guardian-live-bullet" aria-hidden="true" />
            <a
              href={`#live-update-${latest.id}`}
              className="guardian-live-latest-link"
              title={latest.title}
            >
              {latest.title}
            </a>
          </div>
        )}
      </div>

      {/* Horizontal Timeline Track Area */}
      <div className="guardian-live-strip">
        <div className="guardian-live-track" ref={trackRef}>
          <div className="guardian-live-rail" aria-hidden="true" />

          {items.map((item, index) => {
            const timeAgo = formatShortTimeAgo(item.publishedAtIso, item.publishedAt);
            const title = item.title || item.subTitle || `Update #${items.length - index}`;

            return (
              <a
                key={item.id}
                href={`#live-update-${item.id}`}
                className="guardian-live-node"
                title={item.title ?? timeAgo}
              >
                <div className="guardian-live-node-marker-wrap">
                  <span className="guardian-live-node-dot" aria-hidden="true" />
                </div>
                <time
                  className="guardian-live-node-time"
                  dateTime={item.publishedAtIso ?? undefined}
                  suppressHydrationWarning
                >
                  {timeAgo}
                </time>
                <span className="guardian-live-node-headline">{title}</span>
              </a>
            );
          })}
        </div>

        {/* Scroll Navigation Chevrons */}
        {(canScrollLeft || canScrollRight) && (
          <div className="guardian-live-nav-controls">
            <button
              type="button"
              className="guardian-live-nav-btn"
              onClick={() => handleScroll(-1)}
              disabled={!canScrollLeft}
              aria-label="Scroll timeline back"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              type="button"
              className="guardian-live-nav-btn"
              onClick={() => handleScroll(1)}
              disabled={!canScrollRight}
              aria-label="Scroll timeline forward"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
