'use client';

// app/page.tsx — ZenniFit marketing landing page (web preview launch).
// -----------------------------------------------------------------------------
// Drops into the ROOT Next.js project as the home route. No auth / Supabase /
// Stripe needed — this is the public landing page only. Deploys to Vercel as-is.
//
// Dependencies: lucide-react (already present if the project uses shadcn; else
//   run `npm i lucide-react`). Tailwind is assumed (shadcn projects have it).
//
// Font: headings use italic + heavy weight to approximate Barlow Black Italic.
// For the exact brand face, add Barlow via next/font/google in app/layout.tsx:
//   import { Barlow } from 'next/font/google';
//   const barlow = Barlow({ subsets: ['latin'], weight: ['400','700','900'],
//     style: ['normal','italic'], variable: '--font-barlow' });
//   …and add `${barlow.variable}` to <body> className, then swap the inline
//   fontFamily below for `var(--font-barlow)`.
// -----------------------------------------------------------------------------

import { useEffect, useState } from 'react';
import {
  Flame, Home, Dumbbell, MessageCircle, Play, Moon, Watch,
  Apple, HeartPulse, Zap, Activity, Footprints, Wifi, BatteryFull,
  Instagram, Twitter,
} from 'lucide-react';

const RED = '#B01020';
const SALMON = '#C94A3F';
const HEAD = { fontStyle: 'italic' as const, fontWeight: 800, letterSpacing: '-0.5px' };

// --- phone screens ------------------------------------------------------------

const SCREENS = [
  { key: 'home', title: "Today's adapted session", body: 'Readiness, plan and your AI Coach brief in one view.' },
  { key: 'running', title: 'Running', body: 'Guided runs and pacing — your free-tier on-ramp.' },
  { key: 'gym', title: 'Gym', body: 'Fast logging with load that flexes to your recovery.' },
  { key: 'hyrox', title: 'Hyrox', body: 'All 8 stations programmed with compromised-run blocks.' },
  { key: 'coach', title: 'AI Coach', body: 'Explains every adjustment and coaches in the moment.' },
] as const;

const TABS = [
  { key: 'home', Icon: Home },
  { key: 'running', Icon: Footprints },
  { key: 'gym', Icon: Dumbbell },
  { key: 'hyrox', Icon: Flame },
  { key: 'coach', Icon: MessageCircle },
];

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-[18px] pt-[14px] pb-[6px] text-[12px] font-semibold text-neutral-900">
      <span>9:41</span>
      <span className="flex items-center gap-[5px]"><Wifi size={13} /><BatteryFull size={15} /></span>
    </div>
  );
}

function TabBar({ active }: { active: string }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 flex justify-around bg-white pt-3 pb-5 border-t border-neutral-100">
      {TABS.map(({ key, Icon }) => (
        <Icon key={key} size={21} color={key === active ? RED : '#c2c2c2'} />
      ))}
    </div>
  );
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-[14px] mb-3 rounded-2xl bg-white p-[14px] shadow-[0_1px_3px_rgba(0,0,0,0.04)] ${className}`}>{children}</div>;
}

function PhoneScreen({ screen }: { screen: string }) {
  if (screen === 'home') {
    return (
      <>
        <StatusBar />
        <div className="px-[18px] pt-1 pb-[10px]">
          <p className="m-0 text-[12px] text-neutral-400">Good morning, James</p>
          <p className="m-0 mt-0.5 text-[19px] text-neutral-900" style={HEAD}>Ready to train?</p>
        </div>
        <Card>
          <div className="flex items-center gap-[14px]">
            <div className="relative h-14 w-14">
              <svg width="56" height="56" viewBox="0 0 56 56">
                <circle cx="28" cy="28" r="24" fill="none" stroke="#eee" strokeWidth="5" />
                <circle cx="28" cy="28" r="24" fill="none" stroke={RED} strokeWidth="5" strokeDasharray="150.8" strokeDashoffset="30" strokeLinecap="round" transform="rotate(-90 28 28)" />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[16px] font-bold text-neutral-900">80</span>
            </div>
            <div>
              <p className="m-0 text-[13px] font-semibold text-neutral-900">Readiness 80</p>
              <p className="m-0 mt-[3px] text-[12px] leading-tight text-neutral-500">Good sleep, HR at baseline. Green-lit for intervals.</p>
            </div>
          </div>
        </Card>
        <Card>
          <p className="m-0 mb-1.5 text-[11px] uppercase tracking-wide text-neutral-400">Today</p>
          <p className="m-0 text-[15px] font-semibold text-neutral-900">Hyrox — Run + Sled block</p>
          <div className="mt-2 flex gap-1.5">
            {['4× 1km', 'Sled push'].map((t) => (
              <span key={t} className="rounded-[10px] px-[9px] py-[3px] text-[11px]" style={{ background: 'rgba(176,16,32,0.07)', color: RED }}>{t}</span>
            ))}
          </div>
        </Card>
        <Card>
          <div className="flex items-start gap-2.5">
            <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[9px]" style={{ background: RED }}><Flame size={16} color="#fff" /></div>
            <p className="m-0 text-[12px] leading-normal text-neutral-600">&ldquo;You&rsquo;re recovered — let&rsquo;s hit paces today. I&rsquo;ll cue the sled transitions.&rdquo;</p>
          </div>
        </Card>
        <TabBar active="home" />
      </>
    );
  }
  if (screen === 'running') {
    return (
      <>
        <StatusBar />
        <div className="px-[18px] pt-1 pb-[10px]"><p className="m-0 text-[19px] text-neutral-900" style={HEAD}>Running</p></div>
        <Card>
          <div className="py-1.5 text-center">
            <p className="m-0 text-[34px] font-bold tracking-tight text-neutral-900">5.2<span className="text-[16px] text-neutral-400"> km</span></p>
            <p className="m-0 mt-1 text-[12px] text-neutral-500">Easy run · 5:24 /km</p>
          </div>
        </Card>
        <Card>
          <p className="m-0 mb-2 text-[11px] uppercase tracking-wide text-neutral-400">Guided run</p>
          <div className="flex items-center gap-2.5">
            <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full" style={{ background: 'rgba(201,74,63,0.12)' }}><Play size={16} color={SALMON} /></div>
            <div>
              <p className="m-0 text-[13px] font-semibold text-neutral-900">Zone 2 with your AI Coach</p>
              <p className="m-0 mt-0.5 text-[11px] text-neutral-400">28 min · audio coaching</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex justify-between">
            <div><p className="m-0 text-[11px] text-neutral-400">This week</p><p className="m-0 mt-0.5 text-[17px] font-bold text-neutral-900">24 km</p></div>
            <div><p className="m-0 text-[11px] text-neutral-400">Streak</p><p className="m-0 mt-0.5 text-[17px] font-bold" style={{ color: RED }}>6 days</p></div>
          </div>
        </Card>
        <TabBar active="running" />
      </>
    );
  }
  if (screen === 'gym') {
    return (
      <>
        <StatusBar />
        <div className="px-[18px] pt-1 pb-[10px]"><p className="m-0 text-[19px] text-neutral-900" style={HEAD}>Gym</p></div>
        <Card className="!py-3">
          <div className="flex items-center gap-3">
            <HeartPulse size={20} color={RED} />
            <p className="m-0 text-[12px] leading-tight text-neutral-600">Load trimmed 10% — you slept 5h. Same lifts, lighter.</p>
          </div>
        </Card>
        <Card>
          <p className="m-0 mb-2.5 text-[15px] font-semibold text-neutral-900">Push day</p>
          {[['Bench press', '4×8 · 70kg'], ['Incline DB', '3×10 · 26kg'], ['Cable fly', '3×12 · 14kg']].map(([n, v], i, a) => (
            <div key={n} className={`flex justify-between py-[7px] ${i < a.length - 1 ? 'border-b border-neutral-100' : ''}`}>
              <span className="text-[13px] text-neutral-600">{n}</span><span className="text-[13px] font-semibold text-neutral-900">{v}</span>
            </div>
          ))}
        </Card>
        <TabBar active="gym" />
      </>
    );
  }
  if (screen === 'hyrox') {
    const st: [string, React.ComponentType<{ size?: number; color?: string }>][] = [
      ['Run 1km', Footprints], ['Ski erg', Activity], ['Sled push', Zap],
      ['Burpee BJ', Flame], ['Row 1km', Activity], ['Farmer carry', Dumbbell],
    ];
    return (
      <>
        <StatusBar />
        <div className="flex items-center gap-[7px] px-[18px] pt-1 pb-[10px]">
          <p className="m-0 text-[19px] text-neutral-900" style={HEAD}>Hyrox</p>
          <span className="rounded-[9px] px-2 py-0.5 text-[10px] font-semibold text-white" style={{ background: RED }}>PLATINUM</span>
        </div>
        <Card className="!px-4 !py-3">
          <p className="m-0 mb-1 text-[11px] uppercase tracking-wide text-neutral-400">Race simulation</p>
          {st.map(([label, Icon], i) => (
            <div key={label} className={`flex items-center gap-[11px] py-2 ${i < st.length - 1 ? 'border-b border-neutral-100' : ''}`}>
              <div className="flex h-[26px] w-[26px] items-center justify-center rounded-lg" style={{ background: 'rgba(176,16,32,0.08)' }}><Icon size={14} color={RED} /></div>
              <span className="flex-1 text-[13px] text-neutral-700">{label}</span>
              <span className="text-[11px] text-neutral-300">Station {i + 1}</span>
            </div>
          ))}
        </Card>
        <TabBar active="hyrox" />
      </>
    );
  }
  // coach
  return (
    <>
      <StatusBar />
      <div className="flex items-center gap-2 px-[18px] pt-1 pb-[10px]">
        <div className="flex h-7 w-7 items-center justify-center rounded-[9px]" style={{ background: RED }}><Flame size={15} color="#fff" /></div>
        <p className="m-0 text-[19px] text-neutral-900" style={HEAD}>AI Coach</p>
      </div>
      <div className="px-[14px]">
        {['Morning. Your HRV dipped overnight, so I pulled today\u2019s intervals back to Zone 2 and added mobility.',
          'It still moves you toward race day — durability now, speed when you\u2019re fresh. 💪'].map((t, i) => (
          <div key={i} className="mb-[9px] rounded-[14px] rounded-bl-[4px] bg-white p-[11px] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <p className="m-0 text-[12.5px] leading-normal text-neutral-700">{t}</p>
          </div>
        ))}
        <div className="ml-[50px] rounded-[14px] rounded-br-[4px] p-[11px]" style={{ background: RED }}>
          <p className="m-0 text-[12.5px] leading-normal text-white">Got it, feeling good about that.</p>
        </div>
      </div>
      <TabBar active="coach" />
    </>
  );
}

// --- features -----------------------------------------------------------------

const FEATURES: [React.ComponentType<{ size?: number; color?: string }>, string, string][] = [
  [Flame, 'Hyrox training', 'All 8 stations programmed with compromised-run blocks and per-1km pacing.'],
  [Zap, 'HIIT workouts', "Adaptive intervals matched to your level and today's readiness."],
  [Dumbbell, 'Gym tracking', 'Fast set logging with load that flexes to your recovery.'],
  [Moon, 'Sleep & recovery', 'Readiness scoring from sleep and HR that drives your plan.'],
  [Watch, 'Wearable sync', 'Connect your band or watch for live health and performance data.'],
  [Apple, 'Nutrition & macros', 'Personalised targets, meal guidance and supplement support.'],
  [HeartPulse, 'Health tracking', 'Body metrics and wellness in one clean dashboard.'],
  [MessageCircle, 'AI Coach', 'Adapts every session to your recovery and explains why.'],
];

// --- page ---------------------------------------------------------------------

export default function LandingPage() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % SCREENS.length), 3200);
    return () => clearInterval(t);
  }, []);
  const cap = SCREENS[i];

  const navLink = 'text-sm text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer';

  return (
    <main className="min-h-screen bg-white text-neutral-800">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-neutral-200 bg-white/90 px-8 py-4 backdrop-blur">
        <div className="flex items-center gap-2.5">
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[9px]" style={{ background: RED }}><Flame size={17} color="#fff" /></div>
          <span className="text-[19px] text-neutral-900" style={HEAD}>ZenniFitness</span>
        </div>
        <div className="hidden items-center gap-6 md:flex">
          <span className="rounded-md px-3 py-1.5 text-sm font-semibold" style={{ color: RED, background: 'rgba(176,16,32,0.06)' }}>ZenniFit</span>
          <span className={navLink}>Pricing</span>
          <span className={navLink}>About</span>
          <span className={navLink}>FAQ</span>
          <button className="rounded-md px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5" style={{ background: RED }}>Get early access</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-8 py-12 md:grid-cols-[1fr_320px]">
        <div>
          <div className="mb-5 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold" style={{ background: 'rgba(176,16,32,0.06)', color: RED }}>
            <Flame size={14} /> Powered by ZenniFit
          </div>
          <h1 className="m-0 mb-4 text-[40px] leading-[1.15] text-neutral-900" style={HEAD}>One coach for your runs, lifts &amp; Hyrox</h1>
          <p className="m-0 mb-7 max-w-md text-[17px] leading-relaxed text-neutral-600">
            ZenniFit reads your recovery every morning and reshapes today&rsquo;s session — running, strength and Hyrox stations in one adaptive plan. The loop no other app closes.
          </p>
          <div className="mb-7 flex flex-wrap gap-3">
            <button className="rounded-lg px-7 py-3.5 text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5" style={{ background: RED }}>Get early access</button>
            <button className="rounded-lg border-2 px-6 py-3.5 text-[15px] font-semibold transition-colors" style={{ borderColor: RED, color: RED }}>See how it works</button>
          </div>
          <div className="border-l-[3px] pl-3.5" style={{ borderColor: RED }}>
            <p className="m-0 mb-0.5 text-[15px] font-semibold text-neutral-900">{cap.title}</p>
            <p className="m-0 text-sm leading-snug text-neutral-500">{cap.body}</p>
          </div>
        </div>

        {/* iPhone */}
        <div className="flex justify-center">
          <div className="relative h-[570px] w-[280px] rounded-[44px] bg-neutral-900 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
            <div className="absolute left-1/2 top-[26px] z-10 h-[26px] w-[110px] -translate-x-1/2 rounded-[14px] bg-neutral-900" />
            <div className="relative h-full w-full overflow-hidden rounded-[34px]" style={{ background: '#f6f6f4' }}>
              <PhoneScreen screen={cap.key} />
            </div>
          </div>
        </div>
      </section>

      {/* Dots */}
      <div className="flex justify-center gap-2 pb-10">
        {SCREENS.map((s, idx) => (
          <button key={s.key} aria-label={`Show ${s.title}`} onClick={() => setI(idx)}
            className="h-[7px] w-[7px] rounded-full transition-colors" style={{ background: idx === i ? RED : '#dcdcdc' }} />
        ))}
      </div>

      {/* Features */}
      <section className="border-t border-neutral-200 bg-neutral-50 px-8 py-14">
        <h2 className="m-0 mb-2 text-center text-[32px] text-neutral-900" style={HEAD}>Everything you need to perform</h2>
        <p className="mx-auto mb-10 max-w-lg text-center text-base text-neutral-500">Track, adapt and optimise every side of your training — in one app.</p>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(([Icon, title, body]) => (
            <div key={title} className="rounded-xl border border-neutral-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-[color:var(--r)] hover:shadow-lg" style={{ ['--r' as string]: RED }}>
              <div className="mb-3.5 flex h-10 w-10 items-center justify-center rounded-[10px]" style={{ background: 'rgba(176,16,32,0.07)' }}><Icon size={20} color={RED} /></div>
              <p className="m-0 mb-1.5 text-[15px] font-semibold text-neutral-900">{title}</p>
              <p className="m-0 text-[13px] leading-relaxed text-neutral-500">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-950 px-8 py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-[10px]" style={{ background: RED }}><Flame size={20} color="#fff" /></div>
              <span className="text-[20px] italic text-white" style={{ fontWeight: 500, letterSpacing: '-0.5px' }}>ZenniFit</span>
            </div>
            <p className="m-0 max-w-[260px] text-sm leading-relaxed text-neutral-500">Recovery-aware AI coaching — your runs, lifts and Hyrox training in one app.</p>
          </div>
          {[
            ['Product', ['Features', 'Running', 'Gym', 'Hyrox', 'How it works']],
            ['Company', ['About us', 'Pricing', 'FAQ', 'Contact us']],
            ['Legal', ['Terms of use', 'Privacy policy', 'Money-back policy']],
          ].map(([heading, links]) => (
            <div key={heading as string}>
              <p className="m-0 mb-4 text-xs uppercase tracking-[1.5px] text-neutral-500">{heading}</p>
              {(links as string[]).map((l) => (
                <a key={l} href="#" className="mb-3 block text-sm text-neutral-300 no-underline transition-colors hover:text-white">{l}</a>
              ))}
            </div>
          ))}
        </div>
        <div className="mx-auto mt-9 flex max-w-6xl items-center justify-between border-t border-neutral-800 pt-6">
          <span className="text-[13px] text-neutral-500">© 2026 ZenniFitness. All rights reserved.</span>
          <div className="flex gap-4 text-neutral-500">
            <Instagram size={18} /><Twitter size={18} />
          </div>
        </div>
      </footer>
    </main>
  );
}
