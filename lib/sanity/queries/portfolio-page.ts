import "server-only";

import { defineQuery } from "next-sanity";

export const portfolioPageQuery = defineQuery(`
  *[_type == "portfolioPage"][0] {
    ...,
    // Personal Information
    personalInfo {
      name,
      title,
      company,
      email,
      avatar {
        ...,
        asset->
      },
      socialLinks[] {
        _key,
        platform,
        url,
        icon,
        username
      }
    },

    // Hero Section
    hero {
      alternativeTitles,
      tagline,
      isAvailable
    },

    // About Section
    about {
      heading {
        title,
        description
      },
      bio,
      location,
      stats[] {
        _key,
        label,
        value,
        suffix
      }
    },

    // Skills Section
    skills {
      heading {
        title,
        description
      },
      technologyGroups[]-> {
        _id,
        label,
        slug,
        category,
        technologies[]-> {
          _id,
          name,
          icon,
          description
        }
      }
    },

    // Projects Section
    projects {
      heading {
        title,
        description
      },
      projectGroups[]-> {
        _id,
        label,
        description,
        projects[]-> {
          _id,
          title,
          description,
          longDescription,
          thumbnail {
            ...,
            asset->
          },
          technologies[]-> {
            _id,
            name,
            icon,
            description
          },
          links {
            live,
            github
          },
          featured
        }
      }
    },

    // Experience Section
    experience {
      heading {
        title,
        description
      },
      experiences[]-> {
        _id,
        role,
        company,
        companyLogo {
          asset-> {
            _id,
            url,
            metadata {
              dimensions,
              lqip
            }
          }
        },
        companyUrl,
        location,
        type,
        startDate,
        endDate,
        summary,
        responsibilities,
        achievements,
        technologies[]-> {
          _id,
          name,
          icon,
          description
        }
      }
    },

    // Education Section
    education {
      heading {
        title,
        description
      },
      education[]-> {
        _id,
        institution,
        institutionUrl,
        location,
        degree,
        fieldOfStudy,
        startDate,
        endDate,
        grade,
        thesis {
          title,
          description,
          technologies[]-> {
            _id,
            name,
            icon,
            description
          },
          project-> {
            _id,
            title,
            description
          },
          url
        },
        achievements,
        coursework
      }
    },

    // Contact Section
    contact {
      heading {
        title,
        description
      },
      form {
        enabled,
        title,
        description,
        successMessage,
        submitButtonText,
        successView {
          title,
          description,
          buttonText
        }
      },
      quickChat {
        title,
        description
      }
    },

    // Footer
    footer {
      copyrightText,
      socialLinks[] {
        _key,
        platform,
        url,
        icon
      }
    },

    // SEO & Metadata
    seo {
      metaTitle,
      metaDescription,
      ogImage {
        asset-> {
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
        }
      },
      keywords
    }
  }
`);
