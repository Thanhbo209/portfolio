"use client";

import { useEffect, useRef, useState } from "react";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react/dist/ssr";

import { cn } from "@/lib/utils";
import type { Project } from "@/content/projects";
import { ProjectCard } from "@/components/sections/projects/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";

interface ProjectsCarouselProps {
  projects: Project[];
}

export function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    function update() {
      if (!el) return;
      const width = el.clientWidth;
      if (width === 0) return;
      setPageCount(Math.max(1, Math.round(el.scrollWidth / width)));
      setActivePage(Math.round(el.scrollLeft / width));
    }

    update();
    el.addEventListener("scroll", update, { passive: true });
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener("scroll", update);
      resizeObserver.disconnect();
    };
  }, []);

  function goToPage(index: number) {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth });
  }

  function goByPage(direction: 1 | -1) {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth });
  }

  return (
    <div className="flex flex-col gap-6">
      <div
        ref={scrollRef}
        role="region"
        aria-label="Featured projects"
        tabIndex={0}
        className="scrollbar-hide grid grid-flow-col grid-rows-1 auto-cols-[100%] gap-6 overflow-x-auto scroll-smooth motion-reduce:scroll-auto snap-x snap-mandatory sm:auto-cols-[calc(50%-0.75rem)] lg:grid-rows-2"
      >
        {projects.map((project, index) => (
          <Reveal
            key={project.slug}
            delay={index * 60}
            className="h-full snap-start"
            root={scrollRef}
          >
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      {pageCount > 1 && (
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => goByPage(-1)}
            disabled={activePage === 0}
            aria-label="Previous projects"
            className="flex size-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors duration-200 hover:text-foreground disabled:opacity-40 motion-reduce:transition-none"
          >
            <CaretLeftIcon className="size-4" weight="bold" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: pageCount }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToPage(index)}
                aria-label={`Go to page ${index + 1}`}
                aria-current={index === activePage ? "true" : undefined}
                className={cn(
                  "size-2 rounded-full transition-colors duration-200 motion-reduce:transition-none",
                  index === activePage ? "bg-foreground" : "bg-border",
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => goByPage(1)}
            disabled={activePage === pageCount - 1}
            aria-label="Next projects"
            className="flex size-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors duration-200 hover:text-foreground disabled:opacity-40 motion-reduce:transition-none"
          >
            <CaretRightIcon className="size-4" weight="bold" />
          </button>
        </div>
      )}
    </div>
  );
}
