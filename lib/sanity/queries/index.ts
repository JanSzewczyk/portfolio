/**
 * Sanity GROQ queries for portfolio data
 *
 * @module lib/sanity/queries
 *
 * This module provides typed GROQ queries for fetching data from Sanity CMS.
 * All queries support Next.js ISR with cache tagging for revalidation.
 *
 * @example
 * ```typescript
 * import { getPortfolioPageQuery } from "~/lib/sanity/queries";
 * import { client } from "~/lib/sanity/client";
 *
 * // Fetch complete portfolio page
 * const portfolioData = await client.fetch(getPortfolioPageQuery);
 * ```
 */

export { getPortfolioPageQuery } from "./portfolio-page";
