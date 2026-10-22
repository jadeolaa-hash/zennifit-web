"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowLeft, RotateCw } from "lucide-react"

// Embeds the real Expo web build (zenni-app, `npm run web`) inside the phone frame.
// Only works where that dev server is reachable — locally by default.
const APP_URL = process.env.NEXT_PUBLIC_APP_PREVIEW_URL ?? "http://localhost:8081"

export default function LiveAppPreviewPage() {
  const [reloadKey, setReloadKey] = useState(0)

  return (
    <div className="min-h-screen bg-[#030407] text-white flex flex-col items-center justify-center p-4 lg:p-8 relative font-sans">

      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-[#B01020]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-[#E8605A]/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Top Bar Header */}
      <div className="max-w-4xl w-full mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 z-10">
        <div className="flex items-center gap-3">
          <Link
            href="/preview"
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h1 className="text-lg font-black italic tracking-tight text-white">
                ZENNIFIT MOBILE OS <span className="text-[#B01020]">LIVE BUILD</span>
              </h1>
            </div>
            <p className="text-xs text-zinc-400">
              The current app build, running from {APP_URL}.
            </p>
          </div>
        </div>

        <button
          onClick={() => setReloadKey((k) => k + 1)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-[#0D0E15] border border-white/10 text-zinc-300 hover:text-white transition-all"
        >
          <RotateCw className="w-3.5 h-3.5" />
          Reload app
        </button>
      </div>

      {/* ── IPHONE 16 PRO FRAME ────────────────────────────────────────── */}
      <div className="relative w-[390px] h-[844px] bg-[#06070B] rounded-[52px] p-3 shadow-2xl border-[4px] border-[#22242D] shadow-[#B01020]/20 overflow-hidden z-10">

        {/* Dynamic Island */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[120px] h-[32px] bg-black rounded-full z-50 pointer-events-none" />

        {/* Phone Inner Viewport */}
        <div className="w-full h-full bg-[#06070B] rounded-[44px] overflow-hidden relative">
          <iframe
            key={reloadKey}
            src={APP_URL}
            title="ZenniFit app"
            className="w-full h-full border-0"
          />
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full z-50 pointer-events-none" />
      </div>
    </div>
  )
}
