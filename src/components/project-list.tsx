"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import type { Project } from "@/content";
import { ProjectVisual } from "@/components/project-visual";

// The project list as an accordion: each project is one compact row, and clicking
// it opens the full details underneath. Several rows can be open at once.
export function ProjectList({ projects }: { projects: Project[] }) {
  // Every row starts collapsed; the slugs of open rows are tracked here.
  const [open, setOpen] = useState<Set<string>>(() => new Set());

  function toggle(slug: string) {
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

  // The list is pulled out to the sides so each row can carry its own padding and
  // hover tint while the text stays aligned with the section heading.
  return (
    <ul className="-mx-4 border-t border-line sm:-mx-5">
      {projects.map((project, i) => (
        <ProjectRow
          key={project.slug}
          project={project}
          index={String(i + 1).padStart(2, "0")}
          isOpen={open.has(project.slug)}
          onToggle={() => toggle(project.slug)}
        />
      ))}
    </ul>
  );
}

type ProjectRowProps = {
  project: Project;
  index: string;
  isOpen: boolean;
  onToggle: () => void;
};

function ProjectRow({ project, index, isOpen, onToggle }: ProjectRowProps) {
  const panelId = `project-${project.slug}`;
  const inProgress = project.status === "in-progress";

  // The whole row, and its open panel, takes a light accent tint on hover. A tint of the
  // accent (rather than a surface colour) stays visible on both the page and the cream bands.
  return (
    <li className="border-b border-line px-4 transition-colors duration-300 hover:bg-accent/7 sm:px-5">
      {/* The whole row is one real <button>, so it works with the keyboard and screen
          readers announce whether it's expanded. */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="group grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-5 gap-y-1 rounded-md py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:grid-cols-[3rem_minmax(0,1fr)_auto_3.5rem_1.5rem] sm:gap-x-6"
      >
        <span className="font-mono text-xs text-muted">{index}</span>

        <span className="flex min-w-0 flex-col gap-1 lg:flex-row lg:items-baseline lg:gap-6">
          <span className="text-xl font-semibold tracking-[-0.01em] transition-colors group-hover:text-accent sm:text-2xl lg:w-[380px] lg:shrink-0">
            {project.title}
          </span>
          <span className="text-[15px] text-muted">{project.oneLiner}</span>
        </span>

        {/* status for work in progress, otherwise the headline number */}
        <span className="col-start-2 row-start-2 sm:col-start-auto sm:row-start-auto">
          {inProgress ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent px-2 py-0.5 font-mono text-[11px] tracking-[0.04em] text-accent uppercase">
              <span className="size-1.5 animate-pulse rounded-full bg-accent motion-reduce:animate-none" />
              In progress
            </span>
          ) : (
            project.metric && (
              <span className="font-mono text-[13px] whitespace-nowrap">
                <span className="text-accent">{project.metric.value}</span>{" "}
                <span className="text-muted">{project.metric.label}</span>
              </span>
            )
          )}
        </span>

        <span className="hidden font-mono text-[13px] text-muted sm:block">{project.year}</span>

        {/* plus that turns into a minus */}
        <span
          aria-hidden="true"
          className={`col-start-3 row-span-2 row-start-1 font-mono text-lg text-muted transition-transform duration-300 group-hover:text-accent sm:col-start-auto sm:row-span-1 sm:row-start-auto ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 gap-8 pb-10 sm:pl-[4.5rem] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
              <div className="flex min-h-[200px] items-center rounded-2xl border border-line bg-surface-2 p-6">
                <ProjectVisual visual={project.visual} />
              </div>

              <div className="flex flex-col gap-4">
                <p className="font-mono text-xs tracking-[0.05em] text-muted uppercase">
                  {project.tag}
                </p>
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

                {project.links.length > 0 && (
                  <div className="flex flex-wrap gap-5 pt-1">
                    {project.links.map((link) =>
                      link.external ? (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-[13px] text-foreground transition-colors hover:text-accent"
                        >
                          {link.label} ↗
                        </a>
                      ) : (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="font-mono text-[13px] text-foreground transition-colors hover:text-accent"
                        >
                          {link.label} →
                        </Link>
                      ),
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
