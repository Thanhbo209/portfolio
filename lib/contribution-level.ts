export enum ContributionLevel {
  None = 0,
  Low = 1,
  Moderate = 2,
  High = 3,
  VeryHigh = 4,
}

interface LevelThreshold {
  level: ContributionLevel;
  min: number;
  max: number;
  rangeLabel: string;
}

// The single source of truth for contribution thresholds - the graph,
// tooltip, and legend all derive from this array rather than each hardcoding
// its own copy of "1-3"/"4-7"/etc.
const LEVEL_THRESHOLDS: LevelThreshold[] = [
  { level: ContributionLevel.None, min: 0, max: 0, rangeLabel: "No contributions" },
  { level: ContributionLevel.Low, min: 1, max: 3, rangeLabel: "1-3 contributions" },
  { level: ContributionLevel.Moderate, min: 4, max: 7, rangeLabel: "4-7 contributions" },
  { level: ContributionLevel.High, min: 8, max: 12, rangeLabel: "8-12 contributions" },
  { level: ContributionLevel.VeryHigh, min: 13, max: Infinity, rangeLabel: "13+ contributions" },
];

export function getContributionLevel(count: number): ContributionLevel {
  const match = LEVEL_THRESHOLDS.find(
    ({ min, max }) => count >= min && count <= max,
  );
  return match?.level ?? ContributionLevel.None;
}

// Monochrome intensity ramp over the existing --primary token, not GitHub
// green - empty cells blend into bg-muted, active cells step up in opacity.
const LEVEL_COLOR_CLASSES: Record<ContributionLevel, string> = {
  [ContributionLevel.None]: "bg-muted",
  [ContributionLevel.Low]: "bg-primary/20",
  [ContributionLevel.Moderate]: "bg-primary/45",
  [ContributionLevel.High]: "bg-primary/70",
  [ContributionLevel.VeryHigh]: "bg-primary",
};

export function getContributionColor(level: ContributionLevel): string {
  return LEVEL_COLOR_CLASSES[level];
}

const LEVEL_LABELS: Record<ContributionLevel, string> = {
  [ContributionLevel.None]: "None",
  [ContributionLevel.Low]: "Low",
  [ContributionLevel.Moderate]: "Moderate",
  [ContributionLevel.High]: "High",
  [ContributionLevel.VeryHigh]: "Very High",
};

export function getContributionLabel(level: ContributionLevel): string {
  return LEVEL_LABELS[level];
}

export function getContributionRangeLabel(level: ContributionLevel): string {
  return (
    LEVEL_THRESHOLDS.find((threshold) => threshold.level === level)
      ?.rangeLabel ?? ""
  );
}
