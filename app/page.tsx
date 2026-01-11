import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/hero/Hero";

export default function Home() {
  return (
    <>
      {/* Navbar floating, không chiếm layout */}
      <Navbar />

      {/* Main content */}
      <main
        className="relative scrollbar-custom"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        <Hero />
      </main>
    </>
  );
}
