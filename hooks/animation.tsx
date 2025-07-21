"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState, useMemo, ReactElement } from "react";

// Type definitions
interface AnimationStep {
  filter?: string;
  opacity?: number;
  y?: number;
  x?: number;
  scale?: number;
  rotate?: number;
  [key: string]: any;
}

interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "characters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  animationFrom?: AnimationStep;
  animationTo?: AnimationStep[];
  easing?: (t: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number;
  as?: keyof JSX.IntrinsicElements;
}

const buildKeyframes = (
  from: AnimationStep,
  steps: AnimationStep[]
): Record<string, any[]> => {
  const keys = new Set([
    ...Object.keys(from),
    ...steps.flatMap((s: AnimationStep) => Object.keys(s)),
  ]);
  const keyframes: Record<string, any[]> = {};
  keys.forEach((k: string) => {
    keyframes[k] = [from[k], ...steps.map((s: AnimationStep) => s[k])];
  });
  return keyframes;
};

const BlurText = ({
  text = "",
  delay = 200,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = (t: number) => t,
  onAnimationComplete,
  stepDuration = 0.35,
  as = "p",
}: BlurTextProps): ReactElement => {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom: AnimationStep = useMemo(
    () =>
      direction === "top"
        ? { filter: "blur(10px)", opacity: 0, y: -50 }
        : { filter: "blur(10px)", opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo: AnimationStep[] = useMemo(
    () => [
      {
        filter: "blur(5px)",
        opacity: 0.5,
        y: direction === "top" ? 5 : -5,
      },
      { filter: "blur(0px)", opacity: 1, y: 0 },
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;
  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1)
  );

  const Component = as;

  return (
    <div ref={ref}>
      <Component
        className={className}
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {elements.map((segment, index) => {
          const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);
          const spanTransition = {
            duration: totalDuration,
            times,
            delay: (index * delay) / 1000,
            ease: easing,
          };

          return (
            <motion.span
              className="inline-block will-change-[transform,filter,opacity]"
              key={index}
              initial={fromSnapshot}
              animate={inView ? animateKeyframes : fromSnapshot}
              transition={spanTransition}
              onAnimationComplete={
                index === elements.length - 1 ? onAnimationComplete : undefined
              }
            >
              {segment === " " ? "\u00A0" : segment}
              {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
            </motion.span>
          );
        })}
      </Component>
    </div>
  );
};

// Custom easing functions
export const easingPresets = {
  smooth: (t: number): number => t * t * (3 - 2 * t),
  bounce: (t: number): number =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  elastic: (t: number): number => 1 - Math.pow(1 - t, 3),
  quick: (t: number): number => 1 - Math.pow(1 - t, 4),
};

export default BlurText;
export type { BlurTextProps, AnimationStep };
