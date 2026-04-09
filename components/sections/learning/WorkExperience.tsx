"use client";

import { motion } from "framer-motion";
import { EXPERIENCES } from "@/data/experienceData";
import { Brain, Briefcase, GraduationCap } from "lucide-react";

const EDUCATION = {
  school:
    "Ho Chi Minh City University of Foreign Languages – Information Technology (HUFLIT)",
  degree: "Bachelor of Software Engineering",
  period: "2023 – 2027",
  gpa: "3.4 / 4.0",
};

const COMPETENCIES = [
  {
    label: "CS Core",
    value: "Data Structures & Algorithms, OOP, Design Patterns.",
  },
  {
    label: "Architecture & API",
    value: "System Design, Microservices, RESTful API Design.",
  },
  {
    label: "Best Practices",
    value: "Refactoring, Problem Solving, Critical Thinking.",
  },
];

export default function WorkExperience() {
  return (
    <section className="w-full min-h-[90vh] flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl w-full"
      >
        <h2 className="heading text-center mb-12">
          About <span className="text-blue-300">Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-8 items-stretch">
          {/* LEFT COLUMN */}

          <div className="grid grid-rows-[auto_1fr] gap-6 h-full">
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="rounded-xl border border-border p-5"
            >
              <p className="flex gap-1 text-xl pb-10 font-medium uppercase tracking-widest text-muted-foreground">
                <GraduationCap
                  size={25}
                  className="inline-block mr-1 text-chart-3"
                />
                Education
              </p>
              <h3 className="text-[14px] font-semibold text-foreground leading-snug mb-1">
                {EDUCATION.school}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {EDUCATION.degree}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {EDUCATION.period}
                </span>
                <span className="text-sm px-2 bg-card py-0.5 rounded-full border border-border">
                  GPA {EDUCATION.gpa}
                </span>
              </div>
            </motion.div>

            {/* Core Competencies — chiếm phần còn lại */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="rounded-xl border border-border p-5"
            >
              <p className="flex gap-1 text-xl pb-10 font-medium uppercase tracking-widest text-muted-foreground">
                <Brain size={25} className="inline-block mr-1 text-chart-5" />
                Core Competencies
              </p>
              <div className="flex flex-col gap-3">
                {COMPETENCIES.map((c) => (
                  <div key={c.label}>
                    <p className="text-xs font-semibold text-foreground mb-1">
                      {c.label}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {c.value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN — Experience */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-xl border border-border p-5"
          >
            <p className="flex gap-1 text-xl font-medium uppercase tracking-widest text-muted-foreground mb-6">
              <Briefcase size={25} className="inline-block mr-1 text-chart-2" />
              Work Experience
            </p>

            <div className="relative pl-7">
              <div className="absolute left-1.5 top-1 bottom-1 w-px bg-border" />

              <div className="flex flex-col gap-8">
                {EXPERIENCES.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, duration: 0.4 }}
                    className="relative group"
                  >
                    {/* Dot */}
                    <div
                      className={`absolute -left-[25px] top-[5px] w-3 h-3 rounded-full border-2 transition-colors
                        ${
                          exp.current
                            ? "bg-foreground border-foreground"
                            : "bg-background border-border group-hover:border-foreground"
                        }`}
                    />

                    {/* Meta */}
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-muted-foreground">
                        {exp.period}
                      </span>
                      {exp.current && (
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400">
                          Current
                        </span>
                      )}
                    </div>

                    <h3 className="text-[15px] font-medium text-foreground mb-0.5">
                      {exp.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {exp.type}
                    </p>

                    <ul className="flex flex-col gap-1.5">
                      {exp.bullets.map((b, i) => (
                        <li
                          key={i}
                          className="text-sm text-muted-foreground pl-3.5 relative leading-relaxed"
                        >
                          <span className="absolute left-0 text-border">–</span>
                          {b}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] px-2 py-0.5 rounded-full border border-border text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
