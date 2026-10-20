import { Contact } from "@/components/contact";
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
      <Philosophy />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Certifications />
      <Contact />
    </>
  );
}
