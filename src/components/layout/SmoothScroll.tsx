"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * SmoothScroll
 *
 * Initializes Lenis for inertia-based smooth scrolling and bridges it with
 * GSAP ScrollTrigger so scroll-driven animations stay perfectly in sync.
 *
 * Why this design:
 * - Lenis owns the scroll loop; we drive it from GSAP's ticker (single rAF loop)
 *   instead of Lenis' own rAF to avoid two competing animation frames.
 * - On `prefers-reduced-motion` we skip Lenis entirely and fall back to native
 *   scrolling, keeping the experience accessible.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      // Exponential ease-out for a weighty, cinematic feel.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      // GSAP ticker time is in seconds; Lenis expects milliseconds.
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  return <>{children}</>;
}
