import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { BarChart3 } from "lucide-react";
import { ThemeProvider } from "next-themes";

import { ErrorHandler } from "@/components/error-handler";
import { ThemeToggle } from "@/components/theme-toggle";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Data Viz AI",
  description:
    "Create stunning data visualizations using AI-powered conversational interface",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Header */}
          <header className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold">Data Viz AI</h1>
            </Link>
            <ThemeToggle />
          </header>
          {/* Main */}
          <main className="container mx-auto px-4 py-4 flex-1">{children}</main>
          <ErrorHandler />
        </ThemeProvider>
      </body>
    </html>
  );
}
