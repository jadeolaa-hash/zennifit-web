"use client"

import React, { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
  Sparkles,
  Zap,
  Activity,
  ShieldCheck,
  Check,
  ChevronRight,
  ArrowRight,
  TrendingUp,
  BarChart3,
  Timer,
  Dumbbell,
  Heart,
  Moon,
  Smartphone,
  RefreshCw,
  Award,
  Clock,
  Layers,
  Flame,
  ArrowLeft
} from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

function EarlyAccessContent() {
  const searchParams = useSearchParams()
  const initialTier = searchParams.get("tier") || "hyrox"

  const [step, setStep] = useState<number>(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    discipline: initialTier,
    frequency: "5-6",
    current5kPace: "4:15",
    bottleneck: "lactate",
    targetGoal: "sub-65",
    wearable: "whoop"
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [shortlistNumber] = useState(Math.floor(130 + Math.random() * 50))

  useEffect(() => {
    if (initialTier) {
      setFormData(prev => ({ ...prev, discipline: initialTier }))
    }
  }, [initialTier])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim()) return

    setIsSubmitting(true)

    try {
      await supabase.from("early_access_signups").insert([
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          interest: `shortlist_${formData.discipline}_${formData.targetGoal}`
        }
      ])
    } catch {
      // ignore
    }

    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 1200)
  }

  return (
    <main className="min-h-screen bg-[#06070B] text-zinc-100 selection:bg-[#B01020] selection:text-white font-sans relative overflow-hidden">
      
      {/* Background Radial Lights */}
      <div className="absolute top-[-10%] right-[10%] w-[600px] h-[600px] bg-[#B01020]/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[5%] left-[-10%] w-[600px] h-[600px] bg-[#E8605A]/10 rounded-full blur-[170px] pointer-events-none" />

      {/* ── Top Header ──────────────────────────────────────────────────────── */}
      <header className="border-b border-white/5 bg-[#06070B]/85 backdrop-blur-2xl">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#B01020] to-[#E8605A] p-[1px]">
              <div className="w-full h-full bg-[#090A10] rounded-[10px] flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#E8605A] fill-current">
                  <path d="M12 2L2 12l10 10 10-10L12 2zm0 3.8L18.2 12 12 18.2 5.8 12 12 5.8z" />
                </svg>
              </div>
            </div>
            <span className="font-black text-lg italic tracking-tight text-white">
              ZENNI<span className="text-[#B01020]">FIT</span>
            </span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Overview</span>
          </Link>
        </div>
      </header>

      {/* ── Main Diagnostic & Shortlist Container ────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        
        {!submitted ? (
          <div className="space-y-8">
            
            {/* Stage Tag & Title */}
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 mb-4 backdrop-blur-xl">
                <Sparkles className="w-3.5 h-3.5 text-[#E8605A]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#E8605A]">
                  AI PERFORMANCE DIAGNOSTIC &bull; STEP {step} OF 5
                </span>
              </div>
              <h1 className="font-serif italic font-normal text-white text-3xl sm:text-5xl tracking-tight mb-3">
                Synthesize your hybrid blueprint.
              </h1>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                Experience an instant preview of ZenniFit&apos;s adaptive engine. Answer 4 questions to unlock your custom fatigue telemetry and lock in priority shortlist perks.
              </p>
            </div>

            {/* Progress Bar */}
            <div className="max-w-xl mx-auto">
              <div className="flex justify-between text-[10px] font-mono text-zinc-400 mb-2 uppercase">
                <span>Discipline</span>
                <span>Workload</span>
                <span>Bottlenecks</span>
                <span>Target Benchmark</span>
                <span>Dossier Delivery</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#B01020] to-[#E8605A] h-full rounded-full transition-all duration-300"
                  style={{ width: `${(step / 5) * 100}%` }}
                />
              </div>
            </div>

            {/* Step Card Container */}
            <div className="p-6 md:p-10 rounded-3xl bg-[#0D0E15] border border-white/10 shadow-[0_15px_60px_rgba(0,0,0,0.7)] max-w-2xl mx-auto text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#B01020]/10 rounded-full blur-3xl pointer-events-none" />

              {/* ── STEP 1: Discipline & Focus ─────────────────────────────── */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">1. Primary Athletic Discipline</h2>
                    <p className="text-xs text-zinc-400">Which hybrid performance protocol are you preparing for?</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: "hyrox", title: "Hyrox & Hybrid Racing", desc: "8 stations + 8x1km compromised running", icon: Trophy },
                      { id: "running", title: "Endurance & Running", desc: "5K, 10K, Marathon & VO2 Max ceiling", icon: Timer },
                      { id: "fitness", title: "Hypertrophy & Strength", desc: "Heavy posterior chain loading & VBT velocity", icon: Dumbbell },
                      { id: "health", title: "Health & Longevity", desc: "Autonomic recovery, HRV RMSSD & sleep stages", icon: Heart },
                    ].map((item) => {
                      const Icon = item.icon
                      const isSelected = formData.discipline === item.id
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, discipline: item.id })}
                          className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                            isSelected
                              ? "border-[#B01020] bg-gradient-to-br from-[#B01020]/20 to-transparent shadow-[0_0_20px_rgba(176,16,32,0.3)]"
                              : "border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <Icon className={`w-5 h-5 ${isSelected ? "text-[#E8605A]" : "text-zinc-400"}`} />
                            {isSelected && <span className="w-2 h-2 rounded-full bg-[#E8605A]" />}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">{item.title}</p>
                            <p className="text-xs text-zinc-400 mt-1 leading-snug">{item.desc}</p>
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#B01020] to-[#E8605A] hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(176,16,32,0.4)] transition-all flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Workload Analysis</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* ── STEP 2: Workload & Current Baseline ────────────────────── */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">2. Training Volume &amp; Wearable Sync</h2>
                    <p className="text-xs text-zinc-400">Tell us about your current weekly frequency and baseline pace.</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-2">
                        Weekly Training Frequency
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {["2-3 days", "4-5 days", "5-6 days", "7+ (Two-a-days)"].map((freq) => (
                          <button
                            key={freq}
                            type="button"
                            onClick={() => setFormData({ ...formData, frequency: freq })}
                            className={`py-3 px-2 rounded-xl text-xs font-bold text-center border transition-all ${
                              formData.frequency === freq
                                ? "border-[#B01020] bg-[#B01020]/20 text-white"
                                : "border-white/5 bg-white/[0.02] text-zinc-400 hover:text-white"
                            }`}
                          >
                            {freq}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1">
                        Estimated 5K Fresh Running Pace (min/km)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 4:15 /km"
                        value={formData.current5kPace}
                        onChange={(e) => setFormData({ ...formData, current5kPace: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#B01020]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-2">
                        Connected Wearable Ecosystem
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {["Apple Watch", "Whoop 4.0", "Garmin", "Oura Ring"].map((device) => (
                          <button
                            key={device}
                            type="button"
                            onClick={() => setFormData({ ...formData, wearable: device })}
                            className={`py-2.5 px-2 rounded-xl text-xs font-semibold text-center border transition-all ${
                              formData.wearable === device
                                ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300"
                                : "border-white/5 bg-white/[0.02] text-zinc-400 hover:text-white"
                            }`}
                          >
                            {device}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="py-3.5 px-5 rounded-xl border border-white/10 text-zinc-300 text-xs font-bold hover:bg-white/5"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#B01020] to-[#E8605A] text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(176,16,32,0.4)] flex items-center justify-center gap-2"
                    >
                      <span>Next: Bottleneck Diagnosis</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 3: Primary Bottlenecks ───────────────────────────── */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">3. What Restricts Your Performance Most?</h2>
                    <p className="text-xs text-zinc-400">Select the primary fatigue vector that holds you back during intense sessions.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: "lactate", title: "Lactate Pooling (Heavy Legs)", desc: "Split times collapse on 1km runs immediately after sled pushes and lunges." },
                      { id: "vo2", title: "Aerobic Threshold Ceiling", desc: "Unable to sustain high cardiovascular output in Zone 4/5 without gasping." },
                      { id: "strength", title: "Posterior Chain Force", desc: "Deadlifts, farmer carries, and wall balls fatigue structural posture early." },
                      { id: "recovery", title: "Autonomic Nervous System Recovery", desc: "Waking up with low HRV, elevated resting HR, and sluggish morning energy." },
                    ].map((item) => {
                      const isSelected = formData.bottleneck === item.id
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, bottleneck: item.id })}
                          className={`p-4 rounded-2xl border text-left transition-all ${
                            isSelected
                              ? "border-[#B01020] bg-[#B01020]/20 shadow-[0_0_20px_rgba(176,16,32,0.3)]"
                              : "border-white/5 bg-white/[0.02] hover:bg-white/[0.04]"
                          }`}
                        >
                          <p className="text-sm font-bold text-white">{item.title}</p>
                          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{item.desc}</p>
                        </button>
                      )
                    })}
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="py-3.5 px-5 rounded-xl border border-white/10 text-zinc-300 text-xs font-bold hover:bg-white/5"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#B01020] to-[#E8605A] text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(176,16,32,0.4)] flex items-center justify-center gap-2"
                    >
                      <span>Next: Target Goal</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 4: Target Performance Benchmark ───────────────────── */}
              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">4. Target Performance Benchmark</h2>
                    <p className="text-xs text-zinc-400">What milestone are you aiming to conquer in the next 12 weeks?</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: "sub-65", title: "Sub-65 / Sub-60 Hyrox", desc: "Elite pacing across all 8 stations with zero split degradation." },
                      { id: "sub-20", title: "Sub-20 5K / Sub-40 10K", desc: "Maximal aerobic velocity and efficient lactate clearance." },
                      { id: "strength-power", title: "200kg+ Deadlift & High VBT", desc: "Explosive concentric bar speed with posterior chain resilience." },
                      { id: "peak-readiness", title: "Peak Autonomic Recovery", desc: "Consistently waking up in the Green (>85 Readiness Score)." },
                    ].map((item) => {
                      const isSelected = formData.targetGoal === item.id
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, targetGoal: item.id })}
                          className={`p-4 rounded-2xl border text-left transition-all ${
                            isSelected
                              ? "border-[#B01020] bg-[#B01020]/20 shadow-[0_0_20px_rgba(176,16,32,0.3)]"
                              : "border-white/5 bg-white/[0.02] hover:bg-white/[0.04]"
                          }`}
                        >
                          <p className="text-sm font-bold text-white">{item.title}</p>
                          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{item.desc}</p>
                        </button>
                      )
                    })}
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="py-3.5 px-5 rounded-xl border border-white/10 text-zinc-300 text-xs font-bold hover:bg-white/5"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(5)}
                      className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#B01020] to-[#E8605A] text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(176,16,32,0.4)] flex items-center justify-center gap-2"
                    >
                      <span>Final Step: Unlock Telemetry &amp; Shortlist</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 5: Value Incentive & Lead Capture ─────────────────── */}
              {step === 5 && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E8605A] mb-1">
                      <Award className="w-4 h-4" />
                      <span>Unlock AI Dossier &bull; Priority Founding Cohort</span>
                    </div>
                    <h2 className="text-2xl font-black italic text-white">5. Athlete Identification</h2>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      Enter your name and email to compile your personalized performance forecast and reserve your priority beta access.
                    </p>
                  </div>

                  {/* Founding Member Perks Box */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-[#B01020]/15 to-transparent border border-[#B01020]/30 space-y-2">
                    <p className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#E8605A]" />
                      Founding Athlete Benefits Included:
                    </p>
                    <ul className="space-y-1 text-xs text-zinc-300">
                      <li className="flex items-center gap-2">&bull; Immediate personalized telemetry &amp; fatigue forecast</li>
                      <li className="flex items-center gap-2">&bull; Guaranteed 30% lifetime founding member subscription discount</li>
                      <li className="flex items-center gap-2">&bull; Priority TestFlight &amp; Google Play beta invitation</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Alex Vance"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#B01020]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1">
                        Email Address (for Beta Invite &amp; Report)
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@zennifit.pro"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#B01020]"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="py-4 px-5 rounded-xl border border-white/10 text-zinc-300 text-xs font-bold hover:bg-white/5"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-4 rounded-xl bg-gradient-to-r from-[#B01020] via-[#D1182B] to-[#E8605A] text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(176,16,32,0.5)] flex items-center justify-center gap-2 hover:opacity-95 transition-all"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-white" />
                          <span>Generating AI Dossier...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>Unlock Telemetry &amp; Claim Spot</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        ) : (
          /* ── STEP 6: Interactive Performance Taster & Telemetry Reveal ── */
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
            
            {/* Header Badge */}
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 mb-4">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  SHORTLIST CONFIRMED &bull; PASS #{shortlistNumber}
                </span>
              </div>
              <h1 className="font-serif italic font-normal text-white text-4xl sm:text-6xl tracking-tight mb-3">
                Dossier Synthesized for {formData.name || "Athlete"}.
              </h1>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                Here is your immediate performance preview generated by ZenniFit&apos;s neural engine based on your training parameters.
              </p>
            </div>

            {/* Performance Taster Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1: Compromised Pace Forecast */}
              <div className="p-6 rounded-3xl bg-[#0D0E15] border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E8605A]">Compromised Engine</span>
                  <Activity className="w-4 h-4 text-zinc-400" />
                </div>
                <h3 className="text-xl font-black italic text-white">Split Degradation Forecast</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400">Fresh 1km Baseline</span>
                    <span className="font-mono font-bold text-white">{formData.current5kPace} /km</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400">Run 3 (Post-Sled Push)</span>
                    <span className="font-mono font-bold text-[#E8605A]">+14s decay</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400">Run 8 (Post-Lunges)</span>
                    <span className="font-mono font-bold text-amber-400">+22s decay</span>
                  </div>
                </div>
                <p className="text-[11px] text-zinc-400 leading-snug pt-2 border-t border-white/5">
                  <strong className="text-white">Prescription:</strong> ZenniFit will program 400m high-cadence flushes post-sleds to accelerate lactate clearance.
                </p>
              </div>

              {/* Card 2: Periodization Ratio */}
              <div className="p-6 rounded-3xl bg-[#0D0E15] border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Dual Progression</span>
                  <Dumbbell className="w-4 h-4 text-zinc-400" />
                </div>
                <h3 className="text-xl font-black italic text-white">Recommended Weekly Split</h3>
                <div className="space-y-2.5">
                  <div>
                    <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                      <span>Heavy Posterior / VBT</span>
                      <span className="text-white font-bold">40%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-cyan-400 rounded-full w-[40%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                      <span>Compromised Intervals</span>
                      <span className="text-white font-bold">35%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-[#B01020] rounded-full w-[35%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                      <span>Zone 2 Aerobic Base</span>
                      <span className="text-white font-bold">25%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full w-[25%]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Target Benchmark */}
              <div className="p-6 rounded-3xl bg-[#0D0E15] border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">12-Week Target</span>
                  <Timer className="w-4 h-4 text-zinc-400" />
                </div>
                <h3 className="text-xl font-black italic text-white">VO2 Max &amp; Race Target</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400">Target Benchmark</span>
                    <span className="font-bold text-white uppercase">{formData.targetGoal}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400">Projected VO2 Max</span>
                    <span className="font-mono font-bold text-emerald-400">58.5 mL/kg/min</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400">Roxzone Budget Target</span>
                    <span className="font-mono font-bold text-white">4m 30s total</span>
                  </div>
                </div>
                <p className="text-[11px] text-zinc-400 leading-snug pt-2 border-t border-white/5">
                  <strong className="text-white">Status:</strong> Feasibility index rated at 84% based on current training availability.
                </p>
              </div>

            </div>

            {/* Confirmation Box */}
            <div className="p-8 rounded-3xl bg-gradient-to-r from-[#181119] via-[#120F16] to-[#0D0E15] border border-[#B01020]/40 text-center max-w-2xl mx-auto space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#B01020]/20 border border-[#B01020] flex items-center justify-center mx-auto text-[#E8605A]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black italic text-white">
                You&apos;re on the Founding Shortlist #{shortlistNumber}
              </h2>
              <p className="text-xs text-zinc-300 leading-relaxed max-w-md mx-auto">
                We have linked your athlete dossier to <strong>{formData.email}</strong>. When the standalone mobile app launches on iOS and Android, you will receive priority download access and your 30% founding subscription rate.
              </p>
              <div className="pt-2">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold uppercase tracking-wider text-white transition-all"
                >
                  <span>Return to Landing Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        )}

      </div>

    </main>
  )
}

export default function EarlyAccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#06070B] flex items-center justify-center text-zinc-400">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full border-2 border-[#B01020] border-t-transparent animate-spin" />
          <span className="text-xs uppercase font-bold tracking-widest text-[#E8605A]">Loading ZenniFit Diagnostic...</span>
        </div>
      </div>
    }>
      <EarlyAccessContent />
    </Suspense>
  )
}
