import { expect } from "storybook/test";
import { portfolioPageAboutBuilder } from "~/tests/builders/portfolio-page.builder";

import { AboutSection as AboutSectionComponent } from "./about-section";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Sections/About Section",
  component: AboutSectionComponent,
  args: {
    about: portfolioPageAboutBuilder.one(),
    documentId: "test-portfolio-id",
    documentType: "portfolioPage"
  },
  parameters: {
    layout: "fullscreen"
  }
});

export const AboutSection = meta.story({});

AboutSection.test("Renders section heading with title and description", async ({ canvas, args }) => {
  const heading = canvas.getByRole("heading", { level: 2 });
  await expect(heading).toBeVisible();
  await expect(heading).toHaveTextContent(args.about?.heading?.title ?? "");

  if (args.about?.heading?.description) {
    const description = canvas.getByText(args.about.heading.description);
    await expect(description).toBeVisible();
  }
});

AboutSection.test("Renders bio paragraphs", async ({ canvas, args }) => {
  const bioParagraphs = args.about?.bio?.split("\n\n") ?? [];

  for (const paragraph of bioParagraphs) {
    const text = canvas.getByText(paragraph);
    await expect(text).toBeVisible();
  }
});

AboutSection.test("Renders all stats with counting numbers", async ({ canvas, args }) => {
  const stats = args.about?.stats ?? [];

  for (const stat of stats) {
    if (stat.label) {
      const label = canvas.getByText(stat.label);
      await expect(label).toBeVisible();
    }
  }

  await expect(stats.length).toBe(4);
});

export const EmptyBio = meta.story({
  args: {
    about: portfolioPageAboutBuilder.one({
      overrides: {
        bio: ""
      }
    })
  }
});

EmptyBio.test("Handles empty bio gracefully", async ({ canvas }) => {
  const section = canvas.getByRole("region");
  await expect(section).toBeVisible();
});

export const NoStats = meta.story({
  args: {
    about: portfolioPageAboutBuilder.one({
      overrides: {
        stats: []
      }
    })
  }
});

NoStats.test("Handles empty stats array", async ({ canvas }) => {
  const section = canvas.getByRole("region");
  await expect(section).toBeVisible();
});
