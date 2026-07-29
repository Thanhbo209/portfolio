import Image from "next/image";
import {
  ArrowSquareOutIcon,
  CodeIcon,
  FileTextIcon,
  ImageSquareIcon,
} from "@phosphor-icons/react/dist/ssr";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { GithubIcon } from "@/components/ui/icons/GithubIcon";
import { TECH_ICON_MAP } from "@/constants/techIcons";
import type { Project } from "@/content/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex h-full flex-col gap-4 transition-[color,background-color,border-color,transform,box-shadow] duration-200 hover:scale-[1.015] hover:shadow-md motion-reduce:transition-none motion-reduce:hover:scale-100">
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-md bg-muted">
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={`${project.title} screenshot`}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <ImageSquareIcon
              className="size-8 text-muted-foreground"
              weight="regular"
            />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <p className="text-sm font-semibold text-foreground">
          {project.title}
        </p>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech) => {
          const icon = TECH_ICON_MAP[tech];

          return (
            <Badge
              key={tech}
              variant="outline"
              className="flex items-center gap-1.5"
            >
              {icon ? (
                <>
                  <Image
                    src={icon.logo}
                    alt=""
                    width={14}
                    height={14}
                    aria-hidden
                    className={icon.logoDark ? "dark:hidden" : undefined}
                  />
                  {icon.logoDark && (
                    <Image
                      src={icon.logoDark}
                      alt=""
                      width={14}
                      height={14}
                      aria-hidden
                      className="hidden dark:block"
                    />
                  )}
                </>
              ) : (
                <CodeIcon
                  className="size-3.5 shrink-0"
                  weight="regular"
                  aria-hidden
                />
              )}
              {tech}
            </Badge>
          );
        })}
      </div>

      <div className="flex items-center gap-4 text-sm font-medium text-foreground">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-1.5 transition-colors duration-200 hover:text-muted-foreground motion-reduce:transition-none"
        >
          <GithubIcon className="size-4 transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none" />
          GitHub
        </a>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 transition-colors duration-200 hover:text-muted-foreground motion-reduce:transition-none"
          >
            <ArrowSquareOutIcon
              className="size-4 transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
              weight="regular"
            />
            Live Demo
          </a>
        )}
        {project.caseStudyUrl && (
          <a
            href={project.caseStudyUrl}
            className="group flex items-center gap-1.5 transition-colors duration-200 hover:text-muted-foreground motion-reduce:transition-none"
          >
            <FileTextIcon
              className="size-4 transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
              weight="regular"
            />
            Case Study
          </a>
        )}
      </div>
    </Card>
  );
}
