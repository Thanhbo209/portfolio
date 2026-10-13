import Image from "next/image";
import {
  ArrowSquareOutIcon,
  CodeIcon,
  FileTextIcon,
} from "@phosphor-icons/react/dist/ssr";

import { Badge } from "@/components/ui/Badge";
import { GithubIcon } from "@/components/ui/icons/GithubIcon";
import { TECH_ICON_MAP } from "@/constants/techIcons";
import type { Project } from "@/content/projects";

interface ProjectCardProps {
  project: Project;
}

function getProjectInitials(title: string): string {
  if (title.toLowerCase().includes("finai")) return "FAI";
  const words = title
    .replace(/[^\w\s]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(
      (w) =>
        w.length > 0 &&
        !["a", "an", "the", "and", "or", "of", "in", "for", "to"].includes(
          w.toLowerCase(),
        ),
    );
  if (words.length === 0) return "PRJ";
  if (words.length === 1) return words[0].slice(0, 3).toUpperCase();
  return words
    .slice(0, 3)
    .map((w) => w[0].toUpperCase())
    .join("");
}

export function ProjectCard({ project }: ProjectCardProps) {
  const visibleTechs = project.technologies.slice(0, 4);
  const remainingCount = project.technologies.length - visibleTechs.length;

  return (
    <div className="group relative flex h-full flex-col border border-border bg-card transition-colors duration-200 hover:border-foreground/30 motion-reduce:transition-none">
      {/* Banner: Full bleed flush against card top, left, right */}
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden border-b border-border bg-muted/20">
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={`${project.title} screenshot`}
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-200 group-hover:scale-[1.02] motion-reduce:transition-none"
          />
        ) : (
          // TODO(me): add real screenshot
          <div
            className="flex size-full items-center justify-center bg-gradient-to-br from-muted/50 via-card to-muted/80 select-none transition-transform duration-200 group-hover:scale-[1.02] motion-reduce:transition-none"
            aria-hidden
          >
            <div className="flex size-14 items-center justify-center border border-border/80 bg-background/80 shadow-xs backdrop-blur-xs">
              <span className="font-mono text-sm font-medium tracking-wider text-muted-foreground">
                {getProjectInitials(project.title)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Body: denser 16px padding */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3
          className="line-clamp-1 text-lg font-normal text-foreground"
          title={project.title}
        >
          {project.title}
        </h3>

        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        {/* Tech badges: max 4, then +N with full list in title/aria-label */}
        <div className="flex flex-wrap items-center gap-1.5">
          {visibleTechs.map((tech) => {
            const icon = TECH_ICON_MAP[tech];

            return (
              <Badge
                key={tech}
                variant="outline"
                className="flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium"
              >
                {icon ? (
                  <>
                    <Image
                      src={icon.logo}
                      alt=""
                      width={12}
                      height={12}
                      aria-hidden
                      className={icon.logoDark ? "dark:hidden" : undefined}
                    />
                    {icon.logoDark && (
                      <Image
                        src={icon.logoDark}
                        alt=""
                        width={12}
                        height={12}
                        aria-hidden
                        className="hidden dark:block"
                      />
                    )}
                  </>
                ) : (
                  <CodeIcon
                    className="size-3 shrink-0"
                    weight="regular"
                    aria-hidden
                  />
                )}
                <span>{tech}</span>
              </Badge>
            );
          })}

          {remainingCount > 0 && (
            <Badge
              variant="outline"
              title={project.technologies.join(", ")}
              aria-label={`All technologies: ${project.technologies.join(", ")}`}
              className="cursor-default px-2 py-0.5 text-xs font-medium"
            >
              +{remainingCount}
            </Badge>
          )}
        </div>

        {/* Links row pinned to bottom */}
        <div className="mt-auto flex items-center gap-4 pt-1 text-sm font-medium text-foreground">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none"
          >
            <GithubIcon className="size-4" />
            <span>GitHub</span>
          </a>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none"
            >
              <ArrowSquareOutIcon className="size-4" weight="regular" />
              <span>Live Demo</span>
            </a>
          )}

          {project.caseStudyUrl && (
            <a
              href={project.caseStudyUrl}
              className="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none"
            >
              <FileTextIcon className="size-4" weight="regular" />
              <span>Case Study</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
