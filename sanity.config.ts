"use client";

import { defineConfig } from "sanity";

import { visionTool } from "@sanity/vision";
import { structureTool } from "sanity/structure";
import { env } from "~/data/env/client";

import { schema, structure } from "./lib/sanity/configuration";

export default defineConfig({
  basePath: "/studio",
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  schema,
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION })
  ]
});
