import Image from "next/image";
import {
  BriefcaseIcon,
  MapPinIcon,
  TargetIcon,
} from "@phosphor-icons/react/dist/ssr";

import { Card } from "@/components/ui/Card";
import type { CurrentStatus } from "@/content/contact";

interface CurrentStatusCardProps {
  status: CurrentStatus;
}

export function CurrentStatusCard({ status }: CurrentStatusCardProps) {
  return (
    <Card className="flex h-full flex-col gap-4">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <BriefcaseIcon className="size-4" weight="regular" />
        <span>Current Status</span>
      </div>

      <div className="flex items-center gap-3">
        {status.companyLogo && (
          <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-black p-1.5">
            <Image
              src={status.companyLogo}
              alt={`${status.company} logo`}
              width={28}
              height={28}
              className="rounded-sm"
            />
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-foreground">
            {status.role}
          </p>
          <p className="text-sm text-muted-foreground">{status.company}</p>
        </div>
      </div>

      <p className="text-sm text-foreground">{status.employmentStatus}</p>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <TargetIcon className="size-4 shrink-0" weight="regular" />
        <span>{status.desiredOpportunities}</span>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <MapPinIcon className="size-4 shrink-0" weight="regular" />
        <span>{status.location}</span>
      </div>
    </Card>
  );
}
