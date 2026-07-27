import { Section } from "@/components/layout/Section";
import { EducationSummaryCard } from "@/components/sections/experience/EducationSummaryCard";
import { FeaturedExperienceCard } from "@/components/sections/experience/FeaturedExperienceCard";
import { PreviousExperienceCard } from "@/components/sections/experience/PreviousExperienceCard";
import { TechnicalFocusCard } from "@/components/sections/experience/TechnicalFocusCard";

export function Experience() {
  return (
    <Section id="experience" heading="Experience" align="start">
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="sm:col-span-2 lg:col-span-2 lg:row-span-2">
          <FeaturedExperienceCard />
        </div>
        <EducationSummaryCard />
        <TechnicalFocusCard />
        <div className="sm:col-span-2 lg:col-span-3">
          <PreviousExperienceCard />
        </div>
      </div>
    </Section>
  );
}
