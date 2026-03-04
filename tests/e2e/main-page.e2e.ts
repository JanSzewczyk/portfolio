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
    await expect(page.getByRole("button", { name: label, exact: true })).toBeVisible();
  }

  // Logo link
  const logoLink = page.getByRole("banner").getByRole("link").first();
  await expect(logoLink).toBeVisible();
  await expect(logoLink).toHaveAttribute("href", "/");

  // Theme toggle
  const themeToggle = page.getByRole("button", { name: /current.*theme/i });
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

test("project GitHub links are configured correctly", async ({ page }) => {
  await page.goto("/");

  const firstGitHubLink = page.locator('#projects a[href*="github.com"]').first();
  await expect(firstGitHubLink).toBeVisible();
  await expect(firstGitHubLink).toHaveAttribute("href", /github\.com/);
  await expect(firstGitHubLink).toHaveAttribute("target", "_blank");
  await expect(firstGitHubLink).toHaveAttribute("rel", /noopener/);
});

test("desktop navigation scrolls to contact section", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Contact", exact: true }).click();
  await expect(page.locator("#contact")).toBeInViewport();
});

test("mobile menu opens, lists items and closes", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");

  const openMenuButton = page.getByRole("button", { name: "Open menu" });
  await openMenuButton.click();

  const closeMenuButton = page.getByRole("button", { name: "Close menu" });
  await expect(closeMenuButton).toBeVisible();

  const aboutButton = page.locator("nav").getByRole("button", { name: "About", exact: true });
  await expect(aboutButton).toBeVisible();

  await closeMenuButton.click();

  await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
});

test("projects tabs switch active state", async ({ page }) => {
  await page.goto("/");

  const projectsSection = page.locator("#projects");
  const featuredTab = projectsSection.getByRole("tab", { name: "Featured" });
  const webAppsTab = projectsSection.getByRole("tab", { name: "Web Apps" });

  await expect(featuredTab).toHaveAttribute("aria-selected", "true");
  await webAppsTab.click();
  await expect(webAppsTab).toHaveAttribute("aria-selected", "true");
  await expect(featuredTab).toHaveAttribute("aria-selected", "false");
});
