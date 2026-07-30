"use client";

import Image from "next/image";
import { motion } from "motion/react";

import type { TechItem } from "@/content/tech-stack";
import { TRANSITIONS } from "@/lib/motion/variants";

interface TechItemRowProps {
  item: TechItem;
}

const logoVariants = { rest: { scale: 1 }, hover: { scale: 1.05 } };

export function TechItemRow({ item }: TechItemRowProps) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      className="group flex items-center gap-2 rounded-md p-1.5 transition-colors duration-200 hover:bg-accent motion-reduce:transition-none"
    >
      <motion.div
        variants={logoVariants}
        transition={TRANSITIONS.fast}
        className="flex size-8 shrink-0 items-center justify-center rounded-md p-1"
      >
        {item.logoDark ? (
          <>
            <Image
              src={item.logo}
              alt={`${item.name} logo`}
              width={40}
              height={40}
              className="dark:hidden"
            />
            <Image
              src={item.logoDark}
              alt={`${item.name} logo`}
              width={40}
              height={40}
              className="hidden dark:block"
            />
          </>
        ) : (
          <Image
            src={item.logo}
            alt={`${item.name} logo`}
            width={40}
            height={40}
          />
        )}
      </motion.div>
      <span className="truncate text-sm text-foreground">{item.name}</span>
    </motion.div>
  );
}
