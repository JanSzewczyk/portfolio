import { z } from "zod";

export const contactFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be less than 100 characters"),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Please enter a valid email address"),
    message: z
      .string()
      .trim()
      .min(10, "Message must be at least 10 characters")
      .max(1000, "Message must be less than 1000 characters"),
    // Honeypot field - should be empty for legitimate submissions
    website: z.string().optional(),
  })
  .refine((data) => !data.website || data.website.trim() === "", {
    message: "Invalid submission detected",
    path: ["website"],
  });

export type ContactFormData = z.output<typeof contactFormSchema>;
