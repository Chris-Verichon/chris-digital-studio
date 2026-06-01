# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2026-05-31

### Added
- **Twilight-canyon atmosphere**: a procedural dusk gradient sky (`GradientSky`)
  and an additive cyan **aurora** curtain (`Aurora`) shimmering behind the scene.
- **Canyon** environment: a dark ground plane with low-poly rock masses framing
  the composition, lit by warm under-glow lights.
- Pointer reactivity on the firefly carpet: a smoothed parallax offset so the
  particles drift with the mouse, with nearer fireflies reacting more for depth.

### Changed
- The center house is now a **luminous white concrete villa** (stacked solid
  volumes with warm interior windows) instead of a neon glass wireframe.
- Denser firefly carpet (6500 particles) and warmer dusk lighting, fog and
  postprocessing tuning across `Experience` for a softer, cinematic look.

### Removed
- `DepthField` neon grid floor, superseded by the `Canyon` ground.

## [0.2.0] - 2026-05-31

### Added
- Scroll-driven immersive experience: a persistent, full-viewport WebGL scene
  rendered as a fixed background while the content scrolls over it.
- Procedural **futuristic house** at the center (glass volumes with glowing neon
  edges, emissive windows, support pillars and an orbital ring).
- Depth field: an infinite receding neon grid floor plus a tunnel of rings the
  camera flies through, with motion modulated by scroll velocity.
- Cinematic camera rig animated along keyframes from a shared scroll-progress
  store, with pointer parallax and frame-rate independent damping.
- Bloom + vignette postprocessing for the holographic glow.

### Changed
- `SmoothScroll` now publishes the smoothed scroll progress to a shared store so
  the WebGL camera stays in sync (works on the reduced-motion path too).
- Hero section reduced to overlay copy; the 3D scene is now global, not per-section.
- Contact form and project cards use backdrop blur for readability over the scene.

### Removed
- Per-section hero canvas (`HeroCanvas`, `HeroCanvasGate`, `CoreObject`),
  superseded by the global `Experience`.

## [0.1.0] - 2026-05-31

### Added
- Initial immersive WebGL portfolio scaffold for **Chris Digital Studio**.
- Next.js (App Router) + TypeScript (strict) + Tailwind CSS v4 setup.
- Bilingual FR/EN internationalization via `next-intl` with a `[locale]` segment
  and a language toggle.
- Smooth, inertia-based scrolling (`lenis`) bridged with GSAP `ScrollTrigger`.
- Hero section with a real-time React Three Fiber scene (morphing core object,
  additive particle star field, bloom postprocessing) and a "WEBGL NOT SUPPORTED"
  fallback driven by runtime feature detection.
- About, Work (three placeholder cases) and Contact sections.
- Contact options: a form that pre-fills a `mailto:` link and an inline Calendly embed.
- Accessibility: `prefers-reduced-motion` support across motion and smooth scroll.
- Project specification in `docs/SPEC.md` and engineering conventions in `AGENTS.md`.
