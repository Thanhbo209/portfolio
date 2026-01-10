import Link from "next/link";
import { NAV_ITEMS } from "@/data/navConfig";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function NavItems() {
  return (
    <div className="navbar-items max-md:hidden flex items-center gap-10">
      {NAV_ITEMS.map((item) => {
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-2 text-sm font-medium hover:text-primary transition"
          >
            <span>{item.label}</span>
          </Link>
        );
      })}

      <ModeToggle />
    </div>
  );
}
