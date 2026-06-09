"use client";

import { useTheme } from "next-themes";

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-lg border border-border p-2"
      aria-label="Toggle theme"
      suppressHydrationWarning
    >
      {resolvedTheme ? (isDark ? "☀️" : "🌙") : "◐"}
    </button>
  );
}

export default ThemeToggle;
