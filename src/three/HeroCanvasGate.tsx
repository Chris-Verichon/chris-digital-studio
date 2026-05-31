"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";

// The 3D canvas is heavy and browser-only: load it lazily and never on the
// server to keep the initial HTML light and avoid hydration mismatches.
const HeroCanvas = dynamic(
  () => import("@/three/HeroCanvas").then((mod) => mod.HeroCanvas),
  { ssr: false },
);

/**
 * HeroCanvasGate
 *
 * Decides whether to render the immersive WebGL scene or the accessible
 * fallback ("WEBGL NOT SUPPORTED"), based on runtime feature detection.
 */
export function HeroCanvasGate() {
  const supported = useWebGLSupport();
  const t = useTranslations("footer");

  if (supported === false) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="font-mono text-xs tracking-[0.4em] text-white/40">
          {t("webglUnsupported")}
        </p>
      </div>
    );
  }

  // While detection is pending we render nothing (transparent) to avoid flashes.
  return supported ? <HeroCanvas /> : null;
}
