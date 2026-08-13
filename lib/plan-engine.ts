// lib/plan-engine.ts
// -----------------------------------------------------------------------------
// ZenniFit — Plan engine (the ENGINE side of the closed loop).
//
// Takes the athlete's planned session + today's Readiness (from lib/readiness.ts)
// and returns TODAY'S adapted prescription, with a plain-language reason. This is
// the thing no competitor does: it reshapes the session to your recovery, across
// running, gym AND Hyrox, and it stays legible so the AI Coach can explain it.
//
// v1 keeps the rules deliberately simple and transparent. Sophistication (per-
// zone pacing, interference modeling, block periodization) layers on top later
// without changing this contract.
// -----------------------------------------------------------------------------

import type { ReadinessScore, ReadinessBand } from './readiness';

export type Discipline = 'running' | 'gym' | 'hyrox';

/** A session as written in the athlete's plan, before adaptation. */
export interface PlannedSession {
  discipline: Discipline;
  title: string;              // e.g. "Threshold intervals", "Push day", "Hyrox sim"
  intensity: 'recovery' | 'easy' | 'moderate' | 'hard' | 'peak';
  // Generic "volume" knob the UI/plan uses (minutes, sets, or km — discipline decides).
  volume: number;
  isKeySession?: boolean;     // true for the week's priority workout (race-specific)
}

export type AdjustmentType =
  | 'green_light'     // proceed as planned
  | 'reduce_load'     // same session, dialed back
  | 'swap_recovery'   // replace with mobility/recovery
  | 'deload_flag';    // pattern of low readiness → propose a lighter week

export interface AdaptedSession {
  discipline: Discipline;
  title: string;
  intensity: PlannedSession['intensity'];
  volume: number;
  adjustment: AdjustmentType;
  reason: string;             // plain-language "why", shown in-app + fed to AI Coach
  volumeDeltaPct: number;     // e.g. -0.10 for a 10% cut (0 = unchanged)
}

// -----------------------------------------------------------------------------
// Adaptation rules
// -----------------------------------------------------------------------------

const INTENSITY_ORDER: PlannedSession['intensity'][] = [
  'recovery',
  'easy',
  'moderate',
  'hard',
  'peak',
];

/** Step an intensity down one notch (never below 'recovery'). */
function easeIntensity(i: PlannedSession['intensity']): PlannedSession['intensity'] {
  const idx = INTENSITY_ORDER.indexOf(i);
  return INTENSITY_ORDER[Math.max(0, idx - 1)];
}

/** Detects accumulated fatigue: repeated low readiness across recent days. */
function isAccumulatedFatigue(recent: ReadinessBand[]): boolean {
  const lows = recent.slice(-3).filter((b) => b === 'low').length;
  return lows >= 3;
}

/**
 * Adapt a planned session to today's readiness.
 *
 * @param planned  today's session from the plan
 * @param today    today's ReadinessScore (from computeReadiness)
 * @param recentBands  optional trailing readiness bands (oldest→newest) for
 *                     fatigue detection; include today's as the last element
 */
export function adaptSession(
  planned: PlannedSession,
  today: ReadinessScore,
  recentBands: ReadinessBand[] = [],
): AdaptedSession {
  const base = {
    discipline: planned.discipline,
    title: planned.title,
    intensity: planned.intensity,
    volume: planned.volume,
    volumeDeltaPct: 0,
  };

  // 1) Accumulated fatigue overrides a single day — propose a deload.
  if (isAccumulatedFatigue(recentBands)) {
    return {
      ...base,
      intensity: 'easy',
      volume: Math.round(planned.volume * 0.6),
      volumeDeltaPct: -0.4,
      adjustment: 'deload_flag',
      reason:
        'Three low-readiness days in a row — that\'s accumulated fatigue, not a bad night. ' +
        'Pulling this week back so you actually absorb the training.',
    };
  }

  // 2) High readiness — green-light, protect the key session especially.
  if (today.band === 'high') {
    return {
      ...base,
      adjustment: 'green_light',
      reason: planned.isKeySession
        ? 'You\'re recovered — this is your key session, so let\'s hit the paces in full.'
        : 'Recovered and ready. Session goes as planned.',
    };
  }

  // 3) Moderate readiness — trim hard/peak days; leave easy days alone.
  if (today.band === 'moderate') {
    const isHard = planned.intensity === 'hard' || planned.intensity === 'peak';
    if (isHard) {
      return {
        ...base,
        intensity: easeIntensity(planned.intensity),
        volume: Math.round(planned.volume * 0.9),
        volumeDeltaPct: -0.1,
        adjustment: 'reduce_load',
        reason:
          'Not fully fresh today — trimming the intensity a notch and ~10% of volume so ' +
          'you still get the work in without digging a hole.',
      };
    }
    return { ...base, adjustment: 'green_light', reason: 'A bit worn, but this session is easy enough to proceed as planned.' };
  }

  // 4) Low readiness — biggest intervention. Swap hard days to recovery,
  //    dial back everything else. Discipline-aware messaging.
  const disciplineNote: Record<Discipline, string> = {
    running: 'Swapping today\'s run for an easy Zone 2 flush plus mobility.',
    gym: 'Same movement patterns, but lighter loads and lower volume — protect the joints and CNS today.',
    hyrox: 'Skipping the compromised-running intensity today; keeping a light technique + mobility block so the stations still get touched.',
  };

  if (planned.intensity === 'hard' || planned.intensity === 'peak') {
    return {
      ...base,
      title: planned.discipline === 'gym' ? planned.title : 'Recovery + mobility',
      intensity: 'recovery',
      volume: Math.round(planned.volume * 0.5),
      volumeDeltaPct: -0.5,
      adjustment: 'swap_recovery',
      reason: `Under-recovered today. ${disciplineNote[planned.discipline]} You\'ll come back stronger for the key session.`,
    };
  }

  return {
    ...base,
    intensity: easeIntensity(planned.intensity),
    volume: Math.round(planned.volume * 0.75),
    volumeDeltaPct: -0.25,
    adjustment: 'reduce_load',
    reason: `Low readiness — keeping today gentle (~25% less) so it aids recovery instead of adding stress.`,
  };
}

// -----------------------------------------------------------------------------
// Hooks for the rest of the loop  —  wire up at Phase 6 (build spec §5.2–5.4)
// -----------------------------------------------------------------------------

/**
 * TODO(Phase 6): fetch today's PlannedSession for `userId` from the active plan.
 *   - running: lib plan / free tier
 *   - gym: current mesocycle
 *   - hyrox: lib/hyrox.ts (Platinum-gated — check lib/subscription.ts first)
 */
export async function getPlannedSession(_userId: string): Promise<PlannedSession> {
  // return await supabase.from('workouts').select(...).eq('user_id', userId)...
  return { discipline: 'hyrox', title: 'Hyrox — Run + Sled block', intensity: 'hard', volume: 60, isKeySession: true };
}

/**
 * TODO(Phase 6): hand the AdaptedSession + today's readiness factors to the AI
 * Coach (lib/anthropic.ts) to generate the in-the-moment narrative. Keep the
 * Anthropic key server-side; never expose it to the client.
 *
 * Suggested prompt shape: "Here is the athlete's readiness breakdown and the
 * session we adapted to it. In 2-3 sentences, as their coach, explain the change
 * and keep them motivated toward their goal."
 */
export async function coachNarrative(
  _adapted: AdaptedSession,
  _readiness: ReadinessScore,
): Promise<string> {
  // return await callAnthropic({ system: COACH_SYSTEM, user: buildPrompt(adapted, readiness) })
  return _adapted.reason; // safe fallback: the engine's own reason string
}
