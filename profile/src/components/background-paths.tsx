"use client";

import { memo, useMemo } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/button";

function fract(n: number) {
  return n - Math.floor(n);
}

function seeded01(seed: number) {
  // Deterministic 0..1 pseudo-random (avoids Math.random() => less churn).
  return fract(Math.sin(seed) * 43758.5453123);
}

type FloatingPathsProps = {
  position: number;
  count?: number;
};

function FloatingPaths({ position, count = 28 }: FloatingPathsProps) {
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  // Detect small / touch devices (mobile Safari often falls into these).
  const isSmallScreen =
    typeof window !== "undefined" && window.matchMedia?.("(max-width: 640px)")?.matches;
  const isTouch = typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)")?.matches;
  const isiOSLike =
    typeof navigator !== "undefined" && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const prefersSimple = reduceMotion || isSmallScreen || isTouch || isiOSLike;

  const paths = useMemo(() => {
    // Reduce the number of animated paths on small/touch devices to save CPU.
    const effectiveCount = prefersSimple ? Math.min(count, 6) : count;

    return Array.from({ length: effectiveCount }, (_, i) => {
      const t = count <= 1 ? 0 : i / (count - 1);
      const rnd = seeded01(i * 1000 + (position > 0 ? 17 : 29));

      // Match page blue accents (App.css uses 96/165/250 and 147/197/253).
      // Keep opacity subtle so it's "ambient" and not distracting.
      const alpha = 0.035 + t * 0.15;

      return {
        id: i,
        d: `M-${180 - i * 5 * position} -${189 + i * 6}C-${280 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${16 - i * 6} ${152 - i * 5 * position} ${36 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${784 - i * 5 * position} ${175 - i * 6} ${684 - i * 5 * position} ${75 - i * 6}`,
        color: `rgba(147, 197, 253, ${alpha})`,
        width: 0.35 + t * 0.75,
        duration: 26 + rnd * 20,
        delay: -rnd * 10, // negative delay staggers without startup pop
      };
    });
  }, [count, position]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="h-full w-full opacity-50 sm:opacity-100"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="none"
      >
        <title>Background Paths</title>
        <defs>
          {/* Subtle glow around strokes */}
          {!prefersSimple && (
            <filter
              id="bg-path-glow"
              x="-25%"
              y="-25%"
              width="150%"
              height="150%"
              colorInterpolationFilters="sRGB"
            >
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          )}
        </defs>

        <g {...(!prefersSimple ? { filter: "url(#bg-path-glow)" } : {})}>
          {paths.map((path) => {
            if (prefersSimple) {
              return (
                <path
                  key={path.id}
                  d={path.d}
                  stroke={path.color}
                  strokeWidth={path.width}
                  strokeOpacity={1}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              );
            }

            // Why lines can "pop": when a dashed segment loops, the dash offset wraps.
            // Fix: draw two overlapping moving segments per path (phase-shifted).
            const segment = 0.55;
            const t1 = {
              duration: path.duration,
              delay: path.delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear" as const,
            };
            const t2 = {
              duration: path.duration,
              delay: path.delay - path.duration / 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear" as const,
            };

            return (
              <g key={path.id}>
                <motion.path
                  d={path.d}
                  stroke={path.color}
                  strokeWidth={path.width}
                  strokeOpacity={1}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: segment, pathOffset: 0 }}
                  animate={{ pathOffset: 1 }}
                  transition={t1}
                />
                <motion.path
                  d={path.d}
                  stroke={path.color}
                  strokeWidth={path.width}
                  strokeOpacity={1}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: segment, pathOffset: 0 }}
                  animate={{ pathOffset: 1 }}
                  transition={t2}
                />
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

export const BackgroundPathsBackdrop = memo(function BackgroundPathsBackdrop() {
  return (
    <div className="absolute inset-0">
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
    </div>
  );
});

export function BackgroundPaths({ title = "Background Paths" }: { title?: string }) {
  const words = title.split(" ");

  const reduceMotion =
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const isSmallScreen =
    typeof window !== "undefined" && window.matchMedia?.("(max-width: 640px)")?.matches;
  const isTouch = typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)")?.matches;
  const isiOSLike =
    typeof navigator !== "undefined" && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const prefersSimple = reduceMotion || isSmallScreen || isTouch || isiOSLike;

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white dark:bg-neutral-950">
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center md:px-6">
        <motion.div
          initial={prefersSimple ? undefined : { opacity: 0 }}
          animate={prefersSimple ? undefined : { opacity: 1 }}
          transition={prefersSimple ? undefined : { duration: 2 }}
          className="mx-auto max-w-4xl"
        >
          <h1 className="mb-8 text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="mr-4 inline-block last:mr-0">
                {word.split("").map((letter, letterIndex) => {
                  if (prefersSimple) {
                    return (
                      <span
                        key={`${wordIndex}-${letterIndex}`}
                        className="inline-block bg-gradient-to-r from-neutral-900 to-neutral-700/80 bg-clip-text text-transparent dark:from-white dark:to-white/80"
                      >
                        {letter}
                      </span>
                    );
                  }

                  return (
                    <motion.span
                      key={`${wordIndex}-${letterIndex}`}
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: wordIndex * 0.1 + letterIndex * 0.03,
                        type: "spring",
                        stiffness: 150,
                        damping: 25,
                      }}
                      className="inline-block bg-gradient-to-r from-neutral-900 to-neutral-700/80 bg-clip-text text-transparent dark:from-white dark:to-white/80"
                    >
                      {letter}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </h1>

          <div className="group relative inline-block overflow-hidden rounded-2xl bg-gradient-to-b from-black/10 to-white/10 p-px shadow-lg backdrop-blur-lg transition-shadow duration-300 hover:shadow-xl dark:from-white/10 dark:to-black/10">
            <Button
              variant="ghost"
              className="rounded-[1.15rem] border border-black/10 bg-white/95 px-8 py-6 text-lg font-semibold text-black shadow-none backdrop-blur-md transition-all duration-300 hover:bg-white/100 hover:shadow-md group-hover:-translate-y-0.5 dark:border-white/10 dark:bg-black/95 dark:text-white dark:hover:bg-black/100 dark:hover:shadow-neutral-800/50"
            >
              <span className="opacity-90 transition-opacity group-hover:opacity-100">Discover Excellence</span>
              <span className="ml-3 opacity-70 transition-all duration-300 group-hover:translate-x-1.5 group-hover:opacity-100">
                →
              </span>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
