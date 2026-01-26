import { expect, waitFor } from "storybook/test";

import { ExperienceSection } from "./experience-section";

import { EXPERIENCES } from "~/constants/portfolio";
import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Sections/Experience Section",
  component: ExperienceSection,
  args: {
    experiences: EXPERIENCES
  },
  parameters: {
    layout: "fullscreen"
  }
});

export const ExperienceSectionDefault = meta.story({ name: "Experience Section" });

// Test 1: Section renders with heading
ExperienceSectionDefault.test("Renders section heading and description", async ({ canvas }) => {
  const heading = canvas.getByRole("heading", { name: /experience/i, level: 2 });
  await expect(heading).toBeVisible();

  const description = canvas.getByText(/my professional journey/i);
  await expect(description).toBeVisible();
});

// Test 2: All experiences are rendered
ExperienceSectionDefault.test("Renders all experience items", async ({ canvas, args }) => {
  for (const exp of args.experiences) {
    const roleElement = canvas.getByText(exp.role);
    await expect(roleElement).toBeVisible();

    const companyName = canvas.getByText(exp.company);
    await expect(companyName).toBeVisible();
  }
});

// Test 3: Company logo fallback (first letter) is displayed
ExperienceSectionDefault.test("Displays company logo fallback with first letter", async ({ canvas, args }) => {
  for (const exp of args.experiences) {
    if (!exp.companyLogo) {
      const firstLetter = exp.company.charAt(0).toUpperCase();
      const fallbackLogo = canvas.getByText(firstLetter, { selector: "span" });
      await expect(fallbackLogo).toBeVisible();
    }
  }
});

// Test 4: Company URLs are clickable
ExperienceSectionDefault.test("Company links are clickable and open in new tab", async ({ canvas, args }) => {
  for (const exp of args.experiences) {
    if (exp.companyUrl) {
      const link = canvas.getByRole("link", { name: exp.company });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute("href", exp.companyUrl);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  }
});

// Test 5: Period badges are displayed correctly
ExperienceSectionDefault.test("Displays period and employment type badges", async ({ canvas }) => {
  const periodBadges = canvas.getAllByText(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/);
  const firstPeriodBadge = periodBadges[0];

  if (!firstPeriodBadge) {
    throw new Error("Period badge not found");
  }

  await expect(firstPeriodBadge).toBeVisible();

  const typeBadges = canvas.getAllByText(/full-time/i);
  const firstTypeBadge = typeBadges[0];

  if (!firstTypeBadge) {
    throw new Error("Employment type badge not found");
  }

  await expect(firstTypeBadge).toBeVisible();
});

// Test 6: Accordion for responsibilities works
ExperienceSectionDefault.test("Expands responsibilities accordion", async ({ canvas, userEvent }) => {
  const responsibilitiesButtons = canvas.getAllByRole("button", { name: /key responsibilities/i });
  const firstButton = responsibilitiesButtons[0];

  if (!firstButton) {
    throw new Error("Responsibilities button not found");
  }

  await expect(firstButton).toBeVisible();
  await userEvent.click(firstButton);

  // Wait for accordion to expand and content to become visible
  await waitFor(() => {
    const firstResponsibility = canvas.getByText(/architecting scalable react/i);
    expect(firstResponsibility).toBeVisible();
  });
});

// Test 7: Technologies are displayed
ExperienceSectionDefault.test("Displays technology badges", async ({ canvas }) => {
  const reactBadges = canvas.getAllByText(/react/i);
  const firstReactBadge = reactBadges[0];

  if (!firstReactBadge) {
    throw new Error("React badge not found");
  }

  await expect(firstReactBadge).toBeVisible();

  const nextjsBadges = canvas.getAllByText(/next\.js/i);
  const firstNextjsBadge = nextjsBadges[0];

  if (!firstNextjsBadge) {
    throw new Error("Next.js badge not found");
  }

  await expect(firstNextjsBadge).toBeVisible();
});

// Story with logo URLs
export const WithCompanyLogos = meta.story({
  name: "Experience Section with Company Logos",
  args: {
    experiences: EXPERIENCES.map((exp) => ({
      ...exp,
      companyLogo: "https://via.placeholder.com/40"
    }))
  }
});

// Test 8: Logo images are displayed when provided
WithCompanyLogos.test("Displays company logo images", async ({ canvas, args }) => {
  const images = canvas.getAllByRole("img");
  await expect(images.length).toBeGreaterThan(0);

  for (const exp of args.experiences) {
    const logo = canvas.getByAltText(`${exp.company} logo`);
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute("src");
  }
});

// Story with mixed logos (some with URLs, some without)
export const MixedLogos = meta.story({
  name: "Mixed Company Logos",
  args: {
    experiences: EXPERIENCES.map((exp, index) => ({
      ...exp,
      companyLogo: index % 2 === 0 ? "https://via.placeholder.com/40" : undefined
    }))
  }
});

// Test 9: Mixed logos display correctly
MixedLogos.test("Displays both logo images and fallbacks", async ({ canvas, args }) => {
  for (const exp of args.experiences) {
    if (exp.companyLogo) {
      const logo = canvas.getByAltText(`${exp.company} logo`);
      await expect(logo).toBeVisible();
    } else {
      const firstLetter = exp.company.charAt(0).toUpperCase();
      const fallback = canvas.getByText(firstLetter, { selector: "span" });
      await expect(fallback).toBeVisible();
    }
  }
});
