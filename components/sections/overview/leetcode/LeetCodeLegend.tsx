export const LEETCODE_LEVEL_COLORS = [
  "bg-muted/40",
  "bg-[#00B8A3]/30",
  "bg-[#00B8A3]/55",
  "bg-[#00B8A3]/80",
  "bg-[#00B8A3]",
];

export function getLeetCodeLevel(count: number): number {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 10) return 3;
  return 4;
}

export function LeetCodeLegend() {
  return (
    <div
      role="group"
      aria-label="LeetCode submission level legend"
      className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground"
    >
      <span>Less</span>
      {LEETCODE_LEVEL_COLORS.map((colorClass, idx) => (
        <span
          key={idx}
          role="img"
          aria-label={`Level ${idx}`}
          className={`size-2.25 ${colorClass}`}
        />
      ))}
      <span>More</span>
    </div>
  );
}
