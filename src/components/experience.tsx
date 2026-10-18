import { experience } from "@/content";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-[1120px] px-6 py-20">
      <Reveal>
        <SectionHeading index="02" title="Experience" />
      </Reveal>

      <ol className="max-w-[820px]">
        {experience.map((job, i) => {
          const isLast = i === experience.length - 1;
          return (
            <li key={`${job.company}-${job.dates}`} className="flex gap-6">
              {/* timeline rail: a dot per role, joined by a line except after the last */}
              <div aria-hidden="true" className="flex flex-col items-center">
                <span className="mt-1.5 size-[11px] shrink-0 rounded-full border-2 border-accent bg-background" />
                {!isLast && <span className="w-px flex-1 bg-line" />}
              </div>

              <Reveal className={`flex flex-col gap-2 ${isLast ? "pb-2" : "pb-11"}`}>
                <p className="font-mono text-[13px] text-muted">
                  {job.dates}
                  {job.internship && " · Internship"}
                </p>
                <h3 className="text-[21px] font-semibold">
                  {job.role} · {job.company}
                </h3>
                {job.summary && (
                  <p className="text-base leading-relaxed text-muted">{job.summary}</p>
                )}
                {job.points && (
                  <ul className="mt-1 list-disc pl-[18px] text-base leading-[1.75] text-muted marker:text-accent">
                    {job.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}
              </Reveal>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
