import { ArrowSquareOutIcon } from "@phosphor-icons/react/dist/ssr";

import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { LeetcodeIcon } from "@/components/ui/icons/LeetcodeIcon";
import {
  getLeetCodeStats,
  LEETCODE_PROFILE_URL,
  LEETCODE_TRACKER_URL,
} from "@/lib/leetcode";
import { LeetCodeSolvedGauge } from "./LeetCodeSolvedGauge";
import { LeetCodeHeatmap } from "./LeetCodeHeatmap";
import { LeetCodeLegend } from "./LeetCodeLegend";

export async function LeetCodeCard() {
  const stats = await getLeetCodeStats();

  return (
    <Card className="@container p-5 md:p-6 font-sans">
      <div className="flex flex-col gap-6 @[50rem]:flex-row @[50rem]:items-start @[50rem]:justify-between">
        {/* Left Section: Solved Problems Breakdown & Profile Link */}
        <div className="flex shrink-0 flex-col gap-4 @[50rem]:w-76">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <LeetcodeIcon className="size-4 text-[#FFA116]" />
            <span className="text-foreground">LeetCode Activity</span>
          </div>

          <LeetCodeSolvedGauge
            totalSolved={stats.totalSolved}
            totalQuestions={stats.totalQuestions}
            easySolved={stats.easySolved}
            easyTotal={stats.easyTotal}
            mediumSolved={stats.mediumSolved}
            mediumTotal={stats.mediumTotal}
            hardSolved={stats.hardSolved}
            hardTotal={stats.hardTotal}
          />

          <div className="flex-col justify-center items-center gap-6 space-y-2 pt-1 text-xs">
            <a
              href={LEETCODE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-medium text-foreground hover:text-muted-foreground transition-colors"
            >
              LeetCode profile
              <ArrowSquareOutIcon className="size-4" weight="regular" />
            </a>
            <a
              href={LEETCODE_TRACKER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-medium text-foreground hover:text-muted-foreground transition-colors"
            >
              LeetCode solutions page
              <ArrowSquareOutIcon className="size-4" weight="regular" />
            </a>
          </div>
        </div>

        {/* Right Section: Submissions Heatmap & Activity Stats */}
        <div className="flex min-w-0 flex-1 flex-col gap-3 border-t border-border pt-6 @[50rem]:border-t-0 @[50rem]:pt-0">
          <Reveal delay={60}>
            <div className="flex flex-col gap-3">
              {/* Header stats line */}
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <p className="text-3xl font-bold tracking-tight text-foreground">
                    {stats.totalSubmissionsPastYear}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    submissions in past year
                  </p>
                </div>

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>
                    <strong className="font-semibold text-foreground">
                      {stats.totalActiveDays}
                    </strong>{" "}
                    active days
                  </span>
                  <span>·</span>
                  <span>
                    <strong className="font-semibold text-foreground">
                      {stats.streak}
                    </strong>{" "}
                    day max streak
                  </span>
                </div>
              </div>

              {/* Heatmap Grid */}
              <LeetCodeHeatmap
                days={stats.days}
                totalSubmissions={stats.totalSubmissionsPastYear}
              />

              {/* Legend */}
              <div className="flex justify-end pt-1">
                <LeetCodeLegend />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Card>
  );
}
