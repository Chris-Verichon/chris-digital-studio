"use client";

import { useLocale, useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/data/projects";
import type { Locale } from "@/i18n/routing";

/**
 * Work
 *
 * Portfolio cases rendered as full-viewport "moments" stacked on the scroll,
 * echoing the reference experience: each case occupies its own screen with an
 * oversized title, lets the 3D background show through, and exposes a single
 * "Inspect case" action. Alignment alternates left/right to give the scroll a
 * cinematic rhythm.
 */
export function Work() {
  const t = useTranslations("work");
  const locale = useLocale() as Locale;

  return (
    <section id="work" className="relative">
      {/* Section opener: keeps the "selected work / global validation" label. */}
      <div className="mx-auto max-w-7xl px-6 pt-32 sm:pt-40">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.5em] text-emerald-300/80">
            {t("kicker")}
          </p>
        </Reveal>
      </div>

      {projects.map((project, index) => {
        const isOdd = index % 2 === 1;

        return (
          <article
            key={project.id}
            className="relative flex min-h-screen items-center px-6 py-24"
            style={{ ["--accent" as string]: project.accent }}
          >
            <div
              className={[
                "mx-auto flex w-full max-w-7xl flex-col gap-6",
                isOdd ? "items-end text-right" : "items-start text-left",
              ].join(" ")}
            >
              <Reveal>
                <span
                  className="font-mono text-sm tracking-[0.4em]"
                  style={{ color: "var(--accent)" }}
                >
                  CASE 0{index + 1}
                </span>
              </Reveal>

              <Reveal delay={0.05}>
                {/* Oversized case title, in the cinematic spaced-typography
                    spirit of the reference experience. */}
                <h3 className="max-w-4xl text-balance text-5xl font-bold uppercase leading-[0.9] tracking-tight text-white sm:text-7xl lg:text-8xl">
                  {project.title[locale]}
                </h3>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">
                  {project.tagline[locale]}
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <p
                  className={[
                    "max-w-md text-pretty text-base leading-relaxed text-white/60 sm:text-lg",
                    isOdd ? "ml-auto" : "",
                  ].join(" ")}
                >
                  {project.description[locale]}
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <ul
                  className={[
                    "flex flex-wrap gap-2",
                    isOdd ? "justify-end" : "",
                  ].join(" ")}
                >
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white/50"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.25}>
                <a
                  href={project.url ?? "#contact"}
                  target={project.url ? "_blank" : undefined}
                  rel={project.url ? "noopener noreferrer" : undefined}
                  className="group mt-4 inline-flex items-center gap-3 rounded-full border border-white/20 px-7 py-3 font-mono text-xs uppercase tracking-[0.3em] text-white/80 transition-colors hover:border-white/60 hover:text-white"
                >
                  {t("inspect")}
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
              </Reveal>
            </div>
          </article>
        );
      })}
    </section>
  );
}
