import { type Project } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "design-system",
    title: "Design System",
    description:
      "A comprehensive React component library built with TypeScript, Tailwind CSS 4+, and Radix UI. Features 25+ accessible components with full dark/light theme support and extensive Storybook documentation.",
    longDescription: `@szum-tech/design-system is a production-ready design system that provides consistent, accessible,
and customizable UI components. Built on top of Radix UI primitives with Tailwind CSS for styling,
ensuring both accessibility and flexibility. Used across multiple projects for consistent UI/UX.`,
    thumbnail: "/images/projects/design-system.jpg",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Radix UI", "Storybook", "Vitest"],
    category: "oss",
    links: {
      github: "https://github.com/JanSzewczyk/design-system",
      live: "https://janszewczyk.github.io/design-system"
    },
    featured: true,
    year: 2024
  },
  {
    id: "nextjs-szumplate",
    title: "Next.js Enterprise Template",
    description:
      "A production-ready Next.js template with TypeScript, comprehensive testing (Vitest, Playwright, Storybook), CI/CD automation, and enterprise-grade tooling for scalable applications.",
    longDescription: `nextjs-szumplate is an opinionated, feature-rich template designed for building enterprise
applications. Includes multi-layer testing strategy, GitHub Actions workflows, bundle analysis,
structured logging with Pino, and Kubernetes-ready health checks.`,
    thumbnail: "/images/projects/nextjs-template.jpg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vitest", "Playwright", "GitHub Actions"],
    category: "web",
    links: {
      github: "https://github.com/JanSzewczyk/nextjs-szumplate"
    },
    featured: true,
    year: 2024
  },
  {
    id: "hands-control-system",
    title: "Hands Control System",
    description:
      "AI-powered mouse control using hand gestures - a master's thesis project. Uses MediaPipe for hand landmark detection and scikit-learn for gesture classification.",
    longDescription: `HCS (Hands Control System) is a computer vision application that enables users to control
their mouse cursor using hand movements and gestures. Built with Python, it leverages MediaPipe
for real-time hand tracking and scikit-learn for gesture classification.`,
    thumbnail: "/images/projects/hands-control.jpg",
    technologies: ["Python", "MediaPipe", "OpenCV", "scikit-learn", "Jupyter"],
    category: "ai",
    links: {
      github: "https://github.com/JanSzewczyk/hands-control-system"
    },
    featured: true,
    year: 2022
  },
  {
    id: "workout-tracker",
    title: "Workout Tracker",
    description:
      "Cross-platform fitness app built with React Native and Expo SDK 54. Track workouts, monitor progress with statistics, set goals, and maintain workout streaks.",
    longDescription: `A comprehensive mobile fitness application that helps users track their workouts,
monitor progress through statistical dashboards, maintain personal records, and stay motivated
with an achievement system and streak counter.`,
    thumbnail: "/images/projects/workout-tracker.jpg",
    technologies: ["React Native", "Expo", "TypeScript", "NativeWind", "AsyncStorage"],
    category: "mobile",
    links: {
      github: "https://github.com/JanSzewczyk/workout-tracker"
    },
    featured: true,
    year: 2025
  },
  {
    id: "habits-tracker",
    title: "Habits Tracker",
    description:
      "Build better habits with this React Native app featuring streak tracking, real-time sync via Appwrite, and beautiful Material Design UI with dark/light mode support.",
    longDescription: `A powerful cross-platform mobile application to build better habits and track daily progress.
Features include habit creation, streak tracking, Appwrite backend integration for real-time sync,
and a polished UI built with NativeWind and React Native Paper.`,
    thumbnail: "/images/projects/habits-tracker.jpg",
    technologies: ["React Native", "Expo", "TypeScript", "Appwrite", "NativeWind", "Zod"],
    category: "mobile",
    links: {
      github: "https://github.com/JanSzewczyk/habits-tracker-app"
    },
    featured: true,
    year: 2025
  },
  {
    id: "eslint-config",
    title: "ESLint Config",
    description:
      "Shareable ESLint configuration for JavaScript/TypeScript/React projects. Enforces consistent code style across all Szum-Tech projects.",
    thumbnail: "/images/projects/eslint-config.jpg",
    technologies: ["ESLint", "TypeScript", "JavaScript", "Node.js"],
    category: "oss",
    links: {
      github: "https://github.com/JanSzewczyk/eslint-config"
    },
    featured: false,
    year: 2024
  },
  {
    id: "prettier-config",
    title: "Prettier Config",
    description:
      "Shareable Prettier configuration ensuring consistent code formatting across projects. Part of the Szum-Tech tooling ecosystem.",
    thumbnail: "/images/projects/prettier-config.jpg",
    technologies: ["Prettier", "Node.js"],
    category: "oss",
    links: {
      github: "https://github.com/JanSzewczyk/prettier-config"
    },
    featured: false,
    year: 2024
  },
  {
    id: "semantic-release-config",
    title: "Semantic Release Config",
    description:
      "Automated semantic versioning and package publishing configuration. Integrates with GitHub Actions for streamlined release workflows.",
    thumbnail: "/images/projects/semantic-release.jpg",
    technologies: ["Semantic Release", "GitHub Actions", "Node.js"],
    category: "oss",
    links: {
      github: "https://github.com/JanSzewczyk/semantic-release-config"
    },
    featured: false,
    year: 2024
  },
  {
    id: "zod-mod",
    title: "Zod Mod",
    description:
      "Extension library for Zod enabling dynamic schema modifications. Add validation rules on-the-fly without rewriting existing schemas.",
    thumbnail: "/images/projects/zod-mod.jpg",
    technologies: ["Zod", "TypeScript", "Vitest", "tsup"],
    category: "oss",
    links: {
      github: "https://github.com/JanSzewczyk/zod-mod"
    },
    featured: false,
    year: 2025
  },
  {
    id: "portfolio",
    title: "Portfolio Website",
    description:
      "Personal portfolio website built with Next.js 16, React Compiler, and Tailwind CSS v4. Features smooth animations, dark mode, and comprehensive testing.",
    thumbnail: "/images/projects/portfolio.jpg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vitest", "Playwright"],
    category: "web",
    links: {
      github: "https://github.com/JanSzewczyk/portfolio"
    },
    featured: false,
    year: 2026
  }
];

export const PROJECT_CATEGORIES = [
  { value: "all", label: "Featured" },
  { value: "web", label: "Web Apps" },
  { value: "mobile", label: "Mobile" },
  { value: "oss", label: "Open Source" },
  { value: "ai", label: "AI / ML" }
];
