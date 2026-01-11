"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_ITEMS } from "@/data/navConfig";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Offside } from "next/font/google";
import { X, Menu } from "lucide-react";

export const offsideFont = Offside({
  subsets: ["latin"],
  weight: ["400"],
});

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-7 left-1/2 transform max-xl:w-[90vw] -translate-x-1/2 max-w-7xl bg-accent/40 z-50 shadow-xl rounded-lg">
      <div className="flex justify-between items-center px-6 gap-30 py-3">
        {/* Logo */}
        <div>
          <span
            className={`text-2xl max-xl:text-sm font-bold ${offsideFont.className}`}
          >
            THANH PHAM
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-6 items-center">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium hover:text-primary transition"
            >
              {item.label}
            </Link>
          ))}
          <ModeToggle />
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            className="p-2 rounded-md hover:bg-background/50 transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-primary" />
            ) : (
              <Menu className="w-6 h-6 text-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-sidebar shadow-md transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-screen py-6" : "max-h-0 py-0"
        }`}
      >
        <div className="flex flex-col items-start pl-8 gap-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-thin text-primary hover:text-sidebar-foreground transition"
            >
              {item.label}
            </Link>
          ))}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
