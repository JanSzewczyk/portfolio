import { ProjectsIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const project = defineType({
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
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          validation: (rule) =>
            rule.custom((value, context) => {
              const parent = context?.parent as { asset?: { _ref?: string } };

              return !value && parent?.asset?._ref ? "Alt text is required when an image is present" : true;
            })
        })
      ],
      name: "thumbnail",
      options: {
        hotspot: true
      },
      title: "Thumbnail",
      type: "image",
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
    }),
    defineField({
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
        }),
        defineField({
          name: "npm",
          title: "NPM URL",
          type: "url"
        })
      ],
      name: "links",
      title: "Links",
      type: "object"
    }),
    defineField({
      initialValue: false,
      name: "featured",
      title: "Featured",
      type: "boolean"
    })
  ],
  icon: ProjectsIcon,
  name: "project",
  preview: {
    select: {
      media: "thumbnail",
      subtitle: "category",
      title: "title"
    }
  },
  title: "Project",
  type: "document"
});
