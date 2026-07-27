import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "rounded-md px-2 py-0.5 text-xs font-medium",
        variant === "outline"
          ? "border border-border text-muted-foreground"
          : "bg-secondary text-secondary-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
