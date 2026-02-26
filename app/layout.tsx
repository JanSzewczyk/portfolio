import * as React from "react";

import { type Metadata, type Viewport } from "next";

import { ThemeProvider } from "~/components/providers/theme-provider";
import { StructuredData } from "~/components/seo/structured-data";
import { env } from "~/data/env/client";
import { getCachedSeoData } from "~/lib/sanity/services";
import { buildMetadata } from "~/lib/seo/utils";

import "./globals.css";

const siteUrl = env.NEXT_PUBLIC_VERCEL_URL
  ? env.NEXT_PUBLIC_VERCEL_URL.startsWith("http")
    ? env.NEXT_PUBLIC_VERCEL_URL
    : `https://${env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

export async function generateMetadata(): Promise<Metadata> {
  const [, seoData] = await getCachedSeoData();

  return buildMetadata({ siteUrl, seoData });
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" }
  ]
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [, seoData] = await getCachedSeoData();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData siteUrl={siteUrl} seoData={seoData} />
        <link rel="preconnect" href="https://github.com" referrerPolicy="no-referrer" />
        <link rel="preconnect" href="https://avatars.githubusercontent.com" referrerPolicy="no-referrer" />
        <link rel="dns-prefetch" href="https://github.com" />

        <meta name="google-site-verification" content="AiA9CANm5wTKgVJ2UQVly5tWskJNx898rxpPlbtcpLE" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
