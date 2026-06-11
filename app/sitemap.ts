import type { MetadataRoute } from "next";

import { getPortfolioPageLastModified } from "~/lib/sanity/services";
import { getSiteUrl } from "~/lib/seo/get-site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();
  // Honest lastmod tied to the Sanity document, falling back to "now" if unavailable.
  const lastModified = (await getPortfolioPageLastModified()) ?? new Date();

  return [
    {
      changeFrequency: "weekly",
      lastModified,
      priority: 1.0,
      url: baseUrl
    }
  ];
}
