# Changelog · Vergina Imperial

Las versiones siguen [Semantic Versioning](https://semver.org/lang/es/). Solo se documentan cambios visibles para consumidores (tokens, primitivas, atmósfera, tipografía, reglas de aplicación). Cambios internos (CI, scripts, refactors) viven en `git log`.

---

## [0.2.2] · 2026-04-26 — Tipografía Inter Variable

### Cambiado

- **Tipografía unificada en Inter Variable** (Google Fonts, weights 400–900). Cubre `--font-sans` y `--font-display` como misma familia. Razón: legibilidad superior en pantallas densas (dashboards Controlink/alexendros.pro), antialiasing limpio en displays no-retina, y unificación de stack (un único axis variable evita FOIT/FOUT mixed).
- `colors_and_type.css` — variables `--font-sans` y `--font-display` ahora apuntan a `"Inter", "Inter Variable", -apple-system, ...`.
- `colors_and_type.css` — `font-feature-settings` ampliado a `"cv05","cv11","ss01","ss02","rlig","calt"` para activar alts estilísticos de Inter (`l` simple, `0` tachado, `a` single-storey, `g` geométrico) y ligaduras contextuales.
- `colors_and_type.css` — añadido `-moz-osx-font-smoothing: grayscale` junto al ya existente `-webkit-font-smoothing: antialiased`.
- `Atelier de Revisión.html` — link Google Fonts migrado a Inter (preservando familias secundarias para muestras editoriales: Cinzel, Cormorant, Italiana, Marcellus, Caveat, Patrick Hand).
- `index.html` — ya usaba Inter desde la migración previa, sincronizado.
- README — badge de versión `0.2.0 → 0.2.2`.

### Descatalogado

- **Outfit** (display + sans en v0.2.1). Razón operador (2026-04-26): consensuado a Inter por consistencia ecosistema y mejor antialiasing.
- **Bricolage Grotesque** (display en v0.2.0). Razón heredada de v0.2.1: humanismo no metalizable.
- **Manrope** (sans en v0.2.0). Razón heredada de v0.2.1: x-height alta pero familia distinta del display, fragmenta peso de carga.

### Migración para consumidores

- Repos Next.js: en `app/layout.tsx` reemplazar `import { Outfit, ... }` por `import { Inter, ... }`. Eliminar el array `weight: [...]` para activar el axis variable completo:
  ```diff
  - import { Outfit, JetBrains_Mono } from "next/font/google";
  + import { Inter, JetBrains_Mono } from "next/font/google";
  - const sans = Outfit({ subsets: ["latin"], variable: "--font-sans", weight: ["400","500","600","700","800"] });
  + const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
  ```
- HTML estático: cambiar el `<link>` Google Fonts a `family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap`.
- Si tu CSS local declara `--font-display: "Outfit", ...` o `"Bricolage Grotesque", ...`, sustituir por `"Inter", "Inter Variable", -apple-system, sans-serif`.
- `scripts/validate-tokens.mjs` reportará referencias a Outfit/Bricolage/Manrope en repos consumidores como warnings durante la transición; se promueven a errors en v0.3.0.

### Notas

- El sistema de **5 capas** (tokens · atmósfera · glass · display · acento) sigue invariante. Solo cambia el family declarado en la capa 4 (display).
- WCAG AA mantiene cumplimiento — Inter weight 400 sobre `--color-surface-0` da contraste 17.45:1 (text-primary).
- Pesos sugeridos: 600 para `h1.display` (no 700 — Inter en 700 sobre atmósfera tiende a sentirse pesado), 600 para `h1..h4`, 500 para `.ds-label`, 400 para body.

---

## [0.2.1] · 2026-04-22 — Outfit (transitorio)

### Cambiado

- Tipografía display + sans unificada en **Outfit** (Google Fonts) reemplazando Bricolage Grotesque + Manrope. Razón: Bricolage tenía curvas humanistas no metalizables; Outfit ofrecía neogrotesque sobria con axis variable.

### Notas

Versión transitoria. Reemplazada por v0.2.2 con Inter por consistencia ecosistema. Mantenida en CHANGELOG por trazabilidad.

---

## [0.2.0] · 2026-04-12 — Atmósfera unificada · acentos metalizados

### Añadido

- **Sistema de 5 capas** documentado en `SKILL.md`: tokens + atmósfera (4 divs) + glass primitive + tipografía display + acento por superficie.
- **Atmósfera púrpura pretoriana** (hue 315) — 4 capas fijas (`.atm`, `.spark`, `.dust`, `.vignette`) en `color_modes.css`.
- **Acentos metálicos** — Oro Vergina (`data-accent="gold"`, hue 85) y Titanio (`data-accent="titanium"`, hue 270, chroma ≤ 0.012). Reglas de superficie y ejemplos de aplicación.
- **Glass primitive** para `.card` y `[data-slot="card"]` — atmósfera atraviesa el cristal.
- `CHANGELOG.md` formal (este archivo, retrocompatible al alta).

### Descatalogado

- **Gama Abisal** — productos migran a `data-accent="titanium"`.
- Aliases `[data-theme="solar|ultramar|vergina|abisal|pretoriano"]` — reemplazados por `data-mode` + `data-accent`.

---

## Convenciones

- Versión `0.x.y` mientras la marca itera; `1.0.0` cuando se congele para uso externo.
- `BREAKING:` en cabecera de cambio cuando consumidores deban actualizar.
- Cada cambio cita el motivo (decisión técnica + autor humano cuando aplique).
