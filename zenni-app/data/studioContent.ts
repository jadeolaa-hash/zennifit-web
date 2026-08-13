import { TierId } from '@/constants/pricing';

export type StudioCategory = 'Run Form' | 'Mobility' | 'Strength' | 'Recovery' | 'Mindset';

export type Creator = {
  id: string;
  name: string;
  handle: string;
  specialty: string;
  color: string;
};

export type StudioContent = {
  id: string;
  title: string;
  creatorId: string;
  category: StudioCategory;
  durationMin: number;
  requiredTier: TierId;
  description: string;
  gradient: [string, string];
};

export const CREATORS: Creator[] = [
  { id: 'jules-kane', name: 'Jules Kane', handle: '@juleskane', specialty: 'Run coaching', color: '#FF6B5B' },
  { id: 'amara-osei', name: 'Amara Osei', handle: '@amaraosei', specialty: 'Mobility & recovery', color: '#C9A7F2' },
  { id: 'ren-takahashi', name: 'Ren Takahashi', handle: '@rentakahashi', specialty: 'Strength technique', color: '#E8B84C' },
  { id: 'sofia-marchetti', name: 'Sofia Marchetti', handle: '@sofiam', specialty: 'Mindset & focus', color: '#3FC77A' },
];

export const STUDIO_CONTENT: StudioContent[] = [
  {
    id: 'efficient-stride',
    title: 'Build an Efficient Stride',
    creatorId: 'jules-kane',
    category: 'Run Form',
    durationMin: 18,
    requiredTier: 'gold',
    description: 'Cadence drills and posture cues to reduce wasted energy on long runs.',
    gradient: ['#B3241C', '#FF6B5B'],
  },
  {
    id: 'hip-mobility-flow',
    title: '10-Minute Hip Mobility Flow',
    creatorId: 'amara-osei',
    category: 'Mobility',
    durationMin: 10,
    requiredTier: 'silver',
    description: 'A short daily flow to open up the hips before or after training.',
    gradient: ['#5B3E7A', '#C9A7F2'],
  },
  {
    id: 'bulletproof-shoulders',
    title: 'Bulletproof Shoulders',
    creatorId: 'ren-takahashi',
    category: 'Strength',
    durationMin: 24,
    requiredTier: 'gold',
    description: 'Prehab and accessory work to keep your shoulders healthy under heavy load.',
    gradient: ['#8A6A1E', '#E8B84C'],
  },
  {
    id: 'race-week-mindset',
    title: 'Race Week Mindset',
    creatorId: 'sofia-marchetti',
    category: 'Mindset',
    durationMin: 14,
    requiredTier: 'platinum',
    description: 'Visualization and breathing techniques used by competitive athletes before race day.',
    gradient: ['#1F6E42', '#3FC77A'],
  },
  {
    id: 'downhill-technique',
    title: 'Downhill Running Technique',
    creatorId: 'jules-kane',
    category: 'Run Form',
    durationMin: 12,
    requiredTier: 'gold',
    description: 'Control your descent and protect your knees on technical trail routes.',
    gradient: ['#B3241C', '#FF8A7D'],
  },
  {
    id: 'sleep-and-recovery',
    title: 'Sleep as a Training Tool',
    creatorId: 'amara-osei',
    category: 'Recovery',
    durationMin: 16,
    requiredTier: 'silver',
    description: 'How to structure your evenings around better sleep for faster recovery.',
    gradient: ['#5B3E7A', '#8E6FBF'],
  },
];
