import Navbar from "@/components/layout/Navbar";
import ContactSection from "@/components/sections/contact/Contact";
import Hero from "@/components/sections/hero/Hero";
import LearningTimeline from "@/components/sections/learning/LearningTimeline";
import Projects from "@/components/sections/projects/Projects";

export default function Home() {
  return (
    <>
      <Navbar />

      <main
        className="relative scrollbar-custom"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        <Hero />
        <LearningTimeline />
        <Projects />
        <ContactSection />
      </main>
    </>
  );
}
