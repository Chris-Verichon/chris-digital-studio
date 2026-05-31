"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Points } from "three";
import * as THREE from "three";

/**
 * StarField
 *
 * A GPU-friendly particle cloud rendered as a single THREE.Points object.
 *
 * Why a single Points object with a precomputed buffer:
 * - Thousands of individual meshes would explode draw calls; one buffer keeps
 *   it to a single draw call and stays smooth on mid-range hardware.
 * - Positions are generated once (useMemo) inside a sphere shell so the camera
 *   always sits within the cloud, reinforcing the sense of depth.
 */
export function StarField({
  count = 1800,
  radius = 9,
  color = "#5ef3ff",
}: {
  count?: number;
  radius?: number;
  color?: string;
}) {
  const pointsRef = useRef<Points>(null);

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      // Uniformly sample a direction, then push it onto a spherical shell with
      // a little radial jitter for a nebula-like volume.
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = Math.random() * Math.PI * 2;
      const r = radius * (0.55 + Math.random() * 0.45);

      array[i * 3] = r * Math.sin(theta) * Math.cos(phi);
      array[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      array[i * 3 + 2] = r * Math.cos(theta);
    }
    return array;
  }, [count, radius]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    // Slow drift gives life without distracting from the content.
    pointsRef.current.rotation.y += delta * 0.03;
    pointsRef.current.rotation.x += delta * 0.008;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color={color}
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
