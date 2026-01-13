// components/navbar/MobileMenu.tsx
"use client";

import { NAV_ITEMS } from "@/data/navConfig";
import { ModeToggle } from "@/components/ui/mode-toggle";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileMenu({ isOpen, onClose }: Props) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const yOffset = -120; // offset cho navbar floating
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });

    onClose();
  };

  return (
    <div
      className={`md:hidden absolute top-full left-0 w-full rounded-xl mt-3
        bg-sidebar shadow-md transition-all duration-300 overflow-hidden
        ${isOpen ? "max-h-screen py-6" : "max-h-0 py-0"}`}
    >
      <div className="flex flex-col items-start pl-6 gap-4">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="text-lg font-thin text-primary hover:text-sidebar-foreground transition"
          >
            {item.label}
          </button>
        ))}

        <div className="mt-4">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
