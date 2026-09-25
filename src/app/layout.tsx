import type { Metadata, Viewport } from "next";
import "./globals.css";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import JsonLd from "@/components/seo/JsonLd";
import { getNavigationItems } from "@/lib/ec-api";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
  jsonLdGraph,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";

export const viewport: Viewport = {
  themeColor: "#2a836a",
  width: "device-width",
  initialScale: 1,
};

/**
 * Global defaults only. Note there is deliberately **no** site-wide
 * `alternates.canonical` here: a canonical set on the root layout is inherited
 * by every child page, which would canonicalise the whole site to the
 * homepage. Each page emits its own self-canonical via `buildPageMetadata`
 * (docs §8, §43, §68).
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@everestchronicle",
    creator: "@everestchronicle",
  },
};

const jsonLd = jsonLdGraph([organizationJsonLd(), websiteJsonLd()]);

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Cached (`use cache` + `cacheLife("navigation")`), so this lands in the
  // static shell and the header is never re-fetched or re-mounted on
  // navigation. That persistence is what keeps the chrome from blinking.
  const navigationItems = await getNavigationItems();

  return (
    <html lang="en">
      <head>
        <JsonLd data={jsonLd} />
      </head>
      <body>
        {/*
          The chrome lives here, not in each page. Layouts persist across
          navigations, so the header keeps its scroll state, reading-progress
          value, and open menus instead of being torn down and rebuilt.
        */}
        <div id="top" className="site-frame">
          <SiteHeader navigationItems={navigationItems} />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
