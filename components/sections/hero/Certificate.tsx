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
      <h3 className="text-sm uppercase tracking-wider text-primary/60">
        Certificates
      </h3>

      <div className="flex flex-col gap-3">
        {CERTIFICATES.map((cert) => (
          <motion.div
            key={cert.title}
            variants={item}
            className="flex items-start gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition"
          >
            {cert.logo && (
              <div className="w-15 h-15 shrink-0 bg-white flex items-center justify-center rounded-md border">
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
                  className="w-fit h-7 px-2 text-xs text-muted-foreground hover:text-foreground mt-1 -ml-2"
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
