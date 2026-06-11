import "server-only";

import { createLogger } from "~/lib/logger";
import { client } from "~/lib/sanity/client";
import { sanityFetch } from "~/lib/sanity/live";
import { portfolioPageQuery } from "~/lib/sanity/queries";
import type { PortfolioPageQueryResult } from "~/lib/sanity/types";

const logger = createLogger({
  module: "sanity-service",
  service: "portfolio-page"
});

/**
 * Retrieves portfolio page data from Sanity CMS.
 *
 * @returns Tuple [error, data] - error is null on success, data is null on error
 */
export async function getPortfolioPageData(): Promise<[null, NonNullable<PortfolioPageQueryResult>] | [Error, null]> {
  const fnLogger = logger.child({ query: "portfolioPageQuery" });
  fnLogger.debug("Fetching portfolio page data from Sanity");

  try {
    const { data } = await sanityFetch({ query: portfolioPageQuery });

    if (!data) {
      const error = new Error("No portfolio page data returned from Sanity");
      // Distinct name lets callers map "no data" → notFound() and real failures → throw
      error.name = "PortfolioPageNotFoundError";
      fnLogger.warn(
        {
          reason: "noData"
        },
        error.message
      );
      return [error, null];
    }

    fnLogger.info("Successfully fetched portfolio page data from Sanity");

    return [null, data];
  } catch (error) {
    const apiError = error instanceof Error ? error : new Error("Unknown error fetching portfolio page data");
    fnLogger.error(
      {
        error: { message: apiError.message, name: apiError.name }
      },
      "Failed to fetch portfolio page data from Sanity"
    );

    return [apiError, null];
  }
}

/**
 * Retrieves the last-modified timestamp of the portfolio page document.
 *
 * Used by the sitemap to emit an honest `<lastmod>` tied to actual content changes
 * instead of the build time, which gives search engines a trustworthy re-crawl signal.
 *
 * @returns The document's `_updatedAt` as a Date, or null on missing data / error.
 */
export async function getPortfolioPageLastModified(): Promise<Date | null> {
  const fnLogger = logger.child({ query: "portfolioPageLastModified" });

  try {
    const updatedAt = await client.fetch<string | null>(`*[_type == "portfolioPage"][0]._updatedAt`);

    if (!updatedAt) {
      fnLogger.warn({ reason: "noData" }, "No portfolio page _updatedAt returned from Sanity");
      return null;
    }

    return new Date(updatedAt);
  } catch (error) {
    const apiError = error instanceof Error ? error : new Error("Unknown error fetching portfolio _updatedAt");
    fnLogger.error(
      { error: { message: apiError.message, name: apiError.name } },
      "Failed to fetch portfolio page _updatedAt from Sanity"
    );
    return null;
  }
}
