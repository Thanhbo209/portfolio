import type { Icon } from "@phosphor-icons/react";
import {
  BrainIcon,
  DatabaseIcon,
  LayoutIcon,
  WrenchIcon,
} from "@phosphor-icons/react/dist/ssr";

import { Card } from "@/components/ui/Card";

interface FocusArea {
  label: string;
  description: string;
  icon: Icon;
}

const focusAreas: FocusArea[] = [
  {
    label: "Backend & APIs",
    description: "Node.js, Express, FastAPI, PostgreSQL, REST APIs",
    icon: DatabaseIcon,
  },
  {
    label: "AI Integration",
    description: "AI API integration, document ingestion, CV annotation",
    icon: BrainIcon,
  },
  {
    label: "DevOps & Tooling",
    description: "Docker, Git, CI/CD",
    icon: WrenchIcon,
  },
  {
    label: "Full-Stack Interfaces",
    description: "React, React Flow, Next.js",
    icon: LayoutIcon,
  },
];

export function TechnicalFocusCard() {
  return (
    <Card className="flex flex-col gap-4">
      <p className="text-sm font-medium text-muted-foreground">
        Technical Focus
      </p>

      <ul className="flex flex-col gap-3">
        {focusAreas.map(({ label, description, icon: AreaIcon }) => (
          <li key={label} className="flex items-start gap-2">
            <AreaIcon
              className="mt-0.5 size-4 shrink-0 text-primary"
              weight="regular"
            />
            <div>
              <p className="text-sm font-medium text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
