import { defineConfig } from "sanity";

import { visionTool } from "@sanity/vision";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./sanity-studio/env";
import { schema } from "./sanity-studio/schemaTypes";
import { structure } from "./sanity-studio/structure";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion })
  ]
});
