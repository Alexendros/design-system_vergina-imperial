#!/usr/bin/env node
/**
 * Alexendros · Token validator
 * Falla si encuentra literales de color/spacing/radius en el código.
 *
 * Usage:
 *   node scripts/validate-tokens.mjs src/
 *   node scripts/validate-tokens.mjs src/ --allow=tokens.css,theme.css
 */

import { readFileSync, statSync, readdirSync } from 'node:fs';
import { join, extname, relative, basename } from 'node:path';

const TARGET_EXTS = new Set(['.css', '.scss', '.tsx', '.jsx', '.vue', '.astro', '.svelte']);
const IGNORE_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.next']);
const ROOT = process.argv[2] || '.';
const ALLOW = (process.argv.find(a => a.startsWith('--allow=')) || '')
  .split('=')[1]?.split(',').filter(Boolean) || ['tokens.css', 'colors_and_type.css', 'color_modes.css'];

const RULES = [
  { id: 'hex-color',  re: /#[0-9a-f]{3,8}\b/gi,                       msg: 'hex color literal' },
  { id: 'rgb-color',  re: /\brgba?\([^)]+\)/gi,                       msg: 'rgb/rgba literal' },
  { id: 'px-padding', re: /(padding|margin|gap)\s*:\s*-?\d+(\.\d+)?px/gi, msg: 'px spacing literal' },
  { id: 'px-radius',  re: /border-radius\s*:\s*-?\d+(\.\d+)?px/gi,    msg: 'px radius literal' },
  { id: 'important',  re: /!important\b/g,                            msg: '!important forbidden' },
];

function walk(dir) {
  let out = [];
  for (const name of readdirSync(dir)) {
    if (IGNORE_DIRS.has(name)) continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) out = out.concat(walk(full));
    else if (TARGET_EXTS.has(extname(name))) out.push(full);
  }
  return out;
}

const files = walk(ROOT);
let violations = 0;

for (const f of files) {
  if (ALLOW.some(a => basename(f) === a || f.endsWith(a))) continue;
  const content = readFileSync(f, 'utf8');
  for (const rule of RULES) {
    const ms = content.match(rule.re);
    if (!ms) continue;
    violations += ms.length;
    console.log(`  ${relative(process.cwd(), f)}  [${rule.id}] ×${ms.length} — ${rule.msg}`);
  }
}

if (violations === 0) {
  console.log('\u001b[32m✓\u001b[0m 0 violations');
  process.exit(0);
} else {
  console.log(`\u001b[31m✕\u001b[0m ${violations} violation(s)`);
  process.exit(1);
}
