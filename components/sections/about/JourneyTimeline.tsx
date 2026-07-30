"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import type { Icon } from "@phosphor-icons/react";
import {
  BrainIcon,
  BriefcaseIcon,
  CodeIcon,
  GraduationCapIcon,
  TargetIcon,
} from "@phosphor-icons/react/dist/ssr";

import { cn } from "@/lib/utils";

interface Milestone {
  label: string;
  date: string;
  icon: Icon;
  current?: boolean;
}

const milestones: Milestone[] = [
  {
    label: "Started Software Engineering at HUFLIT",
    date: "Aug 2024",
    icon: GraduationCapIcon,
  },
  {
    label: "Learnt and Built full-stack projects",
    date: "2024 - Present",
    icon: CodeIcon,
  },
  {
    label: "Contributed to AI data labeling projects at Acacy Co. Ltd.",
    date: "May 2026 - June 2026",
    icon: BrainIcon,
  },
  {
    label: "Joined FlyRank AI as an AI Backend Engineering Intern",
    date: "Jun 2026 - Present",
    icon: BriefcaseIcon,
  },
  {
    label: "Current goal: becoming a professional AI Engineer",
    date: "Present",
    icon: TargetIcon,
    current: true,
  },
];

interface TimelineConnectorProps {
  progress: MotionValue<number>;
  index: number;
  count: number;
}

// Each connector owns a slice of the shared scroll progress (this item's
// segment fills as the timeline scrolls through it), rather than one
// absolutely-positioned line spanning the whole list — that would need exact
// pixel math to line up with variable-height items; slicing scaleY per
// flex-laid-out segment gets the same "line grows while scrolling" effect
// without it. transform-only (scaleY), per the animate-transform-not-layout
// rule, so this never touches height/top directly.
function TimelineConnector({ progress, index, count }: TimelineConnectorProps) {
  const start = index / (count - 1);
  const end = (index + 1) / (count - 1);
  const scaleY = useTransform(progress, [start, end], [0, 1]);

  return (
    <span className="relative mt-1 w-px flex-1 bg-border">
      <motion.span
        aria-hidden
        style={{ scaleY }}
        className="absolute inset-0 w-px origin-top bg-primary"
      />
    </span>
  );
}

export function JourneyTimeline() {
  const containerRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.5"],
  });

  return (
    <div>
      <h3 className="text-lg font-semibold text-foreground">My Journey</h3>
      <ol ref={containerRef} className="mt-6 flex flex-col gap-8">
        {milestones.map((milestone, index) => (
          <li key={milestone.label} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full border bg-card",
                  milestone.current
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-border",
                )}
              >
                <milestone.icon
                  className={cn(
                    "size-4",
                    milestone.current
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                  weight="regular"
                />
              </span>
              {index < milestones.length - 1 && (
                <TimelineConnector
                  progress={scrollYProgress}
                  index={index}
                  count={milestones.length}
                />
              )}
            </div>
            <div className="pb-2">
              <p className="text-xs text-muted-foreground">
                {milestone.date}
              </p>
              <p className="text-sm font-medium text-foreground">
                {milestone.label}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
