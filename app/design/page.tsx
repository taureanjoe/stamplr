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
  const [state, setState] = useState("tx");
  const [name, setName] = useState("");
  const [license, setLicense] = useState("");
  const [discipline, setDiscipline] = useState("Professional Engineer");
  const [fileType, setFileType] = useState<"svg" | "png" | "pdf">("svg");
  const [watermarked, setWatermarked] = useState(false);

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

  function handleGenerateStamp() {
    const url = downloadUrl(params, fileType);
    const a = document.createElement("a");
    a.href = url;
    a.download = `stamp.${fileType}`;
    a.click();
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F1]">
      <header className="bg-stamplr-blue">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <Logo variant="dark" />
          <nav className="hidden md:flex items-center gap-8 text-white/90 text-sm font-medium">
            <Link href="/design" className="text-white font-medium">
              Create Stamp
            </Link>
            <a href="#pricing" className="hover:text-white">
              Pricing
            </a>
            <a href="#support" className="hover:text-white">
              Support
            </a>
            <a href="#features" className="hover:text-white">
              Features
            </a>
          </nav>
          <button
            type="button"
            className="md:hidden p-2 text-white"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8">
        <p className="text-xs text-stamplr-gray/70 mb-1">inside page</p>
        <h1 className="text-2xl md:text-3xl font-bold text-stamplr-gray mb-8">
          Configure Your Seal
        </h1>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="order-2 lg:order-1 space-y-6">
            <div>
              <h2 className="text-sm font-semibold text-stamplr-gray mb-4">Seal Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stamplr-gray mb-1.5">
                    State
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-3 pr-10 py-2.5 text-stamplr-gray focus:outline-none focus:ring-2 focus:ring-stamplr-blue/30 focus:border-stamplr-blue appearance-none bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23374151'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")` }}
                  >
                    {US_STATES.map((s) => (
                      <option key={s.code} value={s.code}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stamplr-gray mb-1.5">
                    Discipline
                  </label>
                  <select
                    value={discipline}
                    onChange={(e) => setDiscipline(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-3 pr-10 py-2.5 text-stamplr-gray focus:outline-none focus:ring-2 focus:ring-stamplr-blue/30 focus:border-stamplr-blue appearance-none bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23374151'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")` }}
                  >
                    {PE_DISCIPLINES.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stamplr-gray mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-stamplr-gray placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-stamplr-blue/30 focus:border-stamplr-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stamplr-gray mb-1.5">
                    License Number
                  </label>
                  <input
                    type="text"
                    value={license}
                    onChange={(e) => setLicense(e.target.value)}
                    placeholder="Enter your license number"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-stamplr-gray placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-stamplr-blue/30 focus:border-stamplr-blue"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stamplr-gray mb-2">File Type</label>
              <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5">
                {(["svg", "png", "pdf"] as const).map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setFileType(fmt)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors uppercase ${
                      fileType === fmt
                        ? "bg-stamplr-blue text-white"
                        : "text-stamplr-gray hover:bg-slate-100"
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleGenerateStamp}
              className="w-full rounded-lg bg-stamplr-blue px-6 py-3.5 text-base font-semibold text-white hover:bg-stamplr-blue/90 transition-colors"
            >
              Generate Stamp
            </button>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-sm font-semibold text-stamplr-gray mb-4">Live Preview</h2>
            <div className="rounded-xl border border-slate-200 bg-white p-6 min-h-[320px] shadow-sm flex items-center justify-center">
              {svg ? (
                <div
                  className="max-w-full max-h-[400px] overflow-auto flex items-center justify-center"
                  dangerouslySetInnerHTML={{ __html: svg }}
                />
              ) : (
                <p className="text-slate-500">Loading preview…</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
