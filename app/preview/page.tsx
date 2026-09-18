"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Sparkles,
  Heart,
  Activity,
  Dumbbell,
  Flame,
  BatteryCharging,
  Moon,
  Footprints,
  Play,
  Award,
  TrendingUp,
  Zap,
  ChevronRight,
  Bot,
  X,
  Signal,
  Wifi,
  Battery,
  ArrowLeft,
} from "lucide-react"

type TabType = "health" | "running" | "fitness" | "hyrox"

interface CoachData {
  title: string
  subtitle: string
  tag: string
  metric: string
  insight: string
  dossier: string
}

const COACH_DATA: Record<TabType, CoachData> = {
  health: {
    title: "Autonomic Readiness",
    subtitle: "v4.2 Neural Core • Telemetry Live",
    tag: "Readiness 88 • Optimal",
    metric: "HRV 82ms • +14%",
    insight: "HRV is elevated +14% (82ms) and sleep debt is fully cleared. Autonomic nervous system is primed for high-threshold output today.",
    dossier: "Prioritize heavy multi-joint loading followed by Zone 2 aerobic maintenance. Parasympathetic tone indicates rapid inter-set recovery."
  },
  running: {
    title: "Aerobic Threshold Engine",
    subtitle: "Zone 2 & VO2 Max Splits",
    tag: "Target 5:25 /km • Zone 2",
    metric: "Cadence > 176 SPM",
    insight: "Today's run prescription: 8.0 km Steady Zone 2 (135–148 BPM). Hold cadence strictly above 176 SPM to optimize elastic recoil.",
    dossier: "Elastic tendon recoil efficiency is maximized at 176-180 SPM, significantly reducing tibial bone shear and lactate accumulation."
  },
  fitness: {
    title: "Hypertrophy & VBT",
    subtitle: "1RM Velocity Modulation",
    tag: "0.65 m/s VBT Threshold",
    metric: "VBT > 0.65 m/s",
    insight: "Upper body power day. Target barbell bar velocity > 0.65 m/s on initial sets. Automatically drop 5% load if concentric velocity falls below 0.48 m/s.",
    dossier: "Velocity-based auto-regulation ensures hypertrophy without triggering neuromuscular overtraining or interfering with tomorrow's compromised run."
  },
  hyrox: {
    title: "Compromised Race Pacing",
    subtitle: "8-Station Lactate Clearance",
    tag: "Sub-64m Pace Target",
    metric: "8-Station Split Lock",
    insight: "Sled Push & Burpee Broad Jumps show highest cardiovascular decay (+22s split variance). Pace Station 1–4 conservatively at 82% HRmax.",
    dossier: "Protect running splits 5–8 by capping Roxzone transitions under 40 seconds and buffering lactate via controlled nasal breathing during sled transitions."
  }
}

export default function AppPreviewPage() {
  const [activeTab, setActiveTab] = useState<TabType>("health")
  const [modalOpen, setModalOpen] = useState(false)
  const [fatigueRating, setFatigueRating] = useState(3)

  const currentCoach = COACH_DATA[activeTab]

  return (
    <div className="min-h-screen bg-[#030407] text-white flex flex-col items-center justify-center p-4 lg:p-8 relative selection:bg-[#B01020] selection:text-white font-sans">
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-[#B01020]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-[#E8605A]/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Top Bar Header */}
      <div className="max-w-4xl w-full mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 z-10">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h1 className="text-lg font-black italic tracking-tight text-white">
                ZENNIFIT MOBILE OS <span className="text-[#B01020]">LIVE SIMULATOR</span>
              </h1>
              <span className="text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-[#B01020]/20 text-[#E8605A] border border-[#B01020]/30">
                AI 4.2
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Interactive preview of all 4 tabs with Top-Left Zenni AI Coach.
            </p>
          </div>
        </div>

        {/* Desktop Quick Tab Switcher */}
        <div className="flex items-center gap-1.5 bg-[#0D0E15] p-1.5 rounded-xl border border-white/10">
          <button
            onClick={() => setActiveTab("health")}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === "health" ? "bg-[#B01020] text-white shadow-lg shadow-[#B01020]/30" : "text-zinc-400 hover:text-white"
            }`}
          >
            Health
          </button>
          <button
            onClick={() => setActiveTab("running")}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === "running" ? "bg-[#B01020] text-white shadow-lg shadow-[#B01020]/30" : "text-zinc-400 hover:text-white"
            }`}
          >
            Running
          </button>
          <button
            onClick={() => setActiveTab("fitness")}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === "fitness" ? "bg-[#B01020] text-white shadow-lg shadow-[#B01020]/30" : "text-zinc-400 hover:text-white"
            }`}
          >
            Fitness
          </button>
          <button
            onClick={() => setActiveTab("hyrox")}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === "hyrox" ? "bg-[#B01020] text-white shadow-lg shadow-[#B01020]/30" : "text-zinc-400 hover:text-white"
            }`}
          >
            Hyrox
          </button>
        </div>
      </div>

      {/* ── IPHONE 16 PRO FRAME ────────────────────────────────────────── */}
      <div className="relative w-[390px] h-[844px] bg-[#06070B] rounded-[52px] p-3 shadow-2xl border-[4px] border-[#22242D] shadow-[#B01020]/20 select-none overflow-hidden z-10">
        
        {/* Dynamic Island */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[120px] h-[32px] bg-black rounded-full z-50 flex items-center justify-between px-3 border border-white/5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#121212]" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        {/* Phone Inner Viewport */}
        <div className="w-full h-full bg-[#06070B] rounded-[44px] overflow-hidden flex flex-col relative">

          {/* Status Bar */}
          <div className="pt-3 px-7 flex justify-between items-center text-[12px] font-bold text-zinc-400 z-40">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Scrollable Screen Content */}
          <div className="flex-1 overflow-y-auto px-5 pt-3 pb-24 space-y-4">

            {/* ── TOP-LEFT ZENNI AI COACH SECTION (Every Screen) ──────────────── */}
            <div className="pt-1">
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 rounded-full py-1.5 px-3 transition-all cursor-pointer"
              >
                <div className="relative">
                  <div className="w-6 h-6 rounded-full bg-[#B01020] flex items-center justify-center text-white">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-black animate-ping" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[12px] font-extrabold italic text-white leading-none">
                      Zenni AI
                    </span>
                    <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-1 py-0.2 rounded border border-emerald-500/20">
                      LIVE
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-medium">
                    {currentCoach.tag}
                  </span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-400 ml-1" />
              </button>
            </div>

            {/* Coach Guidance Callout Card */}
            <div className="bg-[#0D0E16] border border-white/10 rounded-2xl p-3.5 space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-extrabold tracking-wider text-[#E8605A]">
                <div className="flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5" />
                  <span>ZENNI COACH &bull; {currentCoach.title.toUpperCase()}</span>
                </div>
                <span className="text-emerald-400 font-mono">{currentCoach.metric}</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {currentCoach.insight}
              </p>
            </div>

            {/* ── SCREEN SPECIFIC BODY CONTENT ───────────────────────────── */}
            {activeTab === "health" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <h2 className="text-2xl font-black italic tracking-tight text-white">
                    Health &amp; Readiness
                  </h2>
                  <p className="text-xs text-zinc-400">
                    Biometric intelligence &amp; closed-loop recovery
                  </p>
                </div>

                {/* Readiness Dial Card */}
                <div className="bg-[#12141F] border border-white/10 rounded-2xl p-4 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <BatteryCharging className="w-4 h-4 text-[#E8605A]" />
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        Today&apos;s Readiness
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      OPTIMAL
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 flex items-center justify-center">
                      <svg className="w-20 h-20 -rotate-90">
                        <circle cx="40" cy="40" r="32" stroke="rgba(255,255,255,0.08)" strokeWidth="6" fill="transparent" />
                        <circle cx="40" cy="40" r="32" stroke="#22C55E" strokeWidth="6" strokeDasharray="200" strokeDashoffset="24" strokeLinecap="round" fill="transparent" />
                      </svg>
                      <div className="absolute text-center">
                        <span className="text-xl font-black text-white leading-none">88</span>
                        <span className="block text-[8px] text-zinc-400 uppercase font-bold">/100</span>
                      </div>
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="text-sm font-bold text-white">Full Capacity</div>
                      <div className="text-[11px] text-zinc-400 leading-tight">
                        CNS recovered. Recommended: Heavy lower volume + high velocity runs.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Biometrics Grid */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-[#12141F] border border-white/10 rounded-xl p-3">
                    <div className="flex items-center justify-between text-zinc-400 text-[10px] font-bold uppercase mb-1">
                      <span>HRV (RMSSD)</span>
                      <Heart className="w-3.5 h-3.5 text-[#E8605A]" />
                    </div>
                    <div className="text-lg font-bold text-white font-mono">82 ms</div>
                    <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">+14% vs 7d avg</div>
                  </div>
                  <div className="bg-[#12141F] border border-white/10 rounded-xl p-3">
                    <div className="flex items-center justify-between text-zinc-400 text-[10px] font-bold uppercase mb-1">
                      <span>Sleep Debt</span>
                      <Moon className="w-3.5 h-3.5 text-indigo-400" />
                    </div>
                    <div className="text-lg font-bold text-white font-mono">0.2 hrs</div>
                    <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">8h 12m Last Night</div>
                  </div>
                </div>

                {/* Subjective Fatigue Slider */}
                <div className="bg-[#12141F] border border-white/10 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Morning Perceived Fatigue
                    </span>
                    <span className="text-[10px] text-zinc-400">Closed Loop</span>
                  </div>
                  <div className="flex items-center justify-between gap-1">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        onClick={() => setFatigueRating(val)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          fatigueRating === val
                            ? "bg-[#B01020] text-white shadow-md shadow-[#B01020]/40"
                            : "bg-white/5 hover:bg-white/10 text-zinc-400"
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "running" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <h2 className="text-2xl font-black italic tracking-tight text-white">
                    Running &amp; Trails
                  </h2>
                  <p className="text-xs text-zinc-400">
                    Pacing, ACWR &amp; trail routes
                  </p>
                </div>

                {/* Hero Run Card */}
                <div className="bg-[#12141F] border border-white/10 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Footprints className="w-4 h-4 text-[#E8605A]" />
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        Today&apos;s Prescription
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      ZONE 2
                    </span>
                  </div>
                  <div>
                    <div className="text-lg font-black text-white">Aerobic Base 8.0 km Steady</div>
                    <div className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                      Pace: 5:20–5:35 /km &middot; HR: 135–148 bpm. Expands mitochondrial density without systemic fatigue.
                    </div>
                  </div>
                  <div className="pt-2 border-t border-white/10">
                    <button className="w-full py-2.5 bg-[#B01020] hover:bg-[#C41224] rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#B01020]/25">
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Start Run GPS</span>
                    </button>
                  </div>
                </div>

                {/* Load Metrics */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-[#12141F] border border-white/10 rounded-xl p-3">
                    <div className="flex items-center justify-between text-zinc-400 text-[10px] font-bold uppercase mb-1">
                      <span>Running ACWR</span>
                      <Activity className="w-3.5 h-3.5 text-[#E8605A]" />
                    </div>
                    <div className="text-lg font-bold text-white font-mono">1.12</div>
                    <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">Optimal Zone</div>
                  </div>
                  <div className="bg-[#12141F] border border-white/10 rounded-xl p-3">
                    <div className="flex items-center justify-between text-zinc-400 text-[10px] font-bold uppercase mb-1">
                      <span>Weekly Volume</span>
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div className="text-lg font-bold text-white font-mono">42.5 km</div>
                    <div className="text-[10px] text-zinc-400 mt-0.5">Target: 48 km</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "fitness" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <h2 className="text-2xl font-black italic tracking-tight text-white">
                    Fitness &amp; Strength
                  </h2>
                  <p className="text-xs text-zinc-400">
                    Progressive overload &amp; hypertrophy
                  </p>
                </div>

                {/* Workout Card */}
                <div className="bg-[#12141F] border border-white/10 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Dumbbell className="w-4 h-4 text-[#E8605A]" />
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        Today&apos;s Workout
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-[#E8605A] bg-[#E8605A]/10 px-2 py-0.5 rounded-full border border-[#E8605A]/20">
                      DAY 1
                    </span>
                  </div>
                  <div>
                    <div className="text-lg font-black text-white">Hybrid Upper Body Power &amp; Chest</div>
                    <div className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                      Focus: Barbell Bench Press, Incline DB, Weighted Dips &middot; 55 mins &middot; 6 Exercises
                    </div>
                  </div>
                  <div className="pt-2 border-t border-white/10">
                    <button className="w-full py-2.5 bg-[#B01020] hover:bg-[#C41224] rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#B01020]/25">
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Start Workout</span>
                    </button>
                  </div>
                </div>

                {/* Strength Benchmarks */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-[#12141F] border border-white/10 rounded-xl p-3">
                    <div className="flex items-center justify-between text-zinc-400 text-[10px] font-bold uppercase mb-1">
                      <span>Estimated 1RM</span>
                      <Award className="w-3.5 h-3.5 text-[#E8605A]" />
                    </div>
                    <div className="text-lg font-bold text-white font-mono">142.5 kg</div>
                    <div className="text-[10px] text-zinc-400 mt-0.5">Bench: 120kg x 6 reps</div>
                  </div>
                  <div className="bg-[#12141F] border border-white/10 rounded-xl p-3">
                    <div className="flex items-center justify-between text-zinc-400 text-[10px] font-bold uppercase mb-1">
                      <span>Weekly Volume</span>
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div className="text-lg font-bold text-white font-mono">14,280 kg</div>
                    <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">+8% vs last week</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "hyrox" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <h2 className="text-2xl font-black italic tracking-tight text-white">
                    Hyrox &amp; Functional
                  </h2>
                  <p className="text-xs text-zinc-400">
                    8-station splits, WODs &amp; simulations
                  </p>
                </div>

                {/* Hyrox Simulation Hero */}
                <div className="bg-[#12141F] border border-white/10 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-[#E8605A]" />
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        Full Hyrox Simulation
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-[#E8605A] bg-[#E8605A]/10 px-2 py-0.5 rounded-full border border-[#E8605A]/20">
                      OFFICIAL SPLIT
                    </span>
                  </div>
                  <div>
                    <div className="text-lg font-black text-white">8 × 1km Run + 8 Stations</div>
                    <div className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                      Target Time: 1h 04m &middot; Pacing: 4:45/km compromised run &middot; Open standards.
                    </div>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex items-center gap-2">
                    <button className="flex-1 py-2.5 bg-[#B01020] hover:bg-[#C41224] rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#B01020]/25">
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Start Simulation</span>
                    </button>
                    <button className="px-3 py-2.5 bg-white/10 hover:bg-white/15 rounded-xl font-bold text-xs text-white">
                      Log WOD
                    </button>
                  </div>
                </div>

                {/* Stations Preview */}
                <div className="bg-[#12141F] border border-white/10 rounded-xl p-3 divide-y divide-white/5 space-y-2">
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-zinc-300">1. SkiErg (1,000m)</span>
                    <span className="text-xs font-mono font-bold text-[#E8605A]">3:42</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-zinc-300">2. Sled Push (50m)</span>
                    <span className="text-xs font-mono font-bold text-[#E8605A]">2:18</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-zinc-300">3. Sled Pull (50m)</span>
                    <span className="text-xs font-mono font-bold text-[#E8605A]">3:25</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-zinc-300">4. Burpee Broad Jumps (80m)</span>
                    <span className="text-xs font-mono font-bold text-[#E8605A]">4:10</span>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* ── BOTTOM TAB NAVIGATION BAR ───────────────────────────────── */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-[#0A0B10]/90 backdrop-blur-xl border-t border-white/10 flex items-center justify-around px-2 z-40 pb-2">
            
            <button
              onClick={() => setActiveTab("health")}
              className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-all ${
                activeTab === "health" ? "text-[#E8605A]" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Heart className="w-5 h-5" />
              <span className="text-[10px] font-extrabold tracking-tight">Health</span>
            </button>

            <button
              onClick={() => setActiveTab("running")}
              className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-all ${
                activeTab === "running" ? "text-[#E8605A]" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Activity className="w-5 h-5" />
              <span className="text-[10px] font-extrabold tracking-tight">Running</span>
            </button>

            <button
              onClick={() => setActiveTab("fitness")}
              className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-all ${
                activeTab === "fitness" ? "text-[#E8605A]" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Dumbbell className="w-5 h-5" />
              <span className="text-[10px] font-extrabold tracking-tight">Fitness</span>
            </button>

            <button
              onClick={() => setActiveTab("hyrox")}
              className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-all ${
                activeTab === "hyrox" ? "text-[#E8605A]" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Flame className="w-5 h-5" />
              <span className="text-[10px] font-extrabold tracking-tight">Hyrox</span>
            </button>
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full z-50 pointer-events-none" />

          {/* ── MODAL: ZENNI AI CONSULTATION DRAWER ──────────────────────── */}
          {modalOpen && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col justify-end p-3 animate-in fade-in duration-200">
              <div className="bg-[#12131C] border border-white/10 rounded-[32px] p-5 space-y-4 shadow-2xl animate-in slide-in-from-bottom duration-300">
                
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#B01020] flex items-center justify-center text-white">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-black italic text-white">Zenni AI Coach</div>
                      <div className="text-[10px] text-zinc-400">{currentCoach.subtitle}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Strategy Box */}
                <div className="bg-white/5 border border-white/5 rounded-2xl p-3.5 space-y-2">
                  <div className="text-xs font-bold text-white">{currentCoach.title} Strategy</div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {currentCoach.dossier}
                  </p>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => setModalOpen(false)}
                  className="w-full py-3 bg-[#B01020] hover:bg-[#C41224] text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#B01020]/30"
                >
                  <Zap className="w-4 h-4" />
                  <span>Apply Zenni&apos;s Prescription</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Bottom CTA to join shortlist */}
      <div className="mt-8 text-center z-10">
        <Link
          href="/early-access"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#B01020] to-[#E8605A] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#B01020]/30 hover:opacity-90 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Claim Priority Shortlist Spot for App Launch</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  )
}
