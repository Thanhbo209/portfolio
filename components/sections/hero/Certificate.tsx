"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CERTIFICATES } from "@/data/certificates";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const Certificate = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="flex flex-col gap-4 rounded-xl backdrop-blur-3xl shadow-md"
    >
      <h3 className="text-xs font-bold uppercase tracking-widest text-primary/60">
        Certificates
      </h3>

      <div className="flex flex-col gap-3">
        {CERTIFICATES.map((cert) => (
          <motion.div
            key={cert.id}
            variants={item}
            whileHover={{ x: 4 }}
            className="group flex items-start gap-4 rounded-lg border border-border/55 bg-muted/25 p-3 transition-all duration-300 hover:border-glow/30 hover:bg-muted/45 hover:shadow-md hover:shadow-glow/10"
          >
            {cert.logo && (
              <div className="flex size-15 shrink-0 items-center justify-center rounded-md border bg-white shadow-sm transition-transform group-hover:scale-105">
                <Image
                  src={cert.logo}
                  alt={cert.title}
                  width={70}
                  height={70}
                  className="object-contain"
                />
              </div>
            )}

            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold text-sm leading-snug">
                  {cert.title}
                </p>
                <span className="text-xs text-muted-foreground shrink-0 mt-0.5">
                  {cert.year}
                </span>
              </div>

              <p className="text-xs text-muted-foreground">{cert.issuer}</p>

              {cert.link && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="-ml-2 mt-1 h-7 w-fit px-2 text-xs text-muted-foreground hover:text-foreground"
                  asChild
                >
                  <a href={cert.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Details
                  </a>
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Certificate;
