# Manual de Diseño · Vergina Imperial

> Una atmósfera. Dos brillos. Un sistema.

[![License: All rights reserved](https://img.shields.io/badge/license-all%20rights%20reserved-333.svg)](LICENSE)
[![Validate](https://github.com/Alexendros/design-system_vergina-imperial/actions/workflows/validate.yml/badge.svg)](https://github.com/Alexendros/design-system_vergina-imperial/actions/workflows/validate.yml)
[![Version](https://img.shields.io/badge/version-0.2.0-A87BD8.svg)](CHANGELOG.md)

Manual de diseño dark-first y de acabado alto para la marca **Alexendros**. El producto se llama **Vergina Imperial** — **V**ergina (oro) sobre **A**tmósfera **P**retoriana, opcionalmente recubierto de **titanio** cuando el dominio es maquinaria, no memoria.

El sistema es implementación-agnóstico: vive como tokens, guías y UI de referencia. Los consumidores (webs de marketing, aplicaciones, dashboards) componen desde aquí.

---

## El sistema en una frase

- **Atmósfera siempre púrpura.** Pretoriana aterciopelada — habita el fondo en focos, gradientes radiales, polvo, viñeta. Nunca se aplica al primer plano como color saturado.
- **Acentos siempre metálicos.** Dos brillos coexisten: oro Vergina (cálido, hue 85) y titanio (gris perla, hue 270, chroma ≤ 0.012). El acento se elige a nivel de **superficie**, no de componente.
- **Paneles siempre transparentes.** Glassmorphism es la regla por defecto: la atmósfera atraviesa el cristal. Solo se pinta plano cuando la densidad de información lo exige.

---

## Cuándo oro, cuándo titanio

Decisión por dominio del producto, no por gusto visual. Una vista entera vive en un solo metal.

| | **Oro Vergina** | **Titanio** |
|---|---|---|
| Carácter | Memoria, valor, firma, declaración | Maquinaria, dato, telemetría, frialdad |
| Aplica a | Manuales, archivo, marca personal, marketing identitario | Dashboards, command centers, gráficas densas, instrumentación |
| Ejemplos | `alexendros.me`, este manual, cartas de principios, decks identitarios | `alexendros.pro`, Controlink Command Center, paneles de mando |
| Cifras | Premio, trofeo, hito | Métrica, ratio, contador |
| Botón | "Comprometerse", "Publicar", "Firmar" | "Ejecutar", "Reiniciar", "Procesar" |
| Token | `data-accent="gold"` (default) | `data-accent="titanium"` |

**Regla de superficie.** El acento es propiedad de la pantalla, no del componente individual. Si tienes que mezclar oro y titanio en el mismo viewport, has confundido dos productos en uno.

**Regla de identidad.** Los productos se nombran y se pintan a la vez. Cambiar el acento de un producto vivo equivale a un rebrand — no se hace por estética.

---

## Activación

```html
<!-- Default — dark + oro Vergina -->
<html>

<!-- Explícito -->
<html data-mode="dark" data-accent="gold">

<!-- Titanio sobre dark -->
<html data-mode="dark" data-accent="titanium">

<!-- Light alabastro con oro envejecido -->
<html data-mode="light" data-accent="gold">
```

`data-mode` cambia base (oscura `dark` o alabastro `light`). `data-accent` cambia el metal. Sin atributos, el sistema arranca en `dark` + `gold`.

---

## Getting started

This repository is consumed, not installed. Three modes are supported:

**A · Direct copy.** Copia `colors_and_type.css` y `color_modes.css` a tu proyecto y haz `@import`. Setea `data-accent` y `data-mode` en `<html>` o un root scoped.

**B · Git submodule.**

```bash
git submodule add git@github.com:Alexendros/design-system_vergina-imperial.git vendor/vergina-imperial
```

**C · Claude Code skill.** El repo trae `SKILL.md` con `user-invocable: true`. Symlink en `~/.claude/skills/vergina-imperial/` y se invoca con `/vergina-imperial`.

CI ejecuta dos validadores:

```bash
node scripts/validate-tokens.mjs src/
node scripts/validate-contrast.mjs src/styles/
```

---

## Brand model

- **Name:** Alexendros
- **Archetype:** The Craftsman crossed with The Magician — silent transformation. Never the Jester, never the Everyman.
- **Reference level:** Linear, Vercel, Arc Browser, Raycast, Stripe Docs, Rauno Freiberg's `build-ui`. **Not** Material, Bootstrap, ni Shadcn sin afilar.
- **Voice:** precisa, sobria, sin signos de admiración, sin emoji en UI (ok en docs largas). Microcopy en infinitivo o sustantivo corto.
- **Principios estéticos no negociables:**
  1. **Dark-first, no dark-también.** Light es traducción material, no simetría.
  2. **Profundidad por luminosidad, no por sombra.** Sombras solo en overlays.
  3. **Atmósfera atraviesa.** Glass por defecto; sólido solo cuando el contenido lo exige.
  4. **Movimiento con intención.** Easings custom; nunca el `ease-in-out` del navegador. 120–240 ms típico.
  5. **Densidad alta de información.** Padding compacto Linear-style, no marketing Apple.
  6. **Cero decoración gratuita.** Si un gradiente no comunica estado o jerarquía, se borra.

## Anti-aesthetic explícito

Sin neumorfismo. Sin glass barato (blur sin plano semántico detrás — el glass del sistema siempre atraviesa la atmósfera, no flota en el vacío). Sin sombras coloreadas. Sin bordes 2px. Sin emoji-as-iconos. Sin gradientes arcoíris.

---

## Index

| Path | Qué |
|---|---|
| `README.md` | Este fichero — manifiesto y entrada al sistema. |
| `vergina-imperial.md` | Guía de aplicación profunda: voz, color, tipografía, componentes. |
| `SKILL.md` | Entrypoint para Claude Code. |
| `colors_and_type.css` | Tokens de tipografía, spacing, radii, motion, z-index, info semantic. |
| `color_modes.css` | Atmósfera (dark/light) + acentos (gold/titanium). |
| `fonts/` | Geist y Geist Mono variable `.woff2`. |
| `assets/` | Logos, marcas, imagery de referencia. |
| `showcase.html` | Vitrina viva del sistema — atmósfera, glass, ambos brillos lado a lado. |
| `slides/` | Deck de muestra del sistema unificado (12 slides). |
| `index.html` | Portada navegable del manual. |

---

## Brand primary vs high-contrast

Cada acento expone dos tokens que **no** son intercambiables:

- `--color-brand-primary` — anchor de identidad. Fills, focus rings, glow, decoración. Calibrado a verdad material (oro batido, titanio cepillado). No siempre cumple WCAG body-text.
- `--color-brand-primary-hc` — sibling WCAG-safe. Misma familia, lightness desplazada para ≥ 4.5:1 sobre `surface-0`. En dark, oro y titanio ya cumplen AA — `-hc` = `-primary`.

| Acento | Mode | `brand-primary` | `brand-primary-hc` | AA sobre surface-0 |
|---|---|---|---|---|
| Gold | dark | `oklch(0.78 0.165 85)` | _idem_ | 9.85 : 1 |
| Gold | light | `oklch(0.60 0.15 75)` | `oklch(0.44 0.15 72)` | 5.04 : 1 |
| Titanium | dark | `oklch(0.86 0.012 270)` | _idem_ | ~ 10 : 1 |
| Titanium | light | `oklch(0.55 0.012 260)` | `oklch(0.42 0.014 255)` | ~ 5.4 : 1 |

Regla: **`-primary` pinta la marca, `-hc` escribe con ella.**

---

## Visual foundations

**Atmósfera.** Tres capas radiales (haze frío en una esquina, velvet aterciopelado en la opuesta, viñeta exterior) sobre `--color-surface-0` púrpura profundo. Encima, polvo metálico (oro o titanio según `data-accent`) en `mix-blend-mode: screen`. Documentado en `slides/TitleSlide.jsx` como `<PurpleAtmosphere>`.

**Glass.** Primitive `<GlassCard>`. `backdrop-filter: blur(20px) saturate(140%)` + borde `oklch(1 0 0 / 0.08)` + inner-highlight superior + sombra exterior larga. Tokens vivos en `--glass-bg`, `--glass-border`, `--glass-blur`, `--glass-shadow`.

**Shimmer vertical.** Texto metalizado sobre tipografía grande (cifras, números de sección). Usar `<GradientText direction="shimmer">` o aplicar la clase `.vap-shimmer` — hereda automáticamente `--accent-shimmer` del ancestro `[data-accent]`.

**Fade tipográfico.** Para cierres de título, citas y mensajes finales: `<GradientText direction="fade-down">` desvanece el carácter de arriba a abajo, fundiéndolo en la atmósfera. Gesto de eco — usar con moderación.

**Type.** `Geist` (sans + mono) variable, woff2 desde `/fonts`. Fluid scale `clamp()` de `--text-xs` a `--text-display`. Display tracking `-0.035em`. Body `-0.005em`. Mono `0`.

**Spacing.** 4px rigid grid. `--space-1` (4px) → `--space-24` (96px). Sin valores literales en componentes.

**Backgrounds.** La atmósfera púrpura es el único "fondo" que renderiza el sistema. Cero fotografía full-bleed en chrome. Cero texturas repetidas. Cero ilustraciones a mano.

**Motion.** Easings custom (`--ease-out-expo`, `--ease-out-quart`, `--ease-spring`). Default `ease-in-out` prohibido. 80 ms hover; 120–180 ms transición; 240 ms overlay; 400 ms hero. `prefers-reduced-motion` colapsa todo.

**Hover/press/focus.** Hover = +0.02 L. Press = -0.02 L + `translateY(1px)` solo en icon-only. Focus = `:focus-visible` ring 2px en `var(--accent)` con offset 2px. Nunca suprimido.

**Borders.** 1px único. Tres niveles: `--color-border-subtle | default | strong`. 2px prohibido.

**Shadows.** Solo overlays (Dialog, Popover, Toast, Tooltip). Cards no llevan shadow — la profundidad la da `+0.02 L` + `--shadow-inner-highlight`.

**Radii.** `--radius-md` (8px) default. `sm` (6px) inline. `lg` (12px) cards. `xl` (16px) modals + glass. `full` avatares. `xs` (4px) tooltips.

**Layout.** Content max 1280px. Gutters via `clamp()`. Sticky chrome ≤ 56px desktop / 44px mobile.

**Imagery.** Frío, alto contraste, desaturado, grano ≤ 2%. Sin sol cálido. Sin personas con producto. Texturas materiales abstractas (basalto, musgo, metal patinado) sobre lo figurativo. Resistente a greyscale.

---

## Iconography

**Lucide** como set canónico. 20px default, stroke 1.75px, `currentColor`. Nunca rellenos. Nunca dos tonos.

| Contexto | Tamaño |
|---|---|
| Inline / tabla densa | 16 px |
| Nav item / botón estándar | 20 px |
| Item con target generoso | 24 px |
| Empty state | 32 px |

Icon hereda `currentColor` (botón hereda color del texto; standalone usa `--color-text-secondary` rest, `--color-text-primary` hover).

**Prohibido:** emoji-as-icon, unicode-as-icon (`→`, `✓`, `★`), mezclar sets, stroke ≠ 1.75px en la misma superficie. El logomark de Alexendros es la única glifo no-Lucide en chrome.

---

## Consumidores

| Producto | Acento | Estado | Nota |
|---|---|---|---|
| [alexendros.me](https://alexendros.me) | gold | live | Memoria y manuales. |
| [alexendros.pro](https://alexendros.pro) | titanium | live | Superficie técnica. |
| Controlink | titanium | WIP | Command Center organizacional. |
| Afiladocs | gold | draft | Pendiente. |

Abrir PR para añadir consumidor: URL, acento elegido, justificación del dominio.

---

## Repo y skill · la dualidad

El mismo árbol de ficheros cumple dos roles:

- **Repositorio** — clonable, submoduleable, consumible desde cualquier proyecto CSS.
- **Skill de Claude Code** — `SKILL.md` raíz declara `user-invocable: true`. Un symlink desde `~/.claude/skills/vergina-imperial/` lo activa globalmente; `/vergina-imperial` genera interfaces respetando estos tokens.

Ambos modos leen los mismos ficheros. Cero duplicación. Un commit en `main` mueve las dos vistas.

---

## Deprecations

A partir de **v0.2.0** desaparece la gama **Abisal** y los aliases legacy `[data-theme="solar"]`, `[data-theme="ultramar"]`, `[data-theme="vergina"]`, `[data-theme="abisal"]`, `[data-theme="pretoriano"]`. La activación se hace con `data-accent` (no `data-theme`). Consultar `MIGRATION.md` para la guía de migración.

