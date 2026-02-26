import { type SeoQueryResult } from "~/lib/sanity/types";
import {
  buildBreadcrumbSchema,
  buildOrganizationSchema,
  buildPersonSchema,
  buildProfilePageSchema,
  buildWebPageSchema,
  buildWebsiteSchema
} from "~/lib/seo/structured-data";

interface StructuredDataProps {
  siteUrl: string;
  seoData: SeoQueryResult | null;
}

export function StructuredData({ siteUrl, seoData }: StructuredDataProps) {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      buildPersonSchema({ siteUrl, seoData }),
      buildWebsiteSchema({ siteUrl, seoData }),
      buildWebPageSchema({ siteUrl, seoData }),
      buildProfilePageSchema({ siteUrl, seoData }),
      buildBreadcrumbSchema({ siteUrl }),
      buildOrganizationSchema({ siteUrl, seoData })
    ]
  };

  return (
    <script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
