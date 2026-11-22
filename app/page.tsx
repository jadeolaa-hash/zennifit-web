// app/page.tsx — ZenniFitness homepage.
// Two ways in: the ZenniFit app (left, /zennifit) and the Zenni Fitness shop
// (right, shop.zennifitness.com). Black-and-red theme, Barlow / Barlow Black.

import Link from 'next/link';
import Image from 'next/image';
import type { CSSProperties } from 'react';
import { SiteHeader, SiteFooter, SHOP_URL } from '@/components/site-header';

const BUTTON =
  'zf-btn inline-flex min-h-[44px] items-center justify-center rounded-md bg-[#B01020] px-7 text-[14px] font-bold uppercase tracking-[0.12em] text-white no-underline hover:bg-[#D01828]';

const PANEL =
  'zf-card zf-rise flex flex-col items-center rounded-2xl border border-white/10 bg-gradient-to-b from-[#1a0306] to-[#0a0a0a] px-6 pb-8 pt-8 text-center';

const delay = (ms: number) => ({ '--zf-delay': `${ms}ms` }) as CSSProperties;

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-black text-white">
      <SiteHeader />

      <section className="mx-auto w-full max-w-4xl px-4 pb-4 pt-10 text-center sm:px-8 sm:pt-14">
        <p className="zf-rise m-0 text-[13px] font-bold uppercase tracking-[0.3em] text-[#E0303D]" style={delay(0)}>
          ZenniFitness
        </p>
        <h1
          className="zf-rise m-0 mt-3 text-[38px] font-black italic uppercase leading-[0.95] tracking-tight sm:text-[56px]"
          style={delay(90)}
        >
          Train it. <span className="text-[#E0303D]">Wear it.</span>
        </h1>
      </section>

      <section className="mx-auto grid w-full max-w-4xl flex-1 grid-cols-1 content-start gap-4 px-4 pb-14 pt-6 sm:grid-cols-2 sm:gap-5 sm:px-8">
        {/* Left: the ZenniFit app */}
        <div className={PANEL} style={delay(200)}>
          <div className="zf-float relative h-[240px] w-[118px] overflow-hidden rounded-[22px] border-4 border-[#222] shadow-[0_24px_48px_-18px_rgba(176,16,32,0.55)] sm:h-[270px] sm:w-[133px]">
            <Image
              src="/app-screens/home-matt.png"
              alt="The ZenniFit app home screen"
              fill
              sizes="133px"
              className="object-cover"
              priority
            />
          </div>
          <p className="m-0 mt-6 text-[12px] font-bold uppercase tracking-[0.3em] text-[#E0303D]">The app</p>
          <h2 className="m-0 mt-1.5 text-[30px] font-black italic uppercase leading-none tracking-tight sm:text-[34px]">ZenniFit</h2>
          <p className="m-0 mt-2.5 max-w-xs text-[15px] leading-relaxed text-white/70">
            One AI Coach for your runs, lifts and Hyrox, adapting every plan to how ready you are today.
          </p>
          <Link href="/zennifit" className={`${BUTTON} mt-6`}>
            Preview now
          </Link>
        </div>

        {/* Right: the Zenni Fitness shop */}
        <div className={PANEL} style={delay(320)}>
          <div className="flex h-[240px] w-full items-center justify-center sm:h-[270px]">
            <Image
              src="/dragon-crimson.png"
              alt="The Zenni dragon"
              width={240}
              height={240}
              className="zf-float h-auto w-[200px] drop-shadow-[0_20px_40px_rgba(176,16,32,0.45)] sm:w-[230px]"
              style={{ animationDelay: '-3s' }}
              priority
            />
          </div>
          <p className="m-0 mt-6 text-[12px] font-bold uppercase tracking-[0.3em] text-[#E0303D]">The shop</p>
          <h2 className="m-0 mt-1.5 text-[30px] font-black italic uppercase leading-none tracking-tight sm:text-[34px]">Zenni Fitness</h2>
          <p className="m-0 mt-2.5 max-w-xs text-[15px] leading-relaxed text-white/70">
            Training wear for people who keep showing up. Tees, hoodies, sets and more.
          </p>
          <a href={SHOP_URL} className={`${BUTTON} mt-6`}>
            Shop now
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
