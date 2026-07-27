import { ArrowSquareOutIcon } from "@phosphor-icons/react/dist/ssr";

import { GithubIcon } from "@/components/ui/icons/GithubIcon";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import {
  type ContributionLevel,
  getContributionCalendar,
  getGithubStats,
} from "@/lib/github";

const GITHUB_USERNAME = "Thanhbo209";
const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

// Gray for no activity, increasing green intensity per level — matches the
// theme automatically since `bg-muted` is a token and the greens are just
// opacity ramps over one hue, not separate light/dark color pairs.
const LEVEL_CLASSES: Record<ContributionLevel, string> = {
  0: "bg-muted",
  1: "bg-green-500/25",
  2: "bg-green-500/50",
  3: "bg-green-500/75",
  4: "bg-green-500",
};

export async function GitHubActivityCard() {
  const [stats, calendar] = await Promise.all([
    getGithubStats(),
    getContributionCalendar(),
  ]);

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <GithubIcon className="size-4" />
          <span>GitHub Activity</span>
        </div>
        {stats && (
          <span className="text-xs text-muted-foreground">
            {stats.publicRepos} repos
          </span>
        )}
      </div>

      {calendar && (
        <div className="overflow-x-auto">
          <div className="grid w-max auto-cols-max grid-flow-col grid-rows-7 gap-0.75">
            {calendar.days.map((day) => (
              <div
                key={day.date}
                title={`${day.count} contributions on ${day.date}`}
                className={cn("size-2.25 rounded-[2px]", LEVEL_CLASSES[day.level])}
              />
            ))}
          </div>
        </div>
      )}

      {calendar && (
        <p className="text-xs text-muted-foreground">
          {calendar.totalLastYear.toLocaleString()} contributions in the last
          year
        </p>
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
    </Card>
  );
}
