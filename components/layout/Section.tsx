import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  heading: string;
  headingLevel?: "h1" | "h2";
  align?: "center" | "start";
  children?: React.ReactNode;
  className?: string;
}

export function Section({
  id,
  heading,
  headingLevel = "h2",
  align = "center",
  children,
  className,
}: SectionProps) {
  const Heading = headingLevel;

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn(
        "flex min-h-dvh flex-col scroll-mt-20 px-6 py-16 lg:px-12",
        align === "center" ? "justify-center" : "justify-start",
        className,
      )}
    >
      <Reveal>
        <Heading
          id={`${id}-heading`}
          className={cn(
            "font-semibold tracking-tight text-foreground",
            headingLevel === "h1" ? "text-4xl" : "text-3xl",
          )}
        >
          {heading}
        </Heading>
      </Reveal>
      <div className="mt-4">{children}</div>
    </section>
  );
}
