import { MasterDetailIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const education = defineType({
  name: "education",
  title: "Education",
  type: "document",
  icon: MasterDetailIcon,
  fields: [
    defineField({
      name: "institution",
      title: "Institution",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "institutionUrl",
      title: "Institution URL",
      type: "url",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "degree",
      title: "Degree",
      type: "string",
      options: {
        list: [
          { title: "Bachelor's Degree", value: "Bachelor's Degree" },
          { title: "Master's Degree", value: "Master's Degree" },
          { title: "Ph.D.", value: "Ph.D." },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "fieldOfStudy",
      title: "Field of Study",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "date",
      description: "Leave empty if currently studying",
    }),
    defineField({
      name: "grade",
      title: "Grade",
      type: "string",
    }),
    defineField({
      name: "thesis",
      title: "Thesis",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "technologies",
          title: "Technologies",
          type: "array",
          of: [
            {
              type: "reference",
              to: [{ type: "technology" }],
            },
          ],
        }),
        defineField({
          name: "project",
          title: "Related Project",
          type: "reference",
          to: [{ type: "project" }],
          description: "Link to related project if available",
        }),
        defineField({
          name: "url",
          title: "URL",
          type: "url",
        }),
      ],
    }),
    defineField({
      name: "achievements",
      title: "Achievements",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "coursework",
      title: "Coursework",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  orderings: [
    {
      title: "Start Date, Newest",
      name: "startDateDesc",
      by: [{ field: "startDate", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "institution",
      subtitle: "fieldOfStudy",
      degree: "degree",
    },
    prepare({ title, subtitle, degree }) {
      return {
        title,
        subtitle: `${degree ? degree.charAt(0).toUpperCase() + degree.slice(1) : ""} - ${subtitle}`,
      };
    },
  },
});
