# Chris Digital Studio — Immersive WebGL Portfolio

> Technical & creative specification.
> Inspiration: [vertex3d.asia](https://www.vertex3d.asia/#homestudio) — immersive, scroll‑driven, real‑time 3D.

---

## 1. Vision

Build an **immersive, cinematic portfolio** for **Chris Digital Studio** (Chris — Creative Developer / Digital Studio).
The experience should feel **futuristic, cosmic and "magic"**: deep space backgrounds, neon light accents,
depth on the Z‑axis, oversized spaced typography, smooth scroll‑driven storytelling and real‑time WebGL scenes.

The goal is not just to *show* work, but to make visitors **experience** it — exactly in the spirit of the
reference site, then progressively personalized.

### Experience principles
- **Immersion first** — every scroll moves the camera / the story forward.
- **Depth** — parallax, fog, particles and the Z‑axis create a sense of space.
- **Restraint** — dark canvas, few but strong accent colors, generous negative space.
- **Performance** — 60fps target on desktop, graceful degradation on mobile / no‑WebGL.

---

## 2. Visual universe

| Token | Direction |
| --- | --- |
| Background | Deep space `#05060a` → radial nebula gradients |
| Accents | Electric cyan `#5ef3ff`, magenta `#b15bff`, soft white `#eaf2ff` |
| Typography | Oversized display headings, wide letter‑spacing (e.g. `E X P E R I E N C E`) |
| Texture | Subtle film grain + bloom/glow (postprocessing) |
| Motion | Eased, weighty, never abrupt; smooth inertia scroll |
| Mood | Cosmic / futuristic / magic |

A persistent fallback screen (**"WEBGL NOT SUPPORTED"**) is shown when WebGL is unavailable.

---

## 3. Sections

The site is a **single immersive page** with 4 scroll‑linked sections (plus a sticky nav + language toggle).

### 3.1 Hero — Immersive intro
- Full‑viewport real‑time 3D scene (central focal object + particle field + fog).
- Oversized headline (adapted from the reference): **"THE IMMERSIVE EXPERIENCE — STUDIO"**.
- Sub‑line about Chris (creative developer, real‑time 3D & web).
- **"Scroll to discover"** cue.

### 3.2 About / Presentation
- Who Chris is, the approach, the philosophy ("the web is flat — we add depth").
- Short, punchy statements revealed on scroll.
- Light 3D / shader accents (no heavy scene).

### 3.3 Projects — 3 sites (cases)
- Three project "cases", each with its own 3D visual/scene and an **"Inspect case"** action.
- **Placeholder content for now** (see data model §5), structured so real content drops in later.

### 3.4 Contact
- A contact **form that pre‑fills a `mailto:`** (name, subject, message → encoded mailto link).
- An **inline Calendly embed** to book a call.
- Social / footer links.

---

## 4. Tech stack

| Concern | Choice |
| --- | --- |
| Language | **TypeScript** (strict, no `any`) |
| Framework | **Next.js** (App Router) + **React** |
| 3D / WebGL | **three**, **@react-three/fiber**, **@react-three/drei**, **@react-three/postprocessing** |
| Smooth scroll | **lenis** |
| Scroll animation | **gsap** + **ScrollTrigger** |
| UI transitions | **framer-motion** |
| Styling | **Tailwind CSS** |
| i18n (FR/EN) | **next-intl** |
| Deployment | **Vercel** |
| Backend | None for v1 (no Supabase). Contact is `mailto:` + Calendly. |

> Supabase remains an *optional future* path (e.g. storing contact submissions / a CMS) but is **not** part of v1.

---

## 5. Data model

```ts
// src/types/project.ts
export type LocalizedText = {
  fr: string;
  en: string;
};

export interface Project {
  /** Stable identifier, used for routing / anchors. */
  id: string;
  title: LocalizedText;
  /** Short tagline shown on the case card. */
  tagline: LocalizedText;
  description: LocalizedText;
  /** Tech / tags displayed as chips. */
  tags: string[];
  /** External link ("Inspect case"). Optional while placeholder. */
  url?: string;
  /** Preview asset (image or video) for the case. */
  poster?: string;
  /** Accent color used by the 3D scene for this case. */
  accent: string;
}
```

Projects are stored in a typed array (`src/data/projects.ts`) with **3 placeholder entries**.

---

## 6. Architecture

```
chris-digital-studio/
├─ docs/
│  └─ SPEC.md
├─ public/
│  └─ assets/                # textures, posters, models
├─ messages/
│  ├─ fr.json                # i18n dictionaries
│  └─ en.json
├─ src/
│  ├─ app/
│  │  ├─ [locale]/
│  │  │  ├─ layout.tsx
│  │  │  └─ page.tsx         # composes the sections
│  │  └─ globals.css
│  ├─ components/
│  │  ├─ layout/             # Nav, Footer, LanguageToggle
│  │  ├─ sections/           # Hero, About, Projects, Contact
│  │  └─ ui/                 # buttons, primitives
│  ├─ three/
│  │  ├─ Canvas3D.tsx        # shared R3F canvas + fallback
│  │  ├─ scenes/             # HeroScene, ProjectScene…
│  │  └─ effects/            # postprocessing, particles
│  ├─ hooks/                 # useLenis, useScrollProgress…
│  ├─ data/
│  │  └─ projects.ts
│  ├─ types/
│  │  └─ project.ts
│  └─ i18n/                  # next-intl config & routing
├─ AGENTS.md
├─ CHANGELOG.md
├─ next.config.ts
├─ tailwind.config.ts
├─ tsconfig.json
└─ package.json
```

---

## 7. Animation & scroll plan

- **Lenis** drives a global smooth/inertia scroll; its progress feeds GSAP **ScrollTrigger** and R3F.
- Each section pins / reveals on scroll; the **hero camera** dollies along the Z‑axis as the user scrolls.
- Project cases enter with depth + parallax; the active case drives its 3D scene's accent color.
- UI micro‑interactions (links, buttons, toggles) handled by **framer-motion**.
- All scroll/animation code that is non‑obvious must be **commented in English** with the rationale.

---

## 8. Internationalization (FR / EN)

- `next-intl` with a `[locale]` segment (`/fr`, `/en`); default locale **fr**.
- All copy lives in `messages/fr.json` and `messages/en.json`.
- A visible **language toggle** in the nav switches locale, preserving scroll position where possible.

---

## 9. Accessibility & performance

- Respect **`prefers-reduced-motion`**: disable heavy motion / smooth scroll, keep content reachable.
- **No‑WebGL fallback** screen ("WEBGL NOT SUPPORTED") with the core message still readable.
- Lazy‑load 3D scenes; suspend with lightweight loaders; cap pixel ratio on mobile.
- Semantic HTML, focus states, alt text on posters, sufficient contrast for text.
- Performance budget: fast first paint, defer non‑critical 3D assets.

---

## 10. Roadmap

| Phase | Scope |
| --- | --- |
| **P1** | Scaffolding: Next.js + TS (strict) + Tailwind + i18n + base layout |
| **P2** | Hero WebGL scene + no‑WebGL fallback + smooth scroll |
| **P3** | Projects section: 3 placeholder cases + per‑case 3D accents |
| **P4** | About + Contact (mailto pre‑fill + Calendly embed) |
| **P5** | Polish: postprocessing, grain/bloom, reduced‑motion, mobile tuning |
| **P6** | Deploy to Vercel |

---

## 11. Conventions

Engineering conventions (commenting, changelog, versioning, no `any`, atomic commits, documenting complex code)
are defined in [`AGENTS.md`](../AGENTS.md) and must be followed throughout.
