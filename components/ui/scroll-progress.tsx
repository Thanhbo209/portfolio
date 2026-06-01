"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.2,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[120] h-1 origin-left bg-linear-to-r from-emerald-400 via-sky-400 to-fuchsia-500 shadow-[0_0_18px_rgba(56,189,248,0.35)]"
      style={{ scaleX: shouldReduceMotion ? scrollYProgress : scaleX }}
    />
  );
}
