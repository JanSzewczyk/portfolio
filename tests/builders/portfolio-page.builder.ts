import { faker } from "@faker-js/faker";
import { build, perBuild } from "@jackfranklin/test-data-bot";
import { type PortfolioPageQueryResult } from "~/lib/sanity/types";

// Extracted types from query result for type-safe builders
type PortfolioPage = NonNullable<PortfolioPageQueryResult>;
type PortfolioTechnologyGroup = NonNullable<NonNullable<PortfolioPage["skills"]>["technologyGroups"]>[number];
type PortfolioProjectGroup = NonNullable<NonNullable<PortfolioPage["projects"]>["projectGroups"]>[number];
type PortfolioProject = NonNullable<NonNullable<PortfolioProjectGroup["projects"]>>[number];
type PortfolioExperience = NonNullable<NonNullable<PortfolioPage["experience"]>["experiences"]>[number];
type PortfolioEducation = NonNullable<NonNullable<PortfolioPage["education"]>["education"]>[number];
type PortfolioTechnology = NonNullable<PortfolioTechnologyGroup["technologies"]>[number];

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
    location: null,
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
    name: perBuild(() => faker.person.fullName()),
    title: perBuild(() => faker.person.jobTitle()),
    company: perBuild(() => faker.company.name()),
    email: perBuild(() => faker.internet.email()),
    avatar: null,
    socialLinks: perBuild(() => [
      {
        _key: faker.string.uuid(),
        platform: "GitHub",
        url: faker.internet.url(),
        icon: "SiGithub",
        username: faker.internet.username()
      },
      {
        _key: faker.string.uuid(),
        platform: "LinkedIn",
        url: faker.internet.url(),
        icon: "SiLinkedin",
        username: faker.internet.username()
      },
      {
        _key: faker.string.uuid(),
        platform: "X",
        url: faker.internet.url(),
        icon: "SiX",
        username: faker.internet.username()
      }
    ])
  },
  traits: {
    withAvatar: {
      overrides: {
        avatar: perBuild(() => {
          const imageId = faker.string.alphanumeric(28);
          return {
            _type: "image" as const,
            asset: {
              _id: `image-${imageId}-400x400-jpg`,
              _type: "sanity.imageAsset" as const,
              _createdAt: faker.date.past().toISOString(),
              _updatedAt: faker.date.recent().toISOString(),
              _rev: `rev-${faker.string.uuid()}`,
              url: `https://cdn.sanity.io/images/project/dataset/${imageId}-400x400.jpg`,
              metadata: {
                _type: "sanity.imageMetadata" as const,
                dimensions: {
                  _type: "sanity.imageDimensions" as const,
                  height: 400,
                  width: 400,
                  aspectRatio: 1
                },
                lqip: "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAMEBf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AMOA=",
                hasAlpha: false,
                isOpaque: true
              }
            }
          };
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
    alternativeTitles: perBuild(() => [faker.person.jobTitle(), faker.person.jobTitle(), faker.person.jobTitle()]),
    tagline: perBuild(() => faker.lorem.sentence()),
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
export const technologyBuilder = build<PortfolioTechnology>({
  fields: {
    _id: perBuild(() => faker.string.uuid()),
    name: perBuild(() =>
      faker.helpers.arrayElement([
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
      ])
    ),
    icon: perBuild(() =>
      faker.helpers.arrayElement([
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
      ])
    ),
    description: perBuild(() => faker.lorem.sentence())
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
    _id: perBuild(() => faker.string.uuid()),
    label: perBuild(() => faker.helpers.arrayElement(["Frontend", "Backend", "Mobile", "DevOps & Tools", "Other"])),
    featured: perBuild(() => faker.datatype.boolean()),
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
    technologyGroups: perBuild(() => Array.from({ length: 4 }, () => technologyGroupBuilder.one())),
    decorativeBottomText: perBuild(() => faker.lorem.words(2))
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
    _id: perBuild(() => faker.string.uuid()),
    title: perBuild(() => faker.company.catchPhrase()),
    description: perBuild(() => faker.lorem.sentence()),
    longDescription: perBuild(() => faker.lorem.paragraphs(2)),
    thumbnail: perBuild(() => {
      const imageId = faker.string.alphanumeric(28);
      return {
        _type: "image" as const,
        asset: {
          _id: `image-${imageId}-800x450-jpg`,
          _type: "sanity.imageAsset" as const,
          _createdAt: faker.date.past().toISOString(),
          _updatedAt: faker.date.recent().toISOString(),
          _rev: `rev-${faker.string.uuid()}`,
          url: `https://cdn.sanity.io/images/project/dataset/${imageId}-800x450.jpg`,
          metadata: {
            _type: "sanity.imageMetadata" as const,
            dimensions: {
              _type: "sanity.imageDimensions" as const,
              height: 450,
              width: 800,
              aspectRatio: 16 / 9
            },
            lqip: "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAMEBf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AMOA="
          }
        }
      };
    }),
    technologies: perBuild(() =>
      Array.from({ length: faker.number.int({ min: 2, max: 6 }) }, () => technologyBuilder.one())
    ),
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
    _id: perBuild(() => faker.string.uuid()),
    label: perBuild(() =>
      faker.helpers.arrayElement(["Featured Projects", "Web Applications", "Mobile Apps", "Open Source"])
    ),
    description: perBuild(() => faker.lorem.sentence()),
    projects: perBuild(() => Array.from({ length: faker.number.int({ min: 3, max: 6 }) }, () => projectBuilder.one()))
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
    projectGroups: perBuild(() =>
      Array.from({ length: faker.number.int({ min: 2, max: 4 }) }, () => projectGroupBuilder.one())
    )
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
export const educationBuilder = build<PortfolioEducation>({
  fields: {
    _id: perBuild(() => faker.string.uuid()),
    institution: perBuild(() => faker.company.name() + " University"),
    institutionUrl: perBuild(() => faker.internet.url()),
    location: perBuild(() => `${faker.location.city()}, ${faker.location.country()}`),
    degree: perBuild(() => faker.helpers.arrayElement(["Bachelor's Degree", "Master's Degree", "Ph.D."] as const)),
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
    form: {
      enabled: true,
      title: "Send a Message",
      description: "Fill out the form and I'll get back to you as soon as possible.",
      successMessage: "Thank you for your message!",
      submitButtonText: "Send Message",
      successView: {
        title: "Thank you for your message!",
        description: "Thank you for your message! I'll get back to you soon.",
        buttonText: "Send another message"
      }
    },
    quickChat: {
      title: perBuild(() => faker.lorem.words(4)),
      description: perBuild(() => faker.lorem.sentence())
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
    copyrightText: perBuild(() => `${faker.company.name()}. All rights reserved.`)
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
    _createdAt: perBuild(() => faker.date.past().toISOString()),
    _updatedAt: perBuild(() => faker.date.recent().toISOString()),
    _rev: perBuild(() => `rev-${faker.string.uuid()}`),
    personalInfo: perBuild(() => portfolioPagePersonalInfoBuilder.one()),
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
