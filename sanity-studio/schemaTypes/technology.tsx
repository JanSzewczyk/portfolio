import { defineField, defineType } from "sanity";

import { CodeIcon } from "@sanity/icons";
import { ReactIcon } from "~/components/ui/react-icon";
import { IconSearchInput } from "~/sanity-studio/schemaTypes/components/icon-search-input";

export const technology = defineType({
  name: "technology",
  title: "Technology",
  type: "document",
  icon: CodeIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      components: {
        input: IconSearchInput
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text"
    })
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      icon: "icon"
    },
    prepare({ title, subtitle, icon }) {
      return {
        title,
        subtitle,
        media: <ReactIcon name={icon} />
      };
    }
  }
});
