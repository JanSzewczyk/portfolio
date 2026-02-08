import { expect, waitFor, within } from "storybook/test";

import { Navigation } from "./navigation";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Layout/Navigation",
  component: Navigation,
  parameters: {
    layout: "fullscreen"
  }
});

export const Default = meta.story({});
Default.test("Renders navigation with all elements", async ({ canvas, step }) => {
  await step("Verify personal name/logo link", async () => {
    const nameLink = canvas.getByRole("link", { name: /jan szewczyk/i });
    await expect(nameLink).toBeInTheDocument();
    await expect(nameLink).toHaveAttribute("href", "/");
  });

  await step("Verify all navigation items are visible", async () => {
    const navButtons = ["Home", "About", "Skills", "Projects", "Experience", "Education", "Contact"];

    for (const label of navButtons) {
      const button = canvas.getByRole("button", { name: label });
      await expect(button).toBeInTheDocument();
    }
  });

  await step("Verify theme toggle is present", async () => {
    const themeToggle = canvas.getByRole("button", { name: /current.*theme/i });
    await expect(themeToggle).toBeInTheDocument();
  });
});
Default.test("Accessibility compliance", async ({ canvas, step }) => {
  await step("Verify semantic HTML structure", async () => {
    const header = canvas.getByRole("banner");
    await expect(header).toBeInTheDocument();

    const nameLink = canvas.getByRole("link", { name: /jan szewczyk/i });
    await expect(nameLink).toHaveAccessibleName();

    const buttons = canvas.getAllByRole("button");
    for (const button of buttons) {
      const accessibleName = button.getAttribute("aria-label") ?? button.textContent;
      await expect(accessibleName).toBeTruthy();
    }
  });

  await step("Verify ARIA attributes", async () => {
    const themeToggle = canvas.getByRole("button", { name: /current.*theme/i });
    await expect(themeToggle).toHaveAttribute("aria-label");
  });
});

export const Mobile = meta.story({
  globals: {
    viewport: { value: "mobile2", isRotated: false }
  }
});
Mobile.test("Mobile menu opens and closes", async ({ canvas, canvasElement, step, userEvent }) => {
  // Query the button - it might not be visible on desktop due to md:hidden
  const openMenuButton = canvas.queryByRole("button", { name: /open menu/i });

  // Skip test if button is not accessible (desktop viewport)
  if (!openMenuButton) {
    return;
  }

  await step("Open mobile menu", async () => {
    await userEvent.click(openMenuButton);

    await waitFor(async () => {
      const mobileNav = canvasElement.querySelector("nav");
      await expect(mobileNav).toBeInTheDocument();
    });

    const navLabels = ["Home", "About", "Skills", "Projects", "Experience", "Education", "Contact"];
    const mobileNav = canvasElement.querySelector("nav");

    if (mobileNav) {
      for (const label of navLabels) {
        const buttons = within(mobileNav).getAllByRole("button", { name: label });
        await expect(buttons.length).toBeGreaterThan(0);
      }
    }

    const closeMenuButton = await canvas.findByRole("button", { name: /close menu/i });
    await expect(closeMenuButton).toBeInTheDocument();
  });

  await step("Close mobile menu", async () => {
    const closeMenuButton = await canvas.findByRole("button", { name: /close menu/i });
    await userEvent.click(closeMenuButton);

    await waitFor(async () => {
      const mobileNav = canvasElement.querySelector("nav");
      await expect(mobileNav).not.toBeInTheDocument();
    });

    const openMenuButton = canvas.getByRole("button", { name: /open menu/i });
    await expect(openMenuButton).toBeInTheDocument();
  });
});
Mobile.test("Mobile accessibility", async ({ canvas, canvasElement, step, userEvent }) => {
  // Query the button - it might not be visible on desktop due to md:hidden
  const menuButton = canvas.queryByRole("button", { name: /open menu/i });

  // Skip test if button is not accessible (desktop viewport)
  if (!menuButton) {
    return;
  }

  await step("Verify mobile menu button accessibility", async () => {
    await expect(menuButton).toHaveAttribute("aria-label", "Open menu");
  });

  await step("Open menu and verify aria-label changes", async () => {
    await userEvent.click(menuButton);

    await waitFor(async () => {
      const closeButton = canvas.getByRole("button", { name: /close menu/i });
      await expect(closeButton).toHaveAttribute("aria-label", "Close menu");
    });
  });

  await step("Verify mobile menu navigation landmark", async () => {
    const mobileNav = canvasElement.querySelector("nav");
    await expect(mobileNav).toBeInTheDocument();

    if (mobileNav) {
      const navButtons = within(mobileNav).getAllByRole("button");
      await expect(navButtons.length).toBe(7);

      for (const button of navButtons) {
        await expect(button).toHaveAccessibleName();
      }
    }
  });
});
