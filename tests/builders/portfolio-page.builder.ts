import { faker } from "@faker-js/faker";
import { build, perBuild, sequence } from "@jackfranklin/test-data-bot";
import { type PortfolioPageQueryResult } from "~/lib/sanity/types";

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
    heading: {
      title: perBuild(() => faker.lorem.words(3)),
      description: perBuild(() => faker.lorem.sentence())
    },
    bio: perBuild(() => faker.lorem.paragraphs(2, "\n\n")),
    location: perBuild(() => faker.location.city()),
    stats: perBuild(() => [
      {
        _key: faker.string.uuid(),
        label: "Years Experience",
        value: faker.number.int({ min: 1, max: 20 }),
        suffix: "+"
      },
      {
        _key: faker.string.uuid(),
        label: "Projects Completed",
        value: faker.number.int({ min: 10, max: 100 }),
        suffix: "+"
      },
      {
        _key: faker.string.uuid(),
        label: "Technologies",
        value: faker.number.int({ min: 10, max: 50 }),
        suffix: "+"
      },
      {
        _key: faker.string.uuid(),
        label: "Clients Served",
        value: faker.number.int({ min: 5, max: 50 }),
        suffix: "+"
      }
    ])
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
    name: perBuild(() => faker.person.fullName()),
    title: perBuild(() => faker.person.jobTitle()),
    company: perBuild(() => faker.company.name()),
    alternativeTitles: perBuild(() => [faker.person.jobTitle(), faker.person.jobTitle(), faker.person.jobTitle()]),
    tagline: perBuild(() => faker.lorem.sentence()),
    avatar: null,
    isAvailable: true
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
export const technologyBuilder = build<{
  _id: string;
  name: string | null;
  icon: string | null;
  description: string | null;
}>({
  fields: {
    _id: perBuild(() => faker.string.uuid()),
    name: perBuild(() => faker.helpers.arrayElement(["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS"])),
    icon: perBuild(() => faker.helpers.arrayElement(["react", "nextjs", "typescript", "nodejs", "tailwindcss"])),
    description: perBuild(() => faker.lorem.sentence())
  }
});

/**
 * Builder for TechnologyGroup test data.
 *
 * @example
 * const technologyGroup = technologyGroupBuilder.one();
 */
export const technologyGroupBuilder = build<{
  _id: string;
  label: string | null;
  slug: {
    _type: "slug";
    current?: string;
    source?: string;
  } | null;
  category: "backend" | "devops" | "frontend" | "mobile" | "tools" | null;
  technologies: Array<{
    _id: string;
    name: string | null;
    icon: string | null;
    description: string | null;
  }> | null;
}>({
  fields: {
    _id: perBuild(() => faker.string.uuid()),
    label: perBuild(() => faker.helpers.arrayElement(["Frontend", "Backend", "Mobile", "DevOps & Tools", "Other"])),
    slug: perBuild(() => ({
      _type: "slug" as const,
      current: faker.helpers.slugify(faker.word.words(2)).toLowerCase()
    })),
    category: perBuild(() => faker.helpers.arrayElement(["frontend", "backend", "mobile", "devops", "tools"] as const)),
    technologies: perBuild(() =>
      Array.from({ length: faker.number.int({ min: 3, max: 8 }) }, () => technologyBuilder.one())
    )
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
    heading: {
      title: perBuild(() => faker.lorem.words(3)),
      description: perBuild(() => faker.lorem.sentence())
    },
    technologyGroups: perBuild(() => Array.from({ length: 4 }, () => technologyGroupBuilder.one()))
  }
});

/**
 * Builder for Project test data.
 *
 * @example
 * const project = projectBuilder.one();
 */
export const projectBuilder = build<{
  _id: string;
  title: string | null;
  description: string | null;
  longDescription: string | null;
  thumbnail: {
    asset: {
      _id: string;
      url: string | null;
      metadata: {
        dimensions: {
          _type: "sanity.imageDimensions";
          height?: number;
          width?: number;
          aspectRatio?: number;
        } | null;
        lqip: string | null;
      } | null;
    } | null;
  } | null;
  technologies: Array<{
    _id: string;
    name: string | null;
    icon: string | null;
    description: string | null;
  }> | null;
  category: "ai" | "mobile" | "oss" | "web" | null;
  links: {
    live: string | null;
    github: string | null;
  } | null;
  featured: boolean | null;
}>({
  fields: {
    _id: perBuild(() => faker.string.uuid()),
    title: perBuild(() => faker.company.catchPhrase()),
    description: perBuild(() => faker.lorem.sentence()),
    longDescription: perBuild(() => faker.lorem.paragraphs(2)),
    thumbnail: perBuild(() => ({
      asset: {
        _id: faker.string.uuid(),
        url: faker.image.urlLoremFlickr({ category: "technology" }),
        metadata: {
          dimensions: {
            _type: "sanity.imageDimensions" as const,
            height: 450,
            width: 800,
            aspectRatio: 16 / 9
          },
          lqip: "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAMEBf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AMOA="
        }
      }
    })),
    technologies: perBuild(() =>
      Array.from({ length: faker.number.int({ min: 2, max: 6 }) }, () => technologyBuilder.one())
    ),
    category: perBuild(() => faker.helpers.arrayElement(["web", "mobile", "oss", "ai"] as const)),
    links: perBuild(() => ({
      live: faker.datatype.boolean() ? faker.internet.url() : null,
      github: faker.datatype.boolean() ? faker.internet.url() : null
    })),
    featured: false
  },
  traits: {
    featured: {
      overrides: { featured: true }
    }
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
      title: perBuild(() => faker.lorem.words(3)),
      description: perBuild(() => faker.lorem.sentence())
    },
    featuredProjects: perBuild(() =>
      Array.from({ length: faker.number.int({ min: 3, max: 6 }) }, () => projectBuilder.one({ traits: ["featured"] }))
    ),
    allProjects: perBuild(() =>
      Array.from({ length: faker.number.int({ min: 6, max: 12 }) }, () => projectBuilder.one())
    )
  }
});

/**
 * Builder for Experience item test data.
 *
 * @example
 * const experience = experienceBuilder.one();
 */
export const experienceBuilder = build<{
  _id: string;
  role: string | null;
  company: string | null;
  companyLogo: {
    asset: {
      _id: string;
      url: string | null;
      metadata: {
        dimensions: {
          _type: "sanity.imageDimensions";
          height?: number;
          width?: number;
          aspectRatio?: number;
        } | null;
        lqip: string | null;
      } | null;
    } | null;
  } | null;
  companyUrl: string | null;
  location: string | null;
  type: "contract" | "freelance" | "full-time" | "part-time" | null;
  startDate: string | null;
  endDate: string | null;
  summary: string | null;
  responsibilities: Array<string> | null;
  achievements: Array<string> | null;
  technologies: Array<{
    _id: string;
    name: string | null;
    icon: string | null;
    description: string | null;
  }> | null;
}>({
  fields: {
    _id: perBuild(() => faker.string.uuid()),
    role: perBuild(() => faker.person.jobTitle()),
    company: perBuild(() => faker.company.name()),
    companyLogo: perBuild(() => {
      const imageId = faker.string.alphanumeric(28);
      return {
        asset: {
          _id: `image-${imageId}-40x40-png`,
          url: `https://cdn.sanity.io/images/project/dataset/${imageId}-40x40.png`,
          metadata: {
            dimensions: {
              _type: "sanity.imageDimensions" as const,
              height: 40,
              width: 40,
              aspectRatio: 1
            },
            lqip: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
          }
        }
      };
    }),
    companyUrl: perBuild(() => faker.internet.url()),
    location: perBuild(() => `${faker.location.city()}, ${faker.location.country()}`),
    type: perBuild(() => faker.helpers.arrayElement(["full-time", "part-time", "contract", "freelance"] as const)),
    startDate: perBuild(() => faker.date.past({ years: 5 }).toISOString().split("T")[0] ?? null),
    endDate: perBuild(() => {
      const hasEndDate = faker.datatype.boolean();
      return hasEndDate ? (faker.date.recent().toISOString().split("T")[0] ?? null) : null;
    }),
    summary: perBuild(() => faker.lorem.paragraph()),
    responsibilities: perBuild(() =>
      Array.from({ length: faker.number.int({ min: 3, max: 6 }) }, () => faker.lorem.sentence())
    ),
    achievements: perBuild(() =>
      Array.from({ length: faker.number.int({ min: 2, max: 4 }) }, () => faker.lorem.sentence())
    ),
    technologies: perBuild(() =>
      Array.from({ length: faker.number.int({ min: 3, max: 8 }) }, () => technologyBuilder.one())
    )
  },
  traits: {
    withoutLogo: {
      overrides: { companyLogo: null }
    },
    current: {
      overrides: { endDate: null }
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
    heading: {
      title: perBuild(() => faker.lorem.words(3)),
      description: perBuild(() => faker.lorem.sentence())
    },
    experiences: perBuild(() =>
      Array.from({ length: faker.number.int({ min: 2, max: 4 }) }, () => experienceBuilder.one())
    )
  }
});

/**
 * Builder for Education item test data.
 *
 * @example
 * const education = educationBuilder.one();
 */
export const educationBuilder = build<{
  _id: string;
  institution: string | null;
  institutionUrl: string | null;
  location: string | null;
  degree: "bachelor" | "master" | "phd" | null;
  fieldOfStudy: string | null;
  startDate: string | null;
  endDate: string | null;
  grade: string | null;
  thesis: {
    title: string | null;
    description: string | null;
    technologies: Array<{
      _id: string;
      name: string | null;
      icon: string | null;
      description: string | null;
    }> | null;
    project: {
      _id: string;
      title: string | null;
      description: string | null;
    } | null;
    url: string | null;
  } | null;
  achievements: Array<string> | null;
  coursework: Array<string> | null;
}>({
  fields: {
    _id: perBuild(() => faker.string.uuid()),
    institution: perBuild(() => faker.company.name() + " University"),
    institutionUrl: perBuild(() => faker.internet.url()),
    location: perBuild(() => `${faker.location.city()}, ${faker.location.country()}`),
    degree: perBuild(() => faker.helpers.arrayElement(["bachelor", "master", "phd"] as const)),
    fieldOfStudy: perBuild(() =>
      faker.helpers.arrayElement(["Computer Science", "Software Engineering", "Information Technology"])
    ),
    startDate: perBuild(() => faker.date.past({ years: 10 }).toISOString().split("T")[0] ?? null),
    endDate: perBuild(() => faker.date.past({ years: 2 }).toISOString().split("T")[0] ?? null),
    grade: perBuild(() => faker.helpers.arrayElement(["4.0", "3.8", "3.5", null])),
    thesis: perBuild(() => ({
      title: faker.lorem.words(5),
      description: faker.lorem.paragraph(),
      technologies: Array.from({ length: faker.number.int({ min: 3, max: 6 }) }, () => technologyBuilder.one()),
      project: {
        _id: faker.string.uuid(),
        title: faker.lorem.words(3),
        description: faker.lorem.sentence()
      },
      url: faker.internet.url()
    })),
    achievements: perBuild(() =>
      Array.from({ length: faker.number.int({ min: 2, max: 4 }) }, () => faker.lorem.sentence())
    ),
    coursework: perBuild(() => Array.from({ length: faker.number.int({ min: 4, max: 8 }) }, () => faker.lorem.words(3)))
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
    heading: {
      title: perBuild(() => faker.lorem.words(2)),
      description: perBuild(() => faker.lorem.sentence())
    },
    education: perBuild(() =>
      Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => educationBuilder.one())
    )
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
    heading: {
      title: perBuild(() => faker.lorem.words(3)),
      description: perBuild(() => faker.lorem.sentence())
    },
    email: perBuild(() => faker.internet.email()),
    socialLinks: perBuild(() => [
      {
        _key: faker.string.uuid(),
        platform: "GitHub",
        url: faker.internet.url(),
        icon: "github",
        username: faker.internet.username()
      },
      {
        _key: faker.string.uuid(),
        platform: "LinkedIn",
        url: faker.internet.url(),
        icon: "linkedin",
        username: faker.internet.username()
      },
      {
        _key: faker.string.uuid(),
        platform: "Twitter",
        url: faker.internet.url(),
        icon: "twitter",
        username: faker.internet.username()
      }
    ]),
    formSettings: {
      enabled: true,
      title: "Send a Message",
      description: "Fill out the form and I'll get back to you as soon as possible.",
      submitButtonText: "Send Message"
    },
    successView: {
      title: "Thank you for your message!",
      description: "Thank you for your message! I'll get back to you soon.",
      buttonText: "Send another message"
    },
    quickChatTitle: perBuild(() => faker.lorem.words(4)),
    quickChatDescription: perBuild(() => faker.lorem.sentence())
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
    copyrightText: perBuild(() => `${faker.company.name()}. All rights reserved.`),
    socialLinks: perBuild(() => [
      {
        _key: faker.string.uuid(),
        platform: "GitHub",
        url: faker.internet.url(),
        icon: "github"
      },
      {
        _key: faker.string.uuid(),
        platform: "LinkedIn",
        url: faker.internet.url(),
        icon: "linkedin"
      },
      {
        _key: faker.string.uuid(),
        platform: "Twitter",
        url: faker.internet.url(),
        icon: "twitter"
      }
    ])
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
    _id: perBuild(() => faker.string.uuid()),
    _type: "portfolioPage" as const,
    _updatedAt: perBuild(() => faker.date.recent().toISOString()),
    hero: perBuild(() => portfolioPageHeroBuilder.one()),
    about: perBuild(() => portfolioPageAboutBuilder.one()),
    skills: perBuild(() => portfolioPageSkillsBuilder.one()),
    projects: perBuild(() => portfolioPageProjectsBuilder.one()),
    experience: perBuild(() => portfolioPageExperienceBuilder.one()),
    education: perBuild(() => portfolioPageEducationBuilder.one()),
    contact: perBuild(() => portfolioPageContactBuilder.one()),
    footer: perBuild(() => portfolioPageFooterBuilder.one()),
    seo: null
  }
});
