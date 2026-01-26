import { type MetadataRoute } from "next";

import { env } from "~/data/env/client";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/storybook-static/"]
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
