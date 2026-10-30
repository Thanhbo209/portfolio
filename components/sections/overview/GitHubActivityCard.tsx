import { ArrowSquareOutIcon } from "@phosphor-icons/react/dist/ssr";

import { GithubIcon } from "@/components/ui/icons/GithubIcon";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { ContributionHeatmap } from "@/components/sections/overview/ContributionHeatmap";
import { ContributionLegend } from "@/components/sections/overview/ContributionLegend";
import { getContributionCalendar, getGithubStats } from "@/lib/github";

const GITHUB_USERNAME = "Thanhbo209";
const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

export async function GitHubActivityCard() {
  const [stats, calendar] = await Promise.all([
    getGithubStats(),
    getContributionCalendar(),
  ]);

  // Compute total from the displayed days so it matches what is drawn
  const displayedDays = calendar?.days ?? [];
  const computedTotal = displayedDays.reduce((sum, day) => sum + day.count, 0);
  const totalToShow = calendar?.totalLastYear ?? computedTotal;

  return (
    <Card className="@container p-5 md:p-6">
      <div className="font-sans flex flex-col gap-6 @[40rem]:flex-row @[40rem]:items-start @[40rem]:justify-between">
        {/* Left Info Block (~12-14rem) */}
        <div className="flex shrink-0 flex-col gap-3 @[40rem]:w-52">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <GithubIcon className="size-4" />
            <span>GitHub Activity</span>
          </div>

          {calendar && (
            <div>
              <p className="text-3xl font-bold tracking-tight text-foreground">
                {totalToShow.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">past year</p>
            </div>
          )}

          <div className="flex items-center gap-4 pt-1 text-xs">
            {stats && (
              <span className="text-muted-foreground">
                {stats.publicRepos} repos
              </span>
            )}
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-medium text-foreground hover:text-muted-foreground"
            >
              View GitHub profile
              <ArrowSquareOutIcon className="size-3.5" weight="regular" />
            </a>
          </div>
        </div>

        {/* Right Heatmap Block (fills remaining width) */}
        {calendar && displayedDays.length > 0 && (
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <Reveal delay={60}>
              <div className="flex flex-col gap-3">
                <ContributionHeatmap
                  days={displayedDays}
                  totalLastYear={totalToShow}
                  periodLabel="in the past year"
                />
                <div className="flex justify-end">
                  <ContributionLegend />
                </div>
              </div>
            </Reveal>
          </div>
        )}
      </div>
    </Card>
  );
}
