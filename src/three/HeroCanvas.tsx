"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { StarField } from "@/three/effects/StarField";
import { CoreObject } from "@/three/scenes/CoreObject";

/**
 * HeroCanvas
 *
 * The full-viewport real-time scene behind the hero copy. It is intentionally
 * self-contained and mounted only when WebGL is supported (see HeroCanvasGate).
 *
 * Performance notes:
 * - `dpr={[1, 2]}` caps the pixel ratio so high-density displays don't tank
 *   the frame rate.
 * - Postprocessing is limited to a single Bloom pass for the neon glow.
 */
export function HeroCanvas() {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#05060a"]} />
      <fog attach="fog" args={["#05060a", 6, 14]} />

      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} color="#b15bff" />
      <pointLight position={[-4, -2, -3]} intensity={2} color="#5ef3ff" />

      <Suspense fallback={null}>
        <CoreObject />
        <StarField />
        <Environment preset="night" />
      </Suspense>

      <EffectComposer>
        <Bloom
          intensity={0.9}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}
