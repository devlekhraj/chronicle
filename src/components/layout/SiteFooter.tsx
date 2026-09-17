"use client";

import Link from "next/link";

const footerSections = [
  { title: "Expeditions", slug: "expeditions" },
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

export default function SiteFooter() {
  return (
    <>
      {/* Newsletter Signup Tier */}
      <section className="newsletter-section">
        <div className="newsletter-container">
          <span className="newsletter-eyebrow">WEEKLY DISPATCH</span>
          <h2 className="newsletter-heading">
            The Himalayas, explained every week.
          </h2>
          <p className="newsletter-desc">
            Expeditions, climate, wildlife, and deep investigative stories
            delivered directly to your inbox every Thursday morning.
          </p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="newsletter-email-input" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email-input"
              type="email"
              placeholder="Enter your email address"
              aria-label="Email address"
            />
            <button type="submit">SUBSCRIBE</button>
          </form>
          <p className="newsletter-disclaimer">
            Free weekly edition. Zero spam. Unsubscribe anytime.
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
                aria-label="Everest Chronicle"
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
            <div className="footer-col">
              <h3 className="footer-col-title">SECTIONS</h3>
              <div className="footer-nav-list">
                {footerSections.map((item) => (
                  <Link href={`/category/${item.slug}`} key={item.slug}>
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 3: About */}
            <div className="footer-col">
              <h3 className="footer-col-title">ABOUT</h3>
              <div className="footer-nav-list">
                {footerAbout.map((item) => (
                  <Link href={`/${item.slug}`} key={item.slug}>
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 4: Follow */}
            <div className="footer-col">
              <h3 className="footer-col-title">FOLLOW</h3>
              <div className="footer-nav-list">
                {footerFollow.map((item) => (
                  <a
                    href={item.slug}
                    key={item.title}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </div>
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
