import { ProjectsIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const project = defineType({
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      description: "Short description (Markdown supported — bold, italic, links, lists).",
      name: "description",
      title: "Description",
      type: "markdown",
      validation: (rule) => rule.required()
    }),
    defineField({
      description: "Key standout points. Each entry supports inline Markdown (e.g. **bold**).",
      name: "highlights",
      of: [defineArrayMember({ type: "string" })],
      title: "Highlights",
      type: "array"
    }),
    defineField({
      name: "images",
      of: [
        defineArrayMember({
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
          options: {
            hotspot: true
          },
          type: "image"
        })
      ],
      title: "Images",
      type: "array",
      validation: (rule) => rule.required().min(1)
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
      media: "images.0",
      subtitle: "category",
      title: "title"
    }
  },
  title: "Project",
  type: "document"
});
