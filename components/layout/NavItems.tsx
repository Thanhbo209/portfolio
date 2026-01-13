// components/navbar/NavItems.tsx
"use client";

import { NAV_ITEMS } from "@/data/navConfig";

export default function NavItems() {
  const smoothScrollTo = (targetY: number, duration = 700) => {
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
  };

  return (
    <nav className="hidden md:flex items-center gap-6">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          onClick={() => scrollToSection(item.id)}
          className="
            relative text-sm font-medium transition-colors duration-300
            hover:text-primary
            after:absolute after:-bottom-1 after:left-1/2 after:h-0.5 after:w-0
            after:bg-primary after:transition-all after:duration-300
            hover:after:left-0 hover:after:w-full cursor-pointer
          "
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
