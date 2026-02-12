import { expect, test } from "@playwright/test";
import {
  EDUCATION,
  EXPERIENCES,
  PERSONAL_INFO,
  PROJECT_CATEGORIES,
  PROJECTS,
  SKILL_GROUPS,
  SOCIAL_LINKS
} from "~/constants";
import { NAV_ITEMS } from "~/constants/navigation";
import { Section } from "~/constants/sections";

test.describe("Page Metadata", () => {
  test("has correct title", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Jan Szewczyk.*Frontend Developer/i);
  });
});

test.describe("Navigation", () => {
  test("displays all navigation buttons", async ({ page }) => {
    await page.goto("/");

    for (const item of NAV_ITEMS) {
      const button = page.getByRole("button", { name: item.label });
      await expect(button).toBeVisible();
    }
  });

  test("displays personal name as logo link", async ({ page }) => {
    await page.goto("/");

    const logoLink = page.getByRole("link", { name: PERSONAL_INFO.name });
    await expect(logoLink).toBeVisible();
    await expect(logoLink).toHaveAttribute("href", "/");
  });

  test("theme toggle is visible and clickable", async ({ page }) => {
    await page.goto("/");

    const themeToggle = page.getByRole("button", { name: /current.*theme/i });
    await expect(themeToggle).toBeVisible();

    await themeToggle.click();

    await expect(themeToggle).toBeVisible();
  });
});

test.describe("Hero Section", () => {
  test("displays personal info with avatar and greeting", async ({ page }) => {
    await page.goto("/");

    const heroSection = page.locator(`#${Section.HERO}`);

    // Avatar
    await expect(heroSection.getByRole("img", { name: PERSONAL_INFO.name })).toBeVisible();

    // Name in heading
    await expect(heroSection.getByRole("heading", { level: 1 })).toContainText(PERSONAL_INFO.name);

    // Tagline
    await expect(heroSection.getByText(PERSONAL_INFO.tagline)).toBeVisible();
  });

  test("shows availability status", async ({ page }) => {
    await page.goto("/");

    const heroSection = page.locator(`#${Section.HERO}`);

    if (PERSONAL_INFO.isAvailable) {
      await expect(heroSection.getByText(/available for opportunities/i)).toBeVisible();
    }
  });

  test("renders CTA buttons", async ({ page }) => {
    await page.goto("/");

    const heroSection = page.locator(`#${Section.HERO}`);

    await expect(heroSection.getByRole("button", { name: /get in touch/i })).toBeVisible();
    await expect(heroSection.getByRole("button", { name: /view projects/i })).toBeVisible();
  });
});

test.describe("About Section", () => {
  test("has heading and bio text", async ({ page }) => {
    await page.goto("/");

    const aboutSection = page.locator(`#${Section.ABOUT}`);

    await expect(aboutSection.getByRole("heading", { level: 2, name: /about me/i })).toBeVisible();

    const firstParagraph = PERSONAL_INFO.bio.split("\n\n")[0];
    if (firstParagraph) {
      await expect(aboutSection.getByText(firstParagraph.slice(0, 50), { exact: false })).toBeVisible();
    }
  });
});

test.describe("Skills Section", () => {
  test("has heading and all skill groups", async ({ page }) => {
    await page.goto("/");

    const skillsSection = page.locator(`#${Section.SKILLS}`);

    await expect(skillsSection.getByRole("heading", { level: 2, name: /skills.*technologies/i })).toBeVisible();

    for (const group of SKILL_GROUPS) {
      await expect(skillsSection.getByText(group.label, { exact: true })).toBeVisible();
    }
  });
});

test.describe("Projects Section", () => {
  test("has heading and category tabs", async ({ page }) => {
    await page.goto("/");

    const projectsSection = page.locator(`#${Section.PROJECTS}`);

    await expect(projectsSection.getByRole("heading", { level: 2, name: /featured projects/i })).toBeVisible();

    for (const category of PROJECT_CATEGORIES) {
      await expect(projectsSection.getByRole("tab", { name: category.label })).toBeVisible();
    }
  });

  test("displays featured projects", async ({ page }) => {
    await page.goto("/");

    const projectsSection = page.locator(`#${Section.PROJECTS}`);

    const featuredProjects = PROJECTS.filter((p) => p.featured);
    for (const project of featuredProjects.slice(0, 3)) {
      await expect(projectsSection.getByText(project.title, { exact: true }).first()).toBeVisible();
    }
  });

  test("GitHub links open correctly", async ({ page, context }) => {
    await page.goto("/");

    const projectsSection = page.locator(`#${Section.PROJECTS}`);

    const firstGitHubButton = projectsSection.getByRole("button", { name: /code/i }).first();

    if ((await firstGitHubButton.count()) > 0) {
      const pagePromise = context.waitForEvent("page");
      await firstGitHubButton.click();
      const newPage = await pagePromise;
      await newPage.waitForLoadState();

      expect(newPage.url()).toMatch(/github\.com/);
    }
  });
});

test.describe("Experience Section", () => {
  test("has heading and first experience entry", async ({ page }) => {
    await page.goto("/");

    const experienceSection = page.locator(`#${Section.EXPERIENCE}`);

    await expect(experienceSection.getByRole("heading", { level: 2, name: /experience/i })).toBeVisible();

    const firstExperience = EXPERIENCES[0];
    if (firstExperience) {
      await expect(experienceSection.getByText(firstExperience.role, { exact: true })).toBeVisible();
      await expect(experienceSection.getByText(firstExperience.company, { exact: false })).toBeVisible();
    }
  });
});

test.describe("Education Section", () => {
  test("has heading", async ({ page }) => {
    await page.goto("/");

    const educationSection = page.locator(`#${Section.EDUCATION}`);

    await expect(educationSection).toBeVisible();
    await expect(educationSection.getByRole("heading", { level: 2, name: /education/i })).toBeVisible();
  });

  test("displays education entries with degree and institution", async ({ page }) => {
    await page.goto("/");

    const educationSection = page.locator(`#${Section.EDUCATION}`);

    for (const edu of EDUCATION) {
      await expect(educationSection.getByText(edu.fieldOfStudy, { exact: true })).toBeVisible();
      await expect(educationSection.getByText(edu.institution, { exact: false }).first()).toBeVisible();
      await expect(educationSection.getByText(edu.degree).first()).toBeVisible();
    }
  });

  test("displays GPA badges", async ({ page }) => {
    await page.goto("/");

    const educationSection = page.locator(`#${Section.EDUCATION}`);

    for (const edu of EDUCATION) {
      await expect(educationSection.getByText(`GPA: ${edu.grade}`)).toBeVisible();
    }
  });
});

test.describe("Contact Section", () => {
  test("has heading and contact form", async ({ page }) => {
    await page.goto("/");

    const contactSection = page.locator(`#${Section.CONTACT}`);

    await expect(contactSection.getByRole("heading", { level: 2, name: /get in touch/i })).toBeVisible();

    // Contact form fields
    await expect(contactSection.getByLabel(/name/i)).toBeVisible();
    await expect(contactSection.getByLabel(/email/i)).toBeVisible();
    await expect(contactSection.getByLabel(/message/i)).toBeVisible();
    await expect(contactSection.getByRole("button", { name: /send message/i })).toBeVisible();
  });

  test("has social links", async ({ page }) => {
    await page.goto("/");

    const contactSection = page.locator(`#${Section.CONTACT}`);

    const socialButtons = contactSection.locator('a[target="_blank"]');
    await expect(socialButtons).toHaveCount(SOCIAL_LINKS.length);
  });
});

test.describe("Footer", () => {
  test("has author name and current year", async ({ page }) => {
    await page.goto("/");

    const footer = page.getByRole("contentinfo");

    await expect(footer.getByText(PERSONAL_INFO.name)).toBeVisible();
    await expect(footer.getByText(new Date().getFullYear().toString())).toBeVisible();
  });
});

test.describe("All Sections Present", () => {
  test("every section is visible on page", async ({ page }) => {
    await page.goto("/");

    const allSections = Object.values(Section);

    for (const sectionId of allSections) {
      const section = page.locator(`#${sectionId}`);
      await expect(section).toBeVisible();
    }
  });
});
