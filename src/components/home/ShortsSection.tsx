"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  MapPin,
  Play,
  User,
  X,
} from "lucide-react";
import { isOptimizableImageSrc } from "@/lib/image-hosts";
import type { ShortItem } from "@/types/content";

function getVideoEmbedUrl(url?: string | null): string | null {
  if (!url) return null;
  const trimmed = url.trim();

  // YouTube: watch, youtu.be, embed, shorts
  const ytMatch = trimmed.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
  );
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0&playsinline=1&modestbranding=1`;
  }

  // Vimeo
  const vimeoMatch = trimmed.match(/(?:vimeo\.com\/)(\d+)/i);
  if (vimeoMatch && vimeoMatch[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
  }

  return null;
}

function isLocalOptimizableImage(src?: string | null): boolean {
  if (!src) return false;
  // External third-party CDN thumbnails (YouTube, Vimeo, etc.) must always use plain <img>
  if (
    src.includes("youtube.com") ||
    src.includes("youtu.be") ||
    src.includes("ytimg.com") ||
    src.includes("vimeo") ||
    src.includes("vumbnail")
  ) {
    return false;
  }
  return isOptimizableImageSrc(src);
}

function formatTimeAgo(dateString?: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;

  const years = Math.floor(days / 365);
  return `${years}y ago`;
}

function formatDisplayUrl(url: string): string {
  try {
    if (url.startsWith("/")) {
      return url;
    }
    const parsed = new URL(url);
    const path = parsed.pathname === "/" ? "" : parsed.pathname;
    return `${parsed.host}${path}`;
  } catch {
    return url.replace(/^https?:\/\//i, "").replace(/\/$/, "");
  }
}

interface ShortsSectionProps {
  items?: ShortItem[];
  className?: string;
}

export default function ShortsSection({
  items = [],
  className = "",
}: ShortsSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [canToggleDesc, setCanToggleDesc] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  const activeItem = activeIndex === null ? null : items[activeIndex];

  useEffect(() => {
    setIsDescExpanded(false);
    setCanToggleDesc(false);
  }, [activeIndex]);

  useEffect(() => {
    if (!activeItem?.description || isDescExpanded) return;

    const measure = () => {
      if (descRef.current) {
        const hasOverflow =
          descRef.current.scrollHeight - descRef.current.clientHeight > 2;
        setCanToggleDesc(hasOverflow);
      }
    };

    measure();
    const rafId = requestAnimationFrame(measure);
    const timer = setTimeout(measure, 100);
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
      window.removeEventListener("resize", measure);
    };
  }, [activeItem?.id, activeItem?.description, activeIndex, isDescExpanded]);

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
    document.body.classList.add("modal-backdrop-open");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-backdrop-open");
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
              <ChevronLeft size={18} strokeWidth={2.2} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollCarousel("next")}
              aria-label="Scroll shorts right"
            >
              <ChevronRight size={18} strokeWidth={2.2} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="shorts-carousel" ref={carouselRef}>
          {items.map((item, index) => {
            const cardContent = (
              <>
                <div className="shorts-image-wrap">
                  {item.image ? (
                    isLocalOptimizableImage(item.image) ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 190px, (max-width: 1024px) 190px, 205px"
                        quality={50}
                        className="shorts-image"
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image}
                        alt={item.title}
                        className="shorts-image"
                        loading="lazy"
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                          position: "absolute",
                          inset: 0,
                        }}
                      />
                    )
                  ) : (
                    <div className="shorts-image-fallback" aria-hidden="true" />
                  )}
                  <div className="shorts-overlay" aria-hidden="true" />
                  <span className="shorts-play" aria-hidden="true">
                    <Play size={15} fill="currentColor" strokeWidth={0} aria-hidden="true" />
                  </span>
                  <span className="shorts-index">{String(index + 1).padStart(2, "0")}</span>
                  {item.location && <span className="shorts-location">{item.location}</span>}
                </div>

                <div className="shorts-copy">
                  <h3>{item.title}</h3>
                </div>
              </>
            );

            return (
              <article className="shorts-card" key={item.id}>
                <button
                  type="button"
                  className="shorts-card-button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Play ${item.title}`}
                >
                  {cardContent}
                </button>
              </article>
            );
          })}
        </div>
      </section>

      {activeItem &&
        createPortal(
        <div
          className="shorts-modal"
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
        >
          <div
            className="shorts-modal-backdrop"
            onClick={() => setActiveIndex(null)}
            role="button"
            tabIndex={0}
            aria-label="Close shorts viewer"
          />

          <button
            type="button"
            className="shorts-modal-close"
            onClick={() => setActiveIndex(null)}
            aria-label="Close shorts viewer"
          >
            <X size={20} strokeWidth={2.2} aria-hidden="true" />
          </button>

          <div className="shorts-viewer">

            <button
              type="button"
              className="shorts-modal-nav shorts-modal-prev"
              onClick={showPrevious}
              disabled={activeIndex === 0}
              aria-label="Previous short"
            >
              <ChevronLeft size={24} strokeWidth={2.4} aria-hidden="true" />
            </button>

            <div className="shorts-video-panel">
              <div className="shorts-video-frame">
                {(() => {
                  const embedUrl = activeItem.videoUrl
                    ? getVideoEmbedUrl(activeItem.videoUrl)
                    : null;

                  if (embedUrl) {
                    return (
                      <iframe
                        src={embedUrl}
                        title={activeItem.title}
                        className="shorts-video"
                        style={{ border: "none" }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    );
                  }

                  if (activeItem.videoUrl) {
                    return (
                      <video
                        src={activeItem.videoUrl}
                        poster={activeItem.image}
                        controls
                        autoPlay
                        playsInline
                        className="shorts-video"
                      />
                    );
                  }

                  return (
                    <div className="shorts-video-fallback">
                      {activeItem.image &&
                        (isLocalOptimizableImage(activeItem.image) ? (
                          <Image
                            src={activeItem.image}
                            alt=""
                            fill
                            sizes="(max-width: 640px) 303px, 420px"
                            quality={55}
                            className="shorts-image"
                          />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={activeItem.image}
                            alt=""
                            className="shorts-image"
                            style={{
                              objectFit: "cover",
                              width: "100%",
                              height: "100%",
                              position: "absolute",
                              inset: 0,
                            }}
                          />
                        ))}
                    </div>
                  );
                })()}

                {/* Facebook Reels / Story Style Bottom Overlay */}
                <div className="shorts-reel-overlay">
                  {/* Author Header: Avatar on left, Author Name · Time Ago, Location below */}
                  <div className="shorts-reel-header">
                    <div className="shorts-reel-avatar">
                      {activeItem.author?.avatar ? (
                        <img
                          src={activeItem.author.avatar}
                          alt={activeItem.author.name || "Author"}
                          className="shorts-reel-avatar-img"
                        />
                      ) : (
                        <div className="shorts-reel-avatar-fallback">
                          {activeItem.author?.name ? (
                            <span>{activeItem.author.name.charAt(0).toUpperCase()}</span>
                          ) : (
                            <User size={15} strokeWidth={2.2} aria-hidden="true" />
                          )}
                        </div>
                      )}
                    </div>

                    <div className="shorts-reel-meta">
                      <div className="shorts-reel-author-line">
                        <span className="shorts-reel-author-name">
                          {activeItem.author?.name || "Everest Chronicle"}
                        </span>
                        {activeItem.publishedAt && (
                          <>
                            <span className="shorts-reel-dot">·</span>
                            <span className="shorts-reel-time">
                              {formatTimeAgo(activeItem.publishedAt)}
                            </span>
                          </>
                        )}
                      </div>

                      {activeItem.location && (
                        <div className="shorts-reel-location-line">
                          <MapPin size={11} strokeWidth={2.2} aria-hidden="true" />
                          <span>{activeItem.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <h3 className="shorts-reel-title">{activeItem.title}</h3>

                  {activeItem.description && (
                    <div className="shorts-reel-desc-wrap">
                      <p
                        ref={descRef}
                        className={`shorts-reel-desc ${isDescExpanded ? "is-expanded" : "is-clamped"}`}
                      >
                        {activeItem.description}
                      </p>
                      {canToggleDesc && (
                        <button
                          type="button"
                          className="shorts-reel-toggle-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsDescExpanded(!isDescExpanded);
                          }}
                        >
                          {isDescExpanded ? "see less" : "see more..."}
                        </button>
                      )}
                    </div>
                  )}

                  {activeItem.redirectUrl && (
                    <div className="shorts-reel-cta-wrap">
                      <Link
                        href={activeItem.redirectUrl}
                        className="shorts-reel-cta-btn"
                        target={activeItem.redirectUrl.startsWith("http") ? "_blank" : undefined}
                        rel={activeItem.redirectUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={13} strokeWidth={2.5} aria-hidden="true" />
                        <span className="shorts-reel-cta-url">{formatDisplayUrl(activeItem.redirectUrl)}</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button
              type="button"
              className="shorts-modal-nav shorts-modal-next"
              onClick={showNext}
              disabled={activeIndex === items.length - 1}
              aria-label="Next short"
            >
              <ChevronRight size={26} strokeWidth={2.4} aria-hidden="true" />
            </button>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
