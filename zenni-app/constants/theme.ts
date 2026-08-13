export const colors = {
  salmon: '#FF6B5B',
  salmonLight: '#FF8A7D',
  salmonDark: '#E5533F',
  garnet: '#B3241C',
  garnetDark: '#7A1712',
  ink: '#121214',
  inkRaised: '#1C1C1F',
  inkCard: '#232327',
  inkBorder: '#2E2E33',
  textPrimary: '#F5F3F2',
  textSecondary: '#A9A9AE',
  textMuted: '#75757C',
  success: '#3FC77A',
  warning: '#E8B84C',
  tier: {
    basic: '#8A8F98',
    silver: '#C7CBD1',
    gold: '#E8B84C',
    platinum: '#C9A7F2',
  },
} as const;

export const gradients = {
  hero: [colors.garnet, colors.salmon] as const,
  card: [colors.inkRaised, colors.inkCard] as const,
};

export const radii = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  pill: 999,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};
