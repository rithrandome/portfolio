import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";

// The sections after Projects are still placeholders; each gets replaced
// with its real component in the next checkpoints.
const sections = [
  { id: "experience", title: "Experience" },
  { id: "skills", title: "Skills" },
  { id: "education", title: "Education & certifications" },
  { id: "contact", title: "Contact" },
];

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <div className="mx-auto max-w-[1120px] px-6">
        {sections.map((section, i) => (
          <section
            key={section.id}
            id={section.id}
            className="flex min-h-[60vh] items-start border-t border-line py-24"
          >
            <h2 className="text-[34px] font-semibold tracking-[-0.02em]">
              <span className="mr-3 font-mono text-[15px] font-normal text-accent">
                {String(i + 2).padStart(2, "0")}
              </span>
              {section.title}
            </h2>
          </section>
        ))}
      </div>
    </>
  );
}
