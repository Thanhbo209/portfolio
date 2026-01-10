"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TECH_STACK } from "@/data/techStack";

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

const TechStack = () => (
  <motion.div
    className="flex-1 flex flex-col gap-4 bg-accent/50 p-6 rounded-xl backdrop-blur-sm"
    variants={container}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
  >
    <h3 className="text-sm uppercase tracking-wider text-primary/60">
      Tech Stack
    </h3>
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
      {TECH_STACK.map((tech) => (
        <motion.div
          key={tech.name}
          className="group flex flex-col items-center justify-center aspect-square gap-3 rounded-xl bg-background/60 p-4 hover:bg-background transition"
          variants={item}
        >
          <Image
            src={tech.icon}
            alt={tech.name}
            width={36}
            height={36}
            className="object-contain group-hover:scale-110 transition-transform"
          />
          <span className="text-xs text-primary/80 text-center">
            {tech.name}
          </span>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default TechStack;
