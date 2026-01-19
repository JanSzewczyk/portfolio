import { type Project } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "design-system",
    title: "Design System",
    description:
      "A comprehensive React component library built with TypeScript, Tailwind CSS, and Radix UI primitives. Features 25+ accessible components with full dark mode support.",
    longDescription: `A production-ready design system that provides consistent, accessible,
and customizable UI components. Built on top of Radix UI primitives with Tailwind CSS
for styling, ensuring both accessibility and flexibility.`,
    thumbnail: "/images/projects/design-system.jpg",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Radix UI", "Storybook"],
    category: "oss",
    links: {
      github: "https://github.com/janszewczyk/design-system",
      live: "https://design-system.janszewczyk.com"
    },
    featured: true,
    year: 2024
  },
  {
    id: "portfolio",
    title: "Portfolio Website",
    description:
      "Personal portfolio website built with Next.js 16, featuring smooth animations, dark mode, and a minimalist design.",
    thumbnail: "/images/projects/portfolio.jpg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    category: "web",
    links: {
      github: "https://github.com/janszewczyk/portfolio",
      live: "https://janszewczyk.com"
    },
    featured: true,
    year: 2024
  },
  {
    id: "task-manager",
    title: "Task Manager App",
    description:
      "A full-stack task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    thumbnail: "/images/projects/task-manager.jpg",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "WebSocket"],
    category: "web",
    links: {
      github: "https://github.com/janszewczyk/task-manager",
      live: "https://tasks.janszewczyk.com"
    },
    featured: true,
    year: 2023
  },
  {
    id: "eslint-config",
    title: "ESLint Config",
    description:
      "Shareable ESLint configuration with TypeScript and React support. Used across multiple projects for consistent code quality.",
    thumbnail: "/images/projects/eslint-config.jpg",
    technologies: ["ESLint", "TypeScript", "Node.js"],
    category: "oss",
    links: {
      github: "https://github.com/janszewczyk/eslint-config"
    },
    featured: false,
    year: 2023
  },
  {
    id: "blog-platform",
    title: "Blog Platform",
    description: "A modern blogging platform with MDX support, syntax highlighting, and SEO optimization.",
    thumbnail: "/images/projects/blog.jpg",
    technologies: ["Next.js", "MDX", "Tailwind CSS", "Vercel"],
    category: "web",
    links: {
      github: "https://github.com/janszewczyk/blog",
      live: "https://blog.janszewczyk.com"
    },
    featured: false,
    year: 2023
  }
];

export const PROJECT_CATEGORIES = [
  { value: "all", label: "All Projects" },
  { value: "web", label: "Web Apps" },
  { value: "oss", label: "Open Source" }
] as const;
