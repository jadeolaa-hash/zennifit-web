// Shared black-and-red header for the ZenniFitness site: home, ZenniFit, Shop, Articles.

import Link from 'next/link';
import Image from 'next/image';
import { ArticlesMegaMenu } from '@/components/articles-mega-menu';

export const SHOP_URL = 'https://shop.zennifitness.com';

const LINK = 'text-[15px] font-semibold uppercase tracking-[0.08em] text-white/75 no-underline transition-colors hover:text-white';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 sm:px-8 sm:py-4">
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <Image src="/zf-icon.png" alt="" width={36} height={36} priority />
          <span className="text-[20px] font-black italic uppercase tracking-tight text-white">
            Zenni<span className="text-[#E0303D]">Fitness</span>
          </span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-5 sm:gap-8">
          <Link href="/zennifit" className={LINK}>ZenniFit</Link>
          <a href={SHOP_URL} className={LINK}>Shop</a>
          <ArticlesMegaMenu className={`flex items-center gap-1 ${LINK}`} />
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black px-4 py-8 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-[13px] text-white/50 sm:flex-row">
        <span>© 2026 ZenniFitness. All rights reserved.</span>
        <span className="flex gap-5">
          <Link href="/zennifit" className="text-white/60 no-underline hover:text-white">ZenniFit</Link>
          <a href={SHOP_URL} className="text-white/60 no-underline hover:text-white">Shop</a>
          <Link href="/articles" className="text-white/60 no-underline hover:text-white">Articles</Link>
        </span>
      </div>
    </footer>
  );
}
