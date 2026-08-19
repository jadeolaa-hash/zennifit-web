import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { ArticlesMegaMenu } from '@/components/articles-mega-menu';
import { ARTICLE_CATEGORIES } from '@/lib/article-categories';

const RED = '#B01020';
const HEAD = { fontStyle: 'italic' as const, fontWeight: 800, letterSpacing: '-0.5px' };

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
          style={{ background: 'rgba(176,16,32,0.07)' }}
        >
          <Icon size={24} color={RED} />
        </div>
        <h1 className="m-0 mb-3 text-[34px] leading-[1.15] text-neutral-900" style={HEAD}>{category.label}</h1>
        <p className="m-0 mb-10 max-w-xl text-[16px] leading-relaxed text-neutral-600">{category.description}</p>

        <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 px-6 py-14 text-center">
          <p className="m-0 text-[15px] font-semibold text-neutral-700">Articles coming soon</p>
          <p className="m-0 mt-1.5 text-sm text-neutral-500">
            We&rsquo;re writing the first {category.label.toLowerCase()} guides — check back soon.
          </p>
        </div>
      </section>

      <footer className="border-t border-neutral-200 px-8 py-8 text-center">
        <span className="text-[13px] text-neutral-500">© 2026 ZenniFitness. All rights reserved.</span>
      </footer>
    </main>
  );
}
