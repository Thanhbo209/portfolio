import type { Transition, Variants } from "motion/react";

// Three timing tiers, reused by every variant below instead of each one
// picking its own duration/easing — the "consistent timing" requirement is
// a property of this file, not something to audit per-component later.
export const TRANSITIONS = {
  fast: { duration: 0.175, ease: "easeOut" } satisfies Transition,
  normal: { duration: 0.3, ease: "easeOut" } satisfies Transition,
  reveal: { duration: 0.6, ease: "easeOut" } satisfies Transition,
} as const;

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: TRANSITIONS.reveal },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: TRANSITIONS.reveal },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: TRANSITIONS.fast },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 12 },
  visible: { opacity: 1, x: 0, transition: TRANSITIONS.fast },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: TRANSITIONS.reveal },
};

// Card hover/tap — shared by every Card instance via Card.tsx itself, so
// no section re-declares its own lift/scale. The shadow increase that goes
// with this stays a plain CSS `hover:shadow-lg` at the call site rather
// than an animated value here: box-shadow is a compound string built from
// theme tokens (`--shadow-lg` differs between light/dark), and Motion can
// only smoothly interpolate it from literal, already-resolved values — a
// CSS transition on the same property handles the theme-correct case for
// free without needing a resolved-per-theme constant duplicated here.
export const hoverLift = {
  y: -4,
  scale: 1.01,
  transition: TRANSITIONS.normal,
};

export const pressEffect = {
  scale: 0.98,
  transition: TRANSITIONS.fast,
};

// Buttons/CTAs get their own, snappier pair rather than reusing Card's
// hoverLift/pressEffect — a link/button scaling up 1.03 (not lifting 4px)
// reads as "pressable," while a full lift is a card-specific affordance.
export const buttonHover = {
  scale: 1.03,
  transition: TRANSITIONS.fast,
};

export const buttonPressEffect = {
  scale: 0.96,
  transition: TRANSITIONS.fast,
};
