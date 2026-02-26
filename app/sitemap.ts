import { type MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
    ? process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL.startsWith("http")
      ? process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
      : `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://localhost:3000";
  const currentDate = new Date().toISOString();

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0
    }
  ];
}
