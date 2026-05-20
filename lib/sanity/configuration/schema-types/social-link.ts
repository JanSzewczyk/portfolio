import { defineField, defineType } from "sanity";

import { IconSearchInput } from "./components/icon-search-input";

/**
 * Social Link Schema (Reusable Object Type)
 *
 * Represents a social media link with platform information.
 * Used in both contact and footer sections to maintain consistency.
 */
export const socialLink = defineType({
  name: "socialLink",
  title: "Social Link",
  type: "object",
  fields: [
    {
      name: "platform",
      title: "Platform",
      type: "string",
      description: "Social media platform name (e.g., 'GitHub', 'LinkedIn', 'Twitter')",
      validation: (rule) => rule.required()
    },
    {
      name: "url",
      title: "URL",
      type: "url",
      validation: (rule) => rule.required()
    },
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      components: {
        input: IconSearchInput
      },
      validation: (rule) => rule.required()
    }),
    {
      name: "username",
      title: "Username",
      type: "string",
      description: "Optional username/handle to display"
    }
  ],
  preview: {
    select: {
      platform: "platform",
      url: "url",
      username: "username"
    },
    prepare({ platform, url, username }) {
      return {
        title: platform,
        subtitle: username || url
      };
    }
  }
});
