import type { Metadata } from "next";
import Link from "next/link";
import { consoleCompanion as study } from "@/content";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: study.title,
  description: study.subtitle,
};

// The Console Companion case study. All copy comes from content.ts; this file only
// decides the layout: a header, then numbered sections in a narrow reading column.
export default function ConsoleCompanionPage() {
  return (
    <article className="mx-auto max-w-[1120px] px-6 pt-12 pb-24">
      {/* Header */}
      <Reveal trigger="load">
        <Link
          href="/#work"
          className="font-mono text-[13px] text-muted transition-colors hover:text-accent"
        >
          ← All work
        </Link>
        <p className="mt-10 font-mono text-xs tracking-[0.3em] text-accent uppercase">
          Case study
        </p>
        <h1 className="mt-3 text-[clamp(40px,6vw,64px)] leading-[1.05] font-semibold tracking-[-0.03em]">
          {study.title}
        </h1>
        <p className="mt-4 max-w-[640px] text-xl leading-relaxed text-muted">
          {study.subtitle}
        </p>
      </Reveal>

      <Reveal trigger="load" delay={0.1}>
        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
          {study.facts.map((fact) => (
            <div
              key={fact.label}
              className="flex flex-col gap-1.5 bg-surface p-5"
            >
              <dt className="font-mono text-xs text-muted">{fact.label}</dt>
              <dd className="text-[15px] font-medium">{fact.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 max-w-[760px] border-l-2 border-accent pl-4 text-[15px] leading-relaxed text-muted">
          {study.note}
        </p>
      </Reveal>

      {/* 01 The problem */}
      <Section index="01" title="The problem">
        <div className="flex max-w-[720px] flex-col gap-4">
          {study.problem.map((p) => (
            <p key={p} className="text-[17px] leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </Section>

      {/* 02 How it works: the steps on the left, one worked example beside them */}
      <Section index="02" title="How it works">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
          <ol className="relative flex flex-col">
            {study.steps.map((step, i) => {
              const isValidator = i === 3;
              return (
                <li
                  key={step.text}
                  className="relative grid grid-cols-[2.25rem_minmax(0,1fr)] gap-4 pb-7 last:pb-0"
                >
                  {/* the line joining the step numbers */}
                  {i < study.steps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute top-9 bottom-0 left-[17px] w-px bg-line"
                    />
                  )}
                  <span
                    className={`relative z-10 flex size-9 items-center justify-center rounded-full border bg-background font-mono text-xs ${
                      isValidator
                        ? "border-accent text-accent"
                        : "border-line text-muted"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-2 pt-1.5">
                    <p className="text-[16px] leading-relaxed">{step.text}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-line bg-surface px-2.5 py-0.5 font-mono text-xs text-muted">
                        {step.parts}
                      </span>
                      {isValidator && (
                        <span className="rounded-full border border-accent px-2.5 py-0.5 font-mono text-xs text-accent">
                          ⇄ retries with the correction
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          <figure className="h-fit rounded-2xl border border-line bg-surface-2 p-4 sm:p-6 lg:sticky lg:top-24">
            <figcaption className="font-mono text-xs text-muted">
              Example
            </figcaption>
            <p className="mt-4 rounded-xl bg-background px-4 py-3 text-[15px]">
              {study.example.question}
            </p>
            <p className="mt-5 font-mono text-xs text-muted">
              Query it writes and validates
            </p>
            <pre className="mt-2 overflow-x-auto rounded-xl border border-line bg-background p-4 font-mono text-[11.5px] leading-relaxed sm:text-[12.5px]">
              <code>{study.example.sql}</code>
            </pre>
            <p className="mt-5 font-mono text-xs text-muted">Answer</p>
            <p className="mt-2 text-[15px]">{study.example.answer}</p>
            <Rows rows={study.example.rows} />
          </figure>
        </div>
      </Section>

      {/* 03 Decisions */}
      <Section index="03" title="Decisions that mattered">
        <ul className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {study.decisions.map((d) => (
            <li
              key={d.title}
              className="flex flex-col gap-3 border-t border-line pt-6"
            >
              <h3 className="text-lg leading-snug font-semibold">{d.title}</h3>
              <p className="text-[15px] leading-relaxed text-muted">{d.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 04 How it behaves: recreated conversations */}
      <Section
        index="04"
        title="How it behaves"
        aside="Recreated conversations; resource names are made up."
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {study.transcripts.map((t) => (
            <div
              key={t.title}
              className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-5"
            >
              <p className="font-mono text-xs text-muted">{t.title}</p>
              <div className="flex flex-col gap-3">
                {t.turns.map((turn, i) =>
                  turn.from === "you" ? (
                    <p
                      key={i}
                      className="max-w-[85%] self-end rounded-2xl rounded-br-md bg-accent px-3.5 py-2 text-[14px] text-accent-ink"
                    >
                      {turn.text}
                    </p>
                  ) : (
                    <div
                      key={i}
                      className="max-w-[92%] self-start rounded-2xl rounded-bl-md border border-line bg-surface-2 px-3.5 py-2.5 text-[14px] leading-relaxed"
                    >
                      <p>{turn.text}</p>
                      {turn.rows && <Rows rows={turn.rows} />}
                    </div>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 05 Results */}
      <Section index="05" title="Results">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-12">
          <div>
            <p className="font-mono text-[56px] leading-none tracking-[-0.03em] text-accent">
              {study.result.value}
            </p>
            <p className="mt-3 text-[15px] text-muted">{study.result.label}</p>
          </div>
          <div className="flex max-w-[680px] flex-col gap-4">
            {study.result.text.map((p) => (
              <p key={p} className="text-[17px] leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {/* 06 Hindsight: building better and testing better, kept apart on purpose */}
      <Section index="06" title="What I'd do differently">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          {study.improvements.map((group) => (
            <div key={group.group}>
              <p className="mb-5 font-mono text-xs tracking-[0.05em] text-accent uppercase">
                {group.group}
              </p>
              <ul
                className={`grid grid-cols-1 gap-6 ${group.items.length > 1 ? "md:grid-cols-3 lg:grid-cols-3" : ""}`}
              >
                {group.items.map((item) => (
                  <li
                    key={item.title}
                    className="flex flex-col gap-2.5 border-t border-line pt-5"
                  >
                    <h3 className="text-[16px] leading-snug font-semibold">
                      {item.title}
                    </h3>
                    <p className="text-[15px] leading-relaxed text-muted">
                      {item.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Stack + way back */}
      <Reveal className="mt-20 flex flex-col gap-8 border-t border-line pt-10">
        <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
          {study.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-line bg-surface px-2.5 py-1 font-mono text-xs text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-6 font-mono text-[13px]">
          <Link href="/#work" className="transition-colors hover:text-accent">
            ← Back to all work
          </Link>
          <Link
            href="/#contact"
            className="text-muted transition-colors hover:text-accent"
          >
            Get in touch →
          </Link>
        </div>
      </Reveal>
    </article>
  );
}

type SectionProps = {
  index: string;
  title: string;
  aside?: string;
  children: React.ReactNode;
};

function Section({ index, title, aside, children }: SectionProps) {
  return (
    <section className="mt-24">
      <Reveal>
        <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-[28px] font-semibold tracking-[-0.02em]">
            <span className="mr-3 font-mono text-[14px] font-normal text-accent">
              {index}
            </span>
            {title}
          </h2>
          {aside && <p className="font-mono text-xs text-muted">{aside}</p>}
        </div>
      </Reveal>
      <Reveal>{children}</Reveal>
    </section>
  );
}

// A few rows of results, drawn as a compact mono table.
function Rows({ rows }: { rows: string[][] }) {
  return (
    // scrolls sideways on its own if a row is wider than a phone screen
    <div className="mt-3 overflow-x-auto">
      <table className="w-full font-mono text-[12px]">
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.join()}
              className="border-t border-line first:border-t-0"
            >
              {row.map((cell) => (
                <td
                  key={cell}
                  className="py-1.5 pr-4 whitespace-nowrap text-muted"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
