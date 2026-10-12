import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "default" | "outline";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "rounded-md px-2 py-0.5 text-xs font-medium",
        variant === "outline"
          ? "border border-border text-muted-foreground"
          : "bg-secondary text-secondary-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
