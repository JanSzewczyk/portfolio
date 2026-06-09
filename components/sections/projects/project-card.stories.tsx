import { expect } from "storybook/test";
import preview from "~/.storybook/preview";
import { projectBuilder, technologyBuilder } from "~/tests/builders/portfolio-page.builder";
import { ProjectCard, type ProjectCardProps } from "./project-card";

const meta = preview.meta({
  component: ProjectCard,
  decorators: [
    (Story) => (
      <div className="w-100">
        <Story />
      </div>
    )
  ],
  parameters: {
    layout: "centered"
  },
  title: "Components/Project Card"
});

/**
 * ProjectCard with all link types (Live, GitHub, NPM).
 */
export const AllLinks = meta.story({
  args: {
    project: projectBuilder.one({
      overrides: {
        description: "A comprehensive React component library with TypeScript support and modern styling.",
        links: () => ({
          github: "https://github.com/example/design-system",
          live: "https://design-system.example.com",
          npm: "https://www.npmjs.com/package/@example/design-system"
        }),
        title: "Design System"
      }
    }) as ProjectCardProps["project"]
  }
});

AllLinks.test("Renders all three link buttons", async ({ canvas }) => {
  const liveButton = canvas.getByRole("link", { name: /live/i });
  const codeButton = canvas.getByRole("link", { name: /code/i });
  const npmButton = canvas.getByRole("link", { name: /npm/i });

  await expect(liveButton).toBeVisible();
  await expect(codeButton).toBeVisible();
  await expect(npmButton).toBeVisible();
});

AllLinks.test("All buttons have correct security attributes", async ({ canvas }) => {
  const liveButton = canvas.getByRole("link", { name: /live/i });
  const codeButton = canvas.getByRole("link", { name: /code/i });
  const npmButton = canvas.getByRole("link", { name: /npm/i });

  await expect(liveButton).toHaveAttribute("target", "_blank");
  await expect(liveButton).toHaveAttribute("rel", "noopener noreferrer");

  await expect(codeButton).toHaveAttribute("target", "_blank");
  await expect(codeButton).toHaveAttribute("rel", "noopener noreferrer");

  await expect(npmButton).toHaveAttribute("target", "_blank");
  await expect(npmButton).toHaveAttribute("rel", "noopener noreferrer");
});

AllLinks.test("All buttons have correct href values", async ({ canvas }) => {
  const liveButton = canvas.getByRole("link", { name: /live/i });
  const codeButton = canvas.getByRole("link", { name: /code/i });
  const npmButton = canvas.getByRole("link", { name: /npm/i });

  await expect(liveButton).toHaveAttribute("href", "https://design-system.example.com");
  await expect(codeButton).toHaveAttribute("href", "https://github.com/example/design-system");
  await expect(npmButton).toHaveAttribute("href", "https://www.npmjs.com/package/@example/design-system");
});

/**
 * ProjectCard with only NPM link (common for library packages).
 */
export const NpmLinkOnly = meta.story({
  args: {
    project: projectBuilder.one({
      overrides: {
        description: "A lightweight utility library for common JavaScript operations.",
        links: () => ({
          github: null,
          live: null,
          npm: "https://www.npmjs.com/package/@example/utils"
        }),
        title: "Utility Package"
      }
    }) as ProjectCardProps["project"]
  }
});

NpmLinkOnly.test("Renders only NPM button", async ({ canvas }) => {
  const npmButton = canvas.getByRole("link", { name: /npm/i });
  await expect(npmButton).toBeVisible();

  // Live and Code buttons should not be present
  const liveButton = canvas.queryByRole("link", { name: /live/i });
  const codeButton = canvas.queryByRole("link", { name: /code/i });
  await expect(liveButton).not.toBeInTheDocument();
  await expect(codeButton).not.toBeInTheDocument();
});

/**
 * ProjectCard with GitHub and NPM links (common for open source libraries).
 */
export const GithubAndNpm = meta.story({
  args: {
    project: projectBuilder.one({
      overrides: {
        description: "A collection of useful React hooks for modern applications.",
        links: () => ({
          github: "https://github.com/example/react-hooks",
          live: null,
          npm: "https://www.npmjs.com/package/@example/react-hooks"
        }),
        title: "React Hooks Library"
      }
    }) as ProjectCardProps["project"]
  }
});

GithubAndNpm.test("Renders GitHub and NPM buttons", async ({ canvas }) => {
  const codeButton = canvas.getByRole("link", { name: /code/i });
  const npmButton = canvas.getByRole("link", { name: /npm/i });

  await expect(codeButton).toBeVisible();
  await expect(npmButton).toBeVisible();

  // Live button should not be present
  const liveButton = canvas.queryByRole("link", { name: /live/i });
  await expect(liveButton).not.toBeInTheDocument();
});

/**
 * ProjectCard with no NPM link (typical web application).
 */
export const NoNpmLink = meta.story({
  args: {
    project: projectBuilder.one({
      overrides: {
        description: "A modern portfolio website built with Next.js and TypeScript.",
        links: () => ({
          github: "https://github.com/example/portfolio",
          live: "https://portfolio.example.com",
          npm: null
        }),
        title: "Portfolio Website"
      }
    }) as ProjectCardProps["project"]
  }
});

NoNpmLink.test("NPM button is not rendered when npm link is null", async ({ canvas }) => {
  const liveButton = canvas.getByRole("link", { name: /live/i });
  const codeButton = canvas.getByRole("link", { name: /code/i });

  await expect(liveButton).toBeVisible();
  await expect(codeButton).toBeVisible();

  // NPM button should not be present
  const npmButton = canvas.queryByRole("link", { name: /npm/i });
  await expect(npmButton).not.toBeInTheDocument();
});

/**
 * ProjectCard with no links at all.
 */
export const NoLinks = meta.story({
  args: {
    project: projectBuilder.one({
      overrides: {
        description: "An internal tool used for company operations.",
        links: () => ({
          github: null,
          live: null,
          npm: null
        }),
        title: "Internal Tool"
      }
    }) as ProjectCardProps["project"]
  }
});

NoLinks.test("No link buttons are rendered", async ({ canvas }) => {
  const liveButton = canvas.queryByRole("link", { name: /live/i });
  const codeButton = canvas.queryByRole("link", { name: /code/i });
  const npmButton = canvas.queryByRole("link", { name: /npm/i });

  await expect(liveButton).not.toBeInTheDocument();
  await expect(codeButton).not.toBeInTheDocument();
  await expect(npmButton).not.toBeInTheDocument();
});

/**
 * ProjectCard with long content to test layout.
 */
export const LongContent = meta.story({
  args: {
    project: projectBuilder.one({
      overrides: {
        description:
          "A comprehensive, production-ready React component library designed for enterprise applications. Features include full TypeScript support, extensive accessibility features, theme customization, and comprehensive documentation.",
        links: () => ({
          github: "https://github.com/example/components",
          live: "https://components.example.com",
          npm: "https://www.npmjs.com/package/@example/components"
        }),
        title: "Enterprise React Component Library with TypeScript"
      }
    }) as ProjectCardProps["project"]
  }
});

LongContent.test("All buttons remain visible with long content", async ({ canvas }) => {
  const liveButton = canvas.getByRole("link", { name: /live/i });
  const codeButton = canvas.getByRole("link", { name: /code/i });
  const npmButton = canvas.getByRole("link", { name: /npm/i });

  await expect(liveButton).toBeVisible();
  await expect(codeButton).toBeVisible();
  await expect(npmButton).toBeVisible();
});

/**
 * ProjectCard with a few technologies — verifies badges are rendered with icons and font-code style.
 */
export const WithTechnologies = meta.story({
  args: {
    project: projectBuilder.one({
      overrides: {
        links: () => ({ github: null, live: null, npm: null }),
        technologies: technologyBuilder.many(3)
      }
    }) as ProjectCardProps["project"]
  }
});

WithTechnologies.test("Renders technology badges", async ({ canvas, args }) => {
  const techs = args.project.technologies ?? [];
  for (const tech of techs) {
    if (tech.name) {
      const badge = canvas.getByText(tech.name);
      await expect(badge).toBeVisible();
    }
  }
});

/**
 * ProjectCard with more technologies than the BadgeOverflow default limit — verifies overflow badge.
 */
export const WithManyTechnologies = meta.story({
  args: {
    project: projectBuilder.one({
      overrides: {
        links: () => ({ github: null, live: null, npm: null }),
        technologies: technologyBuilder.many(10)
      }
    }) as ProjectCardProps["project"]
  }
});

WithManyTechnologies.test("Renders overflow badge when technologies exceed the visible limit", async ({ canvas }) => {
  const overflowBadge = canvas.getByText(/^\+\d+$/);
  await expect(overflowBadge).toBeVisible();
});
