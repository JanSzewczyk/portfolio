import { FolderIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const projectGroup = defineType({
  fields: [
    defineField({
      description: "Display name for the project group (e.g., 'Web Applications', 'Mobile Apps')",
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      description: "Optional description of this project category",
      name: "description",
      rows: 3,
      title: "Description",
      type: "text"
    }),
    defineField({
      name: "projects",
      of: [
        {
          to: [{ type: "project" }],
          type: "reference"
        }
      ],
      title: "Projects",
      type: "array",
      validation: (rule) => rule.required().min(1)
    })
  ],
  icon: FolderIcon,
  name: "projectGroup",
  preview: {
    prepare({ title, subtitle, projects }) {
      return {
        subtitle: subtitle || `${projects.length || 0} projects`,
        title
      };
    },
    select: {
      projects: "projects",
      subtitle: "description",
      title: "label"
    }
  },
  title: "Project Group",
  type: "document"
});
