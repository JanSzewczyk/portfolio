import type { MetadataRoute } from "next";

import { getSiteUrl } from "~/lib/seo/get-site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const currentDate = new Date().toISOString();

  return [
    {
      changeFrequency: "weekly",
      lastModified: currentDate,
      priority: 1.0,
      url: baseUrl
    }
  ];
}
