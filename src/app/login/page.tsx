import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: "Account Login | Everest Chronicle",
  description: "Sign in to access your Everest Chronicle subscription, contributor dashboard, and field dispatches.",
};

export default function LoginPage() {
  return (
    <main className="login-page-wrapper">
      <SiteHeader />

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
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </form>

          <div className="login-footer-notice">
            <p>
              Need subscriber access or assistance?{" "}
              <Link href="/category/expeditions" className="login-accent-link">
                Explore our stories
              </Link>{" "}
              or contact <span className="login-contact-email">desk@everestchronicle.com</span>.
            </p>
          </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
