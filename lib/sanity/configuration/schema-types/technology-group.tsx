import { ComponentIcon } from "@sanity/icons/Component";
import { defineField, defineType } from "sanity";

import { IconSearchInput } from "./components/icon-search-input";

export const technologyGroup = defineType({
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text"
    }),
    defineField({
      description: "Defines if the technology group is featured (e.g., displayed prominently).",
      initialValue: true,
      name: "featured",
      title: "Featured",
      type: "boolean",
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
      name: "technologies",
      of: [
        {
          to: [{ type: "technology" }],
          type: "reference"
        }
      ],
      title: "Technologies",
      type: "array",
      validation: (rule) => rule.required().min(1)
    })
  ],
  icon: ComponentIcon,
  name: "technologyGroup",
  preview: {
    select: {
      subtitle: "category",
      title: "label"
    }
  },
  title: "Technology Group",
  type: "document"
});
