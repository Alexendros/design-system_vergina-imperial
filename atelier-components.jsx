/* eslint-disable */
// Atelier components — icons, AssetCard, Sidebar, Header
// All components attached to window at end for cross-script scope.

const { useState, useMemo, useCallback, useEffect, useRef } = React;

/* ── Icons (Lucide-flavored, stroke 1.75, currentColor) ─────────────── */

const stroke = { stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" };

const IconCheck = (p) => (
  <svg viewBox="0 0 24 24" {...p}><path d="M4 12.5l5 5L20 6" {...stroke}/></svg>
);
const IconAlert = (p) => (
  <svg viewBox="0 0 24 24" {...p}><path d="M12 4l9 16H3z" {...stroke}/><path d="M12 10v4M12 17v.5" {...stroke}/></svg>
);
const IconRevert = (p) => (
  <svg viewBox="0 0 24 24" {...p}><path d="M4 12a8 8 0 1 0 2.5-5.8M4 4v4h4" {...stroke}/></svg>
);
const IconChevron = (p) => (
  <svg viewBox="0 0 24 24" {...p}><path d="M6 9l6 6 6-6" {...stroke}/></svg>
);
const IconExternal = (p) => (
  <svg viewBox="0 0 24 24" {...p}><path d="M14 5h5v5M19 5L11 13M5 7v12h12" {...stroke}/></svg>
);
const IconComment = (p) => (
  <svg viewBox="0 0 24 24" {...p}><path d="M5 5h14v11H9l-4 4z" {...stroke}/></svg>
);
const IconDot = (p) => (
  <svg viewBox="0 0 24 24" {...p}><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none"/></svg>
);
const IconType = (p) => (
  <svg viewBox="0 0 24 24" {...p}><path d="M5 7V5h14v2M12 5v14M9 19h6" {...stroke}/></svg>
);
const IconColor = (p) => (
  <svg viewBox="0 0 24 24" {...p}><circle cx="12" cy="12" r="8" {...stroke}/><path d="M12 4a8 8 0 0 1 0 16" stroke="currentColor" strokeWidth="1.75" fill="currentColor" opacity="0.25"/></svg>
);
const IconRuler = (p) => (
  <svg viewBox="0 0 24 24" {...p}><path d="M3 8l13-3 5 5L8 21l-5-5z" {...stroke}/><path d="M7 10v2M10 9v3M13 8v2M16 7v3" {...stroke}/></svg>
);
const IconBlock = (p) => (
  <svg viewBox="0 0 24 24" {...p}><rect x="4" y="4" width="16" height="16" rx="2" {...stroke}/><path d="M4 9h16M9 4v16" {...stroke}/></svg>
);
const IconBrand = (p) => (
  <svg viewBox="0 0 24 24" {...p}><path d="M5 19l4-14 3 9 3-6 4 11" {...stroke}/></svg>
);

const KIND_ICONS = {
  Type: IconType, Colors: IconColor, Spacing: IconRuler,
  Components: IconBlock, Brand: IconBrand
};

/* ── Brand-specific previews ────────────────────────────────────────── */
// Each brand asset gets a bespoke visual. The thumb (in the card row)
// is a 96×64 miniature; the hero (in the expand body) is full-width.

function AlexendrosMark({ size = 36, strokeWidth = 3 }) {
  // Λ (lambda): two diagonals meeting at an apex marked by a small filled
  // disc. No crossbar — that's what separates Λ from A. The apex disc
  // is the brand's signature gesture and the only "fill" the mark allows.
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} fill="none" aria-hidden="true">
      <path d="M10 38 L24 10 L38 38" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="24" cy="10" r="2.25" fill="currentColor"/>
    </svg>
  );
}

function BrandThumb({ treatment }) {
  switch (treatment) {
    case "logomark":
      return <span style={{ color: "var(--accent)" }}><AlexendrosMark size={28} strokeWidth={3.2}/></span>;
    case "naming":
      return (
        <div style={{
          fontFamily: "var(--font-display)",
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: "var(--color-text-primary)",
          lineHeight: 1.05,
          textAlign: "center"
        }}>
          <div style={{ background: "var(--accent-shimmer)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Vergina</div>
          <div style={{ fontSize: 9, color: "var(--color-text-tertiary)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 2 }}>Imperial</div>
        </div>
      );
    case "archetype":
      return (
        <svg viewBox="0 0 96 64" width="80" height="52" aria-hidden="true">
          <circle cx="36" cy="32" r="18" fill="none" stroke="var(--accent)" strokeWidth="1.25" opacity="0.85"/>
          <circle cx="60" cy="32" r="18" fill="none" stroke="var(--color-text-secondary)" strokeWidth="1.25" opacity="0.7"/>
          <text x="48" y="36" textAnchor="middle" fontSize="9" fill="var(--color-text-primary)" fontFamily="var(--font-mono)" letterSpacing="0.04em">×</text>
        </svg>
      );
    case "voice":
      return (
        <svg viewBox="0 0 96 64" width="80" height="52" aria-hidden="true">
          <path d="M10 32 Q 22 22 34 32 T 58 32 T 86 32" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="86" cy="32" r="2" fill="var(--accent)"/>
        </svg>
      );
    case "anti":
      return (
        <svg viewBox="0 0 96 64" width="80" height="52" aria-hidden="true">
          <circle cx="48" cy="32" r="20" fill="none" stroke="var(--color-warning-fg)" strokeWidth="1.5"/>
          <line x1="34" y1="18" x2="62" y2="46" stroke="var(--color-warning-fg)" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
    case "references":
      return (
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {["L","V","A","R"].map((c, i) => (
            <span key={i} style={{
              width: 14, height: 14,
              borderRadius: 3,
              border: "1px solid var(--color-border-default)",
              background: "color-mix(in oklch, var(--color-surface-100) 60%, transparent)",
              fontFamily: "var(--font-mono)",
              fontSize: 8,
              fontWeight: 600,
              color: "var(--color-text-secondary)",
              display: "grid",
              placeItems: "center"
            }}>{c}</span>
          ))}
        </div>
      );
    default:
      return null;
  }
}

function BrandPreview({ treatment }) {
  switch (treatment) {
    case "logomark":
      return (
        <div className="brand-hero brand-hero--logomark">
          <div className="hero-rule">
            <span className="hero-tick">48</span>
            <span className="hero-tick">24</span>
            <span className="hero-tick">12</span>
          </div>
          <div className="hero-marks">
            <div className="mark-cell"><span style={{ color: "var(--accent)" }}><AlexendrosMark size={96} strokeWidth={3}/></span></div>
            <div className="mark-cell"><span style={{ color: "var(--color-text-primary)" }}><AlexendrosMark size={56} strokeWidth={2.5}/></span></div>
            <div className="mark-cell"><span style={{ color: "var(--color-text-secondary)" }}><AlexendrosMark size={28} strokeWidth={2}/></span></div>
          </div>
          <div className="hero-caption">currentColor · stroke 3 @ 48 · sin fills · sin two-tone</div>
        </div>
      );
    case "naming":
      return (
        <div className="brand-hero brand-hero--naming">
          <div className="naming-grid">
            <div className="naming-cell">
              <div className="naming-lab">marca</div>
              <div className="naming-val" style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 600, letterSpacing: "-0.035em" }}>Alexendros</div>
            </div>
            <div className="naming-arrow">→</div>
            <div className="naming-cell">
              <div className="naming-lab">producto</div>
              <div className="naming-val" style={{
                fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 600, letterSpacing: "-0.035em",
                background: "var(--accent-shimmer)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent"
              }}>Vergina Imperial</div>
            </div>
          </div>
          <div className="naming-formula">
            <span className="formula-chip">Vergina<i>(oro)</i></span>
            <span className="formula-op">+</span>
            <span className="formula-chip">Atmósfera Pretoriana</span>
            <span className="formula-op">·</span>
            <span className="formula-chip formula-chip--alt">titanio<i>(opcional)</i></span>
          </div>
        </div>
      );
    case "archetype":
      return (
        <div className="brand-hero brand-hero--archetype">
          <div className="venn">
            <div className="venn-circle venn-a"><span>Craftsman</span></div>
            <div className="venn-circle venn-b"><span>Magician</span></div>
            <div className="venn-meet">silent<br/>transformation</div>
          </div>
          <div className="archetype-rejects">
            <span className="reject">never <s>Jester</s></span>
            <span className="reject">never <s>Everyman</s></span>
          </div>
        </div>
      );
    case "voice":
      return (
        <div className="brand-hero brand-hero--voice">
          <div className="voice-grid">
            <div className="voice-col voice-col--ok">
              <div className="voice-lab">así sí</div>
              <ul>
                <li>Comprometerse</li>
                <li>Publicar</li>
                <li>Firmar el manual</li>
                <li>Una atmósfera, dos brillos.</li>
              </ul>
            </div>
            <div className="voice-col voice-col--no">
              <div className="voice-lab">así no</div>
              <ul>
                <li><s>¡Comprométete ya!</s></li>
                <li><s>🚀 Publicar</s></li>
                <li><s>Firma el manual!!</s></li>
                <li><s>El sistema más bonito del año</s></li>
              </ul>
            </div>
          </div>
        </div>
      );
    case "anti":
      return (
        <div className="brand-hero brand-hero--anti">
          <ul className="anti-list">
            <li><span className="anti-num">01</span><span>Sin neumorfismo</span></li>
            <li><span className="anti-num">02</span><span>Sin glass barato — el blur sin plano detrás</span></li>
            <li><span className="anti-num">03</span><span>Sin sombras coloreadas</span></li>
            <li><span className="anti-num">04</span><span>Sin bordes 2px</span></li>
            <li><span className="anti-num">05</span><span>Sin emoji-as-iconos · sin gradientes arcoíris</span></li>
          </ul>
        </div>
      );
    case "references":
      return (
        <div className="brand-hero brand-hero--references">
          <div className="ref-row">
            <div className="ref-lab">nivel</div>
            <div className="ref-chips">
              {["Linear","Vercel","Arc","Raycast","Stripe Docs","build-ui"].map(n => (
                <span key={n} className="ref-chip">{n}</span>
              ))}
            </div>
          </div>
          <div className="ref-row ref-row--no">
            <div className="ref-lab">no nivel</div>
            <div className="ref-chips">
              {["Material","Bootstrap","Shadcn sin afilar"].map(n => (
                <span key={n} className="ref-chip ref-chip--no"><s>{n}</s></span>
              ))}
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}

/* ── Status helpers ─────────────────────────────────────────────────── */

const STATUS_LABELS = {
  "needs-review":      "Por revisar",
  "approved":          "Aprobado",
  "changes-requested": "Cambios solicitados"
};
const STATUS_DOT = {
  "needs-review":      "dot-needs",
  "approved":          "dot-approved",
  "changes-requested": "dot-changes"
};

function relativeTime(ts) {
  const diff = Math.max(0, (Date.now() - ts) / 1000);
  if (diff < 60)        return "ahora";
  if (diff < 3600)      return `hace ${Math.floor(diff/60)}m`;
  if (diff < 86400)     return `hace ${Math.floor(diff/3600)}h`;
  return `hace ${Math.floor(diff/86400)}d`;
}

/* ── AssetCard ──────────────────────────────────────────────────────── */

function AssetCard({ asset, onSetStatus, onAddNote, expanded, onToggle, density }) {
  const KindIcon = KIND_ICONS[asset.group] || IconBlock;
  const [draft, setDraft] = useState("");

  const submit = (e) => {
    e?.preventDefault?.();
    if (!draft.trim()) return;
    onAddNote(asset.id, draft.trim());
    setDraft("");
  };

  return (
    <article className="asset-card" data-status={asset.status} data-treatment={asset.brandTreatment || asset.componentTreatment || ""}>
      <div className="card-row" onClick={() => onToggle(asset.id)}>
        <div className="thumb" data-kind={asset.kindKey} data-treatment={asset.brandTreatment || asset.componentTreatment || ""}>
          {asset.brandTreatment ? (
            <BrandThumb treatment={asset.brandTreatment}/>
          ) : asset.componentTreatment ? (
            <ComponentThumb treatment={asset.componentTreatment}/>
          ) : asset.glyph ? (
            <span className="thumb-glyph">{asset.glyph}</span>
          ) : (
            <KindIcon style={{ width: 22, height: 22, color: "var(--color-text-tertiary)" }} />
          )}
        </div>

        <div className="card-body">
          <div className="card-title-row">
            <h4 className="card-title">{asset.title}</h4>
            <span className="status-chip" data-s={asset.status}>
              <span className={`dot ${STATUS_DOT[asset.status]}`} style={{width:6,height:6,borderRadius:"50%",background:"currentColor",display:"inline-block"}}/>
              {STATUS_LABELS[asset.status]}
            </span>
          </div>
          <p className="card-subtitle">{asset.subtitle}</p>
          {density !== "compact" && (
            <div className="card-meta">
              <span className="kind-tag">{asset.group}</span>
              <span className="sep">·</span>
              <span>{asset.path}</span>
              <span className="sep">·</span>
              <span>{asset.notes.length} {asset.notes.length === 1 ? "nota" : "notas"}</span>
            </div>
          )}
        </div>

        <div className="card-actions" onClick={(e) => e.stopPropagation()}>
          <button
            className="icon-btn"
            data-action="approve"
            title="Aprobar"
            onClick={() => onSetStatus(asset.id, "approved")}
            aria-label={`Aprobar ${asset.title}`}
          >
            <IconCheck/>
          </button>
          <button
            className="icon-btn"
            data-action="changes"
            title="Solicitar cambios"
            onClick={() => onSetStatus(asset.id, "changes-requested")}
            aria-label={`Solicitar cambios en ${asset.title}`}
          >
            <IconAlert/>
          </button>
          <button
            className="icon-btn"
            data-action="reset"
            title="Marcar por revisar"
            onClick={() => onSetStatus(asset.id, "needs-review")}
            aria-label={`Marcar ${asset.title} por revisar`}
          >
            <IconRevert/>
          </button>
          <button
            className="icon-btn"
            title={expanded ? "Cerrar" : "Abrir"}
            onClick={() => onToggle(asset.id)}
            aria-label={expanded ? "Cerrar detalle" : "Abrir detalle"}
            style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform var(--duration-fast) var(--ease-out-quart)" }}
          >
            <IconChevron/>
          </button>
        </div>
      </div>

      {expanded && (
        <div className="card-expand">
          {asset.brandTreatment && (
            <div className="brand-hero-wrap">
              <BrandPreview treatment={asset.brandTreatment}/>
            </div>
          )}
          {asset.componentTreatment && (
            <div className="brand-hero-wrap">
              <ComponentPreview treatment={asset.componentTreatment}/>
            </div>
          )}
          <div className="expand-section">
            <div className="lab">Notas de revisión · {asset.notes.length}</div>
            <div className="note-list">
              {asset.notes.length === 0 && (
                <div className="empty" style={{ padding: "var(--space-5)", fontSize: "var(--text-xs)" }}>
                  Sin notas. Empieza la conversación.
                </div>
              )}
              {asset.notes.map((n, i) => (
                <div className="note" key={i}>
                  <div className="avatar">{n.who.slice(0,1).toUpperCase()}</div>
                  <div>
                    <div>
                      <span className="who">{n.who}</span>
                      <span className="when">{relativeTime(n.ts)}</span>
                    </div>
                    <div className="body">{n.body}</div>
                  </div>
                </div>
              ))}
            </div>
            <form className="note-input" onSubmit={submit}>
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Escribir una nota…"
                aria-label="Nueva nota"
              />
              <button className="btn-send" type="submit" disabled={!draft.trim()}>Enviar</button>
            </form>
          </div>

          <div className="expand-section">
            <div className="lab">Metadata</div>
            <div className="meta-panel">
              <div className="meta-row"><span className="k">Path</span><span className="v">{asset.path}</span></div>
              <div className="meta-row"><span className="k">Grupo</span><span className="v">{asset.group}</span></div>
              <div className="meta-row"><span className="k">Acento</span><span className="v">{asset.accent || "—"}</span></div>
              <div className="meta-row"><span className="k">Versión</span><span className="v">{asset.version}</span></div>
              <div className="meta-row"><span className="k">Última edición</span><span className="v">{relativeTime(asset.updated)}</span></div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

/* ── Sidebar ────────────────────────────────────────────────────────── */

function Sidebar({ sections, activeId, counts, onJump, accent, wordmarkFont = "cinzel" }) {
  // Wordmark font matrix — each entry tunes its own size, weight, tracking,
  // and case to fit the slot. The slot itself stays 168px wide regardless.
  const WORDMARK_FONTS = {
    cinzel:    { family: "'Cinzel', serif",            size: "13px", weight: 600, tracking: "0.04em", transform: "uppercase", label: "ALEXENDROS" },
    marcellus: { family: "'Marcellus', serif",         size: "16px", weight: 400, tracking: "0.02em", transform: "none",      label: "Alexendros" },
    cormorant: { family: "'Cormorant Garamond', serif",size: "20px", weight: 500, tracking: "-0.005em", transform: "none",    label: "Alexendros" },
    italiana:  { family: "'Italiana', serif",          size: "20px", weight: 400, tracking: "0.01em", transform: "none",      label: "Alexendros" }
  };
  const wm = WORDMARK_FONTS[wordmarkFont] || WORDMARK_FONTS.cinzel;

  return (
    <aside className="sidebar">
      <div className="brand-row">
        <div className="brand-mark" aria-label="Alexendros lambda mark">
          <AlexendrosMark size={20} strokeWidth={3.4}/>
        </div>
        <div className="brand-text">
          <div className="name" style={{
            fontFamily: wm.family,
            fontSize: wm.size,
            fontWeight: wm.weight,
            letterSpacing: wm.tracking,
            textTransform: wm.transform
          }}>{wm.label}</div>
          <div className="role">{accent === "titanium" ? "Titanio" : "Oro"} · Atelier</div>
        </div>
      </div>

      <div className="nav-section">
        <div className="heading">Secciones</div>
        {sections.map((s) => {
          const KindIcon = KIND_ICONS[s.title] || IconBlock;
          return (
            <div
              key={s.id}
              className={`nav-link ${activeId === s.id ? "active" : ""}`}
              onClick={() => onJump(s.id)}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onJump(s.id)}
            >
              <span style={{display:"flex",alignItems:"center",gap:"var(--space-2)"}}>
                <KindIcon style={{ width: 14, height: 14, opacity: 0.8 }}/>
                {s.title}
              </span>
              <span className="count">{s.assets.length}</span>
            </div>
          );
        })}
      </div>

      <div className="nav-section">
        <div className="heading">Estado global</div>
        <div className="nav-link"><span><span className="dot dot-needs" style={{display:"inline-block",width:8,height:8,borderRadius:"50%",marginRight:8,verticalAlign:"middle"}}/>Por revisar</span><span className="count">{counts["needs-review"]}</span></div>
        <div className="nav-link"><span><span className="dot dot-approved" style={{display:"inline-block",width:8,height:8,borderRadius:"50%",marginRight:8,verticalAlign:"middle"}}/>Aprobados</span><span className="count">{counts.approved}</span></div>
        <div className="nav-link"><span><span className="dot dot-changes" style={{display:"inline-block",width:8,height:8,borderRadius:"50%",marginRight:8,verticalAlign:"middle"}}/>Cambios</span><span className="count">{counts["changes-requested"]}</span></div>
      </div>

      <div className="nav-section" style={{ marginTop: "auto" }}>
        <div className="heading">Sistema</div>
        <a className="nav-link" href="README.md" target="_blank" rel="noreferrer">
          <span style={{display:"flex",alignItems:"center",gap:"var(--space-2)"}}><IconExternal style={{width:13,height:13}}/>README</span>
        </a>
        <a className="nav-link" href="showcase.html">
          <span style={{display:"flex",alignItems:"center",gap:"var(--space-2)"}}><IconExternal style={{width:13,height:13}}/>Showcase</span>
        </a>
      </div>
    </aside>
  );
}

/* ── Header ─────────────────────────────────────────────────────────── */

function ReviewHeader({ counts, total, filter, onFilter, accent }) {
  const pct = total === 0 ? 0 : Math.round((counts.approved / total) * 100);

  return (
    <header className="review-header">
      <div className="eyebrow">Manual · Vergina Imperial · {accent === "titanium" ? "Titanio" : "Oro Vergina"}</div>
      <h1 className="review-title">
        Atelier de <em>revisión</em>
      </h1>
      <p className="review-subtitle">
        Una sola vista para aprobar, marcar y conversar sobre cada token, tipografía y componente del sistema. {pct}% del manual aprobado · {counts["needs-review"]} pendientes.
      </p>

      <div className="status-bar" role="tablist" aria-label="Filtrar por estado">
        <button className={`pill ${filter === "all" ? "active" : ""}`} onClick={() => onFilter("all")} role="tab" aria-selected={filter === "all"}>
          <span>Todos</span><span className="num">{total}</span>
        </button>
        <button className={`pill ${filter === "needs-review" ? "active" : ""}`} onClick={() => onFilter("needs-review")} role="tab" aria-selected={filter === "needs-review"}>
          <span className="dot dot-needs" style={{display:"inline-block"}}/><span>Por revisar</span><span className="num">{counts["needs-review"]}</span>
        </button>
        <button className={`pill ${filter === "approved" ? "active" : ""}`} onClick={() => onFilter("approved")} role="tab" aria-selected={filter === "approved"}>
          <span className="dot dot-approved" style={{display:"inline-block"}}/><span>Aprobados</span><span className="num">{counts.approved}</span>
        </button>
        <button className={`pill ${filter === "changes-requested" ? "active" : ""}`} onClick={() => onFilter("changes-requested")} role="tab" aria-selected={filter === "changes-requested"}>
          <span className="dot dot-changes" style={{display:"inline-block"}}/><span>Cambios</span><span className="num">{counts["changes-requested"]}</span>
        </button>
      </div>
    </header>
  );
}

/* ── Component-specific previews ─────────────────────────────────────── */
// Two component treatments to verify in-place: LogosCarousel + BlurReveal.

function ComponentThumb({ treatment }) {
  if (treatment === "logos-carousel") {
    return (
      <svg viewBox="0 0 96 64" width="80" height="52" aria-hidden="true">
        <defs>
          <linearGradient id="lc-mask" x1="0" x2="1">
            <stop offset="0" stopColor="var(--color-surface-50)"/>
            <stop offset="0.2" stopColor="transparent"/>
            <stop offset="0.8" stopColor="transparent"/>
            <stop offset="1" stopColor="var(--color-surface-50)"/>
          </linearGradient>
        </defs>
        <g stroke="var(--color-text-secondary)" strokeWidth="1.25" fill="none" opacity="0.85">
          <rect x="6"  y="26" width="14" height="12" rx="2"/>
          <rect x="26" y="26" width="14" height="12" rx="2"/>
          <rect x="46" y="26" width="14" height="12" rx="2"/>
          <rect x="66" y="26" width="14" height="12" rx="2"/>
        </g>
        <rect x="0" y="20" width="96" height="24" fill="url(#lc-mask)"/>
        <path d="M 8 50 H 88" stroke="var(--accent)" strokeWidth="1.25" strokeDasharray="3 3"/>
        <path d="M 90 50 l -4 -2 v 4 z" fill="var(--accent)"/>
      </svg>
    );
  }
  if (treatment === "blur-reveal") {
    return (
      <svg viewBox="0 0 96 64" width="80" height="52" aria-hidden="true">
        <defs>
          <filter id="br-blur"><feGaussianBlur stdDeviation="2"/></filter>
        </defs>
        <g fill="var(--color-text-secondary)" opacity="0.45" filter="url(#br-blur)">
          <rect x="14" y="20" width="22" height="6" rx="1.5"/>
          <rect x="14" y="30" width="34" height="3" rx="1"/>
          <rect x="14" y="36" width="28" height="3" rx="1"/>
        </g>
        <g fill="var(--color-text-primary)">
          <rect x="50" y="20" width="22" height="6" rx="1.5"/>
          <rect x="50" y="30" width="34" height="3" rx="1" opacity="0.7"/>
          <rect x="50" y="36" width="28" height="3" rx="1" opacity="0.7"/>
        </g>
        <line x1="48" y1="14" x2="48" y2="50" stroke="var(--accent)" strokeWidth="0.75" strokeDasharray="2 2"/>
      </svg>
    );
  }
  return null;
}

function BlurRevealStage() {
  // Replay key — incrementing it forces React to remount .br-side--after,
  // which restarts the CSS animation from scratch. No classList trickery,
  // no offsetWidth reflows, no race with React's render cycle.
  const [replayKey, setReplayKey] = React.useState(0);

  return (
    <div className="brand-hero comp-hero comp-hero--blur">
      <div className="comp-meta-row">
        <span className="comp-tick">720ms · ease-out-quart</span>
        <span className="comp-tick">blur 12 → 0</span>
        <span className="comp-tick">opacity 0 → 1</span>
        <span className="comp-tick">y +8 → 0</span>
      </div>
      <div className="br-stage">
        <div className="br-side br-side--before">
          <div className="br-side-lab">estado inicial · blur(12px)</div>
          <div className="br-block br-block--blurred">
            <h4>Vergina Imperial</h4>
            <p>Una atmósfera, dos brillos. El producto habla en tono bajo y entrega mecanismos.</p>
          </div>
        </div>
        <div className="br-side br-side--after br-play" key={replayKey}>
          <div className="br-side-lab">revelado</div>
          <div className="br-block br-block--reveal">
            <h4>Vergina Imperial</h4>
            <p>Una atmósfera, dos brillos. El producto habla en tono bajo y entrega mecanismos.</p>
          </div>
        </div>
      </div>
      <div className="br-controls">
        <button
          className="br-replay"
          type="button"
          onClick={() => setReplayKey((k) => k + 1)}
        >
          ↻ replay
        </button>
        <span className="comp-caption" style={{ flex: 1 }}>
          Honra <code>prefers-reduced-motion</code>: en ese caso solo opacity 0→1, sin blur ni translate.
        </span>
      </div>
    </div>
  );
}

function ComponentPreview({ treatment }) {
  if (treatment === "logos-carousel") {
    const marks = [
      <span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, letterSpacing: "-0.04em" }}>ATLAS</span>,
      <span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, fontStyle: "italic" }}>Sigma</span>,
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, letterSpacing: "0.18em" }}>▲ NORD</span>,
      <span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500 }}>Kessel<span style={{ color: "var(--accent)" }}>.</span></span>,
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 16, fontWeight: 500 }}>obliq/</span>,
      <span style={{ fontFamily: "var(--font-display)", fontSize: 14, letterSpacing: "0.22em", fontWeight: 500 }}>MERIDIAN</span>,
      <span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600 }}>Fe<span style={{ color: "var(--accent)" }}>·</span>rrum</span>,
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 16, letterSpacing: "0.04em" }}>halt()</span>
    ];
    const reel = [...marks, ...marks];
    return (
      <div className="brand-hero comp-hero comp-hero--carousel">
        <div className="comp-meta-row">
          <span className="comp-tick">60s · ciclo</span>
          <span className="comp-tick">pausa en hover</span>
          <span className="comp-tick">mask 12% lateral</span>
        </div>
        <div className="lc-marquee">
          <div className="lc-track">
            {reel.map((m, i) => (<div className="lc-cell" key={i}>{m}</div>))}
          </div>
        </div>
        <div className="lc-marquee lc-marquee--rev">
          <div className="lc-track lc-track--rev">
            {reel.map((m, i) => (<div className="lc-cell lc-cell--alt" key={"r"+i}>{m}</div>))}
          </div>
        </div>
        <div className="comp-caption">
          Sin <code>requestAnimationFrame</code>. Animación lineal sobre <code>translateX(-50%)</code>; el track contiene la lista duplicada para empalmar sin salto. La fila inferior corre en sentido inverso.
        </div>
      </div>
    );
  }

  if (treatment === "blur-reveal") {
    return <BlurRevealStage />;
  }

  return null;
}

/* Export to window so other scripts can use these */
Object.assign(window, {
  AssetCard, Sidebar, ReviewHeader, BrandPreview, BrandThumb, ComponentPreview, ComponentThumb,
  IconCheck, IconAlert, IconRevert, IconChevron, IconExternal, IconComment, IconDot,
  IconType, IconColor, IconRuler, IconBlock, IconBrand,
  KIND_ICONS, STATUS_LABELS, STATUS_DOT, relativeTime
});
