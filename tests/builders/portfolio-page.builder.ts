import { faker } from "@faker-js/faker";
import { bool, build, int, oneOf } from "mimicry-js";
import type { PortfolioPageQueryResult, SanityImageAssetReference, SanityImageDimensions } from "~/lib/sanity/types";

// Extracted types from query result for type-safe builders
type PortfolioPage = NonNullable<PortfolioPageQueryResult>;
type PortfolioTechnologyGroup = NonNullable<NonNullable<PortfolioPage["skills"]>["technologyGroups"]>[number];
type PortfolioProjectGroup = NonNullable<NonNullable<PortfolioPage["projects"]>["projectGroups"]>[number];
type PortfolioProject = NonNullable<NonNullable<PortfolioProjectGroup["projects"]>>[number];
type PortfolioExperience = NonNullable<NonNullable<PortfolioPage["experience"]>["experiences"]>[number];
type PortfolioEducation = NonNullable<NonNullable<PortfolioPage["education"]>["education"]>[number];
type PortfolioTechnology = NonNullable<PortfolioTechnologyGroup["technologies"]>[number];

/**
 * Helper function to build an image asset reference for SEO images.
 */
const buildImageAssetReference = (): SanityImageAssetReference => {
  const imageId = faker.string.alphanumeric(28);
  return {
    _ref: `image-${imageId}`,
    _type: "reference"
  };
};

/**
 * Helper function to build Sanity image dimensions.
 */
const buildImageDimensions = (width: number, height: number): SanityImageDimensions => ({
  _type: "sanity.imageDimensions",
  aspectRatio: width / height,
  height,
  width
});

/**
 * Helper function to build an expanded asset object for query results that dereference with `->`.
 */
const buildExpandedAssetForQuery = (
  width: number,
  height: number
): {
  _id: string;
  url: string | null;
  metadata: {
    dimensions: SanityImageDimensions | null;
    lqip: string | null;
  } | null;
} => {
  const imageId = faker.string.alphanumeric(28);
  return {
    _id: `image-${imageId}-${width}x${height}-jpg`,
    metadata: {
      dimensions: buildImageDimensions(width, height),
      lqip: "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAMEBf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AMOA="
    },
    url: `https://cdn.sanity.io/images/project/dataset/${imageId}-${width}x${height}.jpg`
  };
};

/**
 * Builder for PortfolioPage about section test data.
 *
 * @example
 * const about = portfolioPageAboutBuilder.one();
 *
 * @example
 * const customAbout = portfolioPageAboutBuilder.one({
 *   overrides: { bio: "Custom bio text" }
 * });
 */
export const portfolioPageAboutBuilder = build<NonNullable<PortfolioPageQueryResult>["about"]>({
  fields: {
    bio: () =>
      [
        `With over **${int(3, 8)} years of commercial experience**, I've been shaping modern web interfaces.`,
        `I'm the creator of **Szum-Tech** — an open-source design system built on Tailwind CSS and Radix UI.`,
        `Beyond frontend, I've ventured into computer vision with **MediaPipe and OpenCV**.`
      ].join("\n\n"),
    bioTagline: () => faker.lorem.sentence(5),
    cvDownloads: () => [
      {
        _key: faker.string.uuid(),
        file: { asset: { originalFilename: "Jan-Szewczyk-CV-EN.pdf", url: faker.internet.url() } },
        label: "English",
        languageCode: "en"
      },
      {
        _key: faker.string.uuid(),
        file: { asset: { originalFilename: "Jan-Szewczyk-CV-PL.pdf", url: faker.internet.url() } },
        label: "Polski",
        languageCode: "pl"
      }
    ],
    heading: {
      description: () => faker.lorem.sentence(),
      title: () => faker.lorem.words(3)
    },
    hobbies: () => ({
      items: [
        { _key: faker.string.uuid(), icon: "fishing", label: "Fishing" },
        { _key: faker.string.uuid(), icon: "figurines", label: "Figurines" },
        { _key: faker.string.uuid(), icon: "gardening", label: "Gardening" }
      ],
      sectionLabel: "Off the Keyboard"
    }),
    location: () => ({
      city: `${faker.location.city()}, Poland`,
      remoteWorkLabel: "Open to remote work"
    }),
    stats: () => [
      {
        _key: faker.string.uuid(),
        label: "Years of experience",
        suffix: "+",
        value: int(4, 8)
      },
      {
        _key: faker.string.uuid(),
        label: "GitHub repositories",
        suffix: null,
        value: int(20, 50)
      },
      {
        _key: faker.string.uuid(),
        label: "Open source projects",
        suffix: "+",
        value: int(5, 15)
      },
      {
        _key: faker.string.uuid(),
        label: "Published packages",
        suffix: null,
        value: int(10, 40)
      }
    ]
  }
});

/**
 * Builder for PortfolioPage personal info section test data.
 *
 * @example
 * const personalInfo = portfolioPagePersonalInfoBuilder.one();
 *
 * @example
 * const withAvatar = portfolioPagePersonalInfoBuilder.one({ traits: ["withAvatar"] });
 */
export const portfolioPagePersonalInfoBuilder = build<NonNullable<PortfolioPageQueryResult>["personalInfo"]>({
  fields: {
    avatar: null,
    company: () => faker.company.name(),
    email: () => faker.internet.email(),
    name: () => faker.person.fullName(),
    socialLinks: () => [
      {
        _key: faker.string.uuid(),
        icon: "SiGithub",
        platform: "GitHub",
        url: faker.internet.url(),
        username: faker.internet.username()
      },
      {
        _key: faker.string.uuid(),
        icon: "TbBrandLinkedin",
        platform: "LinkedIn",
        url: faker.internet.url(),
        username: faker.internet.username()
      },
      {
        _key: faker.string.uuid(),
        icon: "SiX",
        platform: "X",
        url: faker.internet.url(),
        username: faker.internet.username()
      }
    ],
    title: () => faker.person.jobTitle()
  },
  traits: {
    withAvatar: {
      overrides: {
        avatar: () => ({
          _type: "image",
          alt: faker.lorem.words(3),
          asset: buildExpandedAssetForQuery(400, 400),
          crop: null,
          hotspot: null
        })
      }
    }
  }
});

/**
 * Builder for PortfolioPage hero section test data.
 *
 * @example
 * const hero = portfolioPageHeroBuilder.one();
 */
export const portfolioPageHeroBuilder = build<NonNullable<PortfolioPageQueryResult>["hero"]>({
  fields: {
    alternativeTitles: () => [faker.person.jobTitle(), faker.person.jobTitle(), faker.person.jobTitle()],
    isAvailable: true,
    tagline: () => faker.lorem.sentence()
  },
  traits: {
    unavailable: {
      overrides: { isAvailable: false }
    }
  }
});

/**
 * Builder for Technology test data.
 *
 * @example
 * const technology = technologyBuilder.one();
 */
export const technologyBuilder = build<PortfolioTechnology>({
  fields: {
    _id: () => faker.string.uuid(),
    description: () => faker.lorem.sentence(),
    icon: oneOf(
      "SiReact",
      "SiNextdotjs",
      "SiTypescript",
      "SiNodedotjs",
      "SiTailwindcss",
      "SiExpo",
      "SiPython",
      "SiVitest",
      "SiStorybook",
      "SiZod",
      "SiRadixui",
      "SiSanity",
      "TbTestPipe",
      "VscDebugConsole"
    ),
    name: oneOf(
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Tailwind CSS",
      "Expo",
      "Python",
      "Vitest",
      "Storybook",
      "Playwright",
      "Zod",
      "Radix UI",
      "Sanity",
      "Pino"
    )
  }
});

/**
 * Builder for TechnologyGroup test data.
 *
 * @example
 * const technologyGroup = technologyGroupBuilder.one();
 */
export const technologyGroupBuilder = build<PortfolioTechnologyGroup>({
  fields: {
    _id: () => faker.string.uuid(),
    description: () => faker.lorem.sentence(),
    featured: bool(),
    icon: oneOf(
      "SiReact",
      "SiNextdotjs",
      "SiTypescript",
      "SiNodedotjs",
      "SiTailwindcss",
      "SiExpo",
      "SiPython",
      "SiStorybook",
      "SiSanity",
      "TbTestPipe",
      "VscDebugConsole"
    ),
    label: oneOf("Frontend", "Backend", "Mobile", "DevOps & Tools", "Other"),
    technologies: () => technologyBuilder.many(int(3, 8))
  }
});

/**
 * Builder for PortfolioPage skills section test data.
 *
 * @example
 * const skills = portfolioPageSkillsBuilder.one();
 */
export const portfolioPageSkillsBuilder = build<NonNullable<PortfolioPageQueryResult>["skills"]>({
  fields: {
    decorativeBottomText: () => faker.lorem.words(2),
    heading: {
      description: () => faker.lorem.sentence(),
      title: () => faker.lorem.words(3)
    },
    technologyGroups: () => technologyGroupBuilder.many(4)
  }
});

/**
 * Builder for Project test data.
 *
 * @example
 * const project = projectBuilder.one();
 */
export const projectBuilder = build<PortfolioProject>({
  fields: {
    _id: () => faker.string.uuid(),
    description: () => faker.lorem.sentence(),
    featured: false,
    links: () => ({
      github: faker.helpers.arrayElement([faker.internet.url(), null]),
      live: faker.helpers.arrayElement([faker.internet.url(), null]),
      npm: faker.helpers.arrayElement([faker.internet.url(), null])
    }),
    longDescription: () => faker.lorem.paragraphs(2),
    technologies: () => technologyBuilder.many(int(2, 6)),
    thumbnail: () => ({
      _type: "image",
      alt: faker.lorem.sentence(),
      asset: buildExpandedAssetForQuery(800, 450),
      crop: null,
      hotspot: null
    }),
    title: () => faker.company.catchPhrase()
  },
  traits: {
    featured: {
      overrides: { featured: true }
    }
  }
});

/**
 * Builder for ProjectGroup test data (query result shape with expanded projects).
 *
 * @example
 * const projectGroup = projectGroupBuilder.one();
 *
 * @example
 * const customGroup = projectGroupBuilder.one({
 *   overrides: { label: "Featured Work" }
 * });
 */
export const projectGroupBuilder = build<PortfolioProjectGroup>({
  fields: {
    _id: () => faker.string.uuid(),
    description: () => faker.lorem.sentence(),
    label: oneOf("Featured Projects", "Web Applications", "Mobile Apps", "Open Source"),
    projects: () => projectBuilder.many(int(3, 6))
  }
});

/**
 * Builder for PortfolioPage projects section test data.
 *
 * @example
 * const projects = portfolioPageProjectsBuilder.one();
 */
export const portfolioPageProjectsBuilder = build<NonNullable<PortfolioPageQueryResult>["projects"]>({
  fields: {
    heading: {
      description: () => faker.lorem.sentence(),
      title: () => faker.lorem.words(3)
    },
    projectGroups: () => projectGroupBuilder.many(int(2, 4))
  }
});

/**
 * Builder for Experience item test data.
 *
 * @example
 * const experience = experienceBuilder.one();
 */
export const experienceBuilder = build<PortfolioExperience>({
  fields: {
    _id: () => faker.string.uuid(),
    achievements: () => Array.from({ length: int(2, 4) }, () => faker.lorem.sentence()),
    company: () => faker.company.name(),
    companyLogo: () => ({
      asset: buildExpandedAssetForQuery(40, 40)
    }),
    companyUrl: () => faker.internet.url(),
    endDate: () => {
      return bool() ? faker.date.recent().toISOString() : null;
    },
    location: () => `${faker.location.city()}, ${faker.location.country()}`,
    responsibilities: () => Array.from({ length: int(3, 6) }, () => faker.lorem.sentence()),
    role: () => faker.person.jobTitle(),
    startDate: () => faker.date.past({ years: 5 }).toISOString(),
    summary: () => faker.lorem.paragraph(),
    technologies: () => technologyBuilder.many(int(3, 8)),
    type: oneOf("full-time", "part-time", "contract", "freelance")
  },
  traits: {
    current: {
      overrides: { endDate: null }
    },
    withoutLogo: {
      overrides: { companyLogo: null }
    }
  }
});

/**
 * Builder for PortfolioPage experience section test data.
 *
 * @example
 * const experience = portfolioPageExperienceBuilder.one();
 */
export const portfolioPageExperienceBuilder = build<NonNullable<PortfolioPageQueryResult>["experience"]>({
  fields: {
    experiences: () => experienceBuilder.many(int(2, 4)),
    heading: {
      description: () => faker.lorem.sentence(),
      title: () => faker.lorem.words(3)
    }
  }
});

/**
 * Builder for Education item test data.
 *
 * @example
 * const education = educationBuilder.one();
 */
export const educationBuilder = build<PortfolioEducation>({
  fields: {
    _id: () => faker.string.uuid(),
    achievements: () => Array.from({ length: int(2, 4) }, () => faker.lorem.sentence()),
    coursework: () => Array.from({ length: int(4, 8) }, () => faker.lorem.words(3)),
    degree: oneOf("Bachelor's Degree", "Master's Degree", "Ph.D."),
    endDate: () => faker.date.past({ years: 2 }).toISOString(),
    fieldOfStudy: () =>
      faker.helpers.arrayElement(["Computer Science", "Software Engineering", "Information Technology"]),
    grade: () => faker.helpers.arrayElement(["4.0", "3.8", "3.5", null]),
    institution: () => faker.company.name() + " University",
    institutionUrl: () => faker.internet.url(),
    location: () => `${faker.location.city()}, ${faker.location.country()}`,
    startDate: () => faker.date.past({ years: 10 }).toISOString(),
    thesis: () => ({
      description: faker.lorem.paragraph(),
      project: {
        _id: faker.string.uuid(),
        description: faker.lorem.sentence(),
        links: {
          github: faker.helpers.arrayElement([faker.internet.url(), undefined]),
          live: faker.helpers.arrayElement([faker.internet.url(), undefined]),
          npm: undefined
        },
        technologies: Array.from({ length: faker.number.int({ max: 5, min: 2 }) }, () => technologyBuilder.one()),
        title: faker.lorem.words(3)
      },
      technologies: technologyBuilder.many(int(3, 6)),
      title: faker.lorem.words(5),
      url: faker.internet.url()
    })
  }
});

/**
 * Builder for PortfolioPage education section test data.
 *
 * @example
 * const education = portfolioPageEducationBuilder.one();
 */
export const portfolioPageEducationBuilder = build<NonNullable<PortfolioPageQueryResult>["education"]>({
  fields: {
    education: () => educationBuilder.many(int(1, 3)),
    heading: {
      description: () => faker.lorem.sentence(),
      title: () => faker.lorem.words(2)
    }
  }
});

/**
 * Builder for PortfolioPage contact section test data.
 *
 * @example
 * const contact = portfolioPageContactBuilder.one();
 */
export const portfolioPageContactBuilder = build<NonNullable<PortfolioPageQueryResult>["contact"]>({
  fields: {
    form: {
      description: "Fill out the form and I'll get back to you as soon as possible.",
      enabled: true,
      submitButtonText: "Send Message",
      successMessage: "Thank you for your message!",
      successView: {
        buttonText: "Send another message",
        description: "Thank you for your message! I'll get back to you soon.",
        title: "Thank you for your message!"
      },
      title: "Send a Message"
    },
    heading: {
      description: () => faker.lorem.sentence(),
      title: () => faker.lorem.words(3)
    },
    quickChat: {
      description: () => faker.lorem.sentence(),
      title: () => faker.lorem.words(4)
    }
  }
});

/**
 * Builder for PortfolioPage SEO section test data.
 *
 * @example
 * const seo = portfolioPageSeoBuilder.one();
 *
 * @example
 * const withTwitter = portfolioPageSeoBuilder.one({ traits: ["withTwitter"] });
 */
export const portfolioPageSeoBuilder = build<NonNullable<PortfolioPageQueryResult>["seo"]>({
  fields: {
    addressCountry: () => faker.location.countryCode("alpha-2"),
    addressLocality: () => faker.location.city(),
    alternateNames: () => Array.from({ length: int(0, 2) }, () => faker.person.fullName()),
    alternateUrls: () =>
      Array.from({ length: int(0, 2) }, () => ({
        _key: faker.string.uuid(),
        hreflang: faker.helpers.arrayElement(["en-US", "pl-PL", "de-DE"]),
        url: faker.internet.url()
      })),
    canonicalUrl: undefined,
    keywords: () => Array.from({ length: int(3, 8) }, () => faker.lorem.word()),
    knowsAbout: () => Array.from({ length: int(3, 6) }, () => faker.lorem.words(2)),
    metaDescription: () => faker.lorem.sentence(),
    metaTitle: () => faker.lorem.words(5),
    noarchive: false,
    nofollow: false,
    noindex: false,
    ogDescription: () => faker.lorem.sentence(),
    ogImage: () => ({
      _type: "image",
      alt: faker.lorem.words(5),
      asset: buildImageAssetReference()
    }),
    ogTitle: () => faker.lorem.words(4),
    organizationLogo: () => ({
      _type: "image",
      alt: faker.lorem.words(5),
      asset: buildImageAssetReference()
    }),
    organizationName: () => faker.company.name(),
    sameAsUrls: () => Array.from({ length: int(1, 3) }, () => faker.internet.url()),
    twitterCardType: () => "summary_large_image",
    twitterCreator: () => "@creator",
    twitterImage: () => ({
      _type: "image",
      alt: faker.lorem.words(5),
      asset: buildImageAssetReference()
    }),
    twitterSite: () => "@username"
  },
  traits: {
    noOrg: {
      overrides: {
        alternateNames: [],
        organizationLogo: undefined,
        organizationName: undefined,
        sameAsUrls: []
      }
    },
    noSocial: {
      overrides: {
        sameAsUrls: [],
        twitterCreator: undefined,
        twitterImage: undefined,
        twitterSite: undefined
      }
    },
    withTwitter: {
      overrides: {
        twitterCreator: () => "@creator",
        twitterImage: () => ({
          _type: "image",
          alt: faker.lorem.words(5),
          asset: buildImageAssetReference()
        }),
        twitterSite: () => "@username"
      }
    }
  }
});

/**
 * Builder for PortfolioPage footer section test data.
 *
 * @example
 * const footer = portfolioPageFooterBuilder.one();
 */
export const portfolioPageFooterBuilder = build<NonNullable<PortfolioPageQueryResult>["footer"]>({
  fields: {
    copyrightText: () => `${faker.company.name()}. All rights reserved.`
  }
});

/**
 * Builder for complete PortfolioPageQueryResult test data.
 *
 * @example
 * const portfolioPage = portfolioPageBuilder.one();
 */
export const portfolioPageBuilder = build<NonNullable<PortfolioPageQueryResult>>({
  fields: {
    _createdAt: () => faker.date.past().toISOString(),
    _id: () => faker.string.uuid(),
    _rev: () => `rev-${faker.string.uuid()}`,
    _type: "portfolioPage" as const,
    _updatedAt: () => faker.date.recent().toISOString(),
    about: () => portfolioPageAboutBuilder.one(),
    contact: () => portfolioPageContactBuilder.one(),
    education: () => portfolioPageEducationBuilder.one(),
    experience: () => portfolioPageExperienceBuilder.one(),
    footer: () => portfolioPageFooterBuilder.one(),
    hero: () => portfolioPageHeroBuilder.one(),
    personalInfo: () => portfolioPagePersonalInfoBuilder.one(),
    projects: () => portfolioPageProjectsBuilder.one(),
    skills: () => portfolioPageSkillsBuilder.one()
  }
});
