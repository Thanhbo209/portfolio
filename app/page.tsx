import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/hero/Hero";
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
        <Projects />
      </main>
    </>
  );
}
