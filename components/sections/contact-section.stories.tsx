import { PERSONAL_INFO, SOCIAL_LINKS } from "~/constants/portfolio";

import { ContactSection } from "./contact-section";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Sections/Contact Section",
  component: ContactSection,
  args: {
    personalInfo: PERSONAL_INFO,
    socialLinks: SOCIAL_LINKS
  },
  parameters: {
    layout: "fullscreen"
  }
});

export const Default = meta.story({ name: "Contact Section" });
