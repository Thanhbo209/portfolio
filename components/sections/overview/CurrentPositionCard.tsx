import { BriefcaseIcon, CalendarBlankIcon } from "@phosphor-icons/react/dist/ssr";

import { Card } from "@/components/ui/Card";
import { LogoTile } from "@/components/ui/LogoTile";

export function CurrentPositionCard() {
  return (
    <Card className="flex h-full flex-col gap-4">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <BriefcaseIcon className="size-4" weight="regular" />
        <span>Current Position</span>
      </div>

      <div className="flex items-center gap-3">
        <LogoTile
          src="/companies/flyrank-ai.jpg"
          alt="FlyRank AI logo"
          background="black"
          imageSize={28}
          padding="p-1.5"
        />
        <div>
          <p className="text-sm font-semibold text-foreground">FlyRank AI</p>
          <p className="text-sm text-muted-foreground">
            AI Backend Engineering Intern
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <CalendarBlankIcon className="size-4" weight="regular" />
        <span>Jun 2026 - Present</span>
      </div>

      {/* Placeholder copy — replace with an accurate description of the role. */}
      <p className="text-sm text-muted-foreground">
        Building and maintaining backend services and AI-powered features for
        FlyRank&apos;s platform.
      </p>
    </Card>
  );
}
