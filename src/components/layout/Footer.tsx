"use client";

import { useTranslations } from "next-intl";

/**
 * Footer
 *
 * Minimal credits row, consistent with the cosmic, restrained aesthetic.
 */
export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/10 px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 font-mono text-xs uppercase tracking-widest text-white/40 md:flex-row md:items-center">
        <span>
          © {year} Chris Digital Studio. {t("rights")}
        </span>
        <span>
          {t("director")} — Chris
        </span>
      </div>
    </footer>
  );
}
