import type { MetadataRoute } from "next";

import { getSiteUrl } from "~/lib/seo/get-site-url";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl();

  return {
    rules: [
      {
        allow: "/",
        disallow: ["/api/", "/_next/", "/storybook-static/"],
        userAgent: "*"
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
