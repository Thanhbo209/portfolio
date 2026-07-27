import type { Icon } from "@phosphor-icons/react";
import {
  BrainIcon,
  DatabaseIcon,
  LayoutIcon,
} from "@phosphor-icons/react/dist/ssr";

import { Card } from "@/components/ui/Card";

interface BuildArea {
  title: string;
  description: string;
  icon: Icon;
}

const buildAreas: BuildArea[] = [
  {
    title: "AI Engineering",
    description:
      "Systems that put AI to work on real problems - integrating models into pipelines, processing documents, and turning raw data into useful signal.",
    icon: BrainIcon,
  },
  {
    title: "Backend Systems",
    description:
      "Reliable APIs, thoughtful data models, and services built to hold up under real use, not just to demo well.",
    icon: DatabaseIcon,
  },
  {
    title: "Full-Stack Applications",
    description:
      "Complete products, end to end - from the database up through an interface people actually enjoy using.",
    icon: LayoutIcon,
  },
];

export function WhatIBuildCards() {
  return (
    <div>
      <h3 className="text-lg font-semibold text-foreground">What I Build</h3>
      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {buildAreas.map(({ title, description, icon: AreaIcon }) => (
          <Card key={title} className="flex flex-col gap-3">
            <AreaIcon className="size-6 text-primary" weight="regular" />
            <p className="text-sm font-semibold text-foreground">{title}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
