import { TierId } from '@/constants/pricing';

export type Level = 'Beginner' | 'Intermediate' | 'Advanced';
export type Discipline = 'Strength' | 'Hypertrophy' | 'Powerlifting' | 'Athletic Performance' | 'Mobility';

export type Exercise = {
  name: string;
  sets: number;
  reps: string;
  restSec: number;
  notes?: string;
};

export type WorkoutDay = {
  id: string;
  title: string;
  focus: string;
  durationMin: number;
  exercises: Exercise[];
};

export type Program = {
  id: string;
  name: string;
  coach: string;
  discipline: Discipline;
  level: Level;
  weeks: number;
  daysPerWeek: number;
  requiredTier: TierId;
  summary: string;
  weeklyFocus: string[];
  days: WorkoutDay[];
};

export const PROGRAMS: Program[] = [
  {
    id: 'foundations',
    name: 'Foundations',
    coach: 'Coach Mara Lin',
    discipline: 'Strength',
    level: 'Beginner',
    weeks: 4,
    daysPerWeek: 3,
    requiredTier: 'basic',
    summary:
      'A 4-week on-ramp to structured strength training — compound lifts, controlled tempo, built-in mobility.',
    weeklyFocus: ['Movement quality', 'Full-body strength', 'Consistency'],
    days: [
      {
        id: 'foundations-d1',
        title: 'Day 1 — Full Body A',
        focus: 'Squat pattern + upper push',
        durationMin: 45,
        exercises: [
          { name: 'Goblet Squat', sets: 3, reps: '10', restSec: 60 },
          { name: 'Incline Push-up', sets: 3, reps: '12', restSec: 45 },
          { name: 'Seated Row (band)', sets: 3, reps: '12', restSec: 45 },
          { name: 'Dead Bug', sets: 3, reps: '10/side', restSec: 30 },
        ],
      },
      {
        id: 'foundations-d2',
        title: 'Day 2 — Full Body B',
        focus: 'Hinge pattern + upper pull',
        durationMin: 45,
        exercises: [
          { name: 'Romanian Deadlift (light)', sets: 3, reps: '10', restSec: 60 },
          { name: 'Dumbbell Row', sets: 3, reps: '10/side', restSec: 45 },
          { name: 'Glute Bridge', sets: 3, reps: '15', restSec: 30 },
          { name: 'Plank', sets: 3, reps: '30s', restSec: 30 },
        ],
      },
    ],
  },
  {
    id: 'iron-ladder',
    name: 'Iron Ladder',
    coach: 'Coach Dez Osei',
    discipline: 'Powerlifting',
    level: 'Intermediate',
    weeks: 8,
    daysPerWeek: 4,
    requiredTier: 'silver',
    summary:
      'Ladder-style progressive overload block built around the big three, with accessory work to close weak points.',
    weeklyFocus: ['Squat volume', 'Bench technique', 'Deadlift strength', 'Deload week 4 & 8'],
    days: [
      {
        id: 'iron-ladder-d1',
        title: 'Day 1 — Squat Focus',
        focus: 'Heavy squat + quad accessories',
        durationMin: 65,
        exercises: [
          { name: 'Back Squat', sets: 5, reps: '5', restSec: 150 },
          { name: 'Front Squat', sets: 3, reps: '6', restSec: 120 },
          { name: 'Walking Lunge', sets: 3, reps: '12/side', restSec: 60 },
          { name: 'Cable Crunch', sets: 3, reps: '15', restSec: 45 },
        ],
      },
      {
        id: 'iron-ladder-d2',
        title: 'Day 2 — Bench Focus',
        focus: 'Heavy bench + triceps',
        durationMin: 60,
        exercises: [
          { name: 'Bench Press', sets: 5, reps: '5', restSec: 150 },
          { name: 'Close-Grip Bench', sets: 3, reps: '8', restSec: 90 },
          { name: 'Dumbbell Fly', sets: 3, reps: '12', restSec: 60 },
          { name: 'Triceps Pushdown', sets: 3, reps: '15', restSec: 45 },
        ],
      },
      {
        id: 'iron-ladder-d3',
        title: 'Day 3 — Deadlift Focus',
        focus: 'Heavy pull + posterior chain',
        durationMin: 65,
        exercises: [
          { name: 'Deadlift', sets: 5, reps: '3', restSec: 180 },
          { name: 'Barbell Row', sets: 4, reps: '8', restSec: 90 },
          { name: 'Back Extension', sets: 3, reps: '12', restSec: 60 },
        ],
      },
    ],
  },
  {
    id: 'better-you-reset',
    name: 'Better You: 6-Week Reset',
    coach: 'Coach Priya Anand',
    discipline: 'Hypertrophy',
    level: 'Intermediate',
    weeks: 6,
    daysPerWeek: 5,
    requiredTier: 'gold',
    summary:
      'A structured, day-by-day rebuild in the Better You format — clear weekly themes, daily check-ins, and built-in recovery days.',
    weeklyFocus: ['Week 1-2: Rebuild base', 'Week 3-4: Add intensity', 'Week 5-6: Peak & assess'],
    days: [
      {
        id: 'better-you-d1',
        title: 'Day 1 — Upper Push',
        focus: 'Chest, shoulders, triceps',
        durationMin: 50,
        exercises: [
          { name: 'Barbell Bench Press', sets: 4, reps: '8', restSec: 90 },
          { name: 'Seated Shoulder Press', sets: 4, reps: '10', restSec: 75 },
          { name: 'Lateral Raise', sets: 3, reps: '15', restSec: 45 },
          { name: 'Overhead Triceps Extension', sets: 3, reps: '12', restSec: 45 },
        ],
      },
      {
        id: 'better-you-d2',
        title: 'Day 2 — Lower Body',
        focus: 'Quads, hamstrings, glutes',
        durationMin: 55,
        exercises: [
          { name: 'Back Squat', sets: 4, reps: '8', restSec: 90 },
          { name: 'Romanian Deadlift', sets: 4, reps: '10', restSec: 90 },
          { name: 'Bulgarian Split Squat', sets: 3, reps: '10/side', restSec: 60 },
          { name: 'Standing Calf Raise', sets: 3, reps: '15', restSec: 45 },
        ],
      },
      {
        id: 'better-you-d3',
        title: 'Day 3 — Active Recovery',
        focus: 'Mobility + light cardio',
        durationMin: 30,
        exercises: [
          { name: 'Hip Flexor Stretch', sets: 2, reps: '45s/side', restSec: 15 },
          { name: 'Thoracic Rotation', sets: 2, reps: '10/side', restSec: 15 },
          { name: 'Zone 2 Bike/Walk', sets: 1, reps: '20 min', restSec: 0 },
        ],
      },
    ],
  },
  {
    id: 'apex-performance',
    name: 'Apex Athletic Performance',
    coach: 'Coach Théo Novak',
    discipline: 'Athletic Performance',
    level: 'Advanced',
    weeks: 10,
    daysPerWeek: 5,
    requiredTier: 'platinum',
    summary:
      'Power, speed and strength periodized for competitive athletes — built to pair with your Coachify readiness score.',
    weeklyFocus: ['Power development', 'Max strength', 'Speed & agility', 'Taper week 10'],
    days: [
      {
        id: 'apex-d1',
        title: 'Day 1 — Power',
        focus: 'Olympic lift variations + plyometrics',
        durationMin: 60,
        exercises: [
          { name: 'Power Clean', sets: 5, reps: '3', restSec: 150 },
          { name: 'Box Jump', sets: 4, reps: '5', restSec: 90 },
          { name: 'Trap Bar Jump', sets: 4, reps: '4', restSec: 90 },
        ],
      },
      {
        id: 'apex-d2',
        title: 'Day 2 — Max Strength',
        focus: 'Heavy compound lifts',
        durationMin: 70,
        exercises: [
          { name: 'Back Squat', sets: 6, reps: '3', restSec: 180 },
          { name: 'Weighted Pull-up', sets: 4, reps: '5', restSec: 120 },
          { name: 'Push Press', sets: 4, reps: '5', restSec: 120 },
        ],
      },
      {
        id: 'apex-d3',
        title: 'Day 3 — Speed & Agility',
        focus: 'Sprint mechanics + change of direction',
        durationMin: 50,
        exercises: [
          { name: 'Flying Sprints', sets: 6, reps: '30m', restSec: 90 },
          { name: 'Lateral Bound', sets: 4, reps: '6/side', restSec: 60 },
          { name: '5-10-5 Shuttle', sets: 5, reps: '1', restSec: 90 },
        ],
      },
    ],
  },
];
