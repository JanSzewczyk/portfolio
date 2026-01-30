import { defineField, defineType } from "sanity";

import { DocumentIcon } from "@sanity/icons";

/**
 * Portfolio Page Schema (Singleton)
 *
 * This is a singleton document type - only one instance can exist.
 * It represents the main portfolio page configuration including all sections:
 * - Hero (name, title, avatar, availability)
 * - About (bio, stats)
 * - Skills (technology groups)
 * - Projects (featured and all projects)
 * - Experience (work history)
 * - Education (academic background)
 * - Contact (email, social links, contact form settings)
 * - Footer (social links, copyright)
 */
export const portfolioPage = defineType({
  name: "portfolioPage",
  title: "Portfolio Page",
  type: "document",
  icon: DocumentIcon,
  fields: [
    // ============================================
    // Hero Section
    // ============================================
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      description: "Main landing section with introduction and CTA buttons",
      options: {
        collapsible: true,
        collapsed: false
      },
      fields: [
        defineField({
          name: "name",
          title: "Full Name",
          type: "string",
          validation: (rule) => rule.required()
        }),
        defineField({
          name: "title",
          title: "Primary Title",
          type: "string",
          description: "Main professional title (e.g., 'Frontend Engineer')",
          validation: (rule) => rule.required()
        }),
        defineField({
          name: "company",
          title: "Company",
          type: "string",
          description: "Current company or organization"
        }),
        defineField({
          name: "alternativeTitles",
          title: "Alternative Titles",
          type: "array",
          description: "Rotating titles displayed in hero section",
          of: [{ type: "string" }],
          validation: (rule) => rule.required().min(1)
        }),
        defineField({
          name: "tagline",
          title: "Tagline",
          type: "text",
          description: "Short description displayed below the title",
          rows: 2,
          validation: (rule) => rule.required().max(200)
        }),
        defineField({
          name: "avatar",
          title: "Avatar",
          type: "image",
          description: "Profile picture",
          options: {
            hotspot: true
          },
          validation: (rule) => rule.required(),
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alternative text",
              validation: (rule) =>
                rule.custom((value, context) => {
                  const parent = context?.parent as { asset?: { _ref?: string } };

                  return !value && parent?.asset?._ref ? "Alt text is required when an image is present" : true;
                })
            })
          ]
        }),
        defineField({
          name: "isAvailable",
          title: "Available for Opportunities",
          type: "boolean",
          description: "Shows availability status badge",
          initialValue: true
        })
      ]
    }),

    // ============================================
    // About Section
    // ============================================
    defineField({
      name: "about",
      title: "About Section",
      type: "object",
      description: "About me section with bio and statistics",
      options: {
        collapsible: true,
        collapsed: true
      },
      fields: [
        defineField({
          name: "heading",
          title: "Section Heading",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              initialValue: "About Me",
              validation: (rule) => rule.required()
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
              initialValue: "Get to know me a little better."
            })
          ]
        }),
        defineField({
          name: "bio",
          title: "Biography",
          type: "text",
          description: "Extended biography text",
          rows: 10,
          validation: (rule) => rule.required()
        }),
        // defineField({
        //   name: "location",
        //   title: "Location",
        //   type: "string",
        //   description: "Current location (e.g., 'Cracow, Poland')"
        // }),
        defineField({
          name: "stats",
          title: "Statistics",
          type: "array",
          description: "Achievement statistics displayed as cards",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "label",
                  title: "Label",
                  type: "string",
                  validation: (rule) => rule.required()
                }),
                defineField({
                  name: "value",
                  title: "Value",
                  type: "number",
                  validation: (rule) => rule.required().positive()
                }),
                defineField({
                  name: "suffix",
                  title: "Suffix",
                  type: "string",
                  description: "Optional suffix (e.g., '+', 'k')",
                  placeholder: "+"
                })
              ],
              preview: {
                select: {
                  label: "label",
                  value: "value",
                  suffix: "suffix"
                },
                prepare({ label, value, suffix }) {
                  return {
                    title: label,
                    subtitle: `${value}${suffix || ""}`
                  };
                }
              }
            }
          ]
        })
      ]
    }),

    // ============================================
    // Skills Section
    // ============================================
    defineField({
      name: "skills",
      title: "Skills Section",
      type: "object",
      description: "Skills and technologies organized by groups",
      options: {
        collapsible: true,
        collapsed: true
      },
      fields: [
        defineField({
          name: "heading",
          title: "Section Heading",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              initialValue: "Skills & Technologies",
              validation: (rule) => rule.required()
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
              initialValue: "The tools and technologies I work with to bring ideas to life."
            })
          ]
        }),
        defineField({
          name: "technologyGroups",
          title: "Technology Groups",
          type: "array",
          description: "Reference to technology groups (frontend, backend, mobile, etc.)",
          of: [
            {
              type: "reference",
              to: [{ type: "technologyGroup" }]
            }
          ],
          validation: (rule) => rule.required().min(1)
        })
      ]
    }),

    // ============================================
    // Projects Section
    // ============================================
    defineField({
      name: "projects",
      title: "Projects Section",
      type: "object",
      description: "Portfolio projects and case studies",
      options: {
        collapsible: true,
        collapsed: true
      },
      fields: [
        defineField({
          name: "heading",
          title: "Section Heading",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              initialValue: "Featured Projects",
              validation: (rule) => rule.required()
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
              initialValue:
                "A selection of projects I've worked on, from open source libraries to full-stack applications."
            })
          ]
        }),
        defineField({
          name: "featuredProjects",
          title: "Featured Projects",
          type: "array",
          description: "Highlighted projects shown prominently",
          of: [
            {
              type: "reference",
              to: [{ type: "project" }]
            }
          ],
          validation: (rule) => rule.max(6)
        }),
        defineField({
          name: "allProjects",
          title: "All Projects",
          type: "array",
          description: "All projects (can be filtered by category)",
          of: [
            {
              type: "reference",
              to: [{ type: "project" }]
            }
          ]
        })
      ]
    }),

    // ============================================
    // Experience Section
    // ============================================
    defineField({
      name: "experience",
      title: "Experience Section",
      type: "object",
      description: "Professional work experience",
      options: {
        collapsible: true,
        collapsed: true
      },
      fields: [
        defineField({
          name: "heading",
          title: "Section Heading",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              initialValue: "Experience",
              validation: (rule) => rule.required()
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
              initialValue: "My professional journey and the roles that shaped my career."
            })
          ]
        }),
        defineField({
          name: "experiences",
          title: "Experiences",
          type: "array",
          description: "Work experience entries (sorted by start date)",
          of: [
            {
              type: "reference",
              to: [{ type: "experience" }]
            }
          ],
          validation: (rule) => rule.required().min(1)
        })
      ]
    }),

    // ============================================
    // Education Section
    // ============================================
    defineField({
      name: "education",
      title: "Education Section",
      type: "object",
      description: "Academic background and education",
      options: {
        collapsible: true,
        collapsed: true
      },
      fields: [
        defineField({
          name: "heading",
          title: "Section Heading",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              initialValue: "Education",
              validation: (rule) => rule.required()
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
              initialValue: "My academic journey and the knowledge that built my foundation."
            })
          ]
        }),
        defineField({
          name: "education",
          title: "Education Entries",
          type: "array",
          description: "Academic degrees and institutions",
          of: [
            {
              type: "reference",
              to: [{ type: "education" }]
            }
          ],
          validation: (rule) => rule.required().min(1)
        })
      ]
    }),

    // ============================================
    // Contact Section
    // ============================================
    defineField({
      name: "contact",
      title: "Contact Section",
      type: "object",
      description: "Contact information and form settings",
      options: {
        collapsible: true,
        collapsed: true
      },
      fields: [
        defineField({
          name: "heading",
          title: "Section Heading",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              initialValue: "Get in Touch",
              validation: (rule) => rule.required()
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
              initialValue: "Have a project in mind or just want to say hello? I'd love to hear from you."
            })
          ]
        }),
        defineField({
          name: "email",
          title: "Contact Email",
          type: "string",
          description: "Primary contact email address",
          validation: (rule) =>
            rule
              .required()
              .email()
              .custom((email) => {
                if (!email) return true;
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || "Invalid email format";
              })
        }),
        defineField({
          name: "socialLinks",
          title: "Social Links",
          type: "array",
          description: "Social media profiles",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "platform",
                  title: "Platform",
                  type: "string",
                  description: "Social media platform name (e.g., 'GitHub', 'LinkedIn', 'Twitter')",
                  validation: (rule) => rule.required()
                }),
                defineField({
                  name: "url",
                  title: "URL",
                  type: "url",
                  validation: (rule) => rule.required()
                }),
                defineField({
                  name: "icon",
                  title: "Icon",
                  type: "string",
                  description: "Icon name from react-icons (e.g., 'github', 'linkedin', 'twitter')",
                  validation: (rule) => rule.required()
                }),
                defineField({
                  name: "username",
                  title: "Username",
                  type: "string",
                  description: "Optional username/handle to display"
                })
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
            }
          ]
        }),
        defineField({
          name: "form",
          title: "Contact Form Settings",
          type: "object",
          description: "Configuration for the contact form",
          options: {
            collapsible: true,
            collapsed: true
          },
          fields: [
            defineField({
              name: "enabled",
              title: "Enable Contact Form",
              type: "boolean",
              description: "Show/hide the contact form",
              initialValue: true
            }),
            defineField({
              name: "title",
              title: "Contact Form Title",
              type: "string",
              initialValue: "Send a Message"
            }),
            defineField({
              name: "description",
              title: "Contact Form Description",
              type: "text",
              rows: 2,
              initialValue: "Fill out the form and I'll get back to you as soon as possible."
            }),
            defineField({
              name: "successMessage",
              title: "Success Message",
              type: "text",
              rows: 2,
              initialValue: "Thank you for your message! I'll get back to you soon."
            }),

            defineField({
              name: "submitButtonText",
              title: "Submit Button Text",
              type: "string",
              initialValue: "Send Message"
            }),

            defineField({
              name: "successView",
              title: "Success View Settings",
              type: "object",
              description: "Configuration for the success message after form submission",
              fields: [
                defineField({
                  name: "title",
                  title: "Success Title",
                  type: "string",
                  initialValue: "Thank you for your message!"
                }),
                defineField({
                  name: "description",
                  title: "Success Description",
                  type: "text",
                  rows: 2,
                  initialValue: "Thank you for your message! I'll get back to you soon."
                }),
                defineField({
                  name: "buttonText",
                  title: "Send Another Button Text",
                  type: "string",
                  initialValue: "Send another message"
                })
              ]
            })
          ]
        }),

        defineField({
          name: "quickChat",
          title: "Quick Chat Settings",
          type: "object",
          description: "Configuration for the quick chat",
          options: {
            collapsible: true,
            collapsed: true
          },
          fields: [
            defineField({
              name: "title",
              title: "Quick Chat Title",
              type: "string",
              description: "Title for the quick chat call-out card",
              initialValue: "Prefer a quick chat?"
            }),
            defineField({
              name: "description",
              title: "Quick Chat Description",
              type: "text",
              description: "Description for the quick chat call-out card",
              rows: 2,
              initialValue: "Feel free to reach out on LinkedIn or Twitter for a faster response."
            })
          ]
        })
      ]
    }),

    // ============================================
    // Footer
    // ============================================
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      description: "Footer section configuration",
      options: {
        collapsible: true,
        collapsed: true
      },
      fields: [
        defineField({
          name: "copyrightText",
          title: "Copyright Text",
          type: "string",
          description: "Copyright notice (year will be added automatically)",
          placeholder: "Jan Szewczyk. All rights reserved."
        }),
        defineField({
          name: "socialLinks",
          title: "Social Links",
          type: "array",
          description: "Social media links displayed in footer",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "platform",
                  title: "Platform",
                  type: "string",
                  validation: (rule) => rule.required()
                }),
                defineField({
                  name: "url",
                  title: "URL",
                  type: "url",
                  validation: (rule) => rule.required()
                }),
                defineField({
                  name: "icon",
                  title: "Icon",
                  type: "string",
                  validation: (rule) => rule.required()
                })
              ],
              preview: {
                select: {
                  platform: "platform",
                  url: "url"
                },
                prepare({ platform, url }) {
                  return {
                    title: platform,
                    subtitle: url
                  };
                }
              }
            }
          ]
        })
      ]
    }),

    // ============================================
    // SEO & Metadata
    // ============================================
    defineField({
      name: "seo",
      title: "SEO & Metadata",
      type: "object",
      description: "Search engine optimization settings",
      options: {
        collapsible: true,
        collapsed: true
      },
      fields: [
        defineField({
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          description: "Browser tab and search result title",
          validation: (rule) => rule.max(60)
        }),
        defineField({
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          description: "Search result description snippet",
          rows: 2,
          validation: (rule) => rule.max(160)
        }),
        defineField({
          name: "ogImage",
          title: "Open Graph Image",
          type: "image",
          description: "Image shown when sharing on social media (1200x630px recommended)",
          options: {
            hotspot: true
          }
        }),
        defineField({
          name: "keywords",
          title: "Keywords",
          type: "array",
          description: "SEO keywords",
          of: [{ type: "string" }]
        })
      ]
    })
  ],

  preview: {
    select: {
      name: "hero.name",
      title: "hero.title"
    },
    prepare({ name, title }) {
      return {
        title: name || "Portfolio Page",
        subtitle: title || "Main portfolio configuration"
      };
    }
  }
});
