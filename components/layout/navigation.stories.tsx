import { expect, waitFor } from "storybook/test";
import { portfolioPagePersonalInfoBuilder } from "~/tests/builders/portfolio-page.builder";

import { Navigation } from "./navigation";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Layout/Navigation",
  component: Navigation,
  parameters: {
    layout: "fullscreen"
  },
  args: {
    personalInfo: portfolioPagePersonalInfoBuilder.one()
  }
});

/**
 * Default navigation story showing desktop layout with all navigation items.
 * Tests focus on desktop viewport behavior and accessibility.
 */
export const NavigationStory = meta.story({});

// ============================================================================
// Tests for Navigation (Desktop)
// ============================================================================

NavigationStory.test("Renders personal name as clickable logo link", async ({ canvas, args }) => {
  // Verify logo link exists with correct href and uses dynamic data
  const logoLink = canvas.getByRole("link", { name: args.personalInfo?.name ?? "" });
  await expect(logoLink).toBeVisible();
  await expect(logoLink).toHaveAttribute("href", "/");
});

NavigationStory.test("Renders all navigation items on desktop", async ({ canvas }) => {
  // Verify all 7 navigation buttons are present
  const navItems = ["Home", "About", "Skills", "Projects", "Experience", "Education", "Contact"];

  for (const label of navItems) {
    const button = canvas.getByRole("button", { name: label });
    await expect(button).toBeInTheDocument();
    await expect(button).toBeVisible();
  }
});

NavigationStory.test("Renders theme toggle button", async ({ canvas }) => {
  // Theme toggle button has dynamic aria-label based on current theme
  const themeToggle = canvas.getByRole("button", { name: /current.*theme/i });
  await expect(themeToggle).toBeVisible();
  await expect(themeToggle).toHaveAccessibleName();
});

NavigationStory.test("Mobile menu button is hidden on desktop", async ({ canvas }) => {
  // On desktop (md and above), mobile menu button should not be visible
  // Query should not find the button or it should not be visible
  const openMenuButton = canvas.queryByRole("button", { name: "Open menu" });

  // Button might exist in DOM but should not be visible due to md:hidden class
  if (openMenuButton) {
    // Try to verify it's not in the visible viewport
    // In Storybook's desktop viewport, this element should be hidden by CSS
    const computedStyle = window.getComputedStyle(openMenuButton);
    const isHidden = computedStyle.display === "none" || computedStyle.visibility === "hidden";
    await expect(isHidden).toBe(true);
  } else {
    // Button doesn't exist in query results, which is also acceptable
    await expect(openMenuButton).toBeNull();
  }
});

NavigationStory.test("Semantic HTML structure is accessible", async ({ canvas, step }) => {
  await step("Verify header landmark exists", async () => {
    const header = canvas.getByRole("banner");
    await expect(header).toBeInTheDocument();
  });

  await step("Verify logo link has accessible name", async () => {
    const links = canvas.getAllByRole("link");
    await expect(links.length).toBeGreaterThan(0);
    // Logo link should have name from personalInfo
    const logoLink = links[0];
    if (logoLink) {
      await expect(logoLink).toHaveAccessibleName();
    }
  });

  await step("Verify all buttons have accessible names", async () => {
    const buttons = canvas.getAllByRole("button");
    for (const button of buttons) {
      const accessibleName = button.getAttribute("aria-label") ?? button.textContent;
      await expect(accessibleName).toBeTruthy();
    }
  });
});

/**
 * Mobile navigation story with mobile viewport set.
 * Tests focus on mobile menu interactions and accessibility.
 */
export const MobileNavigationStory = meta.story({
  globals: {
    viewport: { value: "mobile2", isRotated: false }
  }
});

// ============================================================================
// Tests for MobileNavigation (Mobile Viewport)
// ============================================================================

MobileNavigationStory.test("Mobile menu button is visible", async ({ canvas }) => {
  // On mobile, the hamburger menu button should be visible
  const openMenuButton = canvas.getByRole("button", { name: "Open menu" });
  await expect(openMenuButton).toBeVisible();
  await expect(openMenuButton).toHaveAttribute("aria-label", "Open menu");
});

MobileNavigationStory.test(
  "Opens mobile menu when button is clicked",
  async ({ canvas, canvasElement, step, userEvent }) => {
    await step("Click menu button to open", async () => {
      const openMenuButton = canvas.getByRole("button", { name: "Open menu" });
      await userEvent.click(openMenuButton);
    });

    await step("Wait for mobile menu to appear", async () => {
      await waitFor(async () => {
        const mobileNav = canvasElement.querySelector("nav");
        await expect(mobileNav).toBeInTheDocument();
      });
    });

    await step("Verify all navigation items are in mobile menu", async () => {
      const navItems = ["Home", "About", "Skills", "Projects", "Experience", "Education", "Contact"];

      for (const label of navItems) {
        // Mobile menu contains buttons with same labels
        const button = canvas.getByRole("button", { name: label });
        await expect(button).toBeInTheDocument();
      }
    });

    await step("Verify close button is now visible", async () => {
      const closeMenuButton = canvas.getByRole("button", { name: "Close menu" });
      await expect(closeMenuButton).toBeVisible();
      await expect(closeMenuButton).toHaveAttribute("aria-label", "Close menu");
    });
  }
);

MobileNavigationStory.test(
  "Closes mobile menu when close button is clicked",
  async ({ canvas, canvasElement, step, userEvent }) => {
    await step("Open mobile menu first", async () => {
      const openMenuButton = canvas.getByRole("button", { name: "Open menu" });
      await userEvent.click(openMenuButton);

      await waitFor(async () => {
        const mobileNav = canvasElement.querySelector("nav");
        await expect(mobileNav).toBeInTheDocument();
      });
    });

    await step("Click close button", async () => {
      const closeMenuButton = canvas.getByRole("button", { name: "Close menu" });
      await userEvent.click(closeMenuButton);
    });

    await step("Verify mobile menu is closed", async () => {
      await waitFor(async () => {
        const mobileNav = canvasElement.querySelector("nav");
        await expect(mobileNav).not.toBeInTheDocument();
      });
    });

    await step("Verify open menu button is visible again", async () => {
      const openMenuButton = canvas.getByRole("button", { name: "Open menu" });
      await expect(openMenuButton).toBeVisible();
    });
  }
);

MobileNavigationStory.test("Mobile menu button has correct ARIA label states", async ({ canvas, step, userEvent }) => {
  await step("Verify initial state has 'Open menu' label", async () => {
    const menuButton = canvas.getByRole("button", { name: "Open menu" });
    await expect(menuButton).toHaveAttribute("aria-label", "Open menu");
  });

  await step("Click to open and verify label changes to 'Close menu'", async () => {
    const openButton = canvas.getByRole("button", { name: "Open menu" });
    await userEvent.click(openButton);

    await waitFor(async () => {
      const closeButton = canvas.getByRole("button", { name: "Close menu" });
      await expect(closeButton).toHaveAttribute("aria-label", "Close menu");
    });
  });

  await step("Click to close and verify label returns to 'Open menu'", async () => {
    const closeButton = canvas.getByRole("button", { name: "Close menu" });
    await userEvent.click(closeButton);

    await waitFor(async () => {
      const openButton = canvas.getByRole("button", { name: "Open menu" });
      await expect(openButton).toHaveAttribute("aria-label", "Open menu");
    });
  });
});

MobileNavigationStory.test("Theme toggle is visible on mobile", async ({ canvas }) => {
  // Theme toggle should be visible on mobile, positioned next to hamburger menu
  const themeToggle = canvas.getByRole("button", { name: /current.*theme/i });
  await expect(themeToggle).toBeVisible();
  await expect(themeToggle).toHaveAccessibleName();
});
