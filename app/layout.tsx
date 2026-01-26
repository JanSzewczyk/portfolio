import * as React from "react";

import { type Metadata, type Viewport } from "next";

import { ThemeProvider } from "~/components/providers/theme-provider";
import { StructuredData } from "~/components/seo/structured-data";
import { env } from "~/data/env/client";

import "./globals.css";

const siteUrl = env.NEXT_PUBLIC_VERCEL_URL || "https://janszewczyk.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Jan Szewczyk | Frontend Engineer & Open Source Creator",
    template: "%s | Jan Szewczyk"
  },

  description:
    "Frontend Engineer from Cracow, Poland specializing in React, Next.js, TypeScript, and React Native. Creator of @szum-tech/design-system and open source tools.",

  keywords: [
    "Frontend Engineer",
    "Frontend Developer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "React Native",
    "Open Source",
    "Cracow Poland",
    "Web Development",
    "UI/UX",
    "@szum-tech",
    "Jan Szewczyk",
    "Szum-Tech",
    "Szumrak Technologies"
  ],

  authors: [{ name: "Jan Szewczyk", url: siteUrl }],

  creator: "Jan Szewczyk",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Jan Szewczyk - Frontend Engineer",
    title: "Jan Szewczyk | Frontend Engineer & Open Source Creator",
    description:
      "Frontend Engineer from Cracow, Poland specializing in React, Next.js, TypeScript, and React Native. Creator of @szum-tech/design-system.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jan Szewczyk - Frontend Engineer Portfolio"
      }
    ]
  },

  twitter: {
    card: "summary_large_image",
    title: "Jan Szewczyk | Frontend Engineer & Open Source Creator",
    description: "Frontend Engineer specializing in React, Next.js, TypeScript. Creator of @szum-tech/design-system.",
    images: ["/og-image.png"],
    creator: "@DzikiSzumrak"
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },

  alternates: {
    canonical: siteUrl
  }
};

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
        <link rel="preconnect" href="https://github.com" />
        <link rel="preconnect" href="https://avatars.githubusercontent.com" />
        <link rel="dns-prefetch" href="https://github.com" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
