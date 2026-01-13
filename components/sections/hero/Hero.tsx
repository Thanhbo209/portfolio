"use client";
import { motion } from "framer-motion";
import NameAvatar from "@/components/sections/hero/Profile";
import SocialMedia from "@/components/sections/hero/SocialMedia";
import TechStack from "@/components/sections/hero/TechStack";
import { Spotlight } from "@/components/ui/spotlight";
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Hero = () => {
  return (
    <section className="relative  w-full pt-30" id="home">
      {/* Spotlight background */}
      <div className="absolute inset-0 overflow-hidden">
        <Spotlight
          className="-top-60 -left-40 w-[120%] opacity-60"
          fill="purple"
        />
        <Spotlight
          className="top-20 left-[60%] w-[80%] rotate-12 opacity-40"
          fill="red"
        />
        <Spotlight
          className="top-[30%] -left-50 w-[70%] rotate-6 opacity-30"
          fill="blue"
        />
        <Spotlight
          className="bottom-[-30%] right-[-20%] w-[90%] rotate-[-8deg] opacity-25"
          fill="pink"
        />
      </div>

      {/* Hero content */}
      <div className="relative z-10 min-h-[calc(100vh-6rem)] flex items-center justify-center max-xl:w-[90vw] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl w-full">
          {/* LEFT COLUMN */}
          <motion.div
            className="flex flex-col justify-between border backdrop-blur-3xl p-6 rounded-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <NameAvatar />
          </motion.div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col min-h-0">
            <motion.div
              className="flex-1 min-h-0"
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
