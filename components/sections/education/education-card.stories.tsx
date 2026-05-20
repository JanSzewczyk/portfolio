import { expect, waitFor } from "storybook/test";
import preview from "~/.storybook/preview";
import { educationBuilder, technologyBuilder } from "~/tests/builders/portfolio-page.builder";
import { EducationCard, type EducationCardProps } from "./education-card";

const meta = preview.meta({
  title: "Components/Sections/Education/Education Card",
  component: EducationCard,
  parameters: {
    layout: "centered"
  },
  decorators: [
    (Story) => (
      <div className="w-120">
        <Story />
      </div>
    )
  ]
});

/**
 * Full education card with thesis, related project links, achievements, and coursework.
 */
export const WithThesisAndProject = meta.story({
  args: {
    education: educationBuilder.one({
      overrides: {
        institution: "Warsaw University of Technology",
        institutionUrl: "https://www.pw.edu.pl",
        location: "Warsaw, Poland",
        degree: "Master's Degree",
        fieldOfStudy: "Computer Science",
        startDate: "2018-10-01",
        endDate: "2020-06-30",
        grade: "4.0",
        thesis: () => ({
          title: "Real-time Collaborative Code Editor Using CRDTs",
          description:
            "Design and implementation of a real-time collaborative code editing platform leveraging Conflict-free Replicated Data Types for consistency.",
          technologies: [
            technologyBuilder.one({
              overrides: { name: "TypeScript", icon: "SiTypescript" }
            }),
            technologyBuilder.one({
              overrides: { name: "React", icon: "SiReact" }
            }),
            technologyBuilder.one({
              overrides: { name: "Node.js", icon: "SiNodedotjs" }
            })
          ],
          project: {
            _id: "project-1",
            title: "CollabCode",
            description: "A real-time collaborative code editor with syntax highlighting and multi-cursor support.",
            technologies: [
              technologyBuilder.one({
                overrides: { name: "TypeScript", icon: "SiTypescript" }
              }),
              technologyBuilder.one({
                overrides: { name: "Next.js", icon: "SiNextdotjs" }
              }),
              technologyBuilder.one({
                overrides: { name: "Tailwind CSS", icon: "SiTailwindcss" }
              })
            ],
            links: {
              live: "https://collabcode.example.com",
              github: "https://github.com/example/collabcode",
              npm: undefined
            }
          },
          url: "https://example.com/thesis.pdf"
        }),
        achievements: () => [
          "Graduated with honors (summa cum laude)",
          "Published research paper at IEEE Conference",
          "Received Dean's Scholarship for academic excellence"
        ],
        coursework: () => [
          "Distributed Systems",
          "Advanced Algorithms",
          "Machine Learning",
          "Software Architecture",
          "Computer Networks"
        ]
      }
    }) as EducationCardProps["education"]
  }
});

WithThesisAndProject.test("Renders institution and field of study", async ({ canvas }) => {
  const title = canvas.getByText("Computer Science");
  await expect(title).toBeVisible();

  const institution = canvas.getByText("Warsaw University of Technology");
  await expect(institution).toBeVisible();
});

WithThesisAndProject.test("Renders thesis section with title and description", async ({ canvas }) => {
  const thesisHeading = canvas.getByRole("heading", {
    name: "Thesis",
    level: 3
  });
  await expect(thesisHeading).toBeVisible();

  const thesisTitle = canvas.getByText("Real-time Collaborative Code Editor Using CRDTs");
  await expect(thesisTitle).toBeVisible();
});

WithThesisAndProject.test("Renders related project with icon action buttons", async ({ canvas }) => {
  const projectHeading = canvas.getByText("Related Project");
  await expect(projectHeading).toBeVisible();

  const projectTitle = canvas.getByText("CollabCode");
  await expect(projectTitle).toBeVisible();

  const projectDescription = canvas.getByText(
    "A real-time collaborative code editor with syntax highlighting and multi-cursor support."
  );
  const liveButton = canvas.getByRole("link", {
    name: "Open live project"
  });
  const codeButton = canvas.getByRole("link", { name: "Open source code" });
  const thesisButton = canvas.getByRole("link", {
    name: "Open thesis document"
  });

  await expect(liveButton).toBeVisible();
  await expect(codeButton).toBeVisible();
  await expect(thesisButton).toBeVisible();
  await expect(canvas.queryByRole("link", { name: /^Live$/ })).not.toBeInTheDocument();
  await expect(canvas.queryByRole("link", { name: /^Code$/ })).not.toBeInTheDocument();
  await expect(canvas.queryByRole("link", { name: /^Thesis$/ })).not.toBeInTheDocument();
  await expect(projectDescription.compareDocumentPosition(liveButton) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
});

WithThesisAndProject.test("Project links have correct href values", async ({ canvas }) => {
  const liveButton = canvas.getByRole("link", {
    name: "Open live project"
  });
  const codeButton = canvas.getByRole("link", { name: "Open source code" });
  const thesisButton = canvas.getByRole("link", {
    name: "Open thesis document"
  });

  await expect(liveButton).toHaveAttribute("href", "https://collabcode.example.com");
  await expect(codeButton).toHaveAttribute("href", "https://github.com/example/collabcode");
  await expect(thesisButton).toHaveAttribute("href", "https://example.com/thesis.pdf");
});

WithThesisAndProject.test("Renders GPA badge", async ({ canvas }) => {
  const gpaBadge = canvas.getByText("GPA: 4.0");
  await expect(gpaBadge).toBeVisible();
});

WithThesisAndProject.test(
  "Renders project technology badges (preferred over thesis technologies)",
  async ({ canvas }) => {
    await expect(canvas.getByText("TypeScript")).toBeVisible();
    await expect(canvas.getByText("Next.js")).toBeVisible();
    await expect(canvas.getByText("Tailwind CSS")).toBeVisible();
  }
);

/**
 * Education card with thesis but without a related project — only thesis URL button shown.
 */
export const ThesisWithoutProject = meta.story({
  args: {
    education: educationBuilder.one({
      overrides: {
        institution: "AGH University of Science and Technology",
        institutionUrl: "https://www.agh.edu.pl",
        location: "Krakow, Poland",
        degree: "Bachelor's Degree",
        fieldOfStudy: "Software Engineering",
        startDate: "2015-10-01",
        endDate: "2018-06-30",
        grade: "3.8",
        thesis: () => ({
          title: "Automated Testing Framework for React Applications",
          description: "Design of a testing framework combining unit, integration, and visual regression testing.",
          technologies: [
            technologyBuilder.one({
              overrides: { name: "React", icon: "SiReact" }
            }),
            technologyBuilder.one({
              overrides: { name: "Vitest", icon: "SiVitest" }
            })
          ],
          project: null,
          url: "https://example.com/bachelor-thesis.pdf"
        }),
        achievements: () => ["Best thesis award in Software Engineering department"],
        coursework: () => ["Object-Oriented Programming", "Databases", "Web Development"]
      }
    }) as EducationCardProps["education"]
  }
});

ThesisWithoutProject.test("Renders thesis URL button without related project section", async ({ canvas }) => {
  const thesisButton = canvas.getByRole("link", {
    name: "Open thesis document"
  });
  await expect(thesisButton).toBeVisible();
  await expect(thesisButton).toHaveAttribute("href", "https://example.com/bachelor-thesis.pdf");

  const projectHeading = canvas.queryByText("Related Project");
  await expect(projectHeading).not.toBeInTheDocument();
});

ThesisWithoutProject.test("Does not render Live or Code buttons", async ({ canvas }) => {
  const liveButton = canvas.queryByRole("link", {
    name: "Open live project"
  });
  const codeButton = canvas.queryByRole("link", {
    name: "Open source code"
  });

  await expect(liveButton).not.toBeInTheDocument();
  await expect(codeButton).not.toBeInTheDocument();
});

/**
 * Education card without thesis, GPA, or optional sections — minimal display.
 */
export const MinimalCard = meta.story({
  args: {
    education: educationBuilder.one({
      overrides: {
        institution: "Online University",
        institutionUrl: null,
        location: null,
        degree: "Bachelor's Degree",
        fieldOfStudy: "Information Technology",
        startDate: "2020-01-01",
        endDate: undefined,
        grade: null,
        thesis: null,
        achievements: null,
        coursework: null
      }
    }) as EducationCardProps["education"]
  }
});

MinimalCard.test("Renders without thesis section", async ({ canvas }) => {
  const thesisHeading = canvas.queryByText("Thesis");
  await expect(thesisHeading).not.toBeInTheDocument();
});

MinimalCard.test("Does not render GPA badge when grade is null", async ({ canvas }) => {
  const gpaBadge = canvas.queryByText(/GPA:/);
  await expect(gpaBadge).not.toBeInTheDocument();
});

MinimalCard.test("Renders 'Present' for ongoing education", async ({ canvas }) => {
  const period = canvas.getByText(/Present/);
  await expect(period).toBeVisible();
});

MinimalCard.test("Renders institution as plain text without link", async ({ canvas }) => {
  const institution = canvas.getByText("Online University");
  await expect(institution).toBeVisible();
  await expect(institution.closest("a")).toBeNull();
});

/**
 * Education card with thesis project that has only a GitHub link (no live demo or thesis URL).
 */
export const ProjectGithubOnly = meta.story({
  args: {
    education: educationBuilder.one({
      overrides: {
        institution: "MIT",
        institutionUrl: "https://www.mit.edu",
        location: "Cambridge, USA",
        degree: "Ph.D.",
        fieldOfStudy: "Computer Science",
        startDate: "2016-09-01",
        endDate: "2021-06-30",
        grade: "3.9",
        thesis: () => ({
          title: "Neural Architecture Search for Edge Computing",
          description: "Optimizing neural network architectures for deployment on resource-constrained edge devices.",
          technologies: [
            technologyBuilder.one({
              overrides: { name: "Python", icon: "SiPython" }
            })
          ],
          project: {
            _id: "project-2",
            title: "EdgeNAS",
            description: "Neural Architecture Search toolkit optimized for edge deployment.",
            technologies: [
              technologyBuilder.one({
                overrides: { name: "Python", icon: "SiPython" }
              })
            ],
            links: {
              live: undefined,
              github: "https://github.com/example/edgenas",
              npm: undefined
            }
          },
          url: null
        }),
        achievements: () => ["Published 3 papers in top-tier ML conferences"],
        coursework: null
      }
    }) as EducationCardProps["education"]
  }
});

ProjectGithubOnly.test("Renders only source code icon button when only GitHub link exists", async ({ canvas }) => {
  const codeButton = canvas.getByRole("link", { name: "Open source code" });
  await expect(codeButton).toBeVisible();

  const liveButton = canvas.queryByRole("link", {
    name: "Open live project"
  });
  const thesisButton = canvas.queryByRole("link", {
    name: "Open thesis document"
  });
  await expect(liveButton).not.toBeInTheDocument();
  await expect(thesisButton).not.toBeInTheDocument();
});

/**
 * Education card with accordion sections expanded to test interaction.
 */
export const AccordionInteraction = meta.story({
  tags: ["test-only"],
  args: {
    education: educationBuilder.one({
      overrides: {
        thesis: null,
        grade: "3.5",
        achievements: () => ["Dean's List for 4 consecutive semesters", "Hackathon winner 2019"],
        coursework: () => ["Data Structures", "Algorithms", "Operating Systems"]
      }
    }) as EducationCardProps["education"]
  }
});

AccordionInteraction.test("Expands and collapses achievements accordion", async ({ canvas, step, userEvent }) => {
  const trigger = canvas.getByRole("button", { name: /Key Achievements/i });

  await step("Initially collapsed", async () => {
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  await step("Expand", async () => {
    await userEvent.click(trigger);
    await waitFor(
      async () => {
        await expect(trigger).toHaveAttribute("aria-expanded", "true");
      },
      { timeout: 2000 }
    );
  });

  await step("Content visible", async () => {
    await waitFor(
      async () => {
        const region = canvas.getAllByRole("region")[0];
        await expect(region).toBeVisible();
      },
      { timeout: 2000 }
    );
  });

  await step("Collapse", async () => {
    await userEvent.click(trigger);
    await waitFor(
      async () => {
        await expect(trigger).toHaveAttribute("aria-expanded", "false");
      },
      { timeout: 2000 }
    );
  });
});

AccordionInteraction.test("Expands and collapses coursework accordion", async ({ canvas, step, userEvent }) => {
  const trigger = canvas.getByRole("button", {
    name: /Relevant Coursework/i
  });

  await step("Initially collapsed", async () => {
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  await step("Expand", async () => {
    await userEvent.click(trigger);
    await waitFor(
      async () => {
        await expect(trigger).toHaveAttribute("aria-expanded", "true");
      },
      { timeout: 2000 }
    );
  });

  await step("Collapse", async () => {
    await userEvent.click(trigger);
    await waitFor(
      async () => {
        await expect(trigger).toHaveAttribute("aria-expanded", "false");
      },
      { timeout: 2000 }
    );
  });
});
