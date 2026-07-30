"use client";

import { motion, type Variants } from "motion/react";

import { TRANSITIONS } from "@/lib/motion/variants";

interface MotionIconProps {
  children: React.ReactNode;
  variants: Variants;
  className?: string;
}

// Wraps an already-rendered icon element with a Motion hover-nudge variant.
// Exists as its own "use client" leaf specifically so a Server Component
// parent can resolve a data-driven icon component (a function, which can't
// cross the server/client prop boundary) into JSX itself and hand this
// component only the rendered result as `children` — safe to pass since
// React elements, unlike raw function references, serialize fine.
export function MotionIcon({ children, variants, className }: MotionIconProps) {
  return (
    <motion.span variants={variants} transition={TRANSITIONS.fast} className={className}>
      {children}
    </motion.span>
  );
}
