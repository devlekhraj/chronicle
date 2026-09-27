"use client";

import { useState } from "react";
import { Mail, Check, Bell } from "lucide-react";

interface AuthorFollowCardProps {
  authorName: string;
}

export default function AuthorFollowCard({ authorName }: AuthorFollowCardProps) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    setIsSubscribed(true);
  };

  return (
    <div className="author-newsletter-card">
      <div className="author-newsletter-header">
        <div className="author-newsletter-icon" aria-hidden="true">
          <Bell size={18} />
        </div>
        <div className="author-newsletter-text">
          <h3 className="author-newsletter-title">Get alerts from {authorName}</h3>
          <p className="author-newsletter-desc">
            Never miss a new dispatch or story. Delivered straight to your inbox.
          </p>
        </div>
      </div>

      {isSubscribed ? (
        <div className="author-newsletter-success" role="status">
          <Check size={18} className="author-newsletter-check" aria-hidden="true" />
          <span>You&apos;re subscribed to alerts for {authorName}!</span>
        </div>
      ) : (
        <form className="author-newsletter-form" onSubmit={handleSubmit}>
          <div className="author-newsletter-input-wrap">
            <Mail size={16} className="author-newsletter-mail-icon" aria-hidden="true" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="author-newsletter-input"
              aria-label={`Email address to get alerts from ${authorName}`}
            />
          </div>
          <button type="submit" className="author-newsletter-btn">
            Get Alerts
          </button>
        </form>
      )}
    </div>
  );
}
