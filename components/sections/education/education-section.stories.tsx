import { expect, waitFor } from "storybook/test";
import preview from "~/.storybook/preview";
import { educationBuilder, portfolioPageEducationBuilder } from "~/tests/builders/portfolio-page.builder";
import { EducationSection } from "./education-section";

const meta = preview.meta({
  args: {
    documentId: "test-portfolio-id",
    documentType: "portfolioPage",
    education: portfolioPageEducationBuilder.one({
      overrides: {
        education: [
          educationBuilder.one({
            overrides: {
              achievements: () => ["Graduated with honors", "Published research paper"],
              coursework: () => ["Distributed Systems", "Advanced Algorithms", "Machine Learning"],
              degree: "Master's Degree",
              endDate: "2020-06-30",
              fieldOfStudy: "Computer Science",
              grade: "4.0",
              institution: "Warsaw University of Technology",
              institutionUrl: "https://www.pw.edu.pl",
              location: "Warsaw, Poland",
              startDate: "2018-10-01",
              thesis: null
            }
          })
        ],
        heading: {
          description: "My academic background and achievements",
          title: "Education"
        }
      }
    })
  },
  component: EducationSection,
  parameters: {
    layout: "fullscreen"
  },
  title: "Components/Sections/Education Section"
});

export const EducationSectionStory = meta.story({
  name: "Education Section"
});

// Test: Section heading
EducationSectionStory.test("Renders section heading with title and description", async ({ canvas }) => {
  const label = canvas.getByText("Education");
  await expect(label).toBeVisible();

  const heading = canvas.getByRole("heading", {
    level: 2,
    name: "My academic background and achievements"
  });
  await expect(heading).toBeVisible();
});

// Test: Education card
EducationSectionStory.test("Displays education institution and field of study", async ({ canvas }) => {
  const institution = canvas.getByText("Warsaw University of Technology");
  await expect(institution).toBeVisible();

  const fieldOfStudy = canvas.getByText("Computer Science");
  await expect(fieldOfStudy).toBeVisible();
});

// Test: Accordion expand/collapse for achievements
EducationSectionStory.test("Expands and collapses achievements accordion", async ({ canvas, step, userEvent }) => {
  const achievementsTrigger = canvas.getByRole("button", {
    name: /Key Achievements/i
  });

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
        const regions = canvas.getAllByRole("region");
        await expect(regions[0]).toBeVisible();
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
EducationSectionStory.test("Expands and collapses coursework accordion", async ({ canvas, step, userEvent }) => {
  const courseworkTrigger = canvas.getByRole("button", {
    name: /Relevant Coursework/i
  });

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
