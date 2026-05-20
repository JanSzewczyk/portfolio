import { defineType } from "sanity";

/**
 * Section Heading Schema (Reusable Object Type)
 *
 * Represents a section heading with title and optional description.
 * Used across multiple sections (About, Skills, Projects, Experience, Education, Contact)
 * to maintain consistent heading structure.
 */
export const sectionHeading = defineType({
  name: "sectionHeading",
  title: "Section Heading",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required()
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 2
    }
  ],
  preview: {
    select: {
      title: "title",
      description: "description"
    },
    prepare({ title, description }) {
      return {
        title: title || "Section Heading",
        subtitle: description || ""
      };
    }
  }
});
