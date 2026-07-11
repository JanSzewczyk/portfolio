import { DocumentIcon } from "@sanity/icons/Document";
import { defineField, defineType } from "sanity";

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
  fields: [
    // ============================================
    // Personal Information
    // ============================================
    defineField({
      description: "Core personal information used across the portfolio",
      fields: [
        defineField({
          name: "name",
          title: "Full Name",
          type: "string",
          validation: (rule) => rule.required()
        }),
        defineField({
          description: "Main professional title (e.g., 'Frontend Engineer')",
          name: "title",
          title: "Primary Title",
          type: "string",
          validation: (rule) => rule.required()
        }),
        defineField({
          description: "Current company or organization",
          name: "company",
          title: "Company",
          type: "string"
        }),
        defineField({
          description: "Primary contact email address",
          name: "email",
          title: "Contact Email",
          type: "string",
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
          description: "Profile picture",
          fields: [
            defineField({
              name: "alt",
              title: "Alternative text",
              type: "string",
              validation: (rule) =>
                rule.custom((value, context) => {
                  const parent = context?.parent as {
                    asset?: { _ref?: string };
                  };

                  return !value && parent?.asset?._ref ? "Alt text is required when an image is present" : true;
                })
            })
          ],
          name: "avatar",
          options: {
            hotspot: true
          },
          title: "Avatar",
          type: "image",
          validation: (rule) => rule.required()
        }),
        defineField({
          description: "Current location (e.g., 'Cracow, Poland')",
          name: "location",
          title: "Location",
          type: "string"
        }),
        defineField({
          description: "Social media profiles (used in contact and footer)",
          name: "socialLinks",
          of: [{ type: "socialLink" }],
          title: "Social Links",
          type: "array"
        })
      ],
      name: "personalInfo",
      options: {
        collapsed: false,
        collapsible: true
      },
      title: "Personal Information",
      type: "object"
    }),

    // ============================================
    // Hero Section
    // ============================================
    defineField({
      description: "Main landing section with introduction and CTA buttons",
      fields: [
        defineField({
          description: "Rotating titles displayed in hero section",
          name: "alternativeTitles",
          of: [{ type: "string" }],
          title: "Alternative Titles",
          type: "array",
          validation: (rule) => rule.required().min(1)
        }),
        defineField({
          description: "Short description displayed below the title",
          name: "tagline",
          rows: 2,
          title: "Tagline",
          type: "text",
          validation: (rule) => rule.required().max(200)
        }),
        defineField({
          description: "Shows availability status badge",
          initialValue: true,
          name: "isAvailable",
          title: "Available for Opportunities",
          type: "boolean"
        })
      ],
      name: "hero",
      options: {
        collapsed: true,
        collapsible: true
      },
      title: "Hero Section",
      type: "object"
    }),

    // ============================================
    // About Section
    // ============================================
    defineField({
      description: "About me section with bio and statistics",
      fields: [
        defineField({
          initialValue: {
            description: "Get to know me a little better.",
            title: "About Me"
          },
          name: "heading",
          title: "Section Heading",
          type: "sectionHeading"
        }),
        defineField({
          description: "Short subtitle displayed before the biography (e.g., 'Beyond just building UI.')",
          name: "bioTagline",
          title: "Bio Tagline",
          type: "string"
        }),
        defineField({
          description: "Extended biography text (Markdown supported — bold, italic, links, lists)",
          name: "bio",
          title: "Biography",
          type: "markdown",
          validation: (rule) => rule.required()
        }),
        defineField({
          description: "List of CV download buttons shown in the about section",
          name: "cvDownloads",
          of: [
            {
              fields: [
                defineField({
                  description: "Text shown in the dropdown (e.g., 'English', 'Polski')",
                  name: "label",
                  title: "Button Label",
                  type: "string",
                  validation: (rule) => rule.required()
                }),
                defineField({
                  description: "Upload the CV file (PDF recommended)",
                  name: "file",
                  options: {
                    accept: ".pdf,.doc,.docx"
                  },
                  title: "CV File",
                  type: "file",
                  validation: (rule) => rule.required()
                }),
                defineField({
                  description: "ISO language code used to display a flag emoji (e.g., 'en' → 🇬🇧, 'pl' → 🇵🇱)",
                  name: "languageCode",
                  title: "Language Code",
                  type: "string",
                  validation: (rule) => rule.required()
                })
              ],
              preview: {
                prepare({ label, languageCode }) {
                  return {
                    subtitle: languageCode,
                    title: label
                  };
                },
                select: {
                  label: "label",
                  languageCode: "languageCode"
                }
              },
              type: "object"
            }
          ],
          title: "CV Downloads",
          type: "array"
        }),
        defineField({
          description: "Achievement statistics displayed as large animated numbers",
          name: "stats",
          of: [
            {
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
                  description: "Optional suffix (e.g., '+', 'k')",
                  name: "suffix",
                  placeholder: "+",
                  title: "Suffix",
                  type: "string"
                })
              ],
              preview: {
                prepare({ label, value, suffix }) {
                  return {
                    subtitle: `${value}${suffix || ""}`,
                    title: label
                  };
                },
                select: {
                  label: "label",
                  suffix: "suffix",
                  value: "value"
                }
              },
              type: "object"
            }
          ],
          title: "Statistics",
          type: "array"
        }),
        defineField({
          description: "Your current location displayed in the about section",
          fields: [
            defineField({
              description: "City name to display (e.g., 'Kraków, Poland')",
              name: "city",
              title: "City Name",
              type: "string",
              validation: (rule) => rule.required()
            }),
            defineField({
              description: "Short label displayed below the city (e.g., 'Open to remote work')",
              initialValue: "Open to remote work",
              name: "remoteWorkLabel",
              title: "Remote Work Label",
              type: "string"
            })
          ],
          name: "location",
          title: "Location",
          type: "object"
        }),
        defineField({
          description: "Personal hobbies displayed at the bottom of the about section",
          fields: [
            defineField({
              description: "Small heading above the hobby icons",
              initialValue: "Off the Keyboard",
              name: "sectionLabel",
              title: "Section Label",
              type: "string"
            }),
            defineField({
              name: "items",
              of: [
                {
                  fields: [
                    defineField({
                      description: "Icon type for the hobby",
                      name: "icon",
                      options: {
                        list: [
                          { title: "Fishing 🎣", value: "fishing" },
                          { title: "Figurines / Painting 🖌️", value: "figurines" },
                          { title: "Gardening 🌿", value: "gardening" },
                          { title: "Photography 📷", value: "photography" },
                          { title: "Gaming 🎮", value: "gaming" },
                          { title: "Cooking 🍳", value: "cooking" },
                          { title: "Reading 📚", value: "reading" },
                          { title: "Cycling 🚴", value: "cycling" },
                          { title: "Hiking ⛰️", value: "hiking" },
                          { title: "Music 🎵", value: "music" },
                          { title: "Travel ✈️", value: "travel" }
                        ]
                      },
                      title: "Icon",
                      type: "string",
                      validation: (rule) => rule.required()
                    }),
                    defineField({
                      description: "Display name for the hobby",
                      name: "label",
                      title: "Label",
                      type: "string",
                      validation: (rule) => rule.required()
                    })
                  ],
                  preview: {
                    prepare({ label, icon }) {
                      return {
                        subtitle: icon,
                        title: label
                      };
                    },
                    select: {
                      icon: "icon",
                      label: "label"
                    }
                  },
                  type: "object"
                }
              ],
              title: "Hobby Items",
              type: "array"
            })
          ],
          name: "hobbies",
          options: {
            collapsed: true,
            collapsible: true
          },
          title: "Hobbies",
          type: "object"
        })
      ],
      name: "about",
      options: {
        collapsed: true,
        collapsible: true
      },
      title: "About Section",
      type: "object"
    }),

    // ============================================
    // Skills Section
    // ============================================
    defineField({
      description: "Skills and technologies organized by groups",
      fields: [
        defineField({
          initialValue: {
            description: "The tools and technologies I work with to bring ideas to life.",
            title: "Skills & Technologies"
          },
          name: "heading",
          title: "Section Heading",
          type: "sectionHeading"
        }),
        defineField({
          description: "Reference to technology groups (frontend, backend, mobile, etc.)",
          name: "technologyGroups",
          of: [
            {
              to: [{ type: "technologyGroup" }],
              type: "reference"
            }
          ],
          title: "Technology Groups",
          type: "array",
          validation: (rule) => rule.required().min(1)
        }),
        defineField({
          description:
            'Optional decorative text displayed at the bottom of the skills section (e.g., "And many more...")',
          initialValue: "And many more...",
          name: "decorativeBottomText",
          title: "Decorative Bottom Text",
          type: "text"
        })
      ],
      name: "skills",
      options: {
        collapsed: true,
        collapsible: true
      },
      title: "Skills Section",
      type: "object"
    }),

    // ============================================
    // Projects Section
    // ============================================
    defineField({
      description: "Portfolio projects and case studies",
      fields: [
        defineField({
          initialValue: {
            description:
              "A selection of projects I've worked on, from open source libraries to full-stack applications.",
            title: "Featured Projects"
          },
          name: "heading",
          title: "Section Heading",
          type: "sectionHeading"
        }),
        defineField({
          description: "Organized groups of projects (e.g., Featured, Web Apps, Mobile Apps)",
          name: "projectGroups",
          of: [
            {
              to: [{ type: "projectGroup" }],
              type: "reference"
            }
          ],
          title: "Project Groups",
          type: "array",
          validation: (rule) => rule.required().min(1)
        })
      ],
      name: "projects",
      options: {
        collapsed: true,
        collapsible: true
      },
      title: "Projects Section",
      type: "object"
    }),

    // ============================================
    // Experience Section
    // ============================================
    defineField({
      description: "Professional work experience",
      fields: [
        defineField({
          initialValue: {
            description: "My professional journey and the roles that shaped my career.",
            title: "Experience"
          },
          name: "heading",
          title: "Section Heading",
          type: "sectionHeading"
        }),
        defineField({
          description: "Work experience entries (sorted by start date)",
          name: "experiences",
          of: [
            {
              to: [{ type: "experience" }],
              type: "reference"
            }
          ],
          title: "Experiences",
          type: "array",
          validation: (rule) => rule.required().min(1)
        })
      ],
      name: "experience",
      options: {
        collapsed: true,
        collapsible: true
      },
      title: "Experience Section",
      type: "object"
    }),

    // ============================================
    // Education Section
    // ============================================
    defineField({
      description: "Academic background and education",
      fields: [
        defineField({
          initialValue: {
            description: "My academic journey and the knowledge that built my foundation.",
            title: "Education"
          },
          name: "heading",
          title: "Section Heading",
          type: "sectionHeading"
        }),
        defineField({
          description: "Academic degrees and institutions",
          name: "education",
          of: [
            {
              to: [{ type: "education" }],
              type: "reference"
            }
          ],
          title: "Education Entries",
          type: "array",
          validation: (rule) => rule.required().min(1)
        })
      ],
      name: "education",
      options: {
        collapsed: true,
        collapsible: true
      },
      title: "Education Section",
      type: "object"
    }),

    // ============================================
    // Contact Section
    // ============================================
    defineField({
      description: "Contact information and form settings",
      fields: [
        defineField({
          initialValue: {
            description: "Have a project in mind or just want to say hello? I'd love to hear from you.",
            title: "Get in Touch"
          },
          name: "heading",
          title: "Section Heading",
          type: "sectionHeading"
        }),
        defineField({
          description: "Configuration for the contact form",
          fields: [
            defineField({
              description: "Show/hide the contact form",
              initialValue: true,
              name: "enabled",
              title: "Enable Contact Form",
              type: "boolean"
            }),
            defineField({
              initialValue: "Send a Message",
              name: "title",
              title: "Contact Form Title",
              type: "string"
            }),
            defineField({
              initialValue: "Fill out the form and I'll get back to you as soon as possible.",
              name: "description",
              rows: 2,
              title: "Contact Form Description",
              type: "text"
            }),
            defineField({
              initialValue: "Thank you for your message! I'll get back to you soon.",
              name: "successMessage",
              rows: 2,
              title: "Success Message",
              type: "text"
            }),

            defineField({
              initialValue: "Send Message",
              name: "submitButtonText",
              title: "Submit Button Text",
              type: "string"
            }),

            defineField({
              description: "Configuration for the success message after form submission",
              fields: [
                defineField({
                  initialValue: "Thank you for your message!",
                  name: "title",
                  title: "Success Title",
                  type: "string"
                }),
                defineField({
                  initialValue: "Thank you for your message! I'll get back to you soon.",
                  name: "description",
                  rows: 2,
                  title: "Success Description",
                  type: "text"
                }),
                defineField({
                  initialValue: "Send another message",
                  name: "buttonText",
                  title: "Send Another Button Text",
                  type: "string"
                })
              ],
              name: "successView",
              title: "Success View Settings",
              type: "object"
            })
          ],
          name: "form",
          options: {
            collapsed: true,
            collapsible: true
          },
          title: "Contact Form Settings",
          type: "object"
        }),

        defineField({
          description: "Configuration for the quick chat",
          fields: [
            defineField({
              description: "Title for the quick chat call-out card",
              initialValue: "Prefer a quick chat?",
              name: "title",
              title: "Quick Chat Title",
              type: "string"
            }),
            defineField({
              description: "Description for the quick chat call-out card",
              initialValue: "Feel free to reach out on LinkedIn or Twitter for a faster response.",
              name: "description",
              rows: 2,
              title: "Quick Chat Description",
              type: "text"
            })
          ],
          name: "quickChat",
          options: {
            collapsed: true,
            collapsible: true
          },
          title: "Quick Chat Settings",
          type: "object"
        })
      ],
      name: "contact",
      options: {
        collapsed: true,
        collapsible: true
      },
      title: "Contact Section",
      type: "object"
    }),

    // ============================================
    // Footer
    // ============================================
    defineField({
      description: "Footer section configuration",
      fields: [
        defineField({
          description: "Copyright notice (year will be added automatically)",
          name: "copyrightText",
          placeholder: "Jan Szewczyk. All rights reserved.",
          title: "Copyright Text",
          type: "string"
        })
      ],
      name: "footer",
      options: {
        collapsed: true,
        collapsible: true
      },
      title: "Footer",
      type: "object"
    }),

    // ============================================
    // SEO & Metadata
    // ============================================
    defineField({
      description: "Search engine optimization settings",
      fields: [
        defineField({
          description: "Browser tab and search result title",
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          validation: (rule) => rule.max(60)
        }),
        defineField({
          description: "Search result description snippet",
          name: "metaDescription",
          rows: 2,
          title: "Meta Description",
          type: "text",
          validation: (rule) => rule.max(160)
        }),
        defineField({
          description: "SEO keywords",
          name: "keywords",
          of: [{ type: "string" }],
          title: "Keywords",
          type: "array"
        }),
        defineField({
          description: "Image shown when sharing on social media (1200x630px recommended)",
          fields: [
            defineField({
              name: "alt",
              title: "Alternative text",
              type: "string"
            })
          ],
          name: "ogImage",
          options: {
            hotspot: true
          },
          title: "Open Graph Image",
          type: "image"
        }),
        defineField({
          description: "Title for Open Graph (defaults to meta title if not provided)",
          name: "ogTitle",
          title: "Open Graph Title",
          type: "string"
        }),
        defineField({
          description: "Description for Open Graph (defaults to meta description if not provided)",
          name: "ogDescription",
          rows: 2,
          title: "Open Graph Description",
          type: "text"
        }),
        defineField({
          description: "Twitter card type",
          initialValue: "summary_large_image",
          name: "twitterCardType",
          options: {
            list: [
              { title: "Summary Large Image", value: "summary_large_image" },
              { title: "Summary", value: "summary" },
              { title: "App", value: "app" },
              { title: "Player", value: "player" }
            ]
          },
          title: "Twitter Card Type",
          type: "string"
        }),
        defineField({
          description: "Twitter site handle (e.g., @username)",
          name: "twitterSite",
          title: "Twitter Site",
          type: "string"
        }),
        defineField({
          description: "Twitter creator handle (e.g., @username)",
          name: "twitterCreator",
          title: "Twitter Creator",
          type: "string"
        }),
        defineField({
          description: "Image shown when sharing on Twitter (1200x630px recommended)",
          fields: [
            defineField({
              name: "alt",
              title: "Alternative text",
              type: "string"
            })
          ],
          name: "twitterImage",
          options: {
            hotspot: true
          },
          title: "Twitter Image",
          type: "image"
        }),
        defineField({
          description: "Prevent this page from being indexed by search engines",
          name: "noindex",
          title: "No Index",
          type: "boolean"
        }),
        defineField({
          description: "Tell search engines not to follow links on this page",
          name: "nofollow",
          title: "No Follow",
          type: "boolean"
        }),
        defineField({
          description: "Prevent search engines from caching this page",
          name: "noarchive",
          title: "No Archive",
          type: "boolean"
        }),
        defineField({
          description: "Canonical URL for this page (defaults to site URL if not provided)",
          name: "canonicalUrl",
          title: "Canonical URL",
          type: "string"
        }),
        defineField({
          description: "Alternate language versions of this page",
          name: "alternateUrls",
          of: [
            {
              fields: [
                defineField({
                  description: "Language code (e.g., en-US, pl-PL)",
                  name: "hreflang",
                  title: "Hreflang",
                  type: "string",
                  validation: (rule) => rule.required()
                }),
                defineField({
                  description: "Alternate page URL",
                  name: "url",
                  title: "URL",
                  type: "url",
                  validation: (rule) => rule.required()
                })
              ],
              type: "object"
            }
          ],
          title: "Alternate URLs",
          type: "array"
        }),
        defineField({
          description: "Organization name for structured data",
          name: "organizationName",
          title: "Organization Name",
          type: "string"
        }),
        defineField({
          description: "Organization logo for structured data",
          fields: [
            defineField({
              name: "alt",
              title: "Alternative text",
              type: "string"
            })
          ],
          name: "organizationLogo",
          options: {
            hotspot: true
          },
          title: "Organization Logo",
          type: "image"
        }),
        defineField({
          description: "Additional URLs associated with the organization or person (e.g., social profiles)",
          name: "sameAsUrls",
          of: [{ type: "url" }],
          title: "Same As URLs",
          type: "array"
        }),

        // ============================================
        // Structured Data (Schema.org)
        // ============================================
        defineField({
          description: "Alternative names for the person (e.g., 'Jan Szewczyk', 'JanSzewczyk')",
          name: "alternateNames",
          of: [{ type: "string" }],
          title: "Alternate Names",
          type: "array"
        }),
        defineField({
          description: "City name (e.g., 'Cracow')",
          name: "addressLocality",
          title: "Address Locality",
          type: "string"
        }),
        defineField({
          description: "ISO country code (e.g., 'PL' for Poland)",
          name: "addressCountry",
          title: "Address Country",
          type: "string"
        }),
        defineField({
          description: "Skills and areas of expertise for structured data",
          name: "knowsAbout",
          of: [{ type: "string" }],
          title: "Knows About",
          type: "array"
        })
      ],
      name: "seo",
      options: {
        collapsed: true,
        collapsible: true
      },
      title: "SEO & Metadata",
      type: "object"
    })
  ],
  icon: DocumentIcon,
  name: "portfolioPage",

  preview: {
    prepare({ name, title }) {
      return {
        subtitle: title || "Main portfolio configuration",
        title: name || "Portfolio Page"
      };
    },
    select: {
      name: "hero.name",
      title: "hero.title"
    }
  },
  title: "Portfolio Page",
  type: "document"
});
