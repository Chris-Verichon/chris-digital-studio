"use client";

import { useMemo } from "react";
import { BackSide, Color, ShaderMaterial } from "three";

/**
 * GradientSky
 *
 * A large inward-facing sphere that paints a dusk gradient backdrop:
 * deep indigo at the zenith fading to a warm mauve haze at the horizon,
 * echoing the twilight atmosphere of the reference experience.
 *
 * Why a shader sphere instead of a CSS background:
 * - It lives inside the 3D scene, so fog, bloom and parallax all act on it
 *   consistently and it always fills the viewport behind every other object.
 */
export function GradientSky() {
  const material = useMemo(() => {
    return new ShaderMaterial({
      side: BackSide,
      depthWrite: false,
      fog: false,
      uniforms: {
        uZenith: { value: new Color("#0b0e1a") },
        uMid: { value: new Color("#1d2742") },
        uHorizon: { value: new Color("#4a3548") },
        uGlow: { value: new Color("#6b4a5a") },
      },
      vertexShader: /* glsl */ `
        varying vec3 vDir;
        void main() {
          vDir = normalize(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vDir;
        uniform vec3 uZenith;
        uniform vec3 uMid;
        uniform vec3 uHorizon;
        uniform vec3 uGlow;
        void main() {
          // Normalized height of the view direction (-1 down, +1 up).
          float t = clamp(vDir.y * 0.5 + 0.5, 0.0, 1.0);
          vec3 col = mix(uHorizon, uMid, smoothstep(0.0, 0.55, t));
          col = mix(col, uZenith, smoothstep(0.5, 1.0, t));
          // Warm haze concentrated just above the horizon line.
          float haze = smoothstep(0.52, 0.46, t) * smoothstep(0.30, 0.48, t);
          col += uGlow * haze * 0.6;
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });
  }, []);

  return (
    <mesh material={material} renderOrder={-10} scale={[1, 1, 1]}>
      <sphereGeometry args={[120, 32, 32]} />
    </mesh>
  );
}
