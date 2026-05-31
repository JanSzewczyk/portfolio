import { defineField, defineType } from "sanity";

import { IconSearchInput } from "./components/icon-search-input";

/**
 * Social Link Schema (Reusable Object Type)
 *
 * Represents a social media link with platform information.
 * Used in both contact and footer sections to maintain consistency.
 */
export const socialLink = defineType({
  fields: [
    {
      description: "Social media platform name (e.g., 'GitHub', 'LinkedIn', 'Twitter')",
      name: "platform",
      title: "Platform",
      type: "string",
      validation: (rule) => rule.required()
    },
    {
      name: "url",
      title: "URL",
      type: "url",
      validation: (rule) => rule.required()
    },
    defineField({
      components: {
        input: IconSearchInput
      },
      name: "icon",
      title: "Icon",
      type: "string",
      validation: (rule) => rule.required()
    }),
    {
      description: "Optional username/handle to display",
      name: "username",
      title: "Username",
      type: "string"
    }
  ],
  name: "socialLink",
  preview: {
    prepare({ platform, url, username }) {
      return {
        subtitle: username || url,
        title: platform
      };
    },
    select: {
      platform: "platform",
      url: "url",
      username: "username"
    }
  },
  title: "Social Link",
  type: "object"
});
