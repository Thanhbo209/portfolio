"use client";

import Image from "next/image";
import { motion } from "motion/react";
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
import { TRANSITIONS } from "@/lib/motion/variants";

interface ProjectCardProps {
  project: Project;
}

// Card-wide hover broadcast: hovering anywhere on the card zooms the
// thumbnail and lifts the tech-badge row together, rather than each
// reacting to its own, narrower hover region.
const thumbnailVariants = { rest: { scale: 1 }, hover: { scale: 1.03 } };
const badgeRowVariants = { rest: { y: 0 }, hover: { y: -2 } };
// Per-link nudge, scoped to that link's own motion.a ancestor below, not the
// card-wide state above.
const linkIconVariants = { rest: { x: 0 }, hover: { x: 3 } };

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="h-full">
      <motion.div
        initial="rest"
        whileHover="hover"
        className="flex h-full flex-col gap-4"
      >
        <motion.div
          variants={thumbnailVariants}
          transition={TRANSITIONS.normal}
          className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-md bg-muted"
        >
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
        </motion.div>

        <div className="flex flex-1 flex-col gap-2">
          <p className="text-sm font-semibold text-foreground">
            {project.title}
          </p>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {project.description}
          </p>
        </div>

        <motion.div
          variants={badgeRowVariants}
          transition={TRANSITIONS.fast}
          className="flex flex-wrap gap-2"
        >
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
        </motion.div>

        <div className="flex items-center gap-4 text-sm font-medium text-foreground">
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial="rest"
            whileHover="hover"
            className="flex items-center gap-1.5 transition-colors duration-200 hover:text-muted-foreground motion-reduce:transition-none"
          >
            <motion.span variants={linkIconVariants} transition={TRANSITIONS.fast}>
              <GithubIcon className="size-4" />
            </motion.span>
            GitHub
          </motion.a>
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial="rest"
              whileHover="hover"
              className="flex items-center gap-1.5 transition-colors duration-200 hover:text-muted-foreground motion-reduce:transition-none"
            >
              <motion.span variants={linkIconVariants} transition={TRANSITIONS.fast}>
                <ArrowSquareOutIcon className="size-4" weight="regular" />
              </motion.span>
              Live Demo
            </motion.a>
          )}
          {project.caseStudyUrl && (
            <motion.a
              href={project.caseStudyUrl}
              initial="rest"
              whileHover="hover"
              className="flex items-center gap-1.5 transition-colors duration-200 hover:text-muted-foreground motion-reduce:transition-none"
            >
              <motion.span variants={linkIconVariants} transition={TRANSITIONS.fast}>
                <FileTextIcon className="size-4" weight="regular" />
              </motion.span>
              Case Study
            </motion.a>
          )}
        </div>
      </motion.div>
    </Card>
  );
}
