import { type PersonalInfo, type Stat } from "./types";

export const PERSONAL_INFO: PersonalInfo = {
  name: "Jan Szewczyk",
  title: "Full Stack Developer",
  alternativeTitles: ["Full Stack Developer", "Software Engineer", "Open Source Enthusiast", "TypeScript Advocate"],
  tagline: "Building elegant solutions to complex problems",
  bio: `I'm a passionate software engineer with a focus on creating clean, efficient,
and scalable web applications. I love working with modern technologies like React,
Next.js, and TypeScript, and I'm always eager to learn new tools and frameworks.

With experience in both frontend and backend development, I enjoy building
full-stack applications that provide great user experiences while maintaining
robust and maintainable codebases.`,
  avatar: "/images/avatar.jpg",
  location: "Poland",
  email: "contact@janszewczyk.com",
  isAvailable: true
};

export const STATS: Stat[] = [
  { label: "Years Experience", value: 5, suffix: "+" },
  { label: "Projects Completed", value: 30, suffix: "+" },
  { label: "Technologies", value: 20, suffix: "+" },
  { label: "Open Source Contributions", value: 100, suffix: "+" }
];
