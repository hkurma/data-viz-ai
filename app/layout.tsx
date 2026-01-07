import type { Metadata } from "next";
import Link from "next/link";
import { ThemeProvider } from "next-themes";

import { ErrorHandler } from "@/components/error-handler";
import { ThemeToggle } from "@/components/theme-toggle";

import "./globals.css";

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
      <body className="min-h-screen flex flex-col grid-bg">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Header */}
          <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-3 group"
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-indigo-500/25 transition-shadow duration-300">
                    <svg 
                      className="w-5 h-5 text-white" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
                      />
                    </svg>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                </div>
                <span className="text-xl font-bold tracking-tight">
                  Data<span className="gradient-text">Viz</span> AI
                </span>
              </Link>
              
              <ThemeToggle />
            </div>
          </header>

          {/* Main */}
          <main className="flex-1 container mx-auto px-6 py-8">
            {children}
          </main>

          {/* Footer */}
          <footer className="border-t border-border py-6">
            <div className="container mx-auto px-6 text-center text-sm text-muted">
              <p>Built with AI • Your data stays private</p>
            </div>
          </footer>

          <ErrorHandler />
        </ThemeProvider>
      </body>
    </html>
  );
}
