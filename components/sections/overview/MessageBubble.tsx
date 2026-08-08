"use client";

import { motion } from "motion/react";

import { MotionLink } from "@/components/ui/MotionLink";
import { MotionAnchor } from "@/components/ui/MotionAnchor";
import type { FollowUpAction } from "@/lib/portfolio-assistant";
import { buttonHover, buttonPressEffect, fadeUp } from "@/lib/motion/variants";
import { cn } from "@/lib/utils";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  actions?: FollowUpAction[];
}

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className={cn("flex flex-col gap-1.5", isUser ? "items-end" : "items-start")}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-3 py-2 text-sm",
          isUser
            ? "rounded-br-md bg-primary text-primary-foreground"
            : "rounded-bl-md bg-muted text-foreground",
        )}
      >
        {message.content}
      </div>

      {!isUser && message.actions && message.actions.length > 0 && (
        <div className="flex max-w-[80%] flex-wrap gap-2">
          {message.actions.map((action) =>
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
  );
}
