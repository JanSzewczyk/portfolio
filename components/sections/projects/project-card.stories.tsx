import { expect } from "storybook/test";
import preview from "~/.storybook/preview";
import { projectBuilder } from "~/tests/builders/portfolio-page.builder";
import { ProjectCard, type ProjectCardProps } from "./project-card";

const meta = preview.meta({
  title: "Components/Project Card",
  component: ProjectCard,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-100">
        <Story />
      </div>
    ),
  ],
});

/**
 * ProjectCard with all link types (Live, GitHub, NPM).
 */
export const AllLinks = meta.story({
  args: {
    project: projectBuilder.one({
      overrides: {
        title: "Design System",
        description:
          "A comprehensive React component library with TypeScript support and modern styling.",
        links: () => ({
          live: "https://design-system.example.com",
          github: "https://github.com/example/design-system",
          npm: "https://www.npmjs.com/package/@example/design-system",
        }),
      },
    }) as ProjectCardProps["project"],
  },
});

AllLinks.test("Renders all three link buttons", async ({ canvas }) => {
  const liveButton = canvas.getByRole("button", { name: /live/i });
  const codeButton = canvas.getByRole("button", { name: /code/i });
  const npmButton = canvas.getByRole("button", { name: /npm/i });

  await expect(liveButton).toBeVisible();
  await expect(codeButton).toBeVisible();
  await expect(npmButton).toBeVisible();
});

AllLinks.test(
  "All buttons have correct security attributes",
  async ({ canvas }) => {
    const liveButton = canvas.getByRole("button", { name: /live/i });
    const codeButton = canvas.getByRole("button", { name: /code/i });
    const npmButton = canvas.getByRole("button", { name: /npm/i });

    await expect(liveButton).toHaveAttribute("target", "_blank");
    await expect(liveButton).toHaveAttribute("rel", "noopener noreferrer");

    await expect(codeButton).toHaveAttribute("target", "_blank");
    await expect(codeButton).toHaveAttribute("rel", "noopener noreferrer");

    await expect(npmButton).toHaveAttribute("target", "_blank");
    await expect(npmButton).toHaveAttribute("rel", "noopener noreferrer");
  },
);

AllLinks.test("All buttons have correct href values", async ({ canvas }) => {
  const liveButton = canvas.getByRole("button", { name: /live/i });
  const codeButton = canvas.getByRole("button", { name: /code/i });
  const npmButton = canvas.getByRole("button", { name: /npm/i });

  await expect(liveButton).toHaveAttribute(
    "href",
    "https://design-system.example.com",
  );
  await expect(codeButton).toHaveAttribute(
    "href",
    "https://github.com/example/design-system",
  );
  await expect(npmButton).toHaveAttribute(
    "href",
    "https://www.npmjs.com/package/@example/design-system",
  );
});

/**
 * ProjectCard with only NPM link (common for library packages).
 */
export const NpmLinkOnly = meta.story({
  args: {
    project: projectBuilder.one({
      overrides: {
        title: "Utility Package",
        description:
          "A lightweight utility library for common JavaScript operations.",
        links: () => ({
          live: null,
          github: null,
          npm: "https://www.npmjs.com/package/@example/utils",
        }),
      },
    }) as ProjectCardProps["project"],
  },
});

NpmLinkOnly.test("Renders only NPM button", async ({ canvas }) => {
  const npmButton = canvas.getByRole("button", { name: /npm/i });
  await expect(npmButton).toBeVisible();

  // Live and Code buttons should not be present
  const liveButton = canvas.queryByRole("button", { name: /live/i });
  const codeButton = canvas.queryByRole("button", { name: /code/i });
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
        title: "React Hooks Library",
        description:
          "A collection of useful React hooks for modern applications.",
        links: () => ({
          live: null,
          github: "https://github.com/example/react-hooks",
          npm: "https://www.npmjs.com/package/@example/react-hooks",
        }),
      },
    }) as ProjectCardProps["project"],
  },
});

GithubAndNpm.test("Renders GitHub and NPM buttons", async ({ canvas }) => {
  const codeButton = canvas.getByRole("button", { name: /code/i });
  const npmButton = canvas.getByRole("button", { name: /npm/i });

  await expect(codeButton).toBeVisible();
  await expect(npmButton).toBeVisible();

  // Live button should not be present
  const liveButton = canvas.queryByRole("button", { name: /live/i });
  await expect(liveButton).not.toBeInTheDocument();
});

/**
 * ProjectCard with no NPM link (typical web application).
 */
export const NoNpmLink = meta.story({
  args: {
    project: projectBuilder.one({
      overrides: {
        title: "Portfolio Website",
        description:
          "A modern portfolio website built with Next.js and TypeScript.",
        links: () => ({
          live: "https://portfolio.example.com",
          github: "https://github.com/example/portfolio",
          npm: null,
        }),
      },
    }) as ProjectCardProps["project"],
  },
});

NoNpmLink.test(
  "NPM button is not rendered when npm link is null",
  async ({ canvas }) => {
    const liveButton = canvas.getByRole("button", { name: /live/i });
    const codeButton = canvas.getByRole("button", { name: /code/i });

    await expect(liveButton).toBeVisible();
    await expect(codeButton).toBeVisible();

    // NPM button should not be present
    const npmButton = canvas.queryByRole("button", { name: /npm/i });
    await expect(npmButton).not.toBeInTheDocument();
  },
);

/**
 * ProjectCard with no links at all.
 */
export const NoLinks = meta.story({
  args: {
    project: projectBuilder.one({
      overrides: {
        title: "Internal Tool",
        description: "An internal tool used for company operations.",
        links: () => ({
          live: null,
          github: null,
          npm: null,
        }),
      },
    }) as ProjectCardProps["project"],
  },
});

NoLinks.test("No link buttons are rendered", async ({ canvas }) => {
  const liveButton = canvas.queryByRole("button", { name: /live/i });
  const codeButton = canvas.queryByRole("button", { name: /code/i });
  const npmButton = canvas.queryByRole("button", { name: /npm/i });

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
        title: "Enterprise React Component Library with TypeScript",
        description:
          "A comprehensive, production-ready React component library designed for enterprise applications. Features include full TypeScript support, extensive accessibility features, theme customization, and comprehensive documentation.",
        links: () => ({
          live: "https://components.example.com",
          github: "https://github.com/example/components",
          npm: "https://www.npmjs.com/package/@example/components",
        }),
      },
    }) as ProjectCardProps["project"],
  },
});

LongContent.test(
  "All buttons remain visible with long content",
  async ({ canvas }) => {
    const liveButton = canvas.getByRole("button", { name: /live/i });
    const codeButton = canvas.getByRole("button", { name: /code/i });
    const npmButton = canvas.getByRole("button", { name: /npm/i });

    await expect(liveButton).toBeVisible();
    await expect(codeButton).toBeVisible();
    await expect(npmButton).toBeVisible();
  },
);
