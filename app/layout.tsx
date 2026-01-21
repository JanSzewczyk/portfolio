import * as React from "react";

import { type Metadata } from "next";

import { ThemeProvider } from "~/components/providers/theme-provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Jan Szewczyk | Frontend Developer",
  description:
    "Frontend Developer from Cracow, Poland specializing in React, Next.js, TypeScript, and React Native. Creator of @szum-tech/design-system and open source tools."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
