"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";

/**
 * About
 *
 * Presentation block: a strong statement plus a short manifesto and a few
 * stats. Content is revealed progressively on scroll.
 */
export function About() {
  const t = useTranslations("about");

  const stats: Array<{ value: string; key: "experience" | "projects" | "stack" }> = [
    { value: "5+", key: "experience" },
    { value: "20+", key: "projects" },
    { value: "WebGL", key: "stack" },
  ];

  return (
    <section
      id="about"
      className="relative mx-auto max-w-7xl px-6 py-32 sm:py-40"
    >
      <Reveal>
        <p className="mb-8 font-mono text-xs uppercase tracking-[0.5em] text-fuchsia-300/80">
          {t("kicker")}
        </p>
      </Reveal>

      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
        <Reveal>
          <h2 className="text-balance text-3xl font-bold leading-tight text-white sm:text-5xl">
            {t("title")}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-pretty text-base leading-relaxed text-white/60 sm:text-lg">
            {t("body")}
          </p>
        </Reveal>
      </div>

      <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-3">
        {stats.map((stat, index) => (
          <Reveal key={stat.key} delay={index * 0.1}>
            <div className="flex h-full flex-col gap-2 bg-[#05060a]/60 p-8">
              <span className="text-3xl font-bold text-cyan-300 sm:text-4xl">
                {stat.value}
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-white/40">
                {t(`stats.${stat.key}`)}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
