export const Section = {
  ABOUT: "about",
  CONTACT: "contact",
  EDUCATION: "education",
  EXPERIENCE: "experience",
  HERO: "hero",
  PROJECTS: "projects",
  SKILLS: "skills"
} as const;

export type Section = (typeof Section)[keyof typeof Section];

export type SectionHref = `#${Section}`;
