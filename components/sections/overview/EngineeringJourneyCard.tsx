import { Card } from "@/components/ui/Card";
import { JourneyTimer } from "@/components/ui/JourneyTimer";
import { ENGINEERING_JOURNEY_START_DATE } from "@/constants/profile";

const sinceLabel = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
}).format(new Date(ENGINEERING_JOURNEY_START_DATE));

export function EngineeringJourneyCard() {
  return (
    <Card className="flex flex-col items-center gap-4 text-center">
      <p className="text-sm font-medium text-muted-foreground">
        Engineering Journey
      </p>

      <JourneyTimer startDate={ENGINEERING_JOURNEY_START_DATE} />

      <p className="text-sm text-muted-foreground">Since {sinceLabel}</p>

      <p className="text-xs text-muted-foreground">
        Every second invested in learning.
      </p>
    </Card>
  );
}
