import Navbar from "@/components/layout/Navbar";
import ContactSection from "@/components/sections/contact/Contact";
import DrawGallery from "@/components/sections/draw/DrawGallery";
import DrawPage from "@/components/sections/draw/page";
import Hero from "@/components/sections/hero/Hero";
import WorkExperience from "@/components/sections/experience/WorkExperience";
import Projects from "@/components/sections/projects/Projects";
import { ScrollProgress } from "@/components/ui/scroll-progress";

function SectionDivider() {
  return (
    <div className="flex justify-center px-6" aria-hidden="true">
      <hr className="h-px w-full max-w-4xl border-0 bg-linear-to-r from-transparent via-border to-transparent" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />

      <main
        className="relative overflow-hidden scrollbar-custom"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        <section id="home" className="min-h-screen scroll-mt-28">
          <Hero />
        </section>

        <SectionDivider />

        <section id="learning" className="section-py scroll-mt-28">
          <WorkExperience />
        </section>

        <SectionDivider />

        <section id="projects" className="section-py scroll-mt-28">
          <Projects />
        </section>

        <SectionDivider />

        <section id="contact" className="section-py scroll-mt-28">
          <ContactSection />
        </section>

        <SectionDivider />

        <section id="gallery" className="section-py scroll-mt-28">
          <DrawGallery />
        </section>

        <SectionDivider />

        <section id="draw" className="section-py scroll-mt-28">
          <div className="container mx-auto px-4">
            <DrawPage />
          </div>
        </section>
      </main>
    </>
  );
}
