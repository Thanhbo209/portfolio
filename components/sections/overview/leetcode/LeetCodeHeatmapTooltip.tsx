"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";

import type { LeetCodeDay } from "@/lib/leetcode";
import { formatContributionDate } from "@/lib/contribution-level";

interface LeetCodeHeatmapTooltipProps {
  day: LeetCodeDay;
  anchorRect: DOMRect;
}

const VIEWPORT_MARGIN = 8;
const CELL_GAP = 8;

export function LeetCodeHeatmapTooltip({
  day,
  anchorRect,
}: LeetCodeHeatmapTooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(
    null,
  );

  useLayoutEffect(() => {
    const tooltip = tooltipRef.current;
    if (!tooltip) return;

    const { offsetWidth: width, offsetHeight: height } = tooltip;

    let left = anchorRect.left + anchorRect.width / 2 - width / 2;
    left = Math.min(
      Math.max(left, VIEWPORT_MARGIN),
      window.innerWidth - width - VIEWPORT_MARGIN,
    );

    let top = anchorRect.top - height - CELL_GAP;
    if (top < VIEWPORT_MARGIN) {
      top = anchorRect.bottom + CELL_GAP;
    }

    setPosition({ top, left });
  }, [anchorRect]);

  const fullDate = formatContributionDate(day.date);

  return createPortal(
    <motion.div
      ref={tooltipRef}
      role="tooltip"
      initial={{ opacity: 0 }}
      animate={{ opacity: position ? 1 : 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: position?.top ?? anchorRect.top,
        left: position?.left ?? anchorRect.left,
      }}
      className="pointer-events-none z-[100] flex flex-col gap-0.5 whitespace-nowrap border border-border bg-popover px-2.5 py-1.5 text-xs text-popover-foreground shadow-md"
    >
      <span className="font-medium text-foreground">{fullDate}</span>
      <span className="text-muted-foreground">
        <span className="font-semibold text-foreground">{day.count}</span>{" "}
        {day.count === 1 ? "submission" : "submissions"}
      </span>
    </motion.div>,
    document.body,
  );
}
