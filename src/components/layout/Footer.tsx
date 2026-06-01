"use client";

import { useTranslations } from "next-intl";

/**
 * Footer
 *
 * Multi-column credits row (location / direction / legal) in the restrained,
 * cosmic aesthetic of the reference experience.
 */
export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/10 px-6 py-16">
      <div className="mx-auto grid max-w-7xl gap-10 font-mono text-xs uppercase tracking-widest text-white/40 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-3">
          <span className="text-white/30">{t("studioLabel")}</span>
          <span className="text-base normal-case tracking-normal text-white">
            Chris<span className="text-cyan-300">.</span>Studio
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-white/30">{t("basedLabel")}</span>
          <span className="text-white/60">{t("based")}</span>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-white/30">{t("director")}</span>
          <span className="text-white/60">Chris</span>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-white/30">{t("legal")}</span>
          <span className="text-white/60">
            © {year} Chris Digital Studio
          </span>
          <span className="text-white/30">{t("rights")}</span>
        </div>
      </div>
    </footer>
  );
}
