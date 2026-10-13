"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { Card } from "@/components/ui/Card";
import { facts } from "@/content/facts";
import { cn } from "@/lib/utils";

const HOP_MS = 1600;

export function AchievementsList() {
  const prefersReducedMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visitedIndices, setVisitedIndices] = useState<Set<number>>(new Set());
  const [jumpCostMessage, setJumpCostMessage] = useState<string | null>(null);

  // Traverse timer (HOP_MS interval, automatic advance)
  useEffect(() => {
    if (!isPlaying || prefersReducedMotion) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev === null) {
          setVisitedIndices(new Set([0]));
          return 0;
        }
        if (prev < facts.length) {
          const next = prev + 1;
          if (next < facts.length) {
            setVisitedIndices((v) => new Set([...v, next]));
          } else if (next === facts.length) {
            setIsPlaying(false);
          }
          return next;
        }
        setIsPlaying(false);
        return prev;
      });
      setJumpCostMessage(null);
    }, HOP_MS);

    return () => clearInterval(timer);
  }, [isPlaying, prefersReducedMotion]);

  function handleTraverse() {
    if (prefersReducedMotion) return;

    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setJumpCostMessage(null);
      if (currentIndex === null || currentIndex >= facts.length) {
        setCurrentIndex(0);
        setVisitedIndices(new Set([0]));
      }
      setIsPlaying(true);
    }
  }

  function handleStep() {
    setIsPlaying(false);
    setJumpCostMessage(null);

    setCurrentIndex((prev) => {
      if (prev === null) {
        setVisitedIndices(new Set([0]));
        return 0;
      }
      if (prev < facts.length) {
        const next = prev + 1;
        if (next < facts.length) {
          setVisitedIndices((v) => new Set([...v, next]));
        }
        return next;
      }
      return prev;
    });
  }

  function handleReset() {
    setIsPlaying(false);
    setCurrentIndex(null);
    setVisitedIndices(new Set());
    setJumpCostMessage(null);
  }

  function handleNodeClick(index: number) {
    setIsPlaying(false);
    setCurrentIndex(index);

    // Record visits from head to index
    setVisitedIndices((prev) => {
      const next = new Set(prev);
      for (let i = 0; i <= index; i++) {
        next.add(i);
      }
      return next;
    });

    const hops = index;
    setJumpCostMessage(
      `Reached node ${index + 1} after ${hops} ${hops === 1 ? "hop" : "hops"}, O(n)`,
    );
  }

  return (
    <Card className="@container p-5 md:p-6">
      {/* Header Row: Title + Description on left, Controls aligned right on wide cards */}
      <div className="flex flex-col gap-4 @[45rem]:flex-row @[45rem]:items-center @[45rem]:justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="font-[family-name:var(--font-role-title,var(--font-heading))] text-xl font-normal text-foreground whitespace-nowrap">
            Achievements as a Linked List
          </h3>
          <p className="text-xs text-muted-foreground">
            Key milestones navigated as a singly linked list.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleTraverse}
            disabled={prefersReducedMotion === true}
            title={
              prefersReducedMotion
                ? "Automatic traversal disabled under reduced motion"
                : undefined
            }
            className="flex h-10 min-h-[40px] items-center justify-center border border-border bg-card px-4 text-xs font-medium text-foreground transition-colors hover:border-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"
          >
            {isPlaying ? "Pause" : "Traverse"}
          </button>

          <button
            type="button"
            onClick={handleStep}
            className="flex h-10 min-h-[40px] items-center justify-center border border-border bg-card px-4 text-xs font-medium text-foreground transition-colors hover:border-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Step
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="flex h-10 min-h-[40px] items-center justify-center border border-border bg-card px-4 text-xs font-medium text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="border-t border-border my-5" />

      {/* HORIZONTAL CHAIN (Displayed when container is wide enough: >= 50rem / ~800px) */}
      <div className="hidden @[50rem]:block">
        <div className="relative pt-7 pb-2">
          {/* HEAD label above node 1 */}
          <div className="absolute -top-1 left-2 flex items-center gap-1 font-mono text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
            <span>HEAD</span>
            <span className="text-foreground">↓</span>
          </div>

          <ol className="flex w-full items-center">
            {facts.map((node, index) => {
              const isCurrent = currentIndex === index;
              const isVisited = visitedIndices.has(index);

              return (
                <li
                  key={node.id}
                  className="flex flex-1 min-w-[7.5rem] items-center"
                >
                  <div className="relative flex-1 min-w-0">
                    {/* curr pointer tag sitting ABOVE the current node */}
                    {isCurrent && (
                      <motion.div
                        layoutId="curr-pointer-h"
                        transition={
                          prefersReducedMotion
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 350, damping: 25 }
                        }
                        className="absolute -top-7 left-1/2 -translate-x-1/2 flex items-center gap-1 font-mono text-xs font-bold text-brand whitespace-nowrap"
                      >
                        <span>curr</span>
                        <span>↓</span>
                      </motion.div>
                    )}

                    {/* Node button (title cell + pointer cell) */}
                    <button
                      type="button"
                      onClick={() => handleNodeClick(index)}
                      aria-current={isCurrent ? "step" : undefined}
                      className={cn(
                        "flex h-11 w-full items-stretch border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        isCurrent
                          ? "border-foreground bg-foreground text-background"
                          : isVisited
                            ? "border-border bg-card text-foreground hover:border-foreground/30"
                            : "border-border bg-card/60 text-foreground/80 hover:border-foreground/30",
                      )}
                    >
                      <span className="sr-only">{node.fact}</span>

                      {/* Title cell */}
                      <span className="flex flex-1 min-w-0 items-center px-3 py-2 text-left text-xs sm:text-sm font-medium truncate">
                        {node.title}
                      </span>

                      {/* Pointer cell */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "flex w-7 shrink-0 items-center justify-center border-l",
                          isCurrent
                            ? "border-background/30 text-background"
                            : "border-border text-foreground",
                        )}
                      >
                        {isCurrent ? (
                          <span className="size-2 bg-background" />
                        ) : isVisited ? (
                          <span className="font-mono text-xs font-bold">✓</span>
                        ) : (
                          <span className="size-1.5 bg-muted-foreground/40" />
                        )}
                      </span>
                    </button>
                  </div>

                  {/* Horizontal connector to next node or null */}
                  <div
                    className="flex w-6 sm:w-8 shrink-0 items-center justify-center"
                    aria-hidden="true"
                  >
                    <div className="h-px w-full bg-border" />
                    <svg
                      width="6"
                      height="8"
                      viewBox="0 0 6 8"
                      className="text-border fill-current shrink-0"
                    >
                      <polygon points="6,4 0,0 0,8" />
                    </svg>
                  </div>
                </li>
              );
            })}

            {/* NULL Terminator */}
            <li className="relative shrink-0 flex items-center">
              {currentIndex === facts.length && (
                <motion.div
                  layoutId="curr-pointer-h"
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 350, damping: 25 }
                  }
                  className="absolute -top-7 left-1/2 -translate-x-1/2 flex items-center gap-1 font-mono text-xs font-bold text-brand whitespace-nowrap"
                >
                  <span>curr</span>
                  <span>↓</span>
                </motion.div>
              )}
              <div
                className={cn(
                  "border px-3 py-1 font-mono text-xs transition-colors",
                  currentIndex === facts.length
                    ? "border-foreground bg-foreground font-bold text-background"
                    : "border-border bg-muted/20 text-muted-foreground",
                )}
              >
                null
              </div>
            </li>
          </ol>
        </div>
      </div>

      {/* VERTICAL CHAIN (Fallback below 50rem when cards cannot fit 7.5rem per node) */}
      <div className="block @[50rem]:hidden">
        <div className="flex flex-col items-center">
          {/* HEAD pointer label */}
          <div className="mb-2 flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            <span>HEAD</span>
            <span className="text-foreground">↓</span>
          </div>

          <ol className="flex w-full flex-col items-center pl-10 pr-2">
            {facts.map((node, index) => {
              const isCurrent = currentIndex === index;
              const isVisited = visitedIndices.has(index);

              return (
                <li
                  key={node.id}
                  className="relative flex w-full flex-col items-center"
                >
                  {/* Connector from previous node */}
                  {index > 0 && (
                    <div
                      className="flex flex-col items-center py-1"
                      aria-hidden="true"
                    >
                      <div className="h-3 w-px bg-border" />
                      <svg
                        width="8"
                        height="6"
                        viewBox="0 0 8 6"
                        className="text-border fill-current"
                      >
                        <polygon points="4,6 0,0 8,0" />
                      </svg>
                    </div>
                  )}

                  <div className="relative flex w-full items-center">
                    {/* Floating curr pointer tag beside node */}
                    {isCurrent && (
                      <motion.div
                        layoutId="curr-pointer-v"
                        transition={
                          prefersReducedMotion
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 350, damping: 25 }
                        }
                        className="absolute -left-10 sm:-left-12 flex items-center gap-1 font-mono text-xs font-bold text-brand"
                      >
                        <span>curr</span>
                        <span>→</span>
                      </motion.div>
                    )}

                    {/* Node button */}
                    <button
                      type="button"
                      onClick={() => handleNodeClick(index)}
                      aria-current={isCurrent ? "step" : undefined}
                      className={cn(
                        "flex min-h-[40px] w-full items-stretch border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        isCurrent
                          ? "border-foreground bg-foreground text-background"
                          : isVisited
                            ? "border-border bg-card text-foreground hover:border-foreground/30"
                            : "border-border bg-card/60 text-foreground/80 hover:border-foreground/30",
                      )}
                    >
                      <span className="sr-only">{node.fact}</span>

                      <span className="flex flex-1 items-center px-3 py-2 text-left text-sm font-medium">
                        {node.title}
                      </span>

                      <span
                        aria-hidden="true"
                        className={cn(
                          "flex w-7 shrink-0 items-center justify-center border-l",
                          isCurrent
                            ? "border-background/30 text-background"
                            : "border-border text-foreground",
                        )}
                      >
                        {isCurrent ? (
                          <span className="size-2 bg-background" />
                        ) : isVisited ? (
                          <span className="font-mono text-xs font-bold">✓</span>
                        ) : (
                          <span className="size-1.5 bg-muted-foreground/40" />
                        )}
                      </span>
                    </button>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Connector to null terminator */}
          <div
            className="flex flex-col items-center py-1 pl-8"
            aria-hidden="true"
          >
            <div className="h-3 w-px bg-border" />
            <svg
              width="8"
              height="6"
              viewBox="0 0 8 6"
              className="text-border fill-current"
            >
              <polygon points="4,6 0,0 8,0" />
            </svg>
          </div>

          {/* Null terminator */}
          <div className="relative flex items-center justify-center pl-8">
            {currentIndex === facts.length && (
              <motion.div
                layoutId="curr-pointer-v"
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 350, damping: 25 }
                }
                className="absolute -left-10 sm:-left-12 flex items-center gap-1 font-mono text-xs font-bold text-brand"
              >
                <span>curr</span>
                <span>→</span>
              </motion.div>
            )}
            <div
              className={cn(
                "border px-3 py-1 font-mono text-xs transition-colors",
                currentIndex === facts.length
                  ? "border-foreground bg-foreground font-bold text-background"
                  : "border-border bg-muted/20 text-muted-foreground",
              )}
            >
              null
            </div>
          </div>
        </div>
      </div>

      {/* Fact panel (full width, fixed min-height to prevent layout shift) */}
      <div
        aria-live="polite"
        className="mt-6 flex min-h-[80px] flex-col justify-center border border-border bg-muted/20 p-4 text-sm"
      >
        <motion.div
          key={
            currentIndex === null
              ? "idle"
              : currentIndex === facts.length
                ? "end"
                : `${currentIndex}-${jumpCostMessage ?? ""}`
          }
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
          className="flex flex-col gap-1"
        >
          {currentIndex === null ? (
            <p className="text-muted-foreground">
              Press Traverse to walk the list.
            </p>
          ) : currentIndex === facts.length ? (
            <div className="flex flex-col gap-0.5">
              <p className="font-medium text-foreground">
                End of list: {facts.length} facts visited.
              </p>
              <p className="text-xs text-muted-foreground">
                Pointer reached the null terminator.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-0.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Node {currentIndex + 1} of {facts.length}: {facts[currentIndex].title}
              </p>
              <p className="font-medium text-foreground">
                {facts[currentIndex].fact}
              </p>
              {jumpCostMessage && (
                <p className="mt-0.5 text-xs text-brand font-mono">
                  {jumpCostMessage}
                </p>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </Card>
  );
}
