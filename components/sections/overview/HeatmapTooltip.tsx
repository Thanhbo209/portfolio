"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";

import type { ContributionDay } from "@/lib/github";
import {
  formatContributionDate,
  getContributionLabel,
  type ContributionLevel,
} from "@/lib/contribution-level";

interface HeatmapTooltipProps {
  day: ContributionDay;
  level: ContributionLevel;
  anchorRect: DOMRect;
}

const VIEWPORT_MARGIN = 8;
const CELL_GAP = 8;

// Portaled to document.body and positioned from the hovered cell's own
// DOMRect - the heatmap's scaled/measured container clips overflow and its
// `transform: scale(...)` ancestor becomes the containing block for
// `position: fixed` descendants too, so nothing short of a portal actually
// escapes it.
export function HeatmapTooltip({ day, level, anchorRect }: HeatmapTooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);

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
      // Not enough room above - flip below the cell instead.
      top = anchorRect.bottom + CELL_GAP;
    }

    setPosition({ top, left });
  }, [anchorRect]);

  const fullDate = formatContributionDate(day.date);
  const levelLabel = getContributionLabel(level);

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
      className="pointer-events-none z-[100] flex flex-col gap-1 whitespace-nowrap rounded-md border border-border bg-popover px-2.5 py-1.5 text-xs text-popover-foreground shadow-md"
    >
      <span className="font-medium">{fullDate}</span>
      <span>
        {day.count} {day.count === 1 ? "contribution" : "contributions"}
      </span>
      <span className="text-muted-foreground">
        Contribution Level: <span className="text-foreground">{levelLabel}</span>
      </span>
    </motion.div>,
    document.body,
  );
}
