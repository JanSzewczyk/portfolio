import { defineMain } from "@storybook/nextjs-vite/node";
import type { PresetValue, TagsOptions } from "storybook/internal/types";

process.env.STORYBOOK = "true";

const tags: PresetValue<TagsOptions | undefined> = {
  "test-only": {
    excludeFromDocsStories: true,
    excludeFromSidebar: false
  }
};

export default defineMain({
  addons: [
    "@storybook/addon-a11y",
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-docs",
    "@storybook-community/storybook-dark-mode",
    "storybook-addon-tag-badges"
  ],
  features: {
    experimentalTestSyntax: true
  },
  framework: "@storybook/nextjs-vite",
  staticDirs: ["../public"],
  stories: ["../**/*.mdx", "../**/*.stories.@(js|jsx|ts|tsx)"],
  tags,
  typescript: {
    check: true,
    reactDocgen: "react-docgen-typescript"
  },
  viteFinal: async (config) => {
    const { mergeConfig } = await import("vite");
    const path = await import("node:path");
    const url = await import("node:url");

    const here = path.dirname(url.fileURLToPath(import.meta.url));
    const nextImageMock = path.resolve(here, "mocks/next-image.tsx");

    return mergeConfig(config, {
      optimizeDeps: {
        exclude: ["@sanity/visual-editing"]
      },
      resolve: {
        alias: [
          { find: /^next\/image$/, replacement: nextImageMock },
          {
            find: /^react\/compiler-runtime$/,
            replacement: path.resolve(here, "../node_modules/react/compiler-runtime.js")
          }
        ],
        tsconfigPaths: true
      }
    });
  }
});
