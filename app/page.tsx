// app/page.tsx — ZenniFitness parent homepage.
// Lean landing page for zennifitness.com. Links out to the ZenniFit product
// page at /zennifit. Keep this minimal — the full marketing page lives there.

import Link from 'next/link';
import { Flame } from 'lucide-react';

const RED = '#B01020';
const SALMON = '#C94A3F';
const HEAD = { fontStyle: 'italic' as const, fontWeight: 800, letterSpacing: '-0.5px' };

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-neutral-800">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-neutral-200 bg-white/90 px-8 py-4 backdrop-blur">
        <div className="flex items-center gap-2.5">
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[9px]" style={{ background: RED }}>
            <Flame size={17} color="#fff" />
          </div>
          <span className="text-[19px] text-neutral-900" style={HEAD}>ZenniFitness</span>
        </div>
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/zennifit"
            className="rounded-md px-3 py-1.5 text-sm font-semibold transition-colors"
            style={{ color: RED, background: 'rgba(176,16,32,0.06)' }}
          >
            ZenniFit
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto flex max-w-3xl flex-col items-center px-8 py-28 text-center">
        <div className="mb-5 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold" style={{ background: 'rgba(176,16,32,0.06)', color: RED }}>
          <Flame size={14} /> ZenniFitness
        </div>
        <h1 className="m-0 mb-4 text-[40px] leading-[1.15] text-neutral-900" style={HEAD}>
          Training that adapts to <span style={{ color: SALMON }}>you</span>
        </h1>
        <p className="m-0 mb-8 max-w-md text-[17px] leading-relaxed text-neutral-600">
          ZenniFitness builds AI-coached training experiences. Start with ZenniFit — one coach for your runs, lifts and Hyrox.
        </p>
        <Link
          href="/zennifit"
          className="rounded-lg px-7 py-3.5 text-[15px] font-semibold text-white no-underline transition-transform hover:-translate-y-0.5"
          style={{ background: RED }}
        >
          Explore ZenniFit
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 px-8 py-8 text-center">
        <span className="text-[13px] text-neutral-500">© 2026 ZenniFitness. All rights reserved.</span>
      </footer>
    </main>
  );
}
