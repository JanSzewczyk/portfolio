import { type Skill, type SkillGroup } from "./types";

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "frontend",
    label: "Frontend",
    skills: [
      {
        name: "React",
        icon: "SiReact",
        category: "frontend",
        description: "Building complex UIs with hooks, context, Server Components, and React Compiler"
      },
      {
        name: "Next.js",
        icon: "SiNextdotjs",
        category: "frontend",
        description: "Full-stack React framework with App Router, Server Actions, and caching strategies"
      },
      {
        name: "TypeScript",
        icon: "SiTypescript",
        category: "frontend",
        description: "Type-safe JavaScript for scalable applications with strict mode"
      },
      {
        name: "Tailwind CSS",
        icon: "SiTailwindcss",
        category: "frontend",
        description: "Utility-first CSS framework including v4 with CSS-first configuration"
      },
      {
        name: "React Hook Form",
        icon: "SiReacthookform",
        category: "frontend",
        description: "Performant form validation with minimal re-renders"
      },
      {
        name: "React Router",
        icon: "SiReactrouter",
        category: "frontend",
        description: "Client-side routing for React single-page applications"
      }
    ]
  },
  {
    category: "mobile",
    label: "Mobile",
    skills: [
      {
        name: "React Native",
        icon: "SiReact",
        category: "mobile",
        description: "Cross-platform mobile development with native performance"
      },
      {
        name: "Expo",
        icon: "SiExpo",
        category: "mobile",
        description: "React Native toolchain with SDK 54+ and file-based routing"
      },
      {
        name: "NativeWind",
        icon: "SiTailwindcss",
        category: "mobile",
        description: "Tailwind CSS for React Native applications"
      },
      {
        name: "Appwrite",
        icon: "SiAppwrite",
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
        icon: "SiGithubactions",
        category: "devops",
        description: "CI/CD pipelines, semantic releases, and automation workflows"
      },
      {
        name: "Vitest",
        icon: "SiVitest",
        category: "devops",
        description: "Unit and integration testing with coverage reporting"
      },
      {
        name: "Playwright",
        icon: "TbTestPipe",
        category: "devops",
        description: "E2E testing and browser automation"
      },
      {
        name: "Storybook",
        icon: "SiStorybook",
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
        icon: "SiPython",
        category: "tools",
        description: "AI/ML projects with scikit-learn, MediaPipe, and OpenCV"
      },
      {
        name: "Zod",
        icon: "SiZod",
        category: "tools",
        description: "TypeScript-first schema validation and parsing"
      },
      {
        name: "Radix UI",
        icon: "SiRadixui",
        category: "tools",
        description: "Accessible, unstyled UI primitives for design systems"
      },
      {
        name: "Pino",
        icon: "VscDebugConsole",
        category: "tools",
        description: "Structured logging for Node.js applications"
      },
      {
        name: "Sanity",
        icon: "SiSanity",
        category: "tools",
        description: "Headless CMS with real-time collaboration and GROQ queries"
      },
      {
        name: "Storyblok",
        icon: "SiStoryblok",
        category: "tools",
        description: "Visual headless CMS with live preview and component-based editing"
      }
    ]
  }
];

export const TECH_LOGOS: Array<Skill> = [
  {
    name: "React",
    icon: "SiReact",
    category: "frontend",
    description: "Building complex UIs with hooks, context, Server Components, and React Compiler"
  },
  {
    name: "Next.js",
    icon: "SiNextdotjs",
    category: "frontend",
    description: "Full-stack React framework with App Router, Server Actions, and caching strategies"
  },
  {
    name: "TypeScript",
    icon: "SiTypescript",
    category: "frontend",
    description: "Type-safe JavaScript for scalable applications with strict mode"
  },
  {
    name: "JavaScript",
    icon: "SiJavascript",
    category: "frontend",
    description: "Modern JavaScript ES6+ with async/await, destructuring, and modules"
  },
  {
    name: "Tailwind CSS",
    icon: "SiTailwindcss",
    category: "frontend",
    description: "Utility-first CSS framework including v4 with CSS-first configuration"
  },
  {
    name: "React Native",
    icon: "SiReact",
    category: "mobile",
    description: "Cross-platform mobile development with native performance"
  },
  {
    name: "Expo",
    icon: "SiExpo",
    category: "mobile",
    description: "React Native toolchain with SDK 54+ and file-based routing"
  },
  {
    name: "Node.js",
    icon: "SiNodedotjs",
    category: "backend",
    description: "Server-side JavaScript runtime for building scalable applications"
  },
  {
    name: "Python",
    icon: "SiPython",
    category: "tools",
    description: "AI/ML projects with scikit-learn, MediaPipe, and OpenCV"
  },
  {
    name: "Zod",
    icon: "SiZod",
    category: "tools",
    description: "TypeScript-first schema validation and parsing"
  },
  {
    name: "Radix UI",
    icon: "SiRadixui",
    category: "tools",
    description: "Accessible, unstyled UI primitives for design systems"
  },
  {
    name: "Storybook",
    icon: "SiStorybook",
    category: "devops",
    description: "Component documentation and interaction testing"
  },
  {
    name: "Storyblok",
    icon: "SiStoryblok",
    category: "tools",
    description: "Visual headless CMS with live preview and component-based editing"
  },
  {
    name: "Vitest",
    icon: "SiVitest",
    category: "devops",
    description: "Unit and integration testing with coverage reporting"
  },
  {
    name: "Vite",
    icon: "SiVite",
    category: "devops",
    description: "Next-generation frontend build tool with lightning-fast HMR"
  },
  {
    name: "Playwright",
    icon: "TbTestPipe",
    category: "devops",
    description: "E2E testing and browser automation"
  },
  {
    name: "GitHub Actions",
    icon: "SiGithubactions",
    category: "devops",
    description: "CI/CD pipelines, semantic releases, and automation workflows"
  },
  {
    name: "Vercel",
    icon: "SiVercel",
    category: "devops",
    description: "Cloud platform for deploying Next.js applications with edge functions"
  },
  {
    name: "React Hook Form",
    icon: "SiReacthookform",
    category: "frontend",
    description: "Performant form validation with minimal re-renders"
  },
  {
    name: "React Router",
    icon: "SiReactrouter",
    category: "frontend",
    description: "Client-side routing for React single-page applications"
  },
  {
    name: "Sanity",
    icon: "SiSanity",
    category: "tools",
    description: "Headless CMS with real-time collaboration and GROQ queries"
  },
  {
    name: "Auth0",
    icon: "SiAuth0",
    category: "backend",
    description: "Authentication and authorization platform with OAuth and JWT support"
  },
  {
    name: "Prettier",
    icon: "SiPrettier",
    category: "devops",
    description: "Opinionated code formatter for consistent code style"
  },
  {
    name: "Eslint",
    icon: "SiEslint",
    category: "devops",
    description: "Pluggable linting utility for identifying and fixing code patterns"
  },
  {
    name: "Semantic Release",
    icon: "SiSemanticrelease",
    category: "devops",
    description: "Automated versioning and package publishing based on conventional commits"
  },
  {
    name: "React Query",
    icon: "SiReactquery",
    category: "frontend",
    description: "Powerful data synchronization and caching for React applications"
  },
  {
    name: "Pino",
    icon: "VscDebugConsole",
    category: "tools",
    description: "Structured logging for Node.js applications"
  }
];
