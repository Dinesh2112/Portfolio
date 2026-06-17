"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure GSAP registers the plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HorizontalScroll({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = scrollWrapperRef.current;
    if (!container || !wrapper) return;

    // Calculate how far to translate the wrapper
    // It's the total width of the wrapper minus the viewport width
    const getScrollAmount = () => -(wrapper.scrollWidth - window.innerWidth);

    const tween = gsap.to(wrapper, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        scrub: 1, // Smooth scrubbing
        invalidateOnRefresh: true, // Recalculate on resize
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="h-screen w-full overflow-hidden bg-[#0a0a0a]">
      <div ref={scrollWrapperRef} className="flex h-full w-[400vw] items-center">
        {children}
      </div>
    </div>
  );
}
