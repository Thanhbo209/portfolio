import { cn } from "@/lib/utils";
import type { ExternalLink } from "@/types/navigation";

interface ExternalLinkItemProps {
  link: ExternalLink;
  className?: string;
}

export function ExternalLinkItem({ link, className }: ExternalLinkItemProps) {
  const Icon = link.icon;
  const isMail = link.href.startsWith("mailto:");

  return (
    <a
      href={link.href}
      target={isMail ? undefined : "_blank"}
      rel={isMail ? undefined : "noopener noreferrer"}
      className={cn(
        "flex h-9 items-center gap-2 rounded-md px-3 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        className,
      )}
    >
      <Icon className="size-4" />
      {link.label}
    </a>
  );
}
