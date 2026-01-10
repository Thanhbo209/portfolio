"use client";

import { useState } from "react";
import Image from "next/image";

const NameAvatar = () => {
  const [isWaving, setIsWaving] = useState(false);

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 w-full mb-5">
      {/* Avatar */}
      <div className="shrink-0 relative">
        <Image
          src="/avatar2.jpg"
          alt="Thanh Pham"
          width={112} // md:28*4px
          height={112}
          className="rounded-full border-3 border-white/20 w-24 p-1 h-24 md:w-28 md:h-28 object-cover"
          priority
        />
      </div>

      {/* Text content */}
      <div className="flex flex-col justify-center items-center md:items-start gap-2">
        {/* Short Intro */}
        <h3 className="text-xs md:text-sm uppercase tracking-wider text-primary/60">
          profile
        </h3>

        {/* Name + Wave */}
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

        {/* Subtitle */}
        <p className="text-sm md:text-base text-primary/70 tracking-wide">
          IT Student · Web & Software Developer
        </p>
      </div>
    </div>
  );
};

export default NameAvatar;
