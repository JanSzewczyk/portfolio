import "server-only";

import { createLogger } from "~/lib/logger";
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
      fnLogger.warn(
        {
          reason: "noData"
        },
        error.message
      );
      return [error, null];
    }

    // Log summary of fetched data
    const summary = {
      documentId: data._id,
      hasPersonalInfo: !!data.personalInfo,
      hasHero: !!data.hero,
      hasAbout: !!data.about,
      hasSkills: !!data.skills,
      hasProjects: !!data.projects,
      hasExperience: !!data.experience,
      hasEducation: !!data.education,
      hasContact: !!data.contact
    };

    fnLogger.info({ summary }, "Successfully fetched portfolio page data from Sanity");

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
