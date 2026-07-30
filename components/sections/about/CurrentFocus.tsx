import type { Icon } from "@phosphor-icons/react";
import {
  CubeIcon,
  RobotIcon,
  RocketIcon,
  ShareNetworkIcon,
  StackIcon,
} from "@phosphor-icons/react/dist/ssr";

import { Card } from "@/components/ui/Card";

interface FocusArea {
  label: string;
  icon: Icon;
}

const focusAreas: FocusArea[] = [
  { label: "AI Agents", icon: RobotIcon },
  { label: "Distributed Systems", icon: ShareNetworkIcon },
  { label: "Docker & Kubernetes", icon: CubeIcon },
  { label: "Backend Architecture", icon: StackIcon },
  { label: "Production AI Systems", icon: RocketIcon },
];

export function CurrentFocus() {
  return (
    <Card className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-foreground">
        Currently Exploring
      </h3>
      <ul className="flex flex-col gap-3">
        {focusAreas.map(({ label, icon: AreaIcon }) => (
          <li
            key={label}
            className="flex items-center gap-2.5 text-sm text-foreground"
          >
            <AreaIcon
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
