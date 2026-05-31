"use client";

import { useEffect, useState } from "react";

/**
 * Detects WebGL availability once on mount.
 * Returns `null` while undetermined (SSR / first paint), then a boolean.
 * Consumers render the immersive canvas only when this is `true`.
 */
export function useWebGLSupport(): boolean | null {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const context =
        canvas.getContext("webgl2") ??
        canvas.getContext("webgl") ??
        canvas.getContext("experimental-webgl");
      setSupported(Boolean(context));
    } catch {
      setSupported(false);
    }
  }, []);

  return supported;
}
