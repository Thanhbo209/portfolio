"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Download, Globe, Send } from "lucide-react";
import NameAvatar from "@/components/sections/hero/Profile";
import TechStack from "@/components/sections/hero/TechStack";
import { Spotlight } from "@/components/ui/spotlight";
import { Button } from "@/components/ui/button";
import { CERTIFICATES } from "@/data/certificates";
import { HERO_SOCIALS } from "@/data/heroData";
import { projects } from "@/data/project";
import { TECH_STACK_SECTIONS } from "@/data/techStack";
import {
  heroContainer,
  heroWord,
  staggerItem,
} from "@/components/motion/variants";

const roles = [
  "Backend Developer",
  "Full-stack Builder",
  "AI Product Explorer",
];

function RoleSwitcher() {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % roles.length);
    }, 2400);
    return () => window.clearInterval(timer);
  }, [shouldReduceMotion]);

  return (
    <span className="relative inline-flex min-w-[14ch] align-baseline">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="gradient-text"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function SocialProofPanel() {
  return (
    <motion.div
      variants={staggerItem}
      className="flex w-full flex-1 flex-col justify-between gap-4 rounded-lg border border-border/60 bg-background/50 p-5 shadow-sm backdrop-blur transition-all duration-300 hover:border-glow/35 hover:bg-background/70 hover:shadow-lg hover:shadow-glow/10 lg:min-h-[10rem]"
    >
      <div>
        <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/60">
          <Globe className="size-4 text-cyan-500" />
          Social proof
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Code, profile, and direct email in one scan.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {HERO_SOCIALS.map((social) => {
          const Icon = social.icon;
          return (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              whileHover={{ y: -3, scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              className={`group flex h-11 items-center justify-center rounded-lg text-white shadow-md transition-all duration-300 hover:text-white hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 ${
                social.bgColor || "bg-background/20"
              }`}
            >
              <Icon className="size-5 transition-transform group-hover:-translate-y-0.5" />
            </motion.a>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button asChild variant="outline" className="h-11 w-full">
          <a href="/cv/VietThanh_Resume.pdf" download>
            <Download className="size-4" />
            Resume
          </a>
        </Button>
        <Button asChild variant="glow" className="h-11 w-full">
          <a href="#contact">
            <Send className="size-4" />
            Contact
          </a>
        </Button>
      </div>
    </motion.div>
  );
}

const Hero = () => {
  return (
    <div className="relative w-full overflow-hidden px-4 pb-16 pt-28 md:pt-32">
      <div
        className="absolute inset-0 premium-grid opacity-60"
        aria-hidden="true"
      />
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <Spotlight
          className="-left-48 -top-64 w-[120%] opacity-40"
          fill="#00d9ff"
        />
        <Spotlight
          className="left-[58%] top-0 w-[70%] rotate-12 opacity-35"
          fill="#38bdf8"
        />
        <Spotlight
          className="-bottom-96 right-[-30%] w-[75%] rotate-[-8deg] opacity-25"
          fill="#2563eb"
        />
      </div>

      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-7xl flex-col justify-center gap-8"
      >
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <motion.div
            variants={heroContainer}
            className="flex h-full flex-col items-start gap-6 self-stretch"
          >
            <motion.div
              variants={staggerItem}
              className="flex flex-wrap items-center gap-2"
            >
              <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-500">
                Open to work
              </span>
              <span className="rounded-full border border-sky-400/25 bg-sky-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-500">
                Currently learning AI systems
              </span>
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                variants={heroWord}
                className="text-balance text-5xl font-black leading-[0.95] tracking-normal text-foreground sm:text-6xl md:text-7xl"
              >
                Pham Thanh
              </motion.h1>
              <motion.p
                variants={heroWord}
                className="max-w-3xl text-balance text-2xl font-bold leading-tight text-foreground sm:text-3xl"
              >
                Software engineering student targeting <RoleSwitcher />
              </motion.p>
            </div>

            <motion.div
              variants={staggerItem}
              className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
            >
              <Button variant="primary" size="lg" asChild>
                <a href="#projects">
                  View Projects
                  <ArrowRight className="size-4 group-hover/button:translate-x-1" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#contact">Contact Me</a>
              </Button>
            </motion.div>

            <motion.div
              variants={heroContainer}
              className="grid w-full grid-cols-3 gap-3"
              aria-label="Portfolio proof points"
            >
              {[
                { value: projects.length, label: "Real projects" },
                { value: CERTIFICATES.length, label: "Certificates" },
                { value: TECH_STACK_SECTIONS.length, label: "Tech groups" },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  variants={staggerItem}
                  className="rounded-lg border border-border/60 bg-background/55 p-4 text-center shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-glow/35 hover:shadow-lg hover:shadow-glow/10"
                >
                  <span className="block text-2xl font-black text-foreground sm:text-3xl">
                    {item.value}
                  </span>
                  <span className="mt-1 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <SocialProofPanel />
          </motion.div>

          <motion.div
            variants={heroWord}
            className="mx-auto w-full max-w-xl lg:max-w-none h-full"
          >
            <NameAvatar />
          </motion.div>
        </div>

        <div className="w-full">
          <TechStack />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
