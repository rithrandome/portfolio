# rithwik-mu.vercel.app

My personal portfolio: projects, experience and how to reach me. It's a small site, but I'm treating it as a project of its own, so the code is meant to be read.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Motion (Framer Motion) · deployed on Vercel

## Running it locally

Uses Node 22, pinned in `.nvmrc` and `package.json` (`engines`), so every machine and Vercel run the same version. Dependencies install into `node_modules/` inside this folder, the Node equivalent of a project `.venv`.

```bash
npm install      # first time only
npm run dev      # http://localhost:3000, reloads as you edit
npm run build    # production build, the same thing Vercel runs
npm run lint
```

## Contact form setup

Messages from the contact form are emailed to you through [Resend](https://resend.com).

1. Create a Resend account and an API key.
2. Copy `.env.example` to `.env.local` and fill in `RESEND_API_KEY` and `CONTACT_TO_EMAIL` (the address you signed up to Resend with).
3. On Vercel, add the same variables under Project → Settings → Environment Variables, then redeploy.

Without them the form still validates input, but tells visitors to email directly instead.

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
    hero.tsx               intro, link buttons and the "now" panel
    projects.tsx           the Selected work section
    project-list.tsx       projects as expandable rows (the accordion)
    project-visual.tsx     a project's picture: a pipeline or eval bars, drawn from content.ts
    section-heading.tsx    numbered heading shared by every section
    experience.tsx         work timeline
    skills.tsx             grouped skill chips
    education.tsx          Education and Certifications sections (badges link to Credly)
    contact.tsx            closing call to action, with the form beside it
    contact-form.tsx       the form itself: field errors, sending state, honeypot
    footer.tsx             footer on every page
    button-link.tsx        a link styled as a button (primary / secondary)
    icons.tsx              inline stroke icons, no icon library
    reveal.tsx             the one entrance animation (fade + lift), on load or on scroll
    motion-provider.tsx    site-wide animation settings (respects reduced motion)
    theme-toggle.tsx       light/dark button
  actions/
    send-message.ts        server action for the contact form: validates, then emails via Resend
  lib/
    theme.ts               the inline script that picks the theme before first paint
public/
  badges/                  certification badge images
  resume.pdf               linked from the Resume buttons (add your own)
```

## Decisions

**Content in one file, not hard-coded in components.** Updating a date or adding a project is a one-line change in `content.ts`, and the components stay generic.

**Theme without a library.** The usual choice is `next-themes`. I used a ten-line inline script in `<head>` instead: it reads the saved choice (or the OS setting on a first visit) and sets `data-theme` on `<html>` before anything paints, so dark-mode visitors never see a white flash. The toggle button renders both icons and lets CSS show the right one, so the server HTML and the browser HTML always match and React has nothing to complain about.

**Colour tokens, not raw colours.** Every colour is a CSS variable defined once per theme in `globals.css` and exposed to Tailwind (`bg-surface`, `text-muted`, `border-line`, `text-accent`). Components never say "dark" or "light", so changing the accent is a one-line edit.

**Self-hosted fonts.** Geist comes from the `geist` npm package, which bundles the font files. No request to Google Fonts at build time or when someone visits.

**Server components by default.** Only the theme toggle, the animation wrapper and the expandable project list run JavaScript in the browser. Everything else is rendered to static HTML at build time, and the hero stays a server component that just wraps pieces in `<Reveal>`.

**Project visuals are data, not images.** Each project's diagram or eval bars is described in `content.ts` and drawn with HTML, so it follows the theme, stays sharp at any size, and updating a score is a one-number change. Screenshots and GIFs can still replace them later.

**One animation primitive.** Every entrance on the site goes through `Reveal`, so timing and easing are consistent and live in one file. Motion's `reducedMotion="user"` drops the movement for visitors who've asked their OS for less motion.

**Contact form on a server action, not a third-party form service.** The form calls a Next.js Server Action, which runs only on the server (a Vercel function in production), validates the input with Zod and sends the email through Resend. The API key never reaches the browser, the email is formatted the way I want, and Reply goes straight to the sender. A hidden honeypot field catches most bots without a CAPTCHA.
