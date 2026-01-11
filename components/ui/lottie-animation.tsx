"use client";

import React from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";

interface LottieAnimationProps {
  animationData: object;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  animationData,
  className = "",
  loop = true,
  autoplay = true,
}) => {
  return (
    <motion.div
      className={className}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1, rotate: [0, 2, -2, 0] }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <Lottie animationData={animationData} loop={loop} autoplay={autoplay} />
    </motion.div>
  );
};

export default LottieAnimation;
