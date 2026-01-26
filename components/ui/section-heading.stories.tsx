import { expect } from "storybook/test";

import { SectionHeading } from "./section-heading";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/UI/SectionHeading",
  component: SectionHeading,
  parameters: {
    layout: "centered"
  }
});

/**
 * Story 1: CenterAligned
 * Purpose: Test default center-aligned heading with title, description, and children prop
 */
export const CenterAligned = meta.story({
  args: {
    title: "Featured Projects",
    description: "Explore my latest work and creative projects that showcase my skills and passion for development.",
    children: <span data-testid="test-child">View all projects</span>
  }
});

// Test 1: Renders h2 heading with correct title text
CenterAligned.test("Renders h2 heading with correct title text", async ({ canvas, args }) => {
  const heading = canvas.getByRole("heading", { level: 2 });
  await expect(heading).toBeVisible();
  await expect(heading).toHaveTextContent(args.title);
});

// Test 2: Renders description paragraph when provided
CenterAligned.test("Renders description paragraph when provided", async ({ canvas, args }) => {
  const description = canvas.getByText(args.description!);
  await expect(description).toBeVisible();
  await expect(description.tagName.toLowerCase()).toBe("p");
});

// Test 3: Applies center alignment classes by default
CenterAligned.test("Applies center alignment classes by default", async ({ canvasElement }) => {
  const container = canvasElement.querySelector("div");
  await expect(container).toHaveClass("text-center");
});

// Test 4: Renders children content when provided
CenterAligned.test("Renders children content when provided", async ({ canvas }) => {
  const child = canvas.getByTestId("test-child");
  await expect(child).toBeVisible();
  await expect(child).toHaveTextContent("View all projects");
});

// Test 5: Applies correct description styles
CenterAligned.test("Applies correct description styles", async ({ canvas, args }) => {
  const description = canvas.getByText(args.description!);
  await expect(description).toHaveClass("text-body-lg");
  await expect(description).toHaveClass("text-muted-foreground");
  await expect(description).toHaveClass("max-w-2xl");
});

// Test 6: Has correct semantic structure for accessibility
CenterAligned.test("Has correct semantic structure for accessibility", async ({ canvas, args }) => {
  const heading = canvas.getByRole("heading", { level: 2 });
  await expect(heading).toBeInTheDocument();
  // Verify h2 has accessible name from title
  await expect(heading).toHaveAccessibleName(args.title);
});

/**
 * Story 2: LeftAligned
 * Purpose: Test left-aligned heading variant
 */
export const LeftAligned = meta.story({
  args: {
    title: "About Me",
    description: "I'm a passionate developer focused on creating impactful digital experiences.",
    align: "left"
  }
});

// Test 1: Renders h2 heading with title
LeftAligned.test("Renders h2 heading with title", async ({ canvas, args }) => {
  const heading = canvas.getByRole("heading", { level: 2 });
  await expect(heading).toBeVisible();
  await expect(heading).toHaveTextContent(args.title);
});

// Test 2: Applies left alignment classes when align='left'
LeftAligned.test("Applies left alignment classes when align='left'", async ({ canvasElement }) => {
  const container = canvasElement.querySelector("div");
  await expect(container).toHaveClass("text-left");
  await expect(container).not.toHaveClass("text-center");
});

// Test 3: Renders description with left alignment
LeftAligned.test("Renders description with left alignment", async ({ canvas, args }) => {
  const description = canvas.getByText(args.description!);
  await expect(description).toBeVisible();
  await expect(description.tagName.toLowerCase()).toBe("p");
});

/**
 * Story 3: TitleOnly
 * Purpose: Test heading with only title (no description)
 */
export const TitleOnly = meta.story({
  args: {
    title: "My Skills"
  }
});

// Test 1: Renders h2 heading with title
TitleOnly.test("Renders h2 heading with title", async ({ canvas, args }) => {
  const heading = canvas.getByRole("heading", { level: 2 });
  await expect(heading).toBeVisible();
  await expect(heading).toHaveTextContent(args.title);
});

// Test 2: Does not render description paragraph when description prop is undefined
TitleOnly.test("Does not render description paragraph when description prop is undefined", async ({ canvas }) => {
  // Query all paragraphs - should be empty since there's no description
  const paragraphs = canvas.queryAllByRole("paragraph");
  await expect(paragraphs).toHaveLength(0);
});

// Test 3: Applies base spacing classes
TitleOnly.test("Applies base spacing classes", async ({ canvasElement }) => {
  const container = canvasElement.querySelector("div");
  await expect(container).toHaveClass("mb-12");
  await expect(container).toHaveClass("space-y-4");
});

// Test 4: Maintains center alignment by default
TitleOnly.test("Maintains center alignment by default", async ({ canvasElement }) => {
  const container = canvasElement.querySelector("div");
  await expect(container).toHaveClass("text-center");
});
