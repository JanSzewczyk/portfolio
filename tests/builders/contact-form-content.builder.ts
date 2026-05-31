import { faker } from "@faker-js/faker";
import { build } from "mimicry-js";
import type { PortfolioPageQueryResult } from "~/lib/sanity/types";

/**
 * Type definition for ContactForm content from Sanity CMS.
 *
 * This is the exact type from the Sanity query result for contact.form
 */
export type ContactFormContent = NonNullable<NonNullable<PortfolioPageQueryResult>["contact"]>["form"];

/**
 * Builder for ContactFormContent test data.
 *
 * Generates realistic contact form content from Sanity CMS.
 *
 * @example
 * const formContent = contactFormContentBuilder.one();
 *
 * @example
 * const customContent = contactFormContentBuilder.one({
 *   overrides: { title: "Contact Us Today" }
 * });
 *
 * @example
 * // Minimal content (all optional fields)
 * const minimal = contactFormContentBuilder.one({
 *   overrides: {
 *     title: undefined,
 *     description: undefined,
 *     successMessage: undefined,
 *     successView: undefined
 *   }
 * });
 */
export const contactFormContentBuilder = build<ContactFormContent>({
  fields: {
    description: "Fill out the form and I'll get back to you as soon as possible.",
    enabled: true,
    submitButtonText: "Send Message",
    successMessage: "Thank you! Your message has been sent successfully.",
    successView: {
      buttonText: "Send another message",
      description: "I'll get back to you within 24-48 hours. Thank you for reaching out!",
      title: "Thank you for your message!"
    },
    title: "Send a Message"
  },
  traits: {
    /**
     * Disabled form - form is disabled in Sanity
     */
    disabled: {
      overrides: {
        enabled: false
      }
    },

    /**
     * Extended content - verbose descriptions and custom success message
     */
    extended: {
      overrides: {
        description: () => faker.lorem.paragraphs(1),
        submitButtonText: () => faker.lorem.words(2),
        successMessage: () => faker.lorem.sentence(),
        successView: {
          buttonText: () => faker.lorem.words(3),
          description: () => faker.lorem.paragraphs(1),
          title: () => faker.lorem.words(5)
        },
        title: () => faker.lorem.words(4)
      }
    },

    /**
     * Minimal content - only title field
     */
    minimal: {
      overrides: {
        description: null,
        enabled: true,
        submitButtonText: null,
        successMessage: null,
        successView: null,
        title: "Contact"
      }
    }
  }
});
