import "server-only";

import { defineQuery } from "next-sanity";

export const getPortfolioPageQuery = defineQuery(`
  *[_type == "portfolioPage"][0] {
    _id,
    _type,
    _updatedAt,

    // Hero Section
    hero {
      name,
      title,
      company,
      alternativeTitles,
      tagline,
      avatar {
        asset-> {
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
        }
      },
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
      featuredProjects[]-> {
        _id,
        title,
        description,
        longDescription,
        thumbnail {
          asset-> {
            _id,
            url,
            metadata {
              dimensions,
              lqip
            }
          }
        },
        technologies[]-> {
          _id,
          name,
          icon,
          description
        },
        category,
        links {
          live,
          github
        },
        featured
      },
      allProjects[]-> {
        _id,
        title,
        description,
        longDescription,
        thumbnail {
          asset-> {
            _id,
            url,
            metadata {
              dimensions,
              lqip
            }
          }
        },
        technologies[]-> {
          _id,
          name,
          icon,
          description
        },
        category,
        links {
          live,
          github
        },
        featured
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
      email,
      socialLinks[] {
        _key,
        platform,
        url,
        icon,
        username
      },
      formSettings {
        enabled,
        submitButtonText,
        successMessage
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
