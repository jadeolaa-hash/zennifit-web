export type RunSession = {
  id: string;
  date: string;
  title: string;
  distanceKm: number;
  durationMin: number;
  avgPaceMinPerKm: number;
  phonePaceMinPerKm: number;
  bandPaceMinPerKm: number;
  calories: number;
  elevationGainM: number;
  avgHeartRate: number;
  splits: { km: number; paceMinPerKm: number }[];
};

export const RECENT_RUNS: RunSession[] = [
  {
    id: 'run-1',
    date: '2026-08-05',
    title: 'Ridgeline Loop',
    distanceKm: 8.2,
    durationMin: 46,
    avgPaceMinPerKm: 5.6,
    phonePaceMinPerKm: 5.7,
    bandPaceMinPerKm: 5.55,
    calories: 512,
    elevationGainM: 320,
    avgHeartRate: 152,
    splits: [
      { km: 1, paceMinPerKm: 5.4 },
      { km: 2, paceMinPerKm: 5.5 },
      { km: 3, paceMinPerKm: 5.7 },
      { km: 4, paceMinPerKm: 6.0 },
      { km: 5, paceMinPerKm: 5.8 },
      { km: 6, paceMinPerKm: 5.5 },
      { km: 7, paceMinPerKm: 5.4 },
      { km: 8, paceMinPerKm: 5.3 },
    ],
  },
  {
    id: 'run-2',
    date: '2026-08-03',
    title: 'Harbor Loop',
    distanceKm: 6.4,
    durationMin: 32,
    avgPaceMinPerKm: 5.0,
    phonePaceMinPerKm: 5.1,
    bandPaceMinPerKm: 4.95,
    calories: 398,
    elevationGainM: 60,
    avgHeartRate: 158,
    splits: [
      { km: 1, paceMinPerKm: 5.2 },
      { km: 2, paceMinPerKm: 5.1 },
      { km: 3, paceMinPerKm: 5.0 },
      { km: 4, paceMinPerKm: 4.9 },
      { km: 5, paceMinPerKm: 4.9 },
      { km: 6, paceMinPerKm: 4.8 },
    ],
  },
];
