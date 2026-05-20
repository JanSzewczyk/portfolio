"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import { schema, structure } from "./lib/sanity/configuration";
import { resolve } from "./lib/sanity/configuration/presentation/resolve";

export default defineConfig({
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? process.env.SANITY_STUDIO_API_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? process.env.SANITY_STUDIO_API_DATASET ?? "",
  schema,
  plugins: [
    structureTool({ structure }),
    visionTool({
      defaultApiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? process.env.SANITY_STUDIO_DEPLOYMENT_APP_ID
    }),
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
