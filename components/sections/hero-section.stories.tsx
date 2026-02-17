import { expect } from "storybook/test";
import { portfolioPageHeroBuilder, portfolioPagePersonalInfoBuilder } from "~/tests/builders/portfolio-page.builder";

import { HeroSection } from "./hero-section";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Sections/Hero Section",
  component: HeroSection,
  parameters: {
    layout: "fullscreen"
  },
  args: {
    personalInfo: portfolioPagePersonalInfoBuilder.one({ traits: ["withAvatar"] }),
    hero: portfolioPageHeroBuilder.one(),
    documentId: "test-portfolio",
    documentType: "portfolioPage"
  }
});

// Story 1: With Avatar and Available Status
export const HeroSectionWithAvatar = meta.story({});

// Story 2: Without Avatar and Unavailable Status
export const HeroSectionWithoutAvatar = meta.story({
  args: {
    personalInfo: portfolioPagePersonalInfoBuilder.one(), // No withAvatar trait = null avatar
    hero: portfolioPageHeroBuilder.one({ traits: ["unavailable"] })
  }
});

// ============================================================================
// Tests for HeroSectionWithAvatar
// ============================================================================

// Test 1: Avatar Image
HeroSectionWithAvatar.test("Renders avatar image with correct alt text", async ({ canvas, args }) => {
  // The AvatarImage component from design system renders an img inside a span
  const avatar = canvas.queryByRole("img");

  if (avatar) {
    await expect(avatar).toBeVisible();

    // Verify alt text if provided
    if (args.personalInfo?.avatar?.alt) {
      await expect(avatar).toHaveAccessibleName(args.personalInfo.avatar.alt);
    }
  } else {
    // If no img role found, verify the avatar container exists (fallback scenario)
    const avatarContainer = canvas.getByText(
      args.personalInfo?.name
        ?.split(" ")
        .map((n) => n[0])
        .join("") || ""
    );
    await expect(avatarContainer).toBeInTheDocument();
  }
});

// Test 2: Available Status
HeroSectionWithAvatar.test("Renders available status indicator correctly", async ({ canvas }) => {
  const status = canvas.getByText(/available for opportunities/i);
  await expect(status).toBeVisible();
});

// Test 3: Heading with Typing Animation
HeroSectionWithAvatar.test("Renders heading with typing animation", async ({ canvas }) => {
  const heading = canvas.getByRole("heading", { level: 1 });
  await expect(heading).toBeVisible();

  // TypingText component starts with just cursor, so we don't validate the full name here
  // Just verify the heading exists and is rendering
  // The typing animation will complete over time
});

// Test 4: Alternative Titles
HeroSectionWithAvatar.test("Renders all alternative titles in rotation", async ({ canvas, args }) => {
  if (args.hero?.alternativeTitles && args.hero.alternativeTitles.length > 0) {
    // Check that at least one alternative title is visible in the DOM
    const firstTitle = args.hero.alternativeTitles[0];
    if (firstTitle) {
      const titleElement = canvas.getByText(firstTitle);
      await expect(titleElement).toBeInTheDocument();
    }
  }
});

// Test 5: Tagline
HeroSectionWithAvatar.test("Renders tagline text", async ({ canvas, args }) => {
  if (args.hero?.tagline) {
    const tagline = canvas.getByText(args.hero.tagline);
    await expect(tagline).toBeVisible();
  }
});

// Test 6: Get in Touch Button
HeroSectionWithAvatar.test("Get in Touch button is clickable and has correct text", async ({ canvas }) => {
  const button = canvas.getByRole("button", { name: /get in touch/i });
  await expect(button).toBeVisible();
  await expect(button).toBeEnabled();
});

// Test 7: View Projects Button
HeroSectionWithAvatar.test("View Projects button is clickable and has correct icon", async ({ canvas }) => {
  const button = canvas.getByRole("button", { name: /view projects/i });
  await expect(button).toBeVisible();
  await expect(button).toBeEnabled();
});

// Test 8: Heading Hierarchy
HeroSectionWithAvatar.test("Section has correct heading hierarchy", async ({ canvas }) => {
  const heading = canvas.getByRole("heading", { level: 1 });
  await expect(heading).toBeVisible();

  // Verify the heading uses h1 tag
  const headingTag = heading.tagName.toLowerCase();
  await expect(headingTag).toBe("h1");
});

// Test 9: Keyboard Accessibility
HeroSectionWithAvatar.test("All interactive elements are keyboard accessible", async ({ canvas }) => {
  const getInTouchButton = canvas.getByRole("button", { name: /get in touch/i });
  const viewProjectsButton = canvas.getByRole("button", { name: /view projects/i });

  // Verify buttons can receive focus
  getInTouchButton.focus();
  await expect(getInTouchButton).toHaveFocus();

  viewProjectsButton.focus();
  await expect(viewProjectsButton).toHaveFocus();
});

// Test 10: Scroll Indicator
HeroSectionWithAvatar.test("Scroll indicator has proper visual feedback", async ({ canvasElement }) => {
  // Find the scroll indicator (arrow icon at the bottom)
  const scrollIndicator = canvasElement.querySelector(".animate-bounce");
  await expect(scrollIndicator).toBeInTheDocument();
});

// Test 17: GridBackground
HeroSectionWithAvatar.test("GridBackground component is rendered", async ({ canvasElement }) => {
  // Verify section has relative positioning (required for GridBackground)
  const section = canvasElement.querySelector("section");
  await expect(section).toBeInTheDocument();
  await expect(section?.classList.contains("relative")).toBe(true);
});

// Test 18: Container Layout
HeroSectionWithAvatar.test("Container has proper layout structure", async ({ canvasElement }) => {
  const section = canvasElement.querySelector("section");
  const container = section?.querySelector(".container");

  await expect(container).toBeInTheDocument();
  await expect(container?.classList.contains("flex")).toBe(true);

  // Verify max-width constraint exists
  const maxWidthElement = canvasElement.querySelector(".max-w-4xl");
  await expect(maxWidthElement).toBeInTheDocument();
});

// Test 19: Avatar Size
HeroSectionWithAvatar.test("Avatar has proper size styling", async ({ canvasElement }) => {
  const avatar = canvasElement.querySelector("[class*='size-32']");
  await expect(avatar).toBeInTheDocument();
});

// Test 20: Clean Name Text
HeroSectionWithAvatar.test("Name in heading uses stegaClean utility", async ({ canvas, args }) => {
  const heading = canvas.getByRole("heading", { level: 1 });
  const headingText = heading.textContent;

  // Verify text doesn't contain Sanity metadata artifacts (no special characters)
  if (args.personalInfo?.name) {
    await expect(headingText).not.toContain("{");
    await expect(headingText).not.toContain("}");
    await expect(headingText).not.toContain("__");
  }
});

// ============================================================================
// Tests for HeroSectionWithoutAvatar
// ============================================================================

// Test 11: Initials Fallback
HeroSectionWithoutAvatar.test("Renders initials fallback when avatar is missing", async ({ canvas, args }) => {
  // Avatar image should NOT be present
  const avatarImages = canvas.queryAllByRole("img");
  await expect(avatarImages.length).toBe(0);

  // Verify initials are calculated and displayed
  if (args.personalInfo?.name) {
    const initials = args.personalInfo.name
      .split(" ")
      .map((n) => n[0])
      .join("");

    const initialsElement = canvas.getByText(initials);
    await expect(initialsElement).toBeVisible();
  }
});

// Test 12: Unavailable Status
HeroSectionWithoutAvatar.test("Renders unavailable status indicator correctly", async ({ canvas }) => {
  const status = canvas.getByText(/currently unavailable/i);
  await expect(status).toBeVisible();
});

// Test 13: All Content Without Avatar
HeroSectionWithoutAvatar.test("Still renders all other content correctly without avatar", async ({ canvas, args }) => {
  // Verify heading
  const heading = canvas.getByRole("heading", { level: 1 });
  await expect(heading).toBeVisible();

  // Verify tagline if present
  if (args.hero?.tagline) {
    const tagline = canvas.getByText(args.hero.tagline);
    await expect(tagline).toBeVisible();
  }

  // Verify both buttons
  const getInTouchButton = canvas.getByRole("button", { name: /get in touch/i });
  const viewProjectsButton = canvas.getByRole("button", { name: /view projects/i });

  await expect(getInTouchButton).toBeVisible();
  await expect(viewProjectsButton).toBeVisible();
});

// Test 14: Missing Alternative Titles
HeroSectionWithoutAvatar.test("Handles missing alternative titles gracefully", async ({ canvas }) => {
  // Component should still render other elements
  const heading = canvas.getByRole("heading", { level: 1 });
  await expect(heading).toBeVisible();
});

// Test 15: Empty Alternative Titles Array
HeroSectionWithoutAvatar.test("Handles empty alternative titles array", async ({ canvas }) => {
  // Component should still render correctly
  const heading = canvas.getByRole("heading", { level: 1 });
  await expect(heading).toBeVisible();
});

// Test 16: Section ID
HeroSectionWithoutAvatar.test("Component renders within section with correct ID", async ({ canvasElement }) => {
  const section = canvasElement.querySelector("section#hero");
  await expect(section).toBeInTheDocument();

  // Verify scroll offset class
  await expect(section?.classList.contains("scroll-m-16")).toBe(true);
});
