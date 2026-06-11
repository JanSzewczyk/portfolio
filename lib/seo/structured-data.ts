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
    "@id": `${siteUrl}#person`,
    "@type": "Person",
    address:
      addressLocality || addressCountry
        ? {
            "@type": "PostalAddress",
            addressCountry,
            addressLocality
          }
        : undefined,
    alternateName: alternateNames,
    description,
    email: email ? `mailto:${email}` : undefined,
    hasOccupation: title
      ? {
          "@type": "Occupation",
          name: title,
          occupationLocation: addressLocality
            ? {
                "@type": "City",
                name: addressLocality
              }
            : undefined,
          skills: knowsAbout.length > 0 ? knowsAbout : undefined
        }
      : undefined,
    image: avatar
      ? {
          "@type": "ImageObject",
          caption: `${name} - ${title}`,
          url: avatar
        }
      : undefined,
    jobTitle: title,
    knowsAbout,
    name,
    sameAs: sameAsUrls,
    url: siteUrl,
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
    "@id": `${siteUrl}#website`,
    "@type": "WebSite",
    description,
    inLanguage: "en-US",
    name: name && title ? `${name} - ${title} Portfolio` : undefined,
    publisher: {
      "@id": `${siteUrl}#person`
    },
    url: siteUrl
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
    "@id": `${siteUrl}#webpage`,
    "@type": "WebPage",
    about: {
      "@id": `${siteUrl}#person`
    },
    description,
    inLanguage: "en-US",
    isPartOf: {
      "@id": `${siteUrl}#website`
    },
    name: name && title ? `${name} | ${title}` : undefined,
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: ogImage
    },
    url: siteUrl
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
    "@id": `${siteUrl}#profilepage`,
    "@type": "ProfilePage",
    description,
    mainEntity: {
      "@id": `${siteUrl}#person`
    },
    name: name ? `${name} - Portfolio` : undefined,
    url: siteUrl
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
    "@id": `${siteUrl}#organization`,
    "@type": "Organization",
    logo: logo
      ? {
          "@type": "ImageObject",
          url: logo
        }
      : undefined,
    name,
    sameAs: sameAsUrls,
    url: siteUrl
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
        item: siteUrl,
        name: "Home",
        position: 1
      },
      {
        "@type": "ListItem",
        item: `${siteUrl}#about`,
        name: "About",
        position: 2
      },
      {
        "@type": "ListItem",
        item: `${siteUrl}#projects`,
        name: "Projects",
        position: 3
      },
      {
        "@type": "ListItem",
        item: `${siteUrl}#contact`,
        name: "Contact",
        position: 4
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
      buildPersonSchema({ seoData, siteUrl }),
      buildWebsiteSchema({ seoData, siteUrl }),
      buildWebPageSchema({ seoData, siteUrl }),
      buildProfilePageSchema({ seoData, siteUrl }),
      buildBreadcrumbSchema({ siteUrl }),
      buildOrganizationSchema({ seoData, siteUrl })
    ]
  };
}
