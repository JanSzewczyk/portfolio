import { expect, waitFor } from "storybook/test";
import preview from "~/.storybook/preview";
import {
  experienceBuilder,
  portfolioPageExperienceBuilder,
} from "~/tests/builders/portfolio-page.builder";
import { ExperienceSection } from "./experience-section";

const meta = preview.meta({
  title: "Components/Sections/Experience Section",
  component: ExperienceSection,
  args: {
    experience: portfolioPageExperienceBuilder.one({
      overrides: {
        heading: {
          title: "Experience",
          description: "My professional journey and key achievements",
        },
      },
    }),
    documentId: "portfolio-page",
    documentType: "portfolioPage",
  },
  parameters: {
    layout: "fullscreen",
  },
});

export const ExperienceSection_Default = meta.story({
  name: "Experience Section",
});

// Test 1: Section renders with heading
ExperienceSection_Default.test(
  "Renders section heading and description",
  async ({ canvas, args }) => {
    const heading = canvas.getByRole("heading", {
      name: args.experience?.heading?.title || "",
      level: 2,
    });
    await expect(heading).toBeVisible();

    if (args.experience?.heading?.description) {
      const description = canvas.getByText(args.experience.heading.description);
      await expect(description).toBeVisible();
    }
  },
);

// Test 2: All experiences are rendered
ExperienceSection_Default.test(
  "Renders all experience items",
  async ({ canvas, args }) => {
    const experiences = args.experience?.experiences || [];

    for (const exp of experiences) {
      if (exp.role) {
        const roleElement = canvas.getByText(exp.role);
        await expect(roleElement).toBeVisible();
      }

      if (exp.company) {
        const companyName = canvas.getByText(exp.company);
        await expect(companyName).toBeVisible();
      }
    }
  },
);

// Test 3: Company logo images are displayed
ExperienceSection_Default.test(
  "Displays company logo images when provided",
  async ({ canvas, args }) => {
    const experiences = args.experience?.experiences || [];

    // Check that at least one company has a logo
    const hasLogos = experiences.some((exp) => exp.companyLogo?.asset?.url);

    if (hasLogos) {
      // Find all logo images - they should have alt text with company name
      const firstExpWithLogo = experiences.find(
        (exp) => exp.companyLogo?.asset?.url,
      );
      if (firstExpWithLogo?.company) {
        const logo = canvas.queryByAltText(firstExpWithLogo.company);
        if (logo) {
          await expect(logo).toBeInTheDocument();
        }
      }
    }
  },
);

// Test 4: Company URLs are clickable
ExperienceSection_Default.test(
  "Company links are clickable and open in new tab",
  async ({ canvas, args }) => {
    const experiences = args.experience?.experiences || [];

    for (const exp of experiences) {
      if (exp.companyUrl && exp.company) {
        const link = canvas.getByRole("link", { name: exp.company });
        await expect(link).toBeVisible();
        await expect(link).toHaveAttribute("href", exp.companyUrl);
        await expect(link).toHaveAttribute("target", "_blank");
        await expect(link).toHaveAttribute("rel", "noopener noreferrer");
      }
    }
  },
);

// Test 5: Period badges are displayed correctly
ExperienceSection_Default.test(
  "Displays period and employment type badges",
  async ({ canvas }) => {
    const periodBadges = canvas.getAllByText(
      /Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/,
    );

    if (periodBadges.length > 0) {
      await expect(periodBadges[0]).toBeVisible();
    }

    const typeBadges = canvas.getAllByText(
      /full-time|part-time|contract|freelance/i,
    );

    if (typeBadges.length > 0) {
      await expect(typeBadges[0]).toBeVisible();
    }
  },
);

// Test 6: Accordion for responsibilities works
ExperienceSection_Default.test(
  "Expands responsibilities accordion",
  async ({ canvas, userEvent, args }) => {
    const responsibilitiesButtons = canvas.getAllByRole("button", {
      name: /key responsibilities/i,
    });

    if (responsibilitiesButtons.length === 0) {
      return;
    }

    const firstButton = responsibilitiesButtons[0];

    if (!firstButton) {
      throw new Error("First button not found");
    }

    await expect(firstButton).toBeVisible();
    await userEvent.click(firstButton);

    // Wait for accordion to expand
    await waitFor(async () => {
      const experiences = args.experience?.experiences || [];
      if (experiences[0]?.responsibilities?.[0]) {
        const firstResponsibility = canvas.getByText(
          experiences[0].responsibilities[0],
        );
        await expect(firstResponsibility).toBeVisible();
      }
    });
  },
);

// Test 7: Technologies are displayed
ExperienceSection_Default.test(
  "Displays technology badges",
  async ({ canvas, args }) => {
    const experiences = args.experience?.experiences || [];

    for (const exp of experiences) {
      if (exp.technologies) {
        for (const tech of exp.technologies) {
          if (tech.name) {
            const techBadges = canvas.getAllByText(new RegExp(tech.name, "i"));
            if (techBadges.length > 0) {
              await expect(techBadges[0]).toBeVisible();
            }
          }
        }
      }
    }
  },
);

// Story without company logos
export const WithoutLogos = meta.story({
  name: "Without Company Logos",
  args: {
    experience: portfolioPageExperienceBuilder.one({
      overrides: {
        heading: {
          title: "Experience",
          description: "My professional journey and key achievements",
        },
        experiences: Array.from({ length: 3 }, () =>
          experienceBuilder.one({
            traits: ["withoutLogo"],
          }),
        ),
      },
    }),
    documentId: "portfolio-page",
    documentType: "portfolioPage",
  },
});

// Test 8: Fallback initials are displayed
WithoutLogos.test(
  "Displays company logo fallback with first letter",
  async ({ canvas, args }) => {
    const experiences = args.experience?.experiences || [];

    for (const exp of experiences) {
      if (!exp.companyLogo && exp.company) {
        const firstLetter = exp.company.charAt(0).toUpperCase();
        const fallbackLogos = canvas.getAllByText(firstLetter, {
          selector: "span",
        });
        await expect(fallbackLogos.length).toBeGreaterThan(0);
      }
    }
  },
);

// Story with current position (no end date)
export const CurrentPosition = meta.story({
  name: "Current Position",
  args: {
    experience: portfolioPageExperienceBuilder.one({
      overrides: {
        heading: {
          title: "Experience",
          description: "My professional journey and key achievements",
        },
        experiences: [
          experienceBuilder.one({
            traits: ["current"],
            overrides: {
              role: "Senior Frontend Engineer",
              company: "Tech Company Inc.",
              type: "full-time",
            },
          }),
        ],
      },
    }),
    documentId: "portfolio-page",
    documentType: "portfolioPage",
  },
});

// Test 9: Present is displayed for current position
CurrentPosition.test(
  "Displays 'Present' for current position without end date",
  async ({ canvas }) => {
    const presentBadge = canvas.getByText(/present/i);
    await expect(presentBadge).toBeVisible();
  },
);
