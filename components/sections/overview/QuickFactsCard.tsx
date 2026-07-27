import type { Icon } from "@phosphor-icons/react";
import {
  BrainIcon,
  InfoIcon,
  MapPinIcon,
  SealCheckIcon,
  StackIcon,
} from "@phosphor-icons/react/dist/ssr";

import { Card } from "@/components/ui/Card";

interface Fact {
  label: string;
  icon: Icon;
}

const facts: Fact[] = [
  { label: "Ho Chi Minh City, Vietnam", icon: MapPinIcon },
  { label: "TOEIC Listening & Reading - Score: 870", icon: SealCheckIcon },
  { label: "AI Engineering", icon: BrainIcon },
  { label: "Full-Stack Engineering", icon: StackIcon },
];

export function QuickFactsCard() {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <InfoIcon className="size-4" weight="regular" />
        <span>Quick Facts</span>
      </div>

      <ul className="flex flex-col gap-3">
        {facts.map(({ label, icon: FactIcon }) => (
          <li
            key={label}
            className="flex items-center gap-2 text-sm text-foreground"
          >
            <FactIcon
              className="size-4 shrink-0 text-muted-foreground"
              weight="regular"
            />
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
