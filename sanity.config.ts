"use client";

import { defineConfig } from "sanity";

import { visionTool } from "@sanity/vision";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { env } from "~/data/env/client";
import { schema, structure } from "~/lib/sanity/configuration";
import { resolve } from "~/lib/sanity/configuration/presentation/resolve";

export default defineConfig({
  basePath: "/studio",
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  schema,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION }),
    presentationTool({
      resolve,
      previewUrl: {
        previewMode: {
          enable: "/api/draft-mode/enable"
        }
      }
    })
  ]
});
