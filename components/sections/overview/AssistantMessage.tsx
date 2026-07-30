"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChatCircleIcon } from "@phosphor-icons/react/dist/ssr";

import { MotionLink } from "@/components/ui/MotionLink";
import { MotionAnchor } from "@/components/ui/MotionAnchor";
import {
  EMPTY_STATE,
  type AssistantTopic,
} from "@/lib/portfolio-assistant";
import { buttonHover, buttonPressEffect, TRANSITIONS } from "@/lib/motion/variants";

interface AssistantMessageProps {
  activeTopic: AssistantTopic | null;
}

// Splits a response into sentences so they can stagger in fast (~0.05s
// apart) rather than arriving as one flat block - "streams in naturally"
// without faking a multi-second AI "thinking" delay: the lookup itself is
// still instant, only the presentation is staged.
//
// Splits only on sentence-ending punctuation followed by whitespace, not on
// every period - response text references "Node.js", "React.js", etc.,
// where the period isn't a sentence boundary (no space follows it).
function splitIntoSentences(text: string): string[] {
  return text.split(/(?<=[.!?])\s+/).filter(Boolean);
}

const sentenceContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const sentenceItem = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: TRANSITIONS.fast },
};

export function AssistantMessage({ activeTopic }: AssistantMessageProps) {
  return (
    <div
      aria-live="polite"
      // Fixed height, not min-height: this card sits in a sm:auto-rows-fr
      // grid alongside three siblings, so if this area grew with longer
      // responses, the whole row (every card in it) would stretch to match
      // - not just this card. overflow-y-auto is a safety net for the rare
      // response + actions combo that doesn't fit, rather than letting the
      // card grow at all.
      className="flex h-56 flex-col justify-center gap-3 overflow-y-auto text-sm"
    >
      <AnimatePresence mode="wait">
        {activeTopic ? (
          <motion.div
            key={activeTopic.id}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: TRANSITIONS.fast }}
            variants={sentenceContainer}
            className="flex flex-col gap-3"
          >
            <div className="flex flex-col gap-1">
              {splitIntoSentences(activeTopic.response).map((sentence, index) => (
                <motion.p
                  key={index}
                  variants={sentenceItem}
                  className="text-foreground"
                >
                  {sentence}
                </motion.p>
              ))}
            </div>

            {activeTopic.actions.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {activeTopic.actions.map((action) =>
                  action.external ? (
                    <MotionAnchor
                      key={action.label}
                      href={action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={buttonHover}
                      whileTap={buttonPressEffect}
                      aria-label={action.label}
                      className="rounded-md border border-border px-2.5 py-1 text-xs font-medium text-foreground transition-colors duration-200 hover:text-muted-foreground"
                    >
                      {action.label}
                    </MotionAnchor>
                  ) : (
                    <MotionLink
                      key={action.label}
                      href={action.href}
                      whileHover={buttonHover}
                      whileTap={buttonPressEffect}
                      aria-label={action.label}
                      className="rounded-md border border-border px-2.5 py-1 text-xs font-medium text-foreground transition-colors duration-200 hover:text-muted-foreground"
                    >
                      {action.label}
                    </MotionLink>
                  ),
                )}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: TRANSITIONS.fast }}
            variants={sentenceContainer}
            className="flex flex-col gap-2"
          >
            <motion.div
              variants={sentenceItem}
              className="flex items-center gap-2 text-foreground"
            >
              <ChatCircleIcon className="size-4 shrink-0" weight="regular" />
              <span>{EMPTY_STATE.message}</span>
            </motion.div>
            <motion.ul
              variants={sentenceItem}
              className="flex flex-col gap-1 pl-6 text-muted-foreground"
            >
              {EMPTY_STATE.topics.map((topic) => (
                <li key={topic}>• {topic}</li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
