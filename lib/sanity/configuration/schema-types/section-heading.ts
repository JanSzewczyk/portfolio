import { defineType } from "sanity";

/**
 * Section Heading Schema (Reusable Object Type)
 *
 * Represents a section heading with title and optional description.
 * Used across multiple sections (About, Skills, Projects, Experience, Education, Contact)
 * to maintain consistent heading structure.
 */
export const sectionHeading = defineType({
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required()
    },
    {
      name: "description",
      rows: 2,
      title: "Description",
      type: "text"
    }
  ],
  name: "sectionHeading",
  preview: {
    prepare({ title, description }) {
      return {
        subtitle: description || "",
        title: title || "Section Heading"
      };
    },
    select: {
      description: "description",
      title: "title"
    }
  },
  title: "Section Heading",
  type: "object"
});
