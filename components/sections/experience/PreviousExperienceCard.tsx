import Image from "next/image";
import { BriefcaseIcon } from "@phosphor-icons/react/dist/ssr";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

interface PastRole {
  company: string;
  logo: string;
  position: string;
  duration: string;
  location: string;
  description: string;
  technologies: string[];
}

const pastRoles: PastRole[] = [
  {
    company: "Acacy Co., Ltd.",
    logo: "/companies/ACACY.png",
    position: "IT Labeling / Product Annotation Contributor",
    duration: "May - June 2026",
    location: "On-site",
    description:
      "Annotated and curated product images in CVAT for computer vision model training, applying consistency standards that reduced rework flagged during QA review.",
    technologies: ["CVAT"],
  },
];

export function PreviousExperienceCard() {
  return (
    <Card className="flex h-full flex-col gap-4">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <BriefcaseIcon className="size-4" weight="regular" />
        <span>Previous Experience</span>
      </div>

      <ul className="flex flex-col gap-6">
        {pastRoles.map((role) => (
          <li
            key={role.company}
            className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
          >
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-white p-1">
                <Image
                  src={role.logo}
                  alt={`${role.company} logo`}
                  width={32}
                  height={32}
                  className="rounded-sm"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {role.position}
                </p>
                <p className="text-sm text-muted-foreground">
                  {role.company} - {role.location}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {role.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {role.technologies.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <p className="shrink-0 text-xs text-muted-foreground">
              {role.duration}
            </p>
          </li>
        ))}
      </ul>
    </Card>
  );
}
