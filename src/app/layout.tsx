import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Everest Chronicle",
  description: "Stories from the Himalaya.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
