"use client";

import React, { useState } from "react";
import Image from "next/image";
import { HERO_DESCRIPTION } from "@/data/heroData";
import LottieAnimation from "@/components/ui/lottie-animation";
import cowAnimation from "@/public/animation/cow-eating-grass.json";
import grass from "@/public/animation/grass.json";
const NameAvatar = () => {
  const [isWaving, setIsWaving] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full">
      <div className="flex flex-col gap-4">
        {/* LEFT COLUMN: Avatar + Intro */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 flex-1">
          {/* Avatar */}
          <div className="shrink-0 relative">
            <Image
              src="/avatar2.jpg"
              alt="Thanh Pham"
              width={112}
              height={112}
              className="rounded-full border-2 border-foreground/40 w-24 h-24 md:w-28 md:h-28 object-cover"
              priority
            />
          </div>

          {/* Intro Text */}
          <div className="flex flex-col justify-center items-center md:items-start gap-2">
            <h3 className="text-xs md:text-sm uppercase tracking-wider text-primary/60">
              Profile
            </h3>
            <h1 className="text-2xl md:text-3xl font-bold text-primary flex items-center gap-2">
              Hello, I’m Thanh
              <span
                className={`inline-block text-3xl md:text-4xl cursor-pointer select-none ${
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
            <p className="text-sm md:text-base text-primary/70 tracking-wide">
              IT Student · Practical Fullstack Developer
            </p>
          </div>
        </div>
        {/* RIGHT COLUMN: About Me */}
        <div className="flex-1 flex flex-col justify-start items-start bg-accent/10 p-6 rounded-xl">
          <h3 className="text-sm uppercase tracking-wider text-primary/60 mb-2">
            About me
          </h3>
          <p className="text-md md:text-md font-thin text-foreground leading-relaxed">
            {HERO_DESCRIPTION.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
          {/* Cow image */}
          <div className="absolute bottom-2 right-2 w-24 h-24 md:w-32 md:h-32 pointer-events-none">
            <LottieAnimation
              animationData={cowAnimation}
              className="absolute -bottom-10 -right-4 w-24 z-40 h-24 md:w-32 md:h-32 pointer-events-none"
            />
            <LottieAnimation
              animationData={grass}
              className="absolute -bottom-2 right-17 w-14 h-14 md:w-20 md:h-20 pointer-events-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameAvatar;
