export type InsightCategory = 'Recovery' | 'Performance' | 'Movement' | 'Nutrition';
export type Severity = 'positive' | 'info' | 'attention';

export type CoachingInsight = {
  id: string;
  title: string;
  category: InsightCategory;
  severity: Severity;
  date: string;
  summary: string;
  detail: string;
  recommendations: string[];
};

export const COACHING_INSIGHTS: CoachingInsight[] = [
  {
    id: 'recovery-trending-up',
    title: 'Recovery trending up',
    category: 'Recovery',
    severity: 'positive',
    date: '2026-08-05',
    summary: 'Your readiness score has climbed 12 points over the last week.',
    detail:
      'Sleep consistency and resting heart rate both improved after your deload. Your band data shows HRV up 8% week-over-week, which lines up with the extra recovery day you added on Wednesday.',
    recommendations: [
      'Good window to push intensity on your next two sessions',
      'Keep your current sleep schedule — it\'s working',
    ],
  },
  {
    id: 'asymmetric-stride',
    title: 'Slight stride asymmetry detected',
    category: 'Movement',
    severity: 'attention',
    date: '2026-08-04',
    summary: 'Your last 3 runs show a 6% ground-contact-time imbalance, left vs right.',
    detail:
      'This is small but consistent enough to flag. It often traces back to a mobility limitation on one side rather than an injury — worth a mobility check before it becomes a bigger pattern.',
    recommendations: [
      'Try the Hip Mobility Flow in Zenni Studio this week',
      'Watch for any one-sided tightness after your next run',
    ],
  },
  {
    id: 'pace-consistency',
    title: 'Pacing is getting more consistent',
    category: 'Performance',
    severity: 'positive',
    date: '2026-08-02',
    summary: 'Your negative-split rate is up to 60% over your last 10 runs.',
    detail:
      'You\'re finishing runs faster than you start them more often than not now — a sign your pacing sense is maturing. Your smartband pace data and phone GPS are agreeing within 2%, so this trend is reliable.',
    recommendations: [
      'You\'re ready to try a structured tempo session',
      'Consider testing a 10K time trial in the next two weeks',
    ],
  },
  {
    id: 'protein-gap',
    title: 'Protein intake below target on training days',
    category: 'Nutrition',
    severity: 'info',
    date: '2026-07-30',
    summary: 'Logged intake is averaging 15% under your strength-training target.',
    detail:
      'On days you complete a Train session, your logged protein is coming in lower than the target that supports your current program\'s volume.',
    recommendations: [
      'Add a protein-forward snack within 2 hours of training',
      'Aim for ~25-30g at your next post-workout meal',
    ],
  },
];
