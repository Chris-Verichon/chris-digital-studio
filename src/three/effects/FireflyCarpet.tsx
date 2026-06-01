"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  ShaderMaterial,
  type Points,
} from "three";
import { scrollProgress } from "@/three/scrollStore";

type FireflyCarpetProps = {
  /** Number of fireflies in the carpet. */
  count?: number;
  /** Radius of the flat carpet on the floor plane. */
  radius?: number;
};

/**
 * FireflyCarpet
 *
 * A dense carpet of small pink "fireflies" resting on the floor at the start.
 * As the user scrolls, the whole carpet rises and disperses outward/upward —
 * mirroring the reference experience where the ground particles lift off and
 * scatter into the space.
 *
 * Implementation notes:
 * - A single THREE.Points (one draw call) with per-particle base position,
 *   per-particle rise/spread factors, an individual size and a twinkle phase,
 *   all precomputed once.
 * - A small custom ShaderMaterial renders each particle as a soft round glow
 *   with per-particle size (plain pointsMaterial can't vary size per vertex),
 *   giving the bokeh-like look of bright + faint fireflies mixed together.
 * - Each frame we recompute world positions from the base layout + the eased
 *   scroll progress, writing straight into the position buffer. This keeps the
 *   motion fully scroll-driven (rest at progress 0, fully dispersed at 1) with
 *   only cheap arithmetic per particle and no per-frame allocations.
 */
export function FireflyCarpet({ count = 6500, radius = 32 }: FireflyCarpetProps) {
  const pointsRef = useRef<Points>(null);
  // Smoothed pointer offset so the carpet drifts with the mouse (parallax).
  const pointer = useRef({ x: 0, z: 0 });

  // Precompute the static layout, per-particle motion factors and material.
  const { geometry, material, base, factors, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const base = new Float32Array(count * 3);
    // factors: [riseHeight, spread, swirl] per particle.
    const factors = new Float32Array(count * 3);
    const phases = new Float32Array(count);

    // Pink palette, occasionally drifting toward magenta/white for variety.
    const pink = new Color("#ff5fc4");
    const rose = new Color("#ff9ad6");
    const magenta = new Color("#c25bff");
    const warmWhite = new Color("#ffd9f2");
    const tmp = new Color();

    const floorY = -1.15;

    for (let i = 0; i < count; i += 1) {
      // Uniform distribution over a disc, biased toward the center (pow < 1)
      // so the carpet feels thickest near the house and thins toward the edges.
      const r = Math.pow(Math.random(), 0.7) * radius;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      // Hug the floor with a tiny vertical jitter so it reads as a dense carpet.
      const y = floorY + Math.random() * 0.3;

      base[i * 3] = x;
      base[i * 3 + 1] = y;
      base[i * 3 + 2] = z;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Each firefly rises a different height and spreads by a different amount.
      factors[i * 3] = 5 + Math.random() * 11; // rise height
      factors[i * 3 + 1] = 0.25 + Math.random() * 1.4; // outward spread
      factors[i * 3 + 2] = (Math.random() - 0.5) * 1.6; // swirl direction/strength
      phases[i] = Math.random() * Math.PI * 2;

      // Per-particle size: mostly small dots, a few bright bokeh highlights.
      const sizeRoll = Math.random();
      scales[i] =
        sizeRoll > 0.92 ? 1.4 + Math.random() * 1.4 : 0.35 + Math.random() * 0.7;

      // Mostly pink/rose, a few magenta + warm-white accents.
      const pick = Math.random();
      tmp.copy(
        pick > 0.93
          ? warmWhite
          : pick > 0.82
            ? magenta
            : pick > 0.45
              ? rose
              : pink,
      );
      colors[i * 3] = tmp.r;
      colors[i * 3 + 1] = tmp.g;
      colors[i * 3 + 2] = tmp.b;
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(positions, 3));
    geometry.setAttribute("aColor", new BufferAttribute(colors, 3));
    geometry.setAttribute("aScale", new BufferAttribute(scales, 1));

    // Soft round additive sprite with per-particle size + distance attenuation.
    const material = new ShaderMaterial({
      uniforms: {
        uPixelRatio: { value: 1 },
        uOpacity: { value: 0.95 },
      },
      vertexShader: /* glsl */ `
        attribute float aScale;
        attribute vec3 aColor;
        varying vec3 vColor;
        uniform float uPixelRatio;
        void main() {
          vColor = aColor;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          // Perspective size attenuation: closer fireflies look larger.
          gl_PointSize = aScale * uPixelRatio * (190.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vColor;
        uniform float uOpacity;
        void main() {
          // Soft circular falloff for a glowing firefly instead of a square.
          float d = distance(gl_PointCoord, vec2(0.5));
          float alpha = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(vColor, alpha * uOpacity);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    });

    return { geometry, material, base, factors, phases };
  }, [count, radius]);

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points) return;

    // Keep point sizes crisp across display densities.
    material.uniforms.uPixelRatio.value = state.gl.getPixelRatio();

    // Eased scroll progress: most of the lift happens early, then it lingers.
    const p = scrollProgress.get();
    const ease = p * p * (3 - 2 * p); // smoothstep
    const time = state.clock.elapsedTime;

    // Ease the pointer toward its target so mouse moves feel weighty, not jumpy.
    const targetX = state.pointer.x * 1.6;
    const targetZ = -state.pointer.y * 1.0;
    pointer.current.x += (targetX - pointer.current.x) * 0.05;
    pointer.current.z += (targetZ - pointer.current.z) * 0.05;
    const offsetX = pointer.current.x;
    const offsetZ = pointer.current.z;

    const attr = points.geometry.getAttribute("position") as BufferAttribute;
    const array = attr.array as Float32Array;

    for (let i = 0; i < count; i += 1) {
      const ix = i * 3;
      const bx = base[ix];
      const by = base[ix + 1];
      const bz = base[ix + 2];

      const riseHeight = factors[ix];
      const spread = factors[ix + 1];
      const swirl = factors[ix + 2];
      const phase = phases[i];

      // Gentle idle bobbing/twinkle so the resting carpet feels alive.
      const idle = Math.sin(time * 0.8 + phase) * 0.06;

      // Rise: lift each firefly by its own height, scaled by scroll.
      const y = by + ease * riseHeight + idle;

      // Disperse: push outward and add a swirl as they lift off.
      const spreadFactor = 1 + ease * spread;
      const swirlAngle = ease * swirl;
      const cos = Math.cos(swirlAngle);
      const sin = Math.sin(swirlAngle);
      const sx = bx * spreadFactor;
      const sz = bz * spreadFactor;

      // Pointer parallax: nearer (lower) fireflies react a touch more, so the
      // carpet feels like it has depth as the mouse moves.
      const depth = 0.6 + (1 - ease) * 0.4;
      array[ix] = sx * cos - sz * sin + offsetX * depth;
      array[ix + 1] = y;
      array[ix + 2] = sx * sin + sz * cos + offsetZ * depth;
    }

    attr.needsUpdate = true;

    // Slowly fade the carpet as it disperses so the space doesn't get muddy.
    material.uniforms.uOpacity.value = 0.95 - ease * 0.35;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}
