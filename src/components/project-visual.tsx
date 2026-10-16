import type { FlowStep, ProjectVisual as Visual } from "@/content";

// The small picture at the top of each project card, drawn from data in
// content.ts: either a pipeline of steps or a set of evaluation bars.
export function ProjectVisual({ visual }: { visual: Visual }) {
  if (visual.kind === "metrics") {
    return (
      <div className="flex w-full max-w-[440px] flex-col gap-4 font-mono text-xs">
        <p className="text-muted">{visual.caption}</p>
        {visual.bars.map((bar) => (
          <div key={bar.label} className="flex flex-col gap-1.5">
            <div className="flex justify-between">
              <span>{bar.label}</span>
              <span className="text-accent">{bar.value}%</span>
            </div>
            {/* role=meter lets screen readers announce the score, not just see a bar */}
            <div
              role="meter"
              aria-label={bar.label}
              aria-valuenow={bar.value}
              aria-valuemin={0}
              aria-valuemax={100}
              className="h-2 overflow-hidden rounded-full bg-line"
            >
              <div className="h-full rounded-full bg-accent" style={{ width: `${bar.value}%` }} />
            </div>
          </div>
        ))}
        <p className="text-muted">{visual.footnote}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3.5">
      {visual.rows.map((row, i) => (
        // each later row is nudged right so the flow reads as one continuous line
        <div
          key={i}
          className={`flex flex-wrap items-center gap-2 ${i > 0 ? "sm:pl-10" : ""}`}
        >
          {row.map((step) => (
            <Step key={step.label} step={step} />
          ))}
        </div>
      ))}
    </div>
  );
}

function Step({ step }: { step: FlowStep }) {
  return (
    <>
      <span
        className={`rounded-lg border bg-surface px-2.5 py-2 font-mono text-xs whitespace-nowrap ${
          step.accent ? "border-accent text-accent" : "border-line"
        }`}
      >
        {step.label}
      </span>
      {step.next && (
        <span aria-hidden="true" className="font-mono text-[13px] text-muted">
          {step.next}
        </span>
      )}
    </>
  );
}
