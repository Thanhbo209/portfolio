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
    <Card className="@container p-5 md:p-6">
      <div className="font-sans flex flex-col items-center gap-4 text-center @[48rem]:flex-row @[48rem]:items-center @[48rem]:justify-between @[48rem]:text-left">
        {/* Left: Title & Since */}
        <div className="flex shrink-0 flex-col gap-1 @[48rem]:w-52">
          <p className="text-sm font-medium text-foreground">
            Engineering Journey
          </p>
          <p className="text-xs text-muted-foreground">Since {sinceLabel}</p>
        </div>

        {/* Center: Timer */}
        <div className="flex flex-1 items-center justify-center py-1">
          <JourneyTimer startDate={ENGINEERING_JOURNEY_START_DATE} />
        </div>

        {/* Right: Caption */}
        <div className="shrink-0 @[48rem]:w-52 @[48rem]:text-right">
          <p className="text-xs text-muted-foreground">
            Every second invested in learning.
          </p>
        </div>
      </div>
    </Card>
  );
}
