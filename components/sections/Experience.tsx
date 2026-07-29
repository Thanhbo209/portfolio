import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { EducationSummaryCard } from "@/components/sections/experience/EducationSummaryCard";
import { FeaturedExperienceCard } from "@/components/sections/experience/FeaturedExperienceCard";
import { PreviousExperienceCard } from "@/components/sections/experience/PreviousExperienceCard";
import { TechnicalFocusCard } from "@/components/sections/experience/TechnicalFocusCard";

export function Experience() {
  return (
    <Section id="experience" heading="Experience" align="start">
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="sm:col-span-2 lg:col-span-2 lg:row-span-2">
          <Reveal delay={0} className="h-full">
            <FeaturedExperienceCard />
          </Reveal>
        </div>
        <Reveal delay={60} className="h-full">
          <EducationSummaryCard />
        </Reveal>
        <Reveal delay={120} className="h-full">
          <TechnicalFocusCard />
        </Reveal>
        <div className="sm:col-span-2 lg:col-span-3">
          <Reveal delay={180} className="h-full">
            <PreviousExperienceCard />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
