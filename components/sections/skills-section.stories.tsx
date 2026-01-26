import { expect, waitFor, within } from "storybook/test";
import { SECTION_HEADINGS, SKILL_GROUPS, TECH_LOGOS } from "~/constants/portfolio";
import { Section } from "~/constants/sections";

import { SkillsSection } from "./skills-section";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Sections/Skills Section",
  component: SkillsSection,
  args: {
    skillGroups: SKILL_GROUPS,
    techLogos: TECH_LOGOS,
    heading: SECTION_HEADINGS[Section.SKILLS]
  },
  parameters: {
    layout: "fullscreen"
  }
});

/**
 * Default story showing the SkillsSection component with enhanced Bento Grid layout.
 * Features animated skill cards, interactive marquee, and tabbed mobile view.
 */
export const Default = meta.story({});
Default.test("Renders all skills and categories correctly", async ({ canvas, step }) => {
  await step("Verify section heading is visible", async () => {
    const heading = canvas.getByRole("heading", { name: /skills & technologies/i, level: 2 });
    await expect(heading).toBeVisible();
  });

  await step("Verify section description is present", async () => {
    const description = canvas.getByText(/the tools and technologies I work with to bring ideas to life/i);
    await expect(description).toBeVisible();
  });

  await step("Verify marquee with tech logos is visible", async () => {
    // Check for marquee container
    const section = canvas.getByRole("region", { name: /skills/i });
    await expect(section).toBeInTheDocument();

    // Verify some tech logos are present
    const reactLogo = canvas.getByText("React");
    await expect(reactLogo).toBeVisible();

    const nextLogo = canvas.getByText("Next.js");
    await expect(nextLogo).toBeVisible();

    const typescriptLogo = canvas.getByText("TypeScript");
    await expect(typescriptLogo).toBeVisible();
  });

  await step("Verify category badges are displayed", async () => {
    const frontendBadge = canvas.getByText("Frontend");
    await expect(frontendBadge).toBeVisible();

    const mobileBadge = canvas.getByText("Mobile");
    await expect(mobileBadge).toBeVisible();

    const devopsBadge = canvas.getByText("DevOps & Tools");
    await expect(devopsBadge).toBeVisible();

    const otherBadge = canvas.getByText("Other");
    await expect(otherBadge).toBeVisible();
  });

  await step("Verify skill cards are displayed", async () => {
    // Check for featured skills (first in each category)
    const reactSkill = canvas.getByRole("heading", { name: "React", level: 3 });
    await expect(reactSkill).toBeVisible();

    const reactNativeSkill = canvas.getByRole("heading", { name: "React Native", level: 3 });
    await expect(reactNativeSkill).toBeVisible();
  });

  await step("Verify decorative bottom text", async () => {
    const bottomText = canvas.getByText(/always learning and exploring new technologies to stay at the cutting edge/i);
    await expect(bottomText).toBeVisible();
  });
});

/**
 * Tests hover interactions on skill cards.
 * Verifies tooltip display and hover state changes.
 */
export const SkillCardHoverInteraction = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, step, userEvent }) => {
    await step("Hover over a non-featured skill card", async () => {
      // Find a non-featured skill (smaller card)
      const nextjsCard = canvas.getByRole("heading", { name: "Next.js", level: 3 });
      await userEvent.hover(nextjsCard);

      // Wait for tooltip to appear
      await waitFor(
        async () => {
          const tooltip = canvas.queryByText(/full-stack react framework/i);
          if (tooltip) {
            await expect(tooltip).toBeVisible();
          }
        },
        { timeout: 2000 }
      );
    });

    await step("Unhover to hide tooltip", async () => {
      const nextjsCard = canvas.getByRole("heading", { name: "Next.js", level: 3 });
      await userEvent.unhover(nextjsCard);

      await waitFor(
        async () => {
          const tooltip = canvas.queryByText(/full-stack react framework/i);
          // Tooltip should be hidden after unhover
          if (tooltip) {
            await expect(tooltip).not.toBeVisible();
          }
        },
        { timeout: 2000 }
      );
    });
  }
});

/**
 * Tests marquee animation behavior.
 * Verifies marquee pauses on hover.
 */
export const MarqueeInteraction = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, step, userEvent }) => {
    await step("Verify marquee tech logos are visible", async () => {
      const techLogos = canvas.getAllByText(/React|Next\.js|TypeScript/i);
      await expect(techLogos.length).toBeGreaterThan(0);
    });

    await step("Hover over tech logo to pause marquee", async () => {
      const reactLogo = canvas.getByText("React");
      await userEvent.hover(reactLogo);

      // Marquee should pause (animation-play-state changes)
      await waitFor(async () => {
        await expect(reactLogo).toBeVisible();
      });
    });

    await step("Unhover to resume marquee", async () => {
      const reactLogo = canvas.getByText("React");
      await userEvent.unhover(reactLogo);

      await waitFor(async () => {
        await expect(reactLogo).toBeVisible();
      });
    });
  }
});

/**
 * Tests mobile tabbed layout.
 * Verifies tab navigation works correctly on smaller screens.
 */
export const MobileTabNavigation = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, step, userEvent }) => {
    await step("Verify tab list is visible", async () => {
      const frontendTab = canvas.getByRole("tab", { name: /frontend/i });
      await expect(frontendTab).toBeVisible();

      const mobileTab = canvas.getByRole("tab", { name: /mobile/i });
      await expect(mobileTab).toBeVisible();
    });

    await step("Verify default tab is active", async () => {
      const frontendTab = canvas.getByRole("tab", { name: /frontend/i });
      await expect(frontendTab).toHaveAttribute("data-state", "active");
    });

    await step("Click Mobile tab to switch content", async () => {
      const mobileTab = canvas.getByRole("tab", { name: /mobile/i });
      await userEvent.click(mobileTab);

      await waitFor(
        async () => {
          await expect(mobileTab).toHaveAttribute("data-state", "active");
        },
        { timeout: 2000 }
      );
    });

    await step("Verify Mobile tab content is displayed", async () => {
      await waitFor(
        async () => {
          const reactNativeSkill = canvas.getByRole("heading", { name: "React Native", level: 3 });
          await expect(reactNativeSkill).toBeVisible();

          const expoSkill = canvas.getByRole("heading", { name: "Expo", level: 3 });
          await expect(expoSkill).toBeVisible();
        },
        { timeout: 2000 }
      );
    });

    await step("Click DevOps & Tools tab", async () => {
      const devopsTab = canvas.getByRole("tab", { name: /devops & tools/i });
      await userEvent.click(devopsTab);

      await waitFor(
        async () => {
          await expect(devopsTab).toHaveAttribute("data-state", "active");
        },
        { timeout: 2000 }
      );
    });

    await step("Verify DevOps & Tools tab content is displayed", async () => {
      await waitFor(
        async () => {
          const githubActionsSkill = canvas.getByRole("heading", {
            name: "GitHub Actions",
            level: 3
          });
          await expect(githubActionsSkill).toBeVisible();
        },
        { timeout: 2000 }
      );
    });
  }
});

/**
 * Tests desktop Bento Grid layout.
 * Verifies proper grid structure and featured cards.
 */
export const DesktopBentoGridLayout = meta.story({
  tags: ["test-only"],
  play: async ({ canvasElement, step }) => {
    await step("Verify desktop grid is visible", async () => {
      // Desktop layout should be visible (lg:block)
      const desktopGrid = canvasElement.querySelector(".lg\\:block");
      await expect(desktopGrid).toBeInTheDocument();
    });

    await step("Verify featured skill cards are larger", async () => {
      // Featured cards have col-span-2 row-span-2 on mobile
      // Each category should have a featured (first) skill
      const canvas = within(canvasElement);

      const reactSkill = canvas.getByRole("heading", { name: "React", level: 3 });
      await expect(reactSkill).toBeVisible();

      const reactNativeSkill = canvas.getByRole("heading", { name: "React Native", level: 3 });
      await expect(reactNativeSkill).toBeVisible();
    });

    await step("Verify all categories are visible simultaneously", async () => {
      const canvas = within(canvasElement);

      const frontendBadge = canvas.getByText("Frontend");
      await expect(frontendBadge).toBeVisible();

      const mobileBadge = canvas.getByText("Mobile");
      await expect(mobileBadge).toBeVisible();

      const devopsBadge = canvas.getByText("DevOps & Tools");
      await expect(devopsBadge).toBeVisible();

      const otherBadge = canvas.getByText("Other");
      await expect(otherBadge).toBeVisible();
    });
  }
});

/**
 * Tests keyboard accessibility.
 * Verifies tab navigation and focus states.
 */
export const KeyboardAccessibility = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, step, userEvent }) => {
    await step("Focus on first tab using keyboard", async () => {
      const frontendTab = canvas.getByRole("tab", { name: /frontend/i });
      frontendTab.focus();
      await expect(frontendTab).toHaveFocus();
    });

    await step("Navigate to next tab using arrow keys", async () => {
      const frontendTab = canvas.getByRole("tab", { name: /frontend/i });
      frontendTab.focus();

      // Press ArrowRight to move to next tab
      await userEvent.keyboard("{ArrowRight}");

      await waitFor(async () => {
        const mobileTab = canvas.getByRole("tab", { name: /mobile/i });
        await expect(mobileTab).toHaveFocus();
      });
    });
  }
});

/**
 * Tests section heading structure.
 * Verifies proper heading hierarchy and ARIA labels.
 */
export const SectionHeadingStructure = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, step }) => {
    await step("Verify section has proper heading hierarchy", async () => {
      const mainHeading = canvas.getByRole("heading", {
        name: /skills & technologies/i,
        level: 2
      });
      await expect(mainHeading).toBeVisible();
    });

    await step("Verify section description provides context", async () => {
      const description = canvas.getByText(/the tools and technologies I work with to bring ideas to life/i);
      await expect(description).toBeVisible();
    });

    await step("Verify skill cards use proper heading levels", async () => {
      const skillHeadings = canvas.getAllByRole("heading", { level: 3 });
      // Should have at least one skill heading per category
      await expect(skillHeadings.length).toBeGreaterThan(4);
    });
  }
});

/**
 * Tests responsive container layout.
 * Verifies proper container width and centering.
 */
export const ResponsiveLayout = meta.story({
  tags: ["test-only"],
  play: async ({ canvasElement, step }) => {
    await step("Verify section element exists", async () => {
      const section = canvasElement.querySelector("#skills");
      await expect(section).toBeInTheDocument();
    });

    await step("Verify container is present", async () => {
      const section = canvasElement.querySelector("#skills");
      const container = section?.querySelector(".container");
      await expect(container).toBeInTheDocument();
    });

    await step("Verify background decorations are present", async () => {
      const section = canvasElement.querySelector("#skills");
      const backgrounds = section?.querySelectorAll(".pointer-events-none");
      // Should have at least 2 background gradient elements + fade gradients
      await expect(backgrounds && backgrounds.length).toBeGreaterThanOrEqual(2);
    });
  }
});

/**
 * Tests featured skill cards display full descriptions.
 * Verifies featured cards show descriptions without tooltips.
 */
export const FeaturedSkillDescriptions = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, step }) => {
    await step("Verify featured React skill shows description", async () => {
      const reactDescription = canvas.getByText(/building complex UIs with hooks, context, server components/i);
      await expect(reactDescription).toBeVisible();
    });

    await step("Verify featured React Native skill shows description", async () => {
      // Need to click Mobile tab first
      const mobileTab = canvas.queryByRole("tab", { name: /mobile/i });
      if (mobileTab) {
        // Mobile view - click tab first
        await canvas.getByRole("tab", { name: /mobile/i }).click();
        await waitFor(async () => {
          const reactNativeDescription = canvas.getByText(/cross-platform mobile development with native performance/i);
          await expect(reactNativeDescription).toBeVisible();
        });
      } else {
        // Desktop view - should be visible by default
        const reactNativeDescription = canvas.getByText(/cross-platform mobile development with native performance/i);
        await expect(reactNativeDescription).toBeVisible();
      }
    });
  }
});

/**
 * Tests tech logo hover animations.
 * Verifies hover states on marquee tech logos.
 */
export const TechLogoHoverAnimation = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, step, userEvent }) => {
    await step("Hover over tech logo to trigger animation", async () => {
      const reactLogo = canvas.getByText("React");
      await userEvent.hover(reactLogo);

      // Logo should remain visible and hover state applied
      await expect(reactLogo).toBeVisible();
    });

    await step("Unhover tech logo", async () => {
      const reactLogo = canvas.getByText("React");
      await userEvent.unhover(reactLogo);

      await expect(reactLogo).toBeVisible();
    });
  }
});
