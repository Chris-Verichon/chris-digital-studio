"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

/**
 * LanguageToggle
 *
 * Switches between the configured locales while preserving the current path.
 * Uses the locale-aware router so the URL prefix is updated correctly.
 */
export function LanguageToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-1 font-mono text-xs">
      {routing.locales.map((code) => {
        const isActive = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => router.replace(pathname, { locale: code })}
            aria-current={isActive ? "true" : undefined}
            className={`px-2 py-1 uppercase tracking-widest transition-colors ${
              isActive
                ? "text-cyan-300"
                : "text-white/40 hover:text-white/80"
            }`}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
