import { Fragment } from "react";
import { ArrowSquareOutIcon } from "@phosphor-icons/react/dist/ssr";

import { GithubIcon } from "@/components/ui/icons/GithubIcon";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import {
  type ContributionDay,
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

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function chunkIntoWeeks(days: ContributionDay[]): ContributionDay[][] {
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

// Reads the month straight out of the "YYYY-MM-DD" string rather than
// `new Date(...).getMonth()`, which parses as UTC and can shift the month
// near a boundary depending on the server's local timezone offset.
function monthOf(isoDate: string): number {
  return Number(isoDate.split("-")[1]) - 1;
}

export async function GitHubActivityCard() {
  const [stats, calendar] = await Promise.all([
    getGithubStats(),
    getContributionCalendar(),
  ]);

  return (
    <Card className="flex h-full flex-col gap-4">
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

      {calendar &&
        (() => {
          const weeks = chunkIntoWeeks(calendar.days);
          let lastMonth = -1;

          return (
            <div className="overflow-x-auto">
              <div className="grid w-max auto-cols-max grid-flow-col grid-rows-8 gap-0.75">
                {weeks.map((week, weekIndex) => {
                  const month = week[0] ? monthOf(week[0].date) : -1;
                  const showLabel = month !== lastMonth;
                  if (showLabel) lastMonth = month;

                  return (
                    <Fragment key={weekIndex}>
                      <div className="h-2.25 w-2.25 overflow-visible text-[9px] leading-none whitespace-nowrap text-muted-foreground">
                        {showLabel ? MONTH_LABELS[month] : ""}
                      </div>
                      {week.map((day) => (
                        <div
                          key={day.date}
                          title={`${day.count} contributions on ${day.date}`}
                          className={cn(
                            "size-2.25 rounded-[2px]",
                            LEVEL_CLASSES[day.level],
                          )}
                        />
                      ))}
                    </Fragment>
                  );
                })}
              </div>
            </div>
          );
        })()}

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
