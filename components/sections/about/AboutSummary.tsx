"use client";

import { motion } from "motion/react";

import { AnimatedBorderDot } from "@/components/ui/AnimatedBorderDot";
import { Badge } from "@/components/ui/Badge";
import { TRANSITIONS } from "@/lib/motion/variants";

const technologies: string[] = [
  "TypeScript",
  "Python",
  "Node.js",
  "FastAPI",
  "Next.js",
  "PostgreSQL",
  "Docker",
  "OpenAI",
  "LangGraph",
];

const chipHover = { y: -2, transition: TRANSITIONS.fast };

export function AboutSummary() {
  return (
    <div className="relative rounded-lg border border-border bg-card p-5">
      <AnimatedBorderDot />

      <p className="text-sm leading-7 text-muted-foreground">
        Backend & AI Engineer passionate about building production-ready
        APIs, AI-powered applications, and scalable backend systems.
        Currently focused on{" "}
        <strong className="text-foreground">LLM applications</strong>,{" "}
        <strong className="text-foreground">distributed systems</strong>, and{" "}
        <strong className="text-foreground">software architecture</strong>.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <motion.div key={tech} whileHover={chipHover}>
            <Badge
              variant="outline"
              className="transition-colors duration-200 hover:border-foreground/40 hover:text-foreground"
            >
              {tech}
            </Badge>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
