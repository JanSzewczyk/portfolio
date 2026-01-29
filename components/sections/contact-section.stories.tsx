import { portfolioPageContactBuilder } from "~/tests/builders/portfolio-page.builder";

import { ContactSection } from "./contact-section";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Sections/Contact Section",
  component: ContactSection,
  args: {
    contact: portfolioPageContactBuilder.one(),
    documentId: "test-portfolio-id",
    documentType: "portfolioPage"
  },
  parameters: {
    layout: "fullscreen"
  }
});

export const Default = meta.story({ name: "Contact Section" });
