export type TierId = 'basic' | 'silver' | 'gold' | 'platinum';

export type Tier = {
  id: TierId;
  name: string;
  price: number;
  priceLabel: string;
  tagline: string;
  color: string;
  features: string[];
};

export const TIER_ORDER: TierId[] = ['basic', 'silver', 'gold', 'platinum'];

export const TIERS: Record<TierId, Tier> = {
  basic: {
    id: 'basic',
    name: 'Basic',
    price: 0,
    priceLabel: 'Free',
    tagline: 'Get moving with the essentials',
    color: '#8A8F98',
    features: [
      'Manual phone-GPS run, hike & walk tracking',
      'Browse the full trail library',
      '1 weekly Coachify summary',
      '1 preview strength program',
      'No smartband sync',
    ],
  },
  silver: {
    id: 'silver',
    name: 'Silver',
    price: 9.99,
    priceLabel: '$9.99/mo',
    tagline: 'Train with structure',
    color: '#C7CBD1',
    features: [
      'Everything in Basic',
      'Full trail tracking + run history',
      'Weekly Coachify insights & recovery tips',
      'Full Train program library (Ladder-style)',
      'Basic smartband sync — steps & heart rate',
    ],
  },
  gold: {
    id: 'gold',
    name: 'Gold',
    price: 19.99,
    priceLabel: '$19.99/mo',
    tagline: 'Coach-level performance data',
    color: '#E8B84C',
    features: [
      'Everything in Silver',
      'Full performance sync — pace, splits, cadence',
      'Phone-vs-band comparison on every run',
      'Daily adaptive Coachify coaching',
      'Better You-style structured plans',
      'Zenni Studio included (standard content)',
    ],
  },
  platinum: {
    id: 'platinum',
    name: 'Platinum',
    price: 34.99,
    priceLabel: '$34.99/mo',
    tagline: 'The full Zenni experience',
    color: '#C9A7F2',
    features: [
      'Everything in Gold',
      'Real-time in-workout AI coaching',
      'Advanced readiness & recovery scoring',
      'Multi-device smartband priority sync',
      'Full premium Zenni Studio catalog',
      'Weekly AI coach check-ins',
      'Early access to new trails & programs',
    ],
  },
};

export function tierIndex(id: TierId): number {
  return TIER_ORDER.indexOf(id);
}

export function meetsTier(userTier: TierId, required: TierId): boolean {
  return tierIndex(userTier) >= tierIndex(required);
}
