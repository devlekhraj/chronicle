import Link from "next/link";
import { breadcrumbJsonLd, type BreadcrumbEntry } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";

interface BreadcrumbsProps {
  entries: BreadcrumbEntry[];
  className?: string;
}

/**
 * Visual breadcrumb plus the matching `BreadcrumbList` JSON-LD.
 *
 * Breadcrumbs are navigation, so this is a `<nav>` with an ordered list — not
 * a row of headings (docs §15). The last entry is the current page and is
 * marked with `aria-current="page"`; it is not a link.
 */
export default function Breadcrumbs({ entries, className = "" }: BreadcrumbsProps) {
  return (
    <>
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="breadcrumb-list">
          {entries.map((entry, index) => {
            const isCurrent = index === entries.length - 1;

            return (
              <li key={`${entry.name}-${index}`} className="breadcrumb-item">
                {isCurrent || !entry.path ? (
                  <span aria-current="page">{entry.name}</span>
                ) : (
                  <Link href={entry.path}>{entry.name}</Link>
                )}
                {!isCurrent && (
                  <span className="breadcrumb-sep" aria-hidden="true">
                    /
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <JsonLd data={breadcrumbJsonLd(entries)} />
    </>
  );
}
