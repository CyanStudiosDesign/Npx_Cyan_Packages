// src/components/ui/ThemeToggle/ThemeToggle.tsx
"use client";

import { useTheme } from "@/components/providers/ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="border border-border rounded-md p-2 text-fg-muted hover:text-fg hover:bg-subtle transition-colors focus-ring-visible"
      aria-label="Toggle theme"
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}
