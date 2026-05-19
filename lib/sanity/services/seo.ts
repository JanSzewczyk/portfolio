import "server-only";

import { cache } from "react";

import { createLogger } from "~/lib/logger";
import { sanityFetch } from "~/lib/sanity/live";
import { seoQuery } from "~/lib/sanity/queries";
import type { SeoQueryResult } from "~/lib/sanity/types";

const logger = createLogger({ module: "sanity-service", service: "seo" });

/**
 * Retrieves SEO data from Sanity CMS.
 *
 * @returns Tuple [error, data] - error is null on success, data is null on error
 */
async function getSeoData(): Promise<
  [null, NonNullable<SeoQueryResult>] | [Error, null]
> {
  const fnLogger = logger.child({ query: "seoQuery" });
  fnLogger.debug("Fetching SEO data from Sanity");

  try {
    const { data } = await sanityFetch({ query: seoQuery });

    if (!data) {
      const error = new Error("No SEO data returned from Sanity");
      fnLogger.warn(
        {
          reason: "noData",
        },
        error.message,
      );
      return [error, null];
    }

    // Log summary of fetched data
    const summary = {
      hasMetaTitle: !!data.seo?.metaTitle,
      hasMetaDescription: !!data.seo?.metaDescription,
      hasOgImage: !!data.seo?.ogImage?.asset?.url,
      hasTwitterImage: !!data.seo?.twitterImage?.asset?.url,
      hasOrganization: !!data.seo?.organizationName,
      hasPersonalInfo: !!data.personalInfo?.name,
      keywordsCount: data.seo?.keywords?.length ?? 0,
    };

    fnLogger.info({ summary }, "Successfully fetched SEO data from Sanity");

    return [null, data];
  } catch (error) {
    const apiError =
      error instanceof Error
        ? error
        : new Error("Unknown error fetching SEO data");
    fnLogger.error(
      {
        error: { message: apiError.message, name: apiError.name },
      },
      "Failed to fetch SEO data from Sanity",
    );

    return [apiError, null];
  }
}

/**
 * Cached version of getSeoData to prevent duplicate requests during the same render.
 * This wraps the SEO data fetching with React's cache() utility to ensure
 * that multiple calls within the same request cycle return the same result.
 */
export const getCachedSeoData = cache(getSeoData);
