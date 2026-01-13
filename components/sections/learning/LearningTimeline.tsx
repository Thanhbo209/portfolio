"use client";

import { motion } from "framer-motion";
import { LEARNING_STEPS } from "@/data/learningData";

export default function LearningTimeline() {
  return (
    <section className="w-full min-h-[90vh] flex items-center justify-center p-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full"
      >
        <h2 className="heading text-center mb-15">
          What I&apos;m <span className="text-blue-300">Learning</span>
        </h2>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2" />

          {/* Timeline items */}
          <div className="space-y-12">
            {LEARNING_STEPS.map((step, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className={`relative flex items-center ${
                    isEven ? "justify-end" : "justify-start"
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`w-5/12 ${
                      isEven ? "text-right pr-8" : "text-left pl-8"
                    }`}
                  >
                    <span
                      className={`inline-block px-4 py-2 rounded-lg transition-all duration-300 ${
                        step.highlight
                          ? "bg-primary text-primary-foreground font-semibold shadow-lg scale-110"
                          : "bg-foreground/5 text-foreground/70 hover:bg-foreground/10"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-1/2 -translate-x-1/2">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.2, duration: 0.3 }}
                      className={`w-4 h-4 rounded-full border-4 ${
                        step.highlight
                          ? "bg-primary border-primary shadow-lg shadow-primary/50"
                          : "bg-background border-primary/40"
                      }`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
