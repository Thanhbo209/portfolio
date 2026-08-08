"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PaperPlaneRightIcon } from "@phosphor-icons/react/dist/ssr";

import { PLACEHOLDER_EXAMPLES } from "@/lib/portfolio-assistant";
import { buttonHover, buttonPressEffect, TRANSITIONS } from "@/lib/motion/variants";

interface AssistantInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const PLACEHOLDER_ROTATE_MS = 3500;

export function AssistantInput({ value, onChange, onSubmit }: AssistantInputProps) {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((index) => (index + 1) % PLACEHOLDER_EXAMPLES.length);
    }, PLACEHOLDER_ROTATE_MS);
    return () => clearInterval(interval);
  }, []);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      onSubmit();
    } else if (event.key === "Escape") {
      onChange("");
    }
  }

  return (
    <div className="flex items-center gap-2 rounded-full border border-border bg-muted/50 py-1.5 pr-1.5 pl-3.5">
      <div className="relative min-w-0 flex-1">
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Ask a question about Thanh's portfolio"
          className="w-full min-w-0 border-none bg-transparent text-sm text-foreground outline-none"
        />
        {/* Native <input placeholder> can't be transitioned, so the rotating
            example text is a separate overlay, shown only while empty. */}
        {value.length === 0 && (
          <div className="pointer-events-none absolute inset-0 flex items-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={placeholderIndex}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={TRANSITIONS.fast}
                className="text-sm text-muted-foreground"
              >
                {PLACEHOLDER_EXAMPLES[placeholderIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        )}
      </div>
      <motion.button
        type="button"
        onClick={onSubmit}
        disabled={value.trim().length === 0}
        whileHover={value.trim().length > 0 ? buttonHover : undefined}
        whileTap={value.trim().length > 0 ? buttonPressEffect : undefined}
        aria-label="Send message"
        className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity duration-200 disabled:opacity-40"
      >
        <PaperPlaneRightIcon className="size-3.5" weight="fill" />
      </motion.button>
    </div>
  );
}
