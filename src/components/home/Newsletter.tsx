"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
    }
  };

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="py-16 sm:py-20 lg:py-24 bg-white"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          {/* Centered Heading */}
          <h2
            id="newsletter-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text-primary"
          >
            Subscribe to our newsletter
          </h2>

          {/* Supporting Line */}
          <p className="mt-3 text-sm sm:text-base text-text-secondary leading-relaxed max-w-lg mx-auto">
            Get the latest Himalayan dispatches, high-altitude expedition
            updates, environmental research, and conservation stories delivered
            directly to your inbox.
          </p>

          {/* Form */}
          {isSubmitted ? (
            <div className="mt-8 p-4 bg-brand-10 border border-brand/20 text-brand text-sm font-medium">
              Thank you for subscribing to Everest Chronicle.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0 max-w-lg mx-auto"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email here"
                className="w-full sm:flex-1 rounded-none border border-border bg-white px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-brand focus:outline-none sm:border-r-0 transition-colors"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3 bg-brand text-white text-sm font-semibold tracking-wider uppercase hover:bg-link-hover transition-colors cursor-pointer border border-brand"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
