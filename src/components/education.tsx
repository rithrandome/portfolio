import { certifications, education } from "@/content";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function Education() {
  return (
    <section id="education" className="mx-auto max-w-[1120px] px-6 py-20">
      <Reveal>
        <SectionHeading index="04" title="Education & certifications" />
      </Reveal>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Reveal className="flex flex-col gap-5">
          {education.map((item) => (
            <div
              key={item.school}
              className="flex flex-wrap items-start justify-between gap-4 rounded-2xl border border-line bg-surface p-6"
            >
              <div>
                <h3 className="text-lg font-semibold">{item.school}</h3>
                <p className="pt-1 text-[15px] text-muted">{item.degree}</p>
              </div>
              <p className="font-mono text-[13px] text-muted">{item.dates}</p>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {certifications.map((cert) => (
              <li key={cert.name}>
                <a
                  href={cert.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col gap-1.5 rounded-2xl border border-line bg-surface p-[18px] transition-colors hover:border-accent"
                >
                  <span className="flex justify-between font-mono text-xs text-accent">
                    {cert.issuer}
                    <span aria-hidden="true" className="text-muted transition-colors group-hover:text-accent">
                      ↗
                    </span>
                  </span>
                  <span className="text-[15px] font-medium">{cert.name}</span>
                  <span className="sr-only">(opens Credly badge in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
