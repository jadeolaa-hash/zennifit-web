import Link from 'next/link';
import type { Metadata } from 'next';
import { SiteHeader, SiteFooter } from '@/components/site-header';
import { ARTICLE_CATEGORIES } from '@/lib/article-categories';

const RED = '#E0303D';
const HEAD = { fontStyle: 'italic' as const, fontWeight: 900, letterSpacing: '-0.5px' };

export const metadata: Metadata = {
  title: 'Articles — ZenniFit',
  description: 'Health, diet, fitness, running, Crossfit and Hyrox articles from ZenniFit.',
};

export default function ArticlesPage() {
  return (
    <main className="min-h-screen bg-black text-white/80">
      <SiteHeader />

      <section className="mx-auto max-w-3xl px-6 pb-8 pt-14 text-center">
        <p className="mb-3 text-[13px] font-semibold" style={{ color: RED }}>ZenniFit Articles</p>
        <h1 className="m-0 mb-4 text-[38px] leading-[1.15] text-white" style={HEAD}>
          Training knowledge, by discipline
        </h1>
        <p className="mx-auto max-w-xl text-[16px] leading-relaxed text-white/70">
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
              className="zf-card group rounded-2xl border border-white/10 bg-[#0d0d0d] p-6 no-underline"
            >
              <div
                className="mb-4 flex h-11 w-11 items-center justify-center rounded-[12px]"
                style={{ background: 'rgba(224,48,61,0.12)' }}
              >
                <Icon size={22} color={RED} />
              </div>
              <p className="m-0 mb-1.5 text-[17px] font-semibold text-white">{label}</p>
              <p className="m-0 text-[13.5px] leading-relaxed text-white/55">{description}</p>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
