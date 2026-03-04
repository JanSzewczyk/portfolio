import { defineLive } from "next-sanity/live";
import { env } from "~/data/env/server";

import { client } from "./client";

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    apiVersion: env.SANITY_STUDIO_API_VERSION
  }),
  serverToken: env.SANITY_API_READ_TOKEN
});
