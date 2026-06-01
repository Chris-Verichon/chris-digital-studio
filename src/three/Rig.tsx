"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { scrollProgress } from "@/three/scrollStore";

/**
 * Camera keyframes describing the scroll journey around the house.
 * Each entry pairs a camera position with the point it looks at. The rig
 * interpolates between consecutive keyframes based on scroll progress, which
 * keeps the choreography declarative and easy to retune.
 */
type Keyframe = {
  /** Normalized scroll position where this keyframe is reached. */
  at: number;
  position: [number, number, number];
  lookAt: [number, number, number];
};

const KEYFRAMES: Keyframe[] = [
  { at: 0.0, position: [0, 2.4, 16], lookAt: [0, 1.2, 0] }, // hero: house far away
  { at: 0.28, position: [5.5, 1.6, 8], lookAt: [0, 1.4, 0] }, // about: swing right, approach
  { at: 0.55, position: [-6, 3.2, 5.5], lookAt: [0, 1.6, 0] }, // work: orbit left & up
  { at: 0.8, position: [0, 1.1, 4.2], lookAt: [0.4, 1.1, 0] }, // closer front
  { at: 1.0, position: [0, 0.8, 3.2], lookAt: [0.3, 0.9, 0] }, // contact: settle
];

/**
 * Finds the two keyframes surrounding the current progress and returns the
 * local interpolation factor between them.
 */
function resolveSegment(progress: number): {
  from: Keyframe;
  to: Keyframe;
  t: number;
} {
  for (let i = 0; i < KEYFRAMES.length - 1; i += 1) {
    const from = KEYFRAMES[i];
    const to = KEYFRAMES[i + 1];
    if (progress <= to.at) {
      const span = to.at - from.at || 1;
      const t = (progress - from.at) / span;
      return { from, to, t: Math.min(1, Math.max(0, t)) };
    }
  }
  const last = KEYFRAMES[KEYFRAMES.length - 1];
  return { from: last, to: last, t: 1 };
}

// Smoothstep easing for organic acceleration between keyframes.
const ease = (t: number): number => t * t * (3 - 2 * t);

/**
 * Rig
 *
 * Drives the camera along the keyframe path from the shared scroll store and
 * adds a subtle pointer parallax. Damped each frame so the motion stays smooth
 * even if scroll progress jumps.
 */
export function Rig() {
  const { camera, pointer } = useThree();
  const targetPosition = useRef(new Vector3(0, 2.4, 16));
  const targetLookAt = useRef(new Vector3(0, 1.2, 0));
  const currentLookAt = useRef(new Vector3(0, 1.2, 0));

  useFrame((_, delta) => {
    const progress = scrollProgress.get();
    const { from, to, t } = resolveSegment(progress);
    const k = ease(t);

    // Interpolate position and look-at target between the two keyframes.
    targetPosition.current.set(
      from.position[0] + (to.position[0] - from.position[0]) * k,
      from.position[1] + (to.position[1] - from.position[1]) * k,
      from.position[2] + (to.position[2] - from.position[2]) * k,
    );
    targetLookAt.current.set(
      from.lookAt[0] + (to.lookAt[0] - from.lookAt[0]) * k,
      from.lookAt[1] + (to.lookAt[1] - from.lookAt[1]) * k,
      from.lookAt[2] + (to.lookAt[2] - from.lookAt[2]) * k,
    );

    // Pointer parallax: small camera offset driven by the cursor.
    targetPosition.current.x += pointer.x * 0.6;
    targetPosition.current.y += pointer.y * 0.4;

    // Frame-rate independent damping toward the targets.
    const damp = 1 - Math.pow(0.0015, delta);
    camera.position.lerp(targetPosition.current, damp);
    currentLookAt.current.lerp(targetLookAt.current, damp);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
