import type { NextConfig } from "next";

import packageJson from "./package.json";

export default {
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_APP_VERSION: packageJson.version
  },
  serverExternalPackages: ["pino", "pino-pretty"],
  logging: {
    browserToTerminal: true
  },
  reactCompiler: true,
  experimental: {
    // react-icons ships each set as one giant barrel (si/index.mjs ~8 MB); Turbopack does not
    // tree-shake unused named exports from it, so the full set leaked into the client bundle.
    // This rewrites named imports to direct per-icon references, shipping only the icons we use.
    optimizePackageImports: ["react-icons/si", "react-icons/tb", "react-icons/vsc"]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com"
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com"
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io"
      }
    ],
    formats: ["image/avif", "image/webp"]
  },
  async rewrites() {
    return [
      { source: "/healthz", destination: "/api/health" },
      { source: "/api/healthz", destination: "/api/health" },
      { source: "/health", destination: "/api/health" },
      { source: "/ping", destination: "/api/health" }
    ];
  }
} satisfies NextConfig;
