import { expect, waitFor } from "storybook/test";
import { portfolioPageEducationBuilder } from "~/tests/builders/portfolio-page.builder";

import { EducationSection } from "./education-section";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Sections/Education Section",
  component: EducationSection,
  args: {
    education: portfolioPageEducationBuilder.one(),
    documentId: "test-portfolio-id",
    documentType: "portfolioPage"
  },
  parameters: {
    layout: "fullscreen"
  }
});

/**
 * Default story showing the EducationSection component with full education data.
 * Displays timeline with education history, thesis information, achievements, and coursework.
 */
export const EducationSection_ = meta.story({});

// Test: Section heading
EducationSection_.test("Renders section heading with title and description", async ({ canvas, args }) => {
  const heading = canvas.getByRole("heading", { name: args.education?.heading?.title ?? "", level: 2 });
  await expect(heading).toBeVisible();

  if (args.education?.heading?.description) {
    const description = canvas.getByText(args.education.heading.description);
    await expect(description).toBeVisible();
  }
});

// Test: Education card
EducationSection_.test("Displays education institution and details", async ({ canvas, args }) => {
  const educationList = args.education?.education ?? [];

  if (educationList.length > 0) {
    const firstEdu = educationList[0];
    if (firstEdu?.institution) {
      const institution = canvas.getByText(firstEdu.institution);
      await expect(institution).toBeVisible();
    }
  }
});

// Test: Accordion expand/collapse for achievements
// Using play function because this is a multi-step user flow
EducationSection_.test("Expands and collapses achievements accordion", async ({ canvas, step, userEvent }) => {
  const achievementsTriggers = canvas.queryAllByRole("button", { name: /Key Achievements/i });

  if (achievementsTriggers.length === 0) {
    return; // Skip if no achievements accordion present
  }

  // Test the first achievements accordion
  const achievementsTrigger = achievementsTriggers[0];

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
    // Wait for accordion content to expand and list items to be visible
    await waitFor(
      async () => {
        // Query for list items within the accordion content
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

// Test: Accordion expand/collapse for coursework
EducationSection_.test("Expands and collapses coursework accordion", async ({ canvas, step, userEvent }) => {
  const courseworkTriggers = canvas.queryAllByRole("button", { name: /Relevant Coursework/i });

  if (courseworkTriggers.length === 0) {
    return; // Skip if no coursework accordion present
  }

  // Test the first coursework accordion
  const courseworkTrigger = courseworkTriggers[0];

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
