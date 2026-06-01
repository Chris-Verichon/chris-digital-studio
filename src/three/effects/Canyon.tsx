"use client";

import { useMemo } from "react";
import { Color } from "three";

type Rock = {
  position: [number, number, number];
  scale: [number, number, number];
  rotation: [number, number, number];
  detail: number;
};

/**
 * Canyon
 *
 * The grounded environment that replaces the abstract neon grid: a dark ground
 * plane plus a handful of low-poly rock masses framing the scene left and right,
 * evoking the canyon silhouette of the reference experience. The rocks stay dark
 * and let the warm rim lights (in Experience) and the dusk fog do the work, so
 * distant geometry melts into the horizon haze.
 */
export function Canyon() {
  const rocks = useMemo<Rock[]>(() => {
    // Hand-placed forms: two flanking ridges and a few scattered boulders.
    return [
      { position: [-11, -1.4, -6], scale: [6, 4.5, 6], rotation: [0.2, 0.6, 0.1], detail: 0 },
      { position: [-9, -1.6, -1], scale: [4, 3, 4], rotation: [0.1, 1.2, 0.3], detail: 0 },
      { position: [11.5, -1.3, -7], scale: [6.5, 5, 6], rotation: [0.15, -0.5, -0.1], detail: 0 },
      { position: [9.5, -1.6, -1.5], scale: [4.5, 3.2, 4], rotation: [0.2, -1.1, 0.2], detail: 0 },
      { position: [0, -1.9, -16], scale: [9, 4, 7], rotation: [0, 0.3, 0], detail: 0 },
      { position: [-4, -1.9, 7], scale: [2.4, 1.6, 2.4], rotation: [0.4, 0.8, 0.2], detail: 0 },
      { position: [5, -1.9, 8], scale: [2.8, 1.8, 2.6], rotation: [0.3, -0.6, 0.1], detail: 0 },
    ];
  }, []);

  const rockColor = useMemo(() => new Color("#231b1a"), []);

  return (
    <group>
      {/* Dark ground plane the fireflies rest on. */}
      <mesh position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#161320" roughness={0.95} metalness={0.05} />
      </mesh>

      {/* Low-poly rock masses framing the composition. */}
      {rocks.map((rock, index) => (
        <mesh
          key={index}
          position={rock.position}
          rotation={rock.rotation}
          scale={rock.scale}
          castShadow
        >
          <icosahedronGeometry args={[1, rock.detail]} />
          <meshStandardMaterial
            color={rockColor}
            roughness={1}
            metalness={0}
            flatShading
          />
        </mesh>
      ))}
    </group>
  );
}
