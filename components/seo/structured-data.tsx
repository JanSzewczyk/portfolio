import { PERSONAL_INFO, SOCIAL_LINKS } from "~/constants/portfolio";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://janszewczyk.com";

export function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}#person`,
    name: PERSONAL_INFO.name,
    alternateName: ["Jan Szewczyk", "JanSzewczyk"],
    jobTitle: PERSONAL_INFO.title,
    description: PERSONAL_INFO.tagline,
    image: {
      "@type": "ImageObject",
      url: PERSONAL_INFO.avatar,
      caption: `${PERSONAL_INFO.name} - ${PERSONAL_INFO.title}`
    },
    url: siteUrl,
    email: `mailto:${PERSONAL_INFO.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cracow",
      addressCountry: "PL"
    },
    sameAs: SOCIAL_LINKS.map((link) => link.url),
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
      name: PERSONAL_INFO.company
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}#website`,
    url: siteUrl,
    name: `${PERSONAL_INFO.name} Portfolio`,
    description: PERSONAL_INFO.tagline,
    publisher: {
      "@id": `${siteUrl}#person`
    },
    inLanguage: "en-US"
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteUrl}#webpage`,
    url: siteUrl,
    name: `${PERSONAL_INFO.name} | ${PERSONAL_INFO.title}`,
    description: PERSONAL_INFO.tagline,
    isPartOf: {
      "@id": `${siteUrl}#website`
    },
    about: {
      "@id": `${siteUrl}#person`
    },
    inLanguage: "en-US",
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${siteUrl}/og-image.png`
    }
  };

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteUrl}#profilepage`,
    url: siteUrl,
    name: `${PERSONAL_INFO.name} - Portfolio`,
    description: PERSONAL_INFO.bio,
    mainEntity: {
      "@id": `${siteUrl}#person`
    }
  };

  const breadcrumbSchema = {
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
