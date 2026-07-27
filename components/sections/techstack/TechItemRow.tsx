import Image from "next/image";

import { Badge } from "@/components/ui/Badge";
import type { ProficiencyLevel, TechItem } from "@/content/tech-stack";

const PROFICIENCY_STYLES: Record<ProficiencyLevel, string> = {
  Advanced: "bg-primary/10 text-primary border-primary/20",
  Proficient: "bg-secondary text-secondary-foreground",
  "Working Knowledge": "text-muted-foreground",
  Learning: "border-dashed text-muted-foreground",
};

interface TechItemRowProps {
  item: TechItem;
}

export function TechItemRow({ item }: TechItemRowProps) {
  const hasRelated =
    (item.relatedProjects && item.relatedProjects.length > 0) ||
    (item.relatedExperience && item.relatedExperience.length > 0);

  const content = (
    <>
      <div className="flex items-center gap-2.5">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-md p-1">
          {item.logoDark ? (
            <>
              <Image
                src={item.logo}
                alt={`${item.name} logo`}
                width={50}
                height={50}
                className="dark:hidden"
              />
              <Image
                src={item.logoDark}
                alt={`${item.name} logo`}
                width={50}
                height={50}
                className="hidden dark:block"
              />
            </>
          ) : (
            <Image
              src={item.logo}
              alt={`${item.name} logo`}
              width={50}
              height={50}
            />
          )}
        </div>
        <span className="text-sm text-foreground">{item.name}</span>
      </div>
      <Badge variant="outline" className={PROFICIENCY_STYLES[item.proficiency]}>
        {item.proficiency}
      </Badge>
    </>
  );

  if (!hasRelated) {
    return (
      <div className="flex items-center justify-between gap-3">{content}</div>
    );
  }

  return (
    <div className="group">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 text-left"
      >
        {content}
      </button>
      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-200 group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] motion-reduce:transition-none">
        <div className="overflow-hidden">
          <div className="flex flex-col gap-0.5 pt-1 pl-9.5 text-xs text-muted-foreground">
            {item.relatedProjects && item.relatedProjects.length > 0 && (
              <p>Projects: {item.relatedProjects.join(", ")}</p>
            )}
            {item.relatedExperience && item.relatedExperience.length > 0 && (
              <p>Experience: {item.relatedExperience.join(", ")}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
