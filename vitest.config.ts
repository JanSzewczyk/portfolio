import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

// Skip environment validation in tests
process.env.SKIP_ENV_VALIDATION = "true";

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        "**/{node_modules,coverage,storybook-static}/**",
        "**/.next/**",
        "**/dist/**",
        "**/.{idea,git,cache,output,temp}/**",
        "**/*.d.ts",
        "**/virtual:*",
        "**/__x00__*",
        "**/{karma,rollup,webpack,vite,jest,ava,babel,nyc,cypress,tsup,build,prettier,release,postcss,eslint,playwright,next}.config.*",
        "**/vitest.{workspace,projects,config}.[jt]s?(on)",
        "**/.{eslint,mocha,prettier}rc.{?(c|m)js,yml}",
        "**/*.{types,styles,stories}.?(c|m)[jt]s?(x)",
        "**/env.ts",
        "**/app/{sitemap,robots,icon,manifest}.ts?(x)",
        "**/tests/**",
        "**/test?(s)/**",
        "test?(-*).?(c|m)[jt]s?(x)",
        "**/*{.,-}{test,spec,e2e}?(-d).?(c|m)[jt]s?(x)",
        "**/__tests__/**",
        "**/constants/**",
        "**/types/**",
        "**/data/**",
        "**/lib/{sanity,seo}/**",
        "**/lib/scroll-to-section.ts",
        "app/studio/**",
        "app/**/page.tsx",
        "app/**/layout.tsx",
        "components/ui/icon-registry.ts",
        "components/sections/scroll-button.tsx"
      ],
      include: [
        "app/**/*.{js,jsx,ts,tsx}",
        "components/**/*.{js,jsx,ts,tsx}",
        "features/**/*.{js,jsx,ts,tsx}",
        "lib/**/*.{js,ts}",
        "services/**/*.{js,ts}",
        "utils/**/*.{js,ts}"
      ],
      provider: "v8",
      reporter: ["text", "html", "json-summary", "json"],
      reportOnFailure: true
    },
    globals: true,
    projects: [
      // Unit tests project - runs in Node environment
      {
        plugins: [],
        resolve: {
          tsconfigPaths: true
        },
        test: {
          environment: "node",
          globals: true,
          include: ["**/*.{test,spec}.{ts,tsx}"],
          name: "unit",
          setupFiles: ["tests/unit/vitest.setup.ts"]
        }
      },
      // Storybook tests project - runs in browser with Playwright
      {
        plugins: [storybookTest()],
        resolve: {
          tsconfigPaths: true
        },
        test: {
          browser: {
            enabled: true,
            instances: [
              {
                browser: "chromium",
                headless: true
              }
            ],
            provider: playwright()
          },
          exclude: ["**/node_modules/**", "**/dist/**", "**/.next/**"],
          hookTimeout: 30000,
          isolate: false,
          name: "storybook",
          setupFiles: ["tests/integration/vitest.setup.tsx"],
          testTimeout: 60000
        }
      }
    ],
    reporters: process.env.GITHUB_ACTIONS === "true" ? ["dot", "github-actions"] : ["verbose"]
  }
});
