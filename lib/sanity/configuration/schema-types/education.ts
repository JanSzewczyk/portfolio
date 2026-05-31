import { MasterDetailIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const education = defineType({
  fields: [
    defineField({
      name: "institution",
      title: "Institution",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "institutionUrl",
      title: "Institution URL",
      type: "url"
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "degree",
      options: {
        list: [
          { title: "Bachelor's Degree", value: "Bachelor's Degree" },
          { title: "Master's Degree", value: "Master's Degree" },
          { title: "Ph.D.", value: "Ph.D." }
        ]
      },
      title: "Degree",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "fieldOfStudy",
      title: "Field of Study",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
      validation: (rule) => rule.required()
    }),
    defineField({
      description: "Leave empty if currently studying",
      name: "endDate",
      title: "End Date",
      type: "date"
    }),
    defineField({
      name: "grade",
      title: "Grade",
      type: "string"
    }),
    defineField({
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
          name: "technologies",
          of: [
            {
              to: [{ type: "technology" }],
              type: "reference"
            }
          ],
          title: "Technologies",
          type: "array"
        }),
        defineField({
          description: "Link to related project if available",
          name: "project",
          title: "Related Project",
          to: [{ type: "project" }],
          type: "reference"
        }),
        defineField({
          name: "url",
          title: "URL",
          type: "url"
        })
      ],
      name: "thesis",
      title: "Thesis",
      type: "object"
    }),
    defineField({
      name: "achievements",
      of: [{ type: "string" }],
      title: "Achievements",
      type: "array"
    }),
    defineField({
      name: "coursework",
      of: [{ type: "string" }],
      title: "Coursework",
      type: "array"
    })
  ],
  icon: MasterDetailIcon,
  name: "education",
  orderings: [
    {
      by: [{ direction: "desc", field: "startDate" }],
      name: "startDateDesc",
      title: "Start Date, Newest"
    }
  ],
  preview: {
    prepare({ title, subtitle, degree }) {
      return {
        subtitle: `${degree ? degree.charAt(0).toUpperCase() + degree.slice(1) : ""} - ${subtitle}`,
        title
      };
    },
    select: {
      degree: "degree",
      subtitle: "fieldOfStudy",
      title: "institution"
    }
  },
  title: "Education",
  type: "document"
});
