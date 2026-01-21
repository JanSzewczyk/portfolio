export interface PersonalInfo {
  name: string;
  title: string;
  alternativeTitles: string[];
  tagline: string;
  bio: string;
  avatar: string;
  location: string;
  email: string;
  isAvailable: boolean;
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

export type SkillCategory = "frontend" | "backend" | "mobile" | "devops" | "tools";

export interface Skill {
  name: string;
  icon: string;
  proficiency: number;
  category: SkillCategory;
  description?: string;
}

export interface SkillGroup {
  category: SkillCategory;
  label: string;
  skills: Skill[];
}

export interface TechLogo {
  name: string;
  icon: string;
}

export type ProjectCategory = "web" | "mobile" | "oss" | "ai";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  thumbnail: string;
  technologies: string[];
  category: ProjectCategory;
  links: {
    live?: string;
    github?: string;
  };
  featured: boolean;
  year: number;
}

export type EmploymentType = "full-time" | "part-time" | "contract" | "freelance";

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyLogo?: string;
  companyUrl?: string;
  location: string;
  type: EmploymentType;
  startDate: string;
  endDate?: string;
  summary: string;
  responsibilities: string[];
  achievements?: string[];
  technologies: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  username?: string;
}

export interface NavItem {
  label: string;
  href: string;
}
