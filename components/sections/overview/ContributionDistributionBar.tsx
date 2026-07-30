"use client";

import { motion } from "motion/react";

import type { ContributionBreakdown } from "@/lib/github";
import { TRANSITIONS } from "@/lib/motion/variants";

interface ContributionDistributionBarProps {
  breakdown: ContributionBreakdown;
}

// Same category -> color mapping as ActivityStatsRow, so a segment's color
// here visually matches that stat's indicator dot.
const SEGMENTS: { key: keyof ContributionBreakdown; className: string }[] = [
  { key: "commits", className: "bg-chart-1" },
  { key: "pullRequests", className: "bg-chart-2" },
  { key: "reviews", className: "bg-chart-3" },
  { key: "issues", className: "bg-chart-4" },
];

export function ContributionDistributionBar({
  breakdown,
}: ContributionDistributionBarProps) {
  const total =
    breakdown.commits + breakdown.pullRequests + breakdown.reviews + breakdown.issues;

  return (
    <div className="flex h-1.5 w-full gap-0.5 overflow-hidden rounded-full bg-muted">
      {SEGMENTS.map(({ key, className }) => {
        const percentage = total > 0 ? (breakdown[key] / total) * 100 : 0;

        return (
          // The segment's real, final width is set immediately (non-animated
          // inline style); the "grow in" reveal animates scaleX (transform)
          // from 0->1 with a left transform-origin instead of animating
          // `width` itself - same visual result, GPU-accelerated, and
          // consistent with the transform/opacity-only rule used everywhere
          // else in this codebase (e.g. the About section's timeline line).
          <div
            key={key}
            style={{ width: `${percentage}%` }}
            className="h-full overflow-hidden rounded-full"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={TRANSITIONS.reveal}
              className={`h-full w-full origin-left rounded-full ${className}`}
            />
          </div>
        );
      })}
    </div>
  );
}
