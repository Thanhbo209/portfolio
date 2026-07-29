"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { useNavigationContext } from "@/components/layout/NavigationProvider";
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

  return (
    <Link
      href={`#${id}`}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group relative flex h-12 items-center gap-2 overflow-hidden rounded-md px-3 text-sm font-medium transition-colors duration-250 ease-out motion-reduce:transition-none",
        isActive
          ? "text-background"
          : "text-sidebar-foreground hover:text-background",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "nav-highlight absolute inset-0 bg-primary",
          isActive && "is-active",
        )}
      />
      <span className="relative z-10 flex size-4 shrink-0 [&>svg]:size-4">
        {icon}
      </span>
      <span className="relative z-10">{label}</span>
    </Link>
  );
}
