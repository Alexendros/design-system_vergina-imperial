---
name: vergina-imperial
description: Manual de Diseño · Vergina Imperial. Use this skill to generate well-branded interfaces and assets for Alexendros (brand), either for production or throwaway prototypes/mocks. Sistema unificado dark-first — una atmósfera púrpura pretoriana, dos brillos metálicos (oro Vergina · titanio).
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files. The system is small on purpose: two CSS files (`colors_and_type.css` + `color_modes.css`), one font folder, one mark, one showcase. Anything else you need, you build from these primitives.

If creating visual artifacts (slides, mocks, throwaway prototypes, dashboards, etc), copy assets out of this skill and create static HTML files for the user to view. If working on production code, copy the same assets and read the rules to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some focused questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## El sistema en una frase

- **Una atmósfera.** Púrpura pretoriana aterciopelada. Vive en el fondo — focos radiales, gradientes, polvo metálico, viñeta. Nunca se aplica al primer plano como color saturado.
- **Dos brillos.** Oro Vergina (cálido, hue ~85) y titanio (gris perla, hue ~270, chroma ≤ 0.012). Coexisten en el sistema; no en la misma pantalla.
- **Un sistema.** Glassmorphism por defecto en paneles y cards — la atmósfera atraviesa el cristal. Plano solo cuando la densidad lo exige.

## Activación

```html
<!-- Default: dark + oro Vergina -->
<html>

<!-- Explícito -->
<html data-mode="dark" data-accent="gold">

<!-- Titanio sobre dark -->
<html data-mode="dark" data-accent="titanium">

<!-- Light alabastro con oro envejecido -->
<html data-mode="light" data-accent="gold">
```

`data-mode` cambia base (oscura `dark` o alabastro `light`). `data-accent` cambia el metal. Sin atributos, el sistema arranca en `dark` + `gold`.

## Cuándo oro, cuándo titanio

Decisión por **dominio del producto**, no por gusto visual:

- **Oro Vergina** — memoria, valor, firma, declaración. Manuales, archivo, marca personal, marketing identitario, decks de principios.
- **Titanio** — maquinaria, dato, telemetría, frialdad técnica. Dashboards, command centers, gráficas densas, instrumentación.

Una vista entera vive en un solo metal. Si tienes que mezclar oro y titanio en el mismo viewport, has confundido dos productos en uno.

## Anti-aesthetic explícito

Sin neumorfismo. Sin glass barato (blur sin atmósfera detrás). Sin sombras coloreadas. Sin bordes 2px. Sin emoji-as-iconos. Sin gradientes arcoíris. Sin `ease-in-out` del navegador.

## Deprecaciones

A partir de **v0.2.0** desaparece la gama **Abisal** y los aliases legacy `[data-theme="solar|ultramar|vergina|abisal|pretoriano"]`. La activación se hace con `data-accent` (no `data-theme`).
