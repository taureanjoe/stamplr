import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f7]">
      <header className="border-b border-slate-200 bg-[#faf9f7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Logo />
          <nav className="hidden md:flex items-center gap-8 text-stamplr-gray text-sm font-medium">
            <Link href="/design" className="hover:text-slate-900">
              Create Stamp
            </Link>
            <a href="#pricing" className="hover:text-slate-900">
              Pricing
            </a>
            <a href="#support" className="hover:text-slate-900">
              Support
            </a>
            <a href="#features" className="hover:text-slate-900">
              Features
            </a>
          </nav>
          <button
            type="button"
            className="md:hidden p-2 text-stamplr-gray hover:text-slate-900"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-stamplr-gray tracking-tight">
                Precision Digital Stamps for Engineers. Trustworthy, Compliant.
              </h1>
              <p className="mt-4 text-lg text-stamplr-gray/90">
                Create, manage, and deploy professional seals with engineering precision.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/design"
                  className="inline-flex items-center justify-center rounded-lg bg-stamplr-blue px-6 py-3.5 text-base font-semibold text-white hover:bg-stamplr-blue/90 transition-colors"
                >
                  Create Your Stamp
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-lg bg-stamplr-gray px-6 py-3.5 text-base font-semibold text-white hover:bg-stamplr-gray/90 transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="relative w-full max-w-sm">
                <div className="aspect-[4/3] rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shadow-md">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-slate-200 flex items-center justify-center">
                      <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p className="text-sm text-slate-500">Stamp on document</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:hidden mt-8">
            <Link
              href="/design"
              className="block w-full text-center rounded-lg bg-stamplr-blue px-6 py-4 text-base font-semibold text-white hover:bg-stamplr-blue/90"
            >
              Create Your Stamp
            </Link>
          </div>
        </section>

        <section id="features" className="border-t border-slate-200 bg-[#faf9f7] py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold text-stamplr-gray mb-8">Key Features</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="rounded-xl bg-stamplr-blue p-6 text-white">
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg">Precision Engineering</h3>
                <p className="mt-2 text-sm text-white/90">
                  Create, manage, and deploy professional seals with engineering precision.
                </p>
              </div>
              <div className="rounded-xl bg-stamplr-gray p-6 text-white">
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg">Audit Trail & Security</h3>
                <p className="mt-2 text-sm text-white/90">
                  Ensures permissible engineering, audit trail & security.
                </p>
              </div>
              <div className="rounded-xl bg-stamplr-gray p-6 text-white">
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg">API Integration</h3>
                <p className="mt-2 text-sm text-white/90">
                  API integration for professional workflows and automation.
                </p>
              </div>
              <div className="rounded-xl bg-stamplr-gray p-6 text-white">
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5V9a2 2 0 012-2h2a2 2 0 012 2v6a2 2 0 01-2 2H2a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9V9a2 2 0 012-2h2a2 2 0 012 2v6a2 2 0 01-2 2h-2m-4-1v4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg">Digital & Physical Output</h3>
                <p className="mt-2 text-sm text-white/90">
                  Digital & physical printing output and paperless workflows.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
