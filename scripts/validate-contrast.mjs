#!/usr/bin/env node
/**
 * Vergina Imperial · Contrast validator (v0.2.0)
 *
 * Parsea colors_and_type.css + color_modes.css y verifica WCAG AA para
 * combinaciones críticas texto↔surface y brand-primary-hc↔surface en
 * cada combinación de `data-mode` × `data-accent`.
 *
 * Doctrina HC:
 *   - `--color-brand-primary`    = anchor de identidad (fills, focus ring, glow).
 *                                   Floor 3:1 (WCAG SC 1.4.11 non-text).
 *   - `--color-brand-primary-hc` = variante high-contrast cuando el brand actúa
 *                                   como foreground de texto/icono crítico.
 *                                   Floor 4.5:1 (WCAG SC 1.4.3 AA body).
 *
 * Sucesor del validador de Patrón VAP (que parseaba [data-theme=...]).
 * Adaptado al sistema unificado v0.2.0: `data-mode` + `data-accent`.
 *
 * Usage:
 *   node scripts/validate-contrast.mjs <css-dir>
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const DIR = process.argv[2] || '.';

/* --- minimal oklch parse + approximate luminance -------------------- */
const OKLCH_RE = /oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)/i;

function luminanceFromOklchL(L) {
  return L <= 0.08856 ? L / 9.033 : Math.pow((L + 0.16) / 1.16, 3);
}
function contrast(L1, L2) {
  const Y1 = luminanceFromOklchL(L1), Y2 = luminanceFromOklchL(L2);
  const hi = Math.max(Y1, Y2), lo = Math.min(Y1, Y2);
  return (hi + 0.05) / (lo + 0.05);
}

function extractTokens(css) {
  const out = {};
  const re = /(--[\w-]+)\s*:\s*(oklch\([^)]+\))/gi;
  let m;
  while ((m = re.exec(css)) !== null) out[m[1]] = m[2];
  return out;
}

/* --- rule-by-rule parser -------------------------------------------- */
function extractRules(css) {
  const rules = [];
  let i = 0;
  while (i < css.length) {
    const openBrace = css.indexOf('{', i);
    if (openBrace === -1) break;
    const selector = css.slice(i, openBrace).trim();
    if (selector.startsWith('@media') || selector.startsWith('@supports')) {
      i = openBrace + 1;
      continue;
    }
    let depth = 1, j = openBrace + 1;
    while (j < css.length && depth > 0) {
      const ch = css[j];
      if (ch === '{') depth++;
      else if (ch === '}') depth--;
      j++;
    }
    const body = css.slice(openBrace + 1, j - 1);
    if (!selector.startsWith('@font-face')) {
      rules.push({ selector, tokens: extractTokens(body) });
    }
    i = j;
  }
  return rules;
}

/**
 * Determina la "clave ambiente" de un selector en el sistema Vergina Imperial.
 *   - `:root`                                            → { mode: 'dark', accent: '(base)' }
 *   - `[data-mode="deep"]`, `[data-mode="dark"]`         → { mode: 'dark', accent: '(base)' }
 *   - `[data-mode="bright"]`, `[data-mode="light"]`      → { mode: 'light', accent: '(base)' }
 *   - `[data-accent="gold"]`                             → { mode: '(any)', accent: 'gold' }
 *   - `[data-accent="titanium"]`                         → { mode: '(any)', accent: 'titanium' }
 *   - `[data-mode="bright"][data-accent="gold"]`         → { mode: 'light', accent: 'gold' }
 *   - `html`, `body`, `html, body`, etc.                 → null (no temáticos)
 *   - selector con `.ds-display`, `:focus`, etc.         → null
 *
 * Aliases legacy:
 *   - `deep` ≡ `dark`
 *   - `bright` ≡ `light`
 */
function environmentOf(subSelector) {
  const s = subSelector.trim();

  if (s === ':root') return { mode: 'dark', accent: '(base)' };
  if (s === 'html' || s === 'body' || s === 'html, body') return null;

  // Si el selector contiene clases o pseudo-elementos no-temáticos, ignorar.
  // Sólo procesamos selectores que sean exclusivamente attribute-selectors
  // sobre data-mode / data-accent.
  const attrPattern = /^(\[data-(mode|accent)="[\w-]+"\])+$/;
  if (!attrPattern.test(s)) return null;

  let mode = '(any)';
  let accent = '(base)';

  const modeMatch = s.match(/\[data-mode\s*=\s*"(\w+)"\]/);
  if (modeMatch) {
    const v = modeMatch[1];
    if (v === 'deep' || v === 'dark') mode = 'dark';
    else if (v === 'bright' || v === 'light') mode = 'light';
    else mode = v;
  }

  const accentMatch = s.match(/\[data-accent\s*=\s*"(\w+)"\]/);
  if (accentMatch) {
    accent = accentMatch[1];
  }

  return { mode, accent };
}

/* --- gather CSS --- */
function readCssAll(dir) {
  let text = '';
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isFile() && extname(name) === '.css') text += '\n' + readFileSync(full, 'utf8');
  }
  return text;
}

const allCss = readCssAll(DIR);
const rules = extractRules(allCss);

/** Acumular tokens por entorno temático.
 *  Map key = `${mode}/${accent}` */
const envs = new Map();
function envKey(e) { return `${e.mode}/${e.accent}`; }

for (const rule of rules) {
  const parts = rule.selector.split(',');
  for (const part of parts) {
    const env = environmentOf(part);
    if (!env) continue;
    const key = envKey(env);
    const prev = envs.get(key) || { meta: env, tokens: {} };
    envs.set(key, { meta: prev.meta, tokens: { ...prev.tokens, ...rule.tokens } });
  }
}

/** base = ámbito `dark/(base)` (atmósfera default + acentos vía partial-merge) */
const baseDark = envs.get('dark/(base)')?.tokens || {};
const baseLight = envs.get('light/(base)')?.tokens || {};

/**
 * Combinaciones reales a auditar — las cuatro superficies del sistema.
 * (any)/gold + (any)/titanium se mergean sobre dark o light según corresponda.
 */
const SURFACES = [
  { mode: 'dark',  accent: 'gold',     label: 'dark · gold' },
  { mode: 'dark',  accent: 'titanium', label: 'dark · titanium' },
  { mode: 'light', accent: 'gold',     label: 'light · gold' },
  { mode: 'light', accent: 'titanium', label: 'light · titanium' },
];

function tokensFor(surface) {
  const base = surface.mode === 'dark' ? baseDark : baseLight;
  const accentBase = envs.get(`(any)/${surface.accent}`)?.tokens || {};
  const accentSpecific = envs.get(`${surface.mode}/${surface.accent}`)?.tokens || {};
  return { ...base, ...accentBase, ...accentSpecific };
}

/* --- checks --- */
const CHECKS = [
  { a: '--color-text-primary',     b: '--color-surface-0',   floor: 7.0, label: 'text-primary ▸ surface-0' },
  { a: '--color-text-primary',     b: '--color-surface-100', floor: 4.5, label: 'text-primary ▸ surface-100' },
  { a: '--color-text-secondary',   b: '--color-surface-0',   floor: 4.5, label: 'text-secondary ▸ surface-0' },
  { a: '--color-text-tertiary',    b: '--color-surface-0',   floor: 3.0, label: 'text-tertiary ▸ surface-0' },
  { a: '--color-brand-primary-hc', b: '--color-surface-0',   floor: 4.5, label: 'brand-primary-hc ▸ surface-0' },
  // brand-primary sigue siendo anchor identitario (non-text); floor 3:1 en dark,
  // en light puede caer por debajo (oro envejecido) — lo reportamos sin bloquear.
  { a: '--color-brand-primary',    b: '--color-surface-0',   floor: 3.0, label: 'brand-primary ▸ surface-0', advisory: true },
];

function L(tok) {
  if (!tok) return null;
  const m = tok.match(OKLCH_RE);
  return m ? +m[1] : null;
}

let fail = 0;
let advisoryFail = 0;
console.log('Vergina Imperial · contrast validation\n');

for (const surface of SURFACES) {
  const tokens = tokensFor(surface);
  console.log(`[${surface.label}]`);
  for (const chk of CHECKS) {
    const la = L(tokens[chk.a]);
    const lb = L(tokens[chk.b]);
    if (la == null || lb == null) { console.log(`  · skip ${chk.label} (missing)`); continue; }
    const r = contrast(la, lb);
    const ok = r >= chk.floor;
    if (!ok) {
      if (chk.advisory) advisoryFail++;
      else fail++;
    }
    const mark = ok
      ? '[32m✓[0m'
      : (chk.advisory ? '[33m⚠[0m' : '[31m✕[0m');
    const tag = chk.advisory ? ' (advisory)' : '';
    console.log(`  ${mark} ${chk.label.padEnd(36)} ${r.toFixed(2)}:1  (floor ${chk.floor})${tag}`);
  }
  console.log('');
}

if (advisoryFail > 0) {
  console.log(`[33m⚠[0m ${advisoryFail} advisory warning(s) — brand-primary por debajo de 3:1; usar brand-primary-hc para foreground.`);
}
if (fail > 0) {
  console.log(`[31m✕[0m ${fail} blocking failure(s).`);
}

process.exit(fail ? 1 : 0);
