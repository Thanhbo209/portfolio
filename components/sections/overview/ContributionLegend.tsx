import {
  ContributionLevel,
  getContributionColor,
  getContributionLabel,
  getContributionRangeLabel,
} from "@/lib/contribution-level";

const LEVELS = [
  ContributionLevel.None,
  ContributionLevel.Low,
  ContributionLevel.Moderate,
  ContributionLevel.High,
  ContributionLevel.VeryHigh,
];

export function ContributionLegend() {
  return (
    <div
      role="group"
      aria-label="Contribution level legend"
      className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground"
    >
      <span>Less</span>
      {LEVELS.map((level) => (
        <span
          key={level}
          role="img"
          aria-label={`${getContributionLabel(level)}: ${getContributionRangeLabel(level)}`}
          className={`size-2.25 rounded-[2px] ${getContributionColor(level)}`}
        />
      ))}
      <span>More</span>
    </div>
  );
}
