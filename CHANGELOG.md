# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
