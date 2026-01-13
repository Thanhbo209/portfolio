"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TECH_STACK } from "@/data/techStack";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const TechStack = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // ⬅️ QUAN TRỌNG

  return (
    <motion.div
      className="flex-1 max-md:mb-6 flex flex-col gap-4 border p-6 rounded-xl backdrop-blur-3xl shadow-md"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <h3 className="text-sm uppercase tracking-wider text-primary/60">
        Tech Stack
      </h3>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-1">
        {TECH_STACK.map((tech) => {
          const iconSrc =
            tech.name === "Express.js"
              ? theme === "dark"
                ? "/tech/expressjs-light.svg"
                : "/tech/expressjs-dark.svg"
              : tech.icon;

          return (
            <motion.div
              key={tech.name}
              className="group flex flex-col items-center justify-center aspect-square gap-3 rounded-xl transition"
              variants={item}
            >
              <Image
                src={iconSrc}
                alt={tech.name}
                width={46}
                height={46}
                className={`object-contain transition-transform group-hover:scale-110 ${
                  tech.name === "Next" ? "bg-black rounded-full p-0.5" : ""
                }`}
              />

              <span className="text-xs font-semibold text-foreground text-center">
                {tech.name}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default TechStack;
