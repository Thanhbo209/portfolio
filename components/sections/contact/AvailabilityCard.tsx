import { SparkleIcon } from "@phosphor-icons/react/dist/ssr";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

interface AvailabilityCardProps {
  areas: string[];
}

export function AvailabilityCard({ areas }: AvailabilityCardProps) {
  return (
    <Card className="flex h-full flex-col gap-4">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <SparkleIcon className="size-4" weight="regular" />
        <span>Availability</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {areas.map((area) => (
          <Badge key={area} variant="outline">
            {area}
          </Badge>
        ))}
      </div>
    </Card>
  );
}
