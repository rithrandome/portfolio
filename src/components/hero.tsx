import { hero, site } from "@/content";
import { ButtonLink } from "@/components/button-link";
import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";

export function Hero() {
  return (
    <section id="top" className="relative">
      {/* dot grid that fades out toward the bottom; purely decorative */}
      <div aria-hidden="true" className="bg-dots absolute inset-0" />

      <div className="relative mx-auto flex max-w-[1120px] flex-wrap items-end gap-14 px-6 pt-24 pb-24 sm:pt-32 sm:pb-28">
        <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-6">
          <Reveal trigger="load">
            <p className="font-mono text-[13px] tracking-[0.06em] text-muted uppercase">
              {hero.eyebrow}
            </p>
          </Reveal>

          <Reveal trigger="load" delay={0.08}>
            <h1 className="text-[clamp(40px,6vw,72px)] leading-[1.02] font-semibold tracking-[-0.03em]">
              {hero.headline} <span className="text-accent">{hero.headlineAccent}</span>
            </h1>
          </Reveal>

          <Reveal trigger="load" delay={0.18}>
            <p className="max-w-[600px] text-lg leading-relaxed text-muted sm:text-[19px]">
              {hero.intro}
            </p>
          </Reveal>

          <Reveal trigger="load" delay={0.28} className="flex flex-wrap gap-3 pt-2">
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

        <Reveal trigger="load" delay={0.4} className="flex-[1_1_300px]">
          <aside
            aria-label="Currently"
            className="flex flex-col gap-3.5 rounded-2xl border border-line bg-surface px-6 py-5 font-mono text-[13px]"
          >
            <div className="flex items-center gap-2 text-muted">
              <span className="size-1.5 animate-pulse rounded-full bg-accent motion-reduce:animate-none" />
              now
            </div>
            {hero.now.map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <span className="text-muted">{item.label}</span>
                <span className={item.highlight ? "text-accent" : undefined}>{item.value}</span>
              </div>
            ))}
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
