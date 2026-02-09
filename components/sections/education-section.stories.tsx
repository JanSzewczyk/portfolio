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
  const achievementsTrigger = canvas.queryByRole("button", { name: /Key Achievements/i });

  if (!achievementsTrigger) {
    return; // Skip if no achievements accordion present
  }

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
        const achievementText = canvas.getAllByRole("listitem")[0];
        await expect(achievementText).toBeVisible();
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
  const courseworkTrigger = canvas.queryByRole("button", { name: /Relevant Coursework/i });

  if (!courseworkTrigger) {
    return; // Skip if no coursework accordion present
  }

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
