import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "glow";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    default:
      "bg-secondary text-secondary-foreground border border-transparent",
    outline:
      "bg-transparent border border-border text-muted-foreground",
    glow:
      "bg-glow-muted border border-glow/20 text-foreground",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-all duration-300",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
