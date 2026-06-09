import { defineLive } from "next-sanity/live";
import { env } from "~/data/env/server";

import { client } from "./client";

export const { sanityFetch, SanityLive } = defineLive({
  browserToken: env.SANITY_API_READ_TOKEN,
  client: client.withConfig({
    apiVersion: "vX" // Use latest API version for Live Content API
  }),
  serverToken: env.SANITY_API_READ_TOKEN
});
