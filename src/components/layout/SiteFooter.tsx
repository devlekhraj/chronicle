import Link from "next/link";
import NewsletterSignup from "@/components/layout/NewsletterSignup";

const footerSections = [
  { title: "Expeditions", slug: "expedition" },
  { title: "Environment", slug: "environment" },
  { title: "Conservation", slug: "conservation" },
  { title: "Travel", slug: "travel" },
  { title: "People & Opinion", slug: "people-and-opinion" },
  { title: "Video & Shorts", slug: "video-and-shorts" },
];

const footerAbout = [
  { title: "Our Story", slug: "our-story" },
  { title: "Contact Desk", slug: "contact-desk" },
  { title: "Advertise", slug: "advertise" },
  { title: "Privacy Policy", slug: "privacy-policy" },
  { title: "Terms of Service", slug: "terms-of-service" },
  { title: "Staff Login", slug: "staff-login" },
];

const footerFollow = [
  { title: "Instagram", slug: "https://instagram.com" },
  { title: "Facebook", slug: "https://facebook.com" },
  { title: "YouTube", slug: "https://youtube.com" },
  { title: "X (Twitter)", slug: "https://x.com" },
];

/**
 * Footer navigation is real navigation: each column is a `<nav>` containing a
 * `<ul>` of `<a>`/`<Link>` (docs §3, §42). The column labels are `<p>`
 * elements referenced by `aria-labelledby` rather than headings, so the footer
 * does not inflate the document's heading outline.
 */
export default function SiteFooter() {
  return (
    <>
      {/* Newsletter Signup Tier — a complementary CTA, not a page section. */}
      <section className="newsletter-section" aria-labelledby="newsletter-heading">
        <div className="newsletter-container">
          <span className="newsletter-eyebrow">STAY INFORMED</span>

          <h2 className="newsletter-heading" id="newsletter-heading">
            New stories from the Himalayas, delivered to your inbox.
          </h2>

          <p className="newsletter-desc">
            Get notified when Everest Chronicle publishes new reporting on
            expeditions, climate, conservation, culture, and the people shaping
            the Himalayas.
          </p>

          <NewsletterSignup />

          <p className="newsletter-disclaimer">
            Free news updates. No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Dark Footer */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-main">
            {/* Column 1: Brand & Bio */}
            <div className="footer-brand">
              <Link
                href="/"
                className="footer-logo-link"
                aria-label="Everest Chronicle home"
              >
                <img
                  src="/brand/logo-footer.png"
                  alt="Everest Chronicle"
                  className="footer-brand-logo"
                  width={66}
                  height={82}
                  loading="lazy"
                  decoding="async"
                />
              </Link>
              <p className="footer-bio">
                Independent reporting, climate investigation, and authentic
                visual storytelling from Nepal and across the high Himalayas.
              </p>
            </div>

            {/* Column 2: Sections */}
            <nav className="footer-col" aria-labelledby="footer-sections-label">
              <p className="footer-col-title" id="footer-sections-label">
                SECTIONS
              </p>
              <ul className="footer-nav-list">
                {footerSections.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/category/${item.slug}`}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Column 3: About */}
            <nav className="footer-col" aria-labelledby="footer-about-label">
              <p className="footer-col-title" id="footer-about-label">
                ABOUT
              </p>
              <ul className="footer-nav-list">
                {footerAbout.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/${item.slug}`}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Column 4: Follow */}
            <nav className="footer-col" aria-labelledby="footer-follow-label">
              <p className="footer-col-title" id="footer-follow-label">
                FOLLOW
              </p>
              <ul className="footer-nav-list">
                {footerFollow.map((item) => (
                  <li key={item.title}>
                    <a
                      href={item.slug}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom">
            <small>© 2026 Everest Chronicle. All rights reserved.</small>
            <a href="#top" className="footer-back-to-top">
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
