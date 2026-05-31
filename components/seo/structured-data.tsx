import type { SeoQueryResult } from "~/lib/sanity/types";
import { buildStructuredDataGraph, serializeJsonLd } from "~/lib/seo/structured-data";

interface StructuredDataProps {
  seoData: SeoQueryResult | null;
  siteUrl: string;
}

export function StructuredData({ siteUrl, seoData }: StructuredDataProps) {
  const graph = buildStructuredDataGraph({ seoData, siteUrl });
  const jsonLd = serializeJsonLd(graph);

  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: seo purposes
      dangerouslySetInnerHTML={{
        __html: jsonLd
      }}
      id="structured-data"
      type="application/ld+json"
    />
  );
}
