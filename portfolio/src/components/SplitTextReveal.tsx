"use client";

import { motion } from "framer-motion";

interface SplitTextRevealProps {
  text: string;
  delay?: number;
  className?: string;
}

export default function SplitTextReveal({ text, delay = 0, className = "" }: SplitTextRevealProps) {
  // Split text by lines (e.g., if it has <br/> or we can just split by words)
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100
      },
    },
    hidden: {
      y: "150%",
      opacity: 0,
    },
  };

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap", gap: "0.25em" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className={className}
    >
      {words.map((word, index) => (
        <span style={{ overflow: "hidden", display: "inline-block" }} key={index}>
          <motion.span style={{ display: "inline-block" }} variants={child}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}
