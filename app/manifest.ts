import { type MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Portfolio",
    short_name: "Portfolio",
    description: "A Next.js application with Tailwind CSS and optimized setup.",
    start_url: "/",
    display: "standalone",
    background_color: "#1a202c", // Matches Tailwind's bg-app-background
    theme_color: "#1a202c" // Matches Tailwind's bg-app-background
  };
}
