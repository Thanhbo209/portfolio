import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { IntroBlock } from "@/components/sections/about/IntroBlock";
import { AboutSummary } from "@/components/sections/about/AboutSummary";
import { QuickStats } from "@/components/sections/about/QuickStats";
import { JourneyTimeline } from "@/components/sections/about/JourneyTimeline";
import { CurrentFocus } from "@/components/sections/about/CurrentFocus";
import { EngineeringPrinciples } from "@/components/sections/about/EngineeringPrinciples";
import { AboutCTA } from "@/components/sections/about/AboutCTA";
import { fadeLeft, fadeRight } from "@/lib/motion/variants";

export function About() {
  return (
    <Section id="about" heading="About" align="start">
      <div className="mt-10 flex flex-col gap-10">
        <Reveal delay={0}>
          <IntroBlock />
        </Reveal>

        <Reveal delay={60}>
          <AboutSummary />
        </Reveal>

        <QuickStats />

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
          <Reveal variant={fadeLeft} className="flex-1">
            <JourneyTimeline />
          </Reveal>
          <div className="flex flex-1 flex-col gap-6">
            <Reveal variant={fadeRight}>
              <CurrentFocus />
            </Reveal>
            <Reveal variant={fadeRight} delay={80}>
              <EngineeringPrinciples />
            </Reveal>
          </div>
        </div>

        <Reveal>
          <AboutCTA />
        </Reveal>
      </div>
    </Section>
  );
}
