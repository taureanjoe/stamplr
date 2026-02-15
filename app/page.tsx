"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { STATES_WITH_TEMPLATES } from "@/lib/stamp/constants";

/* ── All 50 US states for ticker + compliance grid ── */
const ALL_US_STATES = [
  { code: "AL", name: "Alabama" }, { code: "AK", name: "Alaska" }, { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" }, { code: "CA", name: "California" }, { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" }, { code: "DE", name: "Delaware" }, { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" }, { code: "HI", name: "Hawaii" }, { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" }, { code: "IN", name: "Indiana" }, { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" }, { code: "KY", name: "Kentucky" }, { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" }, { code: "MD", name: "Maryland" }, { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" }, { code: "MN", name: "Minnesota" }, { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" }, { code: "MT", name: "Montana" }, { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" }, { code: "NH", name: "New Hampshire" }, { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" }, { code: "NY", name: "New York" }, { code: "NC", name: "N. Carolina" },
  { code: "ND", name: "N. Dakota" }, { code: "OH", name: "Ohio" }, { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" }, { code: "PA", name: "Pennsylvania" }, { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "S. Carolina" }, { code: "SD", name: "S. Dakota" }, { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" }, { code: "UT", name: "Utah" }, { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" }, { code: "WA", name: "Washington" }, { code: "WV", name: "W. Virginia" },
  { code: "WI", name: "Wisconsin" }, { code: "WY", name: "Wyoming" },
];

const supportedCodes = new Set(STATES_WITH_TEMPLATES.map((s) => s.code.toUpperCase()));
const stateCount = STATES_WITH_TEMPLATES.length;

/* ── FAQ data ── */
const FAQS = [
  { q: "Is the seal legally valid for use on engineering documents?", a: "Stamplr generates seals that comply with the visual and layout requirements specified by each state engineering board. However, a digital seal is only legally valid when applied as part of your state's approved electronic signature/sealing process. Always verify your state's rules for electronic sealing before use." },
  { q: "Can I use the seal in AutoCAD, Revit, or Bluebeam?", a: "Yes. The SVG and high-resolution PNG (300 DPI with transparent background) are designed to be embedded directly into AutoCAD, Revit, and Bluebeam. The PDF is print-ready for physical application on drawings." },
  { q: "What if my state isn't supported yet?", a: "We're adding new states regularly. If your state isn't listed, you can contact us and we'll prioritize it. We add states based on demand." },
  { q: "Is my license number stored after I download?", a: "For single-seal purchases with no account, your details are used only to generate the seal and are not retained after download. If you create an account (bundle or team plans), your seals are saved to your vault for re-downloading." },
  { q: "What disciplines are supported?", a: "We support Civil, Mechanical, Electrical, Structural, Chemical, and several other disciplines for Professional Engineer seals. Professional Land Surveyor (PLS) and Structural Engineer (SE) credential types are also available for supported states." },
  { q: "Can I get a refund if something is wrong with my seal?", a: "If your seal has a technical defect or doesn't match the board specification, contact us within 7 days and we'll either fix it or issue a full refund. We can't refund seals where incorrect personal information was entered." },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState(0);

  /* Duplicate ticker items for seamless CSS loop */
  const tickerStates = ALL_US_STATES.map((s) => s.name);
  const tickerItems = [...tickerStates, ...tickerStates];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.6, overflowX: 'hidden', position: 'relative' }}>

      {/* Dot grid background */}
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none', zIndex: 0 }} />

      {/* ── NAV ── */}
      <style>{`
        #mainNav { padding: 0 40px; }
        #navDesignBtn { font-size: 13px; padding: 7px 18px; border-radius: 20px; white-space: nowrap; }
        @media (max-width: 768px) {
          #mainNav { padding: 0 16px !important; }
          #navDesignBtn { font-size: 12px !important; padding: 6px 14px !important; }
        }
      `}</style>
      <nav id="mainNav" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: 58,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(10,10,12,0.88)',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <Logo />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 8.5, letterSpacing: '0.1em', textTransform: 'uppercase', background: 'rgba(74,222,128,0.12)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.25)', padding: '2px 7px', borderRadius: 20 }}>Beta</span>
        </div>

        <style>{`
          #navLinks { display: flex; }
          @media (max-width: 768px) { #navLinks { display: none !important; } #navActions .ghost { display: none !important; } }
        `}</style>
        <ul id="navLinks" style={{ alignItems: 'center', gap: 2, listStyle: 'none', padding: 0, margin: 0 }}>
          {[["Features", "#features"], ["Pricing", "#pricing"], ["Support", "#"]].map(([label, href]) => (
            <li key={label}><a href={href} style={{ fontSize: 13.5, color: 'var(--text-dim)', textDecoration: 'none', padding: '5px 13px', borderRadius: 20, transition: 'color .15s, background .15s', display: 'flex', alignItems: 'center' }}>{label}</a></li>
          ))}
        </ul>

        <div id="navActions" style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <button className="ghost btn-glass">Log in</button>
          <Link id="navDesignBtn" href="/design" style={{ fontWeight: 600, color: '#fff', background: 'var(--accent)', border: 'none', cursor: 'pointer', textDecoration: 'none', fontFamily: "'DM Sans', sans-serif", letterSpacing: '.01em', transition: 'all .15s', display: 'inline-flex', alignItems: 'center' }}>
            Design Your Stamp →
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', zIndex: 1 }}>
        <style>{`
          #heroGrid { display: grid; grid-template-columns: 1fr 1fr; align-items: center; padding: 120px 80px 80px; gap: 40px; max-width: 1300px; margin: 0 auto; min-height: 100vh; }
          #heroActions { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
          @media (max-width: 768px) {
            #heroGrid { grid-template-columns: 1fr !important; padding: 108px 20px 48px !important; gap: 32px !important; min-height: auto !important; text-align: center; }
            #heroVisual { order: -1; }
            #heroActions { justify-content: center; gap: 10 !important; }
            #heroActionPrimary { font-size: 13px !important; padding: 10px 20px !important; border-radius: 20px !important; }
            #heroActionSecondary { font-size: 13px !important; padding: 10px 18px !important; border-radius: 20px !important; }
            #heroTrust { flex-wrap: wrap; justify-content: center; }
            .trust-sep-el { display: none !important; }
            #drawingScene { width: 100% !important; max-width: 420px; }
            .stamp-handle-el { top: -80px !important; right: 40px !important; }
            .stamp-handle-el svg { width: 64px; height: 78px; }
            .stamp-imp-el { bottom: 60px !important; right: 14px !important; }
            .stamp-imp-el svg { width: 96px; height: 96px; }
            .hero-eyebrow-el { justify-content: center; }
          }
          @media (max-width: 1024px) { #heroGrid { padding: 100px 40px 60px; gap: 30px; } #drawingScene { width: 400px; } }
        `}</style>
        <div id="heroGrid" style={{ maxWidth: 1300, margin: '0 auto' }}>
          {/* Left copy */}
          <div>
            <div className="hero-eyebrow-el" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(96,165,250,0.14)', border: '1px solid rgba(96,165,250,.22)', borderRadius: 20, padding: '4px 12px', marginBottom: 22 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 6px var(--accent)' }} />
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--accent)' }}>State-Compliant Engineering Seals</span>
            </div>

            <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(38px, 4.5vw, 62px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-1.5px', color: 'var(--text)', marginBottom: 22 }}>
              Engineering<br />Seals,<br /><em style={{ fontStyle: 'normal', background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Reimagined.</em>
            </h1>

            <p style={{ fontSize: 16, color: 'var(--text-mid, #9898a8)', lineHeight: 1.65, maxWidth: 440, marginBottom: 34 }}>
              Generate, customize, and download state-compliant engineering seals in minutes. Trusted by licensed PEs across {stateCount}+ states — no design software required.
            </p>

            <div id="heroActions" style={{ marginBottom: 48 }}>
              <Link id="heroActionPrimary" href="/design" style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 14.5, fontWeight: 600,
                color: '#fff', background: 'var(--accent)', border: 'none',
                padding: '12px 24px', borderRadius: 20, cursor: 'pointer',
                transition: 'all .2s', display: 'inline-flex', alignItems: 'center', gap: 8,
                textDecoration: 'none',
              }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                Design Your Stamp
              </Link>
              <a id="heroActionSecondary" href="#features" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: 'var(--text-mid, #9898a8)', background: 'none', border: '1px solid var(--border2, rgba(255,255,255,0.11))', padding: '12px 20px', borderRadius: 20, cursor: 'pointer', textDecoration: 'none', marginLeft: 0 }}>See how it works</a>
            </div>

            <div id="heroTrust" style={{ display: 'flex', alignItems: 'center', gap: 20, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
              {[
                [stateCount + "+", "States"],
                null,
                ["$5", "One-time"],
                null,
                ["SVG · PNG · PDF", "All Formats"],
              ].map((item, i) =>
                item === null ? (
                  <div key={i} className="trust-sep-el" style={{ width: 1, height: 32, background: 'var(--border2, rgba(255,255,255,0.11))', flexShrink: 0 }} />
                ) : (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.5px' }}>{item[0]}</span>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9.5, letterSpacing: '.09em', textTransform: 'uppercase', color: 'var(--text-dim)' }}>{item[1]}</span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Right visual: Engineering drawing */}
          <div id="heroVisual" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <div id="drawingScene" style={{ position: 'relative', width: 480, flexShrink: 0 }}>
              {/* Floating badges — pill shape like Beta */}
              <div style={{ position: 'absolute', top: -24, left: -20, background: 'var(--bg3)', border: '1px solid var(--border2, rgba(255,255,255,0.11))', borderRadius: 20, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'DM Mono', monospace", fontSize: 10.5, color: 'var(--text-mid, #9898a8)', letterSpacing: '.04em', whiteSpace: 'nowrap', boxShadow: '0 4px 20px rgba(0,0,0,.4)', animation: 'floatUp 3s ease-in-out infinite', zIndex: 10 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80' }} />Seal generated
              </div>
              <div style={{ position: 'absolute', top: 40, right: -30, background: 'var(--bg3)', border: '1px solid var(--border2, rgba(255,255,255,0.11))', borderRadius: 20, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'DM Mono', monospace", fontSize: 10.5, color: 'var(--text-mid, #9898a8)', letterSpacing: '.04em', whiteSpace: 'nowrap', boxShadow: '0 4px 20px rgba(0,0,0,.4)', animation: 'floatUp 3s ease-in-out .8s infinite', zIndex: 10 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#60a5fa' }} />SVG · PNG · PDF ready
              </div>

              {/* Stamp handle */}
              <style>{`
                @keyframes stampDown { 0% { transform: translateY(0) rotate(-4deg); } 35% { transform: translateY(0) rotate(-4deg); } 52% { transform: translateY(108px) rotate(0deg); } 60% { transform: translateY(112px) rotate(0deg); } 72% { transform: translateY(108px) rotate(0deg); } 100% { transform: translateY(0) rotate(-4deg); } }
                @keyframes inkAppear { 0% { opacity: 0; transform: scale(0.85); } 55% { opacity: 0; transform: scale(0.85); } 65% { opacity: 1; transform: scale(1.02); } 72% { opacity: 0.92; transform: scale(1); } 100% { opacity: 0.92; transform: scale(1); } }
                @keyframes floatUp { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
                @keyframes ripple { 0% { opacity: 0; transform: scale(0.6); } 58% { opacity: 0; transform: scale(0.6); } 65% { opacity: 0.5; transform: scale(0.8); } 85% { opacity: 0; transform: scale(1.3); } 100% { opacity: 0; } }
              `}</style>
              <div className="stamp-handle-el" style={{ position: 'absolute', top: -120, right: 60, transformOrigin: 'bottom center', animation: 'stampDown 3.5s ease-in-out 0.8s infinite', filter: 'drop-shadow(0 8px 20px rgba(96,165,250,.25))', zIndex: 12 }}>
                <svg width="90" height="110" viewBox="0 0 90 110" xmlns="http://www.w3.org/2000/svg">
                  <defs><linearGradient id="hg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#2563eb"/><stop offset="100%" stopColor="#1e3a8a"/></linearGradient><linearGradient id="pg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1e3a5f"/><stop offset="100%" stopColor="#0f2040"/></linearGradient></defs>
                  <rect x="28" y="0" width="34" height="52" rx="8" fill="url(#hg)" stroke="rgba(255,255,255,.12)" strokeWidth="1"/>
                  <rect x="32" y="10" width="26" height="3" rx="1.5" fill="rgba(255,255,255,.12)"/><rect x="32" y="17" width="26" height="3" rx="1.5" fill="rgba(255,255,255,.12)"/><rect x="32" y="24" width="26" height="3" rx="1.5" fill="rgba(255,255,255,.12)"/><rect x="32" y="31" width="26" height="3" rx="1.5" fill="rgba(255,255,255,.12)"/>
                  <rect x="33" y="48" width="24" height="18" rx="3" fill="#1e3a5f" stroke="rgba(255,255,255,.1)" strokeWidth="1"/>
                  <rect x="10" y="62" width="70" height="44" rx="5" fill="url(#pg)" stroke="rgba(255,255,255,.1)" strokeWidth="1"/>
                  <rect x="12" y="92" width="66" height="12" rx="3" fill="#1a2f4a" stroke="rgba(96,165,250,.3)" strokeWidth="1"/>
                  <text x="45" y="83" fontFamily="'DM Sans', sans-serif" fontSize="7" fontWeight="700" fill="rgba(96,165,250,0.7)" textAnchor="middle" letterSpacing="1.5">STAMPLR</text>
                </svg>
              </div>

              {/* Ink ripple */}
              <div style={{ position: 'absolute', bottom: 102, right: 44, width: 130, height: 130, borderRadius: '50%', border: '2px solid rgba(30,58,138,0.3)', opacity: 0, animation: 'ripple 3.5s ease-out 0.8s infinite', pointerEvents: 'none', zIndex: 11 }} />

              {/* Engineering Drawing Paper (simplified inline SVG) */}
              <svg style={{ width: '100%', display: 'block', background: '#f0ede6', borderRadius: 4, border: '1px solid rgba(0,0,0,.15)', boxShadow: '0 0 0 1px rgba(255,255,255,.06), 0 20px 60px rgba(0,0,0,.6), 0 4px 16px rgba(0,0,0,.4)', position: 'relative', zIndex: 1 }} viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg" fontFamily="'DM Mono', monospace">
                <defs>
                  <linearGradient id="paperG" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#f4f1e8"/><stop offset="100%" stopColor="#ede9de"/></linearGradient>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(100,120,160,0.12)" strokeWidth="0.5"/></pattern>
                  <pattern id="gridB" width="100" height="100" patternUnits="userSpaceOnUse"><path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(100,120,160,0.2)" strokeWidth="1"/></pattern>
                </defs>
                <rect width="480" height="360" fill="url(#paperG)"/><rect width="480" height="360" fill="url(#grid)" opacity="0.7"/><rect width="480" height="360" fill="url(#gridB)" opacity="0.5"/>
                <rect x="8" y="8" width="464" height="344" fill="none" stroke="#334" strokeWidth="1.5"/><rect x="14" y="14" width="452" height="332" fill="none" stroke="#334" strokeWidth="0.6"/>
                <rect x="40" y="40" width="280" height="200" fill="none" stroke="#223" strokeWidth="3"/>
                <line x1="160" y1="40" x2="160" y2="240" stroke="#223" strokeWidth="2"/><line x1="40" y1="140" x2="160" y2="140" stroke="#223" strokeWidth="2"/><line x1="160" y1="130" x2="320" y2="130" stroke="#223" strokeWidth="2"/><line x1="240" y1="40" x2="240" y2="130" stroke="#223" strokeWidth="2"/>
                <text x="90" y="98" fontSize="7" fill="#445" textAnchor="middle" opacity="0.7">LIVING ROOM</text>
                <text x="90" y="200" fontSize="7" fill="#445" textAnchor="middle" opacity="0.7">BEDROOM 1</text>
                <text x="215" y="98" fontSize="7" fill="#445" textAnchor="middle" opacity="0.7">DINING</text>
                <text x="280" y="90" fontSize="7" fill="#445" textAnchor="middle" opacity="0.7">KITCHEN</text>
                <g transform="translate(358, 58)"><circle cx="0" cy="0" r="20" fill="none" stroke="#445" strokeWidth="1"/><polygon points="0,-17 5,5 0,2 -5,5" fill="#223"/><text x="0" y="-23" fontSize="9" fontWeight="700" fill="#223" textAnchor="middle">N</text></g>
                <rect x="14" y="268" width="452" height="76" fill="rgba(200,195,180,0.3)" stroke="#334" strokeWidth="1"/>
                <line x1="200" y1="268" x2="200" y2="344" stroke="#334" strokeWidth="0.8"/><line x1="330" y1="268" x2="330" y2="344" stroke="#334" strokeWidth="0.8"/>
                <text x="107" y="293" fontSize="10" fontWeight="bold" fill="#223" textAnchor="middle" fontFamily="'DM Sans',sans-serif">RIVERSIDE RESIDENCE</text>
                <text x="265" y="294" fontSize="9" fontWeight="bold" fill="#223" textAnchor="middle">JOHN DOE, PE</text>
                <text x="265" y="306" fontSize="7" fill="#445" textAnchor="middle" opacity="0.7">CIVIL ENGINEERING</text>
                <text x="398" y="316" fontSize="9" fill="#223" textAnchor="middle" fontWeight="bold">A-1.00</text>
              </svg>

              {/* Stamp impression */}
              <div className="stamp-imp-el" style={{ position: 'absolute', bottom: 82, right: 22, opacity: 0, transform: 'scale(0.85)', animation: 'inkAppear 3.5s ease-in-out 0.8s infinite', zIndex: 10, pointerEvents: 'none' }}>
                <svg width="130" height="130" viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg" fontFamily="Georgia, 'Times New Roman', serif" opacity="0.88">
                  <circle cx="130" cy="130" r="124" fill="rgba(30,58,138,0.07)"/><circle cx="130" cy="130" r="124" fill="none" stroke="rgba(30,58,138,0.7)" strokeWidth="8" strokeDasharray="5,4"/>
                  <circle cx="130" cy="130" r="114" fill="none" stroke="rgba(30,58,138,0.65)" strokeWidth="1.5"/><circle cx="130" cy="130" r="102" fill="none" stroke="rgba(30,58,138,0.55)" strokeWidth="2" strokeDasharray="2,6"/>
                  <path id="tsA" d="M 130,130 m -90,0 a 90,90 0 0,1 180,0" fill="none"/><text fontSize="13.5" fontWeight="bold" letterSpacing="3" fill="rgba(30,58,138,0.82)"><textPath href="#tsA" startOffset="11%">STATE OF MICHIGAN</textPath></text>
                  <path id="bsA" d="M 130,130 m -95,0 a 95,95 0 0,0 190,0" fill="none"/><text fontSize="11" fontWeight="bold" letterSpacing="2.2" fill="rgba(30,58,138,0.78)"><textPath href="#bsA" startOffset="4%">LICENSED PROFESSIONAL ENGINEER</textPath></text>
                  <text x="130" y="118" fontSize="18" fontWeight="bold" fill="rgba(30,58,138,0.85)" textAnchor="middle" dominantBaseline="middle">JOHN</text>
                  <text x="130" y="141" fontSize="18" fontWeight="bold" fill="rgba(30,58,138,0.85)" textAnchor="middle" dominantBaseline="middle">DOE</text>
                  <text x="130" y="162" fontSize="11" fill="rgba(30,58,138,0.65)" textAnchor="middle" dominantBaseline="middle">License No.</text>
                  <text x="130" y="178" fontSize="14" fontWeight="bold" fill="rgba(30,58,138,0.82)" textAnchor="middle" dominantBaseline="middle">479008</text>
                </svg>
              </div>

              {/* Glow under drawing */}
              <div style={{ position: 'absolute', bottom: -30, left: '10%', right: '10%', height: 60, background: 'radial-gradient(ellipse, rgba(96,165,250,0.18) 0%, transparent 70%)', pointerEvents: 'none', filter: 'blur(10px)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <style>{`
        @keyframes ticker { to { transform: translateX(-50%); } }
      `}</style>
      <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '12px 0', overflow: 'hidden', background: 'var(--bg2)', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', gap: 0, animation: 'ticker 40s linear infinite', width: 'max-content' }}>
          {tickerItems.map((name, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 32px', fontFamily: "'DM Mono', monospace", fontSize: 10.5, letterSpacing: '.07em', color: 'var(--text-dim)', textTransform: 'uppercase', whiteSpace: 'nowrap', borderRight: '1px solid var(--border)' }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />{name}
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section id="features" style={{ position: 'relative', zIndex: 1 }}>
        <style>{`
          #stepsGrid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; }
          @media (max-width: 768px) { #stepsGrid { grid-template-columns: 1fr 1fr !important; gap: 10px; } #howSection { padding: 60px 20px !important; } }
          @media (max-width: 400px) { #stepsGrid { grid-template-columns: 1fr !important; } }
        `}</style>
        <div id="howSection" style={{ padding: '100px 80px', maxWidth: 1300, margin: '0 auto' }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ display: 'inline-block', width: 24, height: 1, background: 'var(--accent)' }} />How it works
          </div>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 700, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 14, lineHeight: 1.15 }}>From license number<br />to print-ready seal in minutes.</h2>
          <p style={{ fontSize: 15, color: 'var(--text-mid, #9898a8)', maxWidth: 500, lineHeight: 1.65, marginBottom: 56 }}>No design skills. No software. Just enter your details and we generate a state-compliant seal — ready for documents, drawings, and digital workflows.</p>

          <div id="stepsGrid">
            {[
              ["01", "Choose your state & discipline", "Select your state board, credential type (PE, PLS, SE), and engineering discipline. Stamplr automatically loads the correct seal layout."],
              ["02", "Enter your details", "Type your full name and board-issued license number. The live preview updates in real time — adjust text size, layout, and style."],
              ["03", "Preview & verify", "Review the watermarked preview at 1:1 scale. Confirm all text is correct against your license card before purchasing."],
              ["04", "Unlock & download", "One-time $5 payment. Instantly receive a ZIP with your seal in SVG (vector), PNG (300 DPI), and print-ready PDF formats."],
            ].map(([num, title, desc]) => (
              <div key={num} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 20px 22px', position: 'relative', transition: 'border-color .2s, background .2s' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(96,165,250,0.14)', border: '1px solid rgba(96,165,250,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 500, color: 'var(--accent)', marginBottom: 16, position: 'relative', zIndex: 1 }}>{num}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>{title}</div>
                <div style={{ fontSize: 13, color: 'var(--text-mid, #9898a8)', lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ position: 'relative', zIndex: 1 }}>
        <style>{`
          #featGrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
          @media (max-width: 768px) { #featGrid { grid-template-columns: 1fr !important; } #featSection { padding: 0 20px 60px !important; } .feat-wide { grid-column: span 1 !important; } }
        `}</style>
        <div id="featSection" style={{ padding: '0 80px 100px', maxWidth: 1300, margin: '0 auto' }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ display: 'inline-block', width: 24, height: 1, background: 'var(--accent)' }} />Capabilities
          </div>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 700, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 40, lineHeight: 1.15 }}>Everything a licensed engineer needs.</h2>

          <div id="featGrid">
            {[
              { icon: "🔏", color: "rgba(96,165,250,0.14)", title: "State-Compliant Seal Templates", desc: "Every seal is built to the exact specifications of your state engineering board — correct border type, text layout, font sizing, and required fields.", tags: [`${stateCount}+ states`, "PE · PLS · SE", "Auto-updated"], wide: true },
              { icon: "📦", color: "rgba(74,222,128,0.12)", title: "Multi-Format Output", desc: "Download SVG (scalable vector), PNG (300 DPI, transparent background), and print-ready PDF — all in one ZIP.", tags: ["SVG", "PNG 300 DPI", "PDF"] },
              { icon: "⚡", color: "rgba(251,191,36,.12)", title: "Live Preview", desc: "See exactly what your seal will look like as you type. Adjust name size, license layout, and discipline visibility — all reflected instantly.", tags: ["Real-time", "1:1 scale"] },
              { icon: "🔒", color: "rgba(167,139,250,.12)", title: "Secure & Private", desc: "Your name and license number are used only to generate your seal. We don't store personal information after download.", tags: ["No data retention", "No account needed"] },
              { icon: "🖨️", color: "rgba(96,165,250,0.14)", title: "Print & Digital Ready", desc: "Sized to standard 4\" × 4\" at 300 DPI. CMYK color profile for accurate physical printing. sRGB for screen use.", tags: ["4\" × 4\"", "CMYK + sRGB"] },
              { icon: "🏢", color: "rgba(74,222,128,0.12)", title: "Team & Firm Plans", desc: "Managing seals for multiple engineers at your firm? Team plans let you generate and manage seals for your entire roster.", tags: ["Coming soon", "Multi-user"] },
            ].map((f) => (
              <div key={f.title} className={f.wide ? "feat-wide" : ""} style={{ gridColumn: f.wide ? 'span 2' : undefined, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, padding: '26px 24px', display: 'flex', flexDirection: 'column', gap: 12, transition: 'all .2s' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: f.wide ? 'flex-start' : undefined }}>
                  <div style={{ width: 38, height: 38, borderRadius: 'var(--r)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, flexShrink: 0, background: f.color }}>{f.icon}</div>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>{f.title}</div>
                    {f.wide && <div style={{ fontSize: 13, color: 'var(--text-mid, #9898a8)', lineHeight: 1.65, marginTop: 4 }}>{f.desc}</div>}
                  </div>
                </div>
                {!f.wide && <div style={{ fontSize: 13, color: 'var(--text-mid, #9898a8)', lineHeight: 1.65 }}>{f.desc}</div>}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto' }}>
                  {f.tags.map((t) => <span key={t} style={{ fontFamily: "'DM Mono', monospace", fontSize: 9.5, letterSpacing: '.05em', padding: '3px 9px', borderRadius: 20, border: '1px solid var(--border2, rgba(255,255,255,0.11))', color: 'var(--text-dim)', background: 'var(--bg4, #1c1c24)' }}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATES / COMPLIANCE ── */}
      <div style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '48px 80px', position: 'relative', zIndex: 1 }}>
        <style>{`
          #compInner { display: grid; grid-template-columns: 1fr 2fr; gap: 60px; align-items: center; }
          #statesGrid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; }
          @media (max-width: 768px) { #compInner { grid-template-columns: 1fr !important; gap: 28px; } #statesGrid { grid-template-columns: repeat(4, 1fr) !important; gap: 6px; } .state-full-name { display: none !important; } }
          @media (max-width: 400px) { #statesGrid { grid-template-columns: repeat(3, 1fr) !important; } }
        `}</style>
        <div id="compInner" style={{ maxWidth: 1300, margin: '0 auto' }}>
          <div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ display: 'inline-block', width: 24, height: 1, background: 'var(--accent)' }} />Coverage
            </div>
            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 24, fontWeight: 700, letterSpacing: '-.5px', color: 'var(--text)', marginBottom: 10, lineHeight: 1.25 }}>Board-verified for {stateCount} states.<br />More added regularly.</h3>
            <p style={{ fontSize: 13.5, color: 'var(--text-mid, #9898a8)', lineHeight: 1.6, marginTop: 10 }}>Each seal template is verified against the current rules of the relevant state engineering board. When boards update their seal requirements, we update the templates.</p>
          </div>
          <div id="statesGrid">
            {ALL_US_STATES.map((s) => {
              const active = supportedCodes.has(s.code);
              return (
                <div key={s.code} style={{ background: active ? 'rgba(96,165,250,0.14)' : 'var(--bg3)', border: active ? '1px solid rgba(96,165,250,.3)' : '1px solid var(--border)', borderRadius: 'var(--r)', padding: '8px 6px', textAlign: 'center', transition: 'all .15s', opacity: active ? 1 : 0.4 }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, color: active ? 'var(--text)' : 'var(--text-dim)', display: 'block' }}>{s.code}</span>
                  <span className="state-full-name" style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, letterSpacing: '.05em', color: 'var(--text-dim)', display: 'block', marginTop: 2, textTransform: 'uppercase' }}>{s.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ position: 'relative', zIndex: 1 }}>
        <style>{`
          #pricingGrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 48px; }
          @media (max-width: 768px) { #pricingGrid { grid-template-columns: 1fr !important; } #pricingSection { padding: 60px 20px !important; } }
        `}</style>
        <div id="pricingSection" style={{ padding: '100px 80px', maxWidth: 1300, margin: '0 auto' }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ display: 'inline-block', width: 24, height: 1, background: 'var(--accent)' }} />Pricing
          </div>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 700, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 14, lineHeight: 1.15 }}>Simple, honest pricing.</h2>
          <p style={{ fontSize: 15, color: 'var(--text-mid, #9898a8)', maxWidth: 500, lineHeight: 1.65 }}>No subscriptions, no upsells for individual engineers. Pay once, download instantly.</p>

          <div id="pricingGrid">
            {[
              { tier: "Single Seal", price: "$5", per: "/ seal", desc: "Perfect for individual engineers who need a single state-compliant seal.", features: ["One seal, one state", "SVG + PNG (300 DPI) + PDF", "All delivered as ZIP", "Watermark-free", "No account required"], off: ["Saved seal history", "Multiple disciplines"], btn: "outline", label: "Get Started" },
              { tier: "Engineer Bundle", price: "$15", per: "/ 5 seals", desc: "For engineers who practice in multiple states or disciplines — stock up and save.", features: ["5 seals, any state or discipline", "All formats included", "Saved account + seal history", "Re-download anytime", "Priority support", "Multi-discipline support"], off: ["Team management"], btn: "solid", label: "Get Bundle", featured: true },
              { tier: "Firm / Team", price: "Custom", per: "", desc: "For engineering firms managing seals for multiple licensed professionals.", features: ["Unlimited team members", "Centralized seal vault", "Admin dashboard", "Role-based access", "Audit trail & compliance logs", "SSO & billing management"], off: [], btn: "outline", label: "Contact Sales" },
            ].map((p) => (
              <div key={p.tier} style={{ background: p.featured ? 'linear-gradient(160deg, #0e1525 0%, #101014 100%)' : 'var(--bg2)', border: p.featured ? '1px solid rgba(96,165,250,.35)' : '1px solid var(--border)', borderRadius: 12, padding: '28px 26px', display: 'flex', flexDirection: 'column', gap: 20, position: 'relative', overflow: 'hidden' }}>
                {p.featured && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--accent), #a78bfa)' }} />}
                {p.featured && <span style={{ position: 'absolute', top: 16, right: 16, fontFamily: "'DM Mono', monospace", fontSize: 8.5, letterSpacing: '.1em', textTransform: 'uppercase', background: 'rgba(96,165,250,0.14)', color: 'var(--accent)', border: '1px solid rgba(96,165,250,.25)', padding: '2px 8px', borderRadius: 20 }}>Most Popular</span>}
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-dim)' }}>{p.tier}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: p.price === "Custom" ? 30 : 38, fontWeight: 700, color: 'var(--text)', letterSpacing: '-1px', lineHeight: 1 }}>{p.price}</span>
                  {p.per && <span style={{ fontSize: 12, color: 'var(--text-dim)', fontFamily: "'DM Mono', monospace" }}>{p.per}</span>}
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-mid, #9898a8)', lineHeight: 1.55 }}>{p.desc}</p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 9, listStyle: 'none', padding: 0, margin: 0, flex: 1 }}>
                  {p.features.map((f) => <li key={f} style={{ fontSize: 13, color: 'var(--text-mid, #9898a8)', display: 'flex', alignItems: 'flex-start', gap: 9 }}><span style={{ color: '#4ade80', fontWeight: 700, fontSize: 12, flexShrink: 0, marginTop: 2 }}>✓</span>{f}</li>)}
                  {p.off.map((f) => <li key={f} style={{ fontSize: 13, color: 'var(--text-mid, #9898a8)', display: 'flex', alignItems: 'flex-start', gap: 9, opacity: 0.35 }}><span style={{ color: 'var(--text-dim)', fontWeight: 700, fontSize: 12, flexShrink: 0, marginTop: 2 }}>—</span>{f}</li>)}
                </ul>
                <button style={{ width: '100%', padding: 11, borderRadius: 12, fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, fontWeight: 600, cursor: 'pointer', border: p.btn === "solid" ? 'none' : '1px solid var(--border2, rgba(255,255,255,0.11))', background: p.btn === "solid" ? 'var(--accent)' : 'none', color: p.btn === "solid" ? '#fff' : 'var(--text-dim)', transition: 'all .15s' }}>{p.label}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ position: 'relative', zIndex: 1 }}>
        <style>{`
          #faqGrid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 48px; }
          @media (max-width: 768px) { #faqGrid { grid-template-columns: 1fr !important; gap: 8px; } #faqSection { padding: 0 20px 60px !important; } }
        `}</style>
        <div id="faqSection" style={{ padding: '0 80px 100px', maxWidth: 1300, margin: '0 auto' }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ display: 'inline-block', width: 24, height: 1, background: 'var(--accent)' }} />Questions
          </div>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 700, letterSpacing: '-1px', color: 'var(--text)', lineHeight: 1.15 }}>Frequently asked questions.</h2>

          <div id="faqGrid">
            {FAQS.map((faq, i) => (
              <div key={i} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
                <div onClick={() => setOpenFaq(openFaq === i ? -1 : i)} style={{ padding: '18px 20px', fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: 'var(--text)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, userSelect: 'none', transition: 'background .15s' }}>
                  {faq.q}
                  <span style={{ fontSize: 12, color: 'var(--text-dim)', transition: 'transform .2s', transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)', flexShrink: 0 }}>▾</span>
                </div>
                {openFaq === i && (
                  <div style={{ padding: '0 20px 18px', paddingTop: 14, fontSize: 13.5, color: 'var(--text-mid, #9898a8)', lineHeight: 1.65, borderTop: '1px solid var(--border)' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section style={{ position: 'relative', zIndex: 1 }}>
        <style>{`
          #ctaBand { padding: 80px; }
          @media (max-width: 768px) { #ctaBand { padding: 20px !important; } #ctaInner { grid-template-columns: 1fr !important; padding: 32px 24px !important; text-align: center; } #ctaActions { width: 100%; } }
        `}</style>
        <div id="ctaBand">
          <div id="ctaInner" style={{ maxWidth: 1300, margin: '0 auto', background: 'linear-gradient(135deg, #0e1a2e 0%, #0f1520 50%, #0a0f1a 100%)', border: '1px solid rgba(96,165,250,.2)', borderRadius: 20, padding: 64, display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center', overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 800, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 12, lineHeight: 1.15 }}>Your seal, ready in<br />under 5 minutes.</h2>
              <p style={{ fontSize: 15, color: 'var(--text-mid, #9898a8)', maxWidth: 440, lineHeight: 1.6 }}>Join thousands of licensed engineers who&apos;ve replaced slow, expensive seal orders with an instant, compliant digital workflow.</p>
            </div>
            <div id="ctaActions" style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', position: 'relative', zIndex: 1, flexShrink: 0 }}>
              <Link href="/design" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14.5, fontWeight: 600, background: 'var(--accent)', color: '#fff', border: 'none', padding: '13px 30px', borderRadius: 12, cursor: 'pointer', whiteSpace: 'nowrap', textDecoration: 'none', textAlign: 'center' }}>Design Your Stamp →</Link>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9.5, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--text-dim)', textAlign: 'center' }}>No account needed · $5 one-time</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '48px 80px 36px', position: 'relative', zIndex: 1 }}>
        <style>{`
          #footerInner { display: grid; grid-template-columns: 240px 1fr; gap: 60px; }
          #footerLinks { display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px; }
          @media (max-width: 768px) { footer { padding: 36px 20px 24px !important; } #footerInner { grid-template-columns: 1fr !important; gap: 32px; } #footerLinks { grid-template-columns: 1fr 1fr !important; gap: 24px; } #footerBottom { flex-direction: column !important; gap: 10px; text-align: center; } }
        `}</style>
        <div id="footerInner" style={{ maxWidth: 1300, margin: '0 auto' }}>
          <div>
            <Logo />
            <p style={{ fontSize: 12.5, color: 'var(--text-dim)', lineHeight: 1.65, marginTop: 12, maxWidth: 200 }}>State-compliant engineering seals for the modern PE. Instant and affordable.</p>
          </div>
          <div id="footerLinks">
            {[
              { title: "Product", links: [["Create Seal", "/design"], ["My Seals", "#"], ["Team Plans", "#"], ["Pricing", "#pricing"]] },
              { title: "Coverage", links: [["Supported States", "#"], ["Credential Types", "#"], ["State Updates", "#"], ["Request a State", "#"]] },
              { title: "Legal", links: [["Terms of Use", "#"], ["Privacy Policy", "#"], ["Authorized Use", "#"], ["Compliance Notes", "#"]] },
              { title: "Support", links: [["Help Center", "#"], ["Contact Us", "#"], ["Status", "#"]] },
            ].map((col) => (
              <div key={col.title}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 14 }}>{col.title}</div>
                {col.links.map(([label, href]) => <a key={label} href={href} style={{ display: 'block', fontSize: 13, color: 'var(--text-dim)', textDecoration: 'none', marginBottom: 9, transition: 'color .15s' }}>{label}</a>)}
              </div>
            ))}
          </div>
        </div>
        <div id="footerBottom" style={{ maxWidth: 1300, margin: '32px auto 0', paddingTop: 20, borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '.05em', color: 'var(--text-muted, #3e3e4d)' }}>© 2026 Stamplr. Not affiliated with any state engineering board.</span>
          <div style={{ display: 'flex', gap: 20 }}>
            {["Terms", "Privacy", "Authorized Use Policy"].map((l) => <a key={l} href="#" style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '.05em', color: 'var(--text-dim)', textDecoration: 'none' }}>{l}</a>)}
          </div>
        </div>
      </footer>

    </div>
  );
}
