import "server-only";

import type { BreadcrumbList, Graph, Organization, Person, ProfilePage, WebPage, WebSite } from "schema-dts";

import type { SeoQueryResult } from "~/lib/sanity/types";

/**
 * Serialize JSON-LD for safe inline script rendering.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/**
 * Build Person schema from Sanity data with fallback values
 */
export function buildPersonSchema({ siteUrl, seoData }: { siteUrl: string; seoData: SeoQueryResult | null }): Person {
  // Get personal info from Sanity or fallback
  const name = seoData?.personalInfo?.name ?? undefined;
  const title = seoData?.personalInfo?.title ?? undefined;
  const email = seoData?.personalInfo?.email ?? undefined;
  const company = seoData?.personalInfo?.company ?? undefined;
  const avatar = seoData?.personalInfo?.avatar?.asset?.url ?? undefined;

  // Get SEO data for description and social links
  const description = seoData?.seo?.metaDescription ?? undefined;
  const sameAsUrls = seoData?.seo?.sameAsUrls ?? [];

  // Get structured data fields from Sanity or use fallback values
  const alternateNames = seoData?.seo?.alternateNames ?? [];
  const addressLocality = seoData?.seo?.addressLocality ?? undefined;
  const addressCountry = seoData?.seo?.addressCountry ?? undefined;
  const knowsAbout = seoData?.seo?.knowsAbout ?? [];

  return {
    "@type": "Person",
    "@id": `${siteUrl}#person`,
    name,
    alternateName: alternateNames,
    jobTitle: title,
    description,
    image: avatar
      ? {
          "@type": "ImageObject",
          url: avatar,
          caption: `${name} - ${title}`
        }
      : undefined,
    url: siteUrl,
    email: email ? `mailto:${email}` : undefined,
    address:
      addressLocality || addressCountry
        ? {
            "@type": "PostalAddress",
            addressLocality,
            addressCountry
          }
        : undefined,
    sameAs: sameAsUrls,
    knowsAbout,
    worksFor: company
      ? {
          "@type": "Organization",
          name: company
        }
      : undefined
  };
}

/**
 * Build WebSite schema from Sanity data with fallback values
 */
export function buildWebsiteSchema({ siteUrl, seoData }: { siteUrl: string; seoData: SeoQueryResult | null }): WebSite {
  const name = seoData?.personalInfo?.name ?? undefined;
  const title = seoData?.personalInfo?.title ?? undefined;
  const description = seoData?.seo?.metaDescription ?? undefined;

  return {
    "@type": "WebSite",
    "@id": `${siteUrl}#website`,
    url: siteUrl,
    name: name && title ? `${name} - ${title} Portfolio` : undefined,
    description,
    publisher: {
      "@id": `${siteUrl}#person`
    },
    inLanguage: "en-US"
  };
}

/**
 * Build WebPage schema from Sanity data with fallback values
 */
export function buildWebPageSchema({ siteUrl, seoData }: { siteUrl: string; seoData: SeoQueryResult | null }): WebPage {
  const name = seoData?.personalInfo?.name ?? undefined;
  const title = seoData?.personalInfo?.title ?? undefined;
  const description = seoData?.seo?.metaDescription ?? undefined;
  const ogImage = seoData?.seo?.ogImage?.asset?.url ?? `${siteUrl}/opengraph-image`;

  return {
    "@type": "WebPage",
    "@id": `${siteUrl}#webpage`,
    url: siteUrl,
    name: name && title ? `${name} | ${title}` : undefined,
    description,
    isPartOf: {
      "@id": `${siteUrl}#website`
    },
    about: {
      "@id": `${siteUrl}#person`
    },
    inLanguage: "en-US",
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: ogImage
    }
  };
}

/**
 * Build ProfilePage schema from Sanity data with fallback values
 */
export function buildProfilePageSchema({
  siteUrl,
  seoData
}: {
  siteUrl: string;
  seoData: SeoQueryResult | null;
}): ProfilePage {
  const name = seoData?.personalInfo?.name ?? undefined;
  const description = seoData?.seo?.metaDescription ?? undefined;

  return {
    "@type": "ProfilePage",
    "@id": `${siteUrl}#profilepage`,
    url: siteUrl,
    name: name ? `${name} - Portfolio` : undefined,
    description,
    mainEntity: {
      "@id": `${siteUrl}#person`
    }
  };
}

/**
 * Build Organization schema from Sanity data (optional)
 */
export function buildOrganizationSchema({
  siteUrl,
  seoData
}: {
  siteUrl: string;
  seoData: SeoQueryResult | null;
}): Organization {
  const name = seoData?.seo?.organizationName ?? undefined;
  const logo = seoData?.seo?.organizationLogo?.asset?.url;
  const sameAsUrls = seoData?.seo?.sameAsUrls ?? [];

  return {
    "@type": "Organization",
    "@id": `${siteUrl}#organization`,
    name,
    url: siteUrl,
    sameAs: sameAsUrls,
    logo: logo
      ? {
          "@type": "ImageObject",
          url: logo
        }
      : undefined
  };
}

/**
 * Build BreadcrumbList schema (static)
 */
export function buildBreadcrumbSchema({ siteUrl }: { siteUrl: string }): BreadcrumbList {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: `${siteUrl}#about`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Projects",
        item: `${siteUrl}#projects`
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Contact",
        item: `${siteUrl}#contact`
      }
    ]
  };
}

/**
 * Build complete JSON-LD graph for the website.
 */
export function buildStructuredDataGraph({
  siteUrl,
  seoData
}: {
  siteUrl: string;
  seoData: SeoQueryResult | null;
}): Graph {
  return {
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
}
