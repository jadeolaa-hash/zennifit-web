import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';

type Props = {
  title: string;
  subtitle?: string;
  back?: boolean;
  right?: React.ReactNode;
};

export function ScreenHeader({ title, subtitle, back, right }: Props) {
  const router = useRouter();
  return (
    <View className="flex-row items-center justify-between mb-4">
      <View className="flex-row items-center gap-2 flex-1">
        {back ? (
          <Pressable
            onPress={() => router.back()}
            className="w-9 h-9 rounded-full bg-ink-card border border-ink-border items-center justify-center mr-1"
          >
            <ChevronLeft color="#F5F3F2" size={18} />
          </Pressable>
        ) : null}
        <View>
          <Text className="text-fg text-2xl font-extrabold">
            {title}
            <Text className="text-salmon">.</Text>
          </Text>
          {subtitle ? <Text className="text-fg-subtle text-sm mt-0.5">{subtitle}</Text> : null}
        </View>
      </View>
      {right}
    </View>
  );
}
