import { skills } from "@/content";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

// Grouped text chips instead of a logo wall: easier to scan and to keep honest.
export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-[1120px] px-6 py-20">
      <Reveal>
        <SectionHeading index="03" title="Skills" />
      </Reveal>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((group, i) => (
          <Reveal key={group.group} delay={i * 0.06} className="h-full">
            <div className="flex h-full flex-col gap-4 rounded-2xl border border-line bg-surface p-6">
              <h3 className="font-mono text-[13px] font-normal text-accent">{group.group}</h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line bg-background px-2.5 py-1 font-mono text-xs text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
