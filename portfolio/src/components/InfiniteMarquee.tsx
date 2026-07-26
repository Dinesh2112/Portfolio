"use client";

import { useEffect, useState } from "react";

export default function InfiniteMarquee({ text, themeColor = "#ffffff" }: { text: string, themeColor?: string }) {
  // Use a unique id for the animation just in case, though global is fine
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="relative flex overflow-hidden whitespace-nowrap bg-black py-8 border-y border-white/10 pointer-events-auto">
      <style>{`
        @keyframes scrollMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: scrollMarquee 40s linear infinite;
        }
      `}</style>
      <div className="flex whitespace-nowrap animate-marquee">
        <h1 
          className="text-[10vw] md:text-[6vw] font-black uppercase tracking-tighter cursor-pointer transition-colors duration-500" 
          style={{ 
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.4)", 
            textShadow: "0 0 20px rgba(255,255,255,0)" 
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = themeColor;
            e.currentTarget.style.webkitTextStroke = `0px transparent`;
            e.currentTarget.style.textShadow = `0 0 40px ${themeColor}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "transparent";
            e.currentTarget.style.webkitTextStroke = "1px rgba(255,255,255,0.4)";
            e.currentTarget.style.textShadow = "0 0 20px rgba(255,255,255,0)";
          }}
        >
          {text} &nbsp; {text} &nbsp; {text} &nbsp; {text} &nbsp; {text} &nbsp;
        </h1>
      </div>
    </div>
  );
}
