import type { SeoQueryResult } from "~/lib/sanity/types";
import { buildStructuredDataGraph, serializeJsonLd } from "~/lib/seo/structured-data";

interface StructuredDataProps {
  siteUrl: string;
  seoData: SeoQueryResult | null;
}

export function StructuredData({ siteUrl, seoData }: StructuredDataProps) {
  const graph = buildStructuredDataGraph({ siteUrl, seoData });
  const jsonLd = serializeJsonLd(graph);

  return (
    <script
      id="structured-data"
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: seo purposes
      dangerouslySetInnerHTML={{
        __html: jsonLd
      }}
    />
  );
}
