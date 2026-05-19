import {
  defineLocations,
  type PresentationPluginOptions,
} from "sanity/presentation";

export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    // Portfolio Page (singleton) - maps to the main page
    portfolioPage: defineLocations({
      select: {
        heroName: "hero.name",
        heroTitle: "hero.title",
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.heroName || "Portfolio",
            href: "/",
          },
        ],
      }),
    }),

    // Technology - referenced in skills section
    technology: defineLocations({
      select: {
        name: "name",
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.name || "Technology",
            href: "/#skills",
          },
        ],
      }),
    }),

    // Technology Group - referenced in skills section
    technologyGroup: defineLocations({
      select: {
        label: "label",
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.label || "Technology Group",
            href: "/#skills",
          },
        ],
      }),
    }),

    // Project - referenced in projects section
    project: defineLocations({
      select: {
        title: "title",
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Project",
            href: "/#projects",
          },
        ],
      }),
    }),

    // Experience - referenced in experience section
    experience: defineLocations({
      select: {
        role: "role",
        company: "company",
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.role ? `${doc.role} @ ${doc.company}` : "Experience",
            href: "/#experience",
          },
        ],
      }),
    }),

    // Education - referenced in education section
    education: defineLocations({
      select: {
        institution: "institution",
        degree: "degree",
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.institution || "Education",
            href: "/#education",
          },
        ],
      }),
    }),
  },
};
