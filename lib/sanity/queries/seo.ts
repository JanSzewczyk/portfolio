import "server-only";

import { defineQuery } from "next-sanity";

/**
 * SEO Query
 *
 * Lightweight query to fetch SEO metadata and personal information
 * for the root layout. This query is separate from portfolioPageQuery
 * to avoid transferring unnecessary data for the main page.
 */
export const seoQuery = defineQuery(`
  *[_type == "portfolioPage"][0] {
    seo {
      metaTitle,
      metaDescription,
      keywords,
      ogImage { asset-> { _id, url, metadata { dimensions } }, hotspot, crop, alt },
      ogTitle,
      ogDescription,
      twitterCardType,
      twitterSite,
      twitterCreator,
      twitterImage { asset-> { _id, url, metadata { dimensions } }, hotspot, crop, alt },
      noindex,
      nofollow,
      noarchive,
      canonicalUrl,
      alternateUrls[] { hreflang, url },
      organizationName,
      organizationLogo { asset-> { _id, url, metadata { dimensions } }, hotspot, crop, alt },
      sameAsUrls
    },
    personalInfo {
      name,
      title,
      email,
      avatar { asset-> { _id, url }, alt },
      company
    }
  }
`);
