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
  overrides: { name: "React", icon: "SiReact" }
});
const testTech2 = technologyBuilder.one({
  overrides: { name: "TypeScript", icon: "SiTypescript" }
});
const testTech3 = technologyBuilder.one({
  overrides: { name: "Node.js", icon: "SiNodedotjs" }
});

const testProject = projectBuilder.one({
  overrides: {
    title: "Test Project",
    description: "A test project description",
    technologies: [testTech1, testTech2],
    links: () => ({
      live: "https://example.com",
      github: "https://github.com/test/repo",
      npm: null
    })
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
          technologies: [testTech3],
          links: () => ({
            live: null,
            github: "https://github.com/test/oss",
            npm: null
          })
        }
      })
    ]
  }
});

const meta = preview.meta({
  title: "Components/Sections/Projects Section",
  component: ProjectsSection,
  args: {
    projects: {
      heading: {
        title: "Featured Work",
        description: "A collection of projects I've worked on"
      },
      projectGroups: [testGroup1, testGroup2]
    },
    documentId: "test-portfolio-page-id",
    documentType: "portfolioPage"
  },
  parameters: {
    layout: "fullscreen"
  }
});

// Story named after component
export const ProjectsSection_ = meta.story({});

// Test: Renders section heading
ProjectsSection_.test("Renders section heading with title and description", async ({ canvas, args }) => {
  const heading = canvas.getByRole("heading", {
    level: 2,
    name: args.projects?.heading?.title ?? ""
  });
  await expect(heading).toBeVisible();

  if (args.projects?.heading?.description) {
    const description = canvas.getByText(args.projects.heading.description);
    await expect(description).toBeVisible();
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
      if (firstTech && firstTech.name) {
        const techBadge = canvas.getByText(firstTech.name);
        await expect(techBadge).toBeVisible();
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
  name: "With Full Portfolio Data",
  args: {
    projects: portfolioPageProjectsBuilder.one(),
    documentId: portfolioPageBuilder.one()._id,
    documentType: "portfolioPage"
  }
});

// Story: Empty State
export const EmptyState = meta.story({
  name: "Empty State",
  args: {
    projects: {
      heading: {
        title: "My Projects",
        description: "Check out what I've been working on"
      },
      projectGroups: []
    },
    documentId: "test-portfolio-page-id",
    documentType: "portfolioPage"
  }
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
