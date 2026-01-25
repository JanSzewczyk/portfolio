import { PERSONAL_INFO, STATS } from "~/constants/portfolio";

import { AboutSection } from "./about-section";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Sections/About Section",
  component: AboutSection,
  args: {
    personalInfo: PERSONAL_INFO,
    stats: STATS
  },
  parameters: {
    layout: "fullscreen"
  }
});

export const Default = meta.story({ name: "About Section" });
