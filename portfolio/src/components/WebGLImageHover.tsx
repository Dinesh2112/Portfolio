"use client";

import { motion } from "framer-motion";

export default function WebGLImageHover({ imagePath, className = "" }: { imagePath: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden group/img ${className}`}>
      {/* High-Performance Smooth Zoom Image */}
      <motion.img
        src={imagePath}
        alt="Project Screenshot"
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full object-cover object-center transition-transform duration-700 block"
      />
      
      {/* Studio Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none opacity-70 group-hover/img:opacity-30 transition-opacity duration-500" />
    </div>
  );
}
