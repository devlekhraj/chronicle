"use client";

export default function NewsletterSignup() {
  return (
    <form className="newsletter-form" onSubmit={(event) => event.preventDefault()}>
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
  );
}
