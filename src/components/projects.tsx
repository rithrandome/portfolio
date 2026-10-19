import { projects } from "@/content";
import { ProjectList } from "@/components/project-list";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function Projects() {
  return (
    <section id="work" className="mx-auto max-w-[1120px] px-6 py-20">
      <Reveal>
        <SectionHeading index="02" title="Selected work" />
      </Reveal>

      <Reveal>
        <ProjectList projects={projects} />
      </Reveal>
    </section>
  );
}
