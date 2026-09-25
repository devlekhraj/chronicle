import type { Metadata } from "next";
import Link from "next/link";

/*
 * A missing URL is never indexable. No canonical is emitted, so a nonexistent
 * address is never canonicalised to the homepage (docs §28, §59).
 */
export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

/*
 * Custom 404 UI. Without this file, Next renders the synthesized `/_not-found`
 * route, which answers some crawler user-agents with a 500 rather than a
 * not-found response (docs §28).
 *
 * The requested URL is never canonicalised to the homepage: this page is
 * `noindex` and carries no canonical of its own.
 */
export default function NotFound() {
  return (
    <main className="not-found-shell">
      <p className="not-found-kicker">404</p>
      <h1 className="not-found-title">Page Not Found</h1>
      <p className="not-found-copy">
        The page you were looking for may have been moved, unpublished, or it
        never existed. The archive is still open.
      </p>
      <nav aria-label="Not found navigation" className="not-found-actions">
        <ul className="not-found-links">
          <li>
            <Link href="/" className="not-found-primary">
              Back to the homepage
            </Link>
          </li>
          <li>
            <Link href="/category/expedition" className="not-found-secondary">
              Browse Expeditions
            </Link>
          </li>
          <li>
            <Link href="/category/environment" className="not-found-secondary">
              Browse Environment
            </Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
