"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center border border-border">
        <Sun className="h-4 w-4 text-muted" />
        <span className="sr-only">Toggle theme</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative w-10 h-10 rounded-xl bg-surface hover:bg-surface-hover flex items-center justify-center border border-border transition-all duration-200 hover:border-accent/50 group"
    >
      <Sun className="h-4 w-4 text-muted group-hover:text-foreground absolute transition-all duration-300 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
      <Moon className="h-4 w-4 text-muted group-hover:text-foreground absolute transition-all duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
