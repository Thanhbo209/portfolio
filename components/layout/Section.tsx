import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  withSeparator?: boolean;
}

export function Section({
  id,
  children,
  className,
  containerClassName,
  withSeparator = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative", className)}
    >
      <div className={cn("relative", containerClassName)}>
        {children}
      </div>
      {withSeparator && (
        <div className="mx-auto max-w-md h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      )}
    </section>
  );
}
