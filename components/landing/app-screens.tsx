// Mock app screens shown inside the landing-page phone.
// They copy the premium app's monochrome system (zenni-app-claude-backup/constants/theme.ts):
// black canvas, graphite cards, white Lato type. All data is sample data.

import { Dumbbell, HeartPulse, Home, MessageCircle, Moon, Sparkles, Users, Flame, MapPin, Heart } from "lucide-react"

const card = "rounded-[18px] bg-gradient-to-b from-[#141415] to-[#0f0f10] border border-[#1f1f22]"
const label = "text-[9px] font-bold uppercase tracking-[0.14em] text-[#8e8e93]"

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[11px] font-bold text-white">
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <span className="w-4 h-2.5 rounded-[3px] border border-white/70 relative">
          <span className="absolute inset-[1.5px] right-[4px] bg-white rounded-[1px]" />
        </span>
      </span>
    </div>
  )
}

function Header({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="px-5 pt-5 pb-3">
      <p className={label}>{eyebrow}</p>
      <h3 className="mt-1 text-[24px] leading-none font-black tracking-[-0.03em] text-white">{title}</h3>
    </div>
  )
}

function Ring({ value, size = 112, stroke = 9 }: { value: number; size?: number; stroke?: number }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <defs>
        <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#aeb6c2" />
        </linearGradient>
      </defs>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1f1f22" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="url(#ring-grad)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - value / 100)}
      />
    </svg>
  )
}

function TodayScreen() {
  return (
    <>
      <Header eyebrow="Friday · 6 Nov" title="Good morning" />
      <div className="px-5 flex flex-col gap-2.5">
        <div className={`${card} p-4 flex items-center gap-4`}>
          <div className="relative">
            <Ring value={88} size={92} stroke={8} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[22px] font-black leading-none text-white">88</span>
              <span className="text-[8px] font-bold tracking-[0.12em] text-[#8e8e93] mt-0.5">READY</span>
            </div>
          </div>
          <div className="flex-1">
            <p className={label}>Recovery</p>
            <p className="mt-1 text-[13px] font-bold text-white leading-snug">Primed for a hard session</p>
            <p className="mt-1 text-[10px] text-[#6e6e73]">HRV 82 ms · RHR 48</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { k: "Strain", v: "14.2" },
            { k: "Sleep", v: "7:42" },
            { k: "Steps", v: "6.1k" },
          ].map((t) => (
            <div key={t.k} className={`${card} p-3`}>
              <p className={label}>{t.k}</p>
              <p className="mt-2 text-[17px] font-black text-white">{t.v}</p>
            </div>
          ))}
        </div>
        <div className={`${card} p-4`}>
          <p className={label}>Today&apos;s plan</p>
          <p className="mt-2 text-[14px] font-black text-white">Threshold intervals</p>
          <p className="mt-0.5 text-[10px] text-[#8e8e93]">5 × 1 km @ 4:05/km · 52 min</p>
          <div className="mt-3 h-1.5 rounded-full bg-[#1f1f22] overflow-hidden">
            <div className="h-full w-[35%] rounded-full bg-white" />
          </div>
        </div>
      </div>
    </>
  )
}

function TrainScreen() {
  const rows = [
    { n: "SkiErg", d: "1000 m", done: true },
    { n: "Sled push", d: "4 × 12.5 m", done: true },
    { n: "Burpee broad jumps", d: "80 m", done: false },
    { n: "Row", d: "1000 m", done: false },
    { n: "Wall balls", d: "100 reps", done: false },
  ]
  return (
    <>
      <Header eyebrow="Train · Week 6" title="Race simulation" />
      <div className="px-5 flex flex-col gap-2.5">
        <div className={`${card} p-4 flex items-center justify-between`}>
          <div>
            <p className={label}>Session</p>
            <p className="mt-1.5 text-[15px] font-black text-white">Hyrox half sim</p>
            <p className="mt-0.5 text-[10px] text-[#8e8e93]">4 stations · 1 km runs between</p>
          </div>
          <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center">
            <Dumbbell className="w-5 h-5 text-black" />
          </div>
        </div>
        <div className={`${card} p-1.5`}>
          {rows.map((r, i) => (
            <div key={r.n} className={`flex items-center gap-3 px-3 py-2.5 ${i ? "border-t border-[#1f1f22]" : ""}`}>
              <span
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  r.done ? "bg-white border-white" : "border-[#3a3a3c]"
                }`}
              >
                {r.done && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
              </span>
              <span className={`flex-1 text-[12px] font-bold ${r.done ? "text-[#6e6e73] line-through" : "text-white"}`}>{r.n}</span>
              <span className="text-[10px] text-[#8e8e93]">{r.d}</span>
            </div>
          ))}
        </div>
        <div className="rounded-full bg-white text-black text-[12px] font-black text-center py-3">Start next station</div>
      </div>
    </>
  )
}

function HealthScreen() {
  const hrv = [58, 62, 60, 67, 71, 69, 74, 78, 76, 82]
  const max = 90
  const min = 50
  const pts = hrv.map((v, i) => `${(i / (hrv.length - 1)) * 220},${60 - ((v - min) / (max - min)) * 56}`).join(" ")
  return (
    <>
      <Header eyebrow="Health" title="Trending up" />
      <div className="px-5 flex flex-col gap-2.5">
        <div className={`${card} p-4`}>
          <div className="flex items-end justify-between">
            <div>
              <p className={label}>HRV · 10 days</p>
              <p className="mt-1.5 text-[24px] font-black text-white leading-none">
                82<span className="text-[11px] text-[#6e6e73] ml-1">ms</span>
              </p>
            </div>
            <span className="text-[10px] font-bold text-[#7fd1a0]">+18%</span>
          </div>
          <svg viewBox="0 0 220 64" className="mt-3 w-full h-16">
            <defs>
              <linearGradient id="hrv-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon points={`0,64 ${pts} 220,64`} fill="url(#hrv-fill)" />
            <polyline points={pts} fill="none" stroke="#ffffff" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
        </div>
        <div className={`${card} p-4`}>
          <div className="flex items-center gap-2">
            <Moon className="w-3.5 h-3.5 text-[#8e8e93]" />
            <p className={label}>Sleep stages</p>
          </div>
          <div className="mt-3 flex h-3 rounded-full overflow-hidden gap-[2px]">
            <span className="bg-[#3a3a3c] w-[8%]" />
            <span className="bg-[#8e8e93] w-[46%]" />
            <span className="bg-white w-[24%]" />
            <span className="bg-[#c7c7cc] w-[22%]" />
          </div>
          <div className="mt-2 flex justify-between text-[9px] text-[#6e6e73]">
            <span>Awake</span><span>Light</span><span>Deep</span><span>REM</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className={`${card} p-3`}>
            <p className={label}>Resting HR</p>
            <p className="mt-2 text-[17px] font-black text-white">48<span className="text-[10px] text-[#6e6e73] ml-0.5">bpm</span></p>
          </div>
          <div className={`${card} p-3`}>
            <p className={label}>VO₂ max</p>
            <p className="mt-2 text-[17px] font-black text-white">56.4</p>
          </div>
        </div>
      </div>
    </>
  )
}

function CoachScreen() {
  return (
    <>
      <div className="px-5 pt-5 pb-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-black" />
        </div>
        <div>
          <h3 className="text-[16px] font-black text-white leading-none">AI Coach</h3>
          <p className="mt-1 text-[10px] text-[#7fd1a0]">Reading today&apos;s data</p>
        </div>
      </div>
      <div className="px-4 flex flex-col gap-2.5">
        <div className="self-end max-w-[78%] rounded-[16px] rounded-br-[5px] bg-white text-black text-[11.5px] font-bold px-3.5 py-2.5">
          Legs feel heavy. Should I still do intervals?
        </div>
        <div className="self-start max-w-[86%] rounded-[16px] rounded-bl-[5px] bg-[#141415] border border-[#1f1f22] text-white text-[11.5px] leading-relaxed px-3.5 py-2.5">
          Your recovery is 88% and HRV is up, so your system is ready. The heaviness is likely from Wednesday&apos;s sled work.
        </div>
        <div className="self-start max-w-[86%] rounded-[16px] rounded-bl-[5px] bg-[#141415] border border-[#1f1f22] text-white text-[11.5px] leading-relaxed px-3.5 py-2.5">
          Keep the intervals, but add a 15 min easy warm-up and cap rep 5 at 4:10/km.
        </div>
        <div className="self-start flex gap-1.5 flex-wrap">
          {["Update my plan", "Why?"].map((c) => (
            <span key={c} className="text-[10px] font-bold text-white px-3 py-1.5 rounded-full border border-[#3a3a3c]">{c}</span>
          ))}
        </div>
      </div>
      <div className="absolute left-4 right-4 bottom-[74px] rounded-full bg-[#0f0f10] border border-[#1f1f22] px-4 py-2.5 text-[11px] text-[#6e6e73]">
        Ask your coach…
      </div>
    </>
  )
}

function SocialScreen() {
  return (
    <>
      <Header eyebrow="Social" title="Your crew" />
      <div className="px-5 flex flex-col gap-2.5">
        <div className={`${card} overflow-hidden`}>
          <div className="p-3.5 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c7c7cc] to-[#3a3a3c]" />
            <div className="flex-1">
              <p className="text-[12px] font-black text-white leading-none">Maya R.</p>
              <p className="mt-1 text-[9.5px] text-[#6e6e73]">Morning run · 42 min ago</p>
            </div>
          </div>
          <svg viewBox="0 0 240 90" className="w-full h-[90px] bg-[#0a0a0a]">
            <path d="M0 70 L40 60 L80 66 L120 40 L160 48 L200 22 L240 28" stroke="#26262a" strokeWidth="14" fill="none" />
            <path d="M20 72 C 60 30, 90 85, 130 46 S 190 20, 220 34" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <circle cx="20" cy="72" r="3.5" fill="#ffffff" />
            <circle cx="220" cy="34" r="3.5" fill="#7fd1a0" />
          </svg>
          <div className="grid grid-cols-3 p-3.5 text-center">
            {[
              { k: "Distance", v: "12.4 km" },
              { k: "Pace", v: "4:48" },
              { k: "Strain", v: "15.1" },
            ].map((s) => (
              <div key={s.k}>
                <p className={label}>{s.k}</p>
                <p className="mt-1 text-[13px] font-black text-white">{s.v}</p>
              </div>
            ))}
          </div>
          <div className="px-3.5 pb-3 flex items-center gap-3 text-[10px] text-[#8e8e93]">
            <span className="flex items-center gap-1"><Heart className="w-3 h-3 fill-white text-white" /> 24</span>
            <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" /> 6</span>
            <span className="flex items-center gap-1 ml-auto"><MapPin className="w-3 h-3" /> Richmond Park</span>
          </div>
        </div>
        <div className={`${card} p-3.5 flex items-center gap-3`}>
          <Flame className="w-5 h-5 text-[#e6c87a]" />
          <div className="flex-1">
            <p className="text-[12px] font-black text-white leading-none">November strain challenge</p>
            <p className="mt-1 text-[9.5px] text-[#6e6e73]">You&apos;re 3rd of 18</p>
          </div>
        </div>
      </div>
    </>
  )
}

export const SCREENS = [TodayScreen, TrainScreen, HealthScreen, CoachScreen, SocialScreen]

const TABS = [
  { icon: Home, label: "Today" },
  { icon: Dumbbell, label: "Train" },
  { icon: HeartPulse, label: "Health" },
  { icon: Sparkles, label: "AI Coach" },
  { icon: Users, label: "Social" },
]

export function AppScreen({ index }: { index: number }) {
  const Screen = SCREENS[index]
  return (
    <div className="absolute inset-0 bg-black flex flex-col">
      <div className="absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-[#1c1c1e] to-black pointer-events-none" />
      <div className="relative flex-1 flex flex-col">
        <StatusBar />
        <Screen />
      </div>
      <TabBar active={index} />
    </div>
  )
}

function TabBar({ active }: { active: number }) {
  return (
    <div className="absolute inset-x-0 bottom-0 h-[64px] pb-3 bg-black/90 border-t border-[#1f1f22] flex items-center justify-around px-2">
      {TABS.map(({ icon: Icon, label: l }, i) => (
        <div key={l} className={`flex flex-col items-center gap-1 ${i === active ? "text-white" : "text-[#6e6e73]"}`}>
          <Icon className="w-[17px] h-[17px]" />
          <span className="text-[8.5px] font-bold">{l}</span>
        </div>
      ))}
    </div>
  )
}
