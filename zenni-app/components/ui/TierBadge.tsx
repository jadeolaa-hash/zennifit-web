import { View, Text } from 'react-native';
import { TierId, TIERS } from '@/constants/pricing';

export function TierBadge({ tier, size = 'md' }: { tier: TierId; size?: 'sm' | 'md' }) {
  const t = TIERS[tier];
  const padding = size === 'sm' ? 'px-2 py-0.5' : 'px-3 py-1';
  const textSize = size === 'sm' ? 'text-[10px]' : 'text-xs';
  return (
    <View
      className={`self-start rounded-full ${padding} flex-row items-center gap-1`}
      style={{ backgroundColor: `${t.color}26`, borderWidth: 1, borderColor: t.color }}
    >
      <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: t.color }} />
      <Text className={`${textSize} font-bold`} style={{ color: t.color }}>
        {t.name.toUpperCase()}
      </Text>
    </View>
  );
}
