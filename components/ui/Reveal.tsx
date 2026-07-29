"use client";

import type { RefObject } from "react";

import { useInViewOnce } from "@/hooks/useInViewOnce";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  root?: RefObject<HTMLElement | null>;
}

export function Reveal({ children, delay = 0, className, root }: RevealProps) {
  const { ref, isInView } = useInViewOnce<HTMLDivElement>({ root });

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "opacity-0 translate-y-4 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none",
        isInView && "opacity-100 translate-y-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
