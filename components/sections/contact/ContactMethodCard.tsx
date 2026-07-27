import { Card } from "@/components/ui/Card";
import type { ExternalLink } from "@/types/navigation";

interface ContactMethodCardProps {
  method: ExternalLink;
}

export function ContactMethodCard({ method }: ContactMethodCardProps) {
  const MethodIcon = method.icon;
  const isExternal = method.href.startsWith("http");

  return (
    <a
      href={method.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="block h-full transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:scale-100"
    >
      <Card className="flex h-full flex-col gap-3 transition-colors duration-200 hover:border-primary/40">
        <MethodIcon className="size-8 text-foreground" />
        <p className="text-base font-semibold text-foreground">
          {method.label}
        </p>
        {method.description && (
          <p className="text-sm text-muted-foreground">
            {method.description}
          </p>
        )}
      </Card>
    </a>
  );
}
