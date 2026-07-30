import { Card } from "@/components/ui/Card";
import { MotionAnchor } from "@/components/ui/MotionAnchor";
import { MotionIcon } from "@/components/ui/MotionIcon";
import type { ExternalLink } from "@/types/navigation";

interface ContactMethodCardProps {
  method: ExternalLink;
}

const iconVariants = { rest: { y: 0 }, hover: { y: -4 } };

export function ContactMethodCard({ method }: ContactMethodCardProps) {
  const MethodIcon = method.icon;
  const isExternal = method.href.startsWith("http");

  return (
    <MotionAnchor
      href={method.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      initial="rest"
      whileHover="hover"
      className="block h-full"
    >
      <Card className="flex h-full flex-col gap-3 transition-colors duration-200 hover:border-primary/40">
        <MotionIcon variants={iconVariants} className="inline-flex">
          <MethodIcon className="size-8 text-foreground" />
        </MotionIcon>
        <p className="text-base font-semibold text-foreground">
          {method.label}
        </p>
        {method.description && (
          <p className="text-sm text-muted-foreground">
            {method.description}
          </p>
        )}
      </Card>
    </MotionAnchor>
  );
}
