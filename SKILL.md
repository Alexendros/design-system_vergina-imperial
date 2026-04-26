---
name: vergina-imperial
description: Manual de Diseño · Vergina Imperial v0.2.0. Use this skill to generate well-branded interfaces and assets for Alexendros (brand), either for production or throwaway prototypes/mocks. Sistema unificado dark-first — una atmósfera púrpura pretoriana, dos brillos metálicos (oro Vergina · titanio).
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files. The system is small on purpose: two CSS files (`colors_and_type.css` + `color_modes.css`), one font folder, one mark, one showcase. Anything else you need, you build from these primitives.

If creating visual artifacts (slides, mocks, throwaway prototypes, dashboards, etc), copy assets out of this skill and create static HTML files for the user to view. If working on production code, copy the same assets and read the rules to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some focused questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## El sistema en una frase

- **Una atmósfera.** Púrpura pretoriana aterciopelada. Vive en el fondo — focos radiales, gradientes, polvo metálico, viñeta. Nunca se aplica al primer plano como color saturado.
- **Dos brillos.** Oro Vergina (cálido, hue ~85) y titanio (gris perla, hue ~270, chroma ≤ 0.012). Coexisten en el sistema; no en la misma pantalla.
- **Un sistema.** Glassmorphism por defecto en paneles y cards — la atmósfera atraviesa el cristal. Plano solo cuando la densidad lo exige.

## Activación · contrato mínimo del `<html>`

```html
<!-- Default: dark + oro Vergina -->
<html data-mode="dark" data-accent="gold">

<!-- Titanio sobre dark (técnico/instrumental) -->
<html data-mode="dark" data-accent="titanium">

<!-- Light alabastro con oro envejecido -->
<html data-mode="light" data-accent="gold">
```

Sin atributos, el sistema arranca en `dark` + `gold`. Aliases legacy `[data-theme="solar|ultramar|vergina|abisal|pretoriano"]` ELIMINADOS en v0.2.0 — no añadirlos.

## ⚠ Aplicar tokens NO ES aplicar el sistema

Es el error más común. Importar `colors_and_type.css` + `color_modes.css` solo da las **variables CSS**. El sistema requiere **5 capas**:

1. **Tokens** (variables CSS) — paleta, tipografía, spacing, motion, z-index. Vienen del CSS.
2. **Atmósfera** (4 divs HTML fijos detrás del contenido) — `.atm` + `.spark` + `.dust` + `.vignette`. Sin ellos surface-0 es solo un fondo plano púrpura, NO la atmósfera vibrante del sistema.
3. **Glass primitive** (paneles translúcidos) — `.card` con `background: var(--glass-bg)` + `backdrop-filter: var(--glass-blur)` + `border: 1px solid var(--glass-border)` + `box-shadow: var(--glass-shadow)`. La atmósfera atraviesa el cristal.
4. **Tipografía display** — `font-family: var(--font-display)` (**Outfit weight 700** mixed-case · neogrotesque sobria, metalizable) en hero h1 con `text-wrap: balance` + degradado vertical color→transparente que funde el final del título con la atmósfera. Outfit cubre también el body sans (mismo family, weights 400-500). Bricolage Grotesque descartado por curvas humanistas no metalizables.
5. **Acento aplicado por superficie** — toda una vista vive en oro o en titanio. NO mezclar dentro del mismo viewport. Decisión por dominio del producto, no por gusto visual.

Si alguna de las 5 capas falta, el resultado se ve "incompleto" o "plano".

## Aplicación completa · snippet canónico copy-paste (1 input)

Pega esto en CUALQUIER HTML/JSX para tener el sistema completo. Es el quick-start del operador y la skill cuando se invoca con "aplica Vergina Imperial".

### A · HTML estático single-file

```html
<!doctype html>
<html lang="es" data-mode="dark" data-accent="gold">  <!-- ← cambia a "titanium" si superficie técnica -->
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://your-host/colors_and_type.css">
  <link rel="stylesheet" href="https://your-host/color_modes.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap">
  <style>
    /* ATMÓSFERA · 4 capas fijas (sin esto el sistema queda plano) */
    body{position:relative;overflow-x:hidden;min-height:100vh;background:var(--color-surface-0);color:var(--color-text-primary);font-family:var(--font-sans);margin:0}
    .atm,.spark,.dust,.vignette{position:fixed;inset:0;pointer-events:none;z-index:0}
    .atm::before,.atm::after{content:"";position:absolute;border-radius:50%;filter:blur(120px)}
    .atm::before{top:-25vh;left:-10vw;width:75vw;height:75vw;background:radial-gradient(closest-side,var(--atmosphere-haze) 0%,transparent 65%);opacity:.55}
    .atm::after{bottom:-30vh;right:-15vw;width:90vw;height:90vw;background:radial-gradient(closest-side,var(--atmosphere-velvet) 0%,transparent 60%);opacity:.85}
    .spark{top:50vh;right:22vw;width:360px;height:360px;border-radius:50%;background:var(--accent);filter:blur(140px);opacity:.22}
    .dust{mix-blend-mode:screen;opacity:.50;background-image:radial-gradient(1px 1px at 12% 18%,var(--accent-bright) 50%,transparent 51%),radial-gradient(1px 1px at 78% 22%,var(--accent-bright) 50%,transparent 51%),radial-gradient(1.2px 1.2px at 32% 64%,var(--accent) 50%,transparent 51%),radial-gradient(1px 1px at 88% 70%,var(--accent-bright) 50%,transparent 51%),radial-gradient(0.8px 0.8px at 56% 38%,var(--accent-bright) 50%,transparent 51%),radial-gradient(1.5px 1.5px at 6% 86%,var(--accent) 50%,transparent 51%),radial-gradient(1px 1px at 44% 92%,var(--accent-bright) 50%,transparent 51%),radial-gradient(0.9px 0.9px at 70% 8%,var(--accent) 50%,transparent 51%),radial-gradient(1.3px 1.3px at 22% 44%,var(--accent-bright) 50%,transparent 51%),radial-gradient(1px 1px at 92% 48%,var(--accent) 50%,transparent 51%)}
    .vignette{background:radial-gradient(120% 120% at 50% 50%,transparent 60%,var(--atmosphere-vignette) 100%)}
    main,header,footer,section,nav{position:relative;z-index:1}
    /* GLASS card primitive */
    .card{background:var(--glass-bg);backdrop-filter:var(--glass-blur);-webkit-backdrop-filter:var(--glass-blur);border:1px solid var(--glass-border);border-radius:var(--radius-xl);box-shadow:var(--glass-shadow);padding:var(--space-6);position:relative;overflow:hidden}
    .card::after{content:"";position:absolute;inset:0 0 auto 0;height:50%;background:linear-gradient(180deg,oklch(1 0 0 / 0.06),transparent);pointer-events:none}
    /* Hero h1 display · Outfit weight 700 + degradado vertical color→transparent
       aplicado al elemento entero (no solo a un span). Halo accent suave. */
    h1.display,.hero h1{
      font-family:var(--font-display,"Outfit");font-size:clamp(48px,7vw,104px);
      font-weight:700;line-height:.98;letter-spacing:-0.025em;
      text-wrap:balance;max-width:18ch;margin:0 0 var(--space-6);
      background:linear-gradient(180deg,
        var(--color-text-primary) 0%,
        var(--color-text-primary) 35%,
        color-mix(in oklch, var(--color-text-primary) 60%, transparent) 70%,
        transparent 100%);
      background-clip:text;-webkit-background-clip:text;
      color:transparent;-webkit-text-fill-color:transparent;
      filter:drop-shadow(0 0 36px color-mix(in oklch, var(--accent) 18%, transparent));
    }
  </style>
</head>
<body>
  <!-- ATMÓSFERA · siempre los 4 divs primero, antes de cualquier contenido -->
  <div class="atm" aria-hidden="true"></div>
  <div class="spark" aria-hidden="true"></div>
  <div class="dust" aria-hidden="true"></div>
  <div class="vignette" aria-hidden="true"></div>

  <main>
    <h1 class="display">Tu título aquí</h1>
    <div class="card">Tu contenido en glass aquí</div>
  </main>
</body>
</html>
```

### B · Next.js App Router (TypeScript)

**`app/layout.tsx`** (root):

```tsx
import { Outfit, JetBrains_Mono } from "next/font/google";

// Outfit cubre display (h1 weight 700) y sans body (weights 400-600).
// Bricolage Grotesque descartado por humanismo no metalizable.
const sans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400","500","600","700","800"],
});
const display = sans; // mismo family, --font-display alias en globals.css
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400","500"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-mode="dark" data-accent="gold"  /* "titanium" si técnico */
          className={`${sans.variable} ${mono.variable}`}>
      <body>
        {/* ATMÓSFERA Vergina Imperial · 4 capas fijas */}
        <div className="atm" aria-hidden />
        <div className="spark" aria-hidden />
        <div className="dust" aria-hidden />
        <div className="vignette" aria-hidden />
        {children}
      </body>
    </html>
  );
}
```

**`app/globals.css`** (importar tokens del repo + atmósfera + glass):

```css
@import "tailwindcss";
@import "vergina-imperial/colors_and_type.css";
@import "vergina-imperial/color_modes.css";

:root {
  /* Outfit cubre display y sans (mismo family) · v0.2.1 */
  --font-display: "Outfit", -apple-system, BlinkMacSystemFont, sans-serif;
}

body { position: relative; overflow-x: hidden; min-height: 100vh; background: var(--color-surface-0); color: var(--color-text-primary); }

/* Hero h1 display · degradado vertical color→transparente */
h1.display, .hero h1 {
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 0.98;
  text-wrap: balance;
  background: linear-gradient(180deg,
    var(--color-text-primary) 0%,
    var(--color-text-primary) 35%,
    color-mix(in oklch, var(--color-text-primary) 60%, transparent) 70%,
    transparent 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 36px color-mix(in oklch, var(--accent) 18%, transparent));
}

/* Atmósfera (mismo CSS que en variante A · ver snippet HTML) */
.atm,.spark,.dust,.vignette{ position: fixed; inset: 0; pointer-events: none; z-index: 0; }
/* ... copiar el bloque entero de la variante A aquí ... */

main, header, footer, section, nav { position: relative; z-index: 1; }

/* Glass card (componentes contenedores) */
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--glass-shadow);
}
```

**`components/ui/card.tsx`** (refactor shadcn):

```tsx
import { cn } from "@/lib/utils";
export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("glass-card p-6 relative overflow-hidden", className)} {...props} />;
}
```

## Cuándo oro, cuándo titanio · regla de superficie

Decisión por **dominio del producto**, no por gusto visual:

- **Oro Vergina** (`data-accent="gold"`) — memoria, valor, firma, declaración. Manuales, archivo, marca personal, marketing identitario, decks de principios. Aplica a: alexendros.me · iniciativa-onboarding · Afiladocs (draft).
- **Titanio** (`data-accent="titanium"`) — maquinaria, dato, telemetría, frialdad técnica. Dashboards, command centers, gráficas densas, instrumentación. Aplica a: alexendros.pro · Controlink · iniciativa.alexendros.me (instrumento societario) · control-misiones internas.

Una vista entera vive en un solo metal. Si tienes que mezclar oro y titanio en el mismo viewport, has confundido dos productos en uno.

## Anti-aesthetic explícito

Sin neumorfismo. Sin glass barato (blur sin atmósfera detrás — el glass del sistema siempre atraviesa la atmósfera, no flota en el vacío). Sin sombras coloreadas. Sin bordes 2px. Sin emoji-as-iconos. Sin gradientes arcoíris. Sin `ease-in-out` del navegador. Sin profundidad por shadow en cards (la profundidad la da `+0.02 L` + `--shadow-inner-highlight`, NO box-shadow).

## Deprecaciones v0.2.0

- Gama **Abisal** ELIMINADA. Productos que la usaban migran a `data-accent="titanium"`.
- Aliases `[data-theme="solar|ultramar|vergina|abisal|pretoriano"]` ELIMINADOS. Activación exclusiva con `data-mode` + `data-accent`.

## Validación

Antes de publicar cualquier consumidor del DS:

```bash
node scripts/validate-tokens.mjs <dir>     # 0 hex/rgb/px/!important fuera de allowlist
node scripts/validate-contrast.mjs <dir>   # WCAG AA en 4 superficies (dark/light × gold/titanium)
```

Ambos están en `~/Apps/design-system_vergina-imperial/scripts/` y CI los corre en `push`/`PR` (`.github/workflows/validate.yml`).
