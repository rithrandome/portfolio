import { projects } from "@/content";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function Projects() {
  return (
    <section id="work" className="mx-auto max-w-[1120px] px-6 pt-10 pb-24">
      <Reveal>
        <SectionHeading index="01" title="Selected work" />
      </Reveal>

      {/* One full-width card per row, so the layout stays even however many projects there are. */}
      <div className="flex flex-col gap-6">
        {projects.map((project) => (
          <Reveal key={project.slug}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
