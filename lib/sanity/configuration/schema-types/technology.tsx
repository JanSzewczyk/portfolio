import { CodeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import { ReactIcon } from "../../../../components/ui/react-icon";

import { IconSearchInput } from "./components/icon-search-input";

export const technology = defineType({
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      components: {
        input: IconSearchInput
      },
      name: "icon",
      title: "Icon",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text"
    })
  ],
  icon: CodeIcon,
  name: "technology",
  preview: {
    prepare({ title, subtitle, icon }) {
      return {
        media: <ReactIcon name={icon} />,
        subtitle,
        title
      };
    },
    select: {
      icon: "icon",
      subtitle: "category",
      title: "name"
    }
  },
  title: "Technology",
  type: "document"
});
