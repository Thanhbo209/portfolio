"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which of the given section ids is currently "active" — the one
 * intersecting a thin detection band near the top of the viewport. When more
 * than one id is intersecting in the same observer callback (e.g. during a
 * fast scroll), the one that appears latest in `ids` (furthest down the page)
 * wins, since that's the section being scrolled into.
 *
 * Sections size to their own content (no forced min-h-dvh, see AGENTS.md §5),
 * so the last section can end up shorter than the viewport. Once nothing
 * below it can push it further up the page, its top edge may never reach the
 * detection band at all, and the second-to-last section would stay "active"
 * forever. Reaching the literal bottom of the page is an unambiguous signal
 * on its own, independent of the band, so it overrides to the last id.
 */
export function useScrollSpy(ids: string[]): string {
  const [activeId, setActiveId] = useState(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const intersecting = new Set<string>();

    // Checked at every decision point below (both the observer's callback and
    // the scroll listener), rather than as a one-off override - a scroll jump
    // fires both asynchronously and in an unpredictable order, so whichever
    // one ran last would otherwise win and could clobber the other's result.
    function resolveActiveId(): string {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 1;
      if (atBottom) return ids[ids.length - 1];

      for (let i = ids.length - 1; i >= 0; i--) {
        if (intersecting.has(ids[i])) return ids[i];
      }
      return ids[0];
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            intersecting.add(entry.target.id);
          } else {
            intersecting.delete(entry.target.id);
          }
        }
        setActiveId(resolveActiveId());
      },
      { rootMargin: "-10% 0px -80% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));

    function handleScroll() {
      setActiveId(resolveActiveId());
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ids]);

  return activeId;
}
