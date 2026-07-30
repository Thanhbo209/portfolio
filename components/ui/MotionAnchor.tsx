"use client";

import { motion } from "motion/react";

// A plain <a>, made animatable — the non-Link counterpart to MotionLink.tsx,
// for external/protocol links (mailto:, tel:, target="_blank") that
// shouldn't go through next/link's client-side routing.
export const MotionAnchor = motion.a;
