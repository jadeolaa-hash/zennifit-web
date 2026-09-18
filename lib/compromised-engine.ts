// lib/compromised-engine.ts
// -----------------------------------------------------------------------------
// ZenniFit — Compromised Running & Fatigue Degradation Engine
// -----------------------------------------------------------------------------

import type { CompromisedRunSplit, HyroxStationType } from '@/types/hybrid';

export interface CompromisedAnalysisSummary {
  avgCompromisedPaceSecPerKm: number;
  freshBaselinePaceSecPerKm: number;
  meanPaceDegradationSecPerKm: number;
  meanPaceDegradationPct: number;
  compromisedRunningIndex: number; // 0 - 100 score
  worstCompromisedStation: {
    stationType: HyroxStationType | string;
    degradationSec: number;
    degradationPct: number;
  };
  fastestRecoveryStation: {
    stationType: HyroxStationType | string;
    clearanceSec: number;
  };
  lactateClearanceEfficiency: 'elite' | 'high' | 'moderate' | 'compromised';
  recommendations: string[];
}

/**
 * Calculates the athlete's Compromised Running Index (CRI) from a set of splits.
 * CRI evaluates how closely an athlete holds their fresh aerobic threshold pace
 * across 8 compromised intervals.
 * 
 * Score Formula:
 * CRI = max(0, min(100, 100 - (mean_degradation_pct * 2.2)))
 */
export function analyzeCompromisedSplits(
  splits: CompromisedRunSplit[],
  freshBaselinePaceSecPerKm: number = 240 // 4:00/km default
): CompromisedAnalysisSummary {
  if (!splits || splits.length === 0) {
    return {
      avgCompromisedPaceSecPerKm: freshBaselinePaceSecPerKm,
      freshBaselinePaceSecPerKm,
      meanPaceDegradationSecPerKm: 0,
      meanPaceDegradationPct: 0,
      compromisedRunningIndex: 100,
      worstCompromisedStation: { stationType: 'none', degradationSec: 0, degradationPct: 0 },
      fastestRecoveryStation: { stationType: 'none', clearanceSec: 0 },
      lactateClearanceEfficiency: 'elite',
      recommendations: ['Log compromised run intervals to calculate fatigue index.']
    };
  }

  let totalDurationSec = 0;
  let totalDistanceM = 0;
  let maxDegradation = -Infinity;
  let worstStation: HyroxStationType | string = 'none';
  let worstDegPct = 0;

  splits.forEach((split) => {
    totalDurationSec += split.actualDurationSec;
    totalDistanceM += split.distanceMeters;
    
    const deg = split.paceSecPerKm - split.freshBaselinePaceSecPerKm;
    if (deg > maxDegradation) {
      maxDegradation = deg;
      worstStation = split.precedingStationType;
      worstDegPct = split.paceDegradationPct;
    }
  });

  const avgPaceSec = Math.round((totalDurationSec / totalDistanceM) * 1000);
  const meanDegSec = avgPaceSec - freshBaselinePaceSecPerKm;
  const meanDegPct = Number(((meanDegSec / freshBaselinePaceSecPerKm) * 100).toFixed(1));

  // CRI: 0-100 scale
  const criScore = Math.max(0, Math.min(100, Math.round(100 - (meanDegPct * 2.0))));

  let clearance: 'elite' | 'high' | 'moderate' | 'compromised' = 'moderate';
  if (criScore >= 90) clearance = 'elite';
  else if (criScore >= 80) clearance = 'high';
  else if (criScore >= 65) clearance = 'moderate';
  else clearance = 'compromised';

  const recommendations: string[] = [];
  if (worstStation === 'sled_push_50m' || worstStation === 'sandbag_lunges_100m') {
    recommendations.push('High quad-lactate accumulation detected. Prescribe 400m fast-cadence cadence drills immediately after heavy sled/lunge repeats.');
  }
  if (worstStation === 'burpee_broad_jump_80m') {
    recommendations.push('Cardiorespiratory spike post-BBJ. Increase Zone 3 threshold work to accelerate HR stabilization in the initial 200m of run.');
  }
  if (meanDegPct > 15) {
    recommendations.push('Compromised pace degradation exceeds 15%. Prioritize dual-progression endurance blocks (e.g. 5x 1km @ race pace + 100m lunge/sled sets).');
  }

  return {
    avgCompromisedPaceSecPerKm: avgPaceSec,
    freshBaselinePaceSecPerKm,
    meanPaceDegradationSecPerKm: meanDegSec,
    meanPaceDegradationPct: meanDegPct,
    compromisedRunningIndex: criScore,
    worstCompromisedStation: {
      stationType: worstStation,
      degradationSec: maxDegradation,
      degradationPct: worstDegPct
    },
    fastestRecoveryStation: {
      stationType: 'skierg_1000m',
      clearanceSec: Math.max(0, meanDegSec - 5)
    },
    lactateClearanceEfficiency: clearance,
    recommendations: recommendations.length > 0 ? recommendations : ['Excellent running economy under fatigue. Maintain current microcycle volume.']
  };
}

/** Format seconds into mm:ss */
export function formatPace(sec: number): string {
  const mins = Math.floor(sec / 60);
  const remainder = Math.round(sec % 60);
  return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
}
