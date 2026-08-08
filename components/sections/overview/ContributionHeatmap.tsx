"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";

import type { ContributionDay } from "@/lib/github";
import {
  formatContributionDate,
  getContributionColor,
  getContributionLabel,
  getContributionLevel,
  type ContributionLevel,
} from "@/lib/contribution-level";
import { TRANSITIONS } from "@/lib/motion/variants";
import { HeatmapTooltip } from "@/components/sections/overview/HeatmapTooltip";

interface ContributionHeatmapProps {
  days: ContributionDay[];
  totalLastYear: number;
}

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

interface WeekColumn {
  week: ContributionDay[];
  month: number;
  showLabel: boolean;
}

// Built via a plain sequential loop rather than mutating a variable inside
// the render-time .map() below - that pattern (safe in a one-shot Server
// Component) trips react-hooks' immutability check once this logic lives in
// a Client Component, since React may invoke render (and therefore a map
// callback) more than once.
function withMonthLabels(weeks: ContributionDay[][]): WeekColumn[] {
  let lastMonth = -1;
  const result: WeekColumn[] = [];
  for (const week of weeks) {
    const month = week[0] ? monthOf(week[0].date) : -1;
    const showLabel = month !== lastMonth;
    if (showLabel) lastMonth = month;
    result.push({ week, month, showLabel });
  }
  return result;
}

// Staggered by week-column (one motion element per week), not by individual
// day cell: 365 individually-staggered cells would take an impractically
// long time even at a tiny per-item delay (365 * the shared 0.08s default
// stagger is ~29s). ~52 columns at a much smaller stagger finishes in well
// under a second - a fast sweep, not a crawl. Cells within a week are plain
// nested content, not independently tracked - they arrive with their column.
const weekStaggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.01 } },
};

const weekColumn = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: TRANSITIONS.fast },
};

interface HoveredCell {
  day: ContributionDay;
  level: ContributionLevel;
  rect: DOMRect;
}

export function ContributionHeatmap({
  days,
  totalLastYear,
}: ContributionHeatmapProps) {
  const weekColumns = withMonthLabels(chunkIntoWeeks(days));
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [scaledHeight, setScaledHeight] = useState<number>();
  const [hoveredCell, setHoveredCell] = useState<HoveredCell | null>(null);

  // A position: fixed tooltip snapshotted from a DOMRect doesn't track the
  // page scrolling underneath it - dismiss it on scroll rather than
  // reimplementing live repositioning for a brief hover affordance.
  useEffect(() => {
    if (!hoveredCell) return;
    function dismiss() {
      setHoveredCell(null);
    }
    window.addEventListener("scroll", dismiss, { capture: true, passive: true });
    return () => window.removeEventListener("scroll", dismiss, { capture: true });
  }, [hoveredCell]);

  // Measures the grid's natural (unscaled) size and shrinks it to fit the
  // available width via a uniform transform - never a horizontal
  // scrollbar. Uniform scaling keeps cells square and never crops a
  // week/month (everything shrinks together; nothing clips). `scrollWidth`/
  // `scrollHeight` reflect the pre-transform layout box regardless of any
  // scale already applied, so re-measuring on resize is always accurate.
  useLayoutEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    function measureAndScale() {
      if (!container || !content) return;
      const containerWidth = container.clientWidth;
      const naturalWidth = content.scrollWidth;
      const naturalHeight = content.scrollHeight;
      const nextScale =
        containerWidth > 0 && naturalWidth > 0
          ? Math.min(1, containerWidth / naturalWidth)
          : 1;
      setScale(nextScale);
      setScaledHeight(naturalHeight * nextScale);
    }

    measureAndScale();
    const observer = new ResizeObserver(measureAndScale);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden"
      style={{ height: scaledHeight }}
    >
      <div
        ref={contentRef}
        style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
        className="w-max"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={weekStaggerContainer}
          role="group"
          aria-label={`GitHub contribution graph, ${totalLastYear.toLocaleString()} contributions in the past year`}
          className="flex gap-0.75"
        >
          {weekColumns.map(({ week, month, showLabel }, weekIndex) => (
            <motion.div
              key={weekIndex}
              variants={weekColumn}
              className="flex flex-col gap-0.75"
            >
              <div className="h-2.25 w-2.25 overflow-visible text-[9px] leading-none whitespace-nowrap text-muted-foreground">
                {showLabel ? MONTH_LABELS[month] : ""}
              </div>
              {week.map((day) => {
                const level = getContributionLevel(day.count);
                const levelLabel = getContributionLabel(level);
                const fullDate = formatContributionDate(day.date);
                const cellLabel = `${fullDate}, ${day.count} ${day.count === 1 ? "contribution" : "contributions"}, level: ${levelLabel}`;

                return (
                  <motion.div
                    key={day.date}
                    whileHover={{ scale: 1.3 }}
                    transition={TRANSITIONS.fast}
                    // React's own onMouseEnter/onMouseLeave, not Motion's
                    // onHoverStart/onHoverEnd: Motion batches its hover
                    // callbacks and invokes them after the native event has
                    // already finished dispatching, by which point
                    // event.currentTarget is null. React's synthetic mouse
                    // events keep currentTarget valid for the handler's
                    // synchronous duration.
                    onMouseEnter={(event) => {
                      setHoveredCell({
                        day,
                        level,
                        rect: event.currentTarget.getBoundingClientRect(),
                      });
                    }}
                    onMouseLeave={() => setHoveredCell(null)}
                    className="relative"
                  >
                    <div
                      role="img"
                      aria-label={cellLabel}
                      className={`size-2.25 rounded-[2px] transition-[filter] duration-150 hover:brightness-125 ${getContributionColor(level)}`}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {hoveredCell && (
        <HeatmapTooltip
          day={hoveredCell.day}
          level={hoveredCell.level}
          anchorRect={hoveredCell.rect}
        />
      )}
    </div>
  );
}
