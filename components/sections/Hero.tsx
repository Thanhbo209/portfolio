import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { AchievementsList } from "@/components/sections/overview/AchievementsList";
import { EngineeringJourneyCard } from "@/components/sections/overview/EngineeringJourneyCard";
import { GitHubActivityCard } from "@/components/sections/overview/GitHubActivityCard";

export function Hero() {
  return (
    <Section id="overview" heading="Overview" headingLevel="h2" align="start">
      <div className="mt-10 flex flex-col gap-4">
        <Reveal delay={60}>
          <GitHubActivityCard />
        </Reveal>
        <Reveal delay={120}>
          <AchievementsList />
        </Reveal>
        <Reveal delay={180}>
          <EngineeringJourneyCard />
        </Reveal>
      </div>
    </Section>
  );
}
