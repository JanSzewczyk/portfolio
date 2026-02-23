import "server-only";

import { PERSONAL_INFO } from "~/constants/portfolio";
import { SOCIAL_LINKS } from "~/constants/portfolio/social-links";
import { type SeoQueryResult } from "~/lib/sanity/types";

/**
 * Build Person schema from Sanity data with fallback values
 */
export function buildPersonSchema({ siteUrl, seoData }: { siteUrl: string; seoData: SeoQueryResult | null }) {
  // Get personal info from Sanity or fallback
  const name = seoData?.personalInfo?.name || PERSONAL_INFO.name;
  const title = seoData?.personalInfo?.title || PERSONAL_INFO.title;
  const email = seoData?.personalInfo?.email || PERSONAL_INFO.email;
  const company = seoData?.personalInfo?.company || PERSONAL_INFO.company;
  const avatar = seoData?.personalInfo?.avatar?.asset?.url || PERSONAL_INFO.avatar;

  // Get SEO data for description and social links
  const description = seoData?.seo?.metaDescription || PERSONAL_INFO.tagline;
  const sameAsUrls = seoData?.seo?.sameAsUrls || SOCIAL_LINKS.map((link) => link.url);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}#person`,
    name,
    alternateName: ["Jan Szewczyk", "JanSzewczyk"],
    jobTitle: title,
    description,
    image: {
      "@type": "ImageObject",
      url: avatar,
      caption: `${name} - ${title}`
    },
    url: siteUrl,
    email: `mailto:${email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cracow",
      addressCountry: "PL"
    },
    sameAs: sameAsUrls,
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "React Native",
      "Frontend Development",
      "Web Development",
      "Design Systems",
      "Tailwind CSS"
    ],
    worksFor: {
      "@type": "Organization",
      name: company
    }
  };
}

/**
 * Build WebSite schema from Sanity data with fallback values
 */
export function buildWebsiteSchema({ siteUrl, seoData }: { siteUrl: string; seoData: SeoQueryResult | null }) {
  const name = seoData?.personalInfo?.name || PERSONAL_INFO.name;
  const title = seoData?.personalInfo?.title || PERSONAL_INFO.title;
  const description = seoData?.seo?.metaDescription || PERSONAL_INFO.tagline;

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}#website`,
    url: siteUrl,
    name: `${name} - ${title} Portfolio`,
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
export function buildWebPageSchema({ siteUrl, seoData }: { siteUrl: string; seoData: SeoQueryResult | null }) {
  const name = seoData?.personalInfo?.name || PERSONAL_INFO.name;
  const title = seoData?.personalInfo?.title || PERSONAL_INFO.title;
  const description = seoData?.seo?.metaDescription || PERSONAL_INFO.tagline;
  const ogImage = seoData?.seo?.ogImage?.asset?.url || `${siteUrl}/og-image.png`;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteUrl}#webpage`,
    url: siteUrl,
    name: `${name} | ${title}`,
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
export function buildProfilePageSchema({ siteUrl, seoData }: { siteUrl: string; seoData: SeoQueryResult | null }) {
  const name = seoData?.personalInfo?.name || PERSONAL_INFO.name;
  const description = seoData?.seo?.metaDescription || PERSONAL_INFO.bio;

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteUrl}#profilepage`,
    url: siteUrl,
    name: `${name} - Portfolio`,
    description,
    mainEntity: {
      "@id": `${siteUrl}#person`
    }
  };
}

/**
 * Build Organization schema from Sanity data (optional)
 */
export function buildOrganizationSchema({ siteUrl, seoData }: { siteUrl: string; seoData: SeoQueryResult | null }) {
  const name = seoData?.seo?.organizationName || PERSONAL_INFO.company;
  const logo = seoData?.seo?.organizationLogo?.asset?.url;
  const sameAsUrls = seoData?.seo?.sameAsUrls || SOCIAL_LINKS.map((link) => link.url);

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}#organization`,
    name,
    url: siteUrl,
    sameAs: sameAsUrls
  };

  if (logo) {
    schema.logo = {
      "@type": "ImageObject",
      url: logo
    };
  }

  return schema;
}

/**
 * Build BreadcrumbList schema (static)
 */
export function buildBreadcrumbSchema({ siteUrl }: { siteUrl: string }) {
  return {
    "@context": "https://schema.org",
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
