import { getPortfolioPageQuery } from "~/lib/sanity/queries/portfolio-page";

import { sanityFetch } from "./live";
import { type GetPortfolioPageQueryResult } from "./types";

/**
 * Fetches the portfolio page data from Sanity with Live Content API support
 *
 * @returns Portfolio page data with all references resolved, or null if not found
 */
export async function getPortfolioPage() {
  const { data } = await sanityFetch({
    query: getPortfolioPageQuery
  });

  return data as GetPortfolioPageQueryResult;
}
