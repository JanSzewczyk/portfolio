import { type IconName } from "~/components/ui/react-icon";
import { type Section } from "~/constants/sections";

export interface PersonalInfo {
  name: string;
  title: string;
  company: string;
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
  icon: IconName;
  category: SkillCategory;
  description?: string;
}

///
export interface SkillGroup {
  category: SkillCategory;
  label: string;
  skills: Skill[];
}

///
export type ProjectCategory = "web" | "mobile" | "oss" | "ai";

///
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
//
export type EmploymentType = "full-time" | "part-time" | "contract" | "freelance";
//
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
  section: Section;
}

export type DegreeType = "bachelor" | "master" | "phd";

export interface Education {
  id: string;
  institution: string;
  institutionUrl?: string;
  location: string;
  degree: DegreeType;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  grade?: string;
  thesis?: {
    title: string;
    description: string;
    technologies: string[];
    url?: string;
  };
  achievements?: string[];
  coursework?: string[];
}
