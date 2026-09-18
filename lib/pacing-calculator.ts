// lib/pacing-calculator.ts
// -----------------------------------------------------------------------------
// ZenniFit — Hyrox Race Simulation & Split Pacing Calculator
// -----------------------------------------------------------------------------

import type { HyroxDivision, HyroxStationType, StationStandard } from '@/types/hybrid';

export const HYROX_STATION_STANDARDS: StationStandard[] = [
  {
    type: 'skierg_1000m',
    name: '1,000m SkiErg',
    category: 'ergometer',
    distanceOrReps: '1,000m',
    weights: {
      open_men: 'Damper 6',
      open_women: 'Damper 5',
      pro_men: 'Damper 6',
      pro_women: 'Damper 5',
      doubles_men: 'Damper 6',
      doubles_women: 'Damper 5',
      doubles_mixed: 'Damper 6',
    },
    targetElitePaceSec: 210, // 3:30
    targetProPaceSec: 235,   // 3:55
    targetOpenPaceSec: 260,  // 4:20
    iconName: 'Activity',
  },
  {
    type: 'sled_push_50m',
    name: '50m Sled Push',
    category: 'heavy_sled',
    distanceOrReps: '4 x 12.5m (50m)',
    weights: {
      open_men: '152 kg (incl. sled)',
      open_women: '102 kg (incl. sled)',
      pro_men: '202 kg (incl. sled)',
      pro_women: '152 kg (incl. sled)',
      doubles_men: '152 kg (incl. sled)',
      doubles_women: '102 kg (incl. sled)',
      doubles_mixed: '152 kg (incl. sled)',
    },
    targetElitePaceSec: 135, // 2:15
    targetProPaceSec: 175,   // 2:55
    targetOpenPaceSec: 220,  // 3:40
    iconName: 'Zap',
  },
  {
    type: 'sled_pull_50m',
    name: '50m Sled Pull',
    category: 'heavy_sled',
    distanceOrReps: '4 x 12.5m (50m)',
    weights: {
      open_men: '103 kg (incl. sled)',
      open_women: '78 kg (incl. sled)',
      pro_men: '153 kg (incl. sled)',
      pro_women: '103 kg (incl. sled)',
      doubles_men: '103 kg (incl. sled)',
      doubles_women: '78 kg (incl. sled)',
      doubles_mixed: '103 kg (incl. sled)',
    },
    targetElitePaceSec: 180, // 3:00
    targetProPaceSec: 230,   // 3:50
    targetOpenPaceSec: 290,  // 4:50
    iconName: 'Flame',
  },
  {
    type: 'burpee_broad_jump_80m',
    name: '80m Burpee Broad Jump',
    category: 'bodyweight_power',
    distanceOrReps: '80 meters',
    weights: {
      open_men: 'Bodyweight',
      open_women: 'Bodyweight',
      pro_men: 'Bodyweight',
      pro_women: 'Bodyweight',
      doubles_men: 'Bodyweight',
      doubles_women: 'Bodyweight',
      doubles_mixed: 'Bodyweight',
    },
    targetElitePaceSec: 195, // 3:15
    targetProPaceSec: 245,   // 4:05
    targetOpenPaceSec: 320,  // 5:20
    iconName: 'TrendingUp',
  },
  {
    type: 'rowing_1000m',
    name: '1,000m Rowing',
    category: 'ergometer',
    distanceOrReps: '1,000m',
    weights: {
      open_men: 'Damper 6',
      open_women: 'Damper 5',
      pro_men: 'Damper 6',
      pro_women: 'Damper 5',
      doubles_men: 'Damper 6',
      doubles_women: 'Damper 5',
      doubles_mixed: 'Damper 6',
    },
    targetElitePaceSec: 215, // 3:35
    targetProPaceSec: 240,   // 4:00
    targetOpenPaceSec: 275,  // 4:35
    iconName: 'Activity',
  },
  {
    type: 'farmers_carry_200m',
    name: '200m Farmers Carry',
    category: 'loaded_carry',
    distanceOrReps: '200 meters',
    weights: {
      open_men: '2 x 24 kg',
      open_women: '2 x 16 kg',
      pro_men: '2 x 32 kg',
      pro_women: '2 x 24 kg',
      doubles_men: '2 x 24 kg',
      doubles_women: '2 x 16 kg',
      doubles_mixed: '2 x 24 kg',
    },
    targetElitePaceSec: 105, // 1:45
    targetProPaceSec: 130,   // 2:10
    targetOpenPaceSec: 165,  // 2:45
    iconName: 'Dumbbell',
  },
  {
    type: 'sandbag_lunges_100m',
    name: '100m Sandbag Lunges',
    category: 'quad_dominant',
    distanceOrReps: '100 meters',
    weights: {
      open_men: '20 kg bag',
      open_women: '10 kg bag',
      pro_men: '30 kg bag',
      pro_women: '20 kg bag',
      doubles_men: '20 kg bag',
      doubles_women: '10 kg bag',
      doubles_mixed: '20 kg bag',
    },
    targetElitePaceSec: 195, // 3:15
    targetProPaceSec: 240,   // 4:00
    targetOpenPaceSec: 310,  // 5:10
    iconName: 'Layers',
  },
  {
    type: 'wall_balls_100',
    name: '100 Wall Balls',
    category: 'quad_dominant',
    distanceOrReps: '100 reps (9ft/10ft target)',
    weights: {
      open_men: '6 kg @ 10 ft',
      open_women: '4 kg @ 9 ft',
      pro_men: '9 kg @ 10 ft',
      pro_women: '6 kg @ 9 ft',
      doubles_men: '6 kg @ 10 ft',
      doubles_women: '4 kg @ 9 ft',
      doubles_mixed: '6 kg @ 10 ft',
    },
    targetElitePaceSec: 210, // 3:30 (unbroken/1-break)
    targetProPaceSec: 270,   // 4:30
    targetOpenPaceSec: 360,  // 6:00
    iconName: 'Sparkles',
  }
];

export interface PacingProfileResult {
  targetTotalSec: number;
  totalRunSec: number;
  totalStationSec: number;
  totalRoxzoneSec: number;
  avgRunPaceSecPerKm: number;
  splitDetails: {
    splitIndex: number;
    name: string;
    runPaceSec: number;
    stationTimeSec: number;
    roxzoneInSec: number;
    roxzoneOutSec: number;
  }[];
}

/**
 * Calculates optimized Hyrox race split targets based on the athlete's target finish time.
 * Standard race structure: 8 x 1km runs + 8 functional stations + Roxzone transitions.
 */
export function calculateHyroxPacing(
  targetTotalMinutes: number = 65, // default sub-65 target
  division: HyroxDivision = 'pro_men'
): PacingProfileResult {
  const targetTotalSec = targetTotalMinutes * 60;

  // Typical Elite/Pro Distribution:
  // Running: ~50-52% of total time
  // Stations: ~40-42% of total time
  // Roxzone: ~6-8% of total time
  const roxzonePct = targetTotalMinutes < 60 ? 0.06 : 0.075;
  const runningPct = 0.51;
  const stationPct = 1 - (roxzonePct + runningPct);

  const totalRunSec = Math.round(targetTotalSec * runningPct);
  const totalStationSec = Math.round(targetTotalSec * stationPct);
  const totalRoxzoneSec = targetTotalSec - (totalRunSec + totalStationSec);

  const avgRunPaceSecPerKm = Math.round(totalRunSec / 8);

  // Weightings for station split distributions
  const stationWeights = [0.10, 0.13, 0.14, 0.15, 0.11, 0.08, 0.14, 0.15];

  // Compromised run pace variance curve (Runs 1-8 experience progressive fatigue + station shock)
  // Run 1: Fast baseline (e.g. -12s)
  // Run 3 post sled push: +15s
  // Run 5 post BBJ: +10s
  // Run 8 post lunges: +18s
  const runDeltas = [-12, -4, 14, 6, 12, 0, 16, 10];

  const splitDetails = HYROX_STATION_STANDARDS.map((std, idx) => {
    const runPace = avgRunPaceSecPerKm + (runDeltas[idx] || 0);
    const stationTime = Math.round(totalStationSec * stationWeights[idx]);
    const roxzoneIn = Math.round((totalRoxzoneSec / 8) * 0.5);
    const roxzoneOut = Math.round((totalRoxzoneSec / 8) * 0.5);

    return {
      splitIndex: idx + 1,
      name: std.name,
      runPaceSec: runPace,
      stationTimeSec: stationTime,
      roxzoneInSec: roxzoneIn,
      roxzoneOutSec: roxzoneOut,
    };
  });

  return {
    targetTotalSec,
    totalRunSec,
    totalStationSec,
    totalRoxzoneSec,
    avgRunPaceSecPerKm,
    splitDetails,
  };
}
