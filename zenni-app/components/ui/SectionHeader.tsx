import { View, Text, Pressable } from 'react-native';

type Props = {
  title: string;
  action?: string;
  onAction?: () => void;
};

export function SectionHeader({ title, action, onAction }: Props) {
  return (
    <View className="flex-row items-center justify-between mb-3 mt-2">
      <Text className="text-fg text-lg font-bold">{title}</Text>
      {action ? (
        <Pressable onPress={onAction}>
          <Text className="text-salmon text-sm font-semibold">{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
