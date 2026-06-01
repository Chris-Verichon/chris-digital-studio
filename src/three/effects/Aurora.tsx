"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, ShaderMaterial } from "three";

/**
 * Aurora
 *
 * A soft cyan light curtain arcing across the upper sky, behind the house.
 * Built as a single additive plane whose alpha is shaped by a procedural
 * "curtain" pattern, so it shimmers gently without any texture asset.
 */
export function Aurora() {
  const materialRef = useRef<ShaderMaterial>(null);

  const material = useMemo(() => {
    return new ShaderMaterial({
      transparent: true,
      depthWrite: false,
      fog: false,
      blending: AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec2 vUv;
        uniform float uTime;

        // Layered sine streaks give the vertical "curtain" shimmer.
        float curtain(float x) {
          float a = sin(x * 7.0 + uTime * 0.25) * 0.5 + 0.5;
          float b = sin(x * 15.0 - uTime * 0.18) * 0.5 + 0.5;
          float c = sin(x * 3.0 + uTime * 0.12) * 0.5 + 0.5;
          return a * 0.5 + b * 0.3 + c * 0.4;
        }

        void main() {
          // Concentrate the glow in a horizontal band, fading top and bottom.
          float band = smoothstep(0.0, 0.45, vUv.y) * smoothstep(1.0, 0.5, vUv.y);
          // Arc: lift the band in the middle so it reads as a gentle curve.
          float arc = 1.0 - pow(abs(vUv.x - 0.5) * 1.7, 2.0);
          arc = clamp(arc, 0.0, 1.0);
          float streak = curtain(vUv.x);
          float alpha = band * arc * streak;
          vec3 col = mix(vec3(0.12, 0.55, 0.85), vec3(0.45, 0.95, 1.0), streak);
          gl_FragColor = vec4(col, alpha * 0.5);
        }
      `,
    });
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh
      position={[0, 11, -34]}
      rotation={[0.12, 0, 0]}
      material={material}
      ref={(mesh) => {
        if (mesh) materialRef.current = mesh.material as ShaderMaterial;
      }}
    >
      <planeGeometry args={[80, 34, 1, 1]} />
    </mesh>
  );
}
