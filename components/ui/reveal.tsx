"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { viewportOnce } from "@/components/motion/transitions";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  amount?: number;
}

const directionMap = {
  up: { y: 30 },
  down: { y: -30 },
  left: { x: -40 },
  right: { x: 40 },
};

export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.5,
  amount,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const offset = directionMap[direction];

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={amount ? { once: true, amount } : viewportOnce}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
