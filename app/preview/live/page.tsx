"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ChevronRight, RotateCw } from "lucide-react"

// Embeds the premium-design Expo web build (zenni-app-claude-backup, launch config
// `zenni-app-backup-web` on port 8090) inside the phone frame.
// Deployed builds need NEXT_PUBLIC_APP_PREVIEW_URL; without it they point visitors at the prototype.
const APP_URL =
  process.env.NEXT_PUBLIC_APP_PREVIEW_URL ??
  (process.env.NODE_ENV === "development" ? "http://localhost:8090" : null)

export default function LiveAppPreviewPage() {
  const [reloadKey, setReloadKey] = useState(0)

  return (
    <div
      className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 lg:p-8 relative"
      style={{ fontFamily: "var(--font-lato), sans-serif" }}
    >
      {/* Hero gradient, matching the landing page */}
      <div className="absolute inset-x-0 top-0 h-[70vh] bg-gradient-to-b from-[#1c1c1e] to-black pointer-events-none" />

      {/* Top Bar Header */}
      <div className="max-w-4xl w-full mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#1f1f22] pb-4 z-10">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            aria-label="Back to home"
            className="w-9 h-9 rounded-full bg-[#141415] hover:bg-[#1c1c1e] border border-[#1f1f22] flex items-center justify-center text-[#a1a1a6] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-lg font-black tracking-tight text-white">ZenniFit app preview</h1>
            {APP_URL && <p className="text-xs text-[#8e8e93]">Running from {APP_URL}</p>}
          </div>
        </div>

        {APP_URL && (
          <button
            onClick={() => setReloadKey((k) => k + 1)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-full bg-[#141415] border border-[#1f1f22] text-[#a1a1a6] hover:text-white transition-colors cursor-pointer"
          >
            <RotateCw className="w-3.5 h-3.5" />
            Reload app
          </button>
        )}
      </div>

      {APP_URL ? (
        /* ── IPHONE 16 PRO FRAME ────────────────────────────────────────── */
        <div className="relative w-[390px] max-w-full h-[844px] bg-black rounded-[52px] p-3 shadow-2xl border-[4px] border-[#1f1f22] overflow-hidden z-10">

          {/* Dynamic Island */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[120px] h-[32px] bg-black rounded-full z-50 pointer-events-none" />

          {/* Phone Inner Viewport */}
          <div className="w-full h-full bg-black rounded-[44px] overflow-hidden relative">
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
      ) : (
        <div className="max-w-md w-full rounded-[20px] bg-gradient-to-b from-[#141415] to-[#0f0f10] border border-[#1f1f22] p-8 text-center z-10">
          <h2 className="font-black text-2xl tracking-tight">The live preview isn&apos;t online yet</h2>
          <p className="mt-2 text-sm text-[#8e8e93]">You can still click through the interactive prototype.</p>
          <Link
            href="/preview"
            className="mt-6 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-black text-sm font-black tracking-tight active:opacity-70 transition-opacity"
          >
            Open the prototype <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  )
}
