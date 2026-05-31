"use client";

import { useLocale, useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/data/projects";
import type { Locale } from "@/i18n/routing";

/**
 * Work
 *
 * Lists the portfolio cases. Each card is accented with the project's color
 * and exposes an "Inspect case" action. Localized strings are picked from the
 * project data using the active locale.
 */
export function Work() {
  const t = useTranslations("work");
  const locale = useLocale() as Locale;

  return (
    <section id="work" className="relative mx-auto max-w-7xl px-6 py-32 sm:py-40">
      <Reveal>
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.5em] text-emerald-300/80">
          {t("kicker")}
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mb-16 text-balance text-3xl font-bold leading-tight text-white sm:text-5xl">
          {t("title")}
        </h2>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.1}>
            <article
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-white/25"
              style={{ ["--accent" as string]: project.accent }}
            >
              {/* Accent glow that intensifies on hover. */}
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
                style={{ background: "var(--accent)" }}
              />

              <span
                className="font-mono text-xs"
                style={{ color: "var(--accent)" }}
              >
                0{index + 1}
              </span>

              <h3 className="mt-6 text-2xl font-semibold text-white">
                {project.title[locale]}
              </h3>
              <p className="mt-1 font-mono text-xs uppercase tracking-widest text-white/40">
                {project.tagline[locale]}
              </p>

              <p className="mt-5 flex-1 text-pretty text-sm leading-relaxed text-white/60">
                {project.description[locale]}
              </p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white/50"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <a
                href={project.url ?? "#contact"}
                target={project.url ? "_blank" : undefined}
                rel={project.url ? "noopener noreferrer" : undefined}
                className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/70 transition-colors group-hover:text-white"
              >
                {t("inspect")}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
