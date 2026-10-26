interface LeetCodeSolvedGaugeProps {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  easyTotal: number;
  mediumSolved: number;
  mediumTotal: number;
  hardSolved: number;
  hardTotal: number;
}

export function LeetCodeSolvedGauge({
  totalSolved,
  totalQuestions,
  easySolved,
  easyTotal,
  mediumSolved,
  mediumTotal,
  hardSolved,
  hardTotal,
}: LeetCodeSolvedGaugeProps) {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const sum = easySolved + mediumSolved + hardSolved || 1;

  const easyRatio = easySolved / sum;
  const mediumRatio = mediumSolved / sum;
  const hardRatio = hardSolved / sum;

  const easyLength = easyRatio * circumference;
  const mediumLength = mediumRatio * circumference;
  const hardLength = hardRatio * circumference;

  const easyOffset = 0;
  const mediumOffset = -easyLength;
  const hardOffset = -(easyLength + mediumLength);

  return (
    <div
      role="group"
      aria-label={`LeetCode problems solved: ${totalSolved} of ${totalQuestions}`}
      className="flex items-center gap-5"
    >
      {/* Donut Chart */}
      <div className="relative size-24 shrink-0">
        <svg
          viewBox="0 0 100 100"
          className="size-full -rotate-90 transform"
          aria-hidden="true"
        >
          {/* Background Track */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="currentColor"
            className="text-muted/40"
            strokeWidth="7"
            fill="transparent"
          />

          {/* Easy Segment */}
          {easySolved > 0 && (
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="#00B8A3"
              strokeWidth="7"
              strokeDasharray={`${easyLength} ${circumference}`}
              strokeDashoffset={easyOffset}
              fill="transparent"
            />
          )}

          {/* Medium Segment */}
          {mediumSolved > 0 && (
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="#FFC01E"
              strokeWidth="7"
              strokeDasharray={`${mediumLength} ${circumference}`}
              strokeDashoffset={mediumOffset}
              fill="transparent"
            />
          )}

          {/* Hard Segment */}
          {hardSolved > 0 && (
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="#FF375F"
              strokeWidth="7"
              strokeDasharray={`${hardLength} ${circumference}`}
              strokeDashoffset={hardOffset}
              fill="transparent"
            />
          )}
        </svg>

        {/* Center Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-bold tracking-tight text-foreground leading-none">
            {totalSolved}
          </span>
          <span className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase pt-0.5">
            Solved
          </span>
        </div>
      </div>

      {/* Difficulty Breakdown Rows */}
      <div className="flex flex-1 flex-col gap-2.5 min-w-0">
        {/* Easy */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#00B8A3]">Easy</span>
            <div className="tabular-nums">
              <span className="font-semibold text-foreground">{easySolved}</span>
              <span className="text-muted-foreground">/{easyTotal}</span>
            </div>
          </div>
          <div className="h-1.5 w-full bg-muted/40 overflow-hidden">
            <div
              className="h-full bg-[#00B8A3] transition-all duration-300"
              style={{
                width: `${Math.min(100, (easySolved / (easyTotal || 1)) * 100)}%`,
              }}
            />
          </div>
        </div>

        {/* Medium */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#FFC01E]">Med.</span>
            <div className="tabular-nums">
              <span className="font-semibold text-foreground">{mediumSolved}</span>
              <span className="text-muted-foreground">/{mediumTotal}</span>
            </div>
          </div>
          <div className="h-1.5 w-full bg-muted/40 overflow-hidden">
            <div
              className="h-full bg-[#FFC01E] transition-all duration-300"
              style={{
                width: `${Math.min(100, (mediumSolved / (mediumTotal || 1)) * 100)}%`,
              }}
            />
          </div>
        </div>

        {/* Hard */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#FF375F]">Hard</span>
            <div className="tabular-nums">
              <span className="font-semibold text-foreground">{hardSolved}</span>
              <span className="text-muted-foreground">/{hardTotal}</span>
            </div>
          </div>
          <div className="h-1.5 w-full bg-muted/40 overflow-hidden">
            <div
              className="h-full bg-[#FF375F] transition-all duration-300"
              style={{
                width: `${Math.min(100, (hardSolved / (hardTotal || 1)) * 100)}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
