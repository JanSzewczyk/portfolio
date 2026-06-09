import { expect, screen } from "storybook/test";
import preview from "~/.storybook/preview";

import { CVDropdown } from "./cv-dropdown";

const enDownload = {
  _key: "en",
  file: {
    asset: {
      originalFilename: "Jan-Szewczyk-CV-EN.pdf",
      url: "https://cdn.sanity.io/files/project/dataset/cv-en.pdf"
    }
  },
  label: "English",
  languageCode: "en"
};

const plDownload = {
  _key: "pl",
  file: {
    asset: {
      originalFilename: "Jan-Szewczyk-CV-PL.pdf",
      url: "https://cdn.sanity.io/files/project/dataset/cv-pl.pdf"
    }
  },
  label: "Polski",
  languageCode: "pl"
};

const meta = preview.meta({
  component: CVDropdown,
  parameters: {
    layout: "centered"
  },
  title: "Components/About/CV Dropdown"
});

/**
 * Dropdown with two CV downloads (English and Polish).
 * Verifies flag rendering, download URLs and link security attributes.
 */
export const WithMultipleDownloads = meta.story({
  args: {
    downloads: [enDownload, plDownload]
  }
});

WithMultipleDownloads.test("Renders the Download CV trigger button", async ({ canvas }) => {
  const trigger = canvas.getByRole("button", { name: /download cv/i });
  await expect(trigger).toBeVisible();
});

WithMultipleDownloads.test("Opens dropdown with two download links on click", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: /download cv/i }));

  const englishLink = await screen.findByRole("menuitem", { name: /english/i });
  const polishLink = await screen.findByRole("menuitem", { name: /polski/i });

  await expect(englishLink).toBeVisible();
  await expect(polishLink).toBeVisible();
});

WithMultipleDownloads.test("English link has correct download URL with ?dl suffix", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: /download cv/i }));

  const englishLink = await screen.findByRole("menuitem", { name: /english/i });
  await expect(englishLink).toHaveAttribute("href", "https://cdn.sanity.io/files/project/dataset/cv-en.pdf?dl");
});

WithMultipleDownloads.test("Download links have correct security attributes", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: /download cv/i }));

  const englishLink = await screen.findByRole("menuitem", { name: /english/i });
  await expect(englishLink).toHaveAttribute("target", "_blank");
  await expect(englishLink).toHaveAttribute("rel", "noopener noreferrer");
});

WithMultipleDownloads.test("English link displays GB flag emoji", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: /download cv/i }));

  const englishLink = await screen.findByRole("menuitem", { name: /english/i });
  await expect(englishLink).toHaveTextContent("🇬🇧");
});

/**
 * Empty downloads list — component should render nothing.
 */
export const EmptyDownloads = meta.story({
  args: {
    downloads: []
  }
});

EmptyDownloads.test("Does not render the trigger button when downloads are empty", async ({ canvas }) => {
  const trigger = canvas.queryByRole("button", { name: /download cv/i });
  await expect(trigger).not.toBeInTheDocument();
});

/**
 * Download with an unknown language code — should fall back to the globe emoji.
 */
export const WithUnknownLanguage = meta.story({
  args: {
    downloads: [
      {
        _key: "xx",
        file: {
          asset: {
            originalFilename: "cv-xx.pdf",
            url: "https://cdn.sanity.io/files/project/dataset/cv-xx.pdf"
          }
        },
        label: "Unknown Language",
        languageCode: "xx"
      }
    ]
  }
});

WithUnknownLanguage.test("Falls back to globe emoji for unknown language code", async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: /download cv/i }));

  const link = await screen.findByRole("menuitem", { name: /unknown language/i });
  await expect(link).toHaveTextContent("🌐");
});
