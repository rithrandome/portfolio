import { contact, site } from "@/content";
import { ButtonLink } from "@/components/button-link";
import { ContactForm } from "@/components/contact-form";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";

export function Contact() {
  return (
    <section id="contact" className="mt-10 border-t border-line">
      {/* text and links on the left, the form on the right; stacked on phones */}
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-14 px-6 pt-28 pb-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
        <Reveal className="flex flex-col items-start gap-6">
          <p className="font-mono text-[15px] text-accent">06 · Contact</p>
          <h2 className="text-[clamp(32px,4vw,48px)] leading-[1.1] font-semibold tracking-[-0.025em] text-balance">
            {contact.headline}
          </h2>
          <a
            href={`mailto:${site.links.email}`}
            className="border-b border-accent pb-1 font-mono text-lg transition-colors hover:text-accent sm:text-[20px]"
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

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
