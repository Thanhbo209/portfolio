"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TECH_STACK } from "@/data/techStack";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const TechStack = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div
      className="flex-1 max-md:mb-6 flex flex-col gap-4 border p-6 rounded-xl backdrop-blur-3xl shadow-md"
      initial="hidden"
      whileInView="show"
    >
      <h3 className="text-sm uppercase tracking-wider text-primary/60">
        Tech Stack
      </h3>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-1">
        {TECH_STACK.map((tech) => {
          const iconSrc =
            tech.name === "Express.js"
              ? !mounted
                ? tech.icon // SSR + first render dùng icon cố định
                : resolvedTheme === "dark"
                ? "/tech/expressjs-light.svg"
                : "/tech/expressjs-dark.svg"
              : tech.icon;

          return (
            <motion.div
              key={tech.name}
              className="group flex flex-col items-center gap-4"
            >
              <Image src={iconSrc} alt={tech.name} width={46} height={46} />
              <span className="text-xs font-semibold">{tech.name}</span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default TechStack;
