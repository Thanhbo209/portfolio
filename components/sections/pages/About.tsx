import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { AboutHero } from "@/components/sections/about/AboutHero";

export function About() {
  return (
    <Section id="about" aria-label="About" align="start">
      <Reveal delay={0}>
        <AboutHero />
      </Reveal>
    </Section>
  );
}
