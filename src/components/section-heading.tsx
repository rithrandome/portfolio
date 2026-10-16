type SectionHeadingProps = {
  /** the small mono number before the title, e.g. "01" */
  index: string;
  title: string;
  /** optional line on the right (wraps under the title on small screens) */
  aside?: string;
};

// Shared heading for every numbered section on the home page.
export function SectionHeading({ index, title, aside }: SectionHeadingProps) {
  return (
    <div className="mb-9 flex flex-wrap items-baseline justify-between gap-4">
      <h2 className="text-[34px] font-semibold tracking-[-0.02em]">
        <span className="mr-3 font-mono text-[15px] font-normal text-accent">{index}</span>
        {title}
      </h2>
      {aside && <p className="text-[15px] text-muted">{aside}</p>}
    </div>
  );
}
