import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#111111",
    categories: ["portfolio", "developer", "technology"],
    description: "Frontend Engineer from Cracow, Poland specializing in React, Next.js, and TypeScript.",
    dir: "ltr",
    display: "standalone",
    icons: [
      {
        purpose: "maskable",
        sizes: "192x192",
        src: "/web-app-manifest-192x192.png",
        type: "image/png"
      },
      {
        purpose: "maskable",
        sizes: "512x512",
        src: "/web-app-manifest-512x512.png",
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
