import type { MetadataRoute } from "next";

import { getSiteUrl } from "~/lib/seo/get-site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
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
