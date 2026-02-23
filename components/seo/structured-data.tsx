import { type SeoQueryResult } from "~/lib/sanity/types";
import {
  buildBreadcrumbSchema,
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
  const personSchema = buildPersonSchema({ siteUrl, seoData });
  const websiteSchema = buildWebsiteSchema({ siteUrl, seoData });
  const webPageSchema = buildWebPageSchema({ siteUrl, seoData });
  const profilePageSchema = buildProfilePageSchema({ siteUrl, seoData });
  const breadcrumbSchema = buildBreadcrumbSchema({ siteUrl });

  return (
    <>
      <script
        id="person-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        id="webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        id="profilepage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
      <script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
