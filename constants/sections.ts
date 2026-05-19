export const Section = {
  HERO: "hero",
  ABOUT: "about",
  SKILLS: "skills",
  PROJECTS: "projects",
  EXPERIENCE: "experience",
  EDUCATION: "education",
  CONTACT: "contact",
} as const;

export type Section = (typeof Section)[keyof typeof Section];

export type SectionHref = `#${Section}`;
