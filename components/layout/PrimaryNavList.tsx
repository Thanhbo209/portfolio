"use client";

import { LayoutGroup, motion } from "motion/react";

import { NavItem } from "@/components/layout/NavItem";
import { primaryNav } from "@/constants/navigation";
import { fadeLeft, TRANSITIONS } from "@/lib/motion/variants";
import { cn } from "@/lib/utils";

interface PrimaryNavListProps {
  layoutGroupId: string;
  animate: boolean;
  onNavigate?: () => void;
  className?: string;
}

// Shared by Sidebar and MobileNavDrawer so the entrance-stagger + layoutId
// scoping logic isn't duplicated across both surfaces. `layoutGroupId` keeps
// each surface's active-item layoutId (NavItem.tsx) from share-element
// animating against the other surface's independently-mounted copy.
// `animate` is the entrance trigger: the sidebar stays true (animate once on
// mount), the drawer passes its own open/close `visible` state.
export function PrimaryNavList({
  layoutGroupId,
  animate,
  onNavigate,
  className,
}: PrimaryNavListProps) {
  return (
    <LayoutGroup id={layoutGroupId}>
      <nav
        aria-label="Primary"
        className={cn("flex flex-1 flex-col overflow-y-auto p-4", className)}
      >
        {primaryNav.map((item, index) => (
          <motion.div
            key={item.id}
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            variants={fadeLeft}
            transition={{ ...TRANSITIONS.fast, delay: index * 0.05 }}
          >
            <NavItem
              id={item.id}
              label={item.label}
              icon={<item.icon weight="regular" />}
              onNavigate={onNavigate}
            />
          </motion.div>
        ))}
      </nav>
    </LayoutGroup>
  );
}
