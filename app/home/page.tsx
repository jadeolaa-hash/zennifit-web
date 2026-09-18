"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Zap,
  Activity,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Eye,
  Layers,
  ArrowRight,
  Check,
  ChevronDown,
  Dumbbell,
  Timer,
  Smartphone,
  Cpu,
  Flame,
  Award,
  BarChart3,
  TrendingUp,
  Heart,
  Moon,
  Clock
} from "lucide-react"

const faqs = [
  {
    q: "When does the ZenniFit mobile app launch?",
    a: "The standalone iOS and Android mobile app will roll out in Q4 2026. Athletes on the priority shortlist receive exclusive first-wave TestFlight / Google Play beta invites."
  },
  {
    q: "What makes the hybrid engine different?",
    a: "Unlike generic workout trackers, ZenniFit models the interference effect between heavy strength training and endurance, and calculates real-time split degradation during compromised running."
  },
  {
    q: "Do I need dedicated wearables?",
    a: "No. ZenniFit features VisionForm™ on-device computer vision for velocity tracking using just your phone camera, and seamlessly syncs with Apple Health, Health Connect, Whoop, Garmin, and Oura."
  },
  {
    q: "What is included in the Hyrox Pro tier?",
    a: "Hyrox Pro includes full 8-station official race simulation programming, Compromised Running Index (CRI) tracking, Roxzone transition optimization, and real-time lactate clearance pace guidance."
  },
  {
    q: "Is there a free tier?",
    a: "Yes. Tier 0 (Health) is 100% free forever and provides continuous autonomic recovery, HRV RMSSD baselines, circadian sleep stage tracking, and daily readiness scoring."
  }
]

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0)
  const [activeProtocolTab, setActiveProtocolTab] = useState<"health" | "running" | "fitness" | "hyrox">("hyrox")
  const [phoneTab, setPhoneTab] = useState<"health" | "running" | "fitness" | "hyrox">("health")

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  return (
    <main className="min-h-screen bg-[#06070B] text-zinc-100 selection:bg-[#B01020] selection:text-white relative overflow-hidden font-sans">
      
      {/* Background Ambient Radial Glows */}
      <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-[#B01020]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-[#E8605A]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[600px] h-[600px] bg-[#B01020]/10 rounded-full blur-[160px] pointer-events-none" />

      {/* ── Top Navigation Bar ────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#06070B]/85 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 md:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Brand Mark */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#B01020] via-[#D1182B] to-[#E8605A] p-[1px] shadow-[0_0_25px_rgba(176,16,32,0.45)] group-hover:shadow-[0_0_35px_rgba(176,16,32,0.7)] transition-all duration-300">
              <div className="w-full h-full bg-[#090A10] rounded-[11px] flex items-center justify-center">
                {/* Precision Diamond SVG */}
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#E8605A] fill-current group-hover:scale-110 transition-transform">
                  <path d="M12 2L2 12l10 10 10-10L12 2zm0 3.8L18.2 12 12 18.2 5.8 12 12 5.8z" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl italic tracking-tight text-white">
                  ZENNI<span className="text-[#B01020]">FIT</span>
                </span>
                <span className="text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded-full bg-[#B01020]/20 text-[#E8605A] border border-[#B01020]/30">
                  AI 4.2
                </span>
              </div>
              <span className="text-[10px] text-zinc-400 font-medium tracking-wide">
                Hybrid Performance System
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <Link href="/preview" className="text-white flex items-center gap-1.5 hover:text-[#E8605A] transition-colors">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Live App</span>
            </Link>
            <a href="#protocols" className="hover:text-white transition-colors">Protocols</a>
            <a href="#telemetry" className="hover:text-white transition-colors">VisionForm™</a>
            <a href="#tiers" className="hover:text-white transition-colors">Performance Tiers</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <Link
              href="/early-access"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#B01020] to-[#E8605A] hover:from-[#C41224] hover:to-[#FF6B60] text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_25px_rgba(176,16,32,0.4)] transition-all active:scale-95 flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Join Shortlist</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero Section ──────────────────────────────────────────────────────── */}
      <section className="relative pt-16 md:pt-24 pb-20 md:pb-32 px-6 max-w-7xl mx-auto text-center">
        
        {/* System Pill Tag */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-8 backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-700">
          <span className="w-2 h-2 rounded-full bg-[#E8605A] animate-ping" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E8605A]">
            ZENNIFIT MOBILE APP &bull; FOUNDING COHORT SHORTLIST OPEN
          </span>
        </div>

        {/* Editorial Serif Headline */}
        <h1 className="font-serif italic font-normal text-white text-5xl sm:text-6xl md:text-8xl max-w-5xl mx-auto leading-[1.05] tracking-tight mb-8">
          Precision in every motion.
        </h1>

        <p className="text-zinc-400 text-base md:text-xl max-w-2xl mx-auto font-normal leading-relaxed mb-12">
          On-device computer vision biomechanics, autonomic recovery adaptation, and compromised running intelligence. One unified mobile operating system for the hybrid athlete.
        </p>

        {/* Hero CTA & Insight Trigger */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16">
          <Link
            href="/early-access"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#B01020] via-[#D1182B] to-[#E8605A] hover:opacity-95 text-white font-bold text-sm uppercase tracking-wider shadow-[0_0_35px_rgba(176,16,32,0.5)] transition-all active:scale-[0.98] flex items-center justify-center gap-2.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Claim Priority Shortlist Spot</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#tiers"
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-zinc-300 font-semibold text-sm transition-all flex items-center justify-center gap-2"
          >
            <span>Explore Tiers</span>
            <ChevronDown className="w-4 h-4" />
          </a>
        </div>

        {/* 3 Metric Precision Split */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-20 text-left">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-1">
              Movement Fidelity
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl font-black italic text-white tracking-tight">98.4%</span>
              <span className="text-xs font-bold text-emerald-400">+4.1% vs Vicon 3D</span>
            </div>
            <p className="text-xs text-zinc-400 mt-2">
              33-point skeletal pose estimation running 60fps on neural engine hardware.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-1">
              Edge Latency
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl font-black italic text-[#E8605A] tracking-tight">1.2ms</span>
              <span className="text-xs font-bold text-emerald-400">Zero Cloud Lag</span>
            </div>
            <p className="text-xs text-zinc-400 mt-2">
              Instant eccentric velocity &amp; barbell displacement tracking without server round-trips.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-1">
              Periodization Core
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl font-black italic text-white tracking-tight">AI 4.2</span>
              <span className="text-xs font-bold text-zinc-400">Adaptive Loop</span>
            </div>
            <p className="text-xs text-zinc-400 mt-2">
              Dual-progression scheduling that balances heavy posterior lifting with aerobic volume.
            </p>
          </div>
        </div>

        {/* ── 3D Floating Mobile Showcase ─────────────────────────────────────── */}
        <div className="relative max-w-5xl mx-auto">
          {/* Ambient Device Flare */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#B01020]/25 to-[#E8605A]/15 blur-3xl rounded-3xl -z-10" />

          <div className="rounded-3xl bg-gradient-to-b from-[#151622] to-[#0A0B10] border border-white/10 p-6 md:p-10 shadow-[0_20px_80px_rgba(0,0,0,0.8)] text-left relative overflow-hidden">
            
            {/* Top Device Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-300">
                  ZenniFit Native Mobile Telemetry &bull; Live Preview
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
                <Smartphone className="w-4 h-4 text-[#E8605A]" />
                <span>iOS &amp; Android Standalone App</span>
              </div>
            </div>

            {/* Mobile App Grid Inside Frame */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Telemetry Panel */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#B01020]/20 text-[#E8605A] border border-[#B01020]/30">
                    KINETIC READINESS ENGINE
                  </span>
                  <h3 className="text-3xl md:text-4xl font-black italic text-white tracking-tight mt-3">
                    Optimal Readiness &bull; 88/100
                  </h3>
                  <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                    HRV elevated +14% vs baseline (82ms). Nervous system fully primed for threshold compromised running and heavy sled pushes.
                  </p>
                </div>

                {/* Micro Stat Cards */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase">Heart Rate</p>
                    <p className="text-lg font-black text-white mt-1">148 BPM</p>
                    <p className="text-[10px] text-emerald-400">Zone 3 Tempo</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase">CNS Recovery</p>
                    <p className="text-lg font-black text-emerald-400 mt-1">92%</p>
                    <p className="text-[10px] text-zinc-400">Prime Output</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase">VO2 Max</p>
                    <p className="text-lg font-black text-[#E8605A] mt-1">56.4</p>
                    <p className="text-[10px] text-emerald-400">Top 2% Elite</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-white">Active Session: Hyrox Compromised Block</span>
                    <span className="text-[#E8605A] font-mono font-bold">Split 3 of 8 &bull; 3:55 /km</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-2">
                    <div className="bg-gradient-to-r from-[#B01020] to-[#E8605A] h-full rounded-full w-[45%]" />
                  </div>
                </div>
              </div>

              {/* Visual Simulated Phone Screen */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-[300px] rounded-[40px] bg-[#090A10] border-4 border-white/10 p-4 shadow-2xl relative flex flex-col justify-between">
                  {/* Speaker notch */}
                  <div className="w-20 h-3 bg-white/10 rounded-full mx-auto mb-3" />

                  {/* TOP-LEFT ZENNI AI COACH HEADER */}
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/5">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                      <div className="relative">
                        <div className="w-4 h-4 rounded-full bg-[#B01020] flex items-center justify-center text-white">
                          <Sparkles className="w-2.5 h-2.5" />
                        </div>
                        <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      </div>
                      <span className="text-[10px] font-extrabold italic text-white leading-none">
                        Zenni AI
                      </span>
                      <span className="text-[8px] font-bold text-emerald-400 bg-emerald-500/10 px-1 py-0.2 rounded">
                        LIVE
                      </span>
                    </div>
                    <span className="text-[9px] text-zinc-400 font-mono uppercase">
                      {phoneTab}
                    </span>
                  </div>

                  {/* Coach Telemetry Callout Pill */}
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 mb-3 text-left">
                    <div className="flex items-center justify-between text-[9px] font-bold text-[#E8605A] uppercase mb-0.5">
                      <span>Zenni Prescribed Focus</span>
                      <span className="text-emerald-400 font-mono">Auto-Sync</span>
                    </div>
                    <p className="text-[10px] text-zinc-300 leading-tight">
                      {phoneTab === "health" && "HRV is elevated +14% (82ms). Autonomic system is primed for high-threshold output."}
                      {phoneTab === "running" && "8.0km Zone 2 prescribed. Lock cadence above 176 SPM to minimize tibial impact."}
                      {phoneTab === "fitness" && "Upper body power day. Target bar velocity > 0.65 m/s on working sets."}
                      {phoneTab === "hyrox" && "8-Station race simulation. Pace stations 1–4 at 82% HRmax to protect running splits."}
                    </p>
                  </div>

                  {/* Tab-Specific Dynamic Card */}
                  {phoneTab === "health" && (
                    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#181926] to-[#0E0F16] border border-white/5 text-center mb-3 animate-in fade-in duration-200">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">Autonomic Readiness</span>
                      <p className="text-3xl font-black italic text-white my-0.5">88<span className="text-xs font-normal text-zinc-400">/100</span></p>
                      <div className="flex items-center justify-center gap-3 text-[10px] mt-1 text-zinc-300">
                        <span>HRV: <b className="text-white font-mono">82ms</b></span>
                        <span>Sleep: <b className="text-emerald-400 font-mono">8h 12m</b></span>
                      </div>
                    </div>
                  )}

                  {phoneTab === "running" && (
                    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#181926] to-[#0E0F16] border border-white/5 text-left mb-3 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between text-[9px] font-bold text-zinc-400 uppercase">
                        <span>Today&apos;s Run</span>
                        <span className="text-emerald-400">ZONE 2</span>
                      </div>
                      <p className="text-sm font-black text-white mt-1">8.0 km Steady</p>
                      <div className="flex items-center justify-between text-[10px] mt-1 text-zinc-300">
                        <span>Target: <b className="text-white font-mono">5:25 /km</b></span>
                        <span>Cadence: <b className="text-salmon font-mono">&gt;176 SPM</b></span>
                      </div>
                    </div>
                  )}

                  {phoneTab === "fitness" && (
                    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#181926] to-[#0E0F16] border border-white/5 text-left mb-3 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between text-[9px] font-bold text-zinc-400 uppercase">
                        <span>Day 1 Lift</span>
                        <span className="text-salmon">DAY 1</span>
                      </div>
                      <p className="text-sm font-black text-white mt-1">Hybrid Upper Power</p>
                      <div className="flex items-center justify-between text-[10px] mt-1 text-zinc-300">
                        <span>1RM: <b className="text-white font-mono">142.5 kg</b></span>
                        <span>VBT: <b className="text-emerald-400 font-mono">&gt;0.65 m/s</b></span>
                      </div>
                    </div>
                  )}

                  {phoneTab === "hyrox" && (
                    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#181926] to-[#0E0F16] border border-white/5 text-left mb-3 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between text-[9px] font-bold text-zinc-400 uppercase">
                        <span>Hyrox Simulation</span>
                        <span className="text-[#E8605A]">PRO</span>
                      </div>
                      <p className="text-sm font-black text-white mt-1">8 × 1km + 8 Stations</p>
                      <div className="flex items-center justify-between text-[10px] mt-1 text-zinc-300">
                        <span>Target: <b className="text-white font-mono">1h 04m</b></span>
                        <span>PB: <b className="text-amber-400 font-mono">1h 02m</b></span>
                      </div>
                    </div>
                  )}

                  {/* 4 BOTTOM TABS IN PHONE FRAME */}
                  <div className="bg-black/50 border border-white/10 rounded-xl p-1 flex items-center justify-around mb-3">
                    <button
                      onClick={() => setPhoneTab("health")}
                      className={`flex flex-col items-center py-1 px-2 rounded-lg transition-all ${
                        phoneTab === "health" ? "text-[#E8605A] bg-white/10" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <Heart className="w-3.5 h-3.5" />
                      <span className="text-[8px] font-bold mt-0.5">Health</span>
                    </button>
                    <button
                      onClick={() => setPhoneTab("running")}
                      className={`flex flex-col items-center py-1 px-2 rounded-lg transition-all ${
                        phoneTab === "running" ? "text-[#E8605A] bg-white/10" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <Activity className="w-3.5 h-3.5" />
                      <span className="text-[8px] font-bold mt-0.5">Running</span>
                    </button>
                    <button
                      onClick={() => setPhoneTab("fitness")}
                      className={`flex flex-col items-center py-1 px-2 rounded-lg transition-all ${
                        phoneTab === "fitness" ? "text-[#E8605A] bg-white/10" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <Dumbbell className="w-3.5 h-3.5" />
                      <span className="text-[8px] font-bold mt-0.5">Fitness</span>
                    </button>
                    <button
                      onClick={() => setPhoneTab("hyrox")}
                      className={`flex flex-col items-center py-1 px-2 rounded-lg transition-all ${
                        phoneTab === "hyrox" ? "text-[#E8605A] bg-white/10" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <Flame className="w-3.5 h-3.5" />
                      <span className="text-[8px] font-bold mt-0.5">Hyrox</span>
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="space-y-1.5">
                    <Link
                      href="/preview"
                      className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all"
                    >
                      <span>Open Full App Simulator</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                    <Link
                      href="/early-access"
                      className="w-full py-2 rounded-xl bg-[#B01020] hover:bg-[#C41224] text-white text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all"
                    >
                      <span>Join Priority Shortlist</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4 Core Performance Tiers ─────────────────────────────────────────── */}
      <section id="tiers" className="py-20 md:py-32 px-6 max-w-7xl mx-auto border-t border-white/5 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E8605A] block mb-3">
            PERFORMANCE TIERS &bull; MOBILE SUBSCRIPTION TIERS
          </span>
          <h2 className="font-serif italic font-normal text-white text-4xl sm:text-5xl md:text-6xl tracking-tight mb-4">
            Four tiers. One adaptive engine.
          </h2>
          <p className="text-zinc-400 text-sm md:text-base">
            Start with foundational autonomic health or unlock race-specific Hyrox 8-station programming and compromised split analysis.
          </p>
        </div>

        {/* 4 Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Tier 0: Health */}
          <div className="rounded-3xl bg-[#0D0E15] border border-white/5 p-6 flex flex-col justify-between hover:border-white/20 transition-all group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Tier 0</span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-white/5 text-zinc-300">Free</span>
              </div>
              <h3 className="text-2xl font-black italic text-white mb-1">Health</h3>
              <p className="text-3xl font-black text-white mb-4">£0 <span className="text-xs font-normal text-zinc-400">/ forever</span></p>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Autonomic recovery baselines, continuous HRV RMSSD tracking, circadian sleep stages, and resting HR stabilization.
              </p>
              <ul className="space-y-2.5 text-xs text-zinc-300">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" /> Apple Health &amp; Health Connect Sync</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" /> Daily Kinetic Readiness Score</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" /> Sleep Debt &amp; Recovery Scoring</li>
              </ul>
            </div>
            <Link
              href="/early-access?tier=health"
              className="mt-8 w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase tracking-wider text-center transition-all"
            >
              Join Health Shortlist
            </Link>
          </div>

          {/* Tier 1: Running */}
          <div className="rounded-3xl bg-[#0D0E15] border border-white/5 p-6 flex flex-col justify-between hover:border-white/20 transition-all group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Tier 1</span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-white/5 text-zinc-300">Endurance</span>
              </div>
              <h3 className="text-2xl font-black italic text-white mb-1">Running</h3>
              <p className="text-3xl font-black text-white mb-4">£9.99 <span className="text-xs font-normal text-zinc-400">/ month</span></p>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Zone 2 aerobic threshold pacing, VO2 Max track interval prescriptions, cadence balance, and ground contact time dynamics.
              </p>
              <ul className="space-y-2.5 text-xs text-zinc-300">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" /> All Health Tier Features</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" /> VO2 Max Engine &amp; Threshold Splits</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" /> Live Audio Pacing Feedback</li>
              </ul>
            </div>
            <Link
              href="/early-access?tier=running"
              className="mt-8 w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase tracking-wider text-center transition-all"
            >
              Join Running Shortlist
            </Link>
          </div>

          {/* Tier 2: Fitness (Hypertrophy & Power) */}
          <div className="rounded-3xl bg-[#0D0E15] border border-white/5 p-6 flex flex-col justify-between hover:border-white/20 transition-all group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Tier 2</span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-white/5 text-zinc-300">Hypertrophy &amp; Power</span>
              </div>
              <h3 className="text-2xl font-black italic text-white mb-1">Fitness</h3>
              <p className="text-3xl font-black text-white mb-4">£25.99 <span className="text-xs font-normal text-zinc-400">/ month</span></p>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Muscle volume loading, 1RM velocity-based training (VBT), barbell displacement tracking, and heavy posterior chain force output.
              </p>
              <ul className="space-y-2.5 text-xs text-zinc-300">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" /> All Running Tier Features</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" /> VisionForm™ Computer Vision VBT</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" /> Dual-Progression Strength Engine</li>
              </ul>
            </div>
            <Link
              href="/early-access?tier=fitness"
              className="mt-8 w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase tracking-wider text-center transition-all"
            >
              Join Fitness Shortlist
            </Link>
          </div>

          {/* Tier 3: Hyrox Pro */}
          <div className="rounded-3xl bg-gradient-to-b from-[#1E1218] via-[#120F16] to-[#0A0B10] border-2 border-[#B01020] p-6 flex flex-col justify-between relative shadow-[0_0_40px_rgba(176,16,32,0.3)]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#B01020] text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">
              HYBRID APEX
            </div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#E8605A]">Tier 3</span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[#B01020]/20 text-[#E8605A] border border-[#B01020]/40">Pro Division</span>
              </div>
              <h3 className="text-2xl font-black italic text-white mb-1">Hyrox Pro</h3>
              <p className="text-3xl font-black text-white mb-4">£45.99 <span className="text-xs font-normal text-zinc-400">/ month</span></p>
              <p className="text-xs text-zinc-300 leading-relaxed mb-6">
                Official 8-station race simulation, compromised running split decay analysis, Roxzone transition optimization, and sub-65 pacing engine.
              </p>
              <ul className="space-y-2.5 text-xs text-zinc-200">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#E8605A] flex-shrink-0" /> Compromised Running Index (CRI)</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#E8605A] flex-shrink-0" /> 8-Station Official Simulation Ladder</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#E8605A] flex-shrink-0" /> Roxzone Transition Optimization</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#E8605A] flex-shrink-0" /> Real-Time Lactate Clearance Pacing</li>
              </ul>
            </div>
            <Link
              href="/early-access?tier=hyrox"
              className="mt-8 w-full py-3.5 rounded-xl bg-gradient-to-r from-[#B01020] to-[#E8605A] hover:opacity-90 text-white font-black text-xs uppercase tracking-wider text-center shadow-[0_0_20px_rgba(176,16,32,0.4)] transition-all"
            >
              Join Hyrox Pro Shortlist
            </Link>
          </div>
        </div>
      </section>

      {/* ── VisionForm Computer Vision Spotlight ─────────────────────────────── */}
      <section id="telemetry" className="py-20 md:py-28 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E8605A] block">
              COMPUTER VISION &bull; ON-DEVICE EDGE AI
            </span>
            <h2 className="font-serif italic font-normal text-white text-4xl sm:text-5xl tracking-tight leading-tight">
              VisionForm™ biomechanics. Zero wearables required.
            </h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              Prop your phone against a wall. The on-device neural engine tracks 33 skeletal joints in real time, calculating bar displacement velocity, eccentric deceleration, and squat depth down to the millimeter.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-md bg-[#B01020]/20 flex items-center justify-center text-[#E8605A] text-xs font-bold mt-0.5">1</div>
                <div>
                  <p className="text-xs font-bold text-white">Velocity-Based Training (VBT)</p>
                  <p className="text-xs text-zinc-400">Measures mean concentric velocity (m/s) to ensure optimal neuromuscular power output.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-md bg-[#B01020]/20 flex items-center justify-center text-[#E8605A] text-xs font-bold mt-0.5">2</div>
                <div>
                  <p className="text-xs font-bold text-white">Dynamic Rep Termination</p>
                  <p className="text-xs text-zinc-400">Alerts you when bar speed drops below 20% threshold to prevent structural failure and systemic fatigue.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 p-8 rounded-3xl bg-[#0D0E15] border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
              <span className="text-xs font-bold text-white uppercase tracking-wider">VisionForm™ Skeleton Matrix</span>
              <span className="text-xs font-mono font-bold text-emerald-400">60 FPS Edge Feed</span>
            </div>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs">
                <span className="text-zinc-400">Barbell Back Squat (140 kg)</span>
                <span className="font-mono font-bold text-white">0.68 m/s (Optimal VBT)</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs">
                <span className="text-zinc-400">Femur-to-Knee Angle</span>
                <span className="font-mono font-bold text-emerald-400">92&deg; (Competition Depth Rx)</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs">
                <span className="text-zinc-400">Bar Path Displacement Drift</span>
                <span className="font-mono font-bold text-zinc-200">1.4 cm (True Vertical)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ Section ───────────────────────────────────────────────────────── */}
      <section id="faq" className="py-20 md:py-28 px-6 max-w-4xl mx-auto border-t border-white/5">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E8605A] block mb-2">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="font-serif italic font-normal text-white text-3xl sm:text-4xl">
            Everything you need to know
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-[#0D0E15] border border-white/5 hover:border-white/10 transition-all cursor-pointer"
              onClick={() => toggleFaq(i)}
            >
              <div className="flex items-center justify-between select-none">
                <span className="text-sm font-bold text-white">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-[#E8605A] transition-transform ${activeFaq === i ? "rotate-180" : ""}`} />
              </div>
              {activeFaq === i && (
                <p className="text-xs text-zinc-400 mt-3 pt-3 border-t border-white/5 leading-relaxed">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-12 px-6 max-w-7xl mx-auto text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#B01020] to-[#E8605A] p-[1px]">
            <div className="w-full h-full bg-[#090A10] rounded-[7px] flex items-center justify-center text-white font-black text-xs">
              Z
            </div>
          </div>
          <span className="font-black text-sm italic text-white tracking-tight">
            ZENNI<span className="text-[#B01020]">FIT</span>
          </span>
          <span className="text-xs text-zinc-400 ml-2">&copy; 2026 ZenniFitness. All rights reserved.</span>
        </div>

        <div className="flex items-center gap-6 text-xs text-zinc-400">
          <Link href="/early-access" className="hover:text-white transition-colors">Join Shortlist</Link>
          <a href="#tiers" className="hover:text-white transition-colors">Tiers</a>
          <a href="#telemetry" className="hover:text-white transition-colors">VisionForm™</a>
          <Link href="/articles" className="hover:text-white transition-colors">The Science</Link>
        </div>
      </footer>

    </main>
  )
}
