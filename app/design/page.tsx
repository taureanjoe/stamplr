"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { US_STATES, PE_DISCIPLINES } from "@/lib/stamp/constants";

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

function downloadUrl(params: { state: string; name: string; license: string; discipline: string; watermarked: boolean }, format: string) {
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
  const [state, setState] = useState("tx");
  const [name, setName] = useState("JOHN M. DOE");
  const [license, setLicense] = useState("000000");
  const [discipline, setDiscipline] = useState("Civil");
  const [watermarked, setWatermarked] = useState(true);

  const svg = useStampSvg({ state, name, license, discipline, watermarked });
  const params = { state, name, license, discipline, watermarked };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f7]">
      <header className="border-b border-slate-200 bg-[#faf9f7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Logo />
          <Link href="/" className="text-stamplr-gray hover:text-slate-900 text-sm font-medium">
            ← Home
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold text-stamplr-gray mb-8">Design your stamp</h1>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">State</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 bg-white"
              >
                {US_STATES.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Field / Discipline</label>
              <select
                value={discipline}
                onChange={(e) => setDiscipline(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 bg-white"
              >
                {PE_DISCIPLINES.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="JOHN M. DOE"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">License number</label>
              <input
                type="text"
                value={license}
                onChange={(e) => setLicense(e.target.value)}
                placeholder="000000"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 bg-white"
              />
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={watermarked}
                onChange={(e) => setWatermarked(e.target.checked)}
                className="rounded border-slate-300"
              />
              <span className="text-sm text-slate-700">Show sample watermark</span>
            </label>

            <div className="pt-4 border-t border-slate-200">
              <p className="text-sm font-medium text-slate-700 mb-3">Download</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={downloadUrl(params, "svg")}
                  download="stamp.svg"
                  className="inline-flex items-center justify-center rounded-lg bg-stamplr-blue px-4 py-2.5 text-sm font-semibold text-white hover:bg-stamplr-blue/90"
                >
                  SVG
                </a>
                <a
                  href={downloadUrl(params, "png")}
                  download="stamp.png"
                  className="inline-flex items-center justify-center rounded-lg bg-stamplr-gray px-4 py-2.5 text-sm font-semibold text-white hover:bg-stamplr-gray/90"
                >
                  PNG
                </a>
                <a
                  href={downloadUrl(params, "pdf")}
                  download="stamp.pdf"
                  className="inline-flex items-center justify-center rounded-lg bg-stamplr-gray px-4 py-2.5 text-sm font-semibold text-white hover:bg-stamplr-gray/90"
                >
                  PDF
                </a>
              </div>
              <p className="mt-2 text-xs text-slate-500">CAD DWG & TIFF coming later.</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-6 min-h-[320px] shadow-sm">
            {svg ? (
              <div
                className="max-w-full max-h-[420px] overflow-auto flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: svg }}
              />
            ) : (
              <p className="text-slate-500">Loading preview…</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
