import { expect, screen, waitFor } from "storybook/test";
import preview from "~/.storybook/preview";
import { portfolioPageAboutBuilder } from "~/tests/builders/portfolio-page.builder";
import { AboutSection as AboutSectionComponent } from "./about-section";

const meta = preview.meta({
  args: {
    about: portfolioPageAboutBuilder.one(),
    documentId: "test-portfolio-id",
    documentType: "portfolioPage"
  },
  component: AboutSectionComponent,
  parameters: {
    layout: "fullscreen"
  },
  title: "Components/Sections/About Section"
});

export const AboutSection = meta.story({});

AboutSection.test("Renders section heading with title and description", async ({ canvas, args }) => {
  if (args.about?.heading?.title) {
    const label = canvas.getByText(args.about.heading.title);
    await expect(label).toBeVisible();
  }

  if (args.about?.heading?.description) {
    const heading = canvas.getByRole("heading", {
      level: 2,
      name: args.about.heading.description
    });
    await expect(heading).toBeVisible();
  }
});

AboutSection.test("Renders bio tagline with terminal icon", async ({ canvas, args }) => {
  if (args.about?.bioTagline) {
    const tagline = canvas.getByText(args.about.bioTagline);
    await expect(tagline).toBeVisible();
  }
});

AboutSection.test("Renders bio as markdown", async ({ canvasElement }) => {
  // bold elements rendered from markdown strong syntax (**text**)
  const boldElements = canvasElement.querySelectorAll("strong");
  await expect(boldElements.length).toBeGreaterThan(0);
});

AboutSection.test("Renders all stats labels", async ({ canvas, args }) => {
  const stats = args.about?.stats ?? [];

  for (const stat of stats) {
    if (stat.label) {
      const label = canvas.getByText(stat.label);
      await expect(label).toBeVisible();
    }
  }

  await expect(stats.length).toBe(4);
});

AboutSection.test("Renders location city", async ({ canvas, args }) => {
  const city = args.about?.location?.city;
  if (city) {
    const cityEl = canvas.getByText(city);
    await expect(cityEl).toBeVisible();
  }
});

AboutSection.test("Renders hobbies section label and items", async ({ canvas, args }) => {
  const sectionLabel = args.about?.hobbies?.sectionLabel;
  if (sectionLabel) {
    const label = canvas.getByText(sectionLabel);
    await expect(label).toBeVisible();
  }

  const items = args.about?.hobbies?.items ?? [];
  for (const item of items) {
    if (item.label) {
      const hobbyLabel = canvas.getByText(item.label);
      await expect(hobbyLabel).toBeVisible();
    }
  }
});

AboutSection.test("CV dropdown opens and shows download options", async ({ canvas, userEvent, args }) => {
  const downloads = args.about?.cvDownloads ?? [];
  if (!downloads.length) return;

  const trigger = canvas.getByRole("button", { name: /Download CV/i });
  await expect(trigger).toBeVisible();

  await userEvent.click(trigger);

  for (const item of downloads) {
    if (item.label) {
      // Dropdown content is rendered in a portal, use screen to query outside canvas scope
      // Use waitFor to allow Radix UI animation/transition to complete
      await waitFor(async () => {
        const option = screen.getByText(item.label!);
        await expect(option).toBeVisible();
      });
    }
  }
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

export const NoCvDownloads = meta.story({
  args: {
    about: portfolioPageAboutBuilder.one({
      overrides: {
        cvDownloads: []
      }
    })
  }
});

NoCvDownloads.test("Hides CV dropdown when no downloads configured", async ({ canvas }) => {
  const trigger = canvas.queryByRole("button", { name: /Download CV/i });
  await expect(trigger).toBeNull();
});

export const NoHobbies = meta.story({
  args: {
    about: portfolioPageAboutBuilder.one({
      overrides: {
        hobbies: null
      }
    })
  }
});

NoHobbies.test("Renders gracefully without hobbies", async ({ canvas }) => {
  const section = canvas.getByRole("region");
  await expect(section).toBeVisible();
});
