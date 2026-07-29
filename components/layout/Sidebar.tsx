import Link from "next/link";

import { externalLinks, primaryNav } from "@/constants/navigation";
import { NavItem } from "@/components/layout/NavItem";
import { ExternalLinkItem } from "@/components/layout/ExternalLinkItem";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
      <div className="flex h-16 shrink-0 items-center border-b border-sidebar-border px-4">
        <Link
          href="#overview"
          className="text-sm font-semibold tracking-tight text-sidebar-foreground"
        >
          THANH PHAM
        </Link>
      </div>

      <nav
        aria-label="Primary"
        className="flex flex-1 flex-col gap-2  overflow-y-auto p-3"
      >
        {primaryNav.map((item) => (
          <NavItem
            key={item.id}
            id={item.id}
            label={item.label}
            icon={<item.icon weight="regular" />}
          />
        ))}
      </nav>

      <div className="flex flex-col gap-1 border-t border-sidebar-border p-3">
        {externalLinks.map((link) => (
          <ExternalLinkItem key={link.label} link={link} />
        ))}
        <div className="mt-1 flex items-center justify-between px-3">
          <span className="text-xs text-sidebar-foreground/60">Theme</span>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
