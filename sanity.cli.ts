/**
 * This configuration file lets you run `$ sanity [command]` in this folder
 * Go to https://www.sanity.io/docs/cli to learn more.
 **/
import { defineCliConfig } from "sanity/cli";

const projectId = process.env.SANITY_STUDIO_API_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_API_DATASET;

export default defineCliConfig({
  api: { dataset, projectId },
  deployment: {
    appId: process.env.SANITY_STUDIO_DEPLOYMENT_APP_ID
  },

  schemaExtraction: {
    path: "lib/sanity/schema.json"
  },
  typegen: {
    generates: "lib/sanity/types.ts",
    overloadClientMethods: true,
    path: "lib/sanity/**/*.{ts,tsx,js,jsx}",
    schema: "lib/sanity/schema.json"
  }
});
