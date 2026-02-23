import "server-only";

import { createLogger } from "~/lib/logger";
import { sanityFetch } from "~/lib/sanity/live";
import { seoQuery } from "~/lib/sanity/queries";
import  { type SeoQueryResult } from "~/lib/sanity/types";

const logger = createLogger({ module: "sanity-service", service: "seo" });

/**
 * Fetches SEO data from Sanity CMS with comprehensive logging and error handling.
 *
 * This service wraps the Sanity fetch operation with:
 * - Debug logging at start of operation
 * - Info logging on successful fetch with data summary
 * - Warning logging when data is missing/null
 * - Error logging on network or query errors
 * - Graceful fallback (returns null on any error)
 *
 * @returns SEO data from Sanity or null on error/missing data
 */
export async function fetchSeoData(): Promise<SeoQueryResult | null> {
  logger.debug({ query: "seoQuery" }, "Fetching SEO data from Sanity");

  try {
    const { data } = await sanityFetch({ query: seoQuery });

    if (!data) {
      logger.warn(
        {
          query: "seoQuery",
          reason: "noData"
        },
        "No SEO data returned from Sanity - using fallback values"
      );
      return null;
    }

    // Log summary of fetched data
    const summary = {
      hasMetaTitle: !!data.seo?.metaTitle,
      hasMetaDescription: !!data.seo?.metaDescription,
      hasOgImage: !!data.seo?.ogImage?.asset?.url,
      hasTwitterImage: !!data.seo?.twitterImage?.asset?.url,
      hasOrganization: !!data.seo?.organizationName,
      hasPersonalInfo: !!data.personalInfo?.name,
      keywordsCount: data.seo?.keywords?.length ?? 0
    };

    logger.info({ query: "seoQuery", summary }, "Successfully fetched SEO data from Sanity");

    return data;
  } catch (error) {
    // Log error details without exposing sensitive information
    logger.error(
      {
        query: "seoQuery",
        error: error instanceof Error ? { message: error.message, name: error.name } : String(error)
      },
      "Failed to fetch SEO data from Sanity - using fallback values"
    );

    return null;
  }
}
