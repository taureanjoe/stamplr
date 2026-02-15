"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import {
  STATES_WITH_TEMPLATES,
  SEAL_TYPES,
  PE_DISCIPLINES,
  SEAL_TYPE_DISCIPLINES,
} from "@/lib/stamp/constants";

/* ── Preview hook (unchanged) ── */
function useStampSvg(params: {
  state: string;
  name: string;
  license: string;
  discipline: string;
  watermarked: boolean;
}) {
  const [svg, setSvg] = useState<string | null>(null);
  const [previewError, setPreviewError] = useState(false);
  useEffect(() => {
    let cancelled = false;
    setPreviewError(false);
    const q = new URLSearchParams({
      state: params.state,
      name: params.name,
      license: params.license,
      discipline: params.discipline,
      watermarked: params.watermarked ? "1" : "0",
    });
    fetch(`/api/preview?${q}`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const ct = r.headers.get("content-type") || "";
        if (!ct.includes("svg")) throw new Error("Not SVG");
        return r.text();
      })
      .then((text) => {
        if (!cancelled) setSvg(text);
      })
      .catch(() => {
        if (!cancelled) {
          setSvg(null);
          setPreviewError(true);
        }
      });
    return () => { cancelled = true; };
  }, [params.state, params.name, params.license, params.discipline, params.watermarked]);
  return { svg, previewError };
}

function downloadUrl(
  params: { state: string; name: string; license: string; discipline: string; watermarked: boolean },
  format: string
) {
  const q = new URLSearchParams({
    state: params.state,
    name: params.name,
    license: params.license,
    discipline: params.discipline,
    watermarked: params.watermarked ? "1" : "0",
    format,
  });
  return `/api/export?${q}`;
}

/* ── Accordion section ── */
function AccSection({
  label,
  defaultOpen = true,
  children,
}: {
  label: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      {/* Mobile accordion header (hidden on desktop via CSS) */}
      <div
        className="acc-mobile-header"
        style={{ alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', cursor: 'pointer', userSelect: 'none', WebkitUserSelect: 'none' }}
        onClick={() => setOpen(!open)}
      >
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-dim)', fontWeight: 500 }}>
          {label}
        </span>
        <span style={{ color: 'var(--text-muted)', fontSize: 12, transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', lineHeight: 1 }}>
          ▾
        </span>
      </div>
      {/* Desktop static label */}
      <div className="acc-desktop-label" style={{ fontFamily: "'DM Mono', monospace", fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 500, padding: '12px 0 8px 2px' }}>
        {label}
      </div>
      {/* Body: always visible on desktop, toggled on mobile */}
      <div
        className="md:!flex"
        style={{
          display: open ? 'flex' : 'none',
          flexDirection: 'column', gap: 10, paddingBottom: open ? 16 : 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ── Size Stepper ── */
function SizeStepper({ label, value, min, max, onDec, onInc, onReset }: {
  label: string; value: number; min: number; max: number;
  onDec: () => void; onInc: () => void; onReset: () => void;
}) {
  const btnStyle: React.CSSProperties = {
    width: 30, height: 30, borderRadius: 6,
    border: '1px solid var(--border-accent)', background: 'var(--bg3)',
    color: 'var(--text-dim)', fontSize: 16, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0, padding: 0, fontFamily: "'DM Sans', sans-serif", lineHeight: 1,
    touchAction: 'manipulation',
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.06em', minWidth: 28 }}>{label}</span>
      <button type="button" style={btnStyle} onClick={onDec} disabled={value <= min} aria-label={`decrease ${label}`}>−</button>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'var(--text-dim)', minWidth: 30, textAlign: 'center' }}>{value}</span>
      <button type="button" style={btnStyle} onClick={onInc} disabled={value >= max} aria-label={`increase ${label}`}>+</button>
      <button type="button" onClick={onReset} style={{
        fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: '0.07em',
        color: 'var(--text-muted)', background: 'none', border: '1px solid var(--border)',
        borderRadius: 4, padding: '0 8px', cursor: 'pointer', height: 30,
        display: 'flex', alignItems: 'center', textTransform: 'uppercase', touchAction: 'manipulation',
      }}>Reset</button>
    </div>
  );
}

/* ── Toggle ── */
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label style={{ position: 'relative', width: 36, height: 20, cursor: 'pointer', flexShrink: 0 }}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} style={{ display: 'none' }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: checked ? 'var(--accent-dim)' : 'var(--bg3)',
        border: checked ? '1px solid rgba(96,165,250,0.4)' : '1px solid var(--border-accent)',
        borderRadius: 20, transition: 'all 0.2s',
      }} />
      <div style={{
        position: 'absolute', top: 3, left: checked ? 19 : 3,
        width: 12, height: 12,
        background: checked ? 'var(--accent)' : 'var(--text-muted)',
        borderRadius: '50%', transition: 'all 0.2s',
      }} />
    </label>
  );
}

export default function DesignPage() {
  const [sealType, setSealType] = useState("pe");
  const [state, setState] = useState("tx");
  const [name, setName] = useState("");
  const [license, setLicense] = useState("");
  const [discipline, setDiscipline] = useState("Civil");
  const [fileType, setFileType] = useState<"svg" | "png" | "pdf">("svg");
  const [watermarked, setWatermarked] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [nameSize, setNameSize] = useState(18);
  const [licSize, setLicSize] = useState(14);
  const [wrapName, setWrapName] = useState(false);
  const [showDiscOnSeal, setShowDiscOnSeal] = useState(true);

  const displayName = name || "JOHN DOE";
  const displayLicense = license || "000000";
  const { svg, previewError } = useStampSvg({
    state,
    name: displayName,
    license: displayLicense,
    discipline,
    watermarked,
  });
  const params = { state, name: displayName, license: displayLicense, discipline, watermarked };

  const availableStates = STATES_WITH_TEMPLATES.filter((s) => s.stampType === sealType);
  const currentStateConfig = STATES_WITH_TEMPLATES.find((s) => s.code === state);
  const disciplines = (SEAL_TYPE_DISCIPLINES[sealType] ?? PE_DISCIPLINES) as readonly string[];
  const showDiscipline = sealType === "pe";

  useEffect(() => {
    const states = STATES_WITH_TEMPLATES.filter((s) => s.stampType === sealType);
    const exists = states.some((s) => s.code === state);
    if (!exists && states.length > 0) setState(states[0].code);
  }, [sealType, state]);

  function handleGenerate() {
    setGenerating(true);
    setTimeout(() => {
      const url = downloadUrl(params, fileType);
      const a = document.createElement("a");
      a.href = url;
      a.download = `stamp.${fileType}`;
      a.click();
      setGenerating(false);
    }, 800);
  }

  const hasData = name.trim() !== "" || license.trim() !== "";
  const stateName = currentStateConfig?.name ?? "—";

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>

      {/* ── NAV ── */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px', height: 52,
        borderBottom: '1px solid var(--border)',
        background: 'rgba(12,12,14,0.95)', backdropFilter: 'blur(14px)',
        position: 'sticky', top: 0, zIndex: 200,
      }}>
        <Logo />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: 8.5,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            background: 'rgba(74,222,128,0.12)', color: '#4ade80',
            border: '1px solid rgba(74,222,128,0.25)',
            padding: '2px 6px', borderRadius: 20, fontWeight: 500,
          }}>
            Beta
          </span>
          <Link href="/" className="btn-glass">Home</Link>
        </div>
      </nav>

      {/* ── PAGE BODY ── */}
      <div className="flex flex-col pb-[90px] md:!grid md:!pb-0 md:!items-start" style={{ minHeight: 'calc(100vh - 52px)' }} id="pageBody">
        <style>{`
          .acc-mobile-header { display: flex; }
          .acc-desktop-label { display: none; }
          @media (min-width: 768px) {
            #pageBody {
              display: grid !important;
              grid-template-columns: 340px 1fr !important;
              align-items: start !important;
              min-height: calc(100vh - 52px) !important;
              padding-bottom: 0 !important;
            }
            .acc-mobile-header { display: none !important; }
            .acc-desktop-label { display: block !important; }
          }
        `}</style>

        {/* ─── FORM AREA (left sidebar on desktop) ─── */}
        <style>{`
          @media (min-width: 768px) {
            #formArea {
              border-right: 1px solid var(--border) !important;
              padding: 22px 20px !important;
              min-height: calc(100vh - 52px) !important;
              overflow-y: auto !important;
            }
          }
        `}</style>
        <div id="formArea" style={{
          padding: '0 16px',
          display: 'flex', flexDirection: 'column', gap: 0,
        }}>

          {/* Credential Type */}
          <AccSection label="Credential Type">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <div className="select-wrap" style={{ position: 'relative' }}>
                <select value={sealType} onChange={(e) => setSealType(e.target.value)} className="input-dark">
                  {SEAL_TYPES.filter((t) => !t.comingSoon).map((t) => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                  {SEAL_TYPES.filter((t) => t.comingSoon).map((t) => (
                    <option key={t.id} value={t.id} disabled>{t.name} (Coming Soon)</option>
                  ))}
                </select>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-dim)', letterSpacing: '0.01em' }}>State</label>
                <select value={state} onChange={(e) => setState(e.target.value)} className="input-dark">
                  {availableStates.map((s) => (
                    <option key={s.code} value={s.code}>{s.name}</option>
                  ))}
                </select>
              </div>
              {showDiscipline && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-dim)', letterSpacing: '0.01em' }}>
                    Discipline
                    {currentStateConfig?.requiresDiscipline && (
                      <span style={{ color: 'var(--accent)', marginLeft: 4, fontSize: 10 }}>★</span>
                    )}
                  </label>
                  <select value={discipline} onChange={(e) => setDiscipline(e.target.value)} className="input-dark">
                    {disciplines.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </AccSection>

          {/* Engineer Details */}
          <AccSection label="Engineer Details">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-dim)' }}>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="First and Last name"
                className="input-dark"
                autoComplete="name"
              />
              <SizeStepper
                label="Size"
                value={nameSize}
                min={10}
                max={26}
                onDec={() => setNameSize((v) => Math.max(10, v - 1))}
                onInc={() => setNameSize((v) => Math.min(26, v + 1))}
                onReset={() => setNameSize(18)}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-dim)' }}>License Number</label>
              <input
                type="text"
                value={license}
                onChange={(e) => setLicense(e.target.value)}
                placeholder="Numeric ID"
                className="input-dark"
                maxLength={12}
                inputMode="numeric"
              />
              <SizeStepper
                label="Size"
                value={licSize}
                min={8}
                max={22}
                onDec={() => setLicSize((v) => Math.max(8, v - 1))}
                onInc={() => setLicSize((v) => Math.min(22, v + 1))}
                onReset={() => setLicSize(14)}
              />
              <span className="hint-text">Must match your board-issued license number exactly</span>
            </div>
          </AccSection>

          {/* Appearance */}
          <AccSection label="Appearance">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 0', minHeight: 36 }}>
              <span style={{ fontSize: 13, color: 'var(--text-dim)' }}>Word wrap name</span>
              <Toggle checked={wrapName} onChange={setWrapName} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 0', minHeight: 36 }}>
              <span style={{ fontSize: 13, color: 'var(--text-dim)' }}>Show discipline on seal</span>
              <Toggle checked={showDiscOnSeal} onChange={setShowDiscOnSeal} />
            </div>
          </AccSection>

          {/* Included Formats */}
          <AccSection label="Included Formats">
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {(["svg", "png", "pdf"] as const).map((fmt) => {
                const dotColor = fmt === "svg" ? "#60a5fa" : fmt === "png" ? "#a78bfa" : "var(--red)";
                return (
                  <button
                    key={fmt}
                    onClick={() => setFileType(fmt)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 5,
                      padding: '5px 11px', borderRadius: 20,
                      border: fileType === fmt ? '1px solid var(--accent)' : '1px solid var(--border-accent)',
                      background: fileType === fmt ? 'var(--accent-dim)' : 'var(--bg3)',
                      fontFamily: "'DM Mono', monospace", fontSize: 10.5, fontWeight: 500,
                      color: fileType === fmt ? 'var(--accent)' : 'var(--text-dim)',
                      letterSpacing: '0.04em', cursor: 'pointer', textTransform: 'uppercase',
                    }}
                  >
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: dotColor }} />
                    {fmt}
                  </button>
                );
              })}
            </div>
            <span className="hint-text">All formats delivered in a single ZIP download</span>
          </AccSection>

          {/* Legal box (desktop only) */}
          <style>{`
            #desktopLegal { display: none; }
            #desktopGenBtn { display: none; }
            @media (min-width: 768px) {
              #desktopLegal { display: flex !important; }
              #desktopGenBtn { display: flex !important; }
            }
          `}</style>
          <div id="desktopLegal" style={{
            background: 'var(--bg3)', border: '1px solid var(--border)',
            borderLeft: '2px solid var(--amber)', borderRadius: 'var(--radius-sm)',
            padding: '10px 12px', gap: 9, alignItems: 'flex-start', margin: '6px 0 4px',
          }}>
            <span style={{ fontSize: 13, color: 'var(--amber)', flexShrink: 0, marginTop: 1 }}>⚠</span>
            <p style={{ fontSize: 11, color: 'var(--text-dim)', lineHeight: 1.55 }}>
              This seal is for <strong style={{ color: 'var(--text)' }}>authorized use only</strong>. Misuse of a professional seal is a violation of state licensing law.
            </p>
          </div>

          {/* Generate button (desktop) */}
          <button
            onClick={handleGenerate}
            disabled={generating}
            id="desktopGenBtn"
            style={{
              width: '100%', padding: 13, borderRadius: 'var(--radius)',
              background: 'var(--accent)', color: '#fff',
              fontFamily: "'DM Sans', sans-serif", fontSize: 14.5, fontWeight: 600,
              border: 'none', cursor: 'pointer', transition: 'all 0.18s',
              alignItems: 'center', justifyContent: 'center', gap: 8,
              margin: '12px 0 4px', opacity: generating ? 0.7 : 1,
            }}
          >
            {generating ? (
              <><span style={{ display: 'inline-block', animation: 'spin 0.7s linear infinite' }}>◌</span> Generating…</>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                Generate Seal
              </>
            )}
          </button>

        </div>

        {/* ─── PREVIEW STRIP (right side on desktop) ─── */}
        <style>{`
          @media (min-width: 768px) {
            #previewStrip { min-height: calc(100vh - 52px) !important; }
            #previewCanvas { flex-direction: row !important; gap: 50px !important; padding: 40px !important; }
            #previewHeader { padding-left: 28px !important; padding-right: 28px !important; }
            #statusBar { padding-left: 28px !important; padding-right: 28px !important; justify-content: space-between !important; }
            #stampCircle { width: 260px !important; height: 260px !important; }
          }
        `}</style>
        <div id="previewStrip" style={{ background: 'var(--bg2)', display: 'flex', flexDirection: 'column' }}>
          {/* Preview header */}
          <div id="previewHeader" style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 16px', borderBottom: '1px solid var(--border)', flexShrink: 0,
          }}>
            <div style={{
              fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'var(--text-muted)',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <div style={{
                width: 6, height: 6, borderRadius: '50%',
                background: '#4ade80', boxShadow: '0 0 6px rgba(74,222,128,0.8)',
                animation: 'pulse 2s ease-in-out infinite', flexShrink: 0,
              }} />
              Live Preview
            </div>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
              {stateName} · {discipline} · PE
            </span>
          </div>

          {/* Preview canvas */}
          <div id="previewCanvas" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px 16px', gap: 14 }}>

            {/* Stamp */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div id="stampCircle" style={{
                width: 220, height: 220, borderRadius: '50%', overflow: 'hidden',
                border: '1px solid var(--border-accent)',
                boxShadow: '0 0 40px rgba(0,0,0,0.5), 0 0 20px rgba(96,165,250,0.06)',
                background: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
              }}>
                {svg ? (
                  <div
                    style={{ width: 'calc(100% - 16px)', height: 'calc(100% - 16px)' }}
                    dangerouslySetInnerHTML={{ __html: svg.replace(
                      /<svg /,
                      '<svg style="width:100%;height:100%;display:block" '
                    )}}
                  />
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    {previewError ? (
                      <>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        <p style={{ color: '#999', fontFamily: "'DM Mono', monospace", fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Unavailable</p>
                      </>
                    ) : (
                      <div style={{ width: 20, height: 20, border: '2px solid #ccc', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                    )}
                  </div>
                )}

                {/* Watermark overlay */}
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: '50%', overflow: 'hidden' }}>
                  <svg viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                    <text transform="rotate(-25, 130, 130)" fontFamily="'DM Sans', sans-serif" fontSize="11" fontWeight="700" fill="rgba(0,0,0,0.10)" letterSpacing="1" textAnchor="middle">
                      <tspan x="130" y="52">PREVIEW</tspan>
                      <tspan x="70" y="80">PREVIEW</tspan>
                      <tspan x="190" y="80">PREVIEW</tspan>
                      <tspan x="40" y="112">PREVIEW</tspan>
                      <tspan x="130" y="112">PREVIEW</tspan>
                      <tspan x="220" y="112">PREVIEW</tspan>
                      <tspan x="70" y="144">PREVIEW</tspan>
                      <tspan x="190" y="144">PREVIEW</tspan>
                      <tspan x="40" y="176">PREVIEW</tspan>
                      <tspan x="130" y="176">PREVIEW</tspan>
                      <tspan x="220" y="176">PREVIEW</tspan>
                      <tspan x="70" y="208">PREVIEW</tspan>
                      <tspan x="190" y="208">PREVIEW</tspan>
                      <tspan x="130" y="236">PREVIEW</tspan>
                    </text>
                  </svg>
                </div>
              </div>
              {/* Preview Only badge */}
              <div style={{
                position: 'absolute', top: -6, right: -6,
                background: 'var(--amber)', color: '#000',
                fontFamily: "'DM Mono', monospace", fontSize: 8, fontWeight: 500,
                letterSpacing: '0.06em', textTransform: 'uppercase',
                padding: '2px 7px', borderRadius: 20, whiteSpace: 'nowrap',
              }}>
                Preview Only
              </div>
            </div>

            {/* Desktop info panel beside stamp */}
            <style>{`
              #desktopInfoPanel { display: none; }
              @media (min-width: 768px) { #desktopInfoPanel { display: flex !important; } }
            `}</style>
            <div id="desktopInfoPanel" style={{ flexDirection: 'column', gap: 18, maxWidth: 240 }}>
              <div>
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, fontWeight: 700, letterSpacing: '-0.3px', color: 'var(--text)', marginBottom: 4 }}>
                  {name || "Your Name"}
                </h3>
                <p style={{ fontSize: 12.5, color: 'var(--text-dim)', lineHeight: 1.5 }}>
                  <span style={{ color: 'var(--text)', fontWeight: 500 }}>{stateName}</span> Professional Engineer<br />
                  <span style={{ color: 'var(--text)', fontWeight: 500 }}>{discipline}</span> · License <span style={{ color: 'var(--text)', fontWeight: 500 }}>{license || "—"}</span>
                </p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: '0.04em', padding: '3px 8px', borderRadius: 20, background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)', color: '#4ade80' }}>
                  {hasData ? 'Seal Ready' : 'Waiting'}
                </span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, padding: '3px 8px', borderRadius: 20, border: '1px solid var(--border-accent)', color: 'var(--text-dim)', background: 'var(--bg3)' }}>Vector SVG</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, padding: '3px 8px', borderRadius: 20, border: '1px solid var(--border-accent)', color: 'var(--text-dim)', background: 'var(--bg3)' }}>300 DPI PNG</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, padding: '3px 8px', borderRadius: 20, border: '1px solid var(--border-accent)', color: 'var(--text-dim)', background: 'var(--bg3)' }}>Print PDF</span>
              </div>

              {/* Desktop unlock panel */}
              <div style={{
                display: 'flex', flexDirection: 'column', gap: 9,
                background: 'var(--bg3)', border: '1px solid var(--border-accent)',
                borderRadius: 'var(--radius)', padding: 14,
              }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, fontWeight: 600, color: 'var(--text)' }}>
                  Download your seal
                </div>
                <p style={{ fontSize: 11.5, color: 'var(--text-dim)', lineHeight: 1.5 }}>
                  Unlock the high-resolution, watermark-free seal in all formats with a one-time purchase.
                </p>
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9.5, fontWeight: 500, padding: '2px 8px', borderRadius: 4, border: '1px solid var(--border-accent)', color: 'var(--text-dim)', background: 'var(--bg3)', letterSpacing: '0.04em' }}>SVG</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9.5, fontWeight: 500, padding: '2px 8px', borderRadius: 4, border: '1px solid var(--border-accent)', color: 'var(--text-dim)', background: 'var(--bg3)', letterSpacing: '0.04em' }}>PNG</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9.5, fontWeight: 500, padding: '2px 8px', borderRadius: 4, border: '1px solid var(--border-accent)', color: 'var(--text-dim)', background: 'var(--bg3)', letterSpacing: '0.04em' }}>PDF</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9.5, fontWeight: 500, padding: '2px 8px', borderRadius: 4, border: '1px dashed var(--border-accent)', color: 'var(--text-muted)', background: 'var(--bg3)', letterSpacing: '0.04em' }}>+ ZIP</span>
                </div>
                <button
                  onClick={handleGenerate}
                  style={{
                    width: '100%', padding: 10, borderRadius: 'var(--radius)',
                    background: '#ffffff', color: '#000',
                    fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
                    border: 'none', cursor: 'pointer', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', gap: 8,
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  Unlock &amp; Download — $5
                </button>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', textAlign: 'center', letterSpacing: '0.01em' }}>
                  One-time payment · No subscription · Instant ZIP
                </div>
              </div>
            </div>

          </div>

          {/* Mobile info row below stamp */}
          <style>{`
            #mobileInfoRow { display: flex; }
            #mobileGenWrap { display: block; }
            #mobileLegal { display: flex; }
            @media (min-width: 768px) {
              #mobileInfoRow { display: none !important; }
              #mobileGenWrap { display: none !important; }
              #mobileLegal { display: none !important; }
            }
          `}</style>
          <div id="mobileInfoRow" style={{
            width: '100%', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 16px 8px',
          }}>
            <div>
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700, letterSpacing: '-0.2px', color: 'var(--text)' }}>
                {name || "Your Name"}
              </h3>
              <p style={{ fontSize: 11.5, color: 'var(--text-dim)', marginTop: 1 }}>
                <span style={{ color: 'var(--text)', fontWeight: 500 }}>{stateName}</span> PE · <span style={{ color: 'var(--text)', fontWeight: 500 }}>{discipline}</span> · Lic <span style={{ color: 'var(--text)', fontWeight: 500 }}>{license || "—"}</span>
              </p>
            </div>
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, padding: '3px 8px', borderRadius: 20, background: hasData ? 'rgba(74,222,128,0.1)' : 'var(--bg3)', border: hasData ? '1px solid rgba(74,222,128,0.3)' : '1px solid var(--border-accent)', color: hasData ? '#4ade80' : 'var(--text-dim)' }}>
                {hasData ? 'Ready' : 'Waiting'}
              </span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, padding: '3px 8px', borderRadius: 20, border: '1px solid var(--border-accent)', color: 'var(--text-dim)', background: 'var(--bg3)' }}>{fileType.toUpperCase()}</span>
            </div>
          </div>

          {/* Mobile generate button */}
          <div id="mobileGenWrap" style={{ padding: '0 16px 8px' }}>
            <button
              onClick={handleGenerate}
              disabled={generating}
              style={{
                width: '100%', padding: 13, borderRadius: 'var(--radius)',
                background: 'var(--accent)', color: '#fff',
                fontFamily: "'DM Sans', sans-serif", fontSize: 14.5, fontWeight: 600,
                border: 'none', cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center', gap: 8,
                opacity: generating ? 0.7 : 1,
              }}
            >
              {generating ? (
                <><span style={{ display: 'inline-block', animation: 'spin 0.7s linear infinite' }}>◌</span> Generating…</>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                  Generate Seal
                </>
              )}
            </button>
          </div>

          {/* Status bar */}
          <div id="statusBar" style={{
            padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10,
            flexWrap: 'wrap', borderTop: '1px solid var(--border)', flexShrink: 0,
          }}>
            {[
              ['Dim', '4" × 4"'],
              ['Res', '300 DPI'],
              ['Color', 'CMYK'],
            ].map(([label, val]) => (
              <div key={label} style={{ fontFamily: "'DM Mono', monospace", fontSize: 9.5, color: 'var(--text-muted)', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: 4 }}>
                {label} <span style={{ color: 'var(--text-dim)' }}>{val}</span>
              </div>
            ))}
          </div>

          {/* Mobile legal */}
          <div id="mobileLegal" style={{
            background: 'var(--bg3)', border: '1px solid var(--border)',
            borderLeft: '2px solid var(--amber)', borderRadius: 'var(--radius-sm)',
            padding: '10px 12px', gap: 9, alignItems: 'flex-start',
            margin: '0 16px 6px',
          }}>
            <span style={{ fontSize: 13, color: 'var(--amber)', flexShrink: 0, marginTop: 1 }}>⚠</span>
            <p style={{ fontSize: 11, color: 'var(--text-dim)', lineHeight: 1.55 }}>
              This seal is for <strong style={{ color: 'var(--text)' }}>authorized use only</strong>. Misuse is a violation of state licensing law.
            </p>
          </div>

        </div>

      </div>

      {/* ── STICKY UNLOCK BAR (mobile only) ── */}
      <style>{`
        #unlockBar { display: flex; }
        @media (min-width: 768px) { #unlockBar { display: none !important; } }
      `}</style>
      <div id="unlockBar" style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'rgba(19,19,23,0.97)', backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid var(--border-accent)',
        padding: '12px 16px', paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
        zIndex: 150, flexDirection: 'column', gap: 6,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            {["SVG", "PNG", "PDF"].map((f) => (
              <span key={f} style={{ fontFamily: "'DM Mono', monospace", fontSize: 9.5, fontWeight: 500, padding: '2px 8px', borderRadius: 4, border: '1px solid var(--border-accent)', color: 'var(--text-dim)', background: 'var(--bg3)', letterSpacing: '0.04em' }}>{f}</span>
            ))}
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9.5, fontWeight: 500, padding: '2px 8px', borderRadius: 4, border: '1px dashed var(--border-accent)', color: 'var(--text-muted)', background: 'var(--bg3)', letterSpacing: '0.04em' }}>ZIP</span>
          </div>
          <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>
            One-time · <strong style={{ color: 'var(--text)', fontWeight: 600 }}>$5</strong>
          </span>
        </div>
        <button
          onClick={handleGenerate}
          style={{
            width: '100%', padding: 13, borderRadius: 'var(--radius)',
            background: '#ffffff', color: '#000',
            fontFamily: "'DM Sans', sans-serif", fontSize: 14.5, fontWeight: 600,
            border: 'none', cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          Unlock &amp; Download — $5
        </button>
        <div style={{ fontSize: 10, color: 'var(--text-muted)', textAlign: 'center' }}>
          Watermark-free · No subscription · Instant ZIP
        </div>
      </div>

    </div>
  );
}
