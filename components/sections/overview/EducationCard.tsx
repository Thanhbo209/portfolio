import Image from "next/image";
import { GraduationCapIcon } from "@phosphor-icons/react/dist/ssr";

import { Card } from "@/components/ui/Card";

export function EducationCard() {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <GraduationCapIcon className="size-4" weight="regular" />
        <span>Education</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-white p-1">
          <Image
            src="/school/huflit-logo.png"
            alt="HUFLIT logo"
            width={32}
            height={32}
            className="rounded-sm"
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">
            HCMC University of Foreign Languages - Information Technology
          </p>
          <p className="text-sm text-muted-foreground">
            Bachelor of Software Engineering
          </p>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Expected Graduation: 2027
      </p>
    </Card>
  );
}
