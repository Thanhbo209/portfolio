import { cn } from "@/lib/utils";

interface FloatingOrbProps {
  className?: string;
  color?: "purple" | "blue" | "cyan" | "pink";
  size?: "sm" | "md" | "lg";
  delay?: string;
}

const colorMap = {
  purple: "bg-purple-500/20 dark:bg-purple-500/10",
  blue: "bg-blue-500/20 dark:bg-blue-500/10",
  cyan: "bg-cyan-500/20 dark:bg-cyan-500/10",
  pink: "bg-pink-500/20 dark:bg-pink-500/10",
};

const sizeMap = {
  sm: "w-32 h-32",
  md: "w-64 h-64",
  lg: "w-96 h-96",
};

export function FloatingOrb({
  className,
  color = "purple",
  size = "md",
  delay,
}: FloatingOrbProps) {
  return (
    <div
      className={cn(
        "absolute rounded-full blur-3xl animate-float pointer-events-none",
        colorMap[color],
        sizeMap[size],
        className
      )}
      style={delay ? { animationDelay: delay } : undefined}
      aria-hidden="true"
    />
  );
}
