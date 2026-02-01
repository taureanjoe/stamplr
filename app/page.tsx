import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <span className="font-semibold text-slate-800">StampLr</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-slate-600 text-sm">
            <a href="#products" className="hover:text-slate-900">Products</a>
            <a href="#solutions" className="hover:text-slate-900">Solutions</a>
            <a href="#features" className="hover:text-slate-900">Features</a>
            <a href="#pricing" className="hover:text-slate-900">Pricing</a>
            <a href="#support" className="hover:text-slate-900">Support</a>
          </nav>
          <div className="flex items-center gap-4">
            <button type="button" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Sign In
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Professional Seals, Reimagined for Engineers & Notaries.
              </h1>
              <p className="mt-4 text-lg text-slate-600">
                Design, manage, and deploy your official stamps with modern precision. Cloud-secure and compliant.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/design"
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white hover:bg-blue-700"
                >
                  Design Your Stamp
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-lg bg-slate-100 px-6 py-3 text-base font-semibold text-slate-700 hover:bg-slate-200"
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="w-full max-w-sm aspect-[3/4] rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center shadow-sm">
                <div className="text-slate-400 text-sm">Stamp preview</div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="border-t border-slate-200 bg-slate-50/50 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-10">Key Features</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900">Cloud Vault & Sync</h3>
                <p className="mt-2 text-sm text-slate-600">Design, manage and deploy your official stamp & sync.</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900">Smart Compliance Check</h3>
                <p className="mt-2 text-sm text-slate-600">Smart, manage and deploy your official stamp check.</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900">Team Management & Roles</h3>
                <p className="mt-2 text-sm text-slate-600">Design, manage and deploy your official stamps & roles.</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5V9a2 2 0 012-2h2a2 2 0 012 2v6a2 2 0 01-2 2H2a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9V9a2 2 0 012-2h2a2 2 0 012 2v6a2 2 0 01-2 2h-2m-4-1v4m0 2v-4m0 0v-2a2 2 0 012-2h0V9a2 2 0 00-2 2v2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900">Digital & Physical Output</h3>
                <p className="mt-2 text-sm text-slate-600">Download stamps in SVG, PNG, PDF, TIFF, and CAD DWG.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
