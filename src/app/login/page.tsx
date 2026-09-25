import type { Metadata } from "next";
import Link from "next/link";
import { ViewTransition } from "react";
import { ArrowRight } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";

/*
 * A login page has no search value, so it is deliberately `noindex` while
 * staying `follow` so link equity still flows (docs §9, §59). It also keeps a
 * self-canonical rather than inheriting the homepage one.
 */
export const metadata: Metadata = buildPageMetadata({
  title: "Account Login",
  description:
    "Sign in to access your Everest Chronicle subscription, contributor dashboard, and field dispatches.",
  path: "/login",
  robots: { index: false, follow: true },
});

export default function LoginPage() {
  return (
    <ViewTransition default="page">
      <main className="login-page-wrapper">
        <div className="login-shell">
          <div className="login-card">
            <div className="login-kicker">ACCOUNT LOGIN</div>
            <h1 className="login-title">Sign In to Everest Chronicle</h1>
            <p className="login-subtitle">
              Access subscriber dispatches, contributor dashboard, and exclusive field archives.
            </p>

            <form className="login-form" action="#" method="POST" onSubmit={undefined}>
              <div className="login-field-group">
                <label htmlFor="login-email" className="login-label">
                  Email Address
                </label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="name@example.com"
                  className="login-input"
                />
              </div>

              <div className="login-field-group">
                <div className="login-label-row">
                  <label htmlFor="login-password" className="login-label">
                    Password
                  </label>
                  <a href="#forgot" className="login-forgot-link">
                    Forgot password?
                  </a>
                </div>
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  className="login-input"
                />
              </div>

              <div className="login-remember-row">
                <label className="login-checkbox-label">
                  <input type="checkbox" name="remember" className="login-checkbox" defaultChecked />
                  <span>Keep me signed in</span>
                </label>
              </div>

              <button type="submit" className="login-submit-btn">
                Sign In
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </form>

            <div className="login-footer-notice">
              <p>
                Need subscriber access or assistance?{" "}
                <Link href="/category/expedition" className="login-accent-link">
                  Explore our stories
                </Link>{" "}
                or contact <span className="login-contact-email">desk@everestchronicle.com</span>.
              </p>
            </div>
          </div>
        </div>
      </main>
    </ViewTransition>
  );
}
