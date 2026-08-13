import { View, Text, Pressable } from 'react-native';

type Props<T extends string> = {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
};

export function SegmentedControl<T extends string>({ options, value, onChange }: Props<T>) {
  return (
    <View className="flex-row bg-ink-card border border-ink-border rounded-full p-1">
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => onChange(opt.value)}
            className={`flex-1 items-center justify-center py-2 rounded-full ${
              active ? 'bg-salmon' : ''
            }`}
          >
            <Text className={`text-sm font-bold ${active ? 'text-ink' : 'text-fg-muted'}`}>
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
