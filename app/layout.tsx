import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import type * as React from "react";
import { ThemeProvider } from "~/components/providers/theme-provider";
import { StructuredData } from "~/components/seo/structured-data";
import { getCachedSeoData } from "~/lib/sanity/services";
import { getSiteUrl } from "~/lib/seo/get-site-url";
import { buildMetadata } from "~/lib/seo/utils";

import "./globals.css";

const siteUrl = getSiteUrl();

export async function generateMetadata(): Promise<Metadata> {
  const [, seoData] = await getCachedSeoData();

  return buildMetadata({ seoData, siteUrl });
}

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { color: "#ffffff", media: "(prefers-color-scheme: light)" },
    { color: "#111111", media: "(prefers-color-scheme: dark)" }
  ],
  userScalable: true,
  width: "device-width"
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [, seoData] = await getCachedSeoData();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData seoData={seoData} siteUrl={siteUrl} />
        <meta content="AiA9CANm5wTKgVJ2UQVly5tWskJNx898rxpPlbtcpLE" name="google-site-verification" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange enableSystem>
          {children}
        </ThemeProvider>
        <Analytics mode="production" />
        <SpeedInsights />
      </body>
    </html>
  );
}
