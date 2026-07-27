import type { Icon } from "@phosphor-icons/react";
import {
  BriefcaseIcon,
  CodeIcon,
  GraduationCapIcon,
  TargetIcon,
} from "@phosphor-icons/react/dist/ssr";

interface Milestone {
  label: string;
  date: string;
  icon: Icon;
}

const milestones: Milestone[] = [
  {
    label: "Started Software Engineering at HUFLIT",
    date: "Nov 2024",
    icon: GraduationCapIcon,
  },
  {
    label: "Built AI and full-stack projects",
    date: "2026",
    icon: CodeIcon,
  },
  {
    label: "Joined FlyRank AI as an AI Backend Engineering Intern",
    date: "Jun 2026",
    icon: BriefcaseIcon,
  },
  {
    label: "Current goal: becoming a professional AI Engineer",
    date: "Present",
    icon: TargetIcon,
  },
];

export function JourneyTimeline() {
  return (
    <div>
      <h3 className="text-lg font-semibold text-foreground">My Journey</h3>
      <ol className="mt-4 flex flex-col gap-6">
        {milestones.map((milestone, index) => (
          <li key={milestone.label} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-card">
                <milestone.icon
                  className="size-4 text-muted-foreground"
                  weight="regular"
                />
              </span>
              {index < milestones.length - 1 && (
                <span className="mt-1 w-px flex-1 bg-border" aria-hidden />
              )}
            </div>
            <div className="pb-2">
              <p className="text-xs text-muted-foreground">{milestone.date}</p>
              <p className="text-sm font-medium text-foreground">
                {milestone.label}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
