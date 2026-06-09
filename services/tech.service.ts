import "server-only";

import type { PortfolioPageQueryResult } from "~/lib/sanity/types";

export type Tech = {
  _id: string;
  name: string | null;
  icon: string | null;
  description: string | null;
};

export function getTopSkills(portfolioPage: NonNullable<PortfolioPageQueryResult>, limit = 20): Array<Tech> {
  const projectTechs =
    portfolioPage.projects?.projectGroups
      ?.flatMap((group) => group.projects ?? [])
      ?.flatMap((project) => project.technologies ?? []) ?? [];

  const experienceTechs = portfolioPage.experience?.experiences?.flatMap((exp) => exp.technologies ?? []) ?? [];

  const allTechs = [...projectTechs, ...experienceTechs];

  const techCountMap = new Map<string, { tech: Tech; count: number }>();
  for (const tech of allTechs) {
    const existing = techCountMap.get(tech._id);
    if (existing) {
      existing.count++;
    } else {
      techCountMap.set(tech._id, { count: 1, tech });
    }
  }

  return Array.from(techCountMap.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
    .map(({ tech }) => tech);
}
