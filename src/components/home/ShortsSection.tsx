"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { shorts as defaultShorts } from "@/data/homepage";
import type { ShortItem } from "@/types/content";

interface ShortsSectionProps {
  items?: ShortItem[];
  className?: string;
}

export default function ShortsSection({
  items = defaultShorts,
  className = "",
}: ShortsSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const activeItem = activeIndex === null ? null : items[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === null ? current : Math.min(items.length - 1, current + 1)
        );
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null ? current : Math.max(0, current - 1)
        );
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, items.length]);

  if (!items || items.length === 0) return null;

  const scrollCarousel = (direction: "prev" | "next") => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const scrollAmount = carousel.clientWidth * 0.82;
    carousel.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === null ? current : Math.max(0, current - 1)
    );
  };

  const showNext = () => {
    setActiveIndex((current) =>
      current === null ? current : Math.min(items.length - 1, current + 1)
    );
  };

  return (
    <>
      <section aria-label="Shorts" className={`shorts-section ${className}`}>
        <div className="shorts-section-top">
          <div className="shorts-section-heading">
            <h2>Shorts</h2>
            <p>Fast field video from the high Himalaya</p>
          </div>

          <div className="shorts-carousel-actions" aria-label="Shorts carousel controls">
            <button
              type="button"
              onClick={() => scrollCarousel("prev")}
              aria-label="Scroll shorts left"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollCarousel("next")}
              aria-label="Scroll shorts right"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18l6-6-6-6"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="shorts-carousel" ref={carouselRef}>
          {items.map((item, index) => (
            <article className="shorts-card" key={item.id}>
              <button
                type="button"
                className="shorts-card-button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Play ${item.title}`}
              >
                <div className="shorts-image-wrap">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 72vw, (max-width: 1024px) 34vw, 210px"
                      className="shorts-image"
                    />
                  ) : (
                    <div className="shorts-image-fallback" aria-hidden="true" />
                  )}
                  <div className="shorts-overlay" aria-hidden="true" />
                  <span className="shorts-play" aria-hidden="true">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  <span className="shorts-index">{String(index + 1).padStart(2, "0")}</span>
                  {item.location && <span className="shorts-location">{item.location}</span>}
                </div>

                <div className="shorts-copy">
                  <span>Field Short</span>
                  <h3>{item.title}</h3>
                </div>
              </button>
            </article>
          ))}
        </div>
      </section>

      {activeItem && (
        <div
          className="shorts-modal"
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
        >
          <button
            type="button"
            className="shorts-modal-backdrop"
            onClick={() => setActiveIndex(null)}
            aria-label="Close shorts viewer"
          />

          <div className="shorts-viewer">
            <button
              type="button"
              className="shorts-modal-close"
              onClick={() => setActiveIndex(null)}
              aria-label="Close shorts viewer"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <button
              type="button"
              className="shorts-modal-nav shorts-modal-prev"
              onClick={showPrevious}
              disabled={activeIndex === 0}
              aria-label="Previous short"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="shorts-video-panel">
              <div className="shorts-video-frame">
                {activeItem.videoUrl ? (
                  <video
                    src={activeItem.videoUrl}
                    poster={activeItem.image}
                    controls
                    autoPlay
                    playsInline
                    className="shorts-video"
                  />
                ) : (
                  <div className="shorts-video-fallback">
                    {activeItem.image && (
                      <Image
                        src={activeItem.image}
                        alt=""
                        fill
                        sizes="420px"
                        className="shorts-image"
                      />
                    )}
                  </div>
                )}
              </div>

              <div className="shorts-video-copy">
                <span>{activeItem.location || "Everest Chronicle"}</span>
                <h3>{activeItem.title}</h3>
              </div>
            </div>

            <button
              type="button"
              className="shorts-modal-nav shorts-modal-next"
              onClick={showNext}
              disabled={activeIndex === items.length - 1}
              aria-label="Next short"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18l6-6-6-6"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
