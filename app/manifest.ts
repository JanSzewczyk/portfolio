import { type MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jan Szewczyk - Frontend Engineer Portfolio",
    short_name: "Jan Szewczyk",
    description: "Frontend Engineer from Cracow, Poland specializing in React, Next.js, TypeScript, and React Native.",
    start_url: "/",
    display: "standalone",
    background_color: "#111111",
    theme_color: "#111111",
    orientation: "portrait",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      }
    ],
    categories: ["portfolio", "developer", "technology"],
    lang: "en-US",
    dir: "ltr"
  };
}
