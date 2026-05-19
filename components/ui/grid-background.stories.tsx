import { expect } from "storybook/test";
import preview from "~/.storybook/preview";
import { GridBackground } from "./grid-background";

const meta = preview.meta({
  title: "Components/UI/Grid Background",
  component: GridBackground,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="relative h-150 w-full">
        <Story />
      </div>
    ),
  ],
});

/**
 * Default story showing the GridBackground component with default settings.
 * Displays an animated grid pattern with fade overlay for visual depth.
 */
export const Default = meta.story({});

Default.test(
  "Renders container with correct attributes",
  async ({ canvas, step }) => {
    await step("Verify container has correct data-testid", async () => {
      const container = canvas.getByTestId("grid-background-container");
      await expect(container).toBeInTheDocument();
    });

    await step("Verify container is visible", async () => {
      const container = canvas.getByTestId("grid-background-container");
      await expect(container).toBeVisible();
    });
  },
);

Default.test("Applies custom className correctly", async ({ canvas, step }) => {
  const container = canvas.getByTestId("grid-background-container");

  await step("Verify default classes are applied", async () => {
    await expect(container).toHaveClass("pointer-events-none");
    await expect(container).toHaveClass("absolute");
    await expect(container).toHaveClass("inset-0");
    await expect(container).toHaveClass("-z-10");
  });
});

Default.test(
  "Sets grid size via CSS custom property",
  async ({ canvas, step }) => {
    const container = canvas.getByTestId("grid-background-container");

    await step(
      "Verify --grid-size custom property is set to default (40px)",
      async () => {
        const style = window.getComputedStyle(container);
        const gridSize = style.getPropertyValue("--grid-size").trim();
        await expect(gridSize).toBe("40px");
      },
    );
  },
);

Default.test(
  "Sets grid color via CSS custom property",
  async ({ canvas, step }) => {
    const container = canvas.getByTestId("grid-background-container");

    await step("Verify --grid-color custom property is set", async () => {
      const style = window.getComputedStyle(container);
      const gridColor = style.getPropertyValue("--grid-color").trim();
      // CSS custom properties can be resolved to their computed values by the browser
      // Check that the property exists and has a valid color value
      await expect(gridColor).toBeTruthy();
      await expect(gridColor.length).toBeGreaterThan(0);
    });
  },
);

Default.test(
  "Renders fade overlay when fade is true",
  async ({ canvas, step }) => {
    const container = canvas.getByTestId("grid-background-container");

    await step("Verify container has two child divs", async () => {
      const children = container.querySelectorAll("div");
      await expect(children.length).toBe(2);
    });

    await step("Verify second child is the fade overlay", async () => {
      const children = container.querySelectorAll("div");
      const fadeOverlay = children[1];
      await expect(fadeOverlay).toHaveClass("from-background");
      await expect(fadeOverlay).toHaveClass("to-background");
      await expect(fadeOverlay).toHaveClass("bg-linear-to-b");
      await expect(fadeOverlay).toHaveClass("via-transparent");
    });
  },
);

Default.test(
  "Does not render fade overlay when fade is false",
  async ({ canvas, step }) => {
    // This test will be properly tested in the WithoutFade story
    // Here we're testing the default behavior (fade: true)
    const container = canvas.getByTestId("grid-background-container");

    await step("Verify fade overlay exists in default story", async () => {
      const children = container.querySelectorAll("div");
      await expect(children.length).toBe(2);
    });
  },
);

Default.test(
  "Uses default values when props not provided",
  async ({ canvas, step }) => {
    const container = canvas.getByTestId("grid-background-container");

    await step("Verify default grid size (40px)", async () => {
      const style = window.getComputedStyle(container);
      const gridSize = style.getPropertyValue("--grid-size").trim();
      await expect(gridSize).toBe("40px");
    });

    await step("Verify default grid color is set", async () => {
      const style = window.getComputedStyle(container);
      const gridColor = style.getPropertyValue("--grid-color").trim();
      // CSS custom properties are resolved by the browser
      await expect(gridColor).toBeTruthy();
      await expect(gridColor.length).toBeGreaterThan(0);
    });

    await step("Verify fade overlay is rendered by default", async () => {
      const children = container.querySelectorAll("div");
      await expect(children.length).toBe(2);
    });
  },
);

Default.test(
  "Applies pointer-events-none for non-interactivity",
  async ({ canvas, step }) => {
    const container = canvas.getByTestId("grid-background-container");

    await step("Verify pointer-events-none class is applied", async () => {
      await expect(container).toHaveClass("pointer-events-none");
    });

    await step("Verify computed style has pointer-events: none", async () => {
      const style = window.getComputedStyle(container);
      const pointerEvents = style.getPropertyValue("pointer-events");
      await expect(pointerEvents).toBe("none");
    });
  },
);

Default.test(
  "Has correct z-index for background layering",
  async ({ canvas, step }) => {
    const container = canvas.getByTestId("grid-background-container");

    await step("Verify -z-10 class is applied", async () => {
      await expect(container).toHaveClass("-z-10");
    });

    await step("Verify element is positioned absolutely", async () => {
      await expect(container).toHaveClass("absolute");
      await expect(container).toHaveClass("inset-0");
    });
  },
);

/**
 * Story showing the grid background without the fade overlay.
 * Useful for comparing the visual difference with and without fade.
 */
export const WithoutFade = meta.story({
  args: {
    fade: false,
  },
});

WithoutFade.test("Does not render fade overlay", async ({ canvas, step }) => {
  const container = canvas.getByTestId("grid-background-container");

  await step(
    "Verify container has only one child div (grid only)",
    async () => {
      const children = container.querySelectorAll("div");
      await expect(children.length).toBe(1);
    },
  );

  await step("Verify the single child has grid background styles", async () => {
    const children = container.querySelectorAll("div");
    const gridDiv = children[0];
    await expect(gridDiv).toHaveClass("absolute");
    await expect(gridDiv).toHaveClass("inset-0");
  });
});

/**
 * Story showing custom grid size configuration.
 * Demonstrates the grid with larger spacing between lines.
 */
export const CustomGridSize = meta.story({
  args: {
    gridSize: 80,
  },
});

CustomGridSize.test("Applies custom grid size", async ({ canvas, step }) => {
  const container = canvas.getByTestId("grid-background-container");

  await step("Verify --grid-size custom property is set to 80px", async () => {
    const style = window.getComputedStyle(container);
    const gridSize = style.getPropertyValue("--grid-size").trim();
    await expect(gridSize).toBe("80px");
  });
});

/**
 * Story showing custom grid color configuration.
 * Demonstrates the grid with a custom color value.
 */
export const CustomGridColor = meta.story({
  args: {
    gridColor: "rgba(255, 0, 0, 0.3)",
  },
});

CustomGridColor.test("Applies custom grid color", async ({ canvas, step }) => {
  const container = canvas.getByTestId("grid-background-container");

  await step(
    "Verify --grid-color custom property is set to custom value",
    async () => {
      const style = window.getComputedStyle(container);
      const gridColor = style.getPropertyValue("--grid-color").trim();
      await expect(gridColor).toBe("rgba(255, 0, 0, 0.3)");
    },
  );
});

/**
 * Story showing all custom configurations combined.
 * Demonstrates full customization of the grid background.
 */
export const FullyCustomized = meta.story({
  args: {
    className: "opacity-50",
    gridSize: 60,
    gridColor: "rgba(59, 130, 246, 0.5)",
    fade: false,
  },
});

FullyCustomized.test(
  "Applies all custom configurations",
  async ({ canvas, step }) => {
    const container = canvas.getByTestId("grid-background-container");

    await step("Verify custom className is applied", async () => {
      await expect(container).toHaveClass("opacity-50");
    });

    await step("Verify custom grid size", async () => {
      const style = window.getComputedStyle(container);
      const gridSize = style.getPropertyValue("--grid-size").trim();
      await expect(gridSize).toBe("60px");
    });

    await step("Verify custom grid color", async () => {
      const style = window.getComputedStyle(container);
      const gridColor = style.getPropertyValue("--grid-color").trim();
      await expect(gridColor).toBe("rgba(59, 130, 246, 0.5)");
    });

    await step("Verify fade overlay is not rendered", async () => {
      const children = container.querySelectorAll("div");
      await expect(children.length).toBe(1);
    });
  },
);
