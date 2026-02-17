import { build } from "mimicry-js";

import { faker } from "@faker-js/faker";
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
      title: () => faker.lorem.words(3),
      description: () => faker.lorem.sentence()
    },
    bio: () => faker.lorem.paragraphs(2, "\n\n"),
    location: null,
    stats: () => [
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
    name: () => faker.person.fullName(),
    title: () => faker.person.jobTitle(),
    company: () => faker.company.name(),
    email: () => faker.internet.email(),
    avatar: null,
    socialLinks: () => [
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
    ]
  },
  traits: {
    withAvatar: {
      overrides: {
        avatar: () => {
          const imageId = faker.string.alphanumeric(28);
          return {
            _type: "image" as const,
            asset: {
              _id: `image-${imageId}-400x400-jpg`,
              url: `https://cdn.sanity.io/images/project/dataset/${imageId}-400x400.jpg`,
              metadata: {
                dimensions: {
                  _type: "sanity.imageDimensions" as const,
                  height: 400,
                  width: 400,
                  aspectRatio: 1
                },
                lqip: "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAMEBf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AMOA="
              }
            },
            hotspot: null,
            crop: null,
            alt: faker.lorem.words(3)
          };
        }
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
    tagline: () => faker.lorem.sentence(),
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
    _id: () => faker.string.uuid(),
    name: () =>
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
      ]),
    icon: () =>
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
      ]),
    description: () => faker.lorem.sentence()
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
    label: () => faker.helpers.arrayElement(["Frontend", "Backend", "Mobile", "DevOps & Tools", "Other"]),
    featured: () => faker.datatype.boolean(),
    technologies: () => Array.from({ length: faker.number.int({ min: 3, max: 8 }) }, () => technologyBuilder.one())
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
      title: () => faker.lorem.words(3),
      description: () => faker.lorem.sentence()
    },
    technologyGroups: () => technologyGroupBuilder.many(4),
    decorativeBottomText: () => faker.lorem.words(2)
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
    title: () => faker.company.catchPhrase(),
    description: () => faker.lorem.sentence(),
    longDescription: () => faker.lorem.paragraphs(2),
    thumbnail: () => {
      const imageId = faker.string.alphanumeric(28);
      return {
        _type: "image" as const,
        asset: {
          _id: `image-${imageId}-800x450-jpg`,
          url: `https://cdn.sanity.io/images/project/dataset/${imageId}-800x450.jpg`,
          metadata: {
            dimensions: {
              _type: "sanity.imageDimensions" as const,
              height: 450,
              width: 800,
              aspectRatio: 16 / 9
            },
            lqip: "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAMEBf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AMOA="
          }
        },
        hotspot: null,
        crop: null,
        alt: faker.lorem.sentence()
      };
    },
    technologies: () => Array.from({ length: faker.number.int({ min: 2, max: 6 }) }, () => technologyBuilder.one()),
    links: () => ({
      live: faker.helpers.arrayElement([faker.internet.url(), null]),
      github: faker.helpers.arrayElement([faker.internet.url(), null]),
      npm: faker.helpers.arrayElement([faker.internet.url(), null])
    }),
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
    _id: () => faker.string.uuid(),
    label: () => faker.helpers.arrayElement(["Featured Projects", "Web Applications", "Mobile Apps", "Open Source"]),
    description: () => faker.lorem.sentence(),
    projects: () => Array.from({ length: faker.number.int({ min: 3, max: 6 }) }, () => projectBuilder.one())
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
      title: () => faker.lorem.words(3),
      description: () => faker.lorem.sentence()
    },
    projectGroups: () => Array.from({ length: faker.number.int({ min: 2, max: 4 }) }, () => projectGroupBuilder.one())
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
    role: () => faker.person.jobTitle(),
    company: () => faker.company.name(),
    companyLogo: () => {
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
    },
    companyUrl: () => faker.internet.url(),
    location: () => `${faker.location.city()}, ${faker.location.country()}`,
    type: () => faker.helpers.arrayElement(["full-time", "part-time", "contract", "freelance"] as const),
    startDate: () => faker.date.past({ years: 5 }).toISOString(),
    endDate: () => {
      const hasEndDate = faker.datatype.boolean();
      return hasEndDate ? faker.date.recent().toISOString() : null;
    },
    summary: () => faker.lorem.paragraph(),
    responsibilities: () => Array.from({ length: faker.number.int({ min: 3, max: 6 }) }, () => faker.lorem.sentence()),
    achievements: () => Array.from({ length: faker.number.int({ min: 2, max: 4 }) }, () => faker.lorem.sentence()),
    technologies: () => Array.from({ length: faker.number.int({ min: 3, max: 8 }) }, () => technologyBuilder.one())
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
      title: () => faker.lorem.words(3),
      description: () => faker.lorem.sentence()
    },
    experiences: () => Array.from({ length: faker.number.int({ min: 2, max: 4 }) }, () => experienceBuilder.one())
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
    institution: () => faker.company.name() + " University",
    institutionUrl: () => faker.internet.url(),
    location: () => `${faker.location.city()}, ${faker.location.country()}`,
    degree: () => faker.helpers.arrayElement(["Bachelor's Degree", "Master's Degree", "Ph.D."] as const),
    fieldOfStudy: () =>
      faker.helpers.arrayElement(["Computer Science", "Software Engineering", "Information Technology"]),
    startDate: () => faker.date.past({ years: 10 }).toISOString(),
    endDate: () => faker.date.past({ years: 2 }).toISOString(),
    grade: () => faker.helpers.arrayElement(["4.0", "3.8", "3.5", null]),
    thesis: () => ({
      title: faker.lorem.words(5),
      description: faker.lorem.paragraph(),
      technologies: Array.from({ length: faker.number.int({ min: 3, max: 6 }) }, () => technologyBuilder.one()),
      project: {
        _id: faker.string.uuid(),
        title: faker.lorem.words(3),
        description: faker.lorem.sentence()
      },
      url: faker.internet.url()
    }),
    achievements: () => Array.from({ length: faker.number.int({ min: 2, max: 4 }) }, () => faker.lorem.sentence()),
    coursework: () => Array.from({ length: faker.number.int({ min: 4, max: 8 }) }, () => faker.lorem.words(3))
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
      title: () => faker.lorem.words(2),
      description: () => faker.lorem.sentence()
    },
    education: () => Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => educationBuilder.one())
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
      title: () => faker.lorem.words(3),
      description: () => faker.lorem.sentence()
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
      title: () => faker.lorem.words(4),
      description: () => faker.lorem.sentence()
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
    _id: () => faker.string.uuid(),
    _type: "portfolioPage" as const,
    _createdAt: () => faker.date.past().toISOString(),
    _updatedAt: () => faker.date.recent().toISOString(),
    _rev: () => `rev-${faker.string.uuid()}`,
    personalInfo: () => portfolioPagePersonalInfoBuilder.one(),
    hero: () => portfolioPageHeroBuilder.one(),
    about: () => portfolioPageAboutBuilder.one(),
    skills: () => portfolioPageSkillsBuilder.one(),
    projects: () => portfolioPageProjectsBuilder.one(),
    experience: () => portfolioPageExperienceBuilder.one(),
    education: () => portfolioPageEducationBuilder.one(),
    contact: () => portfolioPageContactBuilder.one(),
    footer: () => portfolioPageFooterBuilder.one()
  }
});
