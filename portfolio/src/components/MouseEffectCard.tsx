"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const SPRING_CONFIG = { stiffness: 300, damping: 30, mass: 0.5 };
const OPACITY_DURATION_BASE = 0.8;
const OPACITY_DURATION_VARIATION = 0.2;
const OPACITY_EASE = [0.4, 0, 0.2, 1] as const;
const OPACITY_DELAY_CYCLE = 1.5;
const OPACITY_DELAY_STEP = 0.02;
const MIN_OPACITY_MULTIPLIER = 0.5;
const MAX_OPACITY_MULTIPLIER = 1.5;
const MIN_OPACITY_FALLBACK = 0.3;
const PROXIMITY_MULTIPLIER = 1.2;
const PROXIMITY_OPACITY_BOOST = 0.8;

export interface MouseEffectCardProps {
  className?: string;
  children?: React.ReactNode;
  dotSize?: number;
  dotSpacing?: number;
  repulsionRadius?: number;
  repulsionStrength?: number;
  title?: string;
  subtitle?: string;
  topText?: string;
  topSubtext?: string;
  primaryCtaText?: string;
  primaryCtaUrl?: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  footerText?: string;
  ariaLabel?: string;
}

interface Dot {
  id: string;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  opacity: number;
}

interface DotComponentProps {
  dot: Dot;
  index: number;
  dotSize: number;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  repulsionRadius: number;
  repulsionStrength: number;
}

function calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}

function generateDots(width: number, height: number, spacing: number): Dot[] {
  const dots: Dot[] = [];
  const cols = Math.ceil(width / spacing);
  const rows = Math.ceil(height / spacing);
  const centerX = width / 2;
  const centerY = height / 2;
  const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);

  for (let row = 0; row <= rows; row++) {
    for (let col = 0; col <= cols; col++) {
      const x = col * spacing;
      const y = row * spacing;

      const dx = x - centerX;
      const dy = y - centerY;
      const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);

      const edgeFactor = Math.min(distanceFromCenter / (maxDistance * 0.7), 1);

      if (Math.random() > edgeFactor) {
        continue;
      }

      const pattern = (row + col) % 3;
      const baseOpacities = [0.3, 0.5, 0.7];
      const opacity = baseOpacities[pattern] * edgeFactor;

      dots.push({
        id: `dot-${row}-${col}`,
        x,
        y,
        baseX: x,
        baseY: y,
        opacity,
      });
    }
  }

  return dots;
}

function DotComponent({
  dot,
  index,
  dotSize,
  mouseX,
  mouseY,
  repulsionRadius,
  repulsionStrength,
}: DotComponentProps) {
  const posX = useTransform([mouseX, mouseY], () => {
    const mx = mouseX.get();
    const my = mouseY.get();

    if (!(Number.isFinite(mx) && Number.isFinite(my))) {
      return 0;
    }

    const dx = dot.baseX - mx;
    const dy = dot.baseY - my;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < repulsionRadius) {
      const force = (1 - distance / repulsionRadius) * repulsionStrength;
      const angle = Math.atan2(dy, dx);
      return Math.cos(angle) * force;
    }

    return 0;
  });

  const posY = useTransform([mouseX, mouseY], () => {
    const mx = mouseX.get();
    const my = mouseY.get();

    if (!(Number.isFinite(mx) && Number.isFinite(my))) {
      return 0;
    }

    const dx = dot.baseX - mx;
    const dy = dot.baseY - my;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < repulsionRadius) {
      const force = (1 - distance / repulsionRadius) * repulsionStrength;
      const angle = Math.atan2(dy, dx);
      return Math.sin(angle) * force;
    }

    return 0;
  });

  const opacityBoost = useTransform([mouseX, mouseY], () => {
    const mx = mouseX.get();
    const my = mouseY.get();

    if (!(Number.isFinite(mx) && Number.isFinite(my))) return 0;

    const distance = calculateDistance(dot.baseX, dot.baseY, mx, my);
    const maxDistance = repulsionRadius * PROXIMITY_MULTIPLIER;

    if (distance < maxDistance) {
      const proximityFactor = 1 - distance / maxDistance;
      return proximityFactor * PROXIMITY_OPACITY_BOOST;
    }

    return 0;
  });

  const x = useSpring(posX, SPRING_CONFIG);
  const y = useSpring(posY, SPRING_CONFIG);

  const baseMinOpacity = Math.max(dot.opacity * MIN_OPACITY_MULTIPLIER, MIN_OPACITY_FALLBACK);
  const baseMaxOpacity = Math.min(dot.opacity * MAX_OPACITY_MULTIPLIER, 1);

  const minOpacityWithBoost = useTransform(opacityBoost, (boost) =>
    Math.min(baseMinOpacity + boost, 1)
  );

  const delay = (index * OPACITY_DELAY_STEP) % OPACITY_DELAY_CYCLE;

  return (
    <motion.div
      animate={{
        opacity: [baseMinOpacity, baseMaxOpacity, baseMinOpacity],
      }}
      className="absolute rounded-full bg-white/40 will-change-transform"
      initial={{ opacity: baseMinOpacity }}
      style={{
        width: dotSize,
        height: dotSize,
        left: dot.baseX,
        top: dot.baseY,
        x,
        y,
        opacity: useSpring(minOpacityWithBoost, {
          stiffness: 150,
          damping: 25,
        }),
      }}
      transition={{
        opacity: {
          duration: OPACITY_DURATION_BASE + (index % 4) * OPACITY_DURATION_VARIATION,
          repeat: Infinity,
          ease: OPACITY_EASE,
          delay,
          times: [0, 0.5, 1],
        },
      }}
    />
  );
}

export default function MouseEffectCard({
  className = "",
  children,
  dotSize = 2,
  dotSpacing = 16,
  repulsionRadius = 80,
  repulsionStrength = 20,
  title = "Acme",
  subtitle = "Build interfaces with interactive patterns",
  topText = "Case Study",
  topSubtext = "Discover something new",
  primaryCtaText = "Get Started",
  primaryCtaUrl = "#",
  secondaryCtaText = "View Docs",
  secondaryCtaUrl = "#",
  footerText = "We do it all",
  ariaLabel,
}: MouseEffectCardProps) {
  const innerContainerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);
  const mouseY = useMotionValue(Number.POSITIVE_INFINITY);
  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    const updateDots = () => {
      if (!innerContainerRef.current) return;
      const rect = innerContainerRef.current.getBoundingClientRect();
      const newDots = generateDots(rect.width, rect.height, dotSpacing);
      setDots(newDots);
    };

    updateDots();

    const resizeObserver = new ResizeObserver(updateDots);
    if (innerContainerRef.current) {
      resizeObserver.observe(innerContainerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [dotSpacing]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!innerContainerRef.current) return;

    const rect = innerContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(Number.POSITIVE_INFINITY);
    mouseY.set(Number.POSITIVE_INFINITY);
  };

  return (
    <div
      className={`relative w-full max-w-md overflow-hidden rounded-3xl border border-white/20 p-0 shadow-2xl bg-black/60 backdrop-blur-xl pointer-events-auto ${className}`}
    >
      <div
        aria-label={ariaLabel ?? `${title} — ${subtitle}`}
        className="relative h-[300px] w-full overflow-hidden p-0 cursor-pointer"
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        ref={innerContainerRef}
        tabIndex={0}
      >
        {dots.map((dot, index) => (
          <DotComponent
            dot={dot}
            dotSize={dotSize}
            index={index}
            key={dot.id}
            mouseX={mouseX}
            mouseY={mouseY}
            repulsionRadius={repulsionRadius}
            repulsionStrength={repulsionStrength}
          />
        ))}

        {topText && (
          <div className="absolute top-6 left-6 z-10 pointer-events-none">
            <div className="relative flex flex-col gap-1">
              <p className="font-bold text-sm text-white">
                {topText}
              </p>
              {topSubtext && (
                <p className="font-medium text-xs text-white/50">
                  {topSubtext}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 pointer-events-none">
          <div className="flex flex-col items-center gap-4">
            <h2 className="relative text-center font-black text-3xl sm:text-4xl text-white tracking-tighter uppercase">
              {title}
            </h2>
            {(subtitle || children) && (
              <p className="relative max-w-sm text-center font-bold text-sm text-white/60 leading-relaxed">
                {children || subtitle}
              </p>
            )}
            <div className="mt-4 flex items-center gap-3 pointer-events-auto">
              <a
                href={primaryCtaUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-white text-black px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-neutral-200 transition-colors"
                onClick={(e) => {
                  if (primaryCtaUrl === "#") e.preventDefault();
                }}
              >
                {primaryCtaText}
              </a>
              {secondaryCtaText && (
                <a
                  href={secondaryCtaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-transparent border border-white text-white px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors"
                  onClick={(e) => {
                    if (secondaryCtaUrl === "#") e.preventDefault();
                  }}
                >
                  {secondaryCtaText}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
