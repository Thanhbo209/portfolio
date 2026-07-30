"use client";

import { motion } from "motion/react";

import { SUGGESTION_CHIPS } from "@/lib/portfolio-assistant";
import { TRANSITIONS } from "@/lib/motion/variants";

interface SuggestionChipsProps {
  onSelect: (topicId: string) => void;
}

const chipHover = { y: -2, transition: TRANSITIONS.fast };

export function SuggestionChips({ onSelect }: SuggestionChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {SUGGESTION_CHIPS.map(({ label, topicId }) => (
        <motion.button
          key={topicId}
          type="button"
          whileHover={chipHover}
          whileTap={{ scale: 0.96 }}
          onClick={() => onSelect(topicId)}
          aria-label={`Ask about ${label.toLowerCase()}`}
          className="rounded-md border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:border-foreground/30 hover:text-foreground"
        >
          {label}
        </motion.button>
      ))}
    </div>
  );
}
