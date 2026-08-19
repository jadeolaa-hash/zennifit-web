'use client';

// app/zennifit/page.tsx — ZenniFit app page (Hume-style structure, ZenniFit content).
// -----------------------------------------------------------------------------
// Sections (adapted from Hume's app page, original copy):
//   Hero → Connect/Understand/Adapt/Improve → Tier ladder (the value prop) → FAQ → Footer.
// The tier ladder mirrors Hume's Free-vs-Premium comparison, but as a 4-tier ladder:
//   Health (Free) · Running · Fitness · Hyrox.
//
// Prices are the previously-agreed figures mapped onto the pillar names — change or
// remove them in the `TIERS` array below. No fabricated reviews or studies (integrity).
//
// Deps: lucide-react (already present with shadcn). Tailwind assumed.
// You can drop the interactive iPhone <PhoneShowcase/> component into the hero later;
// left out here to keep this file focused on the page structure + tiers.
// -----------------------------------------------------------------------------

import { useState } from 'react';
import {
  Flame, PlugZap, Lightbulb, RefreshCw, Trophy, Check, Minus, Plus,
  Instagram, Twitter,
} from 'lucide-react';
import { ArticlesMegaMenu } from '@/components/articles-mega-menu';

const RED = '#B01020';
const HEAD = { fontStyle: 'italic' as const, fontWeight: 800, letterSpacing: '-0.5px' };

const STEPS: [React.ComponentType<{ size?: number; color?: string }>, string, string][] = [
  [PlugZap, 'Connect', 'Sync your wearables — sleep, heart rate and activity in one place.'],
  [Lightbulb, 'Understand', "See how last night's recovery shapes what your body can handle today."],
  [RefreshCw, 'Adapt', 'Your running, gym and Hyrox sessions reshape automatically to your readiness.'],
  [Trophy, 'Improve', "Push hard when you're fresh, back off when you're not — and actually progress."],
];

// Tier ladder. Edit names / prices here.
const TIERS = [
  { name: 'Health', price: 'Free' },
  { name: 'Running', price: '£9.99' },
  { name: 'Fitness', price: '£25.99' },
  { name: 'Hyrox', price: '£45.99' },
];

// feature label + which tiers include it [Health, Running, Fitness, Hyrox]
const FEATURES: [string, boolean[]][] = [
  ['Health & sleep tracking', [true, true, true, true]],
  ['Daily Readiness score', [true, true, true, true]],
  ['Community & streaks', [true, true, true, true]],
  ['Guided runs & running plans', [false, true, true, true]],
  ['Pace & GPS (mobile)', [false, true, true, true]],
  ['Gym logging & anatomy', [false, false, true, true]],
  ['Nutrition & macros', [false, false, true, true]],
  ['Recovery-adapted AI Coach', [false, false, true, true]],
  ['Hyrox 8-station programming', [false, false, false, true]],
  ['Race simulations & pacing', [false, false, false, true]],
];

const FAQ: [string, string][] = [
  ['What makes ZenniFit different?', "It reads your recovery each morning and reshapes that day's session across running, gym and Hyrox — not a fixed plan that ignores how you slept."],
  ['Is there a free version?', 'Yes — the Health tier is free forever: health & sleep tracking, your daily Readiness score, and community.'],
  ['Do I need a wearable?', 'No, you can log manually — but a connected band or watch makes your Readiness score and adaptations far sharper.'],
  ["What's in the Hyrox tier?", 'Full 8-station programming interleaved with compromised-running blocks and per-1km race pacing.'],
  ['Can I cancel anytime?', 'Yes — plans are month to month; change or cancel whenever you like.'],
];

function TierCell({ on, top }: { on: boolean; top: boolean }) {
  return (
    <div className={`flex justify-center border-l border-neutral-100 py-2.5 ${top ? 'bg-[#B01020]/[0.03]' : ''}`}>
      {on ? <Check size={16} color={RED} strokeWidth={3} /> : <Minus size={14} className="text-neutral-300" />}
    </div>
  );
}

export default function ZenniFitPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-white text-neutral-800">
      {/* NAV */}
      <nav className="flex items-center justify-between border-b border-neutral-200 px-8 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[9px]" style={{ background: RED }}><Flame size={17} color="#fff" /></div>
          <span className="text-[19px] text-neutral-900" style={HEAD}>ZenniFitness</span>
        </div>
        <div className="hidden items-center gap-6 text-sm text-neutral-600 md:flex">
          <span className="rounded-md px-3 py-1.5 font-semibold" style={{ color: RED, background: 'rgba(176,16,32,0.06)' }}>App</span>
          <ArticlesMegaMenu />
          <span>Why Us</span><span>Shop</span><span>Support</span>
          <button className="rounded-md px-4 py-2 text-sm font-semibold text-white" style={{ background: RED }}>Get early access</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="mx-auto max-w-2xl px-6 pb-10 pt-12 text-center">
        <p className="mb-3 text-[13px] font-semibold" style={{ color: RED }}>Founding members — early access open</p>
        <h1 className="m-0 mb-4 text-[40px] leading-[1.14] text-neutral-900" style={HEAD}>Level up with ZenniFit</h1>
        <p className="mx-auto mb-6 max-w-xl text-[17px] leading-relaxed text-neutral-600">
          Understand the connection between your recovery and your training — so every session moves you toward your goal. Running, gym and Hyrox in one adaptive plan.
        </p>
        <button className="rounded-lg px-7 py-3.5 text-[15px] font-semibold text-white" style={{ background: RED }}>Get early access</button>
        <p className="mt-3.5 text-xs text-neutral-400">App Store &amp; Google Play — coming soon</p>
      </section>

      {/* STEPS */}
      <section className="border-t border-neutral-200 bg-neutral-50 px-6 py-12">
        <h2 className="m-0 mb-8 text-center text-[26px] text-neutral-900" style={HEAD}>Connect. Understand. Adapt. Improve.</h2>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(([Icon, title, body]) => (
            <div key={title} className="rounded-xl border border-neutral-200 bg-white p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-[10px]" style={{ background: 'rgba(176,16,32,0.07)' }}><Icon size={18} color={RED} /></div>
              <p className="m-0 mb-1 text-[15px] font-bold text-neutral-900">{title}</p>
              <p className="m-0 text-[13px] leading-snug text-neutral-500">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TIER LADDER */}
      <section className="border-t border-neutral-200 bg-neutral-50 px-6 py-12">
        <h2 className="m-0 mb-1.5 text-center text-[27px] text-neutral-900" style={HEAD}>What you get with ZenniFit</h2>
        <p className="mx-auto mb-9 max-w-lg text-center text-[15px] text-neutral-500">Start free with Health. Add Running, Fitness and Hyrox as you grow.</p>

        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          {/* header */}
          <div className="grid" style={{ gridTemplateColumns: '1.7fr repeat(4, 1fr)' }}>
            <div className="px-4 py-3.5" />
            {TIERS.map((t, i) => {
              const top = i === 3;
              return (
                <div key={t.name} className={`border-l border-neutral-100 px-2 py-3.5 text-center ${top ? 'bg-[#B01020]/[0.04]' : ''}`}>
                  <p className="m-0 text-[13.5px] italic" style={{ fontWeight: 800, color: top ? RED : '#1a1a1a' }}>{t.name}</p>
                  <p className="m-0 mt-0.5 text-[11px] text-neutral-400">{t.price}{t.price === 'Free' ? '' : '/mo'}</p>
                </div>
              );
            })}
          </div>
          {/* rows */}
          {FEATURES.map(([label, cells]) => (
            <div key={label} className="grid border-t border-neutral-100" style={{ gridTemplateColumns: '1.7fr repeat(4, 1fr)' }}>
              <div className="flex items-center px-4 py-2.5 text-[12.5px] text-neutral-600">{label}</div>
              {cells.map((on, ci) => <TierCell key={ci} on={on} top={ci === 3} />)}
            </div>
          ))}
          {/* CTAs */}
          <div className="grid border-t border-neutral-200" style={{ gridTemplateColumns: '1.7fr repeat(4, 1fr)' }}>
            <div className="px-4 py-3.5" />
            {TIERS.map((t, i) => {
              const top = i === 3;
              return (
                <div key={t.name} className={`border-l border-neutral-100 px-1.5 py-3.5 text-center ${top ? 'bg-[#B01020]/[0.03]' : ''}`}>
                  <button
                    className="rounded-md px-2.5 py-1.5 text-[11px] font-semibold"
                    style={top ? { background: RED, color: '#fff' } : { background: '#fff', color: RED, border: `1px solid ${RED}` }}
                  >
                    {i === 0 ? 'Start free' : 'Choose'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <p className="mx-auto mt-4 max-w-lg text-center text-xs text-neutral-400">
          Hyrox unlocks full 8-station programming — the loop no other coach closes.
        </p>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-12">
        <h2 className="m-0 mb-6 text-center text-[23px] text-neutral-900" style={HEAD}>Frequently asked questions</h2>
        {FAQ.map(([q, a], i) => (
          <div key={q} className="cursor-pointer border-b border-neutral-200" onClick={() => setOpen(open === i ? null : i)}>
            <div className="flex items-center justify-between py-4">
              <span className="text-[14.5px] font-semibold text-neutral-900">{q}</span>
              {open === i ? <Minus size={15} color={RED} /> : <Plus size={15} color={RED} />}
            </div>
            {open === i && <p className="m-0 pb-4 text-[13.5px] leading-relaxed text-neutral-500">{a}</p>}
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer className="bg-neutral-950 px-6 py-9 text-center">
        <div className="mb-3 flex items-center justify-center gap-2.5">
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[9px]" style={{ background: RED }}><Flame size={16} color="#fff" /></div>
          <span className="text-[17px] italic text-white" style={{ fontWeight: 500 }}>ZenniFit</span>
        </div>
        <div className="mb-3 flex items-center justify-center gap-4 text-neutral-500">
          <Instagram size={17} /><Twitter size={17} />
        </div>
        <p className="m-0 text-xs text-neutral-500">© 2026 ZenniFitness · App · The Science · Shop · About · Support · Privacy</p>
      </footer>
    </main>
  );
}
