export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

// Runs inline in <head> before the first paint: uses the visitor's saved choice,
// or their system setting on a first visit. Doing this before React loads is what
// prevents a white flash on dark-mode visits.
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
