"use client";

import { useEffect, useState, type RefObject } from "react";
import { motion, type Variants } from "motion/react";

import { fadeIn, fadeUp } from "@/lib/motion/variants";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  root?: RefObject<HTMLElement | null>;
  /** Full-motion entrance variant. Defaults to `fadeUp` (existing behavior
   * for every current call site); pass `fadeLeft`/`fadeRight` etc. for a
   * directional entrance instead. */
  variant?: Variants;
}

// Reduced-motion handling lives only here, scoped to the entrance travel
// (the one animation that's ambient/scroll-triggered rather than a small,
// discrete, user-initiated interaction) - hover/tap feedback elsewhere
// (Card, NavItem, buttons, ...) intentionally stays full-motion regardless
// of the OS setting, since a 4px hover lift isn't the kind of motion
// prefers-reduced-motion is meant to suppress, and disabling it made hovering
// anything feel instant/broken.
//
// Both server and client render the full-motion `variant` on first paint -
// matchMedia isn't available during SSR, and branching on its value during
// the initial render caused a hydration mismatch (server always assumed "no
// preference" while the client's first paint already knew the real OS
// setting, producing a differently-shaped inline style). Switching to the
// opacity-only `fadeIn` happens only after mount, via this effect, so it
// never affects hydration.
export function Reveal({
  children,
  delay = 0,
  className,
  root,
  variant = fadeUp,
}: RevealProps) {
  const [variants, setVariants] = useState<Variants>(variant);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setVariants(query.matches ? fadeIn : variant);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, [variant]);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, root }}
      variants={variants}
      transition={{ delay: delay / 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
