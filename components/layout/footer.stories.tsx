import { expect } from "storybook/test";
import { portfolioPageFooterBuilder } from "~/tests/builders/portfolio-page.builder";

import { Footer } from "./footer";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Layout/Footer",
  component: Footer,
  args: {
    footer: portfolioPageFooterBuilder.one()
  },
  parameters: {
    layout: "fullscreen"
  }
});

/**
 * Default story showing the Footer component with personal information,
 * social media links, and dynamic copyright year.
 */
export const Default = meta.story({ name: "Footer" });

Default.test("Renders copyright text correctly", async ({ canvas, step, args }) => {
  await step("Verify footer has contentinfo role", async () => {
    const footer = canvas.getByRole("contentinfo");
    await expect(footer).toBeInTheDocument();
  });

  await step("Verify copyright text is displayed", async () => {
    if (args.footer?.copyrightText) {
      const copyrightText = canvas.getByText(new RegExp(args.footer.copyrightText, "i"));
      await expect(copyrightText).toBeVisible();
    }
  });

  await step("Verify current year is displayed", async () => {
    const currentYear = new Date().getFullYear();
    const yearText = canvas.getByText(new RegExp(`© ${currentYear}`));
    await expect(yearText).toBeVisible();
  });
});

Default.test("Renders social media links with correct attributes", async ({ canvas, step, args }) => {
  await step("Verify social links are present", async () => {
    if (args.footer?.socialLinks && args.footer.socialLinks.length > 0) {
      const firstLink = args.footer.socialLinks[0];
      if (firstLink && firstLink.platform) {
        const link = canvas.getByRole("button", { name: firstLink.platform });
        await expect(link).toBeInTheDocument();
        if (firstLink.url) {
          await expect(link).toHaveAttribute("href", firstLink.url);
        }
        await expect(link).toHaveAttribute("target", "_blank");
        await expect(link).toHaveAttribute("rel", "noopener noreferrer");
      }
    }
  });
});

Default.test("Accessibility features", async ({ canvas, step, args }) => {
  await step("Verify footer has contentinfo landmark role", async () => {
    const footer = canvas.getByRole("contentinfo");
    await expect(footer).toBeInTheDocument();
  });

  await step("Verify all social links are accessible via aria-label", async () => {
    if (args.footer?.socialLinks) {
      for (const link of args.footer.socialLinks) {
        if (link.platform) {
          const linkElement = canvas.getByRole("button", { name: link.platform });
          await expect(linkElement).toHaveAccessibleName(link.platform);
        }
      }
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

Default.test("Keyboard navigation", async ({ canvas, step, userEvent, args }) => {
  if (!args.footer?.socialLinks || args.footer.socialLinks.length === 0) {
    return;
  }

  await step("Tab to first social link", async () => {
    await userEvent.tab();
    const firstLink = args.footer?.socialLinks?.[0];
    if (firstLink && firstLink.platform) {
      const linkElement = canvas.getByRole("button", { name: firstLink.platform });
      const isFocused = document.activeElement === linkElement || document.activeElement?.contains(linkElement);
      await expect(isFocused).toBeTruthy();
    }
  });

  if (args.footer?.socialLinks && args.footer.socialLinks.length > 1) {
    await step("Tab to next social link", async () => {
      await userEvent.tab();
      const secondLink = args.footer?.socialLinks?.[1];
      if (secondLink && secondLink.platform) {
        const linkElement = canvas.getByRole("button", { name: secondLink.platform });
        const isFocused = document.activeElement === linkElement || document.activeElement?.contains(linkElement);
        await expect(isFocused).toBeTruthy();
      }
    });
  }
});
