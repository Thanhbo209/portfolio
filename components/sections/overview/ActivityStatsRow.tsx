import type { ContributionBreakdown } from "@/lib/github";

interface ActivityStatsRowProps {
  breakdown: ContributionBreakdown;
}

interface StatConfig {
  key: keyof ContributionBreakdown;
  label: string;
  indicatorClassName: string;
}

// Reuses the existing chart-1..4 tokens - already defined for exactly this
// kind of data-differentiation use case, previously unused anywhere in the
// codebase. No new colors introduced.
const STATS: StatConfig[] = [
  { key: "commits", label: "Commits", indicatorClassName: "bg-chart-1" },
  { key: "pullRequests", label: "Pull Requests", indicatorClassName: "bg-chart-2" },
  { key: "reviews", label: "Reviews", indicatorClassName: "bg-chart-3" },
  { key: "issues", label: "Issues", indicatorClassName: "bg-chart-4" },
];

export function ActivityStatsRow({ breakdown }: ActivityStatsRowProps) {
  const total =
    breakdown.commits + breakdown.pullRequests + breakdown.reviews + breakdown.issues;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {STATS.map(({ key, label, indicatorClassName }) => {
        const count = breakdown[key];
        const percentage = total > 0 ? Math.round((count / total) * 100) : 0;

        return (
          <div key={key} className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5">
              <span className={`size-2 shrink-0 rounded-full ${indicatorClassName}`} />
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
            <p className="text-lg font-semibold text-foreground">
              {count.toLocaleString()}
              <span className="ml-1.5 text-xs font-normal text-muted-foreground">
                {percentage}%
              </span>
            </p>
          </div>
        );
      })}
    </div>
  );
}
