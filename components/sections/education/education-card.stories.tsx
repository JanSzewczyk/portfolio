import { expect, waitFor } from "storybook/test";
import { educationBuilder } from "~/tests/builders/portfolio-page.builder";

import { EducationCard } from "./education-card";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Sections/Education Section/Education Card",
  component: EducationCard,
  args: {
    education: educationBuilder.one()
  },
  parameters: {
    layout: "centered"
  }
});

/**
 * Default story showing the EducationCard component with full education data.
 * Displays period, degree, GPA, institution, location, thesis information, achievements, and coursework.
 */
export const EducationCard_ = meta.story({});

/**
 * Story showing an education card with a Master's Degree and thesis information.
 */
export const WithMastersDegree = meta.story({
  args: {
    education: educationBuilder.one({ overrides: { degree: "Master's Degree" as const } })
  }
});

/**
 * Story showing an education card without GPA information.
 */
export const WithoutGpa = meta.story({
  args: {
    education: educationBuilder.one({ overrides: { grade: null } })
  }
});

/**
 * Story showing an education card without thesis information.
 */
export const WithoutThesis = meta.story({
  args: {
    education: educationBuilder.one({ overrides: { thesis: null } })
  }
});

/**
 * Story showing an education card without institution URL.
 */
export const WithoutInstitutionUrl = meta.story({
  args: {
    education: educationBuilder.one({ overrides: { institutionUrl: null } })
  }
});

/**
 * Story showing an education card without location.
 */
export const WithoutLocation = meta.story({
  args: {
    education: educationBuilder.one({ overrides: { location: null } })
  }
});

/**
 * Story showing an education card without achievements.
 */
export const WithoutAchievements = meta.story({
  args: {
    education: educationBuilder.one({ overrides: { achievements: null } })
  }
});

/**
 * Story showing an education card without coursework.
 */
export const WithoutCoursework = meta.story({
  args: {
    education: educationBuilder.one({ overrides: { coursework: null } })
  }
});

/**
 * Story showing an education card where the education is ongoing (no end date).
 */
export const OngoingEducation = meta.story({
  args: {
    education: educationBuilder.one({
      overrides: {
        degree: "Master's Degree" as const,
        endDate: null,
        grade: "In Progress",
        thesis: null
      }
    })
  }
});

// Test: Period badge displays correctly
EducationCard_.test("Displays period badge with date range", async ({ canvas }) => {
  const periodBadge = canvas.getByText((content) => content.includes("-") && /\w{3}\s\d{4}/.test(content));
  await expect(periodBadge).toBeVisible();
});

// Test: Degree badge displays correctly
EducationCard_.test("Displays degree badge", async ({ canvas, args }) => {
  if (args.education?.degree) {
    const degreeBadge = canvas.getByText(args.education.degree);
    await expect(degreeBadge).toBeVisible();
  }
});

// Test: GPA badge displays when available
EducationCard_.test("Displays GPA badge when available", async ({ canvas, args }) => {
  if (args.education?.grade) {
    const gpaBadge = canvas.getByText((content) => content.includes("GPA"));
    await expect(gpaBadge).toBeVisible();
  }
});

// Test: GPA badge is hidden when not available
WithoutGpa.test("Does not display GPA badge when not available", async ({ canvas }) => {
  const gpaBadge = canvas.queryByText((content) => content.includes("GPA"));
  await expect(gpaBadge).toBeNull();
});

// Test: Field of study title displays
EducationCard_.test("Displays field of study as card title", async ({ canvas, args }) => {
  if (args.education?.fieldOfStudy) {
    const fieldOfStudy = canvas.getByText(args.education.fieldOfStudy);
    await expect(fieldOfStudy).toBeVisible();
  }
});

// Test: Institution displays with link when URL is available
EducationCard_.test("Displays institution with link when URL is available", async ({ canvas, args }) => {
  if (args.education?.institution && args.education.institutionUrl) {
    const institutionLink = canvas.getByRole("link", { name: args.education.institution });
    await expect(institutionLink).toBeVisible();
    await expect(institutionLink).toHaveAttribute("href", args.education.institutionUrl);
    await expect(institutionLink).toHaveAttribute("target", "_blank");
    await expect(institutionLink).toHaveAttribute("rel", "noopener noreferrer");
  }
});

// Test: Institution displays without link when URL is not available
WithoutInstitutionUrl.test("Displays institution without link when URL is not available", async ({ canvas, args }) => {
  if (args.education?.institution) {
    const institutionText = canvas.getByText((content) => content.includes(args.education.institution!));
    await expect(institutionText).toBeVisible();
    const institutionLink = canvas.queryByRole("link", { name: args.education.institution });
    await expect(institutionLink).toBeNull();
  }
});

// Test: Location displays when available
EducationCard_.test("Displays location when available", async ({ canvas, args }) => {
  if (args.education?.location) {
    const location = canvas.getByText((content) => content.includes(args.education.location!));
    await expect(location).toBeVisible();
  }
});

// Test: Location is hidden when not available
WithoutLocation.test("Does not display location when not available", async ({ canvas }) => {
  const locationText = canvas.queryByText((content) => /·/.test(content));
  await expect(locationText).toBeNull();
});

// Test: Thesis section displays when available
EducationCard_.test("Displays thesis section when available", async ({ canvas, args }) => {
  if (args.education?.thesis) {
    const thesisHeading = canvas.getByText("Master's Thesis");
    await expect(thesisHeading).toBeVisible();

    if (args.education.thesis.title) {
      const thesisTitle = canvas.getByText(args.education.thesis.title);
      await expect(thesisTitle).toBeVisible();
    }

    if (args.education.thesis.description) {
      const thesisDescription = canvas.getByText(args.education.thesis.description);
      await expect(thesisDescription).toBeVisible();
    }
  }
});

// Test: Thesis section is hidden when not available
WithoutThesis.test("Does not display thesis section when not available", async ({ canvas }) => {
  const thesisHeading = canvas.queryByText("Master's Thesis");
  await expect(thesisHeading).toBeNull();
});

// Test: Thesis technology badges display when available
WithMastersDegree.test("Displays thesis technology badges when available", async ({ canvas, args }) => {
  if (args.education?.thesis?.technologies && args.education.thesis.technologies.length > 0) {
    const firstTech = args.education.thesis.technologies[0];
    if (firstTech?.name) {
      const techBadge = canvas.getByText(firstTech.name);
      await expect(techBadge).toBeVisible();
    }
  }
});

// Test: Achievements accordion displays when available
EducationCard_.test("Displays achievements accordion when available", async ({ canvas, args }) => {
  if (args.education?.achievements && args.education.achievements.length > 0) {
    const achievementsTrigger = canvas.getByRole("button", { name: /Key Achievements/i });
    await expect(achievementsTrigger).toBeVisible();
  }
});

// Test: Achievements accordion is hidden when not available
WithoutAchievements.test("Does not display achievements accordion when not available", async ({ canvas }) => {
  const achievementsTrigger = canvas.queryByRole("button", { name: /Key Achievements/i });
  await expect(achievementsTrigger).toBeNull();
});

// Test: Expands and collapses achievements accordion
EducationCard_.test("Expands and collapses achievements accordion", async ({ canvas, step, userEvent, args }) => {
  if (!args.education?.achievements || args.education.achievements.length === 0) {
    return;
  }

  const achievementsTrigger = canvas.getByRole("button", { name: /Key Achievements/i });

  await step("Verify accordion is initially collapsed", async () => {
    await expect(achievementsTrigger).toHaveAttribute("aria-expanded", "false");
  });

  await step("Expand achievements", async () => {
    await userEvent.click(achievementsTrigger);

    await waitFor(
      async () => {
        await expect(achievementsTrigger).toHaveAttribute("aria-expanded", "true");
      },
      { timeout: 2000 }
    );
  });

  await step("Verify content is visible", async () => {
    await waitFor(
      async () => {
        const accordionContent = canvas.getAllByRole("region")[0];
        await expect(accordionContent).toBeVisible();
      },
      { timeout: 2000 }
    );
  });

  await step("Collapse achievements", async () => {
    await userEvent.click(achievementsTrigger);

    await waitFor(
      async () => {
        await expect(achievementsTrigger).toHaveAttribute("aria-expanded", "false");
      },
      { timeout: 2000 }
    );
  });
});

// Test: Coursework accordion displays when available
EducationCard_.test("Displays coursework accordion when available", async ({ canvas, args }) => {
  if (args.education?.coursework && args.education.coursework.length > 0) {
    const courseworkTrigger = canvas.getByRole("button", { name: /Relevant Coursework/i });
    await expect(courseworkTrigger).toBeVisible();
  }
});

// Test: Coursework accordion is hidden when not available
WithoutCoursework.test("Does not display coursework accordion when not available", async ({ canvas }) => {
  const courseworkTrigger = canvas.queryByRole("button", { name: /Relevant Coursework/i });
  await expect(courseworkTrigger).toBeNull();
});

// Test: Expands and collapses coursework accordion
EducationCard_.test("Expands and collapses coursework accordion", async ({ canvas, step, userEvent, args }) => {
  if (!args.education?.coursework || args.education.coursework.length === 0) {
    return;
  }

  const courseworkTrigger = canvas.getByRole("button", { name: /Relevant Coursework/i });

  await step("Verify accordion is initially collapsed", async () => {
    await expect(courseworkTrigger).toHaveAttribute("aria-expanded", "false");
  });

  await step("Expand coursework", async () => {
    await userEvent.click(courseworkTrigger);

    await waitFor(
      async () => {
        await expect(courseworkTrigger).toHaveAttribute("aria-expanded", "true");
      },
      { timeout: 2000 }
    );
  });

  await step("Collapse coursework", async () => {
    await userEvent.click(courseworkTrigger);

    await waitFor(
      async () => {
        await expect(courseworkTrigger).toHaveAttribute("aria-expanded", "false");
      },
      { timeout: 2000 }
    );
  });
});

// Test: Displays "Present" when end date is null
OngoingEducation.test("Displays 'Present' when end date is null", async ({ canvas }) => {
  const periodBadge = canvas.getByText((content) => content.includes("Present"));
  await expect(periodBadge).toBeVisible();
});

// Test: Displays grade for ongoing education
OngoingEducation.test("Displays grade for ongoing education", async ({ canvas, args }) => {
  if (args.education?.grade) {
    const gradeBadge = canvas.getByText((content) => content.includes(args.education.grade!));
    await expect(gradeBadge).toBeVisible();
  }
});
