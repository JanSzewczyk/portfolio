import { type SchemaTypeDefinition } from "sanity";

import { education } from "./education";
import { experience } from "./experience";
import { project } from "./project";
import { technology } from "./technology";
import { technologyGroup } from "./technology-group";

type SanitySchema = { types: Array<SchemaTypeDefinition> };

export const schema: SanitySchema = {
  types: [technology, technologyGroup, project, experience, education]
};
