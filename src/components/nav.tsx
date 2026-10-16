import Link from "next/link";
import { nav, site } from "@/content";
import { ButtonLink } from "@/components/button-link";
import { ThemeToggle } from "@/components/theme-toggle";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/85 backdrop-blur-md">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-[1120px] flex-wrap items-center gap-x-6 gap-y-2 px-6 py-3.5"
      >
        <Link href="/" className="font-mono text-[15px] font-medium">
          {site.name.toLowerCase()}
          <span className="text-accent">/</span>
        </Link>

        <ul className="order-last flex w-full gap-5 sm:order-none sm:w-auto sm:flex-1">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="inline-block py-2.5 text-sm text-muted transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-3 sm:ml-0">
          <ThemeToggle />
          <ButtonLink href={site.links.resume} variant="primary">
            Resume
          </ButtonLink>
        </div>
      </nav>
    </header>
  );
}
