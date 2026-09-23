import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#2a836a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://everestchronicle.com"),
  title: {
    default: "Everest Chronicle | Journalism & Stories from the Himalaya",
    template: "%s | Everest Chronicle",
  },
  description:
    "Independent reporting, climate investigation, and authentic visual storytelling from Nepal and across the high Himalayas.",
  keywords: [
    "Everest",
    "Himalayas",
    "Nepal Journalism",
    "Mountaineering",
    "Climate Change",
    "Expeditions",
    "Conservation",
    "Sherpa Culture",
  ],
  authors: [{ name: "Everest Chronicle Editorial Team" }],
  creator: "Everest Chronicle",
  publisher: "Everest Chronicle",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Everest Chronicle | Journalism & Stories from the Himalaya",
    description:
      "Independent reporting, climate investigation, and authentic visual storytelling from Nepal and across the high Himalayas.",
    url: "https://everestchronicle.com",
    siteName: "Everest Chronicle",
    images: [
      {
        url: "/brand/logo.png",
        width: 827,
        height: 1024,
        alt: "Everest Chronicle Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Everest Chronicle | Journalism & Stories from the Himalaya",
    description:
      "Independent reporting, climate investigation, and authentic visual storytelling from Nepal and across the high Himalayas.",
    site: "@everestchronicle",
    creator: "@everestchronicle",
    images: ["/brand/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "NewsMediaOrganization",
      "@id": "https://everestchronicle.com/#organization",
      name: "Everest Chronicle",
      url: "https://everestchronicle.com",
      logo: {
        "@type": "ImageObject",
        url: "https://everestchronicle.com/brand/logo.png",
        width: 827,
        height: 1024,
      },
      sameAs: [
        "https://instagram.com",
        "https://facebook.com",
        "https://youtube.com",
        "https://x.com",
      ],
      description:
        "Independent reporting, climate investigation, and authentic visual storytelling from Nepal and across the high Himalayas.",
    },
    {
      "@type": "WebSite",
      "@id": "https://everestchronicle.com/#website",
      url: "https://everestchronicle.com",
      name: "Everest Chronicle",
      publisher: {
        "@id": "https://everestchronicle.com/#organization",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://everestchronicle.com/?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
