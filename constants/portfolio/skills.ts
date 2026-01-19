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
        description: "Building complex UIs with hooks, context, and modern patterns"
      },
      {
        name: "Next.js",
        icon: "nextjs",
        proficiency: 90,
        category: "frontend",
        description: "Full-stack React framework with App Router and Server Components"
      },
      {
        name: "TypeScript",
        icon: "typescript",
        proficiency: 95,
        category: "frontend",
        description: "Type-safe JavaScript for scalable applications"
      },
      {
        name: "Tailwind CSS",
        icon: "tailwind",
        proficiency: 90,
        category: "frontend",
        description: "Utility-first CSS framework for rapid UI development"
      }
    ]
  },
  {
    category: "backend",
    label: "Backend",
    skills: [
      {
        name: "Node.js",
        icon: "nodejs",
        proficiency: 85,
        category: "backend",
        description: "Server-side JavaScript runtime"
      },
      {
        name: "PostgreSQL",
        icon: "postgresql",
        proficiency: 80,
        category: "backend",
        description: "Relational database management"
      },
      {
        name: "Prisma",
        icon: "prisma",
        proficiency: 85,
        category: "backend",
        description: "Type-safe ORM for Node.js and TypeScript"
      },
      {
        name: "REST APIs",
        icon: "api",
        proficiency: 90,
        category: "backend",
        description: "RESTful API design and implementation"
      }
    ]
  },
  {
    category: "devops",
    label: "DevOps",
    skills: [
      {
        name: "Docker",
        icon: "docker",
        proficiency: 75,
        category: "devops",
        description: "Containerization and deployment"
      },
      {
        name: "GitHub Actions",
        icon: "github",
        proficiency: 85,
        category: "devops",
        description: "CI/CD pipelines and automation"
      },
      {
        name: "Vercel",
        icon: "vercel",
        proficiency: 90,
        category: "devops",
        description: "Serverless deployment platform"
      }
    ]
  },
  {
    category: "tools",
    label: "Tools",
    skills: [
      {
        name: "Git",
        icon: "git",
        proficiency: 90,
        category: "tools",
        description: "Version control and collaboration"
      },
      {
        name: "VS Code",
        icon: "vscode",
        proficiency: 95,
        category: "tools",
        description: "Primary development environment"
      },
      {
        name: "Figma",
        icon: "figma",
        proficiency: 70,
        category: "tools",
        description: "UI/UX design and prototyping"
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
  { name: "Node.js", icon: "nodejs" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "Prisma", icon: "prisma" },
  { name: "Docker", icon: "docker" },
  { name: "Git", icon: "git" },
  { name: "GitHub", icon: "github" },
  { name: "Vercel", icon: "vercel" }
];
