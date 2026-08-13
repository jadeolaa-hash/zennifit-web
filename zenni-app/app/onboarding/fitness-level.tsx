import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OnboardingHeader, Button } from '@/components/ui';

type Level = 'beginner' | 'intermediate' | 'advanced';

const LEVELS: { key: Level; label: string; description: string }[] = [
  { key: 'beginner', label: 'Beginner', description: 'New to structured training' },
  { key: 'intermediate', label: 'Intermediate', description: 'Training consistently for 6+ months' },
  { key: 'advanced', label: 'Advanced', description: 'Years of dedicated training experience' },
];

export default function FitnessLevelScreen() {
  const router = useRouter();
  const [level, setLevel] = useState<Level | null>(null);

  return (
    <SafeAreaView className="flex-1 bg-ink" edges={['top', 'bottom']}>
      <View className="flex-1 px-6 pt-4">
        <OnboardingHeader progress={0.33} title="What's your fitness level?" />

        <View className="gap-3">
          {LEVELS.map((item) => {
            const isSelected = level === item.key;
            return (
              <Pressable
                key={item.key}
                onPress={() => setLevel(item.key)}
                className={`flex-row items-center justify-between rounded-2xl border px-5 py-4 ${
                  isSelected ? 'border-salmon bg-ink-card' : 'border-ink-border bg-ink-card'
                }`}
              >
                <View>
                  <Text className="text-fg text-base font-bold">{item.label}</Text>
                  <Text className="text-fg-subtle text-sm mt-0.5">{item.description}</Text>
                </View>
                <View
                  className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                    isSelected ? 'border-salmon' : 'border-ink-border'
                  }`}
                >
                  {isSelected ? <View className="w-3 h-3 rounded-full bg-salmon" /> : null}
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View className="px-6 pb-6">
        <Button
          label="Next"
          size="lg"
          fullWidth
          disabled={!level}
          onPress={() =>
            router.push({ pathname: '/onboarding/target-muscles', params: { level: level! } })
          }
        />
      </View>
    </SafeAreaView>
  );
}
