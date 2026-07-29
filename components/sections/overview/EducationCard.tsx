import { GraduationCapIcon } from "@phosphor-icons/react/dist/ssr";

import { Card } from "@/components/ui/Card";
import { LogoTile } from "@/components/ui/LogoTile";

export function EducationCard() {
  return (
    <Card className="flex h-full flex-col gap-4">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <GraduationCapIcon className="size-4" weight="regular" />
        <span>Education</span>
      </div>

      <div className="flex items-center gap-3">
        <LogoTile
          src="/school/huflit-logo.png"
          alt="HUFLIT logo"
          background="white"
        />
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
