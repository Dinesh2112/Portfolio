"use client";

import { motion } from "framer-motion";

export default function InfiniteMarquee({ text }: { text: string }) {
  return (
    <div className="relative flex overflow-hidden whitespace-nowrap bg-[#050505] py-8 border-y border-white/5">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30, // Extremely slow and smooth
        }}
      >
        <h1 className="text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter text-transparent" 
            style={{ 
              WebkitTextStroke: "2px rgba(255,255,255,0.8)", 
              textShadow: "0 0 40px rgba(255,255,255,0.1)" 
            }}>
          {text} &nbsp; {text} &nbsp; {text} &nbsp; {text} &nbsp;
        </h1>
      </motion.div>
    </div>
  );
}
