import Image from "next/image";
import { BriefcaseIcon, GraduationCapIcon } from "@phosphor-icons/react/dist/ssr";

import { Badge } from "@/components/ui/Badge";
import type { ExperienceEntry } from "@/content/experience";
import { formatDateRange } from "@/lib/date";

interface ExperienceItemProps {
  entry: ExperienceEntry;
  isLast?: boolean;
}

export function ExperienceItem({ entry, isLast = false }: ExperienceItemProps) {
  const dateRange = formatDateRange(entry.start, entry.end, entry.expected);

  return (
    <li className="relative flex flex-col">
      {/* Vertical timeline rule aligned to logo center (48px / 2 = 24px -> left-[23.5px]) */}
      {!isLast && (
        <span
          aria-hidden
          className="absolute left-[23.5px] top-[56px] -bottom-10 w-px bg-border/60"
        />
      )}

      {/* Header row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          {/* Logo tile: full bleed, no padding, enlarged to 48x48 */}
          <div className="relative flex size-12 shrink-0 items-center justify-center rounded-md border border-border bg-card overflow-hidden p-0">
            {entry.logo ? (
              <Image
                src={entry.logo}
                alt=""
                width={48}
                height={48}
                className="size-full object-contain"
              />
            ) : entry.kind === "education" ? (
              <GraduationCapIcon className="size-6 text-muted-foreground" weight="regular" />
            ) : (
              <BriefcaseIcon className="size-6 text-muted-foreground" weight="regular" />
            )}
          </div>

          <div className="flex flex-col">
            <h3 className="font-[family-name:var(--font-role-title,var(--font-heading))] text-xl font-normal tracking-tight text-foreground transition-colors duration-200 hover:text-foreground/80">
              {entry.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {entry.organization}
              {entry.employmentType ? ` · ${entry.employmentType}` : ""}
            </p>
            {/* Mobile date: stacks under meta line */}
            <time
              dateTime={entry.start}
              className="mt-1 block text-sm tabular-nums text-muted-foreground md:hidden"
            >
              {dateRange}
            </time>
          </div>
        </div>

        {/* Desktop date: right-aligned */}
        <time
          dateTime={entry.start}
          className="hidden shrink-0 text-sm tabular-nums whitespace-nowrap text-muted-foreground md:block"
        >
          {dateRange}
        </time>
      </div>

      {/* Body: indented under the vertical rule (48px logo + 16px gap = 64px -> pl-16) */}
      <div className="mt-4 pl-16">
        {entry.summary && (
          <p className="text-sm leading-relaxed text-muted-foreground md:max-w-[52ch]">
            {entry.summary}
          </p>
        )}

        {entry.bullets && entry.bullets.length > 0 && (
          <ul className="mt-3 flex flex-col gap-1.5 text-sm leading-relaxed text-muted-foreground md:max-w-[52ch]">
            {entry.bullets.map((bullet, idx) => (
              <li
                key={idx}
                className="relative pl-4 before:absolute before:left-0 before:top-[0.6em] before:size-[5px] before:rounded-[1px] before:bg-muted-foreground/60 before:content-['']"
              >
                {bullet}
              </li>
            ))}
          </ul>
        )}

        {entry.technologies && entry.technologies.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {entry.technologies.map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}
