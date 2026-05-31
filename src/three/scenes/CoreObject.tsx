"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import type { Mesh } from "three";

/**
 * CoreObject
 *
 * The hero's central focal element: a slowly morphing icosahedron rendered
 * with a distortion material to feel organic and "alive". `Float` adds a gentle
 * idle motion so the object never looks static even when the user is still.
 */
export function CoreObject() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.15;
    meshRef.current.rotation.z += delta * 0.05;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.1}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.35, 12]} />
        <MeshDistortMaterial
          color="#7aa2ff"
          emissive="#5ef3ff"
          emissiveIntensity={0.35}
          roughness={0.15}
          metalness={0.9}
          distort={0.35}
          speed={1.6}
        />
      </mesh>
    </Float>
  );
}
