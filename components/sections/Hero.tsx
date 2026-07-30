import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { AskMeCard } from "@/components/sections/overview/AskMeCard";
import { CurrentPositionCard } from "@/components/sections/overview/CurrentPositionCard";
import { EngineeringJourneyCard } from "@/components/sections/overview/EngineeringJourneyCard";
import { GitHubActivityCard } from "@/components/sections/overview/GitHubActivityCard";
import { QuickFactsCard } from "@/components/sections/overview/QuickFactsCard";

export function Hero() {
  return (
    <Section id="overview" heading="Overview" headingLevel="h1" align="start">
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:auto-rows-fr">
        <Reveal delay={120} className="h-full">
          <GitHubActivityCard />
        </Reveal>

        <Reveal delay={60} className="h-full">
          <AskMeCard />
        </Reveal>

        <Reveal delay={0} className="h-full">
          <CurrentPositionCard />
        </Reveal>

        <Reveal delay={180} className="h-full">
          <QuickFactsCard />
        </Reveal>
      </div>
      <Reveal delay={240} className="mt-6">
        <EngineeringJourneyCard />
      </Reveal>
    </Section>
  );
}
