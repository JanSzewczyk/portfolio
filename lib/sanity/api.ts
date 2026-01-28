import { getPortfolioPageQuery } from "~/lib/sanity/queries/portfolio-page";

import { client } from "./client";
import { type PortfolioPage } from "./types";

export async function getPortfolioPage(): Promise<PortfolioPage> {
  return client.fetch(
    getPortfolioPageQuery,
    {},
    {
      // Add caching tags for ISR
      next: {
        tags: ["portfolioPage"]
      }
    }
  );
}
