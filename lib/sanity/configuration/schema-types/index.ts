import { type SchemaTypeDefinition } from "sanity";

import { education } from "./education";
import { experience } from "./experience";
import { portfolioPage } from "./portfolio-page";
import { project } from "./project";
import { projectGroup } from "./project-group";
import { sectionHeading } from "./section-heading";
import { socialLink } from "./social-link";
import { technology } from "./technology";
import { technologyGroup } from "./technology-group";

type SanitySchema = { types: Array<SchemaTypeDefinition> };

export const schema: SanitySchema = {
  types: [
    // Reusable object types
    sectionHeading,
    socialLink,
    // Document types
    portfolioPage,
    technology,
    technologyGroup,
    project,
    projectGroup,
    experience,
    education
  ]
};
