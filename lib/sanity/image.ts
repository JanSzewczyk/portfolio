import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import { env } from "~/data/env/client";

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
});

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
