import Link from "next/link";

import { externalLinks } from "@/constants/navigation";
import { PrimaryNavList } from "@/components/layout/PrimaryNavList";
import { ExternalLinkItem } from "@/components/layout/ExternalLinkItem";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
      <div className="flex h-16 shrink-0 items-center border-b border-sidebar-border px-4">
        <Link
          href="/#overview"
          className="text-shimmer text-sm font-semibold tracking-tight"
          style={{ "--foreground": "var(--sidebar-foreground)" } as React.CSSProperties}
        >
          THANH PHAM
        </Link>
      </div>

      <PrimaryNavList layoutGroupId="sidebar-nav" animate className="gap-2" />

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
