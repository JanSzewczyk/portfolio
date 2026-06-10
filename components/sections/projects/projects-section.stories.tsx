import { expect } from "storybook/test";
import preview from "~/.storybook/preview";
import { ProjectsSection } from "~/components/sections";
import {
  portfolioPageBuilder,
  portfolioPageProjectsBuilder,
  projectBuilder,
  projectGroupBuilder,
  technologyBuilder
} from "~/tests/builders/portfolio-page.builder";

// Create deterministic test data to avoid flaky tests
const testTech1 = technologyBuilder.one({
  overrides: { icon: "SiReact", name: "React" }
});
const testTech2 = technologyBuilder.one({
  overrides: { icon: "SiTypescript", name: "TypeScript" }
});
const testTech3 = technologyBuilder.one({
  overrides: { icon: "SiNodedotjs", name: "Node.js" }
});

const testProject = projectBuilder.one({
  overrides: {
    description: "A test project description",
    links: () => ({
      github: "https://github.com/test/repo",
      live: "https://example.com",
      npm: null
    }),
    technologies: [testTech1, testTech2],
    title: "Test Project"
  }
});

const testGroup1 = projectGroupBuilder.one({
  overrides: {
    label: "Featured Projects",
    projects: [testProject]
  }
});

const testGroup2 = projectGroupBuilder.one({
  overrides: {
    label: "Open Source",
    projects: [
      projectBuilder.one({
        overrides: {
          links: () => ({
            github: "https://github.com/test/oss",
            live: null,
            npm: null
          }),
          technologies: [testTech3]
        }
      })
    ]
  }
});

const meta = preview.meta({
  args: {
    documentId: "test-portfolio-page-id",
    documentType: "portfolioPage",
    projects: {
      heading: {
        description: "A collection of projects I've worked on",
        title: "Featured Work"
      },
      projectGroups: [testGroup1, testGroup2]
    }
  },
  component: ProjectsSection,
  parameters: {
    layout: "fullscreen"
  },
  title: "Components/Sections/Projects Section"
});

// Story named after component
export const ProjectsSection_ = meta.story({});

// Test: Renders section heading
ProjectsSection_.test("Renders section heading with title and description", async ({ canvas, args }) => {
  if (args.projects?.heading?.title) {
    const label = canvas.getByText(args.projects.heading.title);
    await expect(label).toBeVisible();
  }

  if (args.projects?.heading?.description) {
    const heading = canvas.getByRole("heading", {
      level: 2,
      name: args.projects.heading.description
    });
    await expect(heading).toBeVisible();
  }
});

// Test: Renders tabs for project groups
ProjectsSection_.test("Renders project group tabs", async ({ canvas, args }) => {
  const tabList = canvas.getByRole("tablist");
  await expect(tabList).toBeVisible();

  const firstGroup = args.projects?.projectGroups?.[0];
  if (firstGroup?.label) {
    const firstTab = canvas.getByRole("tab", {
      name: new RegExp(firstGroup.label, "i")
    });
    await expect(firstTab).toBeVisible();
  }
});

// Test: Displays projects in the first group by default
ProjectsSection_.test("Displays projects from the first project group", async ({ canvas, args }) => {
  const firstGroup = args.projects?.projectGroups?.[0];
  const firstProject = firstGroup?.projects?.[0];

  if (firstProject?.title) {
    const projectTitle = canvas.getByText(firstProject.title);
    await expect(projectTitle).toBeVisible();
  }
});

// Test: Project cards display correct information
ProjectsSection_.test("Project cards display title, description, and technologies", async ({ canvas, args }) => {
  const firstGroup = args.projects?.projectGroups?.[0];
  const firstProject = firstGroup?.projects?.[0];

  if (firstProject) {
    if (firstProject.title) {
      const title = canvas.getByText(firstProject.title);
      await expect(title).toBeVisible();
    }

    if (firstProject.description) {
      const description = canvas.getByText(firstProject.description);
      await expect(description).toBeVisible();
    }

    if (firstProject.technologies && firstProject.technologies.length > 0) {
      const firstTech = firstProject.technologies[0];
      if (firstTech?.name) {
        // BadgeOverflow renders items twice (hidden measurement div + visible area)
        const techBadges = canvas.getAllByText(firstTech.name);
        await expect(techBadges.length).toBeGreaterThan(0);
      }
    }
  }
});

// Test: Links render when available — use getByRole("link") since Button asChild renders <a>
ProjectsSection_.test("Renders live and GitHub links when available", async ({ canvas, args }) => {
  const firstGroup = args.projects?.projectGroups?.[0];
  const firstProject = firstGroup?.projects?.[0];

  if (firstProject?.title) {
    const projectTitle = canvas.getByText(firstProject.title);
    await expect(projectTitle).toBeVisible();

    if (firstProject.links?.live) {
      const liveLink = canvas.getByRole("link", { name: /live/i });
      await expect(liveLink).toBeVisible();
      await expect(liveLink).toHaveAttribute("href", firstProject.links.live);
    }

    if (firstProject.links?.github) {
      const githubLink = canvas.getByRole("link", { name: /code/i });
      await expect(githubLink).toBeVisible();
      await expect(githubLink).toHaveAttribute("href", firstProject.links.github);
    }
  }
});

// Story: With Full Portfolio Data
export const WithFullPortfolioData = meta.story({
  args: {
    documentId: portfolioPageBuilder.one()._id,
    documentType: "portfolioPage",
    projects: portfolioPageProjectsBuilder.one()
  },
  name: "With Full Portfolio Data"
});

// Story: Empty State
export const EmptyState = meta.story({
  args: {
    documentId: "test-portfolio-page-id",
    documentType: "portfolioPage",
    projects: {
      heading: {
        description: "Check out what I've been working on",
        title: "My Projects"
      },
      projectGroups: []
    }
  },
  name: "Empty State"
});

EmptyState.test("Shows empty state when no project groups available", async ({ canvas }) => {
  const tabList = canvas.queryByRole("tablist");

  if (tabList) {
    const projectCards = canvas.queryAllByRole("article");
    await expect(projectCards.length).toBe(0);
  } else {
    await expect(tabList).not.toBeInTheDocument();
  }
});
