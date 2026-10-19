import { experience, site, type Job } from "@/content";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

// A centre-line timeline. Roles alternate left and right, one row each, and every
// role after the first is pulled up slightly so it starts beside the end of the one
// before it. That small overlap saves space without the columns losing their order.
// On phones it becomes one column with the line on the left.
export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-[1120px] px-6 py-20">
      <Reveal>
        <SectionHeading index="01" title="Experience" />
      </Reveal>

      <div className="relative">
        {/* the line: centred on desktop, at the left edge on phones */}
        <span aria-hidden="true" className="absolute top-1 bottom-0 left-[5px] w-px bg-line md:left-1/2" />

        <ol className="flex flex-col gap-12 pl-7 md:grid md:grid-cols-2 md:gap-x-24 md:gap-y-0 md:pl-0">
          {experience.map((job, i) => (
            <Entry key={job.company} job={job} row={i + 1} side={i % 2 === 0 ? "left" : "right"} />
          ))}
        </ol>
      </div>

      <Reveal className="mt-14 text-center">
        <a
          href={site.links.resume}
          className="border-b border-accent pb-0.5 font-mono text-[13px] transition-colors hover:text-accent"
        >
          Full details in my resume ↓
        </a>
      </Reveal>
    </section>
  );
}

type EntryProps = { job: Job; row: number; side: "left" | "right" };

function Entry({ job, row, side }: EntryProps) {
  const left = side === "left";
  return (
    <li
      // one grid row per role; each one after the first starts 3rem before the previous
      // ends. Kept small so a role never runs into the one two rows above it.
      style={{ gridRow: row }}
      className={`relative ${left ? "md:col-start-1 md:text-right" : "md:col-start-2"} ${
        row > 1 ? "md:-mt-12" : ""
      }`}
    >
      {/* timeline dot, positioned so its centre sits on the line */}
      <span
        aria-hidden="true"
        className={`absolute top-1 -left-7 size-[11px] rounded-full border-2 border-accent bg-background ${
          left ? "md:-right-[54px] md:left-auto" : "md:-left-[53px]"
        }`}
      />
      <Reveal className="flex flex-col">
        <p className="font-mono text-[13px] text-muted">
          {job.dates}
          {job.location && ` · ${job.location}`}
          {job.internship && " · Internship"}
        </p>
        <h3 className="mt-1.5 text-xl font-semibold">{job.role}</h3>
        <p className="text-[15px] text-muted">{job.company}</p>

        {job.summary && (
          <p className="mt-2.5 text-[15.5px] leading-relaxed text-muted">
            <Highlight text={job.summary} />
          </p>
        )}
        {job.points && (
          <ul className="mt-2.5 flex flex-col gap-1.5 text-[15.5px] leading-relaxed text-muted">
            {job.points.map((point) => (
              <li key={point}>
                <Highlight text={point} />
              </li>
            ))}
          </ul>
        )}
        {job.stack && (
          <p className="mt-3 font-mono text-[11.5px] tracking-[0.04em] text-muted uppercase">
            {job.stack.join(" · ")}
          </p>
        )}
      </Reveal>
    </li>
  );
}

// Picks out percentages like "+50%", "70%" or "85%+" in the accent colour.
function Highlight({ text }: { text: string }) {
  const parts = text.split(/(\+?\d+%\+?)/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="text-accent">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
