"use client";

import { motion } from "framer-motion";

interface TextRevealProps {
  children: React.ReactNode;
  delay?: number;
}

export default function TextReveal({ children, delay = 0 }: TextRevealProps) {
  return (
    <div className="overflow-hidden inline-block align-bottom">
      <motion.div
        initial={{ y: "100%", rotate: 2 }}
        whileInView={{ y: 0, rotate: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}
