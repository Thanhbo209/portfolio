"use client";

import { useEffect } from "react";
import { NAV_ITEMS } from "@/data/navConfig";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileMenu({ isOpen, onClose }: Props) {
  // Scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const yOffset = -120;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });

    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-0 left-0 w-screen h-screen bg-background/80 backdrop-blur-md z-[90]"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed left-4 right-4 top-24 z-[95] rounded-lg glass p-5 shadow-xl"
          >
            <div className="mb-4 flex items-center justify-between gap-3 border-b border-border pb-4">
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-500">
                Open to internships
              </span>
              <ModeToggle />
            </div>

            <nav className="flex flex-col gap-2" aria-label="Mobile primary">
              {NAV_ITEMS.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + index * 0.08, duration: 0.3 }}
                  onClick={() => scrollToSection(item.id)}
                  className="group flex items-center justify-between rounded-lg px-4 py-3 text-left text-lg font-semibold text-foreground/80 outline-none transition-all hover:-translate-y-0.5 hover:bg-accent/55 hover:text-foreground active:translate-y-0 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-ring/60"
                >
                  <span>{item.label}</span>
                  <span
                    className="h-px w-5 bg-linear-to-r from-emerald-400 to-sky-400 opacity-0 transition-all group-hover:w-9 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </motion.button>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 flex flex-col gap-3 border-t border-border pt-4"
            >
              <Button variant="primary" asChild onClick={onClose}>
                <a href="#contact">Contact Me</a>
              </Button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
