import { expect } from "storybook/test";

import { ContactEmail } from "./contact-email";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Features/Contact/Templates/Contact Email",
  component: ContactEmail,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Minimal React Email component for contact form submissions."
      }
    }
  }
});

/**
 * Default contact email with typical content
 */
export const ContactEmailStory = meta.story({
  name: "Contact Email",
  args: {
    name: "John Doe",
    email: "john.doe@example.com",
    message:
      "Hello! I'm interested in discussing a potential project collaboration. I was impressed by your portfolio and would love to chat about working together.\n\nPlease let me know when you're available for a call.\n\nBest regards,\nJohn"
  }
});

// Test: Renders all required fields
ContactEmailStory.test("Renders sender name, email, and message", async ({ canvas }) => {
  // Check labels exist (use exact text to avoid matching footer)
  const fromLabel = canvas.getByText("FROM");
  const emailLabel = canvas.getByText("EMAIL");
  const messageLabel = canvas.getByText("MESSAGE");

  await expect(fromLabel).toBeVisible();
  await expect(emailLabel).toBeVisible();
  await expect(messageLabel).toBeVisible();

  // Check values
  const name = canvas.getByText("John Doe");
  const email = canvas.getByText("john.doe@example.com");

  await expect(name).toBeVisible();
  await expect(email).toBeVisible();
});

// Test: Email is a clickable mailto link
ContactEmailStory.test("Email is rendered as mailto link", async ({ canvas }) => {
  const emailLink = canvas.getByRole("link", { name: /john.doe@example.com/i });
  await expect(emailLink).toBeVisible();
  await expect(emailLink).toHaveAttribute("href", "mailto:john.doe@example.com");
});

// Test: Header is visible
ContactEmailStory.test("Displays header with title", async ({ canvas }) => {
  const header = canvas.getByRole("heading", { name: /New Contact Form Submission/i });
  await expect(header).toBeVisible();
});

// Test: Footer is visible
ContactEmailStory.test("Displays footer text", async ({ canvas }) => {
  const footer = canvas.getByText(/Sent from portfolio contact form/i);
  await expect(footer).toBeVisible();
});

/**
 * Email with short, concise message
 */
export const ShortMessage = meta.story({
  args: {
    name: "Alice Smith",
    email: "alice@startup.io",
    message: "Quick question about your availability for a consultation. Are you free next week?"
  }
});

/**
 * Email with a very long message to test text wrapping and whitespace preservation
 */
export const LongMessage = meta.story({
  args: {
    name: "Robert Anderson",
    email: "robert.anderson@company.com",
    message: `Dear Portfolio Owner,

I hope this message finds you well. I'm reaching out because our company is currently looking for talented developers to work on a major project that we believe aligns perfectly with your expertise.

We've reviewed your portfolio extensively and are particularly impressed with:
- Your attention to detail in UI/UX design
- The clean, maintainable code structure in your projects
- Your experience with modern React and Next.js
- The comprehensive testing approach you've demonstrated

The project we have in mind involves building a complex web application that will serve thousands of users. We're looking for someone who can:

1. Lead the frontend architecture decisions
2. Implement pixel-perfect designs
3. Ensure accessibility compliance
4. Write comprehensive tests
5. Collaborate with our backend team

We'd love to schedule a call to discuss this opportunity in more detail. Are you available for a 30-minute video call sometime next week?

Looking forward to hearing from you.

Best regards,
Robert Anderson
Senior Engineering Manager
Tech Innovations Inc.`
  }
});

/**
 * Email with international characters and special symbols
 */
export const InternationalCharacters = meta.story({
  args: {
    name: "François Müller",
    email: "francois.muller@société.fr",
    message: `Bonjour!

Je vous écris pour discuter d'une opportunité de collaboration. J'ai été impressionné par votre travail.

Quelques détails techniques:
• React & TypeScript
• Architecture moderne
• Tests complets

Cordialement,
François`
  }
});

/**
 * Email with special characters that need proper escaping
 */
export const SpecialCharacters = meta.story({
  args: {
    name: "Test User <script>",
    email: "test@example.com",
    message: 'Message with "quotes" and <brackets> & ampersands that should be properly escaped.'
  }
});

SpecialCharacters.test("Special characters are properly escaped", async ({ canvas }) => {
  // Should display the raw text, not execute as HTML
  const name = canvas.getByText(/Test User <script>/i);
  await expect(name).toBeVisible();
});

/**
 * Email with minimal content to test edge case
 */
export const MinimalContent = meta.story({
  args: {
    name: "Bo",
    email: "bo@me.co",
    message: "Hey, let's talk!"
  }
});

/**
 * Email with email address containing special characters
 */
export const ComplexEmail = meta.story({
  args: {
    name: "Developer Name",
    email: "complex.email+tag@sub-domain.example.com",
    message: "Testing complex email address rendering and mailto link functionality."
  }
});

ComplexEmail.test("Complex email renders correctly as mailto link", async ({ canvas }) => {
  const emailLink = canvas.getByRole("link", { name: /complex.email\+tag@sub-domain.example.com/i });
  await expect(emailLink).toBeVisible();
  await expect(emailLink).toHaveAttribute("href", "mailto:complex.email+tag@sub-domain.example.com");
});
