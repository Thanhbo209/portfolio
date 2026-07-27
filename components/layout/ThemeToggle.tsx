"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={cn(
        "flex size-9 items-center justify-center rounded-md text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        className,
      )}
      aria-label="Toggle theme"
    >
      {/* CSS-only icon swap driven by the .dark class already set before hydration
          (next-themes' blocking script) — avoids a client-only render branch and
          the hydration mismatch / mounted-state effect that would otherwise need. */}
      <SunIcon className="hidden size-5 dark:block" weight="regular" />
      <MoonIcon className="size-5 dark:hidden" weight="regular" />
    </button>
  );
}
