import { PERSONAL_INFO, SECTION_HEADINGS, STATS } from "~/constants/portfolio";
import { Section } from "~/constants/sections";

import { AboutSection } from "./about-section";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Sections/About Section",
  component: AboutSection,
  args: {
    personalInfo: PERSONAL_INFO,
    stats: STATS,
    heading: SECTION_HEADINGS[Section.ABOUT]
  },
  parameters: {
    layout: "fullscreen"
  }
});

export const Default = meta.story({ name: "About Section" });
