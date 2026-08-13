import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';

type Props = {
  progress: number; // 0..1
  title: string;
  onBack?: () => void;
};

export function OnboardingHeader({ progress, title, onBack }: Props) {
  const router = useRouter();
  const clamped = Math.max(0, Math.min(1, progress));

  return (
    <View className="mb-8">
      <View className="flex-row items-center gap-3 mb-6">
        <Pressable
          onPress={onBack ?? (() => router.back())}
          className="w-9 h-9 rounded-full bg-ink-card border border-ink-border items-center justify-center"
        >
          <ChevronLeft color="#F5F3F2" size={18} />
        </Pressable>
        <View className="flex-1 h-1.5 rounded-full bg-ink-border overflow-hidden">
          <View className="h-1.5 rounded-full bg-salmon" style={{ width: `${clamped * 100}%` }} />
        </View>
      </View>
      <Text className="text-fg text-2xl font-extrabold">{title}</Text>
    </View>
  );
}
