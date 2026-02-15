"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { BottomNav } from "@/components/BottomNav";
import {
  STATES_WITH_TEMPLATES,
  SEAL_TYPES,
  PE_DISCIPLINES,
  SEAL_TYPE_DISCIPLINES,
} from "@/lib/stamp/constants";

function useStampSvg(params: {
  state: string;
  name: string;
  license: string;
  discipline: string;
  watermarked: boolean;
}) {
  const [svg, setSvg] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    const q = new URLSearchParams({
      state: params.state,
      name: params.name,
      license: params.license,
      discipline: params.discipline,
      watermarked: params.watermarked ? "1" : "0",
    });
    fetch(`/api/preview?${q}`)
      .then((r) => r.text())
      .then((text) => {
        if (!cancelled) setSvg(text);
      })
      .catch(() => {
        if (!cancelled) setSvg(null);
      });
    return () => {
      cancelled = true;
    };
  }, [params.state, params.name, params.license, params.discipline, params.watermarked]);
  return svg;
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

export default function DesignPage() {
  const [sealType, setSealType] = useState("pe");
  const [state, setState] = useState("tx");
  const [name, setName] = useState("");
  const [license, setLicense] = useState("");
  const [discipline, setDiscipline] = useState("Civil");
  const [fileType, setFileType] = useState<"svg" | "png" | "pdf">("svg");
  const [watermarked, setWatermarked] = useState(false);
  const [copied, setCopied] = useState(false);

  const displayName = name || "JOHN DOE";
  const displayLicense = license || "No. PE123456";
  const svg = useStampSvg({
    state,
    name: displayName,
    license: displayLicense,
    discipline,
    watermarked,
  });
  const params = {
    state,
    name: displayName,
    license: displayLicense,
    discipline,
    watermarked,
  };

  const availableStates = STATES_WITH_TEMPLATES.filter((s) => s.stampType === sealType);
  const currentStateConfig = STATES_WITH_TEMPLATES.find((s) => s.code === state);
  const disciplines = (SEAL_TYPE_DISCIPLINES[sealType] ?? PE_DISCIPLINES) as readonly string[];
  const showDiscipline = sealType === "pe";

  useEffect(() => {
    const states = STATES_WITH_TEMPLATES.filter((s) => s.stampType === sealType);
    const exists = states.some((s) => s.code === state);
    if (!exists && states.length > 0) {
      setState(states[0].code);
    }
  }, [sealType, state]);

  function handleGenerateStamp() {
    const url = downloadUrl(params, fileType);
    const a = document.createElement("a");
    a.href = url;
    a.download = `stamp.${fileType}`;
    a.click();
  }

  function handleCopySvg() {
    if (svg) {
      navigator.clipboard.writeText(svg);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const hasData = name.trim() !== "" || license.trim() !== "";

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ background: '#0f0f11' }}>

      {/* Header */}
      <header className="relative z-10" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(24,24,28,0.9)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-4">
            <Logo />
            <span
              className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] tracking-[1px]"
              style={{ fontFamily: "'Share Tech Mono', monospace", color: '#4e9eff', background: 'rgba(78,158,255,0.08)', border: '1px solid rgba(78,158,255,0.2)' }}
            >
              SEAL GENERATOR
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <Link href="/design" className="font-medium" style={{ color: '#fff' }}>
              Create Stamp
            </Link>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#support" className="hover:text-white transition-colors">Support</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/" className="btn-glass shrink-0">
              Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 pb-24 md:pb-0">
        <div className="flex flex-col lg:flex-row" style={{ minHeight: 'calc(100vh - 56px)' }}>

          {/* Left Panel */}
          <div
            className="lg:w-[400px] lg:shrink-0 p-6 lg:p-7 overflow-y-auto"
            style={{ background: 'rgba(24,24,28,0.7)', borderRight: '1px solid rgba(255,255,255,0.06)' }}
          >
            {/* Seal Configuration */}
            <h2 className="section-title">Seal Configuration</h2>

            <div className="space-y-5">
              <div>
                <label className="field-label">Credential Type</label>
                <select
                  value={sealType}
                  onChange={(e) => setSealType(e.target.value)}
                  className="input-dark"
                >
                  {SEAL_TYPES.filter((t) => !t.comingSoon).map((t) => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                  {SEAL_TYPES.filter((t) => t.comingSoon).map((t) => (
                    <option key={t.id} value={t.id} disabled>{t.name} (Coming Soon)</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="field-label">State</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="input-dark"
                >
                  {availableStates.map((s) => (
                    <option key={s.code} value={s.code}>{s.name}</option>
                  ))}
                </select>
              </div>

              {showDiscipline && (
                <div>
                  <label className="field-label">
                    Discipline
                    {currentStateConfig?.requiresDiscipline && (
                      <span style={{ color: '#4e9eff', marginLeft: 6, fontSize: 11 }}>(shown on stamp)</span>
                    )}
                  </label>
                  <select
                    value={discipline}
                    onChange={(e) => setDiscipline(e.target.value)}
                    className="input-dark"
                  >
                    {disciplines.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '24px 0' }} />

            {/* Engineer Details */}
            <h2 className="section-title">Engineer Details</h2>
            <div className="space-y-5">
              <div>
                <label className="field-label">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="JOHN DOE"
                  className="input-dark"
                />
                <p className="hint-text">First and last name</p>
              </div>
              <div>
                <label className="field-label">License Number</label>
                <input
                  type="text"
                  value={license}
                  onChange={(e) => setLicense(e.target.value)}
                  placeholder="PE123456"
                  className="input-dark"
                />
                <p className="hint-text">Numeric license ID</p>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '24px 0' }} />

            {/* Output Format */}
            <h2 className="section-title">Output Format</h2>
            <div className="flex gap-2 mb-6">
              {(["svg", "png", "pdf"] as const).map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setFileType(fmt)}
                  className="flex-1 py-2.5 text-xs uppercase tracking-widest rounded-md border transition-all"
                  style={
                    fileType === fmt
                      ? { background: 'rgba(78,158,255,0.12)', borderColor: 'rgba(78,158,255,0.4)', color: '#4e9eff', fontFamily: "'Share Tech Mono', monospace" }
                      : { background: 'transparent', borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)', fontFamily: "'Share Tech Mono', monospace" }
                  }
                >
                  {fmt}
                </button>
              ))}
            </div>

            {/* Download */}
            <button
              type="button"
              onClick={handleGenerateStamp}
              className="btn-accent w-full"
            >
              Download {fileType.toUpperCase()}
            </button>

            {/* Copy SVG */}
            <button
              type="button"
              onClick={handleCopySvg}
              className="btn-outline-purple w-full mt-3"
            >
              {copied ? "Copied!" : "Copy SVG Code"}
            </button>
          </div>

          {/* Right Panel - Preview */}
          <div
            className="flex-1 flex flex-col items-center justify-center p-6 lg:p-10 relative"
            style={{ background: '#111114', minHeight: 400 }}
          >
            {/* Preview Label */}
            <div
              className="absolute top-5 left-7"
              style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}
            >
              Live Preview
            </div>

            {/* White Background Preview Container */}
            <div className="w-full" style={{ maxWidth: 480 }}>
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: 12,
                  padding: 24,
                  boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                }}
              >
                {svg ? (
                  <div
                    style={{ width: '100%' }}
                    dangerouslySetInnerHTML={{ __html: svg.replace(
                      /<svg /,
                      '<svg style="width:100%;height:auto;display:block" '
                    )}}
                  />
                ) : (
                  <div style={{ aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <p style={{ color: '#999', fontFamily: "'Share Tech Mono', monospace", fontSize: 11, letterSpacing: 2, textTransform: 'uppercase' }}>Loading preview...</p>
                  </div>
                )}
              </div>
            </div>

            {/* Status bar */}
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                bottom: 16,
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 10,
                letterSpacing: 1,
                padding: '5px 16px',
                borderRadius: 20,
                whiteSpace: 'nowrap',
                ...(hasData
                  ? { color: '#4ade80', borderColor: 'rgba(74,222,128,0.3)', background: 'rgba(74,222,128,0.05)', border: '1px solid rgba(74,222,128,0.3)' }
                  : { color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(24,24,28,0.6)' }
                ),
              }}
            >
              {hasData ? `${displayName} \u00b7 ${discipline.toUpperCase()} \u00b7 ${displayLicense}` : "Enter details to preview"}
            </div>
          </div>

        </div>
      </main>

      <BottomNav />
    </div>
  );
}
