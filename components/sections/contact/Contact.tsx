"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, MapPin, Briefcase, Copy, Check, Phone } from "lucide-react";
import { CONTACT_INFO } from "@/data/contactInfo";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedCard } from "@/components/ui/animated-card";
import { Button } from "@/components/ui/button";
import { fadeUp, staggerContainer, staggerItem } from "@/components/motion/variants";
import { viewportOnce } from "@/components/motion/transitions";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_INFO.emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <section
      className="w-full min-h-screen flex items-center justify-center p-4 sm:p-6 relative overflow-hidden"
    >
      <div className="absolute inset-0 premium-grid opacity-25" aria-hidden="true" />
      <div
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-400/35 to-transparent"
        aria-hidden="true"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="max-w-4xl w-full relative z-10"
      >
        <SectionHeading
          label="Get In Touch"
          title="Let's Work"
          highlight="Together"
          description="I'm currently seeking internship opportunities and would love to connect for projects or roles!"
        />

        {/* Main Contact Card */}
        <AnimatedCard
          variant="glass"
          hover={false}
          className="p-6 sm:p-10 md:p-12 shadow-2xl relative overflow-hidden"
          variants={fadeUp}
        >
          {/* Subtle accent border at top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400 opacity-60" />

          {/* Availability Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-10">
            <motion.div
              variants={staggerItem}
              className="flex items-start gap-4 p-4 rounded-xl shadow-xs bg-accent/15 border border-border/40 hover:bg-accent/25 transition-all group"
            >
              <div className="p-2.5 rounded-lg border border-border bg-background/50 text-glow transition-transform group-hover:scale-110">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-foreground/70 uppercase tracking-wider mb-1">
                  Available For
                </h3>
                <p className="text-foreground font-semibold text-base">
                  Internship (3–6 months) / Fresher
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="flex items-start gap-4 p-4 rounded-xl shadow-xs bg-accent/15 border border-border/40 hover:bg-accent/25 transition-all group"
            >
              <div className="p-2.5 rounded-lg border border-border bg-background/50 text-glow transition-transform group-hover:scale-110">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-foreground/70 uppercase tracking-wider mb-1">
                  Work Location
                </h3>
                <p className="text-foreground font-semibold text-base">
                  Flexible / Remote / On-site
                </p>
              </div>
            </motion.div>
          </div>

          {/* Contact Details List */}
          <div className="flex flex-col gap-4 mb-8">
            {/* Email Address with Copy Button */}
            <motion.div
              variants={staggerItem}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-4 rounded-xl border border-border/60 bg-accent/5 hover:border-glow/30 transition-all gap-4 group/row"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/10 group-hover/row:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="font-bold text-foreground/90 text-sm sm:text-base break-all">
                  {CONTACT_INFO.emailAddress}
                </span>
              </div>
              
              <Button
                onClick={copyToClipboard}
                variant="outline"
                size="sm"
                className="flex-shrink-0 text-xs"
                aria-label="Copy email address"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div
                      key="copied"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="flex items-center gap-1.5 text-emerald-400"
                    >
                      <Check className="w-4 h-4" />
                      <span>Copied!</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="flex items-center gap-1.5 text-foreground/70"
                    >
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>

            {/* Phone */}
            <motion.div
              variants={staggerItem}
              className="flex items-center p-4 rounded-xl border border-border/60 bg-accent/5 hover:border-glow/30 transition-all gap-3 group/row"
            >
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/10 group-hover/row:scale-105 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <span className="font-bold text-foreground/90 text-sm sm:text-base">
                {CONTACT_INFO.phoneNumber}
              </span>
            </motion.div>

            {/* Location */}
            <motion.div
              variants={staggerItem}
              className="flex items-center p-4 rounded-xl border border-border/60 bg-accent/5 hover:border-glow/30 transition-all gap-3 group/row"
            >
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/10 group-hover/row:scale-105 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="font-bold text-foreground/90 text-sm sm:text-base">
                {CONTACT_INFO.location}
              </span>
            </motion.div>
          </div>

          {/* Direct CTA Mailto Button */}
          <motion.div variants={staggerItem}>
            <Button variant="glow" size="lg" className="w-full" asChild>
              <a href={`mailto:${CONTACT_INFO.emailAddress}`}>
                <Mail className="size-5" />
                Get In Touch
              </a>
            </Button>
          </motion.div>

          {/* Footer Note */}
          <motion.p
            variants={staggerItem}
            className="text-center text-xs text-muted-foreground font-semibold uppercase tracking-widest mt-8"
          >
            Usually respond within 24 hours
          </motion.p>
        </AnimatedCard>
      </motion.div>
    </section>
  );
}
