import { build } from "mimicry-js";

import { faker } from "@faker-js/faker";
import { type PortfolioPageQueryResult } from "~/lib/sanity/types";

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
    enabled: true,
    title: "Send a Message",
    description: "Fill out the form and I'll get back to you as soon as possible.",
    successMessage: "Thank you! Your message has been sent successfully.",
    submitButtonText: "Send Message",
    successView: {
      title: "Thank you for your message!",
      description: "I'll get back to you within 24-48 hours. Thank you for reaching out!",
      buttonText: "Send another message"
    }
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
        title: () => faker.lorem.words(4),
        description: () => faker.lorem.paragraphs(1),
        successMessage: () => faker.lorem.sentence(),
        submitButtonText: () => faker.lorem.words(2),
        successView: {
          title: () => faker.lorem.words(5),
          description: () => faker.lorem.paragraphs(1),
          buttonText: () => faker.lorem.words(3)
        }
      }
    },

    /**
     * Minimal content - only title field
     */
    minimal: {
      overrides: {
        enabled: true,
        title: "Contact",
        description: null,
        successMessage: null,
        submitButtonText: null,
        successView: null
      }
    }
  }
});
