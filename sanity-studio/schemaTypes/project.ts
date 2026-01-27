import { defineField, defineType } from "sanity";

import { ProjectsIcon } from "@sanity/icons";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: ProjectsIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "longDescription",
      title: "Long Description",
      type: "text"
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: {
        hotspot: true
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
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Web", value: "web" },
          { title: "Mobile", value: "mobile" },
          { title: "Open Source", value: "oss" },
          { title: "AI", value: "ai" }
        ]
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "object",
      fields: [
        defineField({
          name: "live",
          title: "Live URL",
          type: "url"
        }),
        defineField({
          name: "github",
          title: "GitHub URL",
          type: "url"
        })
      ]
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "thumbnail"
    }
  }
});
