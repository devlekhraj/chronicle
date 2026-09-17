import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
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
  if (!items || items.length === 0) return null;

  return (
    <section
      aria-label="Shorts"
      className={`py-12 sm:py-16 ${className}`}
    >
      <Container>
        <SectionHeading>Shorts</SectionHeading>

        {/* Scrollable on mobile/tablet, 5-column grid on desktop */}
        <div className="flex overflow-x-auto gap-4 sm:gap-5 pb-4 lg:pb-0 lg:grid lg:grid-cols-5 overscroll-x-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => (
            <article
              key={item.id}
              className="relative w-[210px] sm:w-[230px] lg:w-auto flex-shrink-0 aspect-[9/14] overflow-hidden bg-dark group"
            >
              <Link
                href={`/shorts/${item.slug}`}
                className="block relative w-full h-full p-4 flex flex-col justify-between focus:outline-none"
              >
                {/* Portrait Background Image */}
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 240px, 20vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                )}

                {/* Dark Readability Overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/25 to-black/75 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Title Positioned Toward the Top Over Visual Area */}
                <div className="relative z-10">
                  {/* Restrained Brand Accent */}
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-brand-tint bg-black/50 backdrop-blur-xs border border-brand/30">
                    Short
                  </span>

                  <h3 className="mt-2 text-sm sm:text-base font-bold leading-snug text-white group-hover:text-brand-tint transition-colors line-clamp-4">
                    {item.title}
                  </h3>
                </div>

                {/* Bottom Media Icon Indicator */}
                <div className="relative z-10 mt-auto flex items-center justify-between text-white/80">
                  <div className="flex items-center gap-1 text-[11px] font-medium text-white/75">
                    <svg
                      className="h-3.5 w-3.5 text-brand-tint"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <span>Watch</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
