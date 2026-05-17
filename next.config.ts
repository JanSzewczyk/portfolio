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
