import { expect, userEvent, within } from "storybook/test";
import Page from "~/app/(app)/page";
import {
  EXPERIENCES,
  NAVIGATION_ITEMS,
  PERSONAL_INFO,
  PROJECT_CATEGORIES,
  PROJECTS,
  SKILL_GROUPS,
  SOCIAL_LINKS
} from "~/constants";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "App/Home Page",
  component: Page,
  parameters: {
    nextjs: {
      router: {
        pathname: "/"
      }
    },
    layout: "fullscreen"
  }
});

/**
 * Tests the hero section with avatar, name, status, and CTA buttons.
 */
export const HeroSection = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, step }) => {
    await step("Verify avatar is visible", async () => {
      const avatar = canvas.getByRole("img", { name: PERSONAL_INFO.name });
      await expect(avatar).toBeVisible();
    });

    await step("Verify availability status", async () => {
      if (PERSONAL_INFO.isAvailable) {
        const status = canvas.getByText(/available for opportunities/i);
        await expect(status).toBeVisible();
      }
    });

    await step("Verify main heading with name", async () => {
      const heading = canvas.getByRole("heading", { level: 1 });
      await expect(heading).toBeVisible();
    });

    await step("Verify tagline", async () => {
      const tagline = canvas.getByText(PERSONAL_INFO.tagline);
      await expect(tagline).toBeVisible();
    });

    await step("Verify CTA buttons", async () => {
      const getInTouchButton = canvas.getByRole("button", { name: /get in touch/i });
      await expect(getInTouchButton).toBeVisible();

      const viewProjectsButton = canvas.getByRole("button", { name: /view projects/i });
      await expect(viewProjectsButton).toBeVisible();
    });
  }
});

/**
 * Tests the about section with bio and stats.
 */
export const AboutSection = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, step }) => {
    await step("Verify about section heading", async () => {
      const heading = canvas.getByRole("heading", { name: /about me/i, level: 2 });
      await expect(heading).toBeVisible();
    });

    await step("Verify section description", async () => {
      const description = canvas.getByText(/get to know me a little better/i);
      await expect(description).toBeVisible();
    });
  }
});

/**
 * Tests the skills section with all skill groups.
 */
export const SkillsSection = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, step }) => {
    await step("Verify skills section heading", async () => {
      const heading = canvas.getByRole("heading", { name: /skills.*technologies/i, level: 2 });
      await expect(heading).toBeVisible();
    });

    await step(`Verify all ${SKILL_GROUPS.length} skill groups are present`, async () => {
      for (const group of SKILL_GROUPS) {
        const groupLabel = canvas.getByText(group.label, { exact: true });
        await expect(groupLabel).toBeVisible();
      }
    });
  }
});

/**
 * Tests the projects section with categories and project cards.
 */
export const ProjectsSection = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, step }) => {
    await step("Verify projects section heading", async () => {
      const heading = canvas.getByRole("heading", { name: /featured projects/i, level: 2 });
      await expect(heading).toBeVisible();
    });

    await step(`Verify all ${PROJECT_CATEGORIES.length} category tabs`, async () => {
      for (const category of PROJECT_CATEGORIES) {
        const tab = canvas.getByRole("tab", { name: category.label });
        await expect(tab).toBeVisible();
      }
    });

    await step("Verify featured projects are displayed", async () => {
      const featuredProjects = PROJECTS.filter((p) => p.featured);
      for (const project of featuredProjects.slice(0, 3)) {
        const titles = canvas.getAllByText(project.title, { exact: true });
        await expect(titles[0]).toBeVisible();
      }
    });
  }
});

/**
 * Tests project category tab switching.
 */
export const ProjectCategoryTabSwitching = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, step }) => {
    await step("Click on Mobile category tab", async () => {
      const mobileTab = canvas.getByRole("tab", { name: /mobile/i });
      await userEvent.click(mobileTab);

      // Check that mobile projects are shown
      const mobileProjects = PROJECTS.filter((p) => p.category === "mobile");
      if (mobileProjects.length > 0 && mobileProjects[0]) {
        const titles = canvas.getAllByText(mobileProjects[0].title, { exact: true });
        await expect(titles[0]).toBeVisible();
      }
    });

    await step("Click on Open Source category tab", async () => {
      const ossTab = canvas.getByRole("tab", { name: /open source/i });
      await userEvent.click(ossTab);

      // Check that OSS projects are shown
      const ossProjects = PROJECTS.filter((p) => p.category === "oss");
      if (ossProjects.length > 0 && ossProjects[0]) {
        const titles = canvas.getAllByText(ossProjects[0].title, { exact: true });
        await expect(titles[0]).toBeVisible();
      }
    });
  }
});

/**
 * Tests the experience section with timeline.
 */
export const ExperienceSection = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, step }) => {
    await step("Verify experience section heading", async () => {
      const heading = canvas.getByRole("heading", { name: /experience/i, level: 2 });
      await expect(heading).toBeVisible();
    });

    await step("Verify first experience entry", async () => {
      const firstExp = EXPERIENCES[0];
      if (firstExp) {
        const role = canvas.getByText(firstExp.role, { exact: true });
        await expect(role).toBeVisible();

        const companies = canvas.getAllByText(firstExp.company, { exact: false });
        await expect(companies[0]).toBeVisible();
      }
    });

    await step("Verify experience accordion functionality", async () => {
      const accordionTriggers = canvas.getAllByRole("button", { name: /key responsibilities/i });
      const firstTrigger = accordionTriggers[0];
      await expect(firstTrigger).toBeVisible();

      // Click to expand
      if (firstTrigger) {
        await userEvent.click(firstTrigger);
      }

      // Check content is visible
      const firstExp = EXPERIENCES[0];
      if (firstExp && firstExp.responsibilities[0]) {
        const responsibility = canvas.getByText(firstExp.responsibilities[0], { exact: false });
        await expect(responsibility).toBeVisible();
      }
    });
  }
});

/**
 * Tests the contact section with form and social links.
 */
export const ContactSection = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, step }) => {
    await step("Verify contact section heading", async () => {
      const heading = canvas.getByRole("heading", { name: /get in touch/i, level: 2 });
      await expect(heading).toBeVisible();
    });

    await step("Verify contact form fields", async () => {
      const nameInput = canvas.getByLabelText(/name/i);
      await expect(nameInput).toBeVisible();

      const emailInput = canvas.getByLabelText(/email/i);
      await expect(emailInput).toBeVisible();

      const messageInput = canvas.getByLabelText(/message/i);
      await expect(messageInput).toBeVisible();

      const submitButton = canvas.getByRole("button", { name: /send message/i });
      await expect(submitButton).toBeVisible();
    });

    await step(`Verify ${SOCIAL_LINKS.length} social links`, async () => {
      for (const link of SOCIAL_LINKS) {
        const socialLink = canvas.getByRole("button", { name: new RegExp(link.platform, "i") });
        await expect(socialLink).toBeVisible();
      }
    });
  }
});

/**
 * Tests contact form validation.
 */
export const ContactFormValidation = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, step }) => {
    await step("Submit empty form and check validation", async () => {
      const submitButton = canvas.getByRole("button", { name: /send message/i });
      await userEvent.click(submitButton);

      // Check for validation error messages
      const nameError = canvas.queryByText(/name must be at least/i);
      await expect(nameError).toBeInTheDocument();
    });

    await step("Fill valid data and submit", async () => {
      const nameInput = canvas.getByLabelText(/name/i);
      await userEvent.clear(nameInput);
      await userEvent.type(nameInput, "Test User");

      const emailInput = canvas.getByLabelText(/email/i);
      await userEvent.clear(emailInput);
      await userEvent.type(emailInput, "test@example.com");

      const messageInput = canvas.getByLabelText(/message/i);
      await userEvent.clear(messageInput);
      await userEvent.type(messageInput, "This is a test message with enough characters.");

      const submitButton = canvas.getByRole("button", { name: /send message/i });
      await userEvent.click(submitButton);
    });
  }
});

/**
 * Tests navigation links.
 */
export const NavigationLinks = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, step }) => {
    await step("Verify all navigation links are present", async () => {
      const nav = within(canvas.getByRole("navigation"));

      for (const item of NAVIGATION_ITEMS) {
        const link = nav.getByRole("link", { name: item.label });
        await expect(link).toBeVisible();
        await expect(link).toHaveAttribute("href", item.href);
      }
    });

    await step("Verify theme toggle button", async () => {
      const themeToggle = canvas.getByRole("button", { name: /toggle theme/i });
      await expect(themeToggle).toBeVisible();
    });
  }
});

/**
 * Tests the footer section.
 */
export const FooterSection = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, step }) => {
    await step("Verify footer content", async () => {
      const footer = within(canvas.getByRole("contentinfo"));

      // Author name
      const authorName = footer.getByText(PERSONAL_INFO.name);
      await expect(authorName).toBeVisible();

      // Current year
      const currentYear = new Date().getFullYear().toString();
      const yearElement = footer.getByText(currentYear);
      await expect(yearElement).toBeVisible();
    });
  }
});

/**
 * Tests page structure and accessibility.
 */
export const PageStructureAndAccessibility = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, step }) => {
    await step("Verify heading hierarchy", async () => {
      // H1 - Main page heading
      const h1 = canvas.getByRole("heading", { level: 1 });
      await expect(h1).toBeVisible();

      // H2 - Section headings
      const h2Headings = canvas.getAllByRole("heading", { level: 2 });
      await expect(h2Headings.length).toBeGreaterThanOrEqual(5);
    });

    await step("Verify main content structure", async () => {
      const main = canvas.getByRole("main");
      await expect(main).toBeVisible();

      const footer = canvas.getByRole("contentinfo");
      await expect(footer).toBeVisible();

      const nav = canvas.getByRole("navigation");
      await expect(nav).toBeVisible();
    });

    await step("Verify external links have proper security attributes", async () => {
      // Check GitHub link in projects
      const githubButtons = canvas.getAllByRole("button", { name: /code/i });
      if (githubButtons.length > 0 && githubButtons[0]) {
        await expect(githubButtons[0]).toHaveAttribute("target", "_blank");
        await expect(githubButtons[0]).toHaveAttribute("rel", expect.stringContaining("noreferrer"));
      }
    });
  }
});
