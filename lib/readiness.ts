// lib/readiness.ts
// -----------------------------------------------------------------------------
// ZenniFit — Readiness scoring (the INPUT side of the closed loop).
//
// Turns raw recovery signals (sleep, resting HR, optional HRV, and a 10-second
// morning check-in) into a single explainable 0–100 Readiness score plus the
// factor breakdown that produced it. The plan engine (lib/plan-engine.ts)
// consumes this to reshape today's session.
//
// Design principles:
//   • Transparent, not a black box — every score ships with its contributing
//     factors so the AI Coach can explain "why" to the athlete.
//   • Pure core — computeReadiness() has no I/O, so it's trivially testable.
//   • Thin I/O layer — Supabase reads/writes are isolated at the bottom with
//     TODOs, so this file drops into the repo without assuming your client setup.
// -----------------------------------------------------------------------------

/** A rolling personal baseline, computed from the athlete's recent history. */
export interface Baseline {
  restingHrBpm: number;      // e.g. 30-day median resting HR
  hrvMs?: number;            // e.g. 30-day median HRV (optional — not all devices)
  typicalSleepHours: number; // the athlete's normal sleep need, e.g. 7.5
}

/** Last night's inputs. Any field may be missing; scoring degrades gracefully. */
export interface ReadinessInputs {
  sleepHours?: number;        // total sleep duration in hours
  sleepQuality?: number;      // 0–100 if the wearable provides it
  restingHrBpm?: number;      // this morning's resting HR
  hrvMs?: number;             // this morning's HRV (optional)
  // 10-second subjective check-in (1 = terrible, 5 = great):
  soreness?: 1 | 2 | 3 | 4 | 5; // 5 = no soreness
  energy?: 1 | 2 | 3 | 4 | 5;   // 5 = full of energy
}

export interface ReadinessFactor {
  key: 'sleep' | 'restingHr' | 'hrv' | 'subjective';
  label: string;      // human-readable, for the UI + AI Coach
  score: number;      // this factor's 0–100 contribution
  weight: number;     // how much it counted toward the final score
  note: string;       // plain-language explanation
}

export type ReadinessBand = 'low' | 'moderate' | 'high';

export interface ReadinessScore {
  score: number;              // final 0–100
  band: ReadinessBand;        // low <50, moderate 50–74, high >=75
  factors: ReadinessFactor[]; // the breakdown that produced the score
  summary: string;            // one-line plain-language summary
  computedAt: string;         // ISO timestamp
}

// -----------------------------------------------------------------------------
// Pure scoring core
// -----------------------------------------------------------------------------

const clamp = (n: number, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, n));

/** Score sleep against the athlete's own typical need, blended with quality. */
function scoreSleep(inputs: ReadinessInputs, baseline: Baseline): number | null {
  if (inputs.sleepHours == null && inputs.sleepQuality == null) return null;
  let durationScore: number | null = null;
  if (inputs.sleepHours != null) {
    // 100 at/above typical need; falls off ~15 points per hour short.
    const deficit = baseline.typicalSleepHours - inputs.sleepHours;
    durationScore = clamp(100 - Math.max(0, deficit) * 15);
  }
  if (durationScore != null && inputs.sleepQuality != null) {
    return clamp(durationScore * 0.6 + inputs.sleepQuality * 0.4);
  }
  return durationScore ?? inputs.sleepQuality!;
}

/** Elevated resting HR vs baseline is a classic under-recovery signal. */
function scoreRestingHr(inputs: ReadinessInputs, baseline: Baseline): number | null {
  if (inputs.restingHrBpm == null) return null;
  // Each bpm above baseline costs ~8 points; at/under baseline scores 100.
  const delta = inputs.restingHrBpm - baseline.restingHrBpm;
  return clamp(100 - Math.max(0, delta) * 8);
}

/** Suppressed HRV vs baseline signals fatigue (only if the device reports it). */
function scoreHrv(inputs: ReadinessInputs, baseline: Baseline): number | null {
  if (inputs.hrvMs == null || baseline.hrvMs == null) return null;
  // Ratio of today's HRV to baseline, centered so baseline ≈ 80.
  const ratio = inputs.hrvMs / baseline.hrvMs;
  return clamp(ratio * 80);
}

/** The 10-second morning check-in — cheap but high-signal. */
function scoreSubjective(inputs: ReadinessInputs): number | null {
  const vals = [inputs.soreness, inputs.energy].filter(
    (v): v is 1 | 2 | 3 | 4 | 5 => v != null,
  );
  if (vals.length === 0) return null;
  const avg = vals.reduce((a, b) => a + b, 0) / vals.length; // 1–5
  return clamp(((avg - 1) / 4) * 100);
}

function bandFor(score: number): ReadinessBand {
  if (score >= 75) return 'high';
  if (score >= 50) return 'moderate';
  return 'low';
}

/**
 * Compute a readiness score from last night's signals and the athlete's baseline.
 * Missing signals are skipped and the remaining weights are re-normalized, so a
 * user with only sleep + a check-in still gets a sensible score.
 */
export function computeReadiness(
  inputs: ReadinessInputs,
  baseline: Baseline,
): ReadinessScore {
  // Base weights; re-normalized across whichever factors are present.
  const candidates: Array<{
    key: ReadinessFactor['key'];
    label: string;
    weight: number;
    score: number | null;
    describe: (s: number) => string;
  }> = [
    {
      key: 'sleep',
      label: 'Sleep',
      weight: 0.4,
      score: scoreSleep(inputs, baseline),
      describe: (s) =>
        s >= 75 ? 'Well rested.' : s >= 50 ? 'A little short on sleep.' : 'Under-slept.',
    },
    {
      key: 'restingHr',
      label: 'Resting HR',
      weight: 0.25,
      score: scoreRestingHr(inputs, baseline),
      describe: (s) =>
        s >= 75 ? 'HR at baseline.' : s >= 50 ? 'HR slightly elevated.' : 'HR notably elevated.',
    },
    {
      key: 'hrv',
      label: 'HRV',
      weight: 0.2,
      score: scoreHrv(inputs, baseline),
      describe: (s) =>
        s >= 75 ? 'HRV steady.' : s >= 50 ? 'HRV a touch low.' : 'HRV suppressed.',
    },
    {
      key: 'subjective',
      label: 'How you feel',
      weight: 0.15,
      score: scoreSubjective(inputs),
      describe: (s) =>
        s >= 75 ? 'Feeling good.' : s >= 50 ? 'A bit worn.' : 'Feeling beat up.',
    },
  ];

  const present = candidates.filter((c) => c.score != null);

  // Fallback: no data at all → neutral moderate score, flagged in the summary.
  if (present.length === 0) {
    return {
      score: 60,
      band: 'moderate',
      factors: [],
      summary: 'No recovery data yet — assuming a normal day. Connect a wearable for a real score.',
      computedAt: new Date().toISOString(),
    };
  }

  const totalWeight = present.reduce((a, c) => a + c.weight, 0);
  let weighted = 0;
  const factors: ReadinessFactor[] = present.map((c) => {
    const w = c.weight / totalWeight; // re-normalized
    weighted += (c.score as number) * w;
    return {
      key: c.key,
      label: c.label,
      score: Math.round(c.score as number),
      weight: Number(w.toFixed(2)),
      note: c.describe(c.score as number),
    };
  });

  const score = Math.round(clamp(weighted));
  const band = bandFor(score);
  const summary =
    band === 'high'
      ? `Readiness ${score} — recovered and ready to push.`
      : band === 'moderate'
      ? `Readiness ${score} — okay, but not fully fresh.`
      : `Readiness ${score} — under-recovered. Ease off today.`;

  return { score, band, factors, summary, computedAt: new Date().toISOString() };
}

// -----------------------------------------------------------------------------
// Thin Supabase I/O layer  —  wire these up at Phase 6 (see build spec §5.1)
// -----------------------------------------------------------------------------

/**
 * TODO(Phase 6): read the latest wearable rows for `userId` and derive a Baseline.
 *   - pull ~30 days from `wearables` + `body_metrics`
 *   - compute medians for resting HR / HRV, and the athlete's typical sleep need
 * Return a sensible default until real history exists.
 */
export async function getBaseline(_userId: string): Promise<Baseline> {
  // return await supabase.from('wearables')... (compute medians)
  return { restingHrBpm: 55, typicalSleepHours: 7.5 };
}

/**
 * TODO(Phase 6): read this morning's signals for `userId` from `wearables`
 * plus the subjective check-in the app captured on the Home screen.
 */
export async function getTodayInputs(_userId: string): Promise<ReadinessInputs> {
  // return await supabase.from('wearables').select(...).eq('user_id', userId)...
  return {};
}

/**
 * TODO(Phase 6): persist the computed score so it's explainable and history
 * builds up. Store into `ai_insights` (or a dedicated `readiness_scores` table)
 * WITH the factor breakdown, not just the number.
 */
export async function saveReadiness(_userId: string, _score: ReadinessScore): Promise<void> {
  // await supabase.from('ai_insights').insert({ user_id, type: 'readiness', payload: score })
}

/** Convenience: full daily pipeline for a user. */
export async function getDailyReadiness(userId: string): Promise<ReadinessScore> {
  const [baseline, inputs] = await Promise.all([getBaseline(userId), getTodayInputs(userId)]);
  const score = computeReadiness(inputs, baseline);
  await saveReadiness(userId, score);
  return score;
}
