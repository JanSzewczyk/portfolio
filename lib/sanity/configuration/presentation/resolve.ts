import { defineLocations, type PresentationPluginOptions } from "sanity/presentation";

export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    // Education - referenced in education section
    education: defineLocations({
      resolve: (doc) => ({
        locations: [
          {
            href: "/#education",
            title: doc?.institution || "Education"
          }
        ]
      }),
      select: {
        degree: "degree",
        institution: "institution"
      }
    }),

    // Experience - referenced in experience section
    experience: defineLocations({
      resolve: (doc) => ({
        locations: [
          {
            href: "/#experience",
            title: doc?.role ? `${doc.role} @ ${doc.company}` : "Experience"
          }
        ]
      }),
      select: {
        company: "company",
        role: "role"
      }
    }),
    // Portfolio Page (singleton) - maps to the main page
    portfolioPage: defineLocations({
      resolve: (doc) => ({
        locations: [
          {
            href: "/",
            title: doc?.heroName || "Portfolio"
          }
        ]
      }),
      select: {
        heroName: "hero.name",
        heroTitle: "hero.title"
      }
    }),

    // Project - referenced in projects section
    project: defineLocations({
      resolve: (doc) => ({
        locations: [
          {
            href: "/#projects",
            title: doc?.title || "Project"
          }
        ]
      }),
      select: {
        title: "title"
      }
    }),

    // Technology - referenced in skills section
    technology: defineLocations({
      resolve: (doc) => ({
        locations: [
          {
            href: "/#skills",
            title: doc?.name || "Technology"
          }
        ]
      }),
      select: {
        name: "name"
      }
    }),

    // Technology Group - referenced in skills section
    technologyGroup: defineLocations({
      resolve: (doc) => ({
        locations: [
          {
            href: "/#skills",
            title: doc?.label || "Technology Group"
          }
        ]
      }),
      select: {
        label: "label"
      }
    })
  }
};
