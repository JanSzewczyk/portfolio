import { expect } from "storybook/test";
import { portfolioPageBuilder, portfolioPageProjectsBuilder } from "~/tests/builders/portfolio-page.builder";

import { ProjectsSection } from "./projects-section";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Sections/Projects Section",
  component: ProjectsSection,
  args: {
    projects: portfolioPageProjectsBuilder.one(),
    documentId: "test-portfolio-page-id",
    documentType: "portfolioPage"
  },
  parameters: {
    layout: "fullscreen"
  }
});

export const Default = meta.story({ name: "Projects Section" });

// Test: Renders section heading
Default.test("Renders section heading with title and description", async ({ canvas, args }) => {
  const heading = canvas.getByRole("heading", { level: 2, name: args.projects?.heading?.title ?? "" });
  await expect(heading).toBeVisible();

  if (args.projects?.heading?.description) {
    const description = canvas.getByText(args.projects.heading.description);
    await expect(description).toBeVisible();
  }
});

// Test: Renders tabs for categories
Default.test("Renders project category tabs", async ({ canvas }) => {
  const tabList = canvas.getByRole("tablist");
  await expect(tabList).toBeVisible();

  const featuredTab = canvas.getByRole("tab", { name: /featured/i });
  await expect(featuredTab).toBeVisible();
});

// Test: Displays featured projects by default
Default.test("Displays featured projects in the Featured tab", async ({ canvas, args }) => {
  const featuredProjectsCount = args.projects?.featuredProjects?.length ?? 0;

  if (featuredProjectsCount > 0) {
    // Check that at least one project card is visible
    const projectCards = canvas.getAllByRole("article");
    await expect(projectCards.length).toBeGreaterThan(0);
  }
});

// Test: Project cards display correct information
Default.test("Project cards display title, description, and technologies", async ({ canvas, args }) => {
  const firstProject = args.projects?.featuredProjects?.[0];

  if (firstProject) {
    // Check title
    if (firstProject.title) {
      const title = canvas.getByText(firstProject.title);
      await expect(title).toBeVisible();
    }

    // Check description
    if (firstProject.description) {
      const description = canvas.getByText(firstProject.description);
      await expect(description).toBeVisible();
    }

    // Check at least one technology badge is visible
    if (firstProject.technologies && firstProject.technologies.length > 0) {
      const firstTech = firstProject.technologies[0];
      if (firstTech && firstTech.name) {
        const techBadge = canvas.getByText(firstTech.name);
        await expect(techBadge).toBeVisible();
      }
    }
  }
});

// Test: Links render when available
Default.test("Renders live and GitHub links when available", async ({ canvas, args }) => {
  const firstProject = args.projects?.featuredProjects?.[0];

  if (firstProject?.links?.live) {
    const liveLink = canvas.getByRole("link", { name: /live/i });
    await expect(liveLink).toBeVisible();
    await expect(liveLink).toHaveAttribute("href", firstProject.links.live);
  }

  if (firstProject?.links?.github) {
    const githubLink = canvas.getByRole("link", { name: /code/i });
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute("href", firstProject.links.github);
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
      featuredProjects: [],
      allProjects: []
    },
    documentId: "test-portfolio-page-id",
    documentType: "portfolioPage"
  }
});

EmptyState.test("Shows empty state when no projects available", async ({ canvas }) => {
  const tabContent = canvas.getByRole("tabpanel");
  await expect(tabContent).toBeVisible();

  // Should not have any project cards
  const projectCards = canvas.queryAllByRole("article");
  await expect(projectCards.length).toBe(0);
});
