import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { IntroBlock } from "@/components/sections/about/IntroBlock";
import { JourneyTimeline } from "@/components/sections/about/JourneyTimeline";
import { WhatIBuildCards } from "@/components/sections/about/WhatIBuildCards";
import { EngineeringPrinciples } from "@/components/sections/about/EngineeringPrinciples";
import Link from "next/link";
import {
  ChatCircleIcon,
  DownloadSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";

export function About() {
  return (
    <Section id="about" heading="About" align="start">
      <div className="flex flex-col gap-12 mt-10">
        <Reveal delay={0}>
          <IntroBlock />
        </Reveal>
        <Reveal delay={80}>
          <div className="flex flex-col gap-12 sm:flex-row sm:gap-8">
            <div className="flex-1">
              <JourneyTimeline />
            </div>
            <div className="flex-1">
              <EngineeringPrinciples />
              <div className="mt-15 flex justify-start flex-wrap items-start gap-4">
                <Link
                  href="#contact"
                  className="flex items-center gap-2 bg-foreground px-4 py-2 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-accent/90 hover:text-foreground active:scale-[0.98] motion-reduce:transition-none"
                >
                  <ChatCircleIcon className="size-4" weight="regular" />
                  Get in Touch
                </Link>
                <Link
                  href="/resume"
                  className="flex items-center gap-2 border px-4 py-2 text-sm font-medium text-foreground transition-colors duration-200 hover:text-muted-foreground active:scale-[0.98] motion-reduce:transition-none"
                >
                  <DownloadSimpleIcon className="size-4" weight="regular" />
                  Download Resume
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={160}>
          <WhatIBuildCards />
        </Reveal>
      </div>
    </Section>
  );
}
