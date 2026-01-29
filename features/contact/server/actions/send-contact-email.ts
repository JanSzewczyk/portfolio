"use server";

import { type CreateEmailResponseSuccess, Resend } from "resend";

import { env } from "~/data/env/server";
import { type ContactFormData } from "~/features/contact/schemas/contact.schema";
import { type ActionResponse } from "~/lib/action-types";
import { createLogger } from "~/lib/logger";

import { generateContactEmail, generateContactEmailText } from "../../templates/contact-email.template";

const logger = createLogger({ module: "contact-actions" });

// Initialize Resend client
const resend = new Resend(env.RESEND_API_KEY);

export async function sendContactEmail(formData: ContactFormData): ActionResponse<CreateEmailResponseSuccess> {
  try {
    // if (!validationResult.success) {
    //   const flattened = validationResult.error.flatten();
    //
    //   // Check for honeypot violation (bot detected)
    //   if (flattened.fieldErrors.website) {
    //     logger.warn(
    //       {
    //         honeypot: rawData.website,
    //         email: rawData.email
    //       },
    //       "Honeypot field filled - possible bot submission blocked"
    //     );
    //
    //     // Return generic error to not reveal anti-bot measures
    //     return {
    //       success: false,
    //       error: "Unable to process your request. Please try again."
    //     };
    //   }
    //
    //   logger.warn(
    //     {
    //       errors: validationResult.error.issues,
    //       email: rawData.email
    //     },
    //     "Contact form validation failed"
    //   );
    //
    //   return {
    //     success: false,
    //     error: flattened.formErrors[0] ?? "Invalid form data",
    //     fieldErrors: flattened.fieldErrors
    //   };
    // }

    // Log the attempt
    logger.info(
      {
        name: formData.name,
        email: formData.email,
        messageLength: formData.message.length
      },
      "Attempting to send contact email"
    );

    // Generate email content
    const htmlContent = generateContactEmail(formData);
    const textContent = generateContactEmailText(formData);

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: env.RESEND_FROM_EMAIL,
      to: env.RESEND_TO_EMAIL,
      replyTo: formData.email,
      subject: `Portfolio Contact: ${formData.name}`,
      html: htmlContent,
      text: textContent
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
        success: false,
        error: "Failed to send email. Please try again later or contact me directly via email."
      };
    }

    logger.info(
      {
        emailId: data?.id,
        senderName: formData.name,
        senderEmail: formData.email
      },
      "Contact email sent successfully"
    );

    return {
      success: true,
      data
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
      success: false,
      error: "An unexpected error occurred. Please try again later."
    };
  }
}
