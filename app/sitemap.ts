import { type MetadataRoute } from "next";

import { env } from "~/data/env/client";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = env.NEXT_PUBLIC_VERCEL_URL
    ? env.NEXT_PUBLIC_VERCEL_URL.startsWith("http")
      ? env.NEXT_PUBLIC_VERCEL_URL
      : `https://${env.NEXT_PUBLIC_VERCEL_URL}`
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
