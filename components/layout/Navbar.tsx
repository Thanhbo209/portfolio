"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Offside } from "next/font/google";
import NavItems from "./NavItems";
import MobileMenu from "./MobileMenu";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";

const offsideFont = Offside({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      if (Math.abs(currentScrollY - lastScrollY) < 10) return;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: hidden && !isOpen ? -100 : 0,
        opacity: hidden && !isOpen ? 0 : 1,
      }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-[100] w-[94vw] max-w-6xl rounded-lg px-3 transition-all duration-300 ${
        scrolled
          ? "glass shadow-lg shadow-black/5 dark:shadow-black/20"
          : "border border-border/20 bg-background/35 backdrop-blur-md"
      }`}
    >
      <div className="flex items-center justify-between gap-3 px-1 py-3 md:px-3">
        <motion.span
          className={`flex cursor-default select-none items-center gap-2 text-sm font-bold ${offsideFont.className}`}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <span
            className="size-2 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.65)]"
            aria-hidden="true"
          />
          <span className="gradient-text">THANH PHAM</span>
        </motion.span>

        <NavItems />

        <div className="flex items-center gap-2 md:gap-3">
          <span className="hidden rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-500 lg:inline-flex">
            Open to internships
          </span>

          <Button variant="outline" size="sm" className="hidden md:inline-flex" asChild>
            <a href="#contact">Contact</a>
          </Button>

          <div className="hidden md:block">
            <ModeToggle />
          </div>

          <Button
            variant="icon"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </div>

      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </motion.header>
  );
}
