import Image from "next/image";
import {
  BriefcaseIcon,
  CalendarBlankIcon,
  CheckCircleIcon,
  MapPinIcon,
} from "@phosphor-icons/react/dist/ssr";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

const responsibilities: string[] = [
  "Build backend services and REST APIs with TypeScript, Node.js, and PostgreSQL to support AI-powered applications.",
  "Develop production-ready features - authentication, authorization, async background jobs, and containerized workflows with Docker.",
  "Integrate AI APIs and implement document ingestion pipelines for AI-driven workflows.",
  "Design workflow orchestration interfaces with React Flow while collaborating through Git-based development, debugging, testing, and code review.",
  "Apply AI engineering and AI-assisted development practices on a production-oriented capstone project.",
];

const technologies: string[] = [
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Docker",
  "React Flow",
  "Git",
];

export function FeaturedExperienceCard() {
  return (
    <Card className="flex h-full flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-md bg-black p-2">
            <Image
              src="/companies/flyrank-ai.jpg"
              alt="FlyRank AI logo"
              width={32}
              height={32}
              className="rounded-sm"
            />
          </div>
          <div>
            <p className="text-base font-semibold text-foreground">
              Backend AI Engineering Intern
            </p>
            <p className="text-sm text-muted-foreground">FlyRank AI</p>
          </div>
        </div>
        <Badge>Current</Badge>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <CalendarBlankIcon className="size-4" weight="regular" />
          <span>Jun 2026 - Present</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPinIcon className="size-4" weight="regular" />
          <span>Remote</span>
        </div>
        <div className="flex items-center gap-1.5">
          <BriefcaseIcon className="size-4" weight="regular" />
          <span>Internship</span>
        </div>
      </div>

      <ul className="flex flex-col gap-2">
        {responsibilities.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-sm text-muted-foreground"
          >
            <CheckCircleIcon
              className="mt-0.5 size-4 shrink-0 text-primary"
              weight="regular"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <Badge key={tech} variant="outline">
            {tech}
          </Badge>
        ))}
      </div>
    </Card>
  );
}
