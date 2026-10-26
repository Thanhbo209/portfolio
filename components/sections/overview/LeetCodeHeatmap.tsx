"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";

import type { LeetCodeDay } from "@/lib/leetcode";
import { formatContributionDate } from "@/lib/contribution-level";
import { TRANSITIONS } from "@/lib/motion/variants";
import { LeetCodeHeatmapTooltip } from "@/components/sections/overview/LeetCodeHeatmapTooltip";
import {
  LEETCODE_LEVEL_COLORS,
  getLeetCodeLevel,
} from "@/components/sections/overview/LeetCodeLegend";

interface LeetCodeHeatmapProps {
  days: LeetCodeDay[];
  totalSubmissions: number;
}

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function chunkIntoWeeks(days: LeetCodeDay[]): LeetCodeDay[][] {
  const weeks: LeetCodeDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

function monthOf(isoDate: string): number {
  return Number(isoDate.split("-")[1]) - 1;
}

interface WeekColumn {
  week: LeetCodeDay[];
  month: number;
  showLabel: boolean;
}

function withMonthLabels(weeks: LeetCodeDay[][]): WeekColumn[] {
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

const weekStaggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.01 } },
};

const weekColumn = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: TRANSITIONS.fast },
};

interface HoveredCell {
  day: LeetCodeDay;
  rect: DOMRect;
}

export function LeetCodeHeatmap({
  days,
  totalSubmissions,
}: LeetCodeHeatmapProps) {
  const weekColumns = withMonthLabels(chunkIntoWeeks(days));
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [scaledHeight, setScaledHeight] = useState<number>();
  const [hoveredCell, setHoveredCell] = useState<HoveredCell | null>(null);

  useEffect(() => {
    if (!hoveredCell) return;
    function dismiss() {
      setHoveredCell(null);
    }
    window.addEventListener("scroll", dismiss, { capture: true, passive: true });
    return () => window.removeEventListener("scroll", dismiss, { capture: true });
  }, [hoveredCell]);

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
          aria-label={`LeetCode submission activity graph, ${totalSubmissions} submissions past year`}
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
                const level = getLeetCodeLevel(day.count);
                const colorClass = LEETCODE_LEVEL_COLORS[level];
                const fullDate = formatContributionDate(day.date);
                const cellLabel = `${fullDate}, ${day.count} ${day.count === 1 ? "submission" : "submissions"}`;

                return (
                  <motion.div
                    key={day.date}
                    whileHover={{ scale: 1.3 }}
                    transition={TRANSITIONS.fast}
                    onMouseEnter={(event) => {
                      setHoveredCell({
                        day,
                        rect: event.currentTarget.getBoundingClientRect(),
                      });
                    }}
                    onMouseLeave={() => setHoveredCell(null)}
                    className="relative"
                  >
                    <div
                      role="img"
                      aria-label={cellLabel}
                      className={`size-2.25 transition-[filter] duration-150 hover:brightness-125 ${colorClass}`}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {hoveredCell && (
        <LeetCodeHeatmapTooltip
          day={hoveredCell.day}
          anchorRect={hoveredCell.rect}
        />
      )}
    </div>
  );
}
