"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useState, type MouseEvent, type ReactNode } from "react";

import { useNavigationContext } from "@/components/layout/NavigationProvider";
import { TRANSITIONS } from "@/lib/motion/variants";
import { cn } from "@/lib/utils";

interface NavItemProps {
  id: string;
  label: string;
  icon: ReactNode;
  onNavigate?: () => void;
  className?: string;
}

export function NavItem({
  id,
  label,
  icon,
  onNavigate,
  className,
}: NavItemProps) {
  const { activeId } = useNavigationContext();
  const isActive = activeId === id;
  const isHomepage = usePathname() === "/";
  const [isHovered, setIsHovered] = useState(false);

  // On the homepage itself, scroll natively instead of letting Next.js's
  // router handle the hash change: its own scroll restoration bypasses the
  // `scroll-smooth`/`motion-reduce:scroll-auto` CSS on <html> and jumps
  // instantly. `element.scrollIntoView()` with no explicit `behavior` defers
  // to that CSS, so it's smooth or instant purely based on the user's
  // reduced-motion preference — no JS media-query check needed.
  // From any other route, Next's normal navigate-then-scroll-to-hash runs,
  // since the target section doesn't exist in the DOM until after the page
  // navigation completes.
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (isHomepage) {
      if (isActive) {
        event.preventDefault();
        onNavigate?.();
        return;
      }
      const target = document.getElementById(id);
      if (target) {
        event.preventDefault();
        target.scrollIntoView();
        history.replaceState(null, "", `/#${id}`);
      }
    }
    onNavigate?.();
  }

  return (
    <Link
      href={`/#${id}`}
      scroll={!isHomepage}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group relative flex h-12 items-center gap-2 overflow-hidden rounded-md px-3 text-sm font-medium transition-colors duration-250 ease-out motion-reduce:transition-none",
        isActive
          ? "text-background"
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        className,
      )}
    >
      {isActive && (
        <motion.span
          layoutId="nav-active-pill"
          aria-hidden
          className="nav-highlight absolute inset-0 bg-primary"
          transition={TRANSITIONS.normal}
        />
      )}
      <motion.span
        animate={{ x: isHovered ? 4 : 0 }}
        transition={TRANSITIONS.fast}
        className="relative z-10 flex size-4 shrink-0 [&>svg]:size-4"
      >
        {icon}
      </motion.span>
      <span className="relative z-10">{label}</span>
    </Link>
  );
}
