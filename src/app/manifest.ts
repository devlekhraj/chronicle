import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Everest Chronicle",
    short_name: "Chronicle",
    description:
      "Independent reporting, climate investigation, and authentic visual storytelling from Nepal and across the high Himalayas.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2a836a",
    icons: [
      {
        src: "/brand/logo.png",
        sizes: "827x1024",
        type: "image/png",
      },
    ],
  };
}
