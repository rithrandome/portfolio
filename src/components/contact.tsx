import { contact, site } from "@/content";
import { ButtonLink } from "@/components/button-link";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";

export function Contact() {
  return (
    <section id="contact" className="mt-10 border-t border-line">
      <Reveal className="mx-auto flex max-w-[1120px] flex-col items-start gap-6 px-6 pt-28 pb-24">
        <p className="font-mono text-[15px] text-accent">05 · Contact</p>
        <h2 className="max-w-[760px] text-balance text-[clamp(32px,4.5vw,52px)] leading-[1.1] font-semibold tracking-[-0.025em]">
          {contact.headline}
        </h2>
        <a
          href={`mailto:${site.links.email}`}
          className="border-b border-accent pb-1 font-mono text-lg transition-colors hover:text-accent sm:text-[22px]"
        >
          {site.links.email}
        </a>
        <div className="flex flex-wrap gap-3 pt-2">
          <ButtonLink href={site.links.linkedin} external>
            <LinkedInIcon /> LinkedIn
          </ButtonLink>
          <ButtonLink href={site.links.github} external>
            <GitHubIcon /> GitHub
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
