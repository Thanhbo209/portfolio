"use client";

import { PinContainer } from "@/components/ui/3d-pin";
import { projects } from "@/data/project";
import { ArrowUpRightFromSquareIcon, Github, Sparkles } from "lucide-react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import { motion } from "motion/react";
import { staggerContainer, staggerItem } from "@/components/motion/variants";
import { viewportOnce } from "@/components/motion/transitions";

const Projects = () => {
  return (
    <section className="relative overflow-hidden px-4 py-16">
      <div className="absolute inset-0 premium-grid opacity-35" aria-hidden="true" />
      <div
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-sky-400/40 to-transparent"
        aria-hidden="true"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="max-w-7xl mx-auto"
      >
        <SectionHeading
          label="Portfolio"
          title="Featured"
          highlight="Projects"
          description="Real repositories that show AI-assisted workflows, backend systems, analytics, and full-stack product thinking."
        />

        <motion.div
          className="grid grid-cols-1 place-items-center gap-x-14 gap-y-16 lg:grid-cols-2"
          variants={staggerItem}
        >
          {projects.map(({ id, title, timeline, des, img, iconLists, link }, index) => (
            <div
              key={id}
              className="flex h-[31rem] w-[88vw] items-center justify-center sm:h-[35rem] sm:w-[30rem]"
            >
              <PinContainer title="Open repository" href={link}>
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-500">
                    {index === 0 ? (
                      <>
                        <Sparkles className="size-3" />
                        Featured
                      </>
                    ) : (
                      "Project"
                    )}
                  </span>
                  <span className="rounded-full border border-border/70 bg-background/70 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    {timeline}
                  </span>
                </div>

                <div className="relative mb-6 flex h-[18rem] w-[75vw] items-center justify-center overflow-hidden rounded-lg border border-border/50 bg-accent/20 sm:w-[28rem]">
                  <Image
                    src={img}
                    alt={title}
                    fill
                    className="z-10 rounded-lg object-cover object-top p-1 transition-transform duration-500 group-hover/pin:scale-105"
                    sizes="(max-width: 640px) 75vw, 448px"
                  />
                  <div className="absolute inset-0 z-15 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
                </div>

                <div className="flex flex-col mb-3">
                  <div className="mb-2 flex items-start justify-between gap-4">
                    <h3 className="line-clamp-2 text-base font-black leading-snug text-foreground transition-colors group-hover/pin:text-glow md:text-lg lg:text-xl">
                      {title}
                    </h3>
                  </div>

                  <p className="line-clamp-3 text-xs font-normal leading-relaxed text-muted-foreground lg:text-sm">
                    {des}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-3">
                  <div className="flex items-center">
                    {iconLists.map((icon, index) => (
                      <div
                        className="flex size-8 items-center justify-center rounded-full border border-border/60 bg-background/90 shadow-md backdrop-blur-xs transition-transform duration-300 hover:-translate-y-1"
                        key={icon}
                        style={{ transform: `translateX(-${5 * index * 1.5}px)` }}
                      >
                        <Image
                          src={icon}
                          alt={icon}
                          className="p-1.5 object-contain"
                          height={28}
                          width={28}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="group/btn flex items-center justify-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1.5 transition-all group-hover/pin:border-glow/30 group-hover/pin:bg-accent/45">
                    <Github className="size-4 text-glow" />
                    <span className="text-sm font-bold text-glow transition-all group-hover/btn:brightness-110">
                      Repository
                    </span>
                    <ArrowUpRightFromSquareIcon
                      className="size-4 text-glow transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    />
                  </div>
                </div>
              </PinContainer>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Projects;

