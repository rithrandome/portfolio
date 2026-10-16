# rithwik.vercel.app

My personal portfolio: projects, experience and how to reach me. It's a small site, but I'm treating it as a project of its own, so the code is meant to be read.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Motion (Framer Motion) · deployed on Vercel

## Running it locally

Requires Node.js 20 or newer.

```bash
npm install      # first time only
npm run dev      # http://localhost:3000, reloads as you edit
npm run build    # production build, the same thing Vercel runs
npm run lint
```

## Project structure

```
src/
  content.ts               all site copy: projects, experience, skills, links
  app/
    layout.tsx             shell for every page: fonts, theme script, nav, metadata
    page.tsx               the home page
    globals.css            colour tokens for both themes + Tailwind setup
  components/
    nav.tsx                sticky top bar
    theme-toggle.tsx       light/dark button (the only client component so far)
  lib/
    theme.ts               the inline script that picks the theme before first paint
public/
  resume.pdf               linked from the Resume buttons (add your own)
```

## Decisions

**Content in one file, not hard-coded in components.** Updating a date or adding a project is a one-line change in `content.ts`, and the components stay generic.

**Theme without a library.** The usual choice is `next-themes`. I used a ten-line inline script in `<head>` instead: it reads the saved choice (or the OS setting on a first visit) and sets `data-theme` on `<html>` before anything paints, so dark-mode visitors never see a white flash. The toggle button renders both icons and lets CSS show the right one, so the server HTML and the browser HTML always match and React has nothing to complain about.

**Colour tokens, not raw colours.** Every colour is a CSS variable defined once per theme in `globals.css` and exposed to Tailwind (`bg-surface`, `text-muted`, `border-line`, `text-accent`). Components never say "dark" or "light", so changing the accent is a one-line edit.

**Self-hosted fonts.** Geist comes from the `geist` npm package, which bundles the font files. No request to Google Fonts at build time or when someone visits.

**Server components by default.** Only the theme toggle runs JavaScript in the browser. Everything else is rendered to static HTML at build time.
