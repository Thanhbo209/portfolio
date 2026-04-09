"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Briefcase, Copy, Check, Phone } from "lucide-react";
import { CONTACT_INFO } from "@/data/contactInfo";

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
      className="w-full min-h-screen flex items-center justify-center p-6"
      id="contact"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold  mb-4"
          >
            Let&apos;s <span className="text-blue-300">Work</span> Together
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className=" text-lg"
          >
            I&apos;m currently seeking internship opportunities
          </motion.p>
        </div>

        {/* Main Contact Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className=" backdrop-blur-sm border rounded-2xl p-8 md:p-12 shadow-xl"
        >
          {/* Availability Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex items-start gap-4 p-4 rounded-lg shadow-md bg-accent/30  transition-colors"
            >
              <div className="p-2 rounded-full border">
                <Briefcase className="w-5 h-5 text-blue-300" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Available For</h3>
                <p className="text-slate-500">
                  Internship (3–6 months) / Fresher
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex items-start gap-4 p-4 rounded-lg shadow-md bg-accent/30 transition-colors"
            >
              <div className="p-2 rounded-full border">
                <MapPin className="w-5 h-5 text-blue-300" />
              </div>
              <div>
                <h3 className="font-semibold  mb-1">Work Location</h3>
                <p className="text-slate-500">Flexible</p>
              </div>
            </motion.div>
          </div>

          {/* Email Address with Copy Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.65 }}
            className="mb-6"
          >
            <div className="flex items-center justify-between p-4 rounded-lg border-2">
              <div className="flex items-center gap-3 ">
                <Mail className="w-5 h-5 text-blue-300" />
                <span className=" font-medium">
                  {CONTACT_INFO.emailAddress}
                </span>
              </div>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-4 py-2 rounded-md 0 transition-all"
                aria-label="Copy email address"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 " />
                    <span className="text-sm  font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 cursor-pointer" />
                    <span className="text-sm  font-medium cursor-pointer">
                      Copy
                    </span>
                  </>
                )}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.65 }}
            className="mb-6"
          >
            <div className="flex items-center justify-between p-4 rounded-lg border-2">
              <div className="flex items-center gap-3 ">
                <Phone className="w-5 h-5 text-blue-300" />
                <span className=" font-medium">{CONTACT_INFO.phoneNumber}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.65 }}
            className="mb-6"
          >
            <div className="flex items-center justify-between p-4 rounded-lg border-2">
              <div className="flex items-center gap-3 ">
                <MapPin className="w-5 h-5 text-blue-300" />
                <span className=" font-medium">{CONTACT_INFO.location}</span>
              </div>
            </div>
          </motion.div>

          {/* Contact Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="mb-8"
          >
            <a
              href={`mailto:${CONTACT_INFO.emailAddress}`}
              className="group  flex items-center justify-center gap-3 w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:scale-101"
            >
              <Mail className="w-5 h-5" />
              Get In Touch
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          </motion.div>
          {/* Footer Note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
            className="text-center text-sm mt-8"
          >
            Usually respond within 24 hours
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
