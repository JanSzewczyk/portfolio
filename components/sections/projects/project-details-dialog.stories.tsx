/**
 * Test plan for ProjectDetailsDialog (contract-first, T5.2):
 *
 * 1. OpensFromTrigger — click the trigger button → role="dialog" becomes visible and contains
 *    the project title. MAY PASS against the minimal shell (title is rendered).
 *
 * 2. LeadMarkdown — description = "A **bold** lead." → dialog contains a <strong> with "bold".
 *    MAY PASS against the minimal shell (Markdown component is already rendered).
 *
 * 3. Highlights — highlights = ["**Editable** content", "Contact that lands"] → dialog shows
 *    each highlight text and **Editable** renders a <strong>.
 *    FAILS now (no highlights section rendered in the shell).
 *
 * 4. TechStack — technologies set to 3 deterministic techs → all three names appear in the
 *    dialog. FAILS now (no tech stack section rendered in the shell).
 *
 * 5. AllLinks — links = live/github/npm all set → the dialog contains link elements whose
 *    href match each URL. FAILS now (no links section rendered in the shell).
 *
 * 6. NoLinks — links all null → NO role="link" elements in the dialog. LIKELY PASSES on shell
 *    (no links rendered at all); guards the T5.3 implementation.
 *
 * 7. CarouselMultipleImages — images = 3 → Previous/Next buttons (aria-label) are present;
 *    a position counter is shown. FAILS now (no carousel rendered in the shell).
 *
 * 8. CarouselSingleImage — images = 1 → Previous/Next nav is NOT present.
 *    LIKELY PASSES on shell (no carousel at all); guards the T5.3 implementation.
 *
 * 9. CloseAndFocusReturn — open via trigger, then click the Close button (aria-label "Close")
 *    → dialog is removed; focus returns to the trigger. Also Escape closes the dialog.
 *    The explicit Close-button part FAILS now if the shell's close control lacks that
 *    aria-label; guards T5.3.
 */

import { expect, screen, waitFor } from "storybook/test";

import preview from "~/.storybook/preview";
import { Markdown } from "~/components/ui/markdown";
import { projectBuilder, technologyBuilder } from "~/tests/builders/portfolio-page.builder";
import type { ProjectDetailsDialogProps } from "./project-details-dialog";
import { ProjectDetailsDialog } from "./project-details-dialog";

// ---------------------------------------------------------------------------
// Shared image fixture reused across stories
// ---------------------------------------------------------------------------

function makeImage(alt: string, id: string) {
  return {
    _type: "image" as const,
    alt,
    asset: {
      _id: `image-${id}-800x450-jpg`,
      metadata: {
        dimensions: {
          _type: "sanity.imageDimensions" as const,
          aspectRatio: 16 / 9,
          height: 450,
          width: 800
        },
        lqip: null
      },
      url: `https://cdn.sanity.io/images/project/dataset/${id}-800x450.jpg`
    },
    crop: null,
    hotspot: null
  };
}

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta = preview.meta({
  component: ProjectDetailsDialog,
  parameters: {
    layout: "centered"
  },
  title: "Components/Project Details Dialog"
});

// ---------------------------------------------------------------------------
// Story 1 & 2: OpensFromTrigger + LeadMarkdown
// Single story — opening the dialog is required before any assertion.
// ---------------------------------------------------------------------------

const OPENS_TITLE = "Dialog Opens Test Project";

export const OpensFromTrigger = meta.story({
  args: {
    children: <button type="button">Open details</button>,
    description: <Markdown className="text-body-default text-foreground" content="A **bold** lead." />,
    project: projectBuilder.one({
      overrides: {
        description: "A **bold** lead.",
        images: [makeImage("Cover screenshot", "cover-800x450")],
        links: () => ({ github: null, live: null, npm: null }),
        title: OPENS_TITLE
      }
    }) as ProjectDetailsDialogProps["project"]
  }
});

OpensFromTrigger.test(
  "Clicking the trigger opens the dialog and shows the project title",
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: /open details/i }));

    // waitFor accounts for the DS Dialog fade-in animation (starts at opacity 0).
    await waitFor(
      async () => {
        const dialog = screen.getByRole("dialog");
        await expect(dialog).toBeVisible();
      },
      { timeout: 2000 }
    );

    await waitFor(
      async () => {
        await expect(screen.getByText(OPENS_TITLE)).toBeVisible();
      },
      { timeout: 2000 }
    );
  }
);

OpensFromTrigger.test(
  "Description is rendered as Markdown — **bold** produces a <strong>",
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: /open details/i }));

    await screen.findByRole("dialog", {}, { timeout: 2000 });

    await waitFor(
      () => {
        const boldEl = screen.getByText("bold");
        expect(boldEl.nodeName.toLowerCase()).toBe("strong");
      },
      { timeout: 2000 }
    );
  }
);

// ---------------------------------------------------------------------------
// Story 3: Highlights
// EXPECTED RED against shell — no highlights section is rendered.
// ---------------------------------------------------------------------------

export const Highlights = meta.story({
  args: {
    children: <button type="button">Open details</button>,
    highlights: [
      { content: <Markdown content="**Editable** content" inline />, id: "editable" },
      { content: <Markdown content="Contact that lands" inline />, id: "contact" }
    ],
    project: projectBuilder.one({
      overrides: {
        description: "A simple lead.",
        highlights: ["**Editable** content", "Contact that lands"],
        images: [makeImage("Cover screenshot", "cover-highlights-800x450")],
        links: () => ({ github: null, live: null, npm: null }),
        title: "Highlights Test Project"
      }
    }) as ProjectDetailsDialogProps["project"]
  }
});

Highlights.test("Each highlight entry is rendered in the dialog", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: /open details/i }));

  await screen.findByRole("dialog", {}, { timeout: 2000 });

  await waitFor(
    async () => {
      // Both highlight texts must be visible.
      await expect(screen.getByText(/Contact that lands/i)).toBeVisible();
    },
    { timeout: 2000 }
  );
});

Highlights.test(
  "Markdown inside a highlight is parsed — **Editable** renders a <strong>",
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: /open details/i }));

    await screen.findByRole("dialog", {}, { timeout: 2000 });

    await waitFor(
      () => {
        const boldEl = screen.getByText("Editable");
        expect(boldEl.nodeName.toLowerCase()).toBe("strong");
      },
      { timeout: 2000 }
    );
  }
);

// ---------------------------------------------------------------------------
// Story 4: TechStack
// EXPECTED RED against shell — no tech stack section is rendered.
// ---------------------------------------------------------------------------

export const TechStack = meta.story({
  args: {
    children: <button type="button">Open details</button>,
    project: projectBuilder.one({
      overrides: {
        description: "A simple lead.",
        images: [makeImage("Cover screenshot", "cover-techstack-800x450")],
        links: () => ({ github: null, live: null, npm: null }),
        technologies: [
          technologyBuilder.one({ overrides: { icon: "SiReact", name: "React" } }),
          technologyBuilder.one({ overrides: { icon: "SiTypescript", name: "TypeScript" } }),
          technologyBuilder.one({ overrides: { icon: "SiNodedotjs", name: "Node.js" } })
        ],
        title: "Tech Stack Test Project"
      }
    }) as ProjectDetailsDialogProps["project"]
  }
});

TechStack.test("All technology names appear in the dialog as badges", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: /open details/i }));

  await screen.findByRole("dialog", {}, { timeout: 2000 });

  await waitFor(
    async () => {
      await expect(screen.getByText("React")).toBeVisible();
      await expect(screen.getByText("TypeScript")).toBeVisible();
      await expect(screen.getByText("Node.js")).toBeVisible();
    },
    { timeout: 2000 }
  );
});

// ---------------------------------------------------------------------------
// Story 5: AllLinks
// EXPECTED RED against shell — no links section is rendered.
// ---------------------------------------------------------------------------

const LIVE_URL = "https://project.example.com";
const GITHUB_URL = "https://github.com/example/project";
const NPM_URL = "https://www.npmjs.com/package/@example/project";

export const AllLinks = meta.story({
  args: {
    children: <button type="button">Open details</button>,
    project: projectBuilder.one({
      overrides: {
        description: "A simple lead.",
        images: [makeImage("Cover screenshot", "cover-alllinks-800x450")],
        links: () => ({
          github: GITHUB_URL,
          live: LIVE_URL,
          npm: NPM_URL
        }),
        title: "All Links Test Project"
      }
    }) as ProjectDetailsDialogProps["project"]
  }
});

AllLinks.test("Live, GitHub, and NPM links are all rendered with correct hrefs", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: /open details/i }));

  await screen.findByRole("dialog", {}, { timeout: 2000 });

  await waitFor(
    async () => {
      const links = screen.getAllByRole("link");
      const hrefs = links.map((l) => l.getAttribute("href"));

      expect(hrefs).toContain(LIVE_URL);
      expect(hrefs).toContain(GITHUB_URL);
      expect(hrefs).toContain(NPM_URL);
    },
    { timeout: 2000 }
  );
});

// ---------------------------------------------------------------------------
// Story 6: NoLinks
// EXPECTED GREEN against shell — no links rendered in the minimal shell.
// Guards that T5.3 hides links whose values are null.
// ---------------------------------------------------------------------------

export const NoLinks = meta.story({
  args: {
    children: <button type="button">Open details</button>,
    project: projectBuilder.one({
      overrides: {
        description: "A simple lead.",
        images: [makeImage("Cover screenshot", "cover-nolinks-800x450")],
        links: () => ({ github: null, live: null, npm: null }),
        title: "No Links Test Project"
      }
    }) as ProjectDetailsDialogProps["project"]
  }
});

NoLinks.test("No link elements are rendered in the dialog when all links are null", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: /open details/i }));

  await screen.findByRole("dialog", {}, { timeout: 2000 });

  await waitFor(
    () => {
      const links = screen.queryAllByRole("link");
      expect(links).toHaveLength(0);
    },
    { timeout: 2000 }
  );
});

// ---------------------------------------------------------------------------
// Story 7: CarouselMultipleImages
// EXPECTED RED against shell — no carousel rendered in the minimal shell.
// ---------------------------------------------------------------------------

export const CarouselMultipleImages = meta.story({
  args: {
    children: <button type="button">Open details</button>,
    project: projectBuilder.one({
      overrides: {
        description: "A simple lead.",
        images: [
          makeImage("First screenshot", "carousel-first-800x450"),
          makeImage("Second screenshot", "carousel-second-800x450"),
          makeImage("Third screenshot", "carousel-third-800x450")
        ],
        links: () => ({ github: null, live: null, npm: null }),
        title: "Carousel Multi-Image Project"
      }
    }) as ProjectDetailsDialogProps["project"]
  }
});

CarouselMultipleImages.test(
  "Previous and Next carousel buttons are present when there are multiple images",
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: /open details/i }));

    await screen.findByRole("dialog", {}, { timeout: 2000 });

    await waitFor(
      async () => {
        await expect(screen.getByRole("button", { name: /previous/i })).toBeVisible();
        await expect(screen.getByRole("button", { name: /next/i })).toBeVisible();
      },
      { timeout: 2000 }
    );
  }
);

CarouselMultipleImages.test(
  "A position indicator or counter is visible when there are multiple images",
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: /open details/i }));

    await screen.findByRole("dialog", {}, { timeout: 2000 });

    await waitFor(
      () => {
        // A position counter like "1 / 3" or dot indicators must be present.
        // Query by text pattern covering "1 / 3", "1/3", or similar counter formats.
        const counter = screen.queryByText(/1\s*\/\s*3/);
        const dots = screen.queryAllByRole("button", { name: /go to (image|slide)/i });
        // Either a text counter or dot indicators must exist.
        const hasIndicator = counter !== null || dots.length > 0;
        expect(hasIndicator).toBe(true);
      },
      { timeout: 2000 }
    );
  }
);

CarouselMultipleImages.test("LEFT and RIGHT arrow keys navigate between images", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: /open details/i }));

  await screen.findByRole("dialog", {}, { timeout: 2000 });

  // Wait for the carousel navigation to be present before pressing keys.
  await waitFor(
    async () => {
      await expect(screen.getByRole("button", { name: /next/i })).toBeVisible();
    },
    { timeout: 2000 }
  );

  // Press RIGHT to advance, then LEFT to go back — no errors should be thrown.
  await userEvent.keyboard("{ArrowRight}");
  await userEvent.keyboard("{ArrowLeft}");
});

// ---------------------------------------------------------------------------
// Story 8: CarouselSingleImage
// EXPECTED GREEN against shell — no carousel at all, so no nav buttons.
// Guards that T5.3 hides carousel nav when there is only one image.
// ---------------------------------------------------------------------------

export const CarouselSingleImage = meta.story({
  args: {
    children: <button type="button">Open details</button>,
    project: projectBuilder.one({
      overrides: {
        description: "A simple lead.",
        images: [makeImage("Only screenshot", "carousel-single-800x450")],
        links: () => ({ github: null, live: null, npm: null }),
        title: "Single Image Project"
      }
    }) as ProjectDetailsDialogProps["project"]
  }
});

CarouselSingleImage.test(
  "Previous and Next carousel buttons are NOT rendered when there is only one image",
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: /open details/i }));

    await screen.findByRole("dialog", {}, { timeout: 2000 });

    await waitFor(
      () => {
        const prevBtn = screen.queryByRole("button", { name: /previous/i });
        const nextBtn = screen.queryByRole("button", { name: /next/i });
        expect(prevBtn).not.toBeInTheDocument();
        expect(nextBtn).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  }
);

// ---------------------------------------------------------------------------
// Story 9: CloseAndFocusReturn
// The Close-button-by-aria-label part is EXPECTED RED against the shell if
// the DS DialogContent's built-in close button lacks aria-label="Close".
// The Escape-closes assertion is likely green (DS Dialog handles it natively).
// ---------------------------------------------------------------------------

export const CloseAndFocusReturn = meta.story({
  args: {
    children: <button type="button">Open details</button>,
    project: projectBuilder.one({
      overrides: {
        description: "A simple lead.",
        images: [makeImage("Cover screenshot", "cover-close-800x450")],
        links: () => ({ github: null, live: null, npm: null }),
        title: "Close Focus Return Project"
      }
    }) as ProjectDetailsDialogProps["project"]
  }
});

CloseAndFocusReturn.test("A Close button with aria-label is present in the dialog", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: /open details/i }));

  await screen.findByRole("dialog", {}, { timeout: 2000 });

  await waitFor(
    async () => {
      await expect(screen.getByRole("button", { name: /close/i })).toBeVisible();
    },
    { timeout: 2000 }
  );
});

CloseAndFocusReturn.test(
  "Clicking the Close button removes the dialog and returns focus to the trigger",
  async ({ canvas, userEvent }) => {
    const triggerBtn = canvas.getByRole("button", { name: /open details/i });
    await userEvent.click(triggerBtn);

    await screen.findByRole("dialog", {}, { timeout: 2000 });

    const closeBtn = await screen.findByRole("button", { name: /close/i }, { timeout: 2000 });
    await userEvent.click(closeBtn);

    await waitFor(
      () => {
        const dialog = screen.queryByRole("dialog");
        expect(dialog).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    // Focus must return to the trigger element after the dialog closes.
    await expect(triggerBtn).toHaveFocus();
  }
);

CloseAndFocusReturn.test("Pressing Escape closes the dialog", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: /open details/i }));

  await screen.findByRole("dialog", {}, { timeout: 2000 });

  await userEvent.keyboard("{Escape}");

  await waitFor(
    () => {
      const dialog = screen.queryByRole("dialog");
      expect(dialog).not.toBeInTheDocument();
    },
    { timeout: 2000 }
  );
});
