import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { SiteHeader, SiteFooter } from '@/components/site-header';
import { ARTICLE_CATEGORIES } from '@/lib/article-categories';

const RED = '#E0303D';
const HEAD = { fontStyle: 'italic' as const, fontWeight: 900, letterSpacing: '-0.5px' };

type Params = Promise<{ category: string }>;

export function generateStaticParams() {
  return ARTICLE_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { category: slug } = await params;
  const category = ARTICLE_CATEGORIES.find((c) => c.slug === slug);
  if (!category) return {};
  return {
    title: `${category.label} Articles — ZenniFit`,
    description: category.description,
  };
}

export default async function ArticleCategoryPage({ params }: { params: Params }) {
  const { category: slug } = await params;
  const category = ARTICLE_CATEGORIES.find((c) => c.slug === slug);
  if (!category) notFound();

  const Icon = category.icon;

  return (
    <main className="min-h-screen bg-black text-white/80">
      <SiteHeader />

      <section className="mx-auto max-w-3xl px-6 pb-16 pt-14">
        <Link
          href="/articles"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold no-underline"
          style={{ color: RED }}
        >
          <ArrowLeft size={15} /> All articles
        </Link>

        <div
          className="mb-4 flex h-12 w-12 items-center justify-center rounded-[14px]"
          style={{ background: 'rgba(224,48,61,0.12)' }}
        >
          <Icon size={24} color={RED} />
        </div>
        <h1 className="m-0 mb-3 text-[34px] leading-[1.15] text-white" style={HEAD}>{category.label}</h1>
        <p className="m-0 mb-10 max-w-xl text-[16px] leading-relaxed text-white/70">{category.description}</p>

        <div className="rounded-2xl border border-dashed border-white/20 bg-white/[0.03] px-6 py-14 text-center">
          <p className="m-0 text-[15px] font-semibold text-white/85">Articles coming soon</p>
          <p className="m-0 mt-1.5 text-sm text-white/55">
            We&rsquo;re writing the first {category.label.toLowerCase()} guides — check back soon.
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
