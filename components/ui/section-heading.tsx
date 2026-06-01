"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/components/motion/variants";
import { viewportOnce } from "@/components/motion/transitions";

interface SectionHeadingProps {
  label?: string;
  title: string;
  highlight?: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  label,
  title,
  highlight,
  description,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {label && (
        <span className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-glow sm:text-sm">
          <span className="h-px w-8 signal-line" aria-hidden="true" />
          {label}
        </span>
      )}
      <h2 className="heading text-balance">
        {title}
        {highlight && (
          <>
            {" "}
            <span className="gradient-text">{highlight}</span>
          </>
        )}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
