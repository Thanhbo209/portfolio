"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { HERO_DESCRIPTION } from "@/data/heroData";
import LottieAnimation from "@/components/ui/lottie-animation";
import loveHands from "@/public/animation/love-hands.json";
import { motion } from "motion/react";
import Certificate from "@/components/sections/hero/Certificate";
import { BadgeCheck, BriefcaseBusiness } from "lucide-react";

const NameAvatar = () => {
  const [isWaving, setIsWaving] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const descriptionLines = HERO_DESCRIPTION.split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  useEffect(() => {
    if (!isFlipped) return;
    const timer = setTimeout(() => setIsFlipped(false), 3000);
    return () => clearTimeout(timer);
  }, [isFlipped]);

  return (
    <motion.article
      className="relative overflow-hidden rounded-lg border border-border/70 bg-background/65 p-5 shadow-2xl shadow-black/5 backdrop-blur-xl dark:shadow-black/30 h-full flex flex-col justify-between gap-6"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-500/35 to-transparent"
        aria-hidden="true"
      />

      <div className="flex flex-col gap-6 flex-1">
        {/* Header Block (Avatar & Introduction) */}
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start shrink-0">
          <motion.button
            type="button"
            className="relative size-28 shrink-0 cursor-pointer rounded-full outline-none perspective-[1000px] transition-transform hover:-translate-y-1 active:translate-y-0 active:scale-95 focus-visible:ring-2 focus-visible:ring-ring/70 md:size-32"
            onClick={() => setIsFlipped(true)}
            aria-label="Play profile animation"
            whileHover={{ rotate: 1 }}
            whileTap={{ scale: 0.96 }}
          >
            <motion.div
              className="relative w-full h-full"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* FRONT */}
              <div
                className="absolute inset-0"
                style={{ backfaceVisibility: "hidden" }}
              >
                <Image
                  src="/avatar.jpg"
                  alt="Thanh Pham"
                  fill
                  priority
                  className="rounded-full border-3 border-foreground/20 p-0.5 object-cover shadow-xl"
                />
              </div>

              <div
                className="absolute inset-0 flex items-center justify-center rounded-full border-4 border-primary/70 bg-background"
                style={{
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden",
                }}
              >
                <LottieAnimation
                  animationData={loveHands}
                  className="mt-10 size-32 md:size-40"
                />
              </div>
            </motion.div>
          </motion.button>

          <div className="flex min-w-0 flex-1 flex-col items-center gap-3 text-center sm:items-start sm:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-accent/35 px-3 py-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <BriefcaseBusiness className="size-3.5 text-cyan-500" />
              Software Engineering Student
            </div>
            <div>
              <h2 className="flex items-center justify-center gap-2 text-2xl font-black text-foreground md:text-3xl sm:justify-start">
                Hello, I&apos;m Thanh
                <motion.button
                  type="button"
                  aria-label="Wave hello"
                  className={`inline-flex text-3xl outline-none transition-transform hover:-translate-y-0.5 active:scale-95 focus-visible:ring-2 focus-visible:ring-ring/70 ${
                    isWaving ? "animate-wave" : ""
                  }`}
                  onClick={() => {
                    setIsWaving(true);
                    setTimeout(() => setIsWaving(false), 1200);
                  }}
                  whileTap={{ scale: 0.92 }}
                >
                  👋
                </motion.button>
              </h2>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-muted-foreground">
                <span className="text-cyan-500">Backend</span> Developer with full-stack product practice
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
              {["React", "Node.js", "TypeScript", "MongoDB"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border/70 bg-background/60 px-2.5 py-1 text-xs font-semibold text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-glow/35 hover:text-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* About Me Section - Stretches vertically to fill all available space */}
        <div className="border-t border-border/70 pt-5 flex-1 flex flex-col justify-start">
          <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/60 shrink-0">
            <BadgeCheck className="size-4 text-cyan-500" />
            About me
          </h3>
          <div className="text-sm leading-7 text-foreground/75 sm:text-base flex-1 flex flex-col justify-center">
            <p className="w-full">
              {descriptionLines.map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < descriptionLines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>

        {/* Certificates Carousel */}
        <div className="border-t border-border/70 pt-5 shrink-0">
          <Certificate />
        </div>
      </div>
    </motion.article>
  );
};

export default NameAvatar;
