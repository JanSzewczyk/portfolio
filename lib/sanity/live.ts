import { defineLive } from "next-sanity/live";
import { env } from "~/data/env/server";

import { client } from "./client";

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    apiVersion: "vX" // Use latest API version for Live Content API
  }),
  // Only a server token is provided. The read token must NOT be exposed to the
  // browser: it would let cdn.sanity.io set the third-party `sanitySession`
  // cookie (Lighthouse best-practices) and leak a credential client-side. Live
  // updates for published content work without a browser token; draft preview
  // is handled separately via draft mode in app/(app)/layout.tsx.
  serverToken: env.SANITY_API_READ_TOKEN
});
