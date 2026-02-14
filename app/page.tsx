import Link from "next/link";
import { Logo } from "@/components/Logo";
import { BottomNav } from "@/components/BottomNav";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow pointer-events-none" />
      <header className="relative z-10 glass rounded-2xl mx-4 mt-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Logo />
          <nav className="hidden md:flex items-center gap-8 text-white/80 text-sm font-medium">
            <a href="#products" className="hover:text-white flex items-center gap-1">
              Products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <a href="#solutions" className="hover:text-white flex items-center gap-1">
              Solutions
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
            <a href="#support" className="hover:text-white">Support</a>
          </nav>
          <button type="button" className="btn-glass">
            Sign In
          </button>
          <button
            type="button"
            className="md:hidden p-2 text-white/80"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      <main className="flex-1 relative z-10 pb-24 md:pb-0">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                Professional Seals, Reimagined.
              </h1>
              <p className="mt-4 text-lg text-white/70">
                Premium desktop, web and mobile solutions to create and deploy professional stamps with engineering precision.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/design" className="btn-gradient inline-flex items-center justify-center">
                  Design Your Stamp
                </Link>
                <a href="#features" className="btn-glass inline-flex items-center justify-center">
                  Learn More
                </a>
              </div>
            </div>
            <div className="hidden md:flex justify-center relative">
              <div className="relative w-full max-w-md">
                <div className="aspect-square rounded-2xl glass-card p-8 flex items-center justify-center shadow-glow">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-xl bg-gradient-accent flex items-center justify-center shadow-glow">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p className="text-sm text-white/60">Stamp on document</p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-lg bg-blue-500/20 border border-blue-400/30" />
                <div className="absolute -bottom-2 -left-2 w-12 h-12 rounded-lg bg-violet-500/20 border border-violet-400/30" />
              </div>
            </div>
          </div>

          <div className="md:hidden mt-8">
            <Link href="/design" className="btn-gradient block w-full text-center py-4">
              Design Your Stamp
            </Link>
          </div>
        </section>

        <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <h2 className="text-2xl font-bold text-white mb-8">Key Features</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-6 hover:border-blue-500/30 transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-white">Cloud Vault</h3>
              <p className="mt-2 text-sm text-white/60">
                Cloud vault provides secure storage and synchronization for your professional seals.
              </p>
            </div>
            <div className="glass-card p-6 hover:border-violet-500/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-white">Smart Compliance</h3>
              <p className="mt-2 text-sm text-white/60">
                Ensures permissible engineering, audit trail and security compliance.
              </p>
            </div>
            <div className="glass-card p-6 hover:border-teal-500/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-white">Team Management</h3>
              <p className="mt-2 text-sm text-white/60">
                Design, manage and deploy official stamps with team roles and permissions.
              </p>
            </div>
            <div className="glass-card p-6 hover:border-fuchsia-500/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-fuchsia-500 to-pink-500 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5V9a2 2 0 012-2h2a2 2 0 012 2v6a2 2 0 01-2 2H2a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9V9a2 2 0 012-2h2a2 2 0 012 2v6a2 2 0 01-2 2h-2m-4-1v4" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-white">Digital & Physical Output</h3>
              <p className="mt-2 text-sm text-white/60">
                Digital and physical printing output with paperless workflows.
              </p>
            </div>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
