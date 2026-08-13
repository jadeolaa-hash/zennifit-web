import { View, Text, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Flame } from 'lucide-react-native';
import { Button, Card, Badge, DragonMascot, StatTile } from '@/components/ui';
import { MUSCLE_ZONES, type MuscleZone } from '@/components/ui/BodyModel';
import { colors } from '@/constants/theme';

const LEVEL_LABEL: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

const LEVEL_PLAN: Record<string, { days: number; minutes: number; calories: number }> = {
  beginner: { days: 3, minutes: 30, calories: 320 },
  intermediate: { days: 4, minutes: 45, calories: 480 },
  advanced: { days: 5, minutes: 60, calories: 650 },
};

export default function PlanReadyScreen() {
  const router = useRouter();
  const { level, muscles } = useLocalSearchParams<{ level: string; muscles: string }>();

  const levelKey = level ?? 'beginner';
  const plan = LEVEL_PLAN[levelKey] ?? LEVEL_PLAN.beginner;
  const focusAreas = (muscles ?? '')
    .split(',')
    .filter(Boolean) as MuscleZone[];
  const focusLabels = focusAreas.map((z) => MUSCLE_ZONES.find((m) => m.key === z)?.label ?? z);

  return (
    <SafeAreaView className="flex-1 bg-ink" edges={['top', 'bottom']}>
      <ScrollView className="flex-1 px-6 pt-10" contentContainerStyle={{ paddingBottom: 16 }}>
        <View className="items-center mb-6">
          <DragonMascot size={72} />
          <Text className="text-fg text-2xl font-extrabold text-center mt-4">
            Your plan is ready<Text className="text-salmon">.</Text>
          </Text>
          <Text className="text-fg-subtle text-sm text-center mt-2 max-w-[280px]">
            Coachify built this around your fitness level and focus areas — you can fine-tune it
            anytime from Train.
          </Text>
        </View>

        <Card className="mb-4">
          <Text className="text-fg-subtle text-xs font-semibold uppercase mb-2">Fitness level</Text>
          <Text className="text-fg text-lg font-extrabold mb-4">{LEVEL_LABEL[levelKey] ?? levelKey}</Text>

          <Text className="text-fg-subtle text-xs font-semibold uppercase mb-2">Focus areas</Text>
          <View className="flex-row flex-wrap gap-2">
            {focusLabels.length > 0 ? (
              focusLabels.map((label) => <Badge key={label} label={label} tone="salmon" />)
            ) : (
              <Text className="text-fg-subtle text-sm">Full body</Text>
            )}
          </View>
        </Card>

        <View className="flex-row gap-3 mb-6">
          <StatTile label="Per week" value={`${plan.days}`} unit="days" />
          <StatTile label="Session" value={`${plan.minutes}`} unit="min" accent />
          <StatTile label="Est. burn" value={`${plan.calories}`} unit="kcal" />
        </View>

        <View className="flex-row items-center gap-2 mb-2">
          <Flame color={colors.salmon} size={16} />
          <Text className="text-fg-subtle text-sm">
            Adjust intensity anytime — Coachify adapts as you train.
          </Text>
        </View>
      </ScrollView>

      <View className="px-6 pb-6">
        <Button
          label="Get My Plan"
          size="lg"
          fullWidth
          onPress={() => router.push('/onboarding/notifications')}
        />
      </View>
    </SafeAreaView>
  );
}
