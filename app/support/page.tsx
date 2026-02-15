"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";

/* ── Help content (same as reference HTML) ── */
const HELP_CATEGORIES = [
  {
    id: "getting-started",
    icon: "🚀",
    title: "Getting Started",
    items: [
      {
        q: "How do I create my first engineering seal?",
        a: (
          <>
            <p>Creating your seal is simple:</p>
            <ul>
              <li>Click <strong>&quot;Create Seal&quot;</strong> from the homepage</li>
              <li>Select your <strong>state</strong> and <strong>discipline</strong> (Civil, Mechanical, Electrical, etc.)</li>
              <li>Enter your <strong>full name</strong> as it appears on your license</li>
              <li>Enter your <strong>license number</strong></li>
              <li>Adjust text size and layout in the live preview</li>
              <li>Click <strong>&quot;Generate Seal&quot;</strong> to finalize</li>
              <li>Purchase and download your seal files (SVG, PNG, PDF)</li>
            </ul>
            <p>The entire process takes under 5 minutes. No account is required for single-seal purchases.</p>
          </>
        ),
      },
      {
        q: "What information do I need to provide?",
        a: (
          <>
            <p>To generate a compliant seal, you&apos;ll need:</p>
            <ul>
              <li><strong>Your full legal name</strong> exactly as shown on your professional license</li>
              <li><strong>Your license number</strong> (PE, PLS, or SE license number)</li>
              <li><strong>Your state</strong> of licensure</li>
              <li><strong>Your discipline</strong> (for PE seals: Civil, Mechanical, Structural, Electrical, Chemical, etc.)</li>
            </ul>
            <p>Make sure all information is accurate before finalizing your purchase — seals with incorrect user-entered data cannot be refunded.</p>
          </>
        ),
      },
      {
        q: "Do I need to create an account?",
        a: (
          <>
            <p><strong>For single seals:</strong> No account required. You can purchase and download immediately as a guest.</p>
            <p><strong>For bundles and team plans:</strong> An account is required to manage multiple seals, access your seal vault, and re-download files anytime.</p>
            <p>Creating an account also gives you access to seal history, priority support, and the ability to update seals if your license information changes.</p>
          </>
        ),
      },
      {
        q: "What file formats will I receive?",
        a: (
          <>
            <p>Every seal purchase includes three professional formats, delivered as a ZIP file:</p>
            <ul>
              <li><strong>SVG (Vector)</strong> — Scalable vector format, perfect for AutoCAD, Revit, and digital workflows</li>
              <li><strong>PNG (300 DPI)</strong> — High-resolution raster with transparent background, ideal for Bluebeam and PDF stamping</li>
              <li><strong>PDF (Print-Ready)</strong> — Professional print format for physical application on drawings</li>
            </ul>
            <p>All files are watermark-free and ready for immediate professional use.</p>
          </>
        ),
      },
      {
        q: "How long does it take to receive my seal?",
        a: (
          <>
            <p>Your seal files are generated and delivered <strong>instantly</strong> after purchase. The entire process — from design to download — takes under 5 minutes.</p>
            <p>After payment:</p>
            <ul>
              <li>You&apos;ll immediately receive a <strong>download link</strong> via email</li>
              <li>The ZIP file will also appear in your browser&apos;s download folder</li>
              <li>If you have an account, the seal is saved to your vault for re-downloading anytime</li>
            </ul>
          </>
        ),
      },
    ],
  },
  {
    id: "account",
    icon: "👤",
    title: "Account & Billing",
    items: [
      {
        q: "How do I access my previously purchased seals?",
        a: (
          <>
            <p>If you purchased a seal <strong>with an account</strong> (bundle or team plan):</p>
            <ul>
              <li>Sign in to your account at <code>stamplr.com/dashboard</code></li>
              <li>Navigate to <strong>&quot;My Seals&quot;</strong></li>
              <li>All your seals are stored in your vault</li>
              <li>Click <strong>&quot;Download&quot;</strong> next to any seal to re-download the ZIP file</li>
            </ul>
            <p>If you purchased as a <strong>guest</strong> (no account), check your email for the original download link. You can also create an account using the same email to access future seal history.</p>
          </>
        ),
      },
      {
        q: "What payment methods do you accept?",
        a: (
          <>
            <p>We accept all major payment methods via Stripe:</p>
            <ul>
              <li><strong>Credit cards:</strong> Visa, Mastercard, American Express, Discover</li>
              <li><strong>Debit cards</strong></li>
              <li><strong>Apple Pay</strong> and <strong>Google Pay</strong></li>
              <li><strong>Link</strong> (Stripe&apos;s express checkout)</li>
            </ul>
            <p>For <strong>team and enterprise plans</strong>, we also offer invoicing and ACH transfers. Contact <a href="mailto:sales@stamplr.com">sales@stamplr.com</a> for custom billing arrangements.</p>
          </>
        ),
      },
      {
        q: "Can I get a refund?",
        a: (
          <>
            <p>We offer refunds under these conditions:</p>
            <ul>
              <li><strong>Technical defects:</strong> If the seal file is corrupted, doesn&apos;t match board specifications, or has a generation error</li>
              <li><strong>State compliance issues:</strong> If the seal doesn&apos;t meet your state board&apos;s visual requirements (verified against official specs)</li>
            </ul>
            <p><strong>We cannot refund:</strong></p>
            <ul>
              <li>Seals where you entered <strong>incorrect personal information</strong> (wrong name, license number, etc.)</li>
              <li>Seals that you&apos;ve already <strong>used on official documents</strong></li>
              <li>Buyer&apos;s remorse or change of mind after download</li>
            </ul>
            <p>To request a refund, contact <a href="mailto:support@stamplr.com">support@stamplr.com</a> within <strong>7 days of purchase</strong> with your order number and explanation.</p>
          </>
        ),
      },
      {
        q: "How do I update my account information?",
        a: (
          <>
            <p>To update your account details:</p>
            <ul>
              <li>Sign in to your account</li>
              <li>Go to <strong>Settings → Profile</strong></li>
              <li>Update your email, password, or payment methods</li>
              <li>Click <strong>&quot;Save Changes&quot;</strong></li>
            </ul>
            <p>For <strong>team plans</strong>, administrators can manage team member access and billing settings from the Admin Dashboard.</p>
          </>
        ),
      },
      {
        q: "What happens if my license number changes?",
        a: (
          <>
            <p>If your license number changes due to renewal, state transfer, or other reasons:</p>
            <ul>
              <li><strong>Bundle/Team users:</strong> You can generate a new seal at no additional cost (up to your plan limit)</li>
              <li><strong>Single-seal users:</strong> You&apos;ll need to purchase a new seal with the updated license number</li>
            </ul>
            <p>If your license number changed within <strong>30 days</strong> of purchase due to an administrative error, contact support for a free replacement seal.</p>
          </>
        ),
      },
    ],
  },
  {
    id: "technical",
    icon: "⚙️",
    title: "Technical Support",
    items: [
      {
        q: "How do I use the seal in AutoCAD?",
        a: (
          <>
            <p>To insert your seal in AutoCAD:</p>
            <ul>
              <li>Open your drawing in AutoCAD</li>
              <li>Type <code>INSERT</code> command or use Insert → Block</li>
              <li>Browse and select the <strong>SVG file</strong> from your seal ZIP</li>
              <li>Specify insertion point, scale, and rotation</li>
              <li>The seal will be inserted as a scalable vector block</li>
            </ul>
            <p><strong>Alternative method:</strong> You can also use the <strong>PNG file</strong> by inserting it as a raster image (Insert → Raster Image Reference). The 300 DPI resolution ensures clarity at any plot scale.</p>
          </>
        ),
      },
      {
        q: "How do I use the seal in Revit?",
        a: (
          <>
            <p>To add your seal to Revit sheets:</p>
            <ul>
              <li>Open your sheet view</li>
              <li>Go to Insert → Image</li>
              <li>Select the <strong>PNG file</strong> (300 DPI with transparent background)</li>
              <li>Place the image on your sheet</li>
              <li>Resize and position as needed</li>
            </ul>
            <p><strong>Pro tip:</strong> Create a custom titleblock family with your seal embedded for consistent placement across all sheets. Revit doesn&apos;t support SVG import, so always use the PNG file.</p>
          </>
        ),
      },
      {
        q: "How do I use the seal in Bluebeam?",
        a: (
          <>
            <p>To stamp PDFs in Bluebeam Revu:</p>
            <ul>
              <li>Open your PDF in Bluebeam</li>
              <li>Go to Tools → Stamp → Custom Stamps</li>
              <li>Click <strong>&quot;New Stamp&quot;</strong> or <strong>&quot;Import&quot;</strong></li>
              <li>Select the <strong>PNG file</strong> from your seal ZIP</li>
              <li>Name your stamp (e.g., &quot;PE Seal - Civil&quot;)</li>
              <li>Save to your stamp palette</li>
            </ul>
            <p>Now you can apply your seal with a single click on any drawing. The transparent background ensures clean placement over drawing content.</p>
          </>
        ),
      },
      {
        q: "The seal doesn't look right when I import it. What should I do?",
        a: (
          <>
            <p>If your seal appears distorted, pixelated, or incorrectly sized:</p>
            <ul>
              <li><strong>Check the file format:</strong> Use SVG for AutoCAD/Illustrator, PNG for Revit/Bluebeam/Photoshop, PDF for printing</li>
              <li><strong>Verify import settings:</strong> Ensure &quot;maintain aspect ratio&quot; is enabled when importing</li>
              <li><strong>Check DPI settings:</strong> The PNG is 300 DPI — if your software is set to 72 DPI, the seal will appear larger than intended</li>
              <li><strong>Re-download the file:</strong> Corrupted downloads can cause display issues</li>
            </ul>
            <p>If the issue persists, send us a screenshot at <a href="mailto:support@stamplr.com">support@stamplr.com</a> showing the problem.</p>
          </>
        ),
      },
      {
        q: "I didn't receive my download email. What now?",
        a: (
          <>
            <p>If your download email hasn&apos;t arrived:</p>
            <ul>
              <li><strong>Check spam/junk folders</strong> — our emails come from <code>no-reply@stamplr.com</code></li>
              <li><strong>Verify the email address</strong> you entered during checkout</li>
              <li><strong>Check your browser&apos;s download folder</strong> — the ZIP file should have downloaded automatically</li>
              <li>If you have an account, sign in and check <strong>&quot;My Seals&quot;</strong> for instant access</li>
            </ul>
            <p>Still can&apos;t find it? Email <a href="mailto:support@stamplr.com">support@stamplr.com</a> with your order number (from your payment confirmation) and we&apos;ll resend your files immediately.</p>
          </>
        ),
      },
      {
        q: "Can I edit the seal after downloading?",
        a: (
          <>
            <p>The seal files are designed as final, compliant outputs and <strong>should not be edited</strong>. Modifying a state-board-approved seal design may render it non-compliant.</p>
            <p>If you need to make changes:</p>
            <ul>
              <li><strong>Name or license corrections:</strong> Generate a new seal with the correct information</li>
              <li><strong>Text size adjustments:</strong> Use the live preview controls <em>before</em> purchase to adjust sizing</li>
              <li><strong>State or discipline changes:</strong> Create a new seal for the new jurisdiction</li>
            </ul>
            <p>Bundle and team users can generate multiple seals to experiment with different layouts at no extra cost.</p>
          </>
        ),
      },
      {
        q: "What if my software doesn't support SVG or PNG?",
        a: (
          <>
            <p>While SVG and PNG are industry standards, some older or specialized software may have limited format support:</p>
            <ul>
              <li><strong>Use the PDF:</strong> PDFs are universally supported and can be imported into virtually any program</li>
              <li><strong>Convert formats:</strong> Free tools like <a href="https://inkscape.org" target="_blank" rel="noopener noreferrer">Inkscape</a> (SVG to DXF/EPS) or <a href="https://www.adobe.com/express/feature/image/convert" target="_blank" rel="noopener noreferrer">Adobe Express</a> (PNG to JPG) can help</li>
              <li><strong>Contact support:</strong> If you need a specific format (EPS, AI, DXF), email us at <a href="mailto:support@stamplr.com">support@stamplr.com</a> with your order number</li>
            </ul>
          </>
        ),
      },
    ],
  },
  {
    id: "legal",
    icon: "⚖️",
    title: "Legal & Compliance",
    items: [
      {
        q: "Is the seal legally valid for use on engineering documents?",
        a: (
          <>
            <p>Stamplr generates seals that <strong>comply with the visual and layout requirements</strong> specified by each state engineering board. The seal design itself is compliant.</p>
            <p>However, a digital seal is only <strong>legally valid</strong> when applied as part of your state&apos;s approved electronic signature/sealing process, which typically requires:</p>
            <ul>
              <li><strong>Digital certificate or PKI authentication</strong></li>
              <li><strong>Audit trail documentation</strong></li>
              <li><strong>Compliance with state-specific electronic sealing rules</strong></li>
            </ul>
            <p><strong>Always verify your state&apos;s rules</strong> for electronic sealing before use. Links to state board regulations are available in our <Link href="#">Compliance Notes</Link> documentation.</p>
          </>
        ),
      },
      {
        q: "What states are currently supported?",
        a: (
          <>
            <p>We currently support seal generation for <strong>multiple states</strong> and growing. To see if your state is available:</p>
            <ul>
              <li>Visit our <Link href="/">Supported States</Link> section on the homepage</li>
              <li>Check the state selector during seal creation</li>
              <li>Email <a href="mailto:support@stamplr.com">support@stamplr.com</a> to confirm specific jurisdictions</li>
            </ul>
            <p>If your state isn&apos;t listed yet, you can <strong>join the waitlist</strong> and we&apos;ll notify you when it&apos;s available. We prioritize new states based on user demand.</p>
          </>
        ),
      },
      {
        q: "What disciplines are supported?",
        a: (
          <>
            <p>We support the following disciplines for Professional Engineer (PE) seals:</p>
            <ul>
              <li>Civil Engineering</li>
              <li>Mechanical Engineering</li>
              <li>Electrical Engineering</li>
              <li>Structural Engineering</li>
              <li>Chemical Engineering</li>
              <li>Industrial Engineering</li>
              <li>Environmental Engineering</li>
              <li>Fire Protection Engineering</li>
            </ul>
            <p>We also support <strong>Professional Land Surveyor (PLS)</strong> and separate <strong>Structural Engineer (SE)</strong> credentials for states that require them.</p>
            <p>Discipline availability may vary by state. Check the discipline dropdown during seal creation for your specific state&apos;s options.</p>
          </>
        ),
      },
      {
        q: "Is my license number stored after I download?",
        a: (
          <>
            <p><strong>For single-seal purchases with no account:</strong></p>
            <p>Your name, license number, and other details are used <strong>only to generate the seal</strong> and are <strong>not retained</strong> after download. We do not store this information in our systems.</p>
            <p><strong>For bundle and team plans (with account):</strong></p>
            <p>Your seals are saved to your vault for re-downloading. This includes the license information you provided. You can view, manage, and delete seals from your dashboard at any time.</p>
            <p>For more details, see our <Link href="#">Privacy Policy</Link>.</p>
          </>
        ),
      },
      {
        q: "What are the rules for authorized use?",
        a: (
          <>
            <p>By downloading and using a Stamplr seal, you confirm that:</p>
            <ul>
              <li>You are the <strong>licensed professional</strong> associated with the license number on the seal</li>
              <li>The seal will be used <strong>only for work you have personally performed or supervised</strong></li>
              <li>You will comply with your state&apos;s <strong>engineering practice act</strong> and electronic sealing regulations</li>
              <li>You will <strong>not share, transfer, or allow unauthorized use</strong> of your seal by others</li>
            </ul>
            <p><strong>Unauthorized use of an engineering seal is a violation of state licensing law</strong> and can result in license suspension, fines, or criminal penalties.</p>
            <p>Read our full <Link href="#">Authorized Use Policy</Link> for complete terms.</p>
          </>
        ),
      },
      {
        q: "How do I verify that my seal meets state board requirements?",
        a: (
          <>
            <p>Every Stamplr seal is generated based on the <strong>official specifications</strong> published by your state engineering board. We regularly update our templates to reflect any regulatory changes.</p>
            <p>To independently verify compliance:</p>
            <ul>
              <li>Download your state&apos;s seal specification document from their official website</li>
              <li>Compare the layout, text placement, and sizing requirements to your generated seal</li>
              <li>Check our <Link href="#">State Compliance Notes</Link> for links to official board regulations</li>
            </ul>
            <p>If you notice any discrepancies, please report them immediately to <a href="mailto:compliance@stamplr.com">compliance@stamplr.com</a> so we can investigate and update our templates.</p>
          </>
        ),
      },
      {
        q: "Can I use the seal for projects in states where I'm not licensed?",
        a: (
          <>
            <p><strong>No.</strong> You may only use an engineering seal in states where you hold an active, valid license.</p>
            <p>However, many states have <strong>reciprocity agreements</strong> or <strong>comity processes</strong> that allow engineers licensed in one state to practice in another. Check with the target state&apos;s board for:</p>
            <ul>
              <li>Temporary practice permits</li>
              <li>Reciprocal licensure pathways</li>
              <li>Requirements for out-of-state engineers</li>
            </ul>
            <p>If you practice in multiple states, consider our <strong>Engineer Bundle</strong> plan, which allows you to generate seals for multiple jurisdictions.</p>
          </>
        ),
      },
    ],
  },
];

const SEARCH_TAGS = ["Download issues", "License number", "File formats", "Refunds", "State requirements"];

const QUICK_ACTIONS = [
  { id: "getting-started", icon: "🚀", title: "Getting Started", desc: "Learn the basics of creating your first engineering seal" },
  { id: "account", icon: "👤", title: "Account & Billing", desc: "Manage your account, subscriptions, and payment methods" },
  { id: "technical", icon: "⚙️", title: "Technical Support", desc: "Troubleshoot file issues, downloads, and software integration" },
  { id: "legal", icon: "⚖️", title: "Legal & Compliance", desc: "Understand state requirements and authorized use policies" },
];

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openItem, setOpenItem] = useState<string | null>(null);

  const filteredCategories = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return HELP_CATEGORIES;
    return HELP_CATEGORIES.map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          item.q.toLowerCase().includes(q) ||
          (typeof item.a === "object" && String(item.a).toLowerCase().includes(q))
      ),
    })).filter((cat) => cat.items.length > 0);
  }, [searchQuery]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.6, overflowX: "hidden", position: "relative" }}>
      <div style={{ position: "fixed", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none", zIndex: 0 }} />

      {/* ── NAV ── */}
      <style>{`
        #supportNav { padding: 0 40px; }
        @media (max-width: 768px) { #supportNav { padding: 0 16px !important; } #supportNavLinks { display: none !important; } #supportNavActions .ghost { display: none !important; } }
      `}</style>
      <nav id="supportNav" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 58, display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(10,10,12,0.88)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Logo />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 8.5, letterSpacing: "0.1em", textTransform: "uppercase", background: "rgba(74,222,128,0.12)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.25)", padding: "2px 7px", borderRadius: 20 }}>Beta</span>
        </div>
        <ul id="supportNavLinks" style={{ display: "flex", alignItems: "center", gap: 2, listStyle: "none", padding: 0, margin: 0 }}>
          {[["Features", "/#features"], ["Pricing", "/#pricing"], ["Support", "/support"]].map(([label, href]) => (
            <li key={label}>
              <Link href={href} style={{ fontSize: 13.5, color: href === "/support" ? "var(--text)" : "var(--text-dim)", textDecoration: "none", padding: "5px 13px", borderRadius: 20, transition: "color .15s, background .15s", display: "flex", alignItems: "center", background: href === "/support" ? "var(--bg3)" : undefined }}>{label}</Link>
            </li>
          ))}
        </ul>
        <div id="supportNavActions" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button type="button" className="ghost btn-glass">Log in</button>
          <Link href="/design" style={{ fontSize: 13, fontWeight: 600, color: "#fff", background: "var(--accent)", border: "none", padding: "7px 18px", borderRadius: 20, cursor: "pointer", textDecoration: "none", fontFamily: "'DM Sans', sans-serif" }}>Design Your Stamp →</Link>
        </div>
      </nav>

      <main style={{ position: "relative", zIndex: 1, paddingTop: 58, minHeight: "100vh" }}>
        {/* Hero */}
        <section style={{ padding: "80px 40px 60px", textAlign: "center", maxWidth: 800, margin: "0 auto" }}>
          <style>{`
            @media (max-width: 768px) { .support-hero-inner { padding: 60px 20px 40px !important; } .support-hero-inner h1 { font-size: 32px !important; } }
          `}</style>
          <div className="support-hero-inner">
            <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-1.2px", color: "var(--text)", marginBottom: 18 }}>How can we help?</h1>
            <p style={{ fontSize: 16, color: "var(--text-mid, #9898a8)", lineHeight: 1.6, marginBottom: 36 }}>Get answers to common questions, learn how to use Stamplr, or reach out to our support team.</p>
            <div style={{ maxWidth: 600, margin: "0 auto 20px", position: "relative" }}>
              <span style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)", fontSize: 16, pointerEvents: "none" }}>🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for help articles, topics, or keywords..."
                style={{ width: "100%", padding: "15px 18px 15px 48px", background: "var(--bg2)", border: "1px solid rgba(255,255,255,0.11)", borderRadius: 12, color: "var(--text)", fontFamily: "'DM Sans', sans-serif", fontSize: 15 }}
              />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
              {SEARCH_TAGS.map((tag) => (
                <button type="button" key={tag} onClick={() => setSearchQuery(tag.toLowerCase())} style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: ".05em", color: "var(--text-dim)", background: "var(--bg2)", border: "1px solid var(--border)", padding: "4px 10px", borderRadius: 20, cursor: "pointer", transition: "all .15s" }}>{tag}</button>
              ))}
            </div>
          </div>
        </section>

        {/* Quick actions */}
        <section style={{ maxWidth: 1200, margin: "0 auto 80px", padding: "0 40px" }}>
          <style>{`
            @media (max-width: 768px) { .support-quick { padding: 0 20px !important; } .support-quick-grid { grid-template-columns: 1fr !important; } }
          `}</style>
          <div className="support-quick" style={{ padding: "0 40px" }}>
            <div className="support-quick-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
              {QUICK_ACTIONS.map((a) => (
                <Link key={a.id} href={`#${a.id}`} onClick={(e) => { e.preventDefault(); scrollTo(a.id); }} style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 12, padding: 24, textDecoration: "none", display: "block", transition: "all .2s" }}>
                  <div style={{ width: 40, height: 40, background: "rgba(96,165,250,0.06)", border: "1px solid rgba(96,165,250,.2)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, marginBottom: 16, color: "var(--accent)" }}>{a.icon}</div>
                  <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600, color: "var(--text)", marginBottom: 6, letterSpacing: "-0.2px" }}>{a.title}</h3>
                  <p style={{ fontSize: 13.5, color: "var(--text-dim)", lineHeight: 1.5 }}>{a.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Status banner */}
        <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 12, padding: "20px 24px", margin: "0 40px 60px", maxWidth: 1200, marginLeft: "auto", marginRight: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80", animation: "pulse 2s ease-in-out infinite" }} />
            <div>
              <div style={{ fontWeight: 600, color: "var(--text)", fontSize: 14 }}>All Systems Operational</div>
              <div style={{ fontSize: 12.5, color: "var(--text-dim)" }}>Service running normally · Last updated 2 minutes ago</div>
            </div>
          </div>
          <a href="#" style={{ fontSize: 13, color: "var(--accent)", textDecoration: "none", fontWeight: 500 }}>View Status Page →</a>
        </div>
        <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>

        {/* Help categories */}
        <section style={{ maxWidth: 1200, margin: "0 auto 100px", padding: "0 40px" }}>
          <style>{`@media (max-width: 768px) { .support-help-section { padding: 0 20px !important; } }`}</style>
          <div className="support-help-section">
            {filteredCategories.map((cat) => (
              <div key={cat.id} id={cat.id} style={{ marginBottom: 60 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid var(--border)" }}>
                  <div style={{ width: 36, height: 36, background: "rgba(96,165,250,0.06)", border: "1px solid rgba(96,165,250,.2)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "var(--accent)" }}>{cat.icon}</div>
                  <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 24, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.5px" }}>{cat.title}</h2>
                </div>
                <div style={{ display: "grid", gap: 12 }}>
                  {cat.items.map((item, idx) => {
                    const key = `${cat.id}-${idx}`;
                    const isOpen = openItem === key;
                    return (
                      <div key={key} style={{ background: "var(--bg2)", border: "1px solid " + (isOpen ? "rgba(255,255,255,0.11)" : "var(--border)"), borderRadius: 8, overflow: "hidden", transition: "all .2s" }}>
                        <button type="button" onClick={() => setOpenItem(isOpen ? null : key)} style={{ width: "100%", padding: "18px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", fontWeight: 500, color: "var(--text)", fontSize: 14.5, background: "none", border: "none", fontFamily: "'DM Sans', sans-serif", textAlign: "left" }}>
                          {item.q}
                          <span style={{ color: "var(--text-dim)", fontSize: 12, flexShrink: 0, marginLeft: 12, transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .2s" }}>▾</span>
                        </button>
                        <div style={{ maxHeight: isOpen ? 800 : 0, overflow: "hidden", transition: "max-height .3s ease" }}>
                          <div style={{ padding: "0 20px 20px", color: "var(--text-dim)", fontSize: 14, lineHeight: 1.7 }}>
                            <div className="support-answer-content" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                              {item.a}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section style={{ maxWidth: 800, margin: "0 auto 80px", padding: "0 40px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 32, fontWeight: 700, color: "var(--text)", marginBottom: 14, letterSpacing: "-0.8px" }}>Still need help?</h2>
          <p style={{ fontSize: 15, color: "var(--text-dim)", marginBottom: 36, lineHeight: 1.6 }}>Can&apos;t find what you&apos;re looking for? Send us an email and we&apos;ll get back to you soon.</p>
          <div style={{ maxWidth: 480, margin: "0 auto", background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 12, padding: "40px 32px", transition: "all .2s" }}>
            <div style={{ width: 56, height: 56, background: "rgba(96,165,250,0.06)", border: "1px solid rgba(96,165,250,.2)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, margin: "0 auto 20px", color: "var(--accent)" }}>📧</div>
            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 600, color: "var(--text)", marginBottom: 10, letterSpacing: "-0.3px" }}>Email Support</h3>
            <p style={{ fontSize: 14, color: "var(--text-dim)", marginBottom: 20, lineHeight: 1.6 }}>Get help with technical issues, account questions, or billing inquiries.</p>
            <a href="mailto:support@stamplr.com" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: "#fff", background: "var(--accent)", border: "none", padding: "10px 24px", borderRadius: 20, cursor: "pointer", textDecoration: "none", display: "inline-block", marginTop: 8 }}>support@stamplr.com</a>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10.5, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--text-dim)", background: "var(--bg3)", border: "1px solid var(--border)", padding: "4px 10px", borderRadius: 20, display: "inline-block", marginTop: 16 }}>We typically respond within 24 hours</span>
          </div>
          <p style={{ marginTop: 40, fontSize: 13.5, color: "var(--text-dim)" }}>For urgent compliance or legal questions, please consult your state engineering board directly.<br /><a href="#" style={{ color: "var(--accent)", textDecoration: "none" }}>View state board contact directory →</a></p>
        </section>
      </main>

      {/* Footer */}
      <footer id="supportFooter" style={{ borderTop: "1px solid var(--border)", padding: "60px 40px 40px", position: "relative", zIndex: 1 }}>
        <style>{`
          @media (max-width: 768px) { #supportFooter { padding: 40px 20px 30px !important; } .support-footer-inner { grid-template-columns: 1fr !important; gap: 32px !important; } .support-footer-bottom { flex-direction: column !important; align-items: flex-start !important; } .support-footer-legal { flex-direction: column !important; align-items: flex-start !important; gap: 8px !important; } }
        `}</style>
        <div className="support-footer-inner" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
          <div>
            <Logo />
            <p style={{ fontSize: 13.5, color: "var(--text-dim)", lineHeight: 1.6, maxWidth: 280, marginTop: 16 }}>State-compliant engineering seals for the modern PE. Instant and affordable.</p>
          </div>
          {[
            { title: "Product", links: [["Create Seal", "/design"], ["My Seals", "#"], ["Team Plans", "#"], ["Pricing", "/#pricing"]] },
            { title: "Coverage", links: [["Supported States", "/"], ["Credential Types", "#"], ["State Updates", "#"], ["Request a State", "#"]] },
            { title: "Legal", links: [["Terms of Use", "#"], ["Privacy Policy", "#"], ["Authorized Use", "#"], ["Compliance Notes", "#"]] },
            { title: "Support", links: [["Help Center", "/support"], ["Contact Us", "#"], ["Status", "#"]] },
          ].map((col) => (
            <div key={col.title}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text-mid, #9898a8)", marginBottom: 8 }}>{col.title}</div>
              {col.links.map(([label, href]) => (
                <Link key={label} href={href} style={{ display: "block", fontSize: 13.5, color: "var(--text-dim)", textDecoration: "none", marginBottom: 8, transition: "color .15s" }}>{label}</Link>
              ))}
            </div>
          ))}
        </div>
        <div className="support-footer-bottom" style={{ maxWidth: 1200, margin: "0 auto", paddingTop: 28, borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
          <span style={{ fontSize: 12.5, color: "var(--text-dim)" }}>© 2026 Stamplr. Not affiliated with any state engineering board.</span>
          <div className="support-footer-legal" style={{ display: "flex", gap: 20 }}>
            <Link href="#" style={{ fontSize: 12.5, color: "var(--text-dim)", textDecoration: "none" }}>Terms</Link>
            <Link href="#" style={{ fontSize: 12.5, color: "var(--text-dim)", textDecoration: "none" }}>Privacy</Link>
            <Link href="#" style={{ fontSize: 12.5, color: "var(--text-dim)", textDecoration: "none" }}>Authorized Use Policy</Link>
          </div>
        </div>
      </footer>

      {/* Answer content global styles for links/code/lists */}
      <style>{`
        .support-answer-content a { color: var(--accent); text-decoration: none; }
        .support-answer-content a:hover { opacity: .7; }
        .support-answer-content strong { color: var(--text); font-weight: 600; }
        .support-answer-content code { font-family: 'DM Mono', monospace; font-size: 13px; background: var(--bg3); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--border); color: var(--accent); }
        .support-answer-content ul { margin: 12px 0; padding-left: 20px; }
        .support-answer-content li { margin-bottom: 8px; }
      `}</style>
    </div>
  );
}
