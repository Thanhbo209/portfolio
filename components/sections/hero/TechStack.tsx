"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TECH_STACK_SECTIONS } from "@/data/techStack";
import { useTheme } from "next-themes";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

const TechStack = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  return (
    <motion.div
      className="flex flex-col gap-6 rounded-lg border border-border/70 bg-background/60 p-5 shadow-lg shadow-black/5 backdrop-blur-xl dark:shadow-black/20 sm:p-6"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-glow">
            Tech I work with
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Recruiter-friendly snapshot of the tools used across my real
            projects.
          </p>
        </div>
        <span className="w-fit rounded-full border border-border/70 bg-accent/40 px-3 py-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {TECH_STACK_SECTIONS.length} groups
        </span>
      </div>

      {TECH_STACK_SECTIONS.map((section) => (
        <motion.div
          key={section.category}
          variants={item}
          className="rounded-lg border border-border/60 bg-card/55 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-glow/35 hover:shadow-lg hover:shadow-glow/10"
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-foreground/80">
              {section.title}
            </span>
            <div className="h-px flex-1 bg-linear-to-r from-border to-transparent" />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5">
            {section.items.map((tech) => {
              const iconSrc =
                isDark
                  ? (tech.iconDark ?? tech.icon)
                  : (tech.iconLight ?? tech.icon);

              return (
                <motion.div
                  key={tech.name}
                  variants={item}
                  whileHover={{ y: -4, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="group flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border border-transparent bg-background/35 p-2 text-center transition-all duration-300 hover:border-glow/30 hover:bg-accent/45 hover:shadow-md hover:shadow-glow/10"
                >
                  <Image
                    src={iconSrc}
                    alt={tech.name}
                    width={42}
                    height={42}
                    className="rounded-md object-contain p-1 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110"
                  />

                  <span className="text-[12px] font-bold leading-tight text-foreground sm:text-[13px]">
                    {tech.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TechStack;
