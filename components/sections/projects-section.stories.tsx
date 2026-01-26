import { PROJECT_CATEGORIES, PROJECTS } from "~/constants/portfolio";

import { ProjectsSection } from "./projects-section";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Sections/Projects Section",
  component: ProjectsSection,
  args: {
    projects: PROJECTS,
    projectCategories: PROJECT_CATEGORIES
  },
  parameters: {
    layout: "fullscreen"
  }
});

export const Default = meta.story({ name: "Projects Section" });
