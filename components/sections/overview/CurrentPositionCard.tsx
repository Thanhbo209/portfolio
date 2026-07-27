import Image from "next/image";
import { BriefcaseIcon, CalendarBlankIcon } from "@phosphor-icons/react/dist/ssr";

import { Card } from "@/components/ui/Card";

export function CurrentPositionCard() {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <BriefcaseIcon className="size-4" weight="regular" />
        <span>Current Position</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-black p-1.5">
          <Image
            src="/companies/flyrank-ai.jpg"
            alt="FlyRank AI logo"
            width={28}
            height={28}
            className="rounded-sm"
          />
        </div>
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
