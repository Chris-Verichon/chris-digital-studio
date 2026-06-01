"use client";

import { useTranslations } from "next-intl";

/**
 * Hero
 *
 * Full-viewport immersive intro. The 3D scene lives in the fixed background
 * (ExperienceBackground); this section only renders the overlay copy so the
 * camera choreography shows through. The accent word is rendered on its own
 * line to echo the cinematic, spaced look of the reference experience.
 */
export function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      id="hero"
      className="relative flex h-screen min-h-[640px] w-full items-center justify-center overflow-hidden"
    >
      {/* Radial vignette to keep the copy legible over the scene. */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_35%,_rgba(4,5,10,0.7)_100%)]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.5em] text-cyan-300/80">
          {t("kicker")}
        </p>
        <h1 className="text-balance text-4xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
          {t("title")}
          <span className="mt-2 block text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.6)]">
            {t("titleAccent")}
          </span>
        </h1>
        <p className="mx-auto mt-8 max-w-xl text-pretty text-base text-white/60 sm:text-lg">
          {t("subtitle")}
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <p className="animate-pulse font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">
          {t("scroll")}
        </p>
      </div>
    </section>
  );
}
