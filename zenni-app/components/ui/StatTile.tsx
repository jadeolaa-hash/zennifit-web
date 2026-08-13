import { View, Text } from 'react-native';

type Props = {
  label: string;
  value: string;
  unit?: string;
  accent?: boolean;
};

export function StatTile({ label, value, unit, accent }: Props) {
  return (
    <View className="flex-1 bg-ink-card border border-ink-border rounded-2xl px-4 py-3">
      <Text className="text-fg-subtle text-xs font-semibold uppercase tracking-wide">
        {label}
      </Text>
      <View className="flex-row items-baseline gap-1 mt-1">
        <Text className={`text-2xl font-extrabold ${accent ? 'text-salmon' : 'text-fg'}`}>
          {value}
        </Text>
        {unit ? <Text className="text-fg-muted text-xs font-semibold">{unit}</Text> : null}
      </View>
    </View>
  );
}
