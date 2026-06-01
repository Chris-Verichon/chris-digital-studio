"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";

// The 3D experience is heavy and browser-only: load it lazily, never on the
// server, to keep the initial HTML light and avoid hydration mismatches.
const Experience = dynamic(
  () => import("@/three/Experience").then((mod) => mod.Experience),
  { ssr: false },
);

/**
 * ExperienceBackground
 *
 * Fixed, full-viewport layer that hosts the immersive WebGL scene behind the
 * scrolling content. Falls back to an accessible "WEBGL NOT SUPPORTED" screen
 * when WebGL is unavailable.
 */
export function ExperienceBackground() {
  const supported = useWebGLSupport();
  const t = useTranslations("footer");

  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      {supported === false && (
        <div className="flex h-full items-center justify-center">
          <p className="font-mono text-xs tracking-[0.4em] text-white/40">
            {t("webglUnsupported")}
          </p>
        </div>
      )}
      {supported === true && <Experience />}
    </div>
  );
}
