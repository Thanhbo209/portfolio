"use client";

import { useLayoutEffect, useRef, useState } from "react";

interface DashboardGridProps {
  githubActivity: React.ReactNode;
  askMyPortfolio: React.ReactNode;
  quickFacts: React.ReactNode;
}

const GAP_PX = 24; // matches this grid's gap-6

// Ask My Portfolio spans both left-column rows (GitHub Activity + Quick
// Facts), but CSS Grid's auto-sized rows can't express "match my sibling
// column's height without growing to fit my own content" - a spanning
// item's own content height feeds back into how tall the auto rows it
// spans become, which is exactly what let a long chat conversation inflate
// GitHub Activity and Quick Facts right along with it. Measuring the left
// column's real height in JS and applying it as an explicit pixel height
// (same measure-then-constrain technique already used in
// ContributionHeatmap's scale-to-fit) breaks that circular dependency.
export function DashboardGrid({
  githubActivity,
  askMyPortfolio,
  quickFacts,
}: DashboardGridProps) {
  const githubRef = useRef<HTMLDivElement>(null);
  const quickFactsRef = useRef<HTMLDivElement>(null);
  const [askHeight, setAskHeight] = useState<number>();

  useLayoutEffect(() => {
    const githubEl = githubRef.current;
    const quickFactsEl = quickFactsRef.current;
    if (!githubEl || !quickFactsEl) return;

    function measure() {
      if (!githubEl || !quickFactsEl) return;
      // Below sm:, GitHub Activity / Ask My Portfolio / Quick Facts stack
      // in a single column instead - no fixed height to lock to.
      const isTwoColumn = window.matchMedia("(min-width: 640px)").matches;
      if (!isTwoColumn) {
        setAskHeight(undefined);
        return;
      }
      setAskHeight(
        githubEl.getBoundingClientRect().height +
          GAP_PX +
          quickFactsEl.getBoundingClientRect().height,
      );
    }

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(githubEl);
    observer.observe(quickFactsEl);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div ref={githubRef}>{githubActivity}</div>

      <div
        className="min-h-0 sm:row-span-2"
        style={askHeight !== undefined ? { height: askHeight } : undefined}
      >
        {askMyPortfolio}
      </div>

      <div ref={quickFactsRef}>{quickFacts}</div>
    </div>
  );
}
