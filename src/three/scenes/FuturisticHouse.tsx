"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import type { Group } from "three";

/**
 * FuturisticHouse
 *
 * A procedural, brutalist "concrete" villa built from solid primitives — a
 * luminous white volume composition rather than a neon wireframe, matching the
 * daylight-on-architecture feel of the reference experience.
 *
 * Why procedural instead of a loaded GLTF model:
 * - No external asset / licensing dependency and instant load, while the stacked
 *   white boxes + recessed warm windows read cleanly under the dusk lighting.
 *
 * Composition (sitting on the ground, lit by warm interior + dusk key light):
 * - A wide ground platform.
 * - A tall main block with a recessed glowing window.
 * - A cantilevered upper block, offset for an architectural silhouette.
 * - A low single-storey wing.
 * - Warm emissive window panes glowing from inside.
 */
export function FuturisticHouse() {
  const groupRef = useRef<Group>(null);
  // Smoothed pointer offset so the house gently turns toward the cursor.
  const pointer = useRef({ x: 0, y: 0 });

  // Warm interior glow shared by every window pane.
  // Intensity kept low so Bloom gives a soft halo without blowing out text.
  const windowGlow = useMemo(
    () => ({ color: "#ffe6bd", emissive: "#ffa94d", intensity: 0.85 }),
    [],
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    // Lerp toward pointer so the motion feels weighted, not instant.
    pointer.current.x += (state.pointer.x * 0.18 - pointer.current.x) * 0.06;
    pointer.current.y += (state.pointer.y * 0.08 - pointer.current.y) * 0.06;
    groupRef.current.rotation.y = pointer.current.x;
    groupRef.current.rotation.x = -pointer.current.y;
  });

  return (
    <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.25}>
      <group ref={groupRef} position={[0, -1, 0]}>
        {/* Ground platform */}
        <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
          <boxGeometry args={[6, 0.3, 5]} />
          <meshStandardMaterial color="#cfcdd6" roughness={0.85} metalness={0.05} />
        </mesh>

        {/* Tall main block */}
        <mesh position={[-0.7, 1.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.6, 2.4, 3] } />
          <meshStandardMaterial color="#e9e8ee" roughness={0.8} metalness={0.05} />
        </mesh>

        {/* Recessed warm window on the main block (front face) */}
        <mesh position={[-0.7, 1.7, 1.52]}>
          <planeGeometry args={[1.6, 1.3]} />
          <meshStandardMaterial
            color={windowGlow.color}
            emissive={windowGlow.emissive}
            emissiveIntensity={windowGlow.intensity}
            roughness={0.4}
            toneMapped={false}
          />
        </mesh>

        {/* Cantilevered upper block, offset for silhouette */}
        <mesh position={[0.9, 2.4, -0.4]} castShadow receiveShadow>
          <boxGeometry args={[3, 1.4, 2.4]} />
          <meshStandardMaterial color="#f2f1f6" roughness={0.78} metalness={0.05} />
        </mesh>

        {/* Warm window strip on the upper block (front face) */}
        <mesh position={[0.9, 2.5, 0.81]}>
          <planeGeometry args={[2.4, 0.7]} />
          <meshStandardMaterial
            color={windowGlow.color}
            emissive={windowGlow.emissive}
            emissiveIntensity={windowGlow.intensity}
            roughness={0.4}
            toneMapped={false}
          />
        </mesh>

        {/* Low single-storey wing */}
        <mesh position={[1.1, 0.85, 1.2]} castShadow receiveShadow>
          <boxGeometry args={[2.8, 1, 2]} />
          <meshStandardMaterial color="#dedce4" roughness={0.82} metalness={0.05} />
        </mesh>

        {/* Warm window on the wing (front face) */}
        <mesh position={[1.1, 0.95, 2.21]}>
          <planeGeometry args={[1.8, 0.5]} />
          <meshStandardMaterial
            color={windowGlow.color}
            emissive={windowGlow.emissive}
            emissiveIntensity={windowGlow.intensity}
            roughness={0.4}
            toneMapped={false}
          />
        </mesh>

        {/* Thin canopy slab over the entrance for depth */}
        <mesh position={[-0.7, 2.78, 0.4]} castShadow>
          <boxGeometry args={[2.8, 0.12, 2]} />
          <meshStandardMaterial color="#f6f5fa" roughness={0.7} metalness={0.05} />
        </mesh>
      </group>
    </Float>
  );
}
