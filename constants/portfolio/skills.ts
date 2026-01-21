import { type SkillGroup, type TechLogo } from "./types";

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "frontend",
    label: "Frontend",
    skills: [
      {
        name: "React",
        icon: "react",
        proficiency: 95,
        category: "frontend",
        description: "Building complex UIs with hooks, context, Server Components, and React Compiler"
      },
      {
        name: "Next.js",
        icon: "nextjs",
        proficiency: 95,
        category: "frontend",
        description: "Full-stack React framework with App Router, Server Actions, and caching strategies"
      },
      {
        name: "TypeScript",
        icon: "typescript",
        proficiency: 95,
        category: "frontend",
        description: "Type-safe JavaScript for scalable applications with strict mode"
      },
      {
        name: "Tailwind CSS",
        icon: "tailwind",
        proficiency: 90,
        category: "frontend",
        description: "Utility-first CSS framework including v4 with CSS-first configuration"
      }
    ]
  },
  {
    category: "mobile",
    label: "Mobile",
    skills: [
      {
        name: "React Native",
        icon: "react",
        proficiency: 85,
        category: "mobile",
        description: "Cross-platform mobile development with native performance"
      },
      {
        name: "Expo",
        icon: "expo",
        proficiency: 85,
        category: "mobile",
        description: "React Native toolchain with SDK 54+ and file-based routing"
      },
      {
        name: "NativeWind",
        icon: "tailwind",
        proficiency: 80,
        category: "mobile",
        description: "Tailwind CSS for React Native applications"
      },
      {
        name: "Appwrite",
        icon: "appwrite",
        proficiency: 75,
        category: "mobile",
        description: "Backend-as-a-Service for mobile authentication and data"
      }
    ]
  },
  {
    category: "devops",
    label: "DevOps & Tools",
    skills: [
      {
        name: "GitHub Actions",
        icon: "github",
        proficiency: 90,
        category: "devops",
        description: "CI/CD pipelines, semantic releases, and automation workflows"
      },
      {
        name: "Vitest",
        icon: "vitest",
        proficiency: 90,
        category: "devops",
        description: "Unit and integration testing with coverage reporting"
      },
      {
        name: "Playwright",
        icon: "playwright",
        proficiency: 85,
        category: "devops",
        description: "E2E testing and browser automation"
      },
      {
        name: "Storybook",
        icon: "storybook",
        proficiency: 90,
        category: "devops",
        description: "Component documentation and interaction testing"
      }
    ]
  },
  {
    category: "tools",
    label: "Other",
    skills: [
      {
        name: "Python",
        icon: "python",
        proficiency: 70,
        category: "tools",
        description: "AI/ML projects with scikit-learn, MediaPipe, and OpenCV"
      },
      {
        name: "Zod",
        icon: "zod",
        proficiency: 90,
        category: "tools",
        description: "TypeScript-first schema validation and parsing"
      },
      {
        name: "Radix UI",
        icon: "radix",
        proficiency: 90,
        category: "tools",
        description: "Accessible, unstyled UI primitives for design systems"
      },
      {
        name: "Pino",
        icon: "pino",
        proficiency: 80,
        category: "tools",
        description: "Structured logging for Node.js applications"
      }
    ]
  }
];

export const TECH_LOGOS: TechLogo[] = [
  { name: "React", icon: "react" },
  { name: "Next.js", icon: "nextjs" },
  { name: "TypeScript", icon: "typescript" },
  { name: "JavaScript", icon: "javascript" },
  { name: "Tailwind CSS", icon: "tailwind" },
  { name: "React Native", icon: "react" },
  { name: "Expo", icon: "expo" },
  { name: "Node.js", icon: "nodejs" },
  { name: "Python", icon: "python" },
  { name: "Zod", icon: "zod" },
  { name: "Radix UI", icon: "radix" },
  { name: "Storybook", icon: "storybook" },
  { name: "Vitest", icon: "vitest" },
  { name: "Playwright", icon: "playwright" },
  { name: "GitHub Actions", icon: "github" },
  { name: "Vercel", icon: "vercel" }
];
