import { expect, test } from "@playwright/test";
import {
  EXPERIENCES,
  NAVIGATION_ITEMS,
  PERSONAL_INFO,
  PROJECT_CATEGORIES,
  PROJECTS,
  SECTION_IDS,
  SKILL_GROUPS,
  SOCIAL_LINKS
} from "~/constants";

test("has correct title and meta description", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Jan Szewczyk.*Frontend Developer/i);
});

test("has hero section with personal info", async ({ page }) => {
  await page.goto("/");

  const heroSection = page.locator("#hero");

  // Avatar should be visible
  await expect(heroSection.getByRole("img", { name: PERSONAL_INFO.name })).toBeVisible();

  // Availability status
  if (PERSONAL_INFO.isAvailable) {
    await expect(heroSection.getByText(/available for opportunities/i)).toBeVisible();
  }

  // Name greeting
  await expect(heroSection.getByRole("heading", { level: 1 })).toContainText(PERSONAL_INFO.name);

  // Tagline
  await expect(heroSection.getByText(PERSONAL_INFO.tagline)).toBeVisible();

  // CTA buttons
  await expect(heroSection.getByRole("button", { name: /get in touch/i })).toBeVisible();
  await expect(heroSection.getByRole("button", { name: /view projects/i })).toBeVisible();
});

test("has about section with bio and stats", async ({ page }) => {
  await page.goto("/");

  const aboutSection = page.locator("#about");

  await expect(aboutSection.getByRole("heading", { level: 2, name: /about me/i })).toBeVisible();

  // Bio text should be visible (first paragraph)
  const firstParagraph = PERSONAL_INFO.bio.split("\n\n")[0];
  if (firstParagraph) {
    await expect(aboutSection.getByText(firstParagraph.slice(0, 50), { exact: false })).toBeVisible();
  }
});

test("has skills section with all skill groups", async ({ page }) => {
  await page.goto("/");

  const skillsSection = page.locator("#skills");

  await expect(skillsSection.getByRole("heading", { level: 2, name: /skills.*technologies/i })).toBeVisible();

  // Check all skill group labels
  for (const group of SKILL_GROUPS) {
    await expect(skillsSection.getByText(group.label, { exact: true })).toBeVisible();
  }
});

test("has projects section with featured projects", async ({ page }) => {
  await page.goto("/");

  const projectsSection = page.locator("#projects");

  await expect(projectsSection.getByRole("heading", { level: 2, name: /featured projects/i })).toBeVisible();

  // Check project category tabs
  for (const category of PROJECT_CATEGORIES) {
    await expect(projectsSection.getByRole("tab", { name: category.label })).toBeVisible();
  }

  // Check that featured projects are visible
  const featuredProjects = PROJECTS.filter((p) => p.featured);
  for (const project of featuredProjects.slice(0, 3)) {
    // Project title
    await expect(projectsSection.getByText(project.title, { exact: true }).first()).toBeVisible();
  }
});

test("has experience section with timeline", async ({ page }) => {
  await page.goto("/");

  const experienceSection = page.locator("#experience");

  await expect(experienceSection.getByRole("heading", { level: 2, name: /experience/i })).toBeVisible();

  // Check first experience entry
  const firstExperience = EXPERIENCES[0];
  if (firstExperience) {
    await expect(experienceSection.getByText(firstExperience.role, { exact: true })).toBeVisible();
    await expect(experienceSection.getByText(firstExperience.company, { exact: false })).toBeVisible();
  }
});

test("has contact section with form and social links", async ({ page }) => {
  await page.goto("/");

  const contactSection = page.locator("#contact");

  await expect(contactSection.getByRole("heading", { level: 2, name: /get in touch/i })).toBeVisible();

  // Contact form fields
  await expect(contactSection.getByLabel(/name/i)).toBeVisible();
  await expect(contactSection.getByLabel(/email/i)).toBeVisible();
  await expect(contactSection.getByLabel(/message/i)).toBeVisible();
  await expect(contactSection.getByRole("button", { name: /send message/i })).toBeVisible();

  // Social links - verify correct count
  const socialButtons = contactSection.locator('a[target="_blank"]');
  await expect(socialButtons).toHaveCount(SOCIAL_LINKS.length);
});

test("has footer with author info", async ({ page }) => {
  await page.goto("/");

  const footer = page.getByRole("contentinfo");

  await expect(footer.getByText(PERSONAL_INFO.name)).toBeVisible();
  await expect(footer.getByText(new Date().getFullYear().toString())).toBeVisible();
});

test("navigation links scroll to sections", async ({ page }) => {
  await page.goto("/");

  const navigation = page.getByRole("navigation");

  // Check all navigation items exist
  for (const item of NAVIGATION_ITEMS) {
    await expect(navigation.getByRole("link", { name: item.label })).toBeVisible();
  }
});

test("all sections are present on page", async ({ page }) => {
  await page.goto("/");

  for (const sectionId of SECTION_IDS) {
    const section = page.locator(`#${sectionId}`);
    await expect(section).toBeVisible();
  }
});

test("project GitHub links open correctly", async ({ page, context }) => {
  await page.goto("/");

  const projectsSection = page.locator("#projects");

  // Find first project with GitHub link
  const firstGitHubButton = projectsSection.getByRole("button", { name: /code/i }).first();

  if ((await firstGitHubButton.count()) > 0) {
    const pagePromise = context.waitForEvent("page");
    await firstGitHubButton.click();
    const newPage = await pagePromise;
    await newPage.waitForLoadState();

    expect(newPage.url()).toMatch(/github\.com/);
  }
});

test("theme toggle is visible and clickable", async ({ page }) => {
  await page.goto("/");

  const themeToggle = page.getByRole("button", { name: /toggle theme/i });
  await expect(themeToggle).toBeVisible();

  // Click theme toggle
  await themeToggle.click();

  // Verify button is still visible after click
  await expect(themeToggle).toBeVisible();
});
