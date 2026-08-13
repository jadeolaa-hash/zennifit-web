import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DragonMascot, Button } from '@/components/ui';

export default function Welcome() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-ink">
      <LinearGradient
        colors={['#7A1712', '#121214']}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '65%' }}
      />
      <SafeAreaView className="flex-1 justify-between px-6 pb-8 pt-12">
        <View className="items-center mt-10">
          <View className="w-28 h-28 rounded-full bg-ink-card border border-ink-border items-center justify-center mb-6">
            <DragonMascot size={72} />
          </View>
          <Text className="text-fg text-3xl font-extrabold text-center">
            Zenni <Text className="text-salmon">Fitness</Text>
          </Text>
          <Text className="text-fg-subtle text-base text-center mt-3 max-w-[280px]">
            Your AI coach, trail tracker, training plans and performance data — guided by the
            dragon.
          </Text>
        </View>

        <View className="gap-3">
          <View className="flex-row gap-3 mb-2">
            <FeaturePill label="Coachify AI" />
            <FeaturePill label="Trails" />
            <FeaturePill label="Train" />
            <FeaturePill label="Studio" />
          </View>
          <Button
            label="Get Started"
            size="lg"
            fullWidth
            onPress={() => router.push('/onboarding/fitness-level')}
          />
          <Text className="text-fg-subtle text-xs text-center">
            Basic is free — upgrade anytime for full smartband performance sync
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

function FeaturePill({ label }: { label: string }) {
  return (
    <View className="flex-1 bg-ink-card border border-ink-border rounded-xl py-2 items-center">
      <Text className="text-fg-muted text-xs font-semibold">{label}</Text>
    </View>
  );
}
