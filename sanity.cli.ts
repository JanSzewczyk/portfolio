/**
 * This configuration file lets you run `$ sanity [command]` in this folder
 * Go to https://www.sanity.io/docs/cli to learn more.
 **/
import { defineCliConfig } from "sanity/cli";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export default defineCliConfig({
  api: { projectId, dataset },
  deployment: {
    appId: "juuyslopxpq4fl70pr55ual9"
  },
  schemaExtraction: {
    path: "lib/sanity/schema.json"
  },
  typegen: {
    path: "lib/sanity/**/*.{ts,tsx,js,jsx}",
    schema: "lib/sanity/schema.json",
    generates: "lib/sanity/types.ts",
    overloadClientMethods: true
  }
});
