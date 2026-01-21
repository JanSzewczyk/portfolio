// Re-export all portfolio constants
export * from "./portfolio";

// Test helper constants
export const SECTION_IDS = ["hero", "about", "skills", "projects", "experience", "contact"] as const;

export const NAVIGATION_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" }
] as const;
