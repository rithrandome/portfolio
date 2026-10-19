import Image from "next/image";
import { certifications, education } from "@/content";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function Education() {
  return (
    <section id="education" className="mx-auto max-w-[1120px] px-6 py-20">
      <Reveal>
        <SectionHeading index="04" title="Education" />
      </Reveal>

      {/* Rows with hairline dividers: dates on the left, degree and school on the right. */}
      <ul className="border-t border-line">
        {education.map((item) => (
          <li key={item.school} className="border-b border-line">
            <Reveal className="grid grid-cols-1 gap-x-8 gap-y-2 py-7 sm:grid-cols-[11rem_minmax(0,1fr)_auto]">
              <p className="font-mono text-[13px] text-muted">{item.dates}</p>
              <div className="flex flex-col gap-1">
                <h3 className="text-lg leading-snug font-semibold">{item.degree}</h3>
                <p className="font-mono text-[13px] text-muted">{item.school}</p>
                <p className="text-[15px] text-muted">{item.note}</p>
              </div>
              <p className="font-mono text-[13px] text-accent sm:text-right">{item.grade}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Certifications() {
  return (
    <section id="certifications" className="mx-auto max-w-[1120px] px-6 py-20">
      <Reveal>
        <SectionHeading index="05" title="Certifications" />
      </Reveal>

      <ul className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {certifications.map((cert, i) => (
          <li key={cert.name}>
            <Reveal delay={i * 0.06} className="h-full">
              <a
                href={cert.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col gap-4 border-t border-line pt-6"
              >
                <Image
                  src={cert.badge}
                  alt=""
                  width={88}
                  height={88}
                  className="transition-transform duration-300 group-hover:-translate-y-1"
                />
                <span className="flex flex-col gap-1">
                  <span className="text-[15px] leading-snug font-medium transition-colors group-hover:text-accent">
                    {cert.name}
                  </span>
                  <span className="font-mono text-[13px] text-muted">{cert.issuer}</span>
                </span>
                <span className="mt-auto font-mono text-xs text-muted transition-colors group-hover:text-accent">
                  Verify on Credly ↗
                </span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
