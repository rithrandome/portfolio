"use client";

import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

// The button renders both icons and lets CSS show the right one, based on the
// data-theme attribute the inline script already set. Nothing theme-specific is
// rendered by React, so server and browser HTML always match (no hydration warning).
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next: Theme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";

    const apply = () => root.setAttribute("data-theme", next);
    // View Transitions cross-fade the whole page in one step. Browsers without
    // support (or visitors who prefer reduced motion) just switch instantly.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (document.startViewTransition && !reduceMotion) {
      document.startViewTransition(apply);
    } else {
      apply();
    }

    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // storage can be blocked (private mode); the toggle still works for this visit
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle colour theme"
      className="inline-flex size-11 items-center justify-center rounded-[10px] border border-line bg-surface text-foreground transition-colors hover:border-accent"
    >
      {/* sun: shown in dark mode, switches to light */}
      <svg
        aria-hidden="true"
        className="hidden size-[18px] dark:block"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      {/* moon: shown in light mode, switches to dark */}
      <svg
        aria-hidden="true"
        className="block size-[18px] dark:hidden"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    </button>
  );
}
