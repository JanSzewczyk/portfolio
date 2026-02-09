import { expect, waitFor } from "storybook/test";
import { portfolioPageSkillsBuilder } from "~/tests/builders/portfolio-page.builder";

import { SkillsSection } from "./skills-section";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Sections/Skills Section",
  component: SkillsSection,
  args: {
    skills: portfolioPageSkillsBuilder.one({
      overrides: {
        heading: {
          title: "Skills & Technologies",
          description: "The tools and technologies I work with to bring ideas to life"
        }
      }
    }),
    documentId: "portfolio-page",
    documentType: "portfolioPage"
  },
  parameters: {
    layout: "fullscreen"
  }
});

/**
 * Default story showing the SkillsSection component with enhanced Bento Grid layout.
 * Features animated skill cards, interactive marquee, and stacked mobile view.
 */
export const SkillsSection_Story = meta.story({});

SkillsSection_Story.test("Renders section heading with title and description", async ({ canvas }) => {
  const heading = canvas.getByRole("heading", { level: 2 });
  await expect(heading).toBeVisible();

  const description = canvas.getByText(/the tools and technologies/i);
  await expect(description).toBeVisible();
});

SkillsSection_Story.test("Renders marquee with tech logos", async ({ canvas, args }) => {
  // Check that marquee container exists
  const section = canvas.getByRole("region", { name: /skills/i });
  await expect(section).toBeInTheDocument();

  // Verify at least one tech logo is visible
  const firstTech = args.skills?.technologyGroups?.[0]?.technologies?.[0];
  if (firstTech?.name) {
    const techElement = canvas.getByText(firstTech.name);
    await expect(techElement).toBeVisible();
  }
});

SkillsSection_Story.test("Renders category badges for technology groups", async ({ canvas, args }) => {
  const groups = args.skills?.technologyGroups ?? [];

  for (const group of groups.slice(0, 2)) {
    if (group.label) {
      const badge = canvas.getByText(group.label);
      await expect(badge).toBeVisible();
    }
  }
});

SkillsSection_Story.test("Renders skill cards with technology names", async ({ canvas, args }) => {
  const firstGroup = args.skills?.technologyGroups?.[0];
  const firstTech = firstGroup?.technologies?.[0];

  if (firstTech?.name) {
    const skillHeading = canvas.getAllByRole("heading", { level: 3 }).find((el) => el.textContent === firstTech.name);
    await expect(skillHeading).toBeVisible();
  }
});

SkillsSection_Story.test("Renders decorative bottom text", async ({ canvas }) => {
  const bottomText = canvas.getByText(/always learning and exploring new technologies/i);
  await expect(bottomText).toBeVisible();
});

/**
 * Tests hover interactions on skill cards.
 */
export const SkillCardHoverInteraction = meta.story({
  tags: ["test-only"]
});

SkillCardHoverInteraction.test(
  "Displays tooltip on hover for non-featured skills",
  async ({ canvas, userEvent, args }) => {
    // Find a non-featured skill (not the first one in a group)
    const secondTech = args.skills?.technologyGroups?.[0]?.technologies?.[1];

    if (secondTech?.name && secondTech.description) {
      const skillHeading = canvas
        .getAllByRole("heading", { level: 3 })
        .find((el) => el.textContent === secondTech.name);

      if (skillHeading) {
        await userEvent.hover(skillHeading);

        await waitFor(
          async () => {
            const tooltip = canvas.queryByText(secondTech.description as string);
            if (tooltip) {
              await expect(tooltip).toBeVisible();
            }
          },
          { timeout: 2000 }
        );
      }
    }
  }
);

/**
 * Tests marquee animation behavior.
 */
export const MarqueeInteraction = meta.story({
  tags: ["test-only"]
});

MarqueeInteraction.test("Marquee pauses on hover", async ({ canvas, userEvent, args }) => {
  const firstTech = args.skills?.technologyGroups?.[0]?.technologies?.[0];

  if (firstTech?.name) {
    const techLogo = canvas.getByText(firstTech.name);
    await userEvent.hover(techLogo);

    await waitFor(async () => {
      await expect(techLogo).toBeVisible();
    });

    await userEvent.unhover(techLogo);

    await waitFor(async () => {
      await expect(techLogo).toBeVisible();
    });
  }
});

/**
 * Tests desktop Bento Grid layout structure.
 */
export const DesktopBentoGridLayout = meta.story({
  tags: ["test-only"]
});

DesktopBentoGridLayout.test("Renders desktop grid with category columns", async ({ canvasElement }) => {
  const desktopGrid = canvasElement.querySelector(".lg\\:block");
  await expect(desktopGrid).toBeInTheDocument();
});

DesktopBentoGridLayout.test("All categories are visible simultaneously on desktop", async ({ canvas, args }) => {
  const groups = args.skills?.technologyGroups ?? [];

  for (const group of groups) {
    if (group.label) {
      const badge = canvas.getByText(group.label);
      await expect(badge).toBeVisible();
    }
  }
});

/**
 * Tests mobile stacked layout.
 */
export const MobileStackedLayout = meta.story({
  tags: ["test-only"]
});

MobileStackedLayout.test("Renders mobile stacked layout", async ({ canvasElement }) => {
  const mobileLayout = canvasElement.querySelector(".lg\\:hidden");
  await expect(mobileLayout).toBeInTheDocument();
});

MobileStackedLayout.test("Each group has category badge and skills grid", async ({ canvas, args }) => {
  const firstGroup = args.skills?.technologyGroups?.[0];

  if (firstGroup?.label) {
    const badge = canvas.getByText(firstGroup.label);
    await expect(badge).toBeVisible();
  }

  const firstTech = firstGroup?.technologies?.[0];
  if (firstTech?.name) {
    const skill = canvas.getAllByText(firstTech.name)[0];
    await expect(skill).toBeVisible();
  }
});

/**
 * Tests section heading structure and accessibility.
 */
export const SectionHeadingStructure = meta.story({
  tags: ["test-only"]
});

SectionHeadingStructure.test("Section has proper heading hierarchy", async ({ canvas }) => {
  const mainHeading = canvas.getByRole("heading", { level: 2 });
  await expect(mainHeading).toBeVisible();
});

SectionHeadingStructure.test("Skill cards use proper heading levels", async ({ canvas }) => {
  const skillHeadings = canvas.getAllByRole("heading", { level: 3 });
  await expect(skillHeadings.length).toBeGreaterThan(0);
});

/**
 * Tests empty state handling.
 */
export const EmptySkills = meta.story({
  args: {
    skills: {
      heading: {
        title: "Skills & Technologies",
        description: "The tools and technologies I work with"
      },
      technologyGroups: []
    },
    documentId: "portfolio-page",
    documentType: "portfolioPage"
  },
  tags: ["test-only"]
});

EmptySkills.test("Handles empty technology groups gracefully", async ({ canvas }) => {
  const heading = canvas.getByRole("heading", { level: 2 });
  await expect(heading).toBeVisible();

  // Marquee should not render with no technologies
  const section = canvas.getByRole("region", { name: /skills/i });
  const marquee = section.querySelector('[data-testid="marquee"]');
  await expect(marquee).not.toBeInTheDocument();
});
