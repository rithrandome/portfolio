# Portfolio site: context for Claude Code

Rithwik's personal portfolio (github.com/rithrandome/portfolio), live on Vercel at
https://rithwik-mu.vercel.app (every push to `main` redeploys it). It's linked from job applications (Applied AI / Software Engineer
roles in Canada) and also reads as a freelance page. The code is part of the portfolio,
so keep it clean, commented where the "why" isn't obvious, and explainable in an interview.

See README.md for setup, structure and the "why this, not that" decisions.

## How Rithwik likes to work

- He is new to Next.js, Tailwind and Vercel. Explain what changed and why in plain terms.
- **Discuss before building.** For anything beyond a small fix, propose options (tables
  are welcome), confirm the decision, then build. When he's discussing, don't rush to code.
- Brief, conversational replies. Verify changes (lint, typecheck, build, look at the page)
  before saying they're done.
- He commits himself; suggest a commit message after each change.

## Stack and commands

Next.js 16 (App Router, Turbopack, `cacheComponents`), React 19, TypeScript, Tailwind v4,
Motion (`motion/react`), Zod, Resend. Node 22 (pinned in `.nvmrc` and `engines`), npm.

```bash
npm run dev     # localhost:3000
npm run build   # what Vercel runs
npm run lint
```

AGENTS.md (written by Next.js) applies: this Next.js version differs from older docs, so
check `node_modules/next/dist/docs/` before using an API you're unsure of.

## Conventions

- **All copy lives in `src/content.ts`.** Components only render it.
- **Colours are tokens** in `src/app/globals.css` (`bg-surface`, `text-muted`,
  `border-line`, `text-accent`, …), defined for both themes: beige base, tobacco accent.
  No raw colours in components. Hex copies for the generated images and icons live in
  `src/lib/brand.ts`; keep them in sync.
- Theme = `data-theme` on `<html>`, set before paint by `src/lib/theme.ts`; the toggle
  uses View Transitions. Don't add next-themes.
- Animations go through `src/components/reveal.tsx` (`trigger="load"` or scroll).
  Reduced motion is respected via `MotionProvider`.
- Server components by default; client components only where needed (theme toggle,
  project accordion, contact form, Reveal).
- Accessibility: real buttons and links, `aria-expanded` on toggles, labels on inputs,
  visible focus states.
- Fonts come from the `geist` npm package (self-hosted), not Google Fonts.

## Copy rules (important)

- Plain, spoken first person; never a sales slogan or catchy tagline.
- Literal and direct; no personification ("systems that respect data").
- Never imply AI replaces people's jobs. People stay the subject; AI helps them.
- Don't suggest he relies on AI to write his code. He designs and owns the code; AI speeds
  up parts of it.
- Full sentences, not keyword mush. Experience stays shorter than the resume.
- Don't name AWS customers. Keep claims to what he can back up in an interview.

## Page structure (src/app/page.tsx)

Hero (name, location, headline, supporting line, buttons, "Now" list with pulsing
tool/book icons) → 01 Experience (staggered centre timeline) → 02 Selected work
(expandable rows, all collapsed on load) → 03 Skills → 04 Education → 05 Certifications
(Credly badges in `public/badges/`) → 06 Contact (text left, form right) → footer.
Case studies live at `/projects/<slug>` (`src/app/projects/`).

## Troubleshooting

- Restart `npm run dev` after changing `.env.local`; env vars are only read at startup.
- localhost:3000 loading forever = an old dev server still holds the port (see
  `.next/dev/lock`). Fix: `lsof -ti :3000 | xargs kill -9`, then `npm run dev`.
- "Contact form:" lines in the terminal explain why a send failed.

## Open items

- **Contact form works locally.** Keys live in `.env.local` (ignored by Git; never
  print their values). `CONTACT_TO_EMAIL` must be the address the Resend account was
  created with, because the default sender `onboarding@resend.dev` can only deliver there.
  The same variables are set in Vercel (marked sensitive); after changing one, redeploy.
- `public/resume.pdf` is missing; the Resume buttons and the Experience link point to it.
- Console Companion case study is live at `/projects/console-companion` (copy in
  `consoleCompanion` in content.ts, approved). Its screenshots are deliberately
  recreated with made-up resource names; never publish the originals (real account IDs).
- Planned "Why I build with AI" philosophy section after the hero. Draft text was agreed
  in principle but not approved; the personal last line is still to come from Rithwik.
- Link previews: `src/lib/og-card.tsx` (shared layout) + `opengraph-image.tsx` per page;
  icons from `src/lib/brand-mark.tsx`. A new case study should get its own
  opengraph-image.tsx and an `openGraph` block in its metadata.
- network-ai and anyRAG rows have no links until their repos are public.
- v2 idea: an "ask about my experience" RAG chatbot.
