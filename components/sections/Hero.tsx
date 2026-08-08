import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { AskMeCard } from "@/components/sections/overview/AskMeCard";
import { DashboardGrid } from "@/components/sections/overview/DashboardGrid";
import { EngineeringJourneyCard } from "@/components/sections/overview/EngineeringJourneyCard";
import { GitHubActivityCard } from "@/components/sections/overview/GitHubActivityCard";
import { QuickFactsCard } from "@/components/sections/overview/QuickFactsCard";

export function Hero() {
  return (
    <Section id="overview" heading="Overview" headingLevel="h1" align="start">
      <div className="mt-10">
        <DashboardGrid
          githubActivity={
            <Reveal delay={120} className="h-full">
              <GitHubActivityCard />
            </Reveal>
          }
          askMyPortfolio={
            <Reveal delay={60} className="h-full">
              <AskMeCard />
            </Reveal>
          }
          quickFacts={
            <Reveal delay={180} className="h-full">
              <QuickFactsCard />
            </Reveal>
          }
        />
      </div>
      <Reveal delay={240} className="mt-6">
        <EngineeringJourneyCard />
      </Reveal>
    </Section>
  );
}
