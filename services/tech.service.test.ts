vi.mock("server-only", () => ({}));

import { getTopSkills } from "~/services/tech.service";
import {
  experienceBuilder,
  portfolioPageBuilder,
  portfolioPageExperienceBuilder,
  portfolioPageProjectsBuilder,
  projectBuilder,
  projectGroupBuilder,
  technologyBuilder
} from "~/tests/builders/portfolio-page.builder";

describe("getTopSkills", () => {
  describe("empty / null data", () => {
    test("returns empty array when projects and experience are null", () => {
      const page = portfolioPageBuilder.one({ overrides: { experience: null, projects: null } });
      expect(getTopSkills(page)).toEqual([]);
    });

    test("returns empty array when all technology lists are empty", () => {
      const page = portfolioPageBuilder.one({
        overrides: {
          experience: portfolioPageExperienceBuilder.one({ overrides: { experiences: [] } }),
          projects: portfolioPageProjectsBuilder.one({ overrides: { projectGroups: [] } })
        }
      });
      expect(getTopSkills(page)).toEqual([]);
    });
  });

  describe("data collection", () => {
    test("collects techs from projects", () => {
      const tech = technologyBuilder.one();
      const page = portfolioPageBuilder.one({
        overrides: {
          experience: null,
          projects: portfolioPageProjectsBuilder.one({
            overrides: {
              projectGroups: [
                projectGroupBuilder.one({
                  overrides: { projects: [projectBuilder.one({ overrides: { technologies: [tech] } })] }
                })
              ]
            }
          })
        }
      });
      expect(getTopSkills(page).map((t) => t._id)).toContain(tech._id);
    });

    test("collects techs from experience", () => {
      const tech = technologyBuilder.one();
      const page = portfolioPageBuilder.one({
        overrides: {
          experience: portfolioPageExperienceBuilder.one({
            overrides: { experiences: [experienceBuilder.one({ overrides: { technologies: [tech] } })] }
          }),
          projects: null
        }
      });
      expect(getTopSkills(page).map((t) => t._id)).toContain(tech._id);
    });

    test("combines techs from both projects and experience", () => {
      const projectTech = technologyBuilder.one();
      const expTech = technologyBuilder.one();
      const page = portfolioPageBuilder.one({
        overrides: {
          experience: portfolioPageExperienceBuilder.one({
            overrides: { experiences: [experienceBuilder.one({ overrides: { technologies: [expTech] } })] }
          }),
          projects: portfolioPageProjectsBuilder.one({
            overrides: {
              projectGroups: [
                projectGroupBuilder.one({
                  overrides: { projects: [projectBuilder.one({ overrides: { technologies: [projectTech] } })] }
                })
              ]
            }
          })
        }
      });
      const ids = getTopSkills(page).map((t) => t._id);
      expect(ids).toContain(projectTech._id);
      expect(ids).toContain(expTech._id);
    });
  });

  describe("frequency counting and sorting", () => {
    test("returns the most frequent tech first", () => {
      const topTech = technologyBuilder.one();
      const otherTech = technologyBuilder.one();
      const page = portfolioPageBuilder.one({
        overrides: {
          experience: null,
          projects: portfolioPageProjectsBuilder.one({
            overrides: {
              projectGroups: [
                projectGroupBuilder.one({
                  overrides: {
                    projects: [
                      projectBuilder.one({ overrides: { technologies: [topTech] } }),
                      projectBuilder.one({ overrides: { technologies: [topTech, otherTech] } })
                    ]
                  }
                })
              ]
            }
          })
        }
      });
      expect(getTopSkills(page).at(0)?._id).toBe(topTech._id);
    });

    test("counts the same tech across projects and experience", () => {
      const dominantTech = technologyBuilder.one();
      const otherTech = technologyBuilder.one();
      const page = portfolioPageBuilder.one({
        overrides: {
          experience: portfolioPageExperienceBuilder.one({
            overrides: {
              experiences: [
                experienceBuilder.one({ overrides: { technologies: [dominantTech] } }),
                experienceBuilder.one({ overrides: { technologies: [dominantTech] } })
              ]
            }
          }),
          projects: portfolioPageProjectsBuilder.one({
            overrides: {
              projectGroups: [
                projectGroupBuilder.one({
                  overrides: {
                    projects: [projectBuilder.one({ overrides: { technologies: [dominantTech, otherTech] } })]
                  }
                })
              ]
            }
          })
        }
      });
      expect(getTopSkills(page).at(0)?._id).toBe(dominantTech._id);
    });
  });

  describe("limit", () => {
    test("respects custom limit", () => {
      const techs = technologyBuilder.many(10);
      const page = portfolioPageBuilder.one({
        overrides: {
          experience: portfolioPageExperienceBuilder.one({
            overrides: {
              experiences: techs.map((tech) => experienceBuilder.one({ overrides: { technologies: [tech] } }))
            }
          }),
          projects: null
        }
      });
      expect(getTopSkills(page, 3)).toHaveLength(3);
    });

    test("returns at most 20 by default", () => {
      const techs = technologyBuilder.many(25);
      const page = portfolioPageBuilder.one({
        overrides: {
          experience: portfolioPageExperienceBuilder.one({
            overrides: {
              experiences: techs.map((tech) => experienceBuilder.one({ overrides: { technologies: [tech] } }))
            }
          }),
          projects: null
        }
      });
      expect(getTopSkills(page)).toHaveLength(20);
    });

    test("returns fewer items than limit when not enough unique techs exist", () => {
      const tech = technologyBuilder.one();
      const page = portfolioPageBuilder.one({
        overrides: {
          experience: null,
          projects: portfolioPageProjectsBuilder.one({
            overrides: {
              projectGroups: [
                projectGroupBuilder.one({
                  overrides: { projects: [projectBuilder.one({ overrides: { technologies: [tech] } })] }
                })
              ]
            }
          })
        }
      });

      expect(getTopSkills(page, 10)).toHaveLength(1);
    });
  });
});
