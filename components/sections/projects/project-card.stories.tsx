/**
 * Test plan for ProjectCard (new card contract — T4.3):
 *
 * 1. FirstImage — project with ≥2 images → the card thumbnail <img> uses the FIRST image's
 *    alt text. May already pass (current card uses images?.[0]).
 *
 * 2. MarkdownDescription — description = "A **bold** word and a [link](https://example.com)."
 *    → the rendered card contains a <strong> with "bold" and an <a> with name "link".
 *    FAILS now (card renders plain text via <CardDescription>).
 *
 * 3. NoLinkButtonsOnCard — with all links set → the card shows NO link buttons
 *    (Live / Code / NPM). FAILS now (buttons are present in CardFooter).
 *
 * 4. ViewDetailsAffordance — the card shows a "View details" affordance.
 *    FAILS now (text is absent).
 *
 * 5. OpensDialogOnActivate — click the card → a role="dialog" becomes visible and contains
 *    the project title. FAILS now (no dialog interaction exists).
 *
 * 6. WithTechnologies — technology badges are rendered (unchanged).
 *
 * 7. WithManyTechnologies — overflow badge appears when technologies exceed the visible limit
 *    (unchanged).
 */

import { expect, screen, waitFor } from "storybook/test";
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

// ---------------------------------------------------------------------------
// Story 1: FirstImage
// Verifies the card thumbnail uses the FIRST image from project.images.
// ---------------------------------------------------------------------------

/**
 * ProjectCard with two images — the first image's alt text must appear in the thumbnail.
 */
export const FirstImage = meta.story({
  args: {
    project: projectBuilder.one({
      overrides: {
        images: [
          {
            _type: "image",
            alt: "First project screenshot",
            asset: {
              _id: "image-first-800x450-jpg",
              metadata: {
                dimensions: { _type: "sanity.imageDimensions", aspectRatio: 16 / 9, height: 450, width: 800 },
                lqip: null
              },
              url: "https://cdn.sanity.io/images/project/dataset/first-800x450.jpg"
            },
            crop: null,
            hotspot: null
          },
          {
            _type: "image",
            alt: "Second project screenshot",
            asset: {
              _id: "image-second-800x450-jpg",
              metadata: {
                dimensions: { _type: "sanity.imageDimensions", aspectRatio: 16 / 9, height: 450, width: 800 },
                lqip: null
              },
              url: "https://cdn.sanity.io/images/project/dataset/second-800x450.jpg"
            },
            crop: null,
            hotspot: null
          }
        ],
        title: "First Image Test Project"
      }
    }) as ProjectCardProps["project"]
  }
});

FirstImage.test("Renders an img using the first image in the array", async ({ canvas }) => {
  // The card thumbnail must exist and use the first image's alt text, not the second.
  const img = canvas.getByAltText("First project screenshot");
  await expect(img).toBeVisible();

  // The second image's alt must not be used for the thumbnail.
  const secondImg = canvas.queryByAltText("Second project screenshot");
  await expect(secondImg).not.toBeInTheDocument();
});

// ---------------------------------------------------------------------------
// Story 2: MarkdownDescription
// Verifies description is rendered as Markdown, not plain text.
// FAILS against current card (uses plain <CardDescription>).
// ---------------------------------------------------------------------------

/**
 * ProjectCard where the description contains Markdown bold and link syntax.
 * The rendered output must contain <strong> and <a>, not raw ** characters.
 */
export const MarkdownDescription = meta.story({
  args: {
    project: projectBuilder.one({
      overrides: {
        description: "A **bold** word and a [link](https://example.com).",
        links: () => ({ github: null, live: null, npm: null }),
        title: "Markdown Test Project"
      }
    }) as ProjectCardProps["project"]
  }
});

MarkdownDescription.test("Renders description as Markdown — bold and link syntax are parsed", async ({ canvas }) => {
  // **bold** must render as <strong>, not as literal "**bold**".
  // Query by text — after T4.3, the Markdown component wraps this in <strong>.
  // The raw "**bold**" string must not appear (no asterisks visible).
  const boldEl = canvas.getByText("bold");
  await expect(boldEl).toBeVisible();

  // The element must be a <strong> tag, not a plain text node.
  expect(boldEl.nodeName.toLowerCase()).toBe("strong");

  // [link](url) must render as <a> with the link text.
  const linkEl = canvas.getByRole("link", { name: /^link$/i });
  await expect(linkEl).toBeVisible();
  await expect(linkEl).toHaveAttribute("href", "https://example.com");
});

// ---------------------------------------------------------------------------
// Story 3: NoLinkButtonsOnCard
// Verifies that Live / Code / NPM links are NOT rendered on the card itself.
// FAILS against current card (CardFooter renders link buttons).
// ---------------------------------------------------------------------------

/**
 * ProjectCard with all links populated — none of the link buttons must appear on the card.
 * Links move into the details dialog in the new contract.
 */
export const NoLinkButtonsOnCard = meta.story({
  args: {
    project: projectBuilder.one({
      overrides: {
        links: () => ({
          github: "https://github.com/example/project",
          live: "https://project.example.com",
          npm: "https://www.npmjs.com/package/@example/project"
        }),
        title: "No Links On Card Project"
      }
    }) as ProjectCardProps["project"]
  }
});

NoLinkButtonsOnCard.test("Does not render Live, Code, or NPM link buttons on the card surface", async ({ canvas }) => {
  const liveLink = canvas.queryByRole("link", { name: /live/i });
  const codeLink = canvas.queryByRole("link", { name: /code/i });
  const npmLink = canvas.queryByRole("link", { name: /npm/i });

  await expect(liveLink).not.toBeInTheDocument();
  await expect(codeLink).not.toBeInTheDocument();
  await expect(npmLink).not.toBeInTheDocument();
});

// ---------------------------------------------------------------------------
// Story 4: ViewDetailsAffordance
// Verifies the card shows a "View details" affordance.
// FAILS against current card (text is absent).
// ---------------------------------------------------------------------------

/**
 * ProjectCard that must display a "View details" affordance.
 */
export const ViewDetailsAffordance = meta.story({
  args: {
    project: projectBuilder.one({
      overrides: {
        links: () => ({ github: null, live: null, npm: null }),
        title: "View Details Affordance Project"
      }
    }) as ProjectCardProps["project"]
  }
});

ViewDetailsAffordance.test('Shows a "View details" affordance on the card', async ({ canvas }) => {
  // Use exact text to avoid matching the story title "View Details Affordance Project".
  const affordance = canvas.getByText("View details", { exact: true });
  await expect(affordance).toBeVisible();
});

// ---------------------------------------------------------------------------
// Story 5: OpensDialogOnActivate
// Verifies clicking the card opens a dialog containing the project title.
// FAILS against current card (no dialog behaviour).
// ---------------------------------------------------------------------------

const DIALOG_PROJECT_TITLE = "Dialog Project Title";

/**
 * ProjectCard that opens a details dialog when activated.
 * The dialog must contain the project title.
 */
export const OpensDialogOnActivate = meta.story({
  args: {
    project: projectBuilder.one({
      overrides: {
        links: () => ({ github: null, live: null, npm: null }),
        title: DIALOG_PROJECT_TITLE
      }
    }) as ProjectCardProps["project"]
  }
});

OpensDialogOnActivate.test(
  "Clicking the card opens a details dialog with the project title",
  async ({ canvas, userEvent }) => {
    // The whole card is the dialog trigger; click its user-facing "View details" affordance.
    await userEvent.click(canvas.getByText("View details"));

    // Dialog renders in a portal — must query via screen.
    // waitFor accounts for the DS Dialog fade-in animation (starts at opacity 0).
    const dialog = await screen.findByRole("dialog", {}, { timeout: 2000 });
    await waitFor(
      async () => {
        await expect(dialog).toBeVisible();
      },
      { timeout: 2000 }
    );

    // The project title must appear inside the dialog.
    await waitFor(
      async () => {
        await expect(screen.getByText(DIALOG_PROJECT_TITLE, { selector: "[role='dialog'] *" })).toBeVisible();
      },
      { timeout: 2000 }
    );
  }
);

// ---------------------------------------------------------------------------
// Story 6: WithTechnologies
// Verifies technology badges are rendered. Unchanged from previous contract.
// ---------------------------------------------------------------------------

/**
 * ProjectCard with a few technologies — verifies badges are rendered with icons and font-code style.
 * Uses deterministic tech names to avoid random duplicates from the builder.
 */
export const WithTechnologies = meta.story({
  args: {
    project: projectBuilder.one({
      overrides: {
        links: () => ({ github: null, live: null, npm: null }),
        technologies: [
          technologyBuilder.one({ overrides: { icon: "SiReact", name: "React" } }),
          technologyBuilder.one({ overrides: { icon: "SiTypescript", name: "TypeScript" } }),
          technologyBuilder.one({ overrides: { icon: "SiNodedotjs", name: "Node.js" } })
        ]
      }
    }) as ProjectCardProps["project"]
  }
});

WithTechnologies.test("Renders technology badges", async ({ canvas, args }) => {
  const techs = args.project.technologies ?? [];
  for (const tech of techs) {
    if (tech.name) {
      // BadgeOverflow renders items twice: in a hidden measurement div + visible area
      const badges = canvas.getAllByText(tech.name);
      await expect(badges.length).toBeGreaterThan(0);
    }
  }
});

// ---------------------------------------------------------------------------
// Story 7: WithManyTechnologies
// Verifies overflow badge appears when technologies exceed visible limit.
// Unchanged from previous contract.
// ---------------------------------------------------------------------------

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

WithManyTechnologies.test(
  "Renders overflow badge when technologies exceed the visible limit",
  async ({ canvasElement }) => {
    // BadgeOverflow also renders +99 in a hidden measurement div, so we query the
    // visible [data-slot="badge-overflow"] container and wait for its last child to show +N.
    await waitFor(() => {
      const badgeOverflow = canvasElement.querySelector('[data-slot="badge-overflow"]');
      expect(badgeOverflow?.lastElementChild?.textContent).toMatch(/^\+\d+$/);
    });
  }
);
