import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-md border border-border bg-card p-6 transition-colors duration-200 hover:border-foreground/20 motion-reduce:transition-none",
        className,
      )}
    >
      {children}
    </div>
  );
}
