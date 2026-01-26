import { PERSONAL_INFO, SECTION_HEADINGS, SOCIAL_LINKS } from "~/constants/portfolio";
import { Section } from "~/constants/sections";

import { ContactSection } from "./contact-section";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Sections/Contact Section",
  component: ContactSection,
  args: {
    personalInfo: PERSONAL_INFO,
    socialLinks: SOCIAL_LINKS,
    heading: SECTION_HEADINGS[Section.CONTACT]
  },
  parameters: {
    layout: "fullscreen"
  }
});

export const Default = meta.story({ name: "Contact Section" });
