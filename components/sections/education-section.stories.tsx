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
export const Default = meta.story({});
Default.test("Renders all education information correctly", async ({ canvas, step, args }) => {
  await step("Verify section heading is visible", async () => {
    const heading = canvas.getByRole("heading", { name: args.education?.heading?.title ?? "", level: 2 });
    await expect(heading).toBeVisible();
  });

  await step("Verify education card is present", async () => {
    const educationList = args.education?.education ?? [];
    if (educationList.length > 0) {
      const firstEdu = educationList[0];
      if (firstEdu && firstEdu.institution) {
        const institution = canvas.getByText(firstEdu.institution);
        await expect(institution).toBeVisible();
      }
    }
  });
});

/**
 * Tests accordion interaction for achievements section.
 * Verifies achievements can be expanded and collapsed.
 */
export const AchievementsAccordion = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, step, userEvent }) => {
    await step("Verify achievements accordion trigger is present", async () => {
      const achievementsTrigger = canvas.getByRole("button", { name: /Key Achievements/i });
      await expect(achievementsTrigger).toBeVisible();
      await expect(achievementsTrigger).toHaveAttribute("aria-expanded", "false");
    });

    await step("Click to expand achievements", async () => {
      const achievementsTrigger = canvas.getByRole("button", { name: /Key Achievements/i });
      await userEvent.click(achievementsTrigger);

      await waitFor(
        async () => {
          await expect(achievementsTrigger).toHaveAttribute("aria-expanded", "true");
        },
        { timeout: 2000 }
      );
    });

    await step("Verify achievements content is visible when expanded", async () => {
      await waitFor(
        async () => {
          const achievementText = canvas.getAllByRole("listitem")[0];
          await expect(achievementText).toBeVisible();
        },
        { timeout: 2000 }
      );
    });

    await step("Click to collapse achievements", async () => {
      const achievementsTrigger = canvas.getByRole("button", { name: /Key Achievements/i });
      await userEvent.click(achievementsTrigger);

      await waitFor(
        async () => {
          await expect(achievementsTrigger).toHaveAttribute("aria-expanded", "false");
        },
        { timeout: 2000 }
      );
    });
  }
});

/**
 * Tests accordion interaction for coursework section.
 * Verifies coursework can be expanded and collapsed.
 */
export const CourseworkAccordion = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, step, userEvent }) => {
    await step("Verify coursework accordion trigger is present", async () => {
      const courseworkTrigger = canvas.getByRole("button", { name: /Relevant Coursework/i });
      await expect(courseworkTrigger).toBeVisible();
      await expect(courseworkTrigger).toHaveAttribute("aria-expanded", "false");
    });

    await step("Click to expand coursework", async () => {
      const courseworkTrigger = canvas.getByRole("button", { name: /Relevant Coursework/i });
      await userEvent.click(courseworkTrigger);

      await waitFor(
        async () => {
          await expect(courseworkTrigger).toHaveAttribute("aria-expanded", "true");
        },
        { timeout: 2000 }
      );
    });

    await step("Verify coursework content is visible when expanded", async () => {
      await waitFor(
        async () => {
          const courseworkText = canvas.getAllByRole("listitem")[0];
          await expect(courseworkText).toBeVisible();
        },
        { timeout: 2000 }
      );
    });

    await step("Click to collapse coursework", async () => {
      const courseworkTrigger = canvas.getByRole("button", { name: /Relevant Coursework/i });
      await userEvent.click(courseworkTrigger);

      await waitFor(
        async () => {
          await expect(courseworkTrigger).toHaveAttribute("aria-expanded", "false");
        },
        { timeout: 2000 }
      );
    });
  }
});

/**
 * Tests section heading and description.
 * Verifies proper heading hierarchy and descriptive content.
 */
export const SectionHeadingStructure = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, step, args }) => {
    await step("Verify section has proper heading hierarchy", async () => {
      const mainHeading = canvas.getByRole("heading", { name: args.education?.heading?.title ?? "", level: 2 });
      await expect(mainHeading).toBeVisible();
    });

    await step("Verify section description is present", async () => {
      if (args.education?.heading?.description) {
        const description = canvas.getByText(args.education.heading.description);
        await expect(description).toBeVisible();
      }
    });
  }
});
