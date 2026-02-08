import { defineField, defineType } from "sanity";

import { ComponentIcon } from "@sanity/icons";

export const technologyGroup = defineType({
  name: "technologyGroup",
  title: "Technology Group",
  type: "document",
  icon: ComponentIcon,
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Defines if the technology group is featured (e.g., displayed prominently).",
      initialValue: true,
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "technology" }]
        }
      ],
      validation: (rule) => rule.required().min(1)
    })
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "category"
    }
  }
});
