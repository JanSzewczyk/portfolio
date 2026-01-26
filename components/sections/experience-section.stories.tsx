import { ExperienceSection } from "./experience-section";

import { EXPERIENCES } from "~/constants/portfolio";
import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Sections/Experience Section",
  component: ExperienceSection,
  args: {
    experiences: EXPERIENCES
  },
  parameters: {
    layout: "fullscreen"
  }
});

export const Default = meta.story({ name: "Experience Section" });
