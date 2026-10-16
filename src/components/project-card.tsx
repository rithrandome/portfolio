import Link from "next/link";
import type { Project } from "@/content";
import { ProjectVisual } from "@/components/project-visual";

type ProjectCardProps = {
  project: Project;
};

const shell =
  "group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-[transform,border-color,box-shadow] duration-300 ease-[cubic-bezier(.2,.7,.2,1)]";
const interactive =
  "hover:-translate-y-1 hover:border-accent hover:shadow-[0_18px_40px_-24px_rgb(0_0_0/0.45)] focus-visible:-translate-y-1 focus-visible:border-accent";

export function ProjectCard({ project }: ProjectCardProps) {
  const [primary] = project.links;
  // stacked on small screens; visual beside the text from the lg breakpoint up
  const layout = "lg:flex-row";

  const body = (
    <>
      <div
        className="flex min-h-[220px] items-center border-b border-line bg-surface-2 p-6 lg:w-[48%] lg:shrink-0 lg:border-r lg:border-b-0"
      >
        <ProjectVisual visual={project.visual} />
      </div>

      <div className="flex flex-1 flex-col gap-3.5 px-7 pt-6 pb-7">
        <div className="flex flex-wrap items-center gap-2.5">
          <p className="font-mono text-xs tracking-[0.05em] text-muted uppercase">{project.tag}</p>
          {project.status === "in-progress" && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent px-2 py-0.5 font-mono text-[11px] tracking-[0.04em] text-accent uppercase">
              <span className="size-1.5 animate-pulse rounded-full bg-accent motion-reduce:animate-none" />
              In progress
            </span>
          )}
        </div>

        <h3 className="text-2xl font-semibold tracking-[-0.01em]">{project.title}</h3>
        <p className="text-[15px] leading-relaxed text-muted">{project.summary}</p>

        <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-line bg-background px-2.5 py-1 font-mono text-xs text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>

        {(project.metric || primary) && (
          <div className="mt-auto flex items-end justify-between gap-4 pt-2.5">
            {project.metric ? (
              <div>
                <p className="font-mono text-[34px] leading-none font-medium text-accent">
                  {project.metric.value}
                </p>
                <p className="pt-1.5 text-[13px] text-muted">{project.metric.label}</p>
              </div>
            ) : (
              <span />
            )}
            {primary && (
              <span className="font-mono text-[13px] transition-colors group-hover:text-accent">
                {primary.label} {primary.external ? "↗" : "→"}
              </span>
            )}
          </div>
        )}
      </div>
    </>
  );

  // No link yet (e.g. a project still in progress): a plain, non-clickable card.
  if (!primary) {
    return <article className={`${shell} ${layout}`}>{body}</article>;
  }

  if (primary.external) {
    return (
      <a
        href={primary.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${shell} ${interactive} ${layout}`}
      >
        {body}
      </a>
    );
  }

  return (
    <Link href={primary.href} className={`${shell} ${interactive} ${layout}`}>
      {body}
    </Link>
  );
}
