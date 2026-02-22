"use client";

import { defineConfig } from "sanity";

import { visionTool } from "@sanity/vision";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import { schema, structure } from "./lib/sanity/configuration";
import { resolve } from "./lib/sanity/configuration/presentation/resolve";

export default defineConfig({
  basePath: "/studio",
  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID ?? "",
  dataset: process.env.SANITY_STUDIO_API_DATASET ?? "",
  schema,
  plugins: [
    structureTool({ structure }),
    visionTool({
      defaultApiVersion: process.env.SANITY_STUDIO_DEPLOYMENT_APP_ID
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
