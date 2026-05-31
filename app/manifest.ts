import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#111111",
    categories: ["portfolio", "developer", "technology"],
    description: "Frontend Engineer from Cracow, Poland specializing in React, Next.js, TypeScript, and React Native.",
    dir: "ltr",
    display: "standalone",
    icons: [
      { sizes: "16x16", src: "/favicon-16x16.png", type: "image/png" },
      { sizes: "32x32", src: "/favicon-32x32.png", type: "image/png" },
      {
        purpose: "maskable",
        sizes: "192x192",
        src: "/android-chrome-192x192.png",
        type: "image/png"
      },
      {
        purpose: "maskable",
        sizes: "512x512",
        src: "/android-chrome-512x512.png",
        type: "image/png"
      }
    ],
    lang: "en-US",
    name: "Jan Szewczyk - Frontend Engineer Portfolio",
    orientation: "portrait",
    short_name: "Jan Szewczyk",
    start_url: "/",
    theme_color: "#111111"
  };
}
