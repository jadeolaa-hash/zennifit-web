import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ArticlesMegaMenu } from '@/components/articles-mega-menu';
import { ARTICLE_CATEGORIES } from '@/lib/article-categories';

const RED = '#B01020';
const HEAD = { fontStyle: 'italic' as const, fontWeight: 800, letterSpacing: '-0.5px' };

export const metadata: Metadata = {
  title: 'Articles — ZenniFit',
  description: 'Health, diet, fitness, running, Crossfit and Hyrox articles from ZenniFit.',
};

export default function ArticlesPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-800">
      <nav className="flex items-center justify-between border-b border-neutral-200 px-8 py-4">
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <Image src="/zf-icon.png" alt="ZenniFitness" width={36} height={36} priority />
          <span className="text-[19px] text-neutral-900" style={HEAD}>ZenniFitness</span>
        </Link>
        <div className="hidden items-center gap-6 text-sm text-neutral-600 md:flex">
          <Link href="/zennifit" className="transition-colors hover:text-neutral-900">ZenniFit</Link>
          <ArticlesMegaMenu />
        </div>
      </nav>

      <section className="mx-auto max-w-3xl px-6 pb-8 pt-14 text-center">
        <p className="mb-3 text-[13px] font-semibold" style={{ color: RED }}>ZenniFit Articles</p>
        <h1 className="m-0 mb-4 text-[38px] leading-[1.15] text-neutral-900" style={HEAD}>
          Training knowledge, by discipline
        </h1>
        <p className="mx-auto max-w-xl text-[16px] leading-relaxed text-neutral-600">
          Guides and explainers across health, diet, fitness, running, Crossfit and Hyrox — written
          to back up what the AI Coach tells you in the app.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLE_CATEGORIES.map(({ slug, label, description, icon: Icon }) => (
            <Link
              key={slug}
              href={`/articles/${slug}`}
              className="group rounded-2xl border border-neutral-200 bg-white p-6 no-underline transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className="mb-4 flex h-11 w-11 items-center justify-center rounded-[12px]"
                style={{ background: 'rgba(176,16,32,0.07)' }}
              >
                <Icon size={22} color={RED} />
              </div>
              <p className="m-0 mb-1.5 text-[17px] font-semibold text-neutral-900">{label}</p>
              <p className="m-0 text-[13.5px] leading-relaxed text-neutral-500">{description}</p>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-neutral-200 px-8 py-8 text-center">
        <span className="text-[13px] text-neutral-500">© 2026 ZenniFitness. All rights reserved.</span>
      </footer>
    </main>
  );
}
