"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle2, ChevronRight, Moon, Activity, HeartPulse, Sparkles } from "lucide-react"
import { saveEarlyAccessSignup } from "@/lib/earlyAccess"

// Landing page in the premium app's monochrome system (see zenni-app-claude-backup/constants/theme.ts):
// pure black canvas, graphite surfaces, flat white logo and type.
// The site is still pre-launch, so this stays a preview / coming-soon page.

const FEATURES = [
  { icon: HeartPulse, label: "Recovery", metric: "88", unit: "%", note: "HRV 82 ms · ready to train" },
  { icon: Moon, label: "Sleep", metric: "7:42", unit: "h", note: "Sleep debt cleared" },
  { icon: Activity, label: "Strain", metric: "14.2", unit: "", note: "Target 13–16 today" },
  { icon: Sparkles, label: "AI Coach", metric: "Zone 2", unit: "", note: "8 km steady, cadence 176+" },
]

export default function ComingSoonPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes("@")) return
    setLoading(true)
    setSubmitError(false)
    const saved = await saveEarlyAccessSignup({ email, interest: "landing_notify" })
    setLoading(false)
    if (saved) {
      setSubmitted(true)
    } else {
      setSubmitError(true)
    }
  }

  return (
    <main
      className="min-h-screen bg-black text-white flex flex-col selection:bg-white selection:text-black relative overflow-hidden"
      style={{ fontFamily: "var(--font-lato), sans-serif" }}
    >
      {/* Hero gradient, as on the app's welcome screen (#1c1c1e -> #000) */}
      <div className="absolute inset-x-0 top-0 h-[70vh] bg-gradient-to-b from-[#1c1c1e] to-black pointer-events-none" />

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className="w-full max-w-6xl mx-auto px-6 h-20 flex items-center justify-between z-20">
        <div className="flex items-center gap-2.5">
          <Image src="/logo-white.png" alt="" width={28} height={28} priority />
          <span className="font-black text-lg tracking-tight">ZenniFit</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141415] border border-[#1f1f22]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e6c87a] animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#a1a1a6]">Preview</span>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="flex flex-col items-center text-center px-6 pt-10 pb-16 max-w-3xl mx-auto w-full z-10">
        <Image
          src="/logo-white.png"
          alt="ZenniFit dragon emblem"
          width={168}
          height={168}
          priority
          className="w-32 h-32 sm:w-40 sm:h-40 drop-shadow-[0_20px_40px_rgba(0,0,0,0.65)]"
        />

        <span className="mt-10 text-[11px] font-bold uppercase tracking-[0.2em] text-[#6e6e73]">
          Coming soon &middot; Founding athlete cohort
        </span>

        <h1 className="mt-4 font-black text-6xl sm:text-7xl md:text-8xl tracking-[-0.04em] leading-none text-white">
          ZenniFit
        </h1>

        <p className="mt-5 text-[#a1a1a6] text-base sm:text-lg max-w-md leading-relaxed">
          Recovery, sleep and training in one place, with an AI Coach that reads your data.
        </p>

        {/* Notify form */}
        <div className="w-full max-w-md mt-10">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row sm:flex-wrap gap-2.5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="flex-1 px-5 py-3.5 rounded-full bg-[#0f0f10] border border-[#1f1f22] text-white placeholder-[#6e6e73] text-sm focus:outline-none focus:border-[#8e8e93] transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3.5 rounded-full bg-white text-black font-black text-sm tracking-tight active:opacity-70 transition-opacity flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? "Saving…" : (<>Notify me <ArrowRight className="w-4 h-4" /></>)}
              </button>
              {submitError && (
                <p role="alert" className="sm:basis-full text-center text-xs text-[#e6c87a]">
                  We couldn&apos;t save your email. Please try again.
                </p>
              )}
            </form>
          ) : (
            <div className="p-4 rounded-[20px] bg-[#0f0f10] border border-[#1f1f22]">
              <div className="flex items-center justify-center gap-2 text-[#7fd1a0] font-bold text-sm mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>You&apos;re on the list</span>
              </div>
              <p className="text-xs text-[#8e8e93]">We&apos;ll email you when early access opens.</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/preview/live"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#141415] border border-[#1f1f22] text-sm font-bold text-white hover:bg-[#1c1c1e] transition-colors"
          >
            Preview the app <ChevronRight className="w-4 h-4 text-[#8e8e93]" />
          </Link>
          <Link
            href="/early-access"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-bold text-[#a1a1a6] hover:text-white transition-colors"
          >
            Early access
          </Link>
        </div>
      </section>

      {/* ── Feature tiles (graphite cards, as in the app) ───────────────── */}
      <section className="w-full max-w-5xl mx-auto px-6 pb-20 z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {FEATURES.map(({ icon: Icon, label, metric, unit, note }) => (
            <div
              key={label}
              className="rounded-[20px] bg-gradient-to-b from-[#141415] to-[#0f0f10] border border-[#1f1f22] p-5 text-left"
            >
              <div className="flex items-center gap-2 text-[#8e8e93]">
                <Icon className="w-4 h-4" />
                <span className="text-[11px] font-bold uppercase tracking-[0.12em]">{label}</span>
              </div>
              <div className="mt-4 font-black text-3xl tracking-tight">
                {metric}
                {unit && <span className="text-base text-[#6e6e73] ml-0.5">{unit}</span>}
              </div>
              <p className="mt-1 text-xs text-[#6e6e73]">{note}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-[11px] text-[#6e6e73]">Sample data shown. ZenniFit is in preview.</p>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="mt-auto w-full max-w-6xl mx-auto px-6 py-6 border-t border-[#1f1f22] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6e6e73] z-20">
        <span>
          <span className="font-bold text-[#a1a1a6]">ZenniFit</span> &middot; Precision in every motion.
        </span>
        <span>&copy; 2026 ZenniFitness. All rights reserved.</span>
      </footer>
    </main>
  )
}
