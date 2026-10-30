import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { EngineeringJourneyCard } from "@/components/sections/overview/EngineeringJourneyCard";
import { GitHubActivityCard } from "@/components/sections/overview/GitHubActivityCard";
import { LeetCodeCard } from "../overview/leetcode/LeetCodeCard";

export function Hero() {
  return (
    <Section id="overview" heading="Overview" headingLevel="h2" align="start">
      <div className="mt-10 flex flex-col gap-4">
        <Reveal delay={60}>
          <GitHubActivityCard />
        </Reveal>
        <Reveal delay={120}>
          <LeetCodeCard />
        </Reveal>
        <Reveal delay={180}>
          <EngineeringJourneyCard />
        </Reveal>
      </div>
    </Section>
  );
}
