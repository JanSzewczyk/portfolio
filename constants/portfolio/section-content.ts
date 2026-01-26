import { Section } from "~/constants/sections";

export interface SectionHeadingContent {
  title: string;
  description: string;
}

export const SECTION_HEADINGS: Record<Section, SectionHeadingContent> = {
  [Section.HERO]: {
    title: "",
    description: ""
  },
  [Section.ABOUT]: {
    title: "About Me",
    description: "Get to know me a little better."
  },
  [Section.SKILLS]: {
    title: "Skills & Technologies",
    description: "The tools and technologies I work with to bring ideas to life."
  },
  [Section.PROJECTS]: {
    title: "Featured Projects",
    description: "A selection of projects I've worked on, from open source libraries to full-stack applications."
  },
  [Section.EXPERIENCE]: {
    title: "Experience",
    description: "My professional journey and the roles that shaped my career."
  },
  [Section.EDUCATION]: {
    title: "Education",
    description: "My academic journey and the knowledge that built my foundation."
  },
  [Section.CONTACT]: {
    title: "Get in Touch",
    description: "Have a project in mind or just want to say hello? I'd love to hear from you."
  }
};
