import "server-only";

import { type Metadata } from "next";

import { PERSONAL_INFO } from "~/constants/portfolio";
import { type SeoQueryResult } from "~/lib/sanity/types";

/**
 * Build metadata from Sanity data with fallback values
 */
export function buildMetadata({ siteUrl, seoData }: { siteUrl: string; seoData: SeoQueryResult | null }): Metadata {
  // Get personal info from Sanity or fallback
  const name = seoData?.personalInfo?.name || PERSONAL_INFO.name;
  const title = seoData?.personalInfo?.title || PERSONAL_INFO.title;

  // Get SEO data from Sanity or fallback
  const metaTitle = seoData?.seo?.metaTitle || `${name} | ${title}`;
  const metaDescription =
    seoData?.seo?.metaDescription ||
    `Frontend Engineer from Cracow, Poland specializing in React, Next.js, TypeScript, and React Native. Creator of @szum-tech/design-system and open source tools.`;
  const keywords = seoData?.seo?.keywords || [
    "Frontend Engineer",
    "Frontend Developer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "React Native",
    "Open Source",
    "Cracow Poland",
    "Web Development",
    "UI/UX",
    "@szum-tech",
    "Jan Szewczyk",
    "Szum-Tech",
    "Szumrak Technologies"
  ];

  // Open Graph
  const ogTitle = seoData?.seo?.ogTitle || metaTitle;
  const ogDescription = seoData?.seo?.ogDescription || metaDescription;
  const ogImage = seoData?.seo?.ogImage?.asset?.url;

  // Twitter Card
  const twitterCardType = seoData?.seo?.twitterCardType || "summary_large_image";
  const twitterTitle = ogTitle;
  const twitterDescription = ogDescription;
  const twitterImage = seoData?.seo?.twitterImage?.asset?.url || ogImage;
  const twitterCreator = seoData?.seo?.twitterCreator || "@DzikiSzumrak";

  // Build metadata object
  const metadata: Metadata = {
    metadataBase: new URL(siteUrl),

    title: {
      default: metaTitle,
      template: "%s | " + name
    },

    description: metaDescription,

    keywords,

    authors: [{ name, url: siteUrl }],

    creator: name,

    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteUrl,
      siteName: `${name} - ${title}`,
      title: ogTitle,
      description: ogDescription,
      images: ogImage
        ? [
            {
              url: ogImage,
              width: seoData?.seo?.ogImage?.asset?.metadata?.dimensions?.width || 1200,
              height: seoData?.seo?.ogImage?.asset?.metadata?.dimensions?.height || 630,
              alt: seoData?.seo?.ogImage?.alt || `${name} - ${title}`
            }
          ]
        : [
            {
              url: "/og-image.png",
              width: 1200,
              height: 630,
              alt: `${name} - ${title}`
            }
          ]
    },

    twitter: {
      card: twitterCardType as "summary" | "summary_large_image" | "app" | "player",
      title: twitterTitle,
      description: twitterDescription,
      images: twitterImage ? [twitterImage] : [ogImage || `${siteUrl}/og-image.png`],
      creator: twitterCreator
    },

    robots: {
      index: !seoData?.seo?.noindex,
      follow: !seoData?.seo?.nofollow,
      noarchive: seoData?.seo?.noarchive || false,
      googleBot: {
        index: !seoData?.seo?.noindex,
        follow: !seoData?.seo?.nofollow,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1
      }
    },

    alternates: {
      canonical: seoData?.seo?.canonicalUrl || siteUrl,
      languages: seoData?.seo?.alternateUrls?.reduce(
        (acc, alternate) => {
          if (alternate.hreflang && alternate.url) {
            acc[alternate.hreflang] = alternate.url;
          }
          return acc;
        },
        {} as Record<string, string>
      )
    }
  };

  return metadata;
}
