// app/page.tsx — ZenniFitness homepage.
// Two ways in: the ZenniFit app (left, /zennifit) and the Zenni Fitness shop
// (right, shop.zennifitness.com). Black-and-red theme, Barlow / Barlow Black.

import Link from 'next/link';
import Image from 'next/image';
import { SiteHeader, SiteFooter, SHOP_URL } from '@/components/site-header';

const BUTTON =
  'inline-flex min-h-[48px] items-center justify-center rounded-md bg-[#B01020] px-8 text-[15px] font-bold uppercase tracking-[0.12em] text-white no-underline transition-colors hover:bg-[#D01828]';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-black text-white">
      <SiteHeader />

      <section className="mx-auto w-full max-w-7xl px-4 pb-6 pt-12 text-center sm:px-8 sm:pt-16">
        <p className="m-0 text-[13px] font-bold uppercase tracking-[0.3em] text-[#E0303D]">ZenniFitness</p>
        <h1 className="m-0 mt-3 text-[40px] font-black italic uppercase leading-[0.95] tracking-tight sm:text-[64px]">
          Train it. <span className="text-[#E0303D]">Wear it.</span>
        </h1>
      </section>

      <section className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-4 px-4 pb-16 pt-6 sm:px-8 md:grid-cols-2 md:gap-6">
        {/* Left: the ZenniFit app */}
        <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-gradient-to-b from-[#1a0306] to-[#0a0a0a] px-6 pb-10 pt-10 text-center">
          <div className="relative h-[300px] w-[148px] overflow-hidden rounded-[26px] border-[5px] border-[#222] shadow-[0_30px_60px_-20px_rgba(176,16,32,0.55)] sm:h-[380px] sm:w-[188px]">
            <Image
              src="/app-screens/home-matt.png"
              alt="The ZenniFit app home screen"
              fill
              sizes="188px"
              className="object-cover"
              priority
            />
          </div>
          <p className="m-0 mt-8 text-[13px] font-bold uppercase tracking-[0.3em] text-[#E0303D]">The app</p>
          <h2 className="m-0 mt-2 text-[34px] font-black italic uppercase leading-none tracking-tight sm:text-[44px]">ZenniFit</h2>
          <p className="m-0 mt-3 max-w-sm text-[16px] leading-relaxed text-white/70">
            One AI Coach for your runs, lifts and Hyrox, adapting every plan to how ready you are today.
          </p>
          <Link href="/zennifit" className={`${BUTTON} mt-7`}>
            Preview now
          </Link>
        </div>

        {/* Right: the Zenni Fitness shop */}
        <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-gradient-to-b from-[#1a0306] to-[#0a0a0a] px-6 pb-10 pt-10 text-center">
          <div className="flex h-[300px] w-full items-center justify-center sm:h-[380px]">
            <Image
              src="/dragon-crimson.png"
              alt="The Zenni dragon"
              width={340}
              height={340}
              className="h-auto w-[240px] drop-shadow-[0_20px_40px_rgba(176,16,32,0.45)] sm:w-[340px]"
              priority
            />
          </div>
          <p className="m-0 mt-8 text-[13px] font-bold uppercase tracking-[0.3em] text-[#E0303D]">The shop</p>
          <h2 className="m-0 mt-2 text-[34px] font-black italic uppercase leading-none tracking-tight sm:text-[44px]">Zenni Fitness</h2>
          <p className="m-0 mt-3 max-w-sm text-[16px] leading-relaxed text-white/70">
            Training wear for people who keep showing up. Tees, hoodies, sets and more.
          </p>
          <a href={SHOP_URL} className={`${BUTTON} mt-7`}>
            Shop now
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
