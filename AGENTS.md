# AGENTS.md — Engineering Conventions

These rules apply to **all** contributions in this repository (humans and AI agents).

## Code quality
- Write **readable, clear code**. Document **only when it adds value** — keep it light so the code stays readable.
- **All comments are written in English.**
- Favor a **readable and maintainable architecture** (clear module boundaries, small focused files).
- **No `any` in TypeScript.** Use `strict` mode and explicit, accurate types. Prefer `unknown` + narrowing over `any`.

## Documenting complexity
- Any **non‑trivial algorithm or complex code** must be **explained**, and the **chosen approach documented**
  (why this solution over alternatives, trade‑offs, constraints).

## Versioning
- **Professional versioning** following **Semantic Versioning** (`MAJOR.MINOR.PATCH`).
- **Every new branch / feature bumps the version** and updates the changelog accordingly.
  - `feat/*` → minor bump · `fix/*` → patch bump · breaking change → major bump.

## Changelog
- Maintain a **professional changelog in English** in `CHANGELOG.md`,
  following the [Keep a Changelog](https://keepachangelog.com/) format.
- **Each branch** introduces an **incremented version entry** and its changelog update.

## Git & commits
- **Atomic commits**: one coherent change per commit for a clean, readable git tree.
- Avoid excessive **micro‑commits** — group related changes sensibly without over‑splitting.
- Use clear, conventional commit messages in English (e.g. `feat: add hero webgl scene`).
