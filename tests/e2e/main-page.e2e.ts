import { expect, test } from "@playwright/test";

const SECTIONS = ["hero", "about", "skills", "projects", "experience", "education", "contact"] as const;

test("page structure, navigation and metadata", async ({ page }) => {
  await page.goto("/");

  // Page title
  await expect(page).toHaveTitle(/Jan Szewczyk/i);

  // All sections present
  for (const id of SECTIONS) {
    await expect(page.locator(`#${id}`)).toBeVisible();
  }

  // Navigation buttons
  const navLabels = ["Home", "About", "Skills", "Projects", "Experience", "Education", "Contact"];
  for (const label of navLabels) {
    await expect(page.getByRole("button", { exact: true, name: label })).toBeVisible();
  }

  // Logo link
  const logoLink = page.getByRole("banner").getByRole("link").first();
  await expect(logoLink).toBeVisible();
  await expect(logoLink).toHaveAttribute("href", "/");

  // Theme toggle
  const themeToggle = page.getByRole("button", { name: /current.*theme/i });
  await expect(themeToggle).toBeVisible();
  await themeToggle.click();
  await expect(themeToggle).toBeVisible();

  // Footer
  const footer = page.getByRole("contentinfo");
  await expect(footer).toBeVisible();
  await expect(footer.getByText(new Date().getFullYear().toString())).toBeVisible();
});

test("all sections display correct content", async ({ page }) => {
  await page.goto("/");

  // --- Hero ---
  const hero = page.locator("#hero");
  await expect(hero.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(hero.getByRole("img").first()).toBeVisible();
  await expect(hero.getByRole("button", { name: /get in touch/i })).toBeVisible();
  await expect(hero.getByRole("button", { name: /view projects/i })).toBeVisible();

  // --- About ---
  const about = page.locator("#about");
  await expect(about.getByRole("heading", { level: 2 })).toBeVisible();

  // --- Skills ---
  const skills = page.locator("#skills");
  await expect(skills.getByRole("heading", { level: 2 })).toBeVisible();

  // --- Projects ---
  const projects = page.locator("#projects");
  await expect(projects.getByRole("heading", { level: 2 })).toBeVisible();
  await expect(projects.getByRole("tablist")).toBeVisible();
  await expect(projects.getByRole("tab").first()).toBeVisible();

  // --- Experience ---
  const experience = page.locator("#experience");
  await expect(experience.getByRole("heading", { level: 2 })).toBeVisible();

  // --- Education ---
  const education = page.locator("#education");
  await expect(education.getByRole("heading", { level: 2 })).toBeVisible();

  // --- Contact ---
  const contact = page.locator("#contact");
  await expect(contact.getByRole("heading", { level: 2 })).toBeVisible();
  await expect(contact.getByLabel(/name/i)).toBeVisible();
  await expect(contact.getByLabel(/email/i)).toBeVisible();
  await expect(contact.getByLabel(/message/i)).toBeVisible();
  await expect(contact.getByRole("button", { name: /send message/i })).toBeVisible();
  await expect(contact.locator('a[target="_blank"]').first()).toBeVisible();
});

test("project GitHub links open correctly", async ({ page, context }) => {
  await page.goto("/");

  // Per spec FR6, GitHub links moved into the project details dialog.
  // Open the first card via its user-facing "View details" affordance, then verify the
  // GitHub link inside the dialog.
  await page.locator("#projects").getByText("View details").first().click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();

  const githubLink = dialog.getByRole("link", { name: /view source/i }).first();
  if ((await githubLink.count()) > 0) {
    const pagePromise = context.waitForEvent("page");
    await githubLink.click();
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    expect(newPage.url()).toMatch(/^https?:\/\/(?:www\.)?github\.com(?:[:/?#]|$)/i);
  }
});
