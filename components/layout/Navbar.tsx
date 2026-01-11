"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Offside } from "next/font/google";
import NavItems from "./NavItems";
import MobileMenu from "./MobileMenu";
import { ModeToggle } from "@/components/ui/mode-toggle";

const offsideFont = Offside({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // tránh nhấp nháy khi scroll rất nhỏ
      if (Math.abs(currentScrollY - lastScrollY) < 10) return;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setHidden(true); // scroll xuống
      } else {
        setHidden(false); // scroll lên
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-7 left-1/2 -translate-x-1/2 max-w-7xl
      bg-accent/70 z-50 rounded-full px-3 max-xl:w-[90vw]
      transition-all duration-300 ease-in-out
      ${hidden ? "-translate-y-32 opacity-0" : "translate-y-0 opacity-100"}`}
    >
      <div className="flex justify-between items-center gap-30 px-6 py-3">
        {/* Logo */}
        <span
          className={`text-2xl max-xl:text-sm font-bold ${offsideFont.className}`}
        >
          THANH PHAM
        </span>

        <NavItems />

        {/* Desktop toggle */}
        <div className="hidden md:block">
          <ModeToggle />
        </div>

        {/* Mobile button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-background/50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </header>
  );
}
