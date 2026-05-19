import { FolderIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const projectGroup = defineType({
  name: "projectGroup",
  title: "Project Group",
  type: "document",
  icon: FolderIcon,
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description:
        "Display name for the project group (e.g., 'Web Applications', 'Mobile Apps')",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Optional description of this project category",
      rows: 3,
    }),
    defineField({
      name: "projects",
      title: "Projects",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "project" }],
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "description",
      projects: "projects",
    },
    prepare({ title, subtitle, projects }) {
      return {
        title,
        subtitle: subtitle || `${projects.length || 0} projects`,
      };
    },
  },
});
