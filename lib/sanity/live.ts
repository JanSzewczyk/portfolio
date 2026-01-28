import { defineLive } from "next-sanity/live";
import { env } from "~/data/env/server";

import { client } from "./client";

const token = env.SANITY_API_READ_TOKEN;

if (!token) {
  throw new Error("Missing SANITY_API_READ_TOKEN environment variable");
}

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    apiVersion: "vX" // Use latest API version for Live Content API
  }),
  serverToken: token,
  browserToken: token
});
