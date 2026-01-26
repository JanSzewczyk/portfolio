import { type NavItem } from "./portfolio/types";
import { Section } from "./sections";

/**
 * Navigation items for the portfolio header.
 * Uses type-safe section references from SECTIONS.
 */
export const NAV_ITEMS: Array<NavItem> = [
  { label: "Home", section: Section.HERO },
  { label: "About", section: Section.ABOUT },
  { label: "Skills", section: Section.SKILLS },
  { label: "Projects", section: Section.PROJECTS },
  { label: "Experience", section: Section.EXPERIENCE },
  { label: "Education", section: Section.EDUCATION },
  { label: "Contact", section: Section.CONTACT }
];
