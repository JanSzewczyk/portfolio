import { expect } from "storybook/test";
import { portfolioPageFooterBuilder, portfolioPagePersonalInfoBuilder } from "~/tests/builders/portfolio-page.builder";

import { Footer } from "./footer";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Layout/Footer",
  component: Footer,
  args: {
    footer: portfolioPageFooterBuilder.one(),
    personalInfo: portfolioPagePersonalInfoBuilder.one()
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
    if (args.personalInfo?.socialLinks && args.personalInfo.socialLinks.length > 0) {
      const firstLink = args.personalInfo.socialLinks[0];
      if (firstLink && firstLink.platform) {
        // Footer uses Button asChild with <a>, so links have role="button" with aria-label
        const linkButton = canvas.getByLabelText(firstLink.platform);
        await expect(linkButton).toBeInTheDocument();
        if (firstLink.url) {
          await expect(linkButton).toHaveAttribute("href", firstLink.url);
        }
        await expect(linkButton).toHaveAttribute("target", "_blank");
        await expect(linkButton).toHaveAttribute("rel", "noopener noreferrer");
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
    if (args.personalInfo?.socialLinks) {
      for (const link of args.personalInfo.socialLinks) {
        if (link.platform) {
          const linkElement = canvas.getByLabelText(link.platform);
          await expect(linkElement).toHaveAccessibleName(link.platform);
        }
      }
    }
  });

  await step("Verify external link security attributes", async () => {
    if (args.personalInfo?.socialLinks) {
      for (const link of args.personalInfo.socialLinks) {
        if (link.platform) {
          const linkElement = canvas.getByLabelText(link.platform);
          const rel = linkElement.getAttribute("rel");
          if (rel) {
            await expect(rel).toContain("noopener");
            await expect(rel).toContain("noreferrer");
          }
        }
      }
    }
  });
});

Default.test("Keyboard navigation", async ({ canvas, step, userEvent, args }) => {
  if (!args.personalInfo?.socialLinks || args.personalInfo.socialLinks.length === 0) {
    return;
  }

  await step("Tab to first social link", async () => {
    await userEvent.tab();
    const firstLink = args.personalInfo?.socialLinks?.[0];
    if (firstLink && firstLink.platform) {
      const linkElement = canvas.getByLabelText(firstLink.platform);
      const isFocused = document.activeElement === linkElement || document.activeElement?.contains(linkElement);
      await expect(isFocused).toBeTruthy();
    }
  });

  if (args.personalInfo?.socialLinks && args.personalInfo.socialLinks.length > 1) {
    await step("Tab to next social link", async () => {
      await userEvent.tab();
      const secondLink = args.personalInfo?.socialLinks?.[1];
      if (secondLink && secondLink.platform) {
        const linkElement = canvas.getByLabelText(secondLink.platform);
        const isFocused = document.activeElement === linkElement || document.activeElement?.contains(linkElement);
        await expect(isFocused).toBeTruthy();
      }
    });
  }
});
