import { Section } from "@/components/layout/Section";
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
        <IntroBlock />
        <div className="flex flex-col gap-12 sm:flex-row sm:gap-8">
          <div className="flex-1">
            <JourneyTimeline />
          </div>
          <div className="flex-1">
            <EngineeringPrinciples />
            <div className="mt-15 flex justify-start flex-wrap items-start gap-4">
              <Link
                href="#contact"
                className="flex items-center gap-2 rounded-md bg-sidebar-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent/90 hover:text-foreground"
              >
                <ChatCircleIcon className="size-4" weight="regular" />
                Get in Touch
              </Link>
              <Link
                href="/resume"
                className="flex items-center gap-2 border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground"
              >
                <DownloadSimpleIcon className="size-4" weight="regular" />
                Download Resume
              </Link>
            </div>
          </div>
        </div>
        <WhatIBuildCards />
      </div>
    </Section>
  );
}
