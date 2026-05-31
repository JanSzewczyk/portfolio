import { expect } from "storybook/test";
import preview from "~/.storybook/preview";
import { portfolioPageContactBuilder, portfolioPagePersonalInfoBuilder } from "~/tests/builders/portfolio-page.builder";
import { ContactSection } from "./contact-section";

const meta = preview.meta({
  args: {
    contact: portfolioPageContactBuilder.one({
      overrides: {
        heading: {
          description: "Have a question or want to work together?",
          title: "Get In Touch"
        },
        quickChat: {
          description: "Feel free to reach out anytime.",
          title: "Quick Chat"
        }
      }
    }),
    documentId: "test-portfolio-id",
    documentType: "portfolioPage",
    personalInfo: portfolioPagePersonalInfoBuilder.one({
      overrides: {
        email: "jan@example.com",
        socialLinks: [
          {
            _key: "key-github",
            icon: "SiGithub",
            platform: "GitHub",
            url: "https://github.com/test",
            username: "test-user"
          },
          {
            _key: "key-linkedin",
            icon: "TbBrandLinkedin",
            platform: "LinkedIn",
            url: "https://linkedin.com/in/test",
            username: "test-user"
          }
        ]
      }
    })
  },
  component: ContactSection,
  parameters: {
    layout: "fullscreen"
  },
  title: "Components/Sections/Contact Section"
});

export const ContactSectionStory = meta.story({
  name: "Contact Section"
});

// Test 1: Section heading
ContactSectionStory.test("Renders section heading with title and description", async ({ canvas }) => {
  const label = canvas.getByText("Get In Touch");
  await expect(label).toBeVisible();

  const heading = canvas.getByRole("heading", {
    level: 2,
    name: "Have a question or want to work together?"
  });
  await expect(heading).toBeVisible();
});

// Test 2: Email card
ContactSectionStory.test("Displays email contact information", async ({ canvas }) => {
  const emailLink = canvas.getByRole("link", { name: "jan@example.com" });
  await expect(emailLink).toBeVisible();
  await expect(emailLink).toHaveAttribute("href", "mailto:jan@example.com");
});

// Test 3: Social links
ContactSectionStory.test("Renders social media links", async ({ canvas }) => {
  const githubLink = canvas.getByLabelText("GitHub");
  await expect(githubLink).toBeVisible();
  await expect(githubLink).toHaveAttribute("target", "_blank");
  await expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");

  const linkedinLink = canvas.getByLabelText("LinkedIn");
  await expect(linkedinLink).toBeVisible();
  await expect(linkedinLink).toHaveAttribute("target", "_blank");
  await expect(linkedinLink).toHaveAttribute("rel", "noopener noreferrer");
});

// Test 4: Quick chat card
ContactSectionStory.test("Displays quick chat card", async ({ canvas }) => {
  const quickChatTitle = canvas.getByText("Quick Chat");
  await expect(quickChatTitle).toBeVisible();

  const quickChatDescription = canvas.getByText("Feel free to reach out anytime.");
  await expect(quickChatDescription).toBeVisible();
});

// Story: Without form
export const WithoutForm = meta.story({
  args: {
    contact: portfolioPageContactBuilder.one({
      overrides: {
        form: {
          description: null,
          enabled: false,
          submitButtonText: null,
          successMessage: null,
          successView: null,
          title: null
        },
        heading: {
          description: "Have a question or want to work together?",
          title: "Get In Touch"
        },
        quickChat: {
          description: "Feel free to reach out anytime.",
          title: "Quick Chat"
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
  await expect(nameInput).toBeNull();
});
