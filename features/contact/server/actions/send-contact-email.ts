"use server";

import { createElement } from "react";

import { type CreateEmailResponseSuccess, Resend } from "resend";

import { env } from "~/data/env/server";
import type { ContactFormData } from "~/features/contact/schemas/contact.schema";
import { createLogger } from "~/lib/logger";
import type { ActionResponse } from "~/lib/server-action";

import { ContactEmail } from "../../components/templates/contact-email";

const logger = createLogger({ module: "contact-actions" });

// Initialize Resend client
const resend = new Resend(env.RESEND_API_KEY);

export async function sendContactEmail(formData: ContactFormData): ActionResponse<CreateEmailResponseSuccess> {
  try {
    // Log the attempt
    logger.info(
      {
        email: formData.email,
        messageLength: formData.message.length,
        name: formData.name
      },
      "Attempting to send contact email"
    );

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: env.RESEND_FROM_EMAIL,
      react: createElement(ContactEmail, formData),
      replyTo: formData.email,
      subject: `Portfolio Contact: ${formData.name}`,
      to: env.RESEND_TO_EMAIL
    });

    if (error) {
      logger.error(
        {
          errorMessage: error.message,
          errorName: error.name,
          senderEmail: formData.email
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
        senderEmail: formData.email,
        senderName: formData.name
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
