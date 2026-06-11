"use server";

import { createElement } from "react";

import { type CreateEmailResponseSuccess, Resend } from "resend";

import { env } from "~/data/env/server";
import { ContactEmail } from "~/features/contact/components/templates/contact-email";
import { type ContactFormData, contactFormSchema } from "~/features/contact/schemas/contact.schema";
import { createLogger } from "~/lib/logger";
import type { ActionResponse } from "~/lib/server-action";

const logger = createLogger({ module: "contact-actions" });

// Initialize Resend client
const resend = new Resend(env.RESEND_API_KEY);

export async function sendContactEmail(formData: ContactFormData): ActionResponse<CreateEmailResponseSuccess> {
  try {
    // Re-validate on the server (defense in depth) — never trust the client-side type alone
    const validation = contactFormSchema.safeParse(formData);

    if (!validation.success) {
      logger.warn(
        {
          issues: validation.error.issues.map((issue) => ({ message: issue.message, path: issue.path }))
        },
        "Rejected invalid contact form submission"
      );

      return {
        error: "Invalid form data. Please check your input and try again.",
        success: false
      };
    }

    const validatedData = validation.data;

    // Log the attempt
    logger.info(
      {
        email: validatedData.email,
        messageLength: validatedData.message.length,
        name: validatedData.name
      },
      "Attempting to send contact email"
    );

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: env.RESEND_FROM_EMAIL,
      react: createElement(ContactEmail, validatedData),
      replyTo: validatedData.email,
      subject: `Portfolio Contact: ${validatedData.name}`,
      to: env.RESEND_TO_EMAIL
    });

    if (error) {
      logger.error(
        {
          errorMessage: error.message,
          errorName: error.name,
          senderEmail: validatedData.email
        },
        "Failed to send contact email via Resend"
      );

      return {
        error: "Failed to send email. Please try again later or contact me directly via email.",
        success: false
      };
    }

    logger.info(
      {
        emailId: data?.id,
        senderEmail: validatedData.email,
        senderName: validatedData.name
      },
      "Contact email sent successfully"
    );

    return {
      data,
      success: true
    };
  } catch (error) {
    logger.error(
      {
        errorMessage: error instanceof Error ? error.message : "Unknown error",
        errorStack: error instanceof Error ? error.stack : undefined
      },
      "Unexpected error sending contact email"
    );

    // Generic error message for unexpected failures
    return {
      error: "An unexpected error occurred. Please try again later.",
      success: false
    };
  }
}
