import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { TechStack } from "@/components/sections/TechStack";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <About />
      <Hero />
      <Experience />
      <Projects />
      {/* <CaseStudies /> */}
      <TechStack />
      <Certifications />
      {/* <Blog /> */}
      <Contact />
    </>
  );
}
