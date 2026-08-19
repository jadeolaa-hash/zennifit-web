'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { ARTICLE_CATEGORIES } from '@/lib/article-categories';

const RED = '#B01020';

export function ArticlesMegaMenu() {
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
        className="flex items-center gap-1 text-sm text-neutral-600 transition-colors hover:text-neutral-900"
      >
        Articles
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-50 mt-3 w-[560px] max-w-[90vw] -translate-x-1/2 rounded-2xl border border-neutral-200 bg-white p-5 text-left shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
          <div className="grid grid-cols-2 gap-1">
            {ARTICLE_CATEGORIES.map(({ slug, label, description, icon: Icon }) => (
              <Link
                key={slug}
                href={`/articles/${slug}`}
                onClick={() => setOpen(false)}
                className="flex items-start gap-3 rounded-xl p-3 no-underline transition-colors hover:bg-neutral-50"
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px]"
                  style={{ background: 'rgba(176,16,32,0.07)' }}
                >
                  <Icon size={18} color={RED} />
                </div>
                <div>
                  <p className="m-0 text-[13.5px] font-semibold text-neutral-900">{label}</p>
                  <p className="m-0 mt-0.5 text-xs leading-snug text-neutral-500">{description}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-2 border-t border-neutral-100 pt-3">
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
