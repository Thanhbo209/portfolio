import Link from "next/link";
import { NAV_ITEMS } from "@/data/navConfig";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function NavItems() {
  return (
    <div className="navbar-items flex items-center gap-6">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-2 text-sm font-medium hover:text-primary transition"
          >
            <Icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        );
      })}

      <ModeToggle />
    </div>
  );
}
