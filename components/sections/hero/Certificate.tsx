"use client";

import { motion } from "framer-motion";
import Image from "next/image";
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};
import { CERTIFICATES } from "@/data/certificates";
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
      className="flex flex-col gap-4  \ rounded-xl backdrop-blur-3xl shadow-md"
    >
      <h3 className="text-sm uppercase tracking-wider text-primary/60">
        Certificates
      </h3>

      <div className="flex flex-col gap-3">
        {CERTIFICATES.map((cert) => (
          <motion.div
            key={cert.title}
            variants={item}
            className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition"
          >
            {cert.logo && (
              <div className="w-15 h-15 bg-foreground flex items-center justify-center rounded-md border">
                <Image
                  src={cert.logo}
                  alt={cert.title}
                  width={70}
                  height={70}
                  className="object-contain"
                />
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <p className="font-semibold text-sm">{cert.title}</p>
              <p className="text-xs text-muted-foreground">
                {cert.issuer} · {cert.year}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Certificate;
