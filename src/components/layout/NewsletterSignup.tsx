"use client";

/**
 * Newsletter opt-in. Uses a real `<label>` for the field name (docs §55) —
 * the `aria-label` was redundant alongside it and has been dropped.
 */
export default function NewsletterSignup() {
  return (
    <form className="newsletter-form" onSubmit={(event) => event.preventDefault()}>
      <label htmlFor="newsletter-email-input" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email-input"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="Enter your email address"
      />
      <button type="submit">SUBSCRIBE</button>
    </form>
  );
}
