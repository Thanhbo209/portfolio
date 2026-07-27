import Link from "next/link";
import {
  ChatCircleIcon,
  DownloadSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";

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

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Link
          href="#contact"
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <ChatCircleIcon className="size-4" weight="regular" />
          Get in Touch
        </Link>
        <Link
          href="/resume"
          className="flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground"
        >
          <DownloadSimpleIcon className="size-4" weight="regular" />
          Download Resume
        </Link>
      </div>
    </Section>
  );
}
