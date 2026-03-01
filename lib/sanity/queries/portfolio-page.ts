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
        _type,
        asset-> {
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
        },
        hotspot,
        crop,
        alt
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
        featured,
        technologies[]-> {
          _id,
          name,
          icon,
          description
        }
      },
      decorativeBottomText
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
            _type,
            asset-> {
              _id,
              url,
              metadata {
                dimensions,
                lqip
              }
            },
            hotspot,
            crop,
            alt
          },
          technologies[]-> {
            _id,
            name,
            icon,
            description
          },
          links {
            live,
            github,
            npm
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
            description,
            technologies[]-> {
              _id,
              name,
              icon,
              description
            },
            links
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
    }
  }
`);
