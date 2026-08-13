import { View, Text } from 'react-native';

type Tone = 'salmon' | 'neutral' | 'success' | 'warning' | 'outline';

type Props = {
  label: string;
  tone?: Tone;
  className?: string;
};

const toneClasses: Record<Tone, { bg: string; text: string }> = {
  salmon: { bg: 'bg-salmon', text: 'text-ink' },
  neutral: { bg: 'bg-ink-border', text: 'text-fg' },
  success: { bg: 'bg-success', text: 'text-ink' },
  warning: { bg: 'bg-tier-gold', text: 'text-ink' },
  outline: { bg: 'bg-transparent border border-salmon', text: 'text-salmon' },
};

export function Badge({ label, tone = 'neutral', className }: Props) {
  const t = toneClasses[tone];
  return (
    <View className={`self-start px-2.5 py-1 rounded-full ${t.bg} ${className ?? ''}`}>
      <Text className={`text-xs font-bold ${t.text}`}>{label}</Text>
    </View>
  );
}
