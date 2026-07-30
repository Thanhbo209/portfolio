"use client";

import { motion } from "motion/react";

import { Card } from "@/components/ui/Card";
import { staggerContainer, staggerItem } from "@/lib/motion/variants";

interface Stat {
  value: string;
  label: string;
}

// Every number here is real, sourced from existing site content rather than
// invented: project count from content/projects.ts, internships from the
// Experience section (FlyRank AI + Acacy Co. Ltd), years learning from
// JourneyTimeline's Aug 2024 start date, TOEIC from content/certifications.ts.
const stats: Stat[] = [
  { value: "10+", label: "Projects" },
  { value: "2", label: "Internships" },
  { value: "2+", label: "Years Learning" },
  { value: "870", label: "TOEIC" },
];

export function QuickStats() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer}
      className="grid grid-cols-2 gap-4 sm:grid-cols-4"
    >
      {stats.map((stat) => (
        <motion.div key={stat.label} variants={staggerItem}>
          <Card className="flex bg-background flex-col items-center gap-1 text-center">
            <p className="text-2xl font-semibold text-foreground">
              {stat.value}
            </p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
