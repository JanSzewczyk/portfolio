import "server-only";

import type { Metadata } from "next";

import type { SeoQueryResult } from "~/lib/sanity/types";

/**
 * Build metadata from Sanity data with fallback values
 */
export function buildMetadata({ siteUrl, seoData }: { siteUrl: string; seoData: SeoQueryResult | null }): Metadata {
  const fallbackOgImageUrl = `${siteUrl}/opengraph-image`;

  // Get personal info from Sanity or fallback
  const name = seoData?.personalInfo?.name ?? "";
  const title = seoData?.personalInfo?.title ?? "";

  // Get SEO data from Sanity or fallback
  const metaTitle = seoData?.seo?.metaTitle ?? "";
  const metaDescription = seoData?.seo?.metaDescription ?? "";
  const keywords = seoData?.seo?.keywords ?? [];

  // Open Graph
  const ogTitle = seoData?.seo?.ogTitle ?? metaTitle;
  const ogDescription = seoData?.seo?.ogDescription ?? metaDescription;
  const ogImage = seoData?.seo?.ogImage?.asset?.url;

  // Twitter Card
  const twitterCardType = seoData?.seo?.twitterCardType ?? "summary_large_image";
  const twitterTitle = ogTitle;
  const twitterDescription = ogDescription;
  const twitterImage = seoData?.seo?.twitterImage?.asset?.url;
  const twitterCreator = seoData?.seo?.twitterCreator ?? "";
  const twitterSite = seoData?.seo?.twitterSite ?? undefined;

  // Build metadata object
  return {
    alternates: {
      canonical: seoData?.seo?.canonicalUrl ?? siteUrl,
      languages: seoData?.seo?.alternateUrls?.reduce(
        (acc, alternate) => {
          if (alternate.hreflang && alternate.url) {
            acc[alternate.hreflang] = alternate.url;
          }
          return acc;
        },
        {} as Record<string, string>
      )
    },
    appleWebApp: {
      statusBarStyle: "default",
      title: "Jan Szewczyk Portfolio"
    },

    applicationName: `${name} - Portfolio`,

    authors: [{ name, url: siteUrl }],

    creator: name,
    description: metaDescription,
    generator: "Next.js",
    keywords,
    metadataBase: new URL(siteUrl),

    openGraph: {
      description: ogDescription,
      images: [
        ogImage
          ? {
              alt: seoData?.seo?.ogImage?.alt ?? `${name} - ${title}`,
              height: seoData?.seo?.ogImage?.asset?.metadata?.dimensions?.height ?? 630,
              url: ogImage,
              width: seoData?.seo?.ogImage?.asset?.metadata?.dimensions?.width ?? 1200
            }
          : {
              alt: `${name} - ${title}`,
              height: 630,
              url: fallbackOgImageUrl,
              width: 1200
            }
      ],
      locale: "en_US",
      siteName: `${name} - ${title}`,
      title: ogTitle,
      type: "website",
      url: siteUrl
    },

    robots: {
      follow: !seoData?.seo?.nofollow,
      googleBot: {
        follow: !seoData?.seo?.nofollow,
        index: !seoData?.seo?.noindex,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1
      },
      index: !seoData?.seo?.noindex,
      noarchive: seoData?.seo?.noarchive ?? false
    },
    title: metaTitle,

    twitter: {
      card: twitterCardType as "summary" | "summary_large_image" | "app" | "player",
      creator: twitterCreator,
      description: twitterDescription,
      images: [twitterImage ?? ogImage ?? fallbackOgImageUrl],
      site: twitterSite,
      title: twitterTitle
    }
  };
}
