"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

interface UseInViewOnceOptions {
  root?: RefObject<HTMLElement | null>;
  rootMargin?: string;
  threshold?: number;
}

export function useInViewOnce<T extends HTMLElement>({
  root,
  rootMargin = "-40px 0px",
  threshold = 0.15,
}: UseInViewOnceOptions = {}) {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { root: root?.current ?? null, rootMargin, threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isInView, root, rootMargin, threshold]);

  return { ref, isInView };
}
