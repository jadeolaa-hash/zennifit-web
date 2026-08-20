'use client';

// app/early-access/page.tsx — early-access / waitlist signup page.
// -----------------------------------------------------------------------------
// Captures name, email and stated interest ahead of launch. Writes to the
// `early_access_signups` Supabase table (anon-insert-only via RLS — see the
// migration SQL in the PR/commit description for the table + policy).
// -----------------------------------------------------------------------------

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArticlesMegaMenu } from '@/components/articles-mega-menu';
import { supabase } from '@/lib/supabaseClient';

const RED = '#B01020';
const HEAD = { fontStyle: 'italic' as const, fontWeight: 800, letterSpacing: '-0.5px' };

const INTERESTS = [
  { value: 'health', label: 'Health' },
  { value: 'running', label: 'Running' },
  { value: 'ai-coaching', label: 'AI Coaching' },
  { value: 'fitness', label: 'Fitness' },
  { value: 'hyrox-crossfit', label: 'Hyrox/Crossfit logging and tracking' },
];

export default function EarlyAccessPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !interest) return;

    setStatus('submitting');
    const { error } = await supabase
      .from('early_access_signups')
      .insert([{ name: name.trim(), email: email.trim(), interest }]);

    if (error) {
      setStatus('error');
      setErrorMessage(
        error.code === '23505'
          ? "That email's already on the list — we'll be in touch."
          : 'Something went wrong — please try again.',
      );
      return;
    }
    setStatus('done');
  };

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

      <section className="mx-auto max-w-md px-6 py-16">
        <p className="mb-3 text-center text-[13px] font-semibold" style={{ color: RED }}>
          Founding members — early access open
        </p>
        <h1 className="m-0 mb-3 text-center text-[32px] leading-[1.15] text-neutral-900" style={HEAD}>
          Get early access
        </h1>
        <p className="m-0 mb-8 text-center text-[15px] leading-relaxed text-neutral-600">
          Tell us who you are and what you care about — we&rsquo;ll email you the moment ZenniFit opens up.
        </p>

        {status === 'done' ? (
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-6 py-10 text-center">
            <p className="m-0 text-[15px] font-semibold text-neutral-900">You&rsquo;re on the list.</p>
            <p className="m-0 mt-1.5 text-sm text-neutral-500">We&rsquo;ll email you as soon as your spot opens up.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-[13px] font-semibold text-neutral-700">Name</label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="rounded-lg border border-neutral-300 px-3.5 py-2.5 text-[15px] text-neutral-900 outline-none transition-colors focus:border-[--red]"
                style={{ ['--red' as string]: RED }}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-[13px] font-semibold text-neutral-700">Email</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                className="rounded-lg border border-neutral-300 px-3.5 py-2.5 text-[15px] text-neutral-900 outline-none transition-colors focus:border-[--red]"
                style={{ ['--red' as string]: RED }}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="interest" className="text-[13px] font-semibold text-neutral-700">
                What are you most interested in?
              </label>
              <select
                id="interest"
                required
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="rounded-lg border border-neutral-300 bg-white px-3.5 py-2.5 text-[15px] text-neutral-900 outline-none transition-colors focus:border-[--red]"
                style={{ ['--red' as string]: RED }}
              >
                <option value="" disabled>Select one&hellip;</option>
                {INTERESTS.map((i) => (
                  <option key={i.value} value={i.value}>{i.label}</option>
                ))}
              </select>
            </div>

            {status === 'error' && (
              <p className="m-0 text-sm text-red-600">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="mt-2 rounded-lg px-6 py-3 text-[15px] font-semibold text-white transition-opacity disabled:opacity-60"
              style={{ background: RED }}
            >
              {status === 'submitting' ? 'Joining…' : 'Join early access'}
            </button>
          </form>
        )}
      </section>

      <footer className="border-t border-neutral-200 px-8 py-8 text-center">
        <span className="text-[13px] text-neutral-500">© 2026 ZenniFitness. All rights reserved.</span>
      </footer>
    </main>
  );
}
