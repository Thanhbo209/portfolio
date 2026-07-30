import {
  ChatCircleIcon,
  DownloadSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";

import { MotionLink } from "@/components/ui/MotionLink";
import { buttonPressEffect, TRANSITIONS } from "@/lib/motion/variants";

// A dedicated hover for this section's closing CTA — combines Card's lift
// with the buttons' own press-friendly scale, at the slightly slower
// `normal` timing, so this final action reads as more prominent than the
// smaller inline buttons/icons elsewhere that use `buttonHover`/`fast`.
const ctaHover = { y: -4, scale: 1.03, transition: TRANSITIONS.normal };

export function AboutCTA() {
  return (
    <div className="flex flex-col items-start gap-4 border-t border-border pt-8 sm:flex-row sm:flex-wrap">
      <MotionLink
        href="#contact"
        whileHover={ctaHover}
        whileTap={buttonPressEffect}
        className="flex w-full items-center justify-center gap-2 bg-foreground px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors duration-200 hover:bg-accent/90 hover:text-foreground hover:shadow-md sm:w-auto"
      >
        <ChatCircleIcon className="size-4" weight="regular" />
        Get in Touch
      </MotionLink>
      <MotionLink
        href="/resume"
        whileHover={ctaHover}
        whileTap={buttonPressEffect}
        className="flex w-full items-center justify-center gap-2 border px-4 py-2 text-sm font-medium text-foreground transition-colors duration-200 hover:text-muted-foreground hover:shadow-md sm:w-auto"
      >
        <DownloadSimpleIcon className="size-4" weight="regular" />
        Download Resume
      </MotionLink>
    </div>
  );
}
