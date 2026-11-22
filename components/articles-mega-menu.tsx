'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { ARTICLE_CATEGORIES } from '@/lib/article-categories';

const RED = '#E0303D';

export function ArticlesMegaMenu({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen(true)}
        onFocus={() => setOpen(true)}
        aria-expanded={open}
        aria-haspopup="true"
        className={className}
      >
        Articles
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-3 w-[560px] max-w-[calc(100vw-2rem)] rounded-2xl border border-white/10 bg-[#0d0d0d] p-5 text-left normal-case tracking-normal shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
            {ARTICLE_CATEGORIES.map(({ slug, label, description, icon: Icon }) => (
              <Link
                key={slug}
                href={`/articles/${slug}`}
                onClick={() => setOpen(false)}
                className="flex items-start gap-3 rounded-xl p-3 no-underline transition-colors hover:bg-white/5"
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px]"
                  style={{ background: 'rgba(224,48,61,0.12)' }}
                >
                  <Icon size={18} color={RED} />
                </div>
                <div>
                  <p className="m-0 text-[14px] font-semibold text-white">{label}</p>
                  <p className="m-0 mt-0.5 text-xs leading-snug text-white/55">{description}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-2 border-t border-white/10 pt-3">
            <Link
              href="/articles"
              onClick={() => setOpen(false)}
              className="text-sm font-semibold no-underline"
              style={{ color: RED }}
            >
              View all articles →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
