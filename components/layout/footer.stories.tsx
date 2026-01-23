import { expect } from "storybook/test";

import { Footer } from "./footer";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Layout/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen"
  }
});

/**
 * Default story showing the Footer component with personal information,
 * social media links, and dynamic copyright year.
 */
export const Default = meta.story({ name: "Footer" });

Default.test("Renders personal information correctly", async ({ canvas, step }) => {
  await step("Verify footer has contentinfo role", async () => {
    const footer = canvas.getByRole("contentinfo");
    await expect(footer).toBeInTheDocument();
  });

  await step("Verify personal name is displayed", async () => {
    const name = canvas.getByText("Jan Szewczyk");
    await expect(name).toBeVisible();
  });

  await step("Verify title is displayed", async () => {
    const title = canvas.getByText("Frontend Developer");
    await expect(title).toBeVisible();
  });
});

Default.test("Renders social media links with correct attributes", async ({ canvas, step }) => {
  await step("Verify GitHub link exists with correct attributes", async () => {
    // Button component with asChild sets role="button" on the anchor tag
    const githubLink = canvas.getByRole("button", { name: "GitHub" });
    await expect(githubLink).toBeInTheDocument();
    await expect(githubLink).toHaveAttribute("href", "https://github.com/JanSzewczyk");
    await expect(githubLink).toHaveAttribute("target", "_blank");
    await expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
    await expect(githubLink).toHaveAttribute("aria-label", "GitHub");
  });

  await step("Verify LinkedIn link exists with correct attributes", async () => {
    const linkedinLink = canvas.getByRole("button", { name: "LinkedIn" });
    await expect(linkedinLink).toBeInTheDocument();
    await expect(linkedinLink).toHaveAttribute("href", "https://linkedin.com/in/janszewczyk");
    await expect(linkedinLink).toHaveAttribute("target", "_blank");
    await expect(linkedinLink).toHaveAttribute("rel", "noopener noreferrer");
    await expect(linkedinLink).toHaveAttribute("aria-label", "LinkedIn");
  });

  await step("Verify Twitter link exists with correct attributes", async () => {
    const twitterLink = canvas.getByRole("button", { name: "Twitter" });
    await expect(twitterLink).toBeInTheDocument();
    await expect(twitterLink).toHaveAttribute("href", "https://twitter.com/DzikiSzumrak");
    await expect(twitterLink).toHaveAttribute("target", "_blank");
    await expect(twitterLink).toHaveAttribute("rel", "noopener noreferrer");
    await expect(twitterLink).toHaveAttribute("aria-label", "Twitter");
  });
});
Default.test("Accessibility features", async ({ canvas, step }) => {
  await step("Verify footer has contentinfo landmark role", async () => {
    const footer = canvas.getByRole("contentinfo");
    await expect(footer).toBeInTheDocument();
  });

  await step("Verify all social links are accessible via aria-label", async () => {
    // Button component with asChild sets role="button" on anchor tags
    const githubLink = canvas.getByRole("button", { name: "GitHub" });
    await expect(githubLink).toHaveAccessibleName("GitHub");

    const linkedinLink = canvas.getByRole("button", { name: "LinkedIn" });
    await expect(linkedinLink).toHaveAccessibleName("LinkedIn");

    const twitterLink = canvas.getByRole("button", { name: "Twitter" });
    await expect(twitterLink).toHaveAccessibleName("Twitter");
  });

  await step("Verify links are keyboard accessible", async () => {
    const allButtons = canvas.getAllByRole("button");
    // All buttons should be focusable (tabindex 0 or not -1)
    for (const button of allButtons) {
      await expect(button).not.toHaveAttribute("tabindex", "-1");
    }
  });

  await step("Verify external link security attributes", async () => {
    const allButtons = canvas.getAllByRole("button");
    for (const button of allButtons) {
      const rel = button.getAttribute("rel");
      await expect(rel).toContain("noopener");
      await expect(rel).toContain("noreferrer");
    }
  });
});
Default.test("Keyboard navigation", async ({ canvas, step, userEvent }) => {
  await step("Tab to first social link", async () => {
    await userEvent.tab();
    const githubLink = canvas.getByRole("button", { name: "GitHub" });
    // Button might be focused
    const isFocused = document.activeElement === githubLink || document.activeElement?.contains(githubLink);
    await expect(isFocused).toBeTruthy();
  });

  await step("Tab to next social link", async () => {
    await userEvent.tab();
    const linkedinLink = canvas.getByRole("button", { name: "LinkedIn" });
    const isFocused = document.activeElement === linkedinLink || document.activeElement?.contains(linkedinLink);
    await expect(isFocused).toBeTruthy();
  });

  await step("Tab to last social link", async () => {
    await userEvent.tab();
    const twitterLink = canvas.getByRole("button", { name: "Twitter" });
    const isFocused = document.activeElement === twitterLink || document.activeElement?.contains(twitterLink);
    await expect(isFocused).toBeTruthy();
  });
});
