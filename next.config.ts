import { type NextConfig } from "next";
import withPlugins from "next-compose-plugins";

import withBundleAnalyzer from "@next/bundle-analyzer";

import { env } from "./data/env/server";
import packageJson from "./package.json";

const config: NextConfig = {
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_APP_VERSION: packageJson.version
  },
  serverExternalPackages: ["pino", "pino-pretty"],
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
};

export default withPlugins([withBundleAnalyzer({ enabled: env.ANALYZE }), config]);
