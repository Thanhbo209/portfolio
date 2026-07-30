import { ArrowSquareOutIcon } from "@phosphor-icons/react/dist/ssr";

import { GithubIcon } from "@/components/ui/icons/GithubIcon";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { ContributionHeatmap } from "@/components/sections/overview/ContributionHeatmap";
import { ContributionLegend } from "@/components/sections/overview/ContributionLegend";
import { ActivityStatsRow } from "@/components/sections/overview/ActivityStatsRow";
import { ContributionDistributionBar } from "@/components/sections/overview/ContributionDistributionBar";
import {
  getContributionBreakdown,
  getContributionCalendar,
  getGithubStats,
} from "@/lib/github";

const GITHUB_USERNAME = "Thanhbo209";
const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

export async function GitHubActivityCard() {
  const [stats, calendar, breakdown] = await Promise.all([
    getGithubStats(),
    getContributionCalendar(),
    getContributionBreakdown(),
  ]);

  return (
    <Card className="flex h-full flex-col gap-5 p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <GithubIcon className="size-4" />
          <span>GitHub Activity</span>
        </div>
        {calendar && (
          <div className="text-right">
            <p className="text-lg font-bold text-foreground">
              {calendar.totalLastYear.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">past year</p>
          </div>
        )}
      </div>

      <div className="border-t border-border" />

      {calendar && (
        <Reveal delay={60}>
          <div className="flex flex-col gap-3">
            <ContributionHeatmap
              days={calendar.days}
              totalLastYear={calendar.totalLastYear}
            />
            <ContributionLegend />
          </div>
        </Reveal>
      )}

      {breakdown && (
        <Reveal delay={100}>
          <ActivityStatsRow breakdown={breakdown} />
        </Reveal>
      )}

      {breakdown && (
        <Reveal delay={140}>
          <ContributionDistributionBar breakdown={breakdown} />
        </Reveal>
      )}

      <div className="mt-auto flex items-center justify-between gap-4 pt-1">
        {stats && (
          <span className="text-xs text-muted-foreground">
            {stats.publicRepos} repos
          </span>
        )}
        <a
          href={GITHUB_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-muted-foreground"
        >
          View GitHub profile
          <ArrowSquareOutIcon className="size-4" weight="regular" />
        </a>
      </div>
    </Card>
  );
}
