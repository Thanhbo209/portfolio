"use client";

import { motion } from "motion/react";

import { hoverLift, pressEffect } from "@/lib/motion/variants";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <motion.div
      whileHover={hoverLift}
      whileTap={pressEffect}
      className={cn(
        "rounded-md border border-border bg-card p-6 transition-shadow duration-200 hover:border-foreground/20 hover:shadow-lg motion-reduce:transition-none",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
