"use client";

import { motion, HTMLMotionProps, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface AnimatedCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children?: React.ReactNode;
  variant?: "default" | "glass" | "glow" | "spotlight";
  hover?: boolean;
}

const AnimatedCard = forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ className, variant = "default", hover = true, children, ...props }, ref) => {
    const shouldReduceMotion = useReducedMotion();
    const baseStyles =
      "group/card relative overflow-hidden rounded-lg transition-[transform,border-color,box-shadow,background-color] duration-300";

    const cardVariants = {
      default:
        "border border-border/70 bg-card/90 shadow-sm hover:border-glow/30 hover:shadow-xl hover:shadow-glow/10",
      glass:
        "glass shadow-sm hover:border-glow/30 hover:shadow-xl hover:shadow-glow/10",
      glow:
        "border border-glow/20 bg-card/90 shadow-lg shadow-glow/10 hover:border-glow/40 hover:shadow-xl hover:shadow-glow/20",
      spotlight:
        "border border-border/70 bg-card/90 shadow-sm hover:border-emerald-400/30 hover:shadow-xl hover:shadow-emerald-500/10",
    };

    return (
      <motion.div
        ref={ref}
        whileHover={
          hover && !shouldReduceMotion ? { y: -6, scale: 1.01 } : undefined
        }
        transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(baseStyles, cardVariants[variant], className)}
        {...props}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-glow/50 to-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-24 -top-24 size-48 rounded-full bg-emerald-400/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
          aria-hidden="true"
        />
        <div className="relative z-10">{children}</div>
      </motion.div>
    );
  }
);

AnimatedCard.displayName = "AnimatedCard";

export { AnimatedCard };
