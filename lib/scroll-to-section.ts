import { type Section, type SectionHref } from "~/constants/sections";

/**
 * Options for the scrollToSection utility function.
 */
export interface ScrollToSectionOptions {
  /**
   * Callback function to execute after scrolling to a section.
   * Useful for closing mobile menus or other UI cleanup.
   *
   * @example
   * ```tsx
   * scrollToSection("#hero", {
   *   onAfterScroll: () => setIsMobileMenuOpen(false)
   * });
   * ```
   */
  onAfterScroll?: () => void;

  /**
   * Scroll behavior for the scrollIntoView method.
   * @default "smooth"
   */
  behavior?: ScrollBehavior;

  /**
   * Block alignment for the scrollIntoView method.
   * @default "start"
   */
  block?: ScrollLogicalPosition;
}

export function scrollToSection(section: Section, options: ScrollToSectionOptions = {}): void {
  const { onAfterScroll, behavior = "smooth", block = "start" } = options;

  const element = document.querySelector(getSectionHref(section));
  if (element) {
    element.scrollIntoView({ behavior, block });
    onAfterScroll?.();
  }
}
export function getSectionHref(section: Section): SectionHref {
  return `#${section}`;
}
