import { type Experience } from "./types";

export const EXPERIENCES: Experience[] = [
  {
    id: "exp-1",
    role: "Senior Frontend Developer",
    company: "Tech Company",
    companyUrl: "https://techcompany.com",
    location: "Remote",
    type: "full-time",
    startDate: "2022-01-01",
    summary:
      "Leading frontend development for enterprise applications, mentoring junior developers, and driving technical decisions.",
    responsibilities: [
      "Architecting scalable React applications with Next.js and TypeScript",
      "Mentoring a team of 4 junior developers",
      "Implementing CI/CD pipelines with GitHub Actions",
      "Collaborating with design team to create consistent UI/UX",
      "Code reviews and establishing coding standards"
    ],
    achievements: [
      "Reduced bundle size by 40% through code splitting and optimization",
      "Improved Core Web Vitals scores to 95+",
      "Established component library used across 5 products"
    ],
    technologies: ["React", "Next.js", "TypeScript", "GraphQL", "Tailwind CSS"]
  },
  {
    id: "exp-2",
    role: "Full Stack Developer",
    company: "Startup Inc",
    companyUrl: "https://startup.com",
    location: "Warsaw, Poland",
    type: "full-time",
    startDate: "2020-03-01",
    endDate: "2021-12-31",
    summary: "Built and maintained full-stack applications using modern JavaScript technologies.",
    responsibilities: [
      "Developing RESTful APIs with Node.js and Express",
      "Building responsive UIs with React and CSS-in-JS",
      "Managing PostgreSQL databases with Prisma ORM",
      "Implementing authentication and authorization systems",
      "Writing unit and integration tests"
    ],
    achievements: ["Delivered 3 major features ahead of schedule", "Reduced API response times by 60%"],
    technologies: ["React", "Node.js", "PostgreSQL", "Prisma", "Docker"]
  },
  {
    id: "exp-3",
    role: "Frontend Developer",
    company: "Digital Agency",
    companyUrl: "https://agency.com",
    location: "Krakow, Poland",
    type: "full-time",
    startDate: "2018-06-01",
    endDate: "2020-02-28",
    summary: "Developed websites and web applications for various clients across different industries.",
    responsibilities: [
      "Creating responsive websites with HTML, CSS, and JavaScript",
      "Implementing designs from Figma and Sketch",
      "Optimizing websites for performance and SEO",
      "Maintaining and updating existing client websites"
    ],
    technologies: ["JavaScript", "React", "SCSS", "WordPress", "Figma"]
  }
];
