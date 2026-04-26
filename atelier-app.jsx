/* eslint-disable */
// Atelier app — orchestrates state, scroll-spy, persistence, tweaks integration

const { useState, useMemo, useCallback, useEffect, useRef } = React;

/* ── Seed data — derived from real project files only ───────────────── */
// All entries below correspond to files that ACTUALLY exist in the project.
// Stale "UI Kit" / "Slides" / "Sample deck" entries from the legacy manifest
// have been removed.

const NOW = Date.now();
const days = (n) => NOW - n * 86_400_000;
const hours = (n) => NOW - n * 3_600_000;

const SEED = [
  // ── Type ────────────────────────────────────────────────────────────
  {
    id: "type-geist-sans",
    group: "Type",
    title: "Geist Variable · sans",
    subtitle: "Cuerpo y display. Variable axis 100–900, woff2 local. Tracking display −0.035em.",
    path: "fonts/GeistVF.woff2",
    kindKey: "type",
    glyph: "Aa",
    accent: "shared",
    version: "v0.2.0",
    status: "approved",
    updated: days(2),
    notes: [
      { who: "Alexendros", ts: days(2), body: "Confirmada como única familia sans del sistema. Hereda en toda la cascada." }
    ]
  },
  {
    id: "type-geist-mono",
    group: "Type",
    title: "Geist Mono Variable",
    subtitle: "Mono para cifras, paths, eyebrows técnicos. Tracking 0, feature-settings calt off.",
    path: "fonts/GeistMonoVF.woff2",
    kindKey: "type",
    glyph: "{ }",
    accent: "shared",
    version: "v0.2.0",
    status: "approved",
    updated: days(2),
    notes: []
  },
  {
    id: "type-fluid-scale",
    group: "Type",
    title: "Escala fluida · clamp()",
    subtitle: "Nueve pasos de --text-xs a --text-display, sin media queries. Display 3rem → 4.75rem.",
    path: "colors_and_type.css",
    kindKey: "type",
    glyph: "↕",
    accent: "shared",
    version: "v0.2.0",
    status: "needs-review",
    updated: hours(6),
    notes: [
      { who: "Alexendros", ts: hours(6), body: "Verificar que --text-2xl no compite con h3 en densidad alta." }
    ]
  },

  // ── Colors ──────────────────────────────────────────────────────────
  {
    id: "color-atmosphere",
    group: "Colors",
    title: "Atmósfera pretoriana",
    subtitle: "Tres focos radiales sobre surface-0. Una sola atmósfera, dos brillos.",
    path: "color_modes.css · :root",
    kindKey: "color",
    accent: "shared",
    version: "v0.2.0",
    status: "approved",
    updated: days(5),
    notes: [
      { who: "Alexendros", ts: days(5), body: "Cierre tras la deprecación de Abisal. Una atmósfera, dos brillos." }
    ]
  },
  {
    id: "color-gold",
    group: "Colors",
    title: "Acento Oro Vergina · hue 85",
    subtitle: "oklch(0.78 0.165 85). Memoria, valor, firma. Default del sistema.",
    path: "color_modes.css · [data-accent=\"gold\"]",
    kindKey: "color",
    accent: "gold",
    version: "v0.2.0",
    status: "approved",
    updated: days(8),
    notes: []
  },
  {
    id: "color-titanium",
    group: "Colors",
    title: "Acento Titanio · hue 270",
    subtitle: "oklch(0.86 0.012 270). Maquinaria, dato, telemetría. Chroma ≤ 0.012.",
    path: "color_modes.css · [data-accent=\"titanium\"]",
    kindKey: "color",
    accent: "titanium",
    version: "v0.2.0",
    status: "approved",
    updated: days(8),
    notes: []
  },
  {
    id: "color-light",
    group: "Colors",
    title: "Bright alabastro tintado",
    subtitle: "Base [data-mode=\"bright\"]. Nunca blanco puro — alabastro púrpura.",
    path: "color_modes.css · [data-mode=\"bright\"]",
    kindKey: "color",
    accent: "shared",
    version: "v0.2.0",
    status: "needs-review",
    updated: hours(20),
    notes: [
      { who: "Alexendros", ts: hours(20), body: "Validar AA en oro envejecido sobre alabastro. brand-primary-hc = 5.04:1, ok." }
    ]
  },

  // ── Spacing ────────────────────────────────────────────────────────
  {
    id: "space-grid",
    group: "Spacing",
    title: "Grid 4px · escala rígida",
    subtitle: "--space-1 → --space-24. Sin valores literales en componentes.",
    path: "colors_and_type.css · 4. SPACING",
    kindKey: "spacing",
    accent: "shared",
    version: "v0.2.0",
    status: "approved",
    updated: days(12),
    notes: []
  },
  {
    id: "space-radii",
    group: "Spacing",
    title: "Radii · seis pasos + full",
    subtitle: "xs 4 · sm 6 · md 8 · lg 12 · xl 16 · 2xl 24 · full 9999. Default md.",
    path: "colors_and_type.css · 4. RADII",
    kindKey: "spacing",
    accent: "shared",
    version: "v0.2.0",
    status: "approved",
    updated: days(12),
    notes: []
  },
  {
    id: "space-motion",
    group: "Spacing",
    title: "Motion · easings custom",
    subtitle: "out-expo, out-quart, in-quart, spring. Prohibido el ease-in-out del navegador.",
    path: "colors_and_type.css · 5. MOTION",
    kindKey: "spacing",
    accent: "shared",
    version: "v0.2.0",
    status: "changes-requested",
    updated: hours(3),
    notes: [
      { who: "Alexendros", ts: hours(3), body: "Falta documentar duraciones por componente. Añadir tabla en vergina-imperial.md." }
    ]
  },

  // ── Components ──────────────────────────────────────────────────────
  {
    id: "comp-glasscard",
    group: "Components",
    title: "GlassCard · primitive",
    subtitle: "blur(20px) saturate(140%), borde oklch(1 0 0 / 0.08), inner-highlight superior.",
    path: "showcase.html · §03",
    kindKey: "component",
    accent: "shared",
    version: "v0.2.0",
    status: "approved",
    updated: days(3),
    notes: []
  },
  {
    id: "comp-shimmer",
    group: "Components",
    title: "GradientText · shimmer vertical",
    subtitle: "Hereda --accent-shimmer del ancestro [data-accent]. Cifras grandes y sección.",
    path: "showcase.html",
    kindKey: "component",
    accent: "shared",
    version: "v0.2.0",
    status: "needs-review",
    updated: hours(10),
    notes: [
      { who: "Alexendros", ts: hours(10), body: "Comprobar fade-down en cierres de sección — no abusar del gesto." }
    ]
  },
  {
    id: "comp-logos-carousel",
    group: "Components",
    componentTreatment: "logos-carousel",
    title: "LogosCarousel · cinta infinita",
    subtitle: "Marquee sin js. Doble track con animación lineal y máscara lateral. Pausa en hover. 60s/ciclo, reverso opcional.",
    path: "showcase.html · §04",
    kindKey: "component",
    accent: "shared",
    version: "v0.1.0",
    status: "needs-review",
    updated: hours(1),
    notes: [
      { who: "Alexendros", ts: hours(1), body: "Verificar que la cinta no salte al recargar (animation-delay coherente con duplicación)." }
    ]
  },
  {
    id: "comp-blur-reveal",
    group: "Components",
    componentTreatment: "blur-reveal",
    title: "BlurReveal · entrada por desenfoque",
    subtitle: "filter: blur(12px) → 0 + opacity 0 → 1 + translateY(8px) → 0. IntersectionObserver, una sola pasada. 720ms, ease-out-quart.",
    path: "showcase.html · §05",
    kindKey: "component",
    accent: "shared",
    version: "v0.1.0",
    status: "needs-review",
    updated: hours(1),
    notes: [
      { who: "Alexendros", ts: hours(1), body: "Honrar prefers-reduced-motion: sin blur, solo opacity. Validar." }
    ]
  },

  // ── Brand ──────────────────────────────────────────────────────────
  // Cinco anclas canónicas — todas referenciadas en README/SKILL.
  {
    id: "brand-mark",
    group: "Brand",
    brandTreatment: "logomark",
    title: "Logomark · Alexendros",
    subtitle: "Trazo de tres golpes — dos diagonales + crossbar + remate circular en el ápex. Único glifo no-Lucide del sistema; hereda currentColor.",
    path: "assets/alexendros-mark.svg",
    kindKey: "brand",
    accent: "shared",
    version: "v0.2.0",
    status: "approved",
    updated: days(15),
    notes: [
      { who: "Alexendros", ts: days(15), body: "Mark canónico. Sin two-tone, sin fills, sin variantes coloreadas. Stroke 3 a 48px de viewBox; escala con currentColor." }
    ]
  },
  {
    id: "brand-name",
    group: "Brand",
    brandTreatment: "naming",
    title: "Sistema de naming · Vergina Imperial",
    subtitle: "Marca = Alexendros. Producto = Vergina Imperial. Vergina (oro) sobre Atmósfera Pretoriana, opcionalmente recubierto de titanio.",
    path: "README.md · §1",
    kindKey: "brand",
    accent: "shared",
    version: "v0.2.0",
    status: "approved",
    updated: days(20),
    notes: []
  },
  {
    id: "brand-archetype",
    group: "Brand",
    brandTreatment: "archetype",
    title: "Arquetipo · Craftsman × Magician",
    subtitle: "Transformación silenciosa. Nunca Jester. Nunca Everyman. El producto habla en tono bajo y entrega mecanismos, no espectáculo.",
    path: "README.md · Brand model",
    kindKey: "brand",
    accent: "shared",
    version: "v0.2.0",
    status: "needs-review",
    updated: hours(12),
    notes: [
      { who: "Alexendros", ts: hours(12), body: "Validar que el deck identitario no resbale al Magician puro — el Craftsman ancla la verdad material." }
    ]
  },
  {
    id: "brand-voice",
    group: "Brand",
    brandTreatment: "voice",
    title: "Voz · sobria, en infinitivo",
    subtitle: "Precisa. Sin signos de admiración. Sin emoji en UI. Microcopy en infinitivo o sustantivo corto. Verbos comprometidos en oro; verbos procedurales en titanio.",
    path: "README.md · Voice",
    kindKey: "brand",
    accent: "shared",
    version: "v0.2.0",
    status: "approved",
    updated: days(6),
    notes: []
  },
  {
    id: "brand-anti",
    group: "Brand",
    brandTreatment: "anti",
    title: "Anti-aesthetic · lo prohibido",
    subtitle: "Lo que el sistema explícitamente rechaza. Cinco vetos no negociables — la línea editorial.",
    path: "README.md · Anti-aesthetic",
    kindKey: "brand",
    accent: "shared",
    version: "v0.2.0",
    status: "approved",
    updated: days(6),
    notes: []
  },
  {
    id: "brand-references",
    group: "Brand",
    brandTreatment: "references",
    title: "Nivel de referencia",
    subtitle: "Linear, Vercel, Arc Browser, Raycast, Stripe Docs, Rauno Freiberg. No Material, no Bootstrap, no Shadcn sin afilar.",
    path: "README.md · Reference level",
    kindKey: "brand",
    accent: "shared",
    version: "v0.2.0",
    status: "needs-review",
    updated: hours(2),
    notes: [
      { who: "Alexendros", ts: hours(2), body: "Añadir build-ui de Rauno como referencia de motion. Confirmar que la lista no crezca más allá de seis." }
    ]
  }
];

/* ── State persistence (localStorage) ─────────────────────────────── */

const STORAGE_KEY = "atelier:v1";

function loadOverrides() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }
  catch { return {}; }
}
function saveOverrides(o) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(o)); } catch {}
}

/* ── Default tweaks (parsed/rewritten by host) ─────────────────────── */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "gold",
  "mode": "deep",
  "fidelity": "finished",
  "density": "comfortable",
  "filter": "all",
  "wordmarkFont": "cinzel"
}/*EDITMODE-END*/;

/* ── Main app ──────────────────────────────────────────────────────── */

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [overrides, setOverrides] = useState(loadOverrides);
  const [expandedId, setExpandedId] = useState(null);
  const [activeSection, setActiveSection] = useState("Type");

  // Apply data-mode + data-accent + data-fidelity + data-density to <html>
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-mode", tweaks.mode);
    html.setAttribute("data-accent", tweaks.accent);
    html.setAttribute("data-fidelity", tweaks.fidelity);
    html.setAttribute("data-density", tweaks.density);
  }, [tweaks.mode, tweaks.accent, tweaks.fidelity, tweaks.density]);

  // Merge seed + overrides
  const assets = useMemo(() => SEED.map((a) => {
    const o = overrides[a.id] || {};
    return {
      ...a,
      status: o.status ?? a.status,
      notes: [...a.notes, ...(o.notes || [])],
      updated: o.updated ?? a.updated
    };
  }), [overrides]);

  const setStatus = useCallback((id, status) => {
    setOverrides((prev) => {
      const next = { ...prev, [id]: { ...(prev[id] || {}), status, updated: Date.now() } };
      saveOverrides(next);
      return next;
    });
  }, []);

  const addNote = useCallback((id, body) => {
    setOverrides((prev) => {
      const cur = prev[id] || {};
      const notes = [...(cur.notes || []), { who: "Tú", ts: Date.now(), body }];
      const next = { ...prev, [id]: { ...cur, notes, updated: Date.now() } };
      saveOverrides(next);
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    if (!confirm("¿Restablecer todos los estados y notas locales?")) return;
    localStorage.removeItem(STORAGE_KEY);
    setOverrides({});
  }, []);

  // Counts
  const counts = useMemo(() => {
    const c = { "needs-review": 0, "approved": 0, "changes-requested": 0 };
    assets.forEach(a => c[a.status]++);
    return c;
  }, [assets]);

  // Sections
  const sections = useMemo(() => {
    const order = ["Type", "Colors", "Spacing", "Components", "Brand"];
    return order.map((title) => ({
      id: title,
      title,
      assets: assets.filter(a => a.group === title)
    })).filter(s => s.assets.length > 0);
  }, [assets]);

  // Filter
  const filtered = useMemo(() => {
    if (tweaks.filter === "all") return sections;
    return sections.map(s => ({
      ...s,
      assets: s.assets.filter(a => a.status === tweaks.filter)
    })).filter(s => s.assets.length > 0);
  }, [sections, tweaks.filter]);

  // Scroll-spy
  const sectionRefs = useRef({});
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      const visible = entries.filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActiveSection(visible[0].target.dataset.sectionId);
    }, { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] });
    Object.values(sectionRefs.current).forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, [filtered.length]);

  const jump = (id) => {
    const el = sectionRefs.current[id];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const total = assets.length;

  return (
    <>
      <div className="atmosphere"/>
      <div className="shell">
        <Sidebar
          sections={sections}
          activeId={activeSection}
          counts={counts}
          onJump={jump}
          accent={tweaks.accent}
          wordmarkFont={tweaks.wordmarkFont}
        />
        <main className="main">
          <ReviewHeader
            counts={counts}
            total={total}
            filter={tweaks.filter}
            onFilter={(f) => setTweak("filter", f)}
            accent={tweaks.accent}
          />

          {filtered.length === 0 && (
            <div className="empty">
              No hay assets con el filtro <strong>{tweaks.filter}</strong>. Ajusta el filtro arriba.
            </div>
          )}

          {filtered.map((s, idx) => (
            <section
              key={s.id}
              className="section"
              data-section-id={s.id}
              ref={(el) => sectionRefs.current[s.id] = el}
              id={`sec-${s.id}`}
              data-screen-label={`${String(idx+1).padStart(2,"0")} ${s.title}`}
            >
              <div className="section-head">
                <div className="left">
                  <span className="section-num">§ {String(idx+1).padStart(2,"0")}</span>
                  <h2 className="section-name">{s.title}</h2>
                </div>
                <span className="section-meta">{s.assets.length} {s.assets.length === 1 ? "asset" : "assets"}</span>
              </div>
              <div className="cards">
                {s.assets.map((a) => (
                  <AssetCard
                    key={a.id}
                    asset={a}
                    expanded={expandedId === a.id}
                    onToggle={(id) => setExpandedId((cur) => cur === id ? null : id)}
                    onSetStatus={setStatus}
                    onAddNote={addNote}
                    density={tweaks.density}
                  />
                ))}
              </div>
            </section>
          ))}

          <div className="footer-stripe">
            <span>Manual de Diseño · Vergina Imperial · v0.2.0</span>
            <span>Atelier de revisión — local-first, sin backend</span>
          </div>
        </main>
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Acento">
          <TweakRadio
            label="Metal"
            value={tweaks.accent}
            options={[{value:"gold",label:"Oro"},{value:"titanium",label:"Titanio"}]}
            onChange={(v) => setTweak("accent", v)}
          />
          <TweakRadio
            label="Atmósfera"
            value={tweaks.mode}
            options={[{value:"deep",label:"Deep"},{value:"bright",label:"Bright"}]}
            onChange={(v) => setTweak("mode", v)}
          />
        </TweakSection>

        <TweakSection title="Fidelidad">
          <TweakRadio
            label="Modo"
            value={tweaks.fidelity}
            options={[
              {value:"wireframe",label:"Wireframe"},
              {value:"finished",label:"Acabado"}
            ]}
            onChange={(v) => setTweak("fidelity", v)}
          />
          <TweakRadio
            label="Densidad"
            value={tweaks.density}
            options={[
              {value:"comfortable",label:"Cómoda"},
              {value:"compact",label:"Compacta"}
            ]}
            onChange={(v) => setTweak("density", v)}
          />
        </TweakSection>

        <TweakSection title="Wordmark · Alexendros">
          <TweakSelect
            label="Tipografía"
            value={tweaks.wordmarkFont}
            options={[
              {value:"cinzel",    label:"Cinzel · romana epigráfica"},
              {value:"marcellus", label:"Marcellus · romana de transición"},
              {value:"cormorant", label:"Cormorant · garamond contemporáneo"},
              {value:"italiana",  label:"Italiana · alta moda"}
            ]}
            onChange={(v) => setTweak("wordmarkFont", v)}
          />
        </TweakSection>

        <TweakSection title="Filtro">
          <TweakSelect
            label="Estado"
            value={tweaks.filter}
            options={[
              {value:"all",label:"Todos"},
              {value:"needs-review",label:"Por revisar"},
              {value:"approved",label:"Aprobados"},
              {value:"changes-requested",label:"Cambios"}
            ]}
            onChange={(v) => setTweak("filter", v)}
          />
        </TweakSection>

        <TweakSection title="Datos locales">
          <TweakButton onClick={resetAll}>Restablecer revisión</TweakButton>
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
