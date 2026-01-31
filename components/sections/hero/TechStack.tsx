"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TECH_STACK_SECTIONS } from "@/data/techStack";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

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
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      className="flex-1 flex flex-col gap-6 border p-6 rounded-xl backdrop-blur-3xl shadow-md"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <h3 className="text-sm uppercase tracking-wider text-primary/60">
        Tech Stack
      </h3>

      {TECH_STACK_SECTIONS.map((section) => (
        <div key={section.category} className="flex flex-col gap-3">
          {/* Section title */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase">
              {section.title}
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Tech grid */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {section.items.map((tech) => {
              const iconSrc =
                theme === "dark"
                  ? (tech.iconDark ?? tech.icon)
                  : (tech.iconLight ?? tech.icon);

              return (
                <motion.div
                  key={tech.name}
                  variants={item}
                  className="group flex flex-col items-center justify-center aspect-square gap-2 rounded-xl hover:bg-muted/40 transition"
                >
                  <Image
                    src={iconSrc}
                    alt={tech.name}
                    width={42}
                    height={42}
                    className="object-contain transition-transform group-hover:scale-110"
                  />

                  <span className="text-[14px] font-bold text-foreground text-center">
                    {tech.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default TechStack;
