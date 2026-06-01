"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { FuturisticHouse } from "@/three/scenes/FuturisticHouse";
import { GradientSky } from "@/three/effects/GradientSky";
import { Aurora } from "@/three/effects/Aurora";
import { Canyon } from "@/three/effects/Canyon";
import { FireflyCarpet } from "@/three/effects/FireflyCarpet";
import { StarField } from "@/three/effects/StarField";
import { Rig } from "@/three/Rig";

/**
 * Experience
 *
 * The persistent, full-viewport WebGL scene rendered as a fixed background.
 * It never unmounts while scrolling; instead the `Rig` flies the camera through
 * the space based on scroll progress, so the same scene tells the whole story.
 *
 * Atmosphere is a twilight canyon: a dusk gradient sky + cyan aurora, dark rock
 * masses framing a luminous white concrete villa, and a dense carpet of pink
 * fireflies that lifts off and disperses on scroll.
 *
 * Performance notes:
 * - `dpr={[1, 1.75]}` caps the pixel ratio on high-density displays.
 * - A single Bloom pass + Vignette keeps postprocessing cheap.
 */
export function Experience() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 2.4, 16], fov: 42 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#0b0e1a"]} />
      {/* Dusky fog so distant rocks melt into the horizon haze. */}
      <fog attach="fog" args={["#2a2536", 14, 60]} />

      {/* Warm dusk key light + cool sky fill + warm interior glow. */}
      <hemisphereLight args={["#3a4a78", "#241a16", 0.7]} />
      <directionalLight
        position={[8, 6, 4]}
        intensity={1.6}
        color="#ffb27a"
        castShadow
      />
      <directionalLight position={[-6, 4, -2]} intensity={0.5} color="#5e86ff" />
      {/* Warm light spilling from inside the villa. */}
      <pointLight position={[0, 1.2, 1.5]} intensity={2} distance={10} color="#ffce8a" />
      {/* Warm canyon under-glow on the flanking rocks. */}
      <pointLight position={[-9, -0.6, 0]} intensity={5} distance={14} color="#ff6a2a" />
      <pointLight position={[9, -0.6, -1]} intensity={5} distance={14} color="#ff6a2a" />
      {/* Cool rim from the aurora side. */}
      <pointLight position={[0, 8, -10]} intensity={2} distance={30} color="#5ef3ff" />

      <Suspense fallback={null}>
        <GradientSky />
        <Aurora />
        <Canyon />
        <FuturisticHouse />
        <FireflyCarpet count={6500} radius={32} />
        <StarField count={1600} radius={60} />
        <Environment preset="night" />
      </Suspense>

      <Rig />

      <EffectComposer>
        <Bloom
          intensity={0.9}
          luminanceThreshold={0.25}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.3} darkness={0.7} />
      </EffectComposer>
    </Canvas>
  );
}
