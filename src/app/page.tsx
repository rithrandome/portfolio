import { Contact } from "@/components/contact";
import { Band } from "@/components/band";
import { Certifications, Education } from "@/components/education";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Philosophy } from "@/components/philosophy";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";

// The home page is just the sections in order; each one owns its own layout.
export default function Home() {
  return (
    <>
      <Hero />
      {/* sections alternate between the plain page and a cream band */}
      <Band>
        <Philosophy />
      </Band>
      <Experience />
      <Band>
        <Projects />
      </Band>
      <Skills />
      <Band>
        <Education />
      </Band>
      <Certifications />
      <Band last>
        <Contact />
      </Band>
    </>
  );
}
