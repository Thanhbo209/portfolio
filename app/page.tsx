import Navbar from "@/components/layout/Navbar";
import ContactSection from "@/components/sections/contact/Contact";
import DrawGallery from "@/components/sections/draw/DrawGallery";
import DrawPage from "@/components/sections/draw/page";
import Hero from "@/components/sections/hero/Hero";
import WorkExperience from "@/components/sections/experience/WorkExperience";
import Projects from "@/components/sections/projects/Projects";

export default function Home() {
  return (
    <>
      <Navbar />

      <main
        className="relative scrollbar-custom"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        {/* Hero Section */}
        <section id="hero" className="min-h-screen">
          <Hero />
        </section>

        {/* Learning Timeline Section */}
        <section id="learning" className="py-12 md:py-15">
          <WorkExperience />
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-12 md:py-15">
          <Projects />
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12 md:py-15">
          <ContactSection />
        </section>
        {/* Gallery Section */}
        <section id="gallery" className="py-12 md:py-15">
          <DrawGallery />
        </section>

        {/* Drawing Section */}
        <section id="draw" className="py-12 md:py-15">
          <div className="container mx-auto px-4">
            <DrawPage />
          </div>
        </section>
      </main>
    </>
  );
}
