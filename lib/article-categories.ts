import { HeartPulse, Apple, Dumbbell, Footprints, Zap, Flame, type LucideIcon } from 'lucide-react';

export interface ArticleCategory {
  slug: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

export const ARTICLE_CATEGORIES: ArticleCategory[] = [
  { slug: 'health', label: 'Health', description: 'Sleep, recovery and the fundamentals.', icon: HeartPulse },
  { slug: 'diet', label: 'Diet', description: 'Nutrition and fueling for training.', icon: Apple },
  { slug: 'fitness', label: 'Fitness', description: 'General training and conditioning.', icon: Dumbbell },
  { slug: 'running', label: 'Running', description: 'Pacing, plans and race prep.', icon: Footprints },
  { slug: 'crossfit', label: 'Crossfit', description: 'WODs, technique and programming.', icon: Zap },
  { slug: 'hyrox', label: 'Hyrox', description: 'Station work and race simulations.', icon: Flame },
];
