import { site } from "@/content";

// Shown on every page (it lives in the root layout).
export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1120px] flex-wrap justify-between gap-4 px-6 py-6 font-mono text-xs text-muted">
        <p>Built with Next.js, Tailwind and Motion</p>
        <a
          href={site.links.source}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-foreground"
        >
          Source on GitHub ↗
        </a>
      </div>
    </footer>
  );
}
