import { Analytics } from "@vercel/analytics/next";

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

  console.log('sdf sdf dafasdf')

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData siteUrl={siteUrl} seoData={seoData} />
        <link rel="preconnect" href="https://github.com" referrerPolicy="no-referrer" />
        <link rel="preconnect" href="https://avatars.githubusercontent.com" referrerPolicy="no-referrer" />
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />

        <meta name="google-site-verification" content="AiA9CANm5wTKgVJ2UQVly5tWskJNx898rxpPlbtcpLE" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
