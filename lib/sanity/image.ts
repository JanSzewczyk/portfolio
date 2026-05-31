import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { env } from "~/data/env/client";

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID
});

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
