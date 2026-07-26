"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

export interface Theme {
  id: string;
  name: string;
  color: string;
  glow: string;
  bgTint: string; // The color injected into the background
}

export const themes: Theme[] = [
  { id: "blue", name: "Electric Blue", color: "#2563EB", glow: "rgba(37,99,235,0.6)", bgTint: "#050a15" },
  { id: "purple", name: "Electric Purple", color: "#A855F7", glow: "rgba(168,85,247,0.6)", bgTint: "#0f0515" },
  { id: "emerald", name: "Neon Emerald", color: "#10B981", glow: "rgba(16,185,129,0.6)", bgTint: "#05120f" },
  { id: "crimson", name: "Crimson Red", color: "#EF4444", glow: "rgba(239,68,68,0.6)", bgTint: "#1a0505" },
];

interface ThemeDockProps {
  currentTheme: Theme;
  onSelectTheme: (theme: Theme) => void;
}

export default function ThemeDock({ currentTheme, onSelectTheme }: ThemeDockProps) {
  
  // Update CSS variables on theme change
  useEffect(() => {
    document.documentElement.style.setProperty('--theme-accent', currentTheme.color);
    document.documentElement.style.setProperty('--theme-bg-tint', currentTheme.bgTint);
    document.documentElement.style.setProperty('--theme-glow', currentTheme.glow);
  }, [currentTheme]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-black/50 backdrop-blur-2xl border border-white/10 p-2 rounded-full shadow-2xl pointer-events-auto"
    >
      <span className="text-[10px] uppercase font-bold tracking-widest text-white/50 pl-3 pr-1 hidden sm:inline">
        Theme
      </span>
      <div className="flex items-center gap-1.5">
        {themes.map((t) => {
          const isActive = currentTheme.id === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onSelectTheme(t)}
              title={t.name}
              className="relative w-8 h-8 rounded-full flex items-center justify-center focus:outline-none cursor-pointer transition-transform hover:scale-110 shadow-lg"
              style={{ backgroundColor: t.color }}
            >
              {isActive && (
                <motion.div
                  layoutId="active-theme-ring"
                  className="absolute -inset-1.5 rounded-full border-2 border-white pointer-events-none shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
