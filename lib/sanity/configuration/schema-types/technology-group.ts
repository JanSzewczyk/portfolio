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
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Frontend", value: "frontend" },
          { title: "Backend", value: "backend" },
          { title: "Mobile", value: "mobile" },
          { title: "DevOps", value: "devops" },
          { title: "Tools", value: "tools" }
        ]
      },
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
