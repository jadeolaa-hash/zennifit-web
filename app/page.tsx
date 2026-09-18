"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  Eye,
  ShieldCheck,
  Zap,
  Activity,
  ChevronRight
} from "lucide-react"

export default function ComingSoonPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes("@")) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 600)
  }

  return (
    <main className="min-h-screen bg-[#06070B] text-zinc-100 flex flex-col justify-between selection:bg-[#B01020] selection:text-white relative overflow-hidden font-sans">
      
      {/* Background Ambient Radial Glows */}
      <div className="absolute top-[-15%] left-[20%] w-[650px] h-[650px] bg-[#B01020]/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[10%] w-[550px] h-[550px] bg-[#E8605A]/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute top-[45%] left-[-5%] w-[450px] h-[450px] bg-[#B01020]/10 rounded-full blur-[150px] pointer-events-none" />

      {/* ── Top Header ────────────────────────────────────────────────────────── */}
      <header className="w-full max-w-6xl mx-auto px-6 h-20 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#B01020] via-[#D1182B] to-[#E8605A] p-[1px] shadow-[0_0_20px_rgba(176,16,32,0.4)]">
            <div className="w-full h-full bg-[#090A10] rounded-[11px] flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#E8605A] fill-current">
                <path d="M12 2L2 12l10 10 10-10L12 2zm0 3.8L18.2 12 12 18.2 5.8 12 12 5.8z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-black text-lg italic tracking-tight text-white">
              ZENNI<span className="text-[#B01020]">FIT</span>
            </span>
            <span className="text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded-full bg-[#B01020]/20 text-[#E8605A] border border-[#B01020]/30">
              AI 4.2
            </span>
          </div>
        </div>

        {/* View Only Mode Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-zinc-300 font-semibold backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-300">View Only Mode</span>
        </div>
      </header>

      {/* ── Center Coming Soon Screen ─────────────────────────────────────────── */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-12 max-w-4xl mx-auto text-center z-10 w-full">
        
        {/* LOGO ABOVE THE MESSAGE */}
        <div className="relative mb-6 group">
          {/* Pulsing red halo glow behind dragon logo */}
          <div className="absolute inset-0 bg-[#B01020]/25 blur-3xl rounded-full scale-125 group-hover:bg-[#B01020]/40 transition-all duration-700 pointer-events-none" />
          
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto flex items-center justify-center p-5 rounded-[36px] bg-gradient-to-b from-white/[0.07] via-white/[0.02] to-transparent border border-white/15 shadow-[0_15px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(176,16,32,0.3)] backdrop-blur-xl">
            <img
              src="/coming-soon-logo.png"
              alt="ZenniFit Dragon Logo"
              className="w-full h-full object-contain brightness-0 invert drop-shadow-[0_0_30px_rgba(232,96,90,0.65)] group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* System Pill Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-5 backdrop-blur-xl">
          <Sparkles className="w-3.5 h-3.5 text-[#E8605A]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E8605A]">
            FOUNDING ATHLETE COHORT &bull; PRE-LAUNCH
          </span>
        </div>

        {/* Headline: COMING SOON */}
        <h1 className="font-serif italic font-normal text-white text-5xl sm:text-7xl md:text-8xl tracking-tight leading-none mb-6">
          Coming Soon
        </h1>

        {/* Subtitle Message */}
        <p className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto font-normal leading-relaxed mb-10">
          The Hybrid Athlete Operating System is preparing for public launch. On-device biomechanics, autonomic recovery, and compromised running intelligence in one unified platform.
        </p>

        {/* Early Access / Notification Signup Form */}
        <div className="w-full max-w-md mx-auto mb-10">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                required
                className="flex-1 px-4 py-3.5 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-[#E8605A] transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#B01020] via-[#D1182B] to-[#E8605A] hover:opacity-95 active:scale-95 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(176,16,32,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span>Saving...</span>
                ) : (
                  <>
                    <span>Notify Me</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center animate-in fade-in duration-300">
              <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-xs mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>You&apos;re on the priority shortlist</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                You will receive first-wave TestFlight access and private beta credentials.
              </p>
            </div>
          )}
        </div>

        {/* View-Only Mode Action Links */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/preview"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white transition-all group"
          >
            <Eye className="w-3.5 h-3.5 text-[#E8605A] group-hover:scale-110 transition-transform" />
            <span>View Interactive Prototype</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
          </Link>

          <Link
            href="/early-access"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-zinc-200 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
            <span>Synthesize Training Protocol</span>
          </Link>
        </div>

      </section>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer className="w-full max-w-6xl mx-auto px-6 py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500 z-20">
        <div className="flex items-center gap-2">
          <span className="font-bold text-zinc-400">ZENNI<span className="text-[#B01020]">FIT</span></span>
          <span>&bull; Precision in every motion.</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[11px] font-mono text-zinc-600">SYS_BUILD: v4.2.8</span>
          <span>&copy; 2026 ZenniFitness. All rights reserved.</span>
        </div>
      </footer>

    </main>
  )
}
