import { Section } from "@/components/layout/Section";
import { IntroBlock } from "@/components/sections/about/IntroBlock";
import { JourneyTimeline } from "@/components/sections/about/JourneyTimeline";
import { WhatIBuildCards } from "@/components/sections/about/WhatIBuildCards";
import { EngineeringPrinciples } from "@/components/sections/about/EngineeringPrinciples";

export function About() {
  return (
    <Section id="about" heading="About" align="start">
      <div className="flex flex-col gap-12 mt-10">
        <IntroBlock />
        <div className="flex flex-col gap-12 sm:flex-row sm:gap-8">
          <div className="flex-1">
            <JourneyTimeline />
          </div>
          <div className="flex-1">
            <EngineeringPrinciples />
          </div>
        </div>
        <WhatIBuildCards />
      </div>
    </Section>
  );
}
