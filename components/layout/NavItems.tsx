// components/navbar/NavItems.tsx
import Link from "next/link";
import { NAV_ITEMS } from "@/data/navConfig";

export default function NavItems() {
  return (
    <nav className="hidden md:flex items-center gap-6">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-sm font-medium hover:text-primary transition"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
