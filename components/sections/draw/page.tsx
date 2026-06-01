"use client";

import DrawCanvas from "@/components/sections/draw/DrawCanvas";
import { motion } from "motion/react";
import { fadeUp } from "@/components/motion/variants";

export default function DrawPage() {
  return (
    <div className="relative w-full py-16 flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 premium-grid opacity-30" aria-hidden="true" />
      <div
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-sky-400/35 to-transparent"
        aria-hidden="true"
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="relative z-10 max-w-4xl w-full flex flex-col items-center"
      >
        {/* Header Section */}
        <div className="text-center mb-10 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-glow mb-3 block">
            Interactive Playground
          </span>
          
          <h1 className="heading text-foreground mb-4">
            Draw Something <span className="gradient-text">For Me</span>
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg max-w-lg mx-auto text-balance">
            Leave your unique creative signature on my portfolio board. Pin your sketch to the visitor gallery!
          </p>
        </div>

        <div className="relative w-full overflow-hidden rounded-lg border border-border/80 p-4 shadow-2xl glass sm:p-8 md:p-10">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
          <DrawCanvas />
        </div>
      </motion.div>
    </div>
  );
}

