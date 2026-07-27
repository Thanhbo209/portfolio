"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which of the given section ids is currently "active" — the one
 * intersecting a thin detection band near the top of the viewport. When more
 * than one id is intersecting in the same observer callback (e.g. during a
 * fast scroll), the one that appears latest in `ids` (furthest down the page)
 * wins, since that's the section being scrolled into.
 */
export function useScrollSpy(ids: string[]): string {
  const [activeId, setActiveId] = useState(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const intersecting = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            intersecting.add(entry.target.id);
          } else {
            intersecting.delete(entry.target.id);
          }
        }

        for (let i = ids.length - 1; i >= 0; i--) {
          if (intersecting.has(ids[i])) {
            setActiveId(ids[i]);
            break;
          }
        }
      },
      { rootMargin: "-10% 0px -80% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
