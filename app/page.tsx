import { Hero } from "@/components/sections/pages/Hero";
import { About } from "@/components/sections/pages/About";
import { Experience } from "@/components/sections/pages/Experience";
import { Projects } from "@/components/sections/pages/Projects";
import { TechStack } from "@/components/sections/pages/TechStack";
import { Certifications } from "@/components/sections/pages/Certifications";
import { Contact } from "@/components/sections/pages/Contact";

export default function Home() {
  return (
    <>
      <About />
      <TechStack />
      <Hero />
      <Experience />
      <Projects />
      {/* <CaseStudies /> */}
      <Certifications />
      {/* <Blog /> */}
      <Contact />
    </>
  );
}
