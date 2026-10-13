import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  heading?: string;
  headingLevel?: "h1" | "h2";
  align?: "center" | "start";
  children?: React.ReactNode;
  className?: string;
  "aria-label"?: string;
}

export function Section({
  id,
  heading,
  headingLevel = "h2",
  align = "center",
  children,
  className,
  "aria-label": ariaLabel,
}: SectionProps) {
  const Heading = headingLevel;

  return (
    <section
      id={id}
      {...(heading
        ? { "aria-labelledby": `${id}-heading` }
        : { "aria-label": ariaLabel ?? id })}
      className={cn(
        "flex flex-col scroll-mt-20 py-16",
        align === "center" ? "justify-center" : "justify-start",
        className,
      )}
    >
      {heading && (
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
      )}
      <div className={heading ? "mt-4" : undefined}>{children}</div>
    </section>
  );
}
