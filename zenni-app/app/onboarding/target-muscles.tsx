import { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OnboardingHeader, Button, BodyModel, MUSCLE_ZONES, type MuscleZone } from '@/components/ui';

export default function TargetMusclesScreen() {
  const router = useRouter();
  const { level } = useLocalSearchParams<{ level: string }>();
  const [selected, setSelected] = useState<MuscleZone[]>([]);

  const toggle = (zone: MuscleZone) => {
    setSelected((prev) => (prev.includes(zone) ? prev.filter((z) => z !== zone) : [...prev, zone]));
  };

  return (
    <SafeAreaView className="flex-1 bg-ink" edges={['top', 'bottom']}>
      <ScrollView className="flex-1 px-6 pt-4" contentContainerStyle={{ paddingBottom: 16 }}>
        <OnboardingHeader progress={0.66} title="Which areas need the most attention?" />

        <View className="flex-row gap-4">
          <View className="items-center justify-center" style={{ width: 130 }}>
            <BodyModel selected={selected} onToggle={toggle} size={110} />
          </View>

          <View className="flex-1 gap-2.5 justify-center">
            {MUSCLE_ZONES.map(({ key, label }) => {
              const isSelected = selected.includes(key);
              return (
                <Pressable
                  key={key}
                  onPress={() => toggle(key)}
                  className={`flex-row items-center justify-between rounded-xl border px-4 py-3.5 ${
                    isSelected ? 'border-salmon bg-ink-card' : 'border-ink-border bg-ink-card'
                  }`}
                >
                  <Text className="text-fg text-sm font-semibold">{label}</Text>
                  <View
                    className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                      isSelected ? 'border-salmon' : 'border-ink-border'
                    }`}
                  >
                    {isSelected ? <View className="w-2.5 h-2.5 rounded-full bg-salmon" /> : null}
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View className="px-6 pb-6">
        <Button
          label="Next"
          size="lg"
          fullWidth
          disabled={selected.length === 0}
          onPress={() =>
            router.push({
              pathname: '/onboarding/plan-ready',
              params: { level, muscles: selected.join(',') },
            })
          }
        />
      </View>
    </SafeAreaView>
  );
}
