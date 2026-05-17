import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    ANALYZE: z
      .enum(["true", "false"])
      .optional()
      .transform((value) => value === "true"),
    CI: z
      .enum(["true", "false", "0", "1"])
      .optional()
      .transform((value) => value === "true" || value === "1"),
    VERCEL_URL: z.string().optional(),
    LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace"]).optional().default("info"),
    // Sanity
    SANITY_API_READ_TOKEN: z.string().min(1),
    SANITY_REVALIDATE_SECRET: z.string().min(1),
    SANITY_STUDIO_API_PROJECT_ID: z.string(),
    SANITY_STUDIO_API_DATASET: z.string(),
    SANITY_STUDIO_API_VERSION: z.string(),
    SANITY_STUDIO_DEPLOYMENT_APP_ID: z.string().min(1),
    // Resend
    RESEND_API_KEY: z.string().min(1),
    RESEND_FROM_EMAIL: z.email(),
    RESEND_TO_EMAIL: z.email()
  },
  experimental__runtimeEnv: process.env,
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true
});
