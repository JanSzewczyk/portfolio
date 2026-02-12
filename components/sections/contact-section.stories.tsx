import { expect } from "storybook/test";
import { portfolioPageContactBuilder, portfolioPagePersonalInfoBuilder } from "~/tests/builders/portfolio-page.builder";

import { ContactSection } from "./contact-section";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Sections/Contact Section",
  component: ContactSection,
  args: {
    personalInfo: portfolioPagePersonalInfoBuilder.one(),
    contact: portfolioPageContactBuilder.one(),
    documentId: "test-portfolio-id",
    documentType: "portfolioPage"
  },
  parameters: {
    layout: "fullscreen"
  }
});

// Story named after component (CSF Next best practice)
export const ContactSection_ = meta.story({});

// Test 1: Section heading
ContactSection_.test("Renders section heading with title and description", async ({ canvas, args }) => {
  if (args.contact?.heading?.title) {
    const heading = canvas.getByRole("heading", { level: 2, name: args.contact.heading.title });
    await expect(heading).toBeVisible();
  }

  if (args.contact?.heading?.description) {
    const description = canvas.getByText(args.contact.heading.description);
    await expect(description).toBeVisible();
  }
});

// Test 2: Email card
ContactSection_.test("Displays email contact information", async ({ canvas, args }) => {
  if (args.personalInfo?.email) {
    // Find the email link directly
    const emailLink = canvas.getByRole("link", { name: args.personalInfo.email });
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toHaveAttribute("href", `mailto:${args.personalInfo.email}`);
  }
});

// Test 3: Social links
ContactSection_.test("Renders social media links", async ({ canvas, args }) => {
  const socialLinks = args.personalInfo?.socialLinks ?? [];

  if (socialLinks.length > 0) {
    // Verify each social link is rendered
    for (const link of socialLinks) {
      if (link.platform) {
        // Social links use Button asChild, so they have aria-label
        const socialLink = canvas.getByLabelText(link.platform);
        await expect(socialLink).toBeVisible();
        await expect(socialLink).toHaveAttribute("target", "_blank");
        await expect(socialLink).toHaveAttribute("rel", "noopener noreferrer");
      }
    }
  }
});

// Test 4: Quick chat card
ContactSection_.test("Displays quick chat card when enabled", async ({ canvas, args }) => {
  if (args.contact?.quickChat?.title) {
    // Quick chat title appears as a heading, but use getByText for dynamic faker content
    const quickChatTitle = canvas.getByText(args.contact.quickChat.title);
    await expect(quickChatTitle).toBeVisible();
  }

  if (args.contact?.quickChat?.description) {
    const quickChatDescription = canvas.getByText(args.contact.quickChat.description);
    await expect(quickChatDescription).toBeVisible();
  }
});

// Story: Without form
export const WithoutForm = meta.story({
  args: {
    personalInfo: portfolioPagePersonalInfoBuilder.one(),
    contact: portfolioPageContactBuilder.one({
      overrides: {
        form: {
          enabled: false,
          title: null,
          description: null,
          successMessage: null,
          submitButtonText: null,
          successView: null
        }
      }
    })
  }
});

WithoutForm.test("Renders correctly without contact form", async ({ canvas }) => {
  // Email card should still be visible
  const emailLabel = canvas.getByText("Email");
  await expect(emailLabel).toBeVisible();

  // Form fields should not be present
  const nameInput = canvas.queryByLabelText(/username/i);
  await expect(nameInput).not.toBeInTheDocument();
});
