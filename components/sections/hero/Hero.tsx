"use client";
import { motion } from "framer-motion";
import NameAvatar from "@/components/sections/hero/NameAvatar";
import SocialMedia from "@/components/sections/hero/SocialMedia";
import TechStack from "@/components/sections/hero/TechStack";
import { Spotlight } from "@/components/ui/spotlight";
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-x-hidden pt-20">
      {/* Spotlight background */}
      <div className="absolute inset-0">
        <Spotlight
          className="-top-60 -left-40 w-[120%] opacity-60"
          fill="#e68e0c"
        />
        <Spotlight
          className="top-20 left-[60%] w-[80%] rotate-12 opacity-40"
          fill="red"
        />
        <Spotlight
          className="top-[30%] -left-50 w-[70%] rotate-6 opacity-30"
          fill="#3b82f6"
        />
        <Spotlight
          className="bottom-[-30%] right-[-20%] w-[90%] rotate-[-8deg] opacity-25"
          fill="#ec4899"
        />
      </div>

      {/* Hero content */}
      <div className="relative z-10 min-h-[calc(100vh-6rem)] flex items-center justify-center ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl w-full h-full">
          {/* LEFT COLUMN */}
          <motion.div
            className="h-full flex flex-col justify-between bg-accent/30 backdrop-blur-3xl p-6 rounded-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <NameAvatar />
          </motion.div>

          {/* RIGHT COLUMN */}
          <div className="h-full flex flex-col gap-6 justify-between">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0, transition: { duration: 0.6 } }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <TechStack />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: { duration: 0.6, delay: 0.2 },
              }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <SocialMedia />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
