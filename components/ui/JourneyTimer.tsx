"use client";

import { useElapsedTime, type ElapsedTime } from "@/hooks/useElapsedTime";
import { SevenSegmentDigit } from "@/components/ui/SevenSegmentDigit";

interface JourneyTimerProps {
  startDate: string;
}

const GROUPS: { key: keyof ElapsedTime; label: string; pad: number }[] = [
  { key: "days", label: "Days", pad: 3 },
  { key: "hours", label: "Hours", pad: 2 },
  { key: "minutes", label: "Minutes", pad: 2 },
  { key: "seconds", label: "Seconds", pad: 2 },
];

// No aria-live here on purpose: a per-second-updating region would spam
// screen reader announcements. The value is still reachable on demand.
export function JourneyTimer({ startDate }: JourneyTimerProps) {
  const elapsed = useElapsedTime(startDate);

  return (
    <div className="inline-flex flex-col items-center gap-4 rounded-lg bg-sidebar  p-4 shadow-[inset_0_2px_6px_rgba(0,0,0,0.15)] sm:px-30">
      <div className="flex items-start">
        {GROUPS.map((group, index) => {
          const digits = String(elapsed[group.key])
            .padStart(group.pad, "0")
            .split("");

          return (
            <div key={group.key} className="flex items-start">
              {index > 0 && (
                <span
                  aria-hidden
                  className="animate-blink px-1 font-mono text-2xl font-bold text-foreground motion-reduce:animate-none sm:text-3xl lg:text-5xl"
                >
                  :
                </span>
              )}
              <div className="flex flex-col items-center gap-2">
                <div className="flex gap-1">
                  {digits.map((digit, digitIndex) => (
                    <SevenSegmentDigit key={digitIndex} digit={digit} />
                  ))}
                </div>
                <span className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase sm:text-xs">
                  {group.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
