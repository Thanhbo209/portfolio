"use client";

import { motion, useReducedMotion } from "motion/react";

export function TypingIndicator() {
  // A Tailwind `motion-reduce:` class can't touch this - the pulse is driven
  // by Motion's own `animate` prop, not a CSS @keyframes animation, so
  // disabling it needs Motion's own reduced-motion signal instead.
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-label="Assistant is typing"
      className="flex w-fit items-center gap-1 rounded-2xl rounded-bl-md bg-muted px-3 py-2.5"
    >
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          animate={
            prefersReducedMotion ? { opacity: 0.6 } : { opacity: [0.3, 1, 0.3] }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : {
                  duration: 1.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.15,
                }
          }
          className="size-1.5 rounded-full bg-muted-foreground"
        />
      ))}
    </div>
  );
}
