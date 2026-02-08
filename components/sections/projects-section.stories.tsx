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

// Story named after component
export const ProjectsSection_ = meta.story({});

// Test: Renders section heading
ProjectsSection_.test("Renders section heading with title and description", async ({ canvas, args }) => {
  const heading = canvas.getByRole("heading", { level: 2, name: args.projects?.heading?.title ?? "" });
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
    const firstTab = canvas.getByRole("tab", { name: new RegExp(firstGroup.label, "i") });
    await expect(firstTab).toBeVisible();
  }
});

// Test: Displays projects in the first group by default
ProjectsSection_.test("Displays projects from the first project group", async ({ canvas, args }) => {
  const firstGroup = args.projects?.projectGroups?.[0];
  const projectsCount = firstGroup?.projects?.length ?? 0;

  if (projectsCount > 0) {
    // Check that at least one project card is visible
    const projectCards = canvas.getAllByRole("article");
    await expect(projectCards.length).toBeGreaterThan(0);
  }
});

// Test: Project cards display correct information
ProjectsSection_.test("Project cards display title, description, and technologies", async ({ canvas, args }) => {
  const firstGroup = args.projects?.projectGroups?.[0];
  const firstProject = firstGroup?.projects?.[0];

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
ProjectsSection_.test("Renders live and GitHub links when available", async ({ canvas, args }) => {
  const firstGroup = args.projects?.projectGroups?.[0];
  const firstProject = firstGroup?.projects?.[0];

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
      projectGroups: []
    },
    documentId: "test-portfolio-page-id",
    documentType: "portfolioPage"
  }
});

EmptyState.test("Shows empty state when no project groups available", async ({ canvas }) => {
  // When no project groups exist, tabs won't render
  const tabList = canvas.queryByRole("tablist");

  if (tabList) {
    // If tabs somehow render, there should be no project cards
    const projectCards = canvas.queryAllByRole("article");
    await expect(projectCards.length).toBe(0);
  } else {
    // No tabs should exist when projectGroups is empty
    await expect(tabList).not.toBeInTheDocument();
  }
});
