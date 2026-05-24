# Vergina Imperial — Enterprise Design System

> Version: 0.2.2  
> Last Updated: 2026-05-24  
> Status: PUBLISHED  
> Repository: `github.com/Alexendros/design-system_vergina-imperial`  
> License: All rights reserved

---

## 1. Brand Foundation

### Design Principles

1. **Una atmósfera.** Púrpura pretoriana aterciopelada. Vive en el fondo — focos radiales, gradientes, polvo metálico, viñeta. Nunca se aplica al primer plano como color saturado.
2. **Dos brillos.** Oro Vergina (cálido, hue ~85) y titanio (gris perla, hue ~270, chroma ≤ 0.012). Coexisten en el sistema; no en la misma pantalla.
3. **Un sistema.** Glassmorphism por defecto en paneles y cards — la atmósfera atraviesa el cristal. Plano solo cuando la densidad lo exige.

### Brand Attributes

| Attribute | Expression in UI |
|-----------|-----------------|
| Memoria | Oro Vergina en superficies identitarias — manuales, archivos, firmas |
| Maquinaria | Titanio en superficies técnicas — dashboards, telemetría, datos |
| Pretoriano | Púrpura aterciopelada como atmósfera base en todos los modos |
| Alabastro | Modo bright — superficie cálida tintada en oro/ámbar, nunca blanco puro |

### Domain-Driven Accent Selection

| Domain | Accent | Products |
|--------|--------|----------|
| Identitario / Memoria | `gold` | alexendros.me, manuales, cartas de principios, decks |
| Técnico / Instrumental | `titanium` | alexendros.pro, Controlink, command centers |

**Regla de superficie:** Una vista entera vive en un solo metal. El acento es propiedad de la pantalla, no del componente individual.

---

## 2. Color System

### Philosophy

- **OKLCH throughout** — uniformidad perceptual frente a HEX/HSL
- **Dark-first** — el modo por defecto es `deep` (dark púrpura)
- **Hue 315** para la atmósfera pretoriana
- **Dos acentos metálicos** — oro Vergina (hue 85) y titanio (hue 270)
- **Light mode** — alabastro cálido (hue 70–80) con púrpura como tinta de realce

### Surface Scale (Dark · Deep)

| Token | OKLCH | Usage |
|-------|-------|-------|
| `--color-surface-0` | `oklch(0.10 0.014 315)` | Noche profunda — fondo base |
| `--color-surface-50` | `oklch(0.12 0.016 315)` | — |
| `--color-surface-100` | `oklch(0.14 0.018 315)` | Card base |
| `--color-surface-200` | `oklch(0.17 0.020 315)` | — |
| `--color-surface-300` | `oklch(0.20 0.022 315)` | Border subtle |
| `--color-surface-400` | `oklch(0.23 0.024 315)` | — |
| `--color-surface-500` | `oklch(0.26 0.026 315)` | Border default |
| `--color-surface-600` | `oklch(0.29 0.028 315)` | — |
| `--color-surface-700` | `oklch(0.33 0.030 315)` | Border strong |
| `--color-surface-800` | `oklch(0.37 0.032 315)` | — |
| `--color-surface-900` | `oklch(0.42 0.034 315)` | Superficie elevada |

### Surface Scale (Light · Bright)

| Token | OKLCH | Usage |
|-------|-------|-------|
| `--color-surface-0` | `oklch(0.97 0.014 80)` | Alabastro cálido |
| `--color-surface-50` | `oklch(0.95 0.018 78)` | — |
| `--color-surface-100` | `oklch(0.93 0.022 76)` | — |
| `--color-surface-200` | `oklch(0.90 0.026 74)` | — |
| `--color-surface-300` | `oklch(0.86 0.030 72)` | — |
| `--color-surface-400` | `oklch(0.80 0.034 70)` | — |
| `--color-surface-500` | `oklch(0.72 0.038 68)` | — |
| `--color-surface-600` | `oklch(0.62 0.042 66)` | — |
| `--color-surface-700` | `oklch(0.50 0.044 64)` | — |
| `--color-surface-800` | `oklch(0.38 0.040 62)` | — |
| `--color-surface-900` | `oklch(0.26 0.034 60)` | Texto / tinta oscura |

### Atmosphere Tokens

| Token | Dark Value | Light Value | Usage |
|-------|-----------|-------------|-------|
| `--atmosphere-haze` | `oklch(0.32 0.090 318)` | `oklch(0.88 0.060 62)` | Foco frío esquina alta |
| `--atmosphere-velvet` | `oklch(0.18 0.060 315)` | `oklch(0.82 0.052 58)` | Wash aterciopelado |
| `--atmosphere-vignette` | `oklch(0.04 0.020 315)` | `oklch(0.86 0.024 70)` | Viñeta exterior |

### Text Colors

| Token | Dark Value | Light Value | Usage |
|-------|-----------|-------------|-------|
| `--color-text-primary` | `oklch(0.97 0.008 310)` | `oklch(0.22 0.028 60)` | Títulos, body principal |
| `--color-text-secondary` | `oklch(0.80 0.010 310)` | `oklch(0.40 0.030 62)` | Subtítulos, metadatos |
| `--color-text-tertiary` | `oklch(0.62 0.012 310)` | `oklch(0.56 0.030 64)` | Captions, placeholders |
| `--color-text-disabled` | `oklch(0.46 0.014 310)` | `oklch(0.72 0.022 66)` | Estados deshabilitados |
| `--color-text-inverse` | `oklch(0.07 0.012 315)` | `oklch(0.97 0.014 80)` | Texto sobre fondos oscuros |

### Accent: Oro Vergina (Gold)

| Token | OKLCH | Usage |
|-------|-------|-------|
| `--accent` | `oklch(0.78 0.165 85)` | Acento principal — oro batido helénico |
| `--accent-dim` | `oklch(0.62 0.130 85)` | Oro grave — estados hover/active |
| `--accent-bright` | `oklch(0.92 0.100 88)` | Brillo alto — partículas, focos |
| `--accent-fg` | `oklch(0.12 0.014 50)` | Tinta cálida sobre oro |

**Light mode gold:**
| Token | OKLCH |
|-------|-------|
| `--accent` | `oklch(0.60 0.15 75)` — oro envejecido |
| `--accent-dim` | `oklch(0.44 0.15 72)` — oro quemado |
| `--accent-bright` | `oklch(0.72 0.14 78)` |
| `--accent-fg` | `oklch(0.98 0.008 85)` |

### Accent: Titanio

| Token | OKLCH | Usage |
|-------|-------|-------|
| `--accent` | `oklch(0.86 0.012 270)` | Titanio claro — acento técnico |
| `--accent-dim` | `oklch(0.68 0.014 260)` | Titanio sombra |
| `--accent-bright` | `oklch(0.95 0.005 270)` | Brillo perlado |
| `--accent-fg` | `oklch(0.10 0.008 270)` | Tinta neutra fría |

**Light mode titanium:**
| Token | OKLCH |
|-------|-------|
| `--accent` | `oklch(0.55 0.012 260)` — titanio cepillado oscurecido |
| `--accent-dim` | `oklch(0.42 0.014 255)` |
| `--accent-bright` | `oklch(0.72 0.010 270)` |
| `--accent-fg` | `oklch(0.98 0.005 270)` |

### Semantic Colors

| Token | Dark Value | Light Value | Usage |
|-------|-----------|-------------|-------|
| `--color-success-fg` | `oklch(0.78 0.16 130)` | — | Texto éxito |
| `--color-success-bg` | `oklch(0.20 0.06 130)` | — | Fondo éxito |
| `--color-success-border` | `oklch(0.40 0.12 130)` | — | Borde éxito |
| `--color-warning-fg` | `oklch(0.82 0.16 82)` | — | Texto advertencia |
| `--color-warning-bg` | `oklch(0.22 0.06 82)` | — | Fondo advertencia |
| `--color-warning-border` | `oklch(0.42 0.12 82)` | — | Borde advertencia |
| `--color-error-fg` | `oklch(0.72 0.22 25)` | — | Texto error |
| `--color-error-bg` | `oklch(0.22 0.07 25)` | — | Fondo error |
| `--color-error-border` | `oklch(0.42 0.16 25)` | — | Borde error |
| `--color-info-fg` | `oklch(0.78 0.14 230)` | — | Texto info |
| `--color-info-bg` | `oklch(0.20 0.05 230)` | — | Fondo info |
| `--color-info-border` | `oklch(0.40 0.10 230)` | — | Borde info |

### Highlight (Light Mode Only)

Púrpura como tinta de realce — solo en selecciones, focus, marcadores:

| Token | OKLCH |
|-------|-------|
| `--color-highlight-50` | `oklch(0.92 0.040 305)` |
| `--color-highlight-100` | `oklch(0.84 0.080 305)` |
| `--color-highlight-300` | `oklch(0.62 0.150 305)` |
| `--color-highlight-500` | `oklch(0.46 0.180 305)` |
| `--color-highlight-fg` | `oklch(0.97 0.012 305)` |

### Brand Aliases

| Token | Maps To | Usage |
|-------|---------|-------|
| `--color-brand-primary` | `--accent` | Botones primary, links |
| `--color-brand-primary-hc` | `--accent` (dark) / `--accent-dim` (light) | High contrast variant |
| `--color-brand-primary-fg` | `--accent-fg` | Texto sobre brand |
| `--color-brand-accent` | `--accent-dim` | Acento secundario |
| `--color-brand-accent-fg` | `--accent-fg` | Texto sobre accent |

### Contrast Validation Results

**WCAG 2.2 AA — PASSED**

| Pair | Dark Gold | Dark Titanium | Light Gold | Light Titanium |
|------|-----------|---------------|------------|----------------|
| text-primary ▸ surface-0 | 15.91:1 ✓ | 15.91:1 ✓ | 11.44:1 ✓ | 11.44:1 ✓ |
| text-primary ▸ surface-100 | 14.48:1 ✓ | 14.48:1 ✓ | 10.33:1 ✓ | 10.33:1 ✓ |
| text-secondary ▸ surface-0 | 10.07:1 ✓ | 10.07:1 ✓ | 6.00:1 ✓ | 6.00:1 ✓ |
| text-tertiary ▸ surface-0 | 5.78:1 ✓ | 5.78:1 ✓ | 3.37:1 ✓ | 3.37:1 ✓ |

---

## 3. Typography

### Font Families

| Role | Font | Weights | Fallback |
|------|------|---------|----------|
| Display / Sans | Inter Variable | 400–900 | Geist, -apple-system, BlinkMacSystemFont, Segoe UI |
| Mono | JetBrains Mono | 400–500 | Geist Mono, SF Mono, Menlo, Consolas |

**Note:** Outfit, Bricolage Grotesque, Manrope descatalogados en v0.2.2. Inter cubre display y body sans unificadamente.

### OpenType Features

```css
font-feature-settings: "cv05", "cv11", "ss01", "ss02", "rlig", "calt";
```

- `cv05` — 'l' simple
- `cv11` — '0' tachado
- `ss01` — 'a' single-storey
- `ss02` — 'g' geométrico
- `rlig`, `calt` — ligaduras contextuales

### Fluid Type Scale (clamp)

| Token | Min | Preferred | Max | Usage |
|-------|-----|-----------|-----|-------|
| `--text-xs` | 0.75rem | 0.72rem + 0.12vw | 0.813rem | Captions, badges |
| `--text-sm` | 0.813rem | 0.79rem + 0.14vw | 0.875rem | Small body |
| `--text-base` | 0.938rem | 0.90rem + 0.18vw | 1rem | Default body |
| `--text-lg` | 1.063rem | 1.02rem + 0.22vw | 1.125rem | Lead paragraphs |
| `--text-xl` | 1.188rem | 1.13rem + 0.28vw | 1.313rem | Card titles |
| `--text-2xl` | 1.438rem | 1.35rem + 0.40vw | 1.625rem | Subsections |
| `--text-3xl` | 1.75rem | 1.60rem + 0.70vw | 2.125rem | Section headers |
| `--text-4xl` | 2.25rem | 2.00rem + 1.20vw | 3rem | Page titles |
| `--text-display` | 3rem | 2.50rem + 2.40vw | 4.75rem | Hero headlines |

### Line Heights

| Token | Value | Usage |
|-------|-------|-------|
| `--leading-tight` | 1.15 | Display, h1, h2 |
| `--leading-snug` | 1.3 | h3, h4, captions |
| `--leading-normal` | 1.5 | Body text |
| `--leading-relaxed` | 1.65 | Long-form reading |

### Letter Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--tracking-display` | -0.035em | Hero headlines |
| `--tracking-heading` | -0.022em | h1–h4 |
| `--tracking-body` | -0.005em | Body text |
| `--tracking-mono` | 0 | Mono text |

### Font Weights

| Token | Value | Usage |
|-------|-------|-------|
| `--weight-regular` | 400 | Body, descriptions |
| `--weight-medium` | 500 | Labels, small headers |
| `--weight-semibold` | 600 | h1–h3, section headers |
| `--weight-bold` | 700 | Display, hero |

### Semantic Type Roles

| Class | Size | Weight | Line Height | Letter Spacing | Color |
|-------|------|--------|-------------|----------------|-------|
| `.ds-display` | `--text-display` | 600 | `--leading-tight` | `--tracking-display` | text-primary |
| `.ds-h1` / `h1` | `--text-4xl` | 600 | `--leading-tight` | `--tracking-heading` | text-primary |
| `.ds-h2` / `h2` | `--text-3xl` | 600 | `--leading-tight` | `--tracking-heading` | text-primary |
| `.ds-h3` / `h3` | `--text-2xl` | 600 | `--leading-snug` | `--tracking-heading` | text-primary |
| `.ds-h4` / `h4` | `--text-xl` | 500 | `--leading-snug` | `--tracking-heading` | text-primary |
| `.ds-body` / `p` | `--text-base` | 400 | `--leading-normal` | `--tracking-body` | text-secondary |
| `.ds-body-sm` | `--text-sm` | 400 | `--leading-normal` | — | text-secondary |
| `.ds-caption` | `--text-xs` | 500 | `--leading-snug` | 0.01em | text-tertiary |
| `.ds-label` | `--text-xs` | 500 | 1.2 | 0.08em | text-secondary, uppercase |
| `.ds-mono` / `code` | 0.92em | — | — | `--tracking-mono` | — |

### Hero Display Gradient

El h1 display requiere degradado vertical color→semi-transparente (nunca fade total, 35% al baseline):

```css
background: linear-gradient(180deg,
  var(--color-text-primary) 0%,
  var(--color-text-primary) 55%,
  color-mix(in oklch, var(--color-text-primary) 78%, transparent) 80%,
  color-mix(in oklch, var(--color-text-primary) 35%, transparent) 100%);
background-clip: text;
-webkit-background-clip: text;
color: transparent;
filter: drop-shadow(0 0 36px color-mix(in oklch, var(--accent) 18%, transparent));
```

---

## 4. Spacing System

### Base Unit: 4px

| Token | Value | Usage |
|-------|-------|-------|
| `--space-0` | 0 | — |
| `--space-1` | 4px | Tight gaps |
| `--space-2` | 8px | Icon gaps |
| `--space-3` | 12px | Component padding |
| `--space-4` | 16px | Default gap |
| `--space-5` | 20px | Small section gap |
| `--space-6` | 24px | Card padding |
| `--space-8` | 32px | Section gap |
| `--space-10` | 40px | Page padding |
| `--space-12` | 48px | Major sections |
| `--space-16` | 64px | Hero spacing |
| `--space-20` | 80px | Max spacing |
| `--space-24` | 96px | Extra large |

---

## 5. Elevation & Shadows

### Philosophy

- **No shadows for layout elevation** — la profundidad se comunica con `+0.02 L` en superficie + `--shadow-inner-highlight`
- **Shadows solo para overlays** — Dialog, Popover, Toast flotan sobre el contenido

### Shadow Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-overlay` | `0 1px 2px 0 oklch(0 0 0 / 0.3), 0 12px 32px -8px oklch(0 0 0 / 0.5), 0 0 0 1px var(--color-border-default)` | Modales, drawers |
| `--shadow-popover` | `0 1px 2px 0 oklch(0 0 0 / 0.2), 0 8px 24px -6px oklch(0 0 0 / 0.4), 0 0 0 1px var(--color-border-default)` | Dropdowns, tooltips |
| `--shadow-toast` | `0 1px 2px 0 oklch(0 0 0 / 0.25), 0 10px 28px -6px oklch(0 0 0 / 0.45), 0 0 0 1px var(--color-border-default)` | Notificaciones |
| `--shadow-inner-highlight` | `inset 0 1px 0 0 oklch(1 0 0 / 0.04)` | Reflejo superior en cards |
| `--shadow-glow-accent` | `0 0 56px color-mix(in oklch, var(--accent) 32%, transparent)` | Halo metálico (gold) |
| `--shadow-glow-accent` | `0 0 48px color-mix(in oklch, var(--accent) 26%, transparent)` | Halo perlado (titanium) |

### Z-Index Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--z-base` | 0 | Default |
| `--z-dropdown` | 1000 | Dropdowns |
| `--z-sticky` | 1100 | Sticky headers |
| `--z-overlay` | 1200 | Backdrops |
| `--z-modal` | 1300 | Modales |
| `--z-popover` | 1400 | Popovers |
| `--z-toast` | 1500 | Toasts |
| `--z-tooltip` | 1600 | Tooltips |

---

## 6. Border & Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-xs` | 4px | Tags, badges |
| `--radius-sm` | 6px | Small inputs |
| `--radius-md` | 8px | Inputs, buttons |
| `--radius-lg` | 12px | Cards |
| `--radius-xl` | 16px | Modales, panels |
| `--radius-2xl` | 24px | Large cards, hero sections |
| `--radius-full` | 9999px | Pills, avatars |

### Border Colors

| Token | Maps To | Usage |
|-------|---------|-------|
| `--color-border-subtle` | `--color-surface-300` | Separadores sutiles |
| `--color-border-default` | `--color-surface-500` | Borders estándar |
| `--color-border-strong` | `--color-surface-700` | Borders prominentes |
| `--color-border-focus` | `--accent` | Focus rings |

---

## 7. Motion & Animation

### Duration Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-instant` | 80ms | Micro-feedback |
| `--duration-fast` | 120ms | Hover states |
| `--duration-base` | 180ms | Transitions estándar |
| `--duration-slow` | 240ms | Page transitions |
| `--duration-slower` | 400ms | Complex animations |

### Easing Curves

| Token | Value | Usage |
|-------|-------|-------|
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Salidas principales |
| `--ease-out-quart` | `cubic-bezier(0.25, 1, 0.5, 1)` | Salidas suaves |
| `--ease-in-quart` | `cubic-bezier(0.5, 0, 0.75, 0)` | Entradas |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Transiciones simétricas |
| `--ease-spring` | `linear(...)` | Spring físico (20 puntos) |

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 8. Glass Primitive

El glassmorphism es la regla por defecto. La atmósfera atraviesa el cristal.

### Dark Mode

```css
--glass-bg: linear-gradient(
  140deg,
  oklch(1 0 0 / 0.06) 0%,
  oklch(1 0 0 / 0.02) 50%,
  oklch(1 0 0 / 0.04) 100%
);
--glass-border: oklch(1 0 0 / 0.08);
--glass-blur: blur(20px) saturate(140%);
--glass-shadow:
  inset 0 1px 0 oklch(1 0 0 / 0.10),
  0 30px 80px -20px oklch(0 0 0 / 0.55);
```

### Light Mode

```css
--glass-bg: linear-gradient(
  140deg,
  oklch(1 0 0 / 0.55) 0%,
  oklch(1 0 0 / 0.30) 50%,
  oklch(1 0 0 / 0.45) 100%
);
--glass-border: oklch(0.30 0.030 60 / 0.10);
--glass-blur: blur(16px) saturate(120%);
--glass-shadow:
  inset 0 1px 0 oklch(1 0 0 / 0.50),
  0 24px 60px -16px oklch(0.30 0.030 60 / 0.20);
```

### Card Implementation

```css
.card {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--glass-shadow);
  padding: var(--space-6);
  position: relative;
  overflow: hidden;
}

.card::after {
  content: "";
  position: absolute;
  inset: 0 0 auto 0;
  height: 50%;
  background: linear-gradient(180deg, oklch(1 0 0 / 0.06), transparent);
  pointer-events: none;
}
```

---

## 9. Atmosphere Layer (HTML)

Los 4 divs de atmósfera deben ir SIEMPRE antes del contenido:

```html
<div class="atm" aria-hidden="true"></div>
<div class="spark" aria-hidden="true"></div>
<div class="dust" aria-hidden="true"></div>
<div class="vignette" aria-hidden="true"></div>
```

### CSS Atmosphere

```css
body {
  position: relative;
  overflow-x: hidden;
  min-height: 100vh;
  background: var(--color-surface-0);
  color: var(--color-text-primary);
  font-family: var(--font-sans);
  margin: 0;
}

.atm, .spark, .dust, .vignette {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.atm::before, .atm::after {
  content: "";
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
}

.atm::before {
  top: -25vh; left: -10vw;
  width: 75vw; height: 75vw;
  background: radial-gradient(closest-side, var(--atmosphere-haze) 0%, transparent 65%);
  opacity: .55;
}

.atm::after {
  bottom: -30vh; right: -15vw;
  width: 90vw; height: 90vw;
  background: radial-gradient(closest-side, var(--atmosphere-velvet) 0%, transparent 60%);
  opacity: .85;
}

.spark {
  top: 50vh; right: 22vw;
  width: 360px; height: 360px;
  border-radius: 50%;
  background: var(--accent);
  filter: blur(140px);
  opacity: .22;
}

/* Dust v0.2.2 — 16 partículas + focos difusos */
.dust {
  mix-blend-mode: screen;
  opacity: .66;
  /* 16 radial-gradients... */
}

.vignette {
  background: radial-gradient(120% 120% at 50% 50%, transparent 60%, var(--atmosphere-vignette) 100%);
}

main, header, footer, section, nav {
  position: relative;
  z-index: 1;
}
```

---

## 10. Component Specifications

### Brand Row

Pill glass superior visible sin dominar:

```css
.brand-row {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: var(--space-3);
  padding: 8px 18px;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  background: color-mix(in oklch, var(--color-surface-1, var(--color-surface-0)) 55%, transparent);
  backdrop-filter: blur(16px) saturate(140%);
  border: 1px solid color-mix(in oklch, var(--accent) 16%, var(--glass-border));
  border-radius: 999px;
  box-shadow: inset 0 1px 0 oklch(1 0 0 / 0.06), 0 8px 24px -16px color-mix(in oklch, var(--accent) 40%, transparent);
}
```

### Button

| Variant | Background | Text | Border | Hover | Active | Disabled |
|---------|-----------|------|--------|-------|--------|----------|
| Primary | `--accent` | `--accent-fg` | none | `--accent-dim` | darken 10% | `--color-surface-200` |
| Secondary | transparent | `--accent` | 1px `--accent` | `--color-surface-100` | `--color-surface-200` | `--color-surface-200` |
| Ghost | transparent | `--accent` | none | `--color-surface-100` | `--color-surface-200` | `--color-surface-200` |

Sizes: sm (32px), md (40px), lg (48px)

### Card

Ver sección 8 (Glass Primitive).

### Input

| State | Border | Background | Text |
|-------|--------|-----------|------|
| Default | `--color-border-default` | `--color-surface-100` | `--color-text-primary` |
| Focus | `--accent` | `--color-surface-100` | `--color-text-primary` |
| Error | `--color-error-border` | `--color-error-bg` | `--color-error-fg` |
| Disabled | `--color-border-subtle` | `--color-surface-50` | `--color-text-disabled` |

### Modal

- Overlay: `--color-surface-0` / 50% + `backdrop-blur-sm`
- Container: max-width 560px, centered
- Shadow: `--shadow-overlay`
- Entry: `scale(0.95)` → `scale(1)` + fade, 180ms `--ease-out-expo`

### Table

- Header: `--color-surface-100` background, `--color-text-secondary` text, semibold
- Row: `--color-surface-0` alternating with `--color-surface-50`
- Hover: `--color-surface-100` con `--accent` border-left 2px
- Cell padding: `--space-3` vertical, `--space-4` horizontal

---

## 11. Dark Mode

Dark es el modo por defecto. No requiere declaración explícita.

```html
<html data-mode="deep" data-accent="gold">
```

### Light Mode Activation

```html
<html data-mode="bright" data-accent="gold">
```

### Auto Mode

```html
<html data-mode="auto" data-accent="gold">
```

Con `@media (prefers-color-scheme: light)` para re-trigger automático.

---

## 12. Accessibility

### Contrast

- **All text meets WCAG 2.2 AA** — validated via `scripts/validate-contrast.mjs`
- text-primary ▸ surface-0: 15.91:1 (dark), 11.44:1 (light)
- text-secondary ▸ surface-0: 10.07:1 (dark), 6.00:1 (light)
- text-tertiary ▸ surface-0: 5.78:1 (dark), 3.37:1 (light)

### Focus Indicators

- Color: `--accent` (oro o titanio según superficie)
- Estilo: 2px solid, offset 2px

### Touch Targets

- Mínimo 44×44px para elementos interactivos

### Motion

- `prefers-reduced-motion: reduce` anula todas las animaciones

### Screen Readers

- Atmósfera decorativa: `aria-hidden="true"`
- Contenido siempre en `main`, `header`, `footer`, `section`, `nav` con `z-index: 1`

---

## 13. Token Distribution Formats

| Format | Implementation | Status |
|--------|---------------|--------|
| CSS Custom Properties | `colors_and_type.css` + `color_modes.css` | ✅ Production |
| SCSS Variables | — | 🔄 Planned |
| JavaScript/JSON | `scripts/generate_tokens.py` | 🔄 Planned |
| Tailwind Config v4 | `@import "vergina-imperial/colors_and_type.css"` | ✅ Supported |
| Figma Variables | — | 🔮 Future |

---

## 14. Governance & Versioning

### SemVer

- **MAJOR** — Breaking changes (token renames, component API changes)
- **MINOR** — New features (new components, new tokens)
- **PATCH** — Bug fixes (color corrections, doc updates)

### Deprecation Policy

- Mínimo 2 versiones minor antes de eliminar tokens o componentes
- Aliases legacy soportados transitoriamente (ej: `dark` → `deep`, `light` → `bright`)

### CI/CD Validation

```yaml
# .github/workflows/validate.yml
- validate-tokens.mjs  # 0 hex/rgb/px/!important fuera de allowlist
- validate-contrast.mjs # WCAG AA en 4 superficies
```

---

## 15. Known Issues & Audit Results

### Token Validation (v0.2.2)

**122 violations** detectadas en consumidores (no en tokens core):

| File | Violations | Types |
|------|-----------|-------|
| `atelier.css` | 47 | hex-color, px-padding, px-radius, !important |
| `font-lab.css` | 7 | px-padding |
| `tweaks-panel.jsx` | 68 | hex-color, rgb-color, px-padding, px-radius |

**Acción recomendada:** Migrar valores hardcodeados a tokens del sistema.

---

*Generated with enterprise-design-system skill. Validate with validate_contrast.py before publishing.*
