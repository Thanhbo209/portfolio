"use client";

import { NAV_ITEMS } from "@/data/navConfig";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function NavItems() {
  const [activeId, setActiveId] = useState(NAV_ITEMS[0]?.id ?? "");

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.id),
    ).filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.15, 0.35, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const smoothScrollTo = (targetY: number, duration = 700) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo(0, targetY);
      return;
    }

    const startY = window.scrollY;
    const distance = targetY - startY;
    let startTime: number | null = null;

    const easeInOut = (t: number) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    const animation = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      window.scrollTo(0, startY + distance * easeInOut(progress));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const yOffset = -120;
    const targetY =
      el.getBoundingClientRect().top + window.pageYOffset + yOffset;

    smoothScrollTo(targetY, 700);
    setActiveId(id);
  };

  return (
    <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
      {NAV_ITEMS.map((item) => (
        <motion.button
          key={item.id}
          onClick={() => scrollToSection(item.id)}
          aria-current={activeId === item.id ? "page" : undefined}
          className={cn(
            "group relative cursor-pointer rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground outline-none transition-[color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-accent/45 hover:text-foreground active:translate-y-0 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring/60",
            activeId === item.id && "bg-accent/60 text-foreground",
          )}
          whileHover="hover"
          whileTap={{ scale: 0.97 }}
        >
          {item.label}
          <motion.span
            className="absolute bottom-1 left-1/2 h-[2px] rounded-full bg-linear-to-r from-emerald-400 via-sky-400 to-fuchsia-500"
            initial={false}
            animate={{
              width: activeId === item.id ? "64%" : 0,
              x: "-50%",
              opacity: activeId === item.id ? 1 : 0,
            }}
            variants={{
              hover: { width: "64%", x: "-50%", opacity: 1 },
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </motion.button>
      ))}
    </nav>
  );
}
