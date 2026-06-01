"use client";

import { motion } from "motion/react";
import { EXPERIENCES } from "@/data/experienceData";
import { EDUCATION } from "@/data/education";
import { COMPETENCIES } from "@/data/competencies";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedCard } from "@/components/ui/animated-card";
import { Badge } from "@/components/ui/badge";
import { fadeUp, staggerContainer, staggerItem } from "@/components/motion/variants";
import { viewportOnce } from "@/components/motion/transitions";

export default function WorkExperience() {
  return (
    <section className="w-full min-h-[90vh] flex items-center justify-center px-4 sm:px-6 py-20 relative overflow-hidden">
      <div className="absolute inset-0 premium-grid opacity-25" aria-hidden="true" />
      <div
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-500/35 to-transparent"
        aria-hidden="true"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="max-w-6xl w-full relative z-10"
      >
        <SectionHeading
          label="Journey"
          title="Education &"
          highlight="Experience"
          description="My academic path and hands-on learning experiences in software development"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.5fr] gap-8 items-stretch">
          {/* LEFT COLUMN - Education & Competencies */}
          <div className="flex flex-col gap-6 h-full">
            {/* Education Card */}
            <AnimatedCard
              variant="glass"
              className="p-6 sm:p-8 flex flex-col justify-between"
              variants={staggerItem}
            >
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-glow mb-4 block">
                  Education
                </span>

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-5 mt-2">
                  <div className="relative flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-lg border border-border/50 bg-white p-2 shadow-md transition-transform duration-300 group-hover/card:-translate-y-1 dark:bg-white/90 sm:h-20 sm:w-20">
                    <Image
                      src={EDUCATION.image}
                      alt={EDUCATION.school}
                      width={80}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                  <div className="text-center sm:text-left flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-foreground leading-snug mb-1">
                      {EDUCATION.school}
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium">
                      {EDUCATION.degree}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-auto">
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  Period
                </span>
                <Badge variant="glow" className="font-semibold px-3 py-1">
                  {EDUCATION.period}
                </Badge>
              </div>
            </AnimatedCard>

            {/* Core Competencies Card */}
            <AnimatedCard
              variant="glass"
              className="p-6 sm:p-8 flex-1 flex flex-col"
              variants={staggerItem}
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-glow mb-6 block">
                Core Competencies
              </span>
              <div className="flex flex-col gap-5 flex-1 justify-center">
                {COMPETENCIES.map((c) => (
                  <div key={c.label} className="group/item">
                    <p className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-glow group-hover/item:scale-125 transition-transform" />
                      {c.label}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pl-3.5">
                      {c.value.map((v) => (
                        <Badge
                          key={v}
                          variant="outline"
                          className="bg-accent/20 text-xs font-medium text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-glow/30 hover:bg-accent/40 hover:text-foreground"
                        >
                          {v}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedCard>
          </div>

          {/* RIGHT COLUMN - Experience */}
          <AnimatedCard
            variant="glass"
            className="p-6 sm:p-8 md:p-10 flex flex-col justify-between"
            variants={staggerItem}
          >
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-glow mb-8 block">
                Academic Experience
              </span>

              <div className="relative pl-8 sm:pl-10">
                {/* Vertical Line */}
                <div className="absolute left-3 sm:left-4 top-1.5 bottom-1.5 w-[2px] bg-gradient-to-b from-blue-500 via-cyan-500 to-transparent opacity-30" />

                <div className="flex flex-col gap-10">
                  {EXPERIENCES.map((exp, index) => (
                    <motion.div
                      key={index}
                      variants={fadeUp}
                      whileHover={{ x: 4 }}
                      className="relative group/exp"
                    >
                      {/* Timeline Dot with premium glow animations */}
                      <div
                        className={`absolute -left-[29px] sm:-left-[33px] top-1 w-4 h-4 rounded-full border-2 transition-all duration-500 z-10 flex items-center justify-center
                          ${
                            exp.current
                              ? "bg-background border-blue-500 animate-pulse-glow"
                              : "bg-background border-border/80 group-hover/exp:border-blue-400 group-hover/exp:scale-110 shadow-sm"
                          }`}
                      >
                        {exp.current && (
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                        )}
                      </div>

                      {/* Experience Metadata */}
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-xs font-bold tracking-wider text-muted-foreground">
                          {exp.period}
                        </span>
                        {exp.current && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold border border-emerald-500/20">
                            Current
                          </span>
                        )}
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug mb-0.5 group-hover/exp:text-blue-400 transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-4">
                        {exp.type}
                      </p>

                      <ul className="flex flex-col gap-2 mb-4">
                        {exp.bullets.map((b, i) => (
                          <li
                            key={i}
                            className="text-sm text-foreground/80 pl-4 relative leading-relaxed cursor-default hover:text-foreground transition-colors"
                          >
                            <span className="absolute left-0 text-cyan-400 font-bold select-none">•</span>
                            {b}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-border/40">
                        {exp.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="glow"
                            className="text-[10px] font-semibold transition-transform hover:-translate-y-0.5 sm:text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </motion.div>
    </section>
  );
}
