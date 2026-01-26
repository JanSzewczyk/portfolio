import { type PersonalInfo, type Stat } from "./types";

export const PERSONAL_INFO: PersonalInfo = {
  name: "Jan Szewczyk",
  title: "Frontend Engineer",
  company: "Szum-Tech",
  alternativeTitles: [
    "Frontend Developer",
    "React Specialist",
    "TypeScript Enthusiast",
    "Open Source Creator",
    "Mobile Developer"
  ],
  tagline:
    "Building scalable web and mobile applications with a focus on code quality, architecture, and developer experience",
  bio: `I'm a Frontend Engineer from Cracow, Poland, specializing in modern web and mobile technologies.
My passion lies in building scalable applications with emphasis on code quality, clean architecture,
and exceptional developer experience.

I'm the creator of @szum-tech/design-system - a comprehensive React component library with 12+ stars
and 425+ commits, featuring accessible components built on Radix UI with full dark mode support.
I actively maintain open source tools including ESLint configs, Prettier configs, and semantic release
automation that help developers maintain consistent code standards.

Beyond web development, I've explored AI and computer vision, creating a hand gesture control system
for my master's thesis using Python, MediaPipe, and scikit-learn. When not coding, you'll find me
fishing or painting miniature figures.`,
  avatar: "https://github.com/JanSzewczyk.png",
  location: "Cracow, Poland",
  email: "contact@janszewczyk.com",
  isAvailable: true
};

export const STATS: Stat[] = [
  { label: "Years Experience", value: 6, suffix: "+" },
  { label: "GitHub Repositories", value: 34 },
  { label: "Open Source Packages", value: 8, suffix: "+" },
  { label: "GitHub Followers", value: 29 }
];
