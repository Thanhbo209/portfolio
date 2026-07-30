"use client";

import Link from "next/link";
import { motion } from "motion/react";

// A plain next/link, made animatable with whileHover/whileTap. Not a Button
// abstraction — no variants, no owned styling — just enough to let existing
// CTAs (About, Contact, Resume) animate in place via Motion instead of the
// CSS active:scale-* they used before. Isolated to its own "use client" file
// so the Server Components that render it (About.tsx etc.) don't have to
// become client themselves — same pattern as NavItem being a client leaf
// rendered from the server-rendered Sidebar.
export const MotionLink = motion.create(Link);
