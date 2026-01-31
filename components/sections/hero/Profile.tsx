"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { HERO_DESCRIPTION } from "@/data/heroData";
import LottieAnimation from "@/components/ui/lottie-animation";
import cowAnimation from "@/public/animation/cow-eating-grass.json";
import grass from "@/public/animation/grass.json";
import loveHands from "@/public/animation/love-hands.json";
import { motion } from "framer-motion";
import Certificate from "@/components/sections/hero/Certificate";

const NameAvatar = () => {
  const [isWaving, setIsWaving] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  // ⏱ Auto flip back sau 3s
  useEffect(() => {
    if (!isFlipped) return;
    const timer = setTimeout(() => setIsFlipped(false), 3000);
    return () => clearTimeout(timer);
  }, [isFlipped]);

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full rounded-xl">
      <div className="flex flex-col gap-4">
        {/* LEFT COLUMN */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* AVATAR FLIP */}
          <div
            className="relative w-24 h-24 md:w-28 md:h-28 perspective-[1000px] cursor-pointer"
            onClick={() => setIsFlipped(true)}
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
                  src="/avatar2.jpg"
                  alt="Thanh Pham"
                  fill
                  priority
                  className="rounded-full border-4 border-foreground/40 p-1 object-cover"
                />
              </div>

              {/* BACK */}
              <div
                className="absolute inset-0 flex items-center justify-center
                           rounded-full border-4 border-primary  bg-background"
                style={{
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden",
                }}
              >
                <div className="rounded-full">
                  <LottieAnimation
                    animationData={loveHands}
                    className="w-25 h-25 md:w-40 mt-13 md:h-40"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* INTRO */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <h3 className="text-xs uppercase tracking-wider text-primary/60">
              Profile
            </h3>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              Hello, I’m Thanh
              <span
                className={`text-3xl cursor-pointer ${
                  isWaving ? "animate-wave" : ""
                }`}
                onClick={() => {
                  setIsWaving(true);
                  setTimeout(() => setIsWaving(false), 1200);
                }}
              >
                👋
              </span>
            </h1>
            <p className="text-sm text-primary/70 leading-relaxed">
              · Student Aspiring{" "}
              <span className="text-sky-500 font-semibold">
                Practical Full-Stack{" "}
              </span>
              Developer
              <br />· Focused on real-world projects
            </p>
          </div>
        </div>

        {/* ABOUT */}
        <div className="relative bg-accent/25 p-8 rounded-xl">
          <h3 className="text-sm uppercase tracking-wider text-primary/60 mb-2">
            About me
          </h3>
          <p className="text-foreground/70 leading-relaxed">
            {HERO_DESCRIPTION.split("\n").map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>

          {/* DECOR */}
          <div className="absolute bottom-2 right-2 w-24 h-24 pointer-events-none">
            <LottieAnimation
              animationData={cowAnimation}
              className="absolute -bottom-8 -right-4 w-24"
            />
            <LottieAnimation
              animationData={grass}
              className="absolute -bottom-7 right-14 w-14"
            />
          </div>
        </div>
        {/* CERTIFICATE */}
        <div className="mt-6">
          <Certificate />
        </div>
      </div>
    </div>
  );
};

export default NameAvatar;
