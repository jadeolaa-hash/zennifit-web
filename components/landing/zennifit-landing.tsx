"use client"

import React, { useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { useGSAP } from "@gsap/react"
import { ArrowRight, CheckCircle2, ChevronDown } from "lucide-react"
import { saveEarlyAccessSignup } from "@/lib/earlyAccess"
import { Phone } from "./phone"
import { AppScreenshot, SCREENSHOTS } from "./app-screenshots"
import styles from "./landing.module.css"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP)

// Each step is one "page" of the pinned scroll story. `screen` picks the app screen in the phone.
const STEPS = [
  {
    eyebrow: "ZenniFit",
    title: "Training To Match Your Every Movement",
    body: "Recover better. Train harder. Track Health, and improve with Zenni AI. All in one app.",
    screen: 0,
    hero: true,
  },
  {
    eyebrow: "01 · Home",
    title: "Know before you go.",
    body: "Strain, recovery and sleep at a glance each morning, with resting heart rate, HRV and your weekly distance underneath.",
    screen: 1,
  },
  {
    eyebrow: "02 · Train",
    title: "Every session has a plan.",
    body: "Running, strength and Hyrox / CrossFit in one place, with today’s session up top and training load tracked for each.",
    screen: 2,
  },
  {
    eyebrow: "03 · Health",
    title: "Your body, by the numbers.",
    body: "Heart rate, blood oxygen, HRV, blood pressure, sleep and body composition, synced from your wearable.",
    screen: 3,
  },
  {
    eyebrow: "04 · Zenni AI",
    title: "A coach that reads your data.",
    body: "Zenni AI checks today’s recovery and sleep debt, explains what it sees, and adjusts your plan to match.",
    screen: 4,
  },
  {
    eyebrow: "05 · Social",
    title: "Race with your community.",
    body: "Find Hyrox races near you, see who’s training in your city, and rank against your country and continent.",
    screen: 5,
  },
]

// Phone angle per step. rotateY stays positive so the left edge and buttons stay in view.
const POSES = [
  { rotateY: 26, rotateX: 9, rotateZ: -4, y: 0 },
  { rotateY: 18, rotateX: 6, rotateZ: -2, y: -6 },
  { rotateY: 30, rotateX: 11, rotateZ: -5, y: 4 },
  { rotateY: 20, rotateX: 4, rotateZ: -1, y: -4 },
  { rotateY: 28, rotateX: 9, rotateZ: -3, y: 6 },
  { rotateY: 16, rotateX: 7, rotateZ: -2, y: 0 },
]

const NAV = ["Home", "Train", "Health", "Zenni AI", "Social"]

export default function ZenniFitLanding() {
  const root = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLElement>(null)
  const intro = useRef<HTMLDivElement>(null)
  const phone = useRef<HTMLDivElement>(null)
  const glare = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const trigger = useRef<ScrollTrigger | null>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        { reduce: "(prefers-reduced-motion: reduce)", full: "(prefers-reduced-motion: no-preference)" },
        (ctx) => {
          const reduce = Boolean(ctx.conditions?.reduce)
          const texts = gsap.utils.toArray<HTMLElement>("[data-step-text]")
          const screens = gsap.utils.toArray<HTMLElement>("[data-step-screen]")
          const last = STEPS.length - 1

          gsap.set(texts.slice(1), { autoAlpha: 0, y: reduce ? 0 : 40 })
          gsap.set(screens.slice(1), { autoAlpha: 0 })
          gsap.set(phone.current, POSES[0])

          if (!reduce) {
            // Entrance: phone swings in from a steep angle, glare sweeps once.
            gsap.from(intro.current, { rotateY: 40, rotateX: 18, y: 140, autoAlpha: 0, duration: 1.8, ease: "expo.out" })
            gsap.fromTo(glare.current, { xPercent: -120 }, { xPercent: 120, duration: 1.6, delay: 0.7, ease: "power2.inOut" })
            gsap.from("[data-hero-in]", { y: 30, autoAlpha: 0, duration: 1, stagger: 0.12, ease: "power3.out", delay: 0.2 })
          }

          const tl = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            scrollTrigger: {
              trigger: stage.current,
              start: "top top",
              end: () => `+=${last * window.innerHeight}`,
              pin: true,
              scrub: reduce ? true : 0.8,
              // Snap to the nearest step (a plain number snaps in the scroll direction and can skip a step).
              snap: { snapTo: (v: number) => Math.round(v * last) / last, inertia: false, duration: { min: 0.2, max: 0.6 }, delay: 0.05, ease: "power1.inOut" },
              invalidateOnRefresh: true,
              onUpdate: (self) => setActive(Math.round(self.progress * last)),
            },
          })
          trigger.current = tl.scrollTrigger ?? null

          for (let i = 1; i <= last; i++) {
            const at = i - 1
            tl.to(texts[i - 1], { autoAlpha: 0, y: reduce ? 0 : -40, duration: 0.35 }, at + 0.05)
            tl.to(texts[i], { autoAlpha: 1, y: 0, duration: 0.35 }, at + 0.45)

            const from = STEPS[i - 1].screen
            const to = STEPS[i].screen
            if (from !== to) {
              tl.to(screens[from], { autoAlpha: 0, scale: reduce ? 1 : 0.94, y: reduce ? 0 : -24, duration: 0.4 }, at + 0.15)
              tl.fromTo(
                screens[to],
                { autoAlpha: 0, scale: reduce ? 1 : 1.05, y: reduce ? 0 : 36 },
                { autoAlpha: 1, scale: 1, y: 0, duration: 0.4 },
                at + 0.45,
              )
            }

            if (!reduce) {
              tl.to(phone.current, { ...POSES[i], duration: 1, ease: "sine.inOut" }, at)
              tl.fromTo(glare.current, { xPercent: -120 }, { xPercent: 120, duration: 0.8, ease: "none" }, at + 0.1)
            }
          }
          // Pad so the timeline is exactly `last` long and snap points line up with steps.
          tl.set({}, {}, last)
        },
      )
      return () => mm.revert()
    },
    { scope: root },
  )

  // "Get early access": glide straight down to the sign-up section. The phone and text
  // fade out for the trip so the scroll story doesn't play on the way past, then come back.
  const goToJoin = (e: React.MouseEvent) => {
    const target = document.getElementById("join")
    if (!target) return
    e.preventDefault()
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const story = gsap.utils.toArray<HTMLElement>("[data-skip-fade]")
    gsap.killTweensOf(window)
    gsap.to(story, { autoAlpha: 0, duration: reduce ? 0 : 0.25, overwrite: true })
    gsap.to(window, {
      scrollTo: { y: target, autoKill: false },
      duration: reduce ? 0 : 1.6,
      delay: reduce ? 0 : 0.15,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(story, { autoAlpha: 1 })
      },
    })
  }

  const goTo = (i: number) => {
    const st = trigger.current
    if (!st) return
    const y = st.start + ((st.end - st.start) * i) / (STEPS.length - 1)
    window.scrollTo({ top: y, behavior: "smooth" })
  }

  return (
    <div ref={root} className={`${styles.page} relative min-h-screen overflow-x-clip`} style={{ fontFamily: "var(--font-lato), sans-serif" }}>
      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-gradient-to-b from-[#0b0204]/85 to-[#0b0204]/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/zennifit" className="flex items-center gap-2.5">
            <Image src="/logo-white.png" alt="" width={26} height={26} priority />
            <span className="font-black text-lg tracking-tight">ZenniFit</span>
          </Link>
          <nav className="flex items-center gap-1 sm:gap-2">
            <a
              href="#join"
              onClick={goToJoin}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black text-sm font-black hover:bg-[#ffe3de] transition-colors"
            >
              Get early access
            </a>
          </nav>
        </div>
      </header>

      {/* ── Pinned scroll story ─────────────────────────────────────── */}
      <section ref={stage} id="features" className="relative h-[100svh] overflow-hidden" aria-label="App features">
        <div className={styles.ambient} />

        {/* Text on the left, phone on the right, at every screen size */}
        <div data-skip-fade className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-10 lg:pb-0 grid grid-cols-[minmax(0,1fr)_140px] sm:grid-cols-[minmax(0,1fr)_230px] md:grid-cols-[minmax(0,1fr)_290px] lg:grid-cols-2 gap-4 sm:gap-8 items-center">
          {/* Phone */}
          <div className="relative h-full min-h-0 order-2">
            <div className={styles.phoneArea}>
              <div className={styles.scene}>
                <div className={styles.halo} />
                <div className={styles.floorShadow} />
                <div ref={intro} className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
                  <Phone ref={phone} glareRef={glare}>
                    {SCREENSHOTS.map((_, i) => (
                      <div key={i} data-step-screen className="absolute inset-0" aria-hidden={STEPS[active].screen !== i}>
                        <AppScreenshot index={i} priority={i < 2} />
                      </div>
                    ))}
                  </Phone>
                </div>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="relative order-1 h-full min-h-0">
            {STEPS.map((s, i) => (
              <div
                key={s.eyebrow}
                data-step-text
                className="absolute inset-0 flex flex-col justify-center text-left"
                aria-hidden={active !== i}
              >
                <p data-hero-in={s.hero ? "" : undefined} className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#ff8f80]">
                  {s.eyebrow}
                </p>
                {s.hero ? (
                  <h1 data-hero-in className={`${styles.heading} ${styles.shine} mt-2 sm:mt-3 text-[27px] sm:text-4xl md:text-5xl lg:text-[68px]`}>
                    {s.title}
                  </h1>
                ) : (
                  <h2 className={`${styles.heading} ${styles.shine} mt-2 sm:mt-3 text-[26px] sm:text-4xl md:text-5xl lg:text-[64px]`}>{s.title}</h2>
                )}
                <p data-hero-in={s.hero ? "" : undefined} className="mt-3 lg:mt-6 text-[13px] sm:text-base lg:text-lg text-white/70 max-w-md leading-relaxed">
                  {s.body}
                </p>
                {s.hero && (
                  <p data-hero-in className="hidden lg:flex mt-10 items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-white/45">
                    <ChevronDown className="w-4 h-4 animate-bounce" /> Scroll to explore
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step navigation */}
        <nav
          aria-label="Feature steps"
          data-skip-fade
          className="absolute z-20 bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 lg:bottom-auto lg:left-auto lg:translate-x-0 lg:right-6 lg:top-1/2 lg:-translate-y-1/2 lg:flex-col lg:gap-3"
        >
          {NAV.map((n, i) => {
            const on = active === i + 1
            return (
              <button
                key={n}
                onClick={() => goTo(i + 1)}
                aria-label={n}
                aria-current={on ? "step" : undefined}
                className="group flex items-center gap-3 justify-end cursor-pointer p-1"
              >
                <span className={`hidden lg:inline text-[11px] font-bold uppercase tracking-[0.16em] transition-colors ${on ? "text-white" : "text-white/35 group-hover:text-white/70"}`}>
                  {n}
                </span>
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    on ? "w-6 lg:w-2 h-2 lg:h-6 bg-white shadow-[0_0_12px_rgba(255,120,110,0.9)]" : "w-2 h-2 bg-white/30 group-hover:bg-white/60"
                  }`}
                />
              </button>
            )
          })}
        </nav>
      </section>

      <JoinSection />

      <footer className="relative border-t border-white/10 bg-[#0b0204]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/45">
          <span>
            <span className="font-bold text-white/70">ZenniFit</span>
          </span>
          <span>&copy; 2026 ZenniFitness. All rights reserved.</span>
        </div>
      </footer>
    </div>
  )
}

function JoinSection() {
  const [email, setEmail] = useState("")
  const [state, setState] = useState<"idle" | "saving" | "done" | "error">("idle")

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes("@")) return
    setState("saving")
    const ok = await saveEarlyAccessSignup({ email, interest: "zennifit_landing" })
    setState(ok ? "done" : "error")
  }

  return (
    <section id="join" className="relative overflow-hidden py-28 sm:py-36">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 100%, rgba(176,16,32,0.55), transparent 70%), linear-gradient(180deg, #0b0204, #160307)",
        }}
      />
      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <h2 className={`${styles.heading} ${styles.shine} text-5xl sm:text-7xl`}>Be first in.</h2>
        <p className="mt-5 text-white/70 text-base sm:text-lg">
          Join early-access to be invited as soon as ZenniFit launches
        </p>

        <div className="mt-10 max-w-md mx-auto">
          {state !== "done" ? (
            <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2.5">
              <label htmlFor="join-email" className="sr-only">Email</label>
              <input
                id="join-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 px-5 py-3.5 rounded-full bg-black/40 border border-white/15 text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/50 transition-colors"
              />
              <button
                type="submit"
                disabled={state === "saving"}
                className="px-6 py-3.5 rounded-full bg-white text-black font-black text-sm flex items-center justify-center gap-2 hover:bg-[#ffe3de] transition-colors cursor-pointer disabled:opacity-50"
              >
                {state === "saving" ? "Saving…" : (<>Get early access <ArrowRight className="w-4 h-4" /></>)}
              </button>
            </form>
          ) : (
            <div className="p-4 rounded-[20px] bg-black/40 border border-white/15">
              <div className="flex items-center justify-center gap-2 text-[#7fd1a0] font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" /> You&apos;re on the list
              </div>
              <p className="mt-1 text-xs text-white/50">We&apos;ll email you when early access opens.</p>
            </div>
          )}
          {state === "error" && (
            <p role="alert" className="mt-3 text-xs text-[#ffb4a8]">We couldn&apos;t save your email. Please try again.</p>
          )}
        </div>
      </div>
    </section>
  )
}
