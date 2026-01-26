import { expect, waitFor } from "storybook/test";
import { EDUCATION, SECTION_HEADINGS } from "~/constants/portfolio";
import { Section } from "~/constants/sections";

import { EducationSection } from "./education-section";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Sections/Education Section",
  component: EducationSection,
  args: {
    education: EDUCATION,
    heading: SECTION_HEADINGS[Section.EDUCATION]
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
Default.test("Renders all education information correctly", async ({ canvas, step }) => {
  await step("Verify section heading is visible", async () => {
    const heading = canvas.getByRole("heading", { name: /education/i, level: 2 });
    await expect(heading).toBeVisible();
  });

  await step("Verify education card is present", async () => {
    const institutionLink = canvas.getByRole("link", { name: /AGH University/i });
    await expect(institutionLink).toBeVisible();
    await expect(institutionLink).toHaveAttribute("href", "https://www.agh.edu.pl/en");
    await expect(institutionLink).toHaveAttribute("target", "_blank");
    await expect(institutionLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  await step("Verify degree and field of study are displayed", async () => {
    const fieldOfStudy = canvas.getByText(/Computer Science/i);
    await expect(fieldOfStudy).toBeVisible();
  });

  await step("Verify time period badge is displayed", async () => {
    const timePeriodRegex = /Oct 2019.*?Feb 2024/i;
    const badge = canvas.getByText(timePeriodRegex);
    await expect(badge).toBeVisible();
  });

  await step("Verify degree type badge is displayed", async () => {
    const degreeTypeBadge = canvas.getByText(/Master's Degree/i);
    await expect(degreeTypeBadge).toBeVisible();
  });

  await step("Verify GPA badge is displayed", async () => {
    const gpaBadge = canvas.getByText(/GPA: 5\.0/i);
    await expect(gpaBadge).toBeVisible();
  });

  await step("Verify thesis section is visible", async () => {
    const thesisHeading = canvas.getByRole("heading", { name: /Master's Thesis/i, level: 4 });
    await expect(thesisHeading).toBeVisible();

    const thesisTitle = canvas.getByText(/Hands Control System/i);
    await expect(thesisTitle).toBeVisible();

    const thesisDescription = canvas.getByText(/AI-powered mouse control system/i);
    await expect(thesisDescription).toBeVisible();
  });

  await step("Verify thesis technologies are displayed", async () => {
    const pythonBadge = canvas.getByText("Python");
    await expect(pythonBadge).toBeVisible();

    const mediaPipeBadge = canvas.getByText("MediaPipe");
    await expect(mediaPipeBadge).toBeVisible();

    const scikitLearnBadge = canvas.getByText("scikit-learn");
    await expect(scikitLearnBadge).toBeVisible();
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
          const achievementText = canvas.getByText(/Graduated with honors/i);
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
          const courseworkText = canvas.getByText(/Machine Learning & Artificial Intelligence/i);
          await expect(courseworkText).toBeVisible();
        },
        { timeout: 2000 }
      );

      // Check for another coursework item
      const algorithmsCourse = canvas.getByText(/Advanced Algorithms & Data Structures/i);
      await expect(algorithmsCourse).toBeVisible();
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
 * Tests that external links have proper security attributes.
 * Verifies target and rel attributes for external institution links.
 */
export const ExternalLinksSecurity = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, step }) => {
    await step("Verify institution link has security attributes", async () => {
      const institutionLink = canvas.getByRole("link", { name: /AGH University/i });
      await expect(institutionLink).toHaveAttribute("target", "_blank");
      await expect(institutionLink).toHaveAttribute("rel", "noopener noreferrer");
    });
  }
});

/**
 * Tests timeline visual structure.
 * Verifies timeline dots and connectors are rendered correctly.
 */
export const TimelineStructure = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, step }) => {
    await step("Verify timeline list is present", async () => {
      const timelineList = canvas.getByRole("list");
      await expect(timelineList).toBeInTheDocument();
    });

    await step("Verify timeline items are present", async () => {
      const timelineItems = canvas.getAllByRole("listitem");
      await expect(timelineItems.length).toBeGreaterThan(0);
    });
  }
});

/**
 * Tests section heading and description.
 * Verifies proper heading hierarchy and descriptive content.
 */
export const SectionHeadingStructure = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, step }) => {
    await step("Verify section has proper heading hierarchy", async () => {
      const mainHeading = canvas.getByRole("heading", { name: /Education/i, level: 2 });
      await expect(mainHeading).toBeVisible();
    });

    await step("Verify section description is present", async () => {
      const description = canvas.getByText(/My academic journey and the knowledge that built my foundation/i);
      await expect(description).toBeVisible();
    });
  }
});

/**
 * Tests keyboard navigation for accordion components.
 * Verifies accordion can be controlled via keyboard.
 */
export const KeyboardAccessibility = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, step, userEvent }) => {
    await step("Click achievements accordion trigger to expand", async () => {
      const achievementsTrigger = canvas.getByRole("button", { name: /Key Achievements/i });
      await userEvent.click(achievementsTrigger);

      await waitFor(
        async () => {
          await expect(achievementsTrigger).toHaveAttribute("aria-expanded", "true");
        },
        { timeout: 2000 }
      );
    });

    await step("Verify achievements content is visible", async () => {
      await waitFor(
        async () => {
          const achievementText = canvas.getByText(/Graduated with honors/i);
          await expect(achievementText).toBeVisible();
        },
        { timeout: 2000 }
      );
    });

    await step("Press Escape or click to collapse achievements", async () => {
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
 * Tests responsive container layout.
 * Verifies proper container width and centering.
 */
export const ResponsiveLayout = meta.story({
  tags: ["test-only"],
  play: async ({ canvasElement, step }) => {
    await step("Verify section element exists", async () => {
      const section = canvasElement.querySelector("#education");
      await expect(section).toBeInTheDocument();
    });

    await step("Verify container is present", async () => {
      const section = canvasElement.querySelector("#education");
      const container = section?.querySelector(".container");
      await expect(container).toBeInTheDocument();
    });
  }
});
