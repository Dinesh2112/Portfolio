"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Tab {
  id: string;
  label: string;
}

interface SmoothTabProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
  activeColor?: string;
}

const GLOW_SPRING = { stiffness: 180, damping: 22 };

export default function SmoothTab({ tabs, activeTab, onChange, className = "", activeColor = "#2563EB" }: SmoothTabProps) {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const normX = useMotionValue(0.5);
  const normY = useMotionValue(0.5);
  const glowOpacity = useSpring(0, GLOW_SPRING);

  const bgX = useTransform(normX, [0, 1], ["0%", "100%"]);
  const bgY = useTransform(normY, [0, 1], ["0%", "100%"]);
  const glowBackground = useTransform([bgX, bgY], ([x, y]) => `radial-gradient(circle at ${x} ${y}, ${activeColor}55, transparent 50%)`);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    normX.set((e.clientX - rect.left) / rect.width);
    normY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseEnter = () => {
    glowOpacity.set(1);
  };

  const handleMouseLeave = () => {
    normX.set(0.5);
    normY.set(0.5);
    glowOpacity.set(0);
  };

  return (
    <div className={`relative flex items-center justify-center max-w-[95vw] mx-auto min-w-0 ${className}`}>
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative flex items-center p-1.5 rounded-full bg-[#050505] border border-white/10 shadow-2xl justify-start sm:justify-center w-full min-w-0 cursor-pointer transition-[border-color] duration-300 hover:border-white/20"
      >
        {/* Spotlight Hover Glow Layer */}
        <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none z-0">
          <motion.div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              opacity: glowOpacity,
              background: glowBackground,
            }}
          />
        </div>

        <div className="relative z-10 flex items-center gap-1 sm:gap-2 w-full min-w-0 overflow-x-auto no-scrollbar px-2 sm:px-4">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                className="relative px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold tracking-wide uppercase transition-colors z-10 focus:outline-none cursor-pointer rounded-full shrink-0"
                style={{ color: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.5)" }}
              >
                {isActive && (
                  <motion.div
                    layoutId="smooth-tab-pill-active"
                    className="absolute inset-0 rounded-full -z-10"
                    style={{ backgroundColor: activeColor }}
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10 text-white drop-shadow-md mix-blend-plus-lighter whitespace-nowrap">{tab.label}</span>
              </button>
            );
          })}
          {/* Invisible spacer to guarantee the last tab can be scrolled fully into view without edge clipping */}
          <div className="w-2 shrink-0" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
