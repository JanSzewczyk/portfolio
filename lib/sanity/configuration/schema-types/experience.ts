import { CaseIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const experience = defineType({
  fields: [
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "companyLogo",
      options: {
        hotspot: true
      },
      title: "Company Logo",
      type: "image"
    }),
    defineField({
      name: "companyUrl",
      title: "Company URL",
      type: "url"
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "type",
      options: {
        list: [
          { title: "Full-time", value: "full-time" },
          { title: "Part-time", value: "part-time" },
          { title: "Contract", value: "contract" },
          { title: "Freelance", value: "freelance" }
        ]
      },
      title: "Employment Type",
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
      description: "Leave empty if currently working here",
      name: "endDate",
      title: "End Date",
      type: "date"
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "responsibilities",
      of: [{ type: "string" }],
      title: "Responsibilities",
      type: "array",
      validation: (rule) => rule.required().min(1)
    }),
    defineField({
      name: "achievements",
      of: [{ type: "string" }],
      title: "Achievements",
      type: "array"
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
    })
  ],
  icon: CaseIcon,
  name: "experience",
  orderings: [
    {
      by: [{ direction: "desc", field: "startDate" }],
      name: "startDateDesc",
      title: "Start Date, Newest"
    }
  ],
  preview: {
    select: {
      media: "companyLogo",
      subtitle: "company",
      title: "role"
    }
  },
  title: "Experience",
  type: "document"
});
