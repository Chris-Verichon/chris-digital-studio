/**
 * Scroll progress store.
 *
 * A tiny module-level singleton that bridges the DOM scroll world (driven by
 * Lenis) and the React Three Fiber render loop, which live in separate React
 * trees and therefore cannot share state through context.
 *
 * Why a singleton instead of a context/zustand store:
 * - The R3F `useFrame` loop reads the value every frame; a plain mutable read
 *   (`scrollProgress.get()`) avoids re-renders and is the cheapest possible path.
 * - The DOM side writes the smoothed scroll progress once per scroll event.
 */
type Listener = (progress: number) => void;

let progress = 0;
const listeners = new Set<Listener>();

export const scrollProgress = {
  /** Latest normalized scroll progress in the [0, 1] range. */
  get: (): number => progress,
  set: (value: number): void => {
    progress = Math.min(1, Math.max(0, value));
    listeners.forEach((listener) => listener(progress));
  },
  subscribe: (listener: Listener): (() => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};
