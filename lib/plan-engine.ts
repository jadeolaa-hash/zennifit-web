// lib/plan-engine.ts
// -----------------------------------------------------------------------------
// ZenniFit — Hybrid Athlete Periodization & Adaptive Training Engine
// -----------------------------------------------------------------------------

import type { ReadinessScore, ReadinessBand } from './readiness';
import type { HybridSessionType, HybridSession } from '@/types/hybrid';

export type Discipline = 'running' | 'gym' | 'hyrox' | 'compromised_running' | 'dual_progression';

/** A session as written in the athlete's plan, before adaptation. */
export interface PlannedSession {
  discipline: Discipline;
  title: string;              // e.g. "Threshold intervals", "Heavy Posterior + 5k Flush", "Hyrox Sim"
  sessionType?: HybridSessionType;
  intensity: 'recovery' | 'easy' | 'moderate' | 'hard' | 'peak';
  volume: number;             // Duration in minutes
  isKeySession?: boolean;     // Priority workout of the microcycle
  targetRpe?: number;
  stations?: string[];
  dualProgressionFocus?: 'strength_dominant' | 'aerobic_dominant' | 'balanced';
}

export type AdjustmentType =
  | 'green_light'     // proceed as planned at full prescribed pace & loads
  | 'reduce_load'     // trim volume / sub-maximal VBT adjustment
  | 'swap_recovery'   // replace with Zone 1/2 flush & hip/spine mobility
  | 'deload_flag';    // accumulated CNS/muscular fatigue → propose deload

export interface AdaptedSession {
  discipline: Discipline;
  title: string;
  sessionType?: HybridSessionType;
  intensity: PlannedSession['intensity'];
  volume: number;
  durationMinutes?: number;
  targetRpe?: number;
  adjustment: AdjustmentType;
  reason: string;
  volumeDeltaPct: number;
  sections?: {
    name: string;
    description: string;
    durationMins: number;
  }[];
}

const INTENSITY_ORDER: PlannedSession['intensity'][] = [
  'recovery',
  'easy',
  'moderate',
  'hard',
  'peak',
];

function easeIntensity(i: PlannedSession['intensity']): PlannedSession['intensity'] {
  const idx = INTENSITY_ORDER.indexOf(i);
  return INTENSITY_ORDER[Math.max(0, idx - 1)];
}

function isAccumulatedFatigue(recent: ReadinessBand[]): boolean {
  const lows = recent.slice(-3).filter((b) => b === 'low').length;
  return lows >= 3;
}

/**
 * Adapt a planned hybrid session based on athlete daily CNS readiness and autonomic recovery.
 */
export function adaptSession(
  planned: PlannedSession,
  today: ReadinessScore,
  recentBands: ReadinessBand[] = []
): AdaptedSession {
  const base: AdaptedSession = {
    discipline: planned.discipline,
    title: planned.title,
    sessionType: planned.sessionType || 'compromised_running',
    intensity: planned.intensity,
    volume: planned.volume,
    durationMinutes: planned.volume,
    targetRpe: planned.targetRpe || 8.0,
    adjustment: 'green_light',
    reason: '',
    volumeDeltaPct: 0,
    sections: [
      { name: 'Station Warmup & Dynamic Mobilization', description: '90/90 hip switches, ankle dorsiflexion, band pulls', durationMins: 10 },
      { name: 'Main Compromised Block', description: 'Station-to-run intervals with 0-gap Roxzone transitions', durationMins: Math.round(planned.volume * 0.7) },
      { name: 'Lactate Clearance Flush', description: 'Zone 1 nasal breathing recovery jog + thoracic decompression', durationMins: Math.round(planned.volume * 0.15) }
    ]
  };

  // 1) Accumulated Fatigue -> Deload
  if (isAccumulatedFatigue(recentBands)) {
    return {
      ...base,
      intensity: 'easy',
      volume: Math.round(planned.volume * 0.6),
      durationMinutes: Math.round(planned.volume * 0.6),
      targetRpe: 5.5,
      volumeDeltaPct: -0.4,
      adjustment: 'deload_flag',
      reason: '3 consecutive low-readiness days detected. Deloading volume by 40% to prevent neuromuscular overtraining and restore HRV baseline.'
    };
  }

  // 2) High Readiness -> Full Power
  if (today.band === 'high') {
    return {
      ...base,
      adjustment: 'green_light',
      reason: planned.isKeySession
        ? `Readiness ${today.score} (Optimal). Key race-specific session green-lit. Push target splits on stations and maintain sub-4:00/km compromised pace.`
        : `Readiness ${today.score} (Optimal). Nervous system primed. Execute full prescribed volume and power metrics.`
    };
  }

  // 3) Moderate Readiness -> Dial back peak fatigue
  if (today.band === 'moderate') {
    const isHard = planned.intensity === 'hard' || planned.intensity === 'peak';
    if (isHard) {
      return {
        ...base,
        intensity: easeIntensity(planned.intensity),
        volume: Math.round(planned.volume * 0.9),
        durationMinutes: Math.round(planned.volume * 0.9),
        targetRpe: 7.5,
        volumeDeltaPct: -0.1,
        adjustment: 'reduce_load',
        reason: `Readiness ${today.score} (Moderate). CNS capacity slightly reduced. Trimming sled intensity by 10% to protect running economy.`
      };
    }
    return {
      ...base,
      adjustment: 'green_light',
      reason: `Readiness ${today.score} (Moderate). Sub-maximal aerobic session safe to proceed as programmed.`
    };
  }

  // 4) Low Readiness -> Convert to recovery flush
  if (planned.intensity === 'hard' || planned.intensity === 'peak') {
    return {
      ...base,
      title: 'Aerobic Base Flush & Fascial Recovery',
      intensity: 'recovery',
      volume: Math.round(planned.volume * 0.5),
      durationMinutes: Math.round(planned.volume * 0.5),
      targetRpe: 4.5,
      volumeDeltaPct: -0.5,
      adjustment: 'swap_recovery',
      reason: `Readiness ${today.score} (Low). High systemic or muscular fatigue. Swapping compromised high-power stations for Zone 2 nasal flush and posterior chain mobility.`
    };
  }

  return {
    ...base,
    intensity: easeIntensity(planned.intensity),
    volume: Math.round(planned.volume * 0.75),
    durationMinutes: Math.round(planned.volume * 0.75),
    targetRpe: 6.0,
    volumeDeltaPct: -0.25,
    adjustment: 'reduce_load',
    reason: `Readiness ${today.score} (Low). Scaling session volume by 25% to avoid digging into structural fatigue.`
  };
}

export async function getPlannedSession(_userId: string): Promise<PlannedSession> {
  return {
    discipline: 'hyrox',
    sessionType: 'compromised_running',
    title: 'Compromised Running Engine: Heavy Sled + 1km Threshold Repeats',
    intensity: 'hard',
    volume: 65,
    isKeySession: true,
    targetRpe: 8.5,
    stations: ['50m Sled Push (152kg)', '1km Compromised Run @ 3:55', '50m Sled Pull (103kg)', '1km Run @ 4:02'],
    dualProgressionFocus: 'balanced'
  };
}
