import { TierId } from '@/constants/pricing';

export type UserProfile = {
  name: string;
  tier: TierId;
  streakDays: number;
  weeklyGoalKm: number;
  weeklyProgressKm: number;
  readinessScore: number;
  connectedBand: boolean;
  bandModel: string;
  todaysPlan: string;
};

export const MOCK_USER: UserProfile = {
  name: 'Jade',
  tier: 'gold',
  streakDays: 9,
  weeklyGoalKm: 30,
  weeklyProgressKm: 21.4,
  readinessScore: 82,
  connectedBand: true,
  bandModel: 'Zenni Band 2',
  todaysPlan: 'Better You: 6-Week Reset — Day 2, Lower Body',
};
