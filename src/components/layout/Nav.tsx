"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageToggle } from "./LanguageToggle";

/**
 * Nav
 *
 * Sticky top navigation with section anchors and the language toggle.
 * Anchors point to in-page section ids composed in the home route.
 */
export function Nav() {
  const t = useTranslations("nav");

  return (
    <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="font-mono text-sm font-semibold uppercase tracking-[0.3em] text-white"
        >
          Chris<span className="text-cyan-300">.</span>Studio
        </Link>

        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 font-mono text-xs uppercase tracking-widest text-white/70 md:flex">
            <li>
              <a href="#about" className="transition-colors hover:text-white">
                {t("about")}
              </a>
            </li>
            <li>
              <a href="#work" className="transition-colors hover:text-white">
                {t("work")}
              </a>
            </li>
            <li>
              <a href="#contact" className="transition-colors hover:text-white">
                {t("contact")}
              </a>
            </li>
          </ul>
          <LanguageToggle />
        </div>
      </nav>
    </header>
  );
}
