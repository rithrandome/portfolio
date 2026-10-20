import { hero, site } from "@/content";
import { ButtonLink } from "@/components/button-link";
import {
  BookIcon,
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  ToolIcon,
} from "@/components/icons";
import { Reveal } from "@/components/reveal";

const nowIcons = { tool: ToolIcon, book: BookIcon };

export function Hero() {
  return (
    // Fills the first screen (minus the 73px nav) so the next section never peeks in
    // on load. svh = the "small" viewport height, which stays stable on phones when
    // the browser's address bar shows and hides.
    <section id="top" className="relative flex min-h-[calc(100svh-73px)] flex-col">
      {/* dot grid that fades out toward the bottom; purely decorative */}
      <div aria-hidden="true" className="bg-dots absolute inset-0" />

      <div className="relative mx-auto flex w-full max-w-[1120px] flex-1 items-center px-6 py-20">
        {/* Two columns on large screens. items-start lines the top of the Now list
            up with the name; on phones the list drops below the buttons. */}
        <div className="grid w-full grid-cols-1 items-start gap-14 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-20">
          <div className="flex min-w-0 flex-col gap-7">
            <Reveal trigger="load" className="flex flex-col gap-1.5">
              <p className="text-2xl font-semibold tracking-[-0.01em] sm:text-[28px]">
                {site.fullName}
              </p>
              <p className="font-mono text-[13px] tracking-[0.06em] text-muted uppercase">
                {site.location}
              </p>
            </Reveal>

            <Reveal trigger="load" delay={0.08}>
              <h1 className="max-w-[820px] text-[clamp(34px,4.6vw,58px)] leading-[1.08] font-medium tracking-[-0.03em] text-balance">
                {hero.headline}
                <span className="text-accent">.</span>
              </h1>
            </Reveal>

            <Reveal trigger="load" delay={0.18}>
              <p className="max-w-[620px] text-lg leading-relaxed text-muted sm:text-[19px]">
                {hero.intro}
              </p>
            </Reveal>

            <Reveal trigger="load" delay={0.28} className="flex flex-wrap gap-3 pt-1">
              <ButtonLink href={site.links.resume} variant="primary">
                <DownloadIcon /> Resume
              </ButtonLink>
              <ButtonLink href={site.links.github} external>
                <GitHubIcon /> GitHub
              </ButtonLink>
              <ButtonLink href={site.links.linkedin} external>
                <LinkedInIcon /> LinkedIn
              </ButtonLink>
              <ButtonLink href={`mailto:${site.links.email}`}>
                <MailIcon /> Email
              </ButtonLink>
            </Reveal>
          </div>

          {/* The Now list: no box, just a spaced-out label, hairline dividers and rows. */}
          <Reveal trigger="load" delay={0.4}>
            <aside aria-label="Now">
              <h2 className="border-b border-line pb-3 font-mono text-[11px] font-normal tracking-[0.3em] text-muted uppercase">
                Now
              </h2>
              <dl>
                {hero.now.map((item) => {
                  const Icon = nowIcons[item.icon];
                  return (
                    <div key={item.label} className="flex flex-col gap-2 border-b border-line py-4">
                      <dt className="flex items-center gap-2 font-mono text-xs text-muted">
                        {item.label}
                        {/* slow pulse on the icon: this is happening right now */}
                        <Icon className="size-3.5 animate-pulse text-accent motion-reduce:animate-none" />
                      </dt>
                      <dd>
                        <ul className="flex flex-col gap-3">
                          {item.entries.map((entry) => (
                            <li key={entry.title} className="flex flex-col gap-0.5">
                              <span className="text-[15px] leading-snug">{entry.title}</span>
                              {entry.detail && (
                                <span className="font-mono text-[13px] text-muted">{entry.detail}</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </aside>
          </Reveal>
        </div>
      </div>

      {/* With the next section hidden, a quiet cue shows there's more below. */}
      <Reveal trigger="load" delay={0.9} className="relative flex justify-center pb-8">
        <a
          href="#why"
          className="flex flex-col items-center gap-1 font-mono text-xs text-muted transition-colors hover:text-foreground"
        >
          scroll
          <span aria-hidden="true" className="animate-bounce motion-reduce:animate-none">
            ↓
          </span>
        </a>
      </Reveal>
    </section>
  );
}
