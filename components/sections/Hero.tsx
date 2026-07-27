import { Section } from "@/components/layout/Section";
import { CurrentPositionCard } from "@/components/sections/overview/CurrentPositionCard";
import { EducationCard } from "@/components/sections/overview/EducationCard";
import { GitHubActivityCard } from "@/components/sections/overview/GitHubActivityCard";
import { QuickFactsCard } from "@/components/sections/overview/QuickFactsCard";

export function Hero() {
  return (
    <Section id="overview" heading="Overview" headingLevel="h1" align="start">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-10">
        <CurrentPositionCard />
        <EducationCard />
        <GitHubActivityCard />
        <QuickFactsCard />
      </div>
    </Section>
  );
}
