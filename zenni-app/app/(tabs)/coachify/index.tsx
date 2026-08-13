import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrendingUp } from 'lucide-react-native';
import {
  ScreenHeader,
  SectionHeader,
  Card,
  PressableCard,
  StatTile,
  ProgressRing,
  Badge,
  DragonMascot,
  PaywallGate,
} from '@/components/ui';
import { useAppState } from '@/context/AppStateContext';
import { COACHING_INSIGHTS } from '@/data/coachingInsights';
import { colors } from '@/constants/theme';

const severityTone = {
  positive: 'success',
  attention: 'warning',
  info: 'neutral',
} as const;

export default function CoachifyHub() {
  const router = useRouter();
  const { user, tier } = useAppState();

  return (
    <SafeAreaView className="flex-1 bg-ink" edges={['top']}>
      <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 32 }}>
        <ScreenHeader title="Coachify" subtitle="Your AI coach & progress insights" />

        <Card className="flex-row items-center gap-4 mb-4">
          <DragonMascot size={56} />
          <View className="flex-1">
            <Text className="text-fg font-bold text-base">Today's read from Coachify</Text>
            <Text className="text-fg-subtle text-sm mt-1">
              Readiness is {user.readinessScore >= 75 ? 'strong' : 'moderate'} — recovery is
              trending the right way this week.
            </Text>
          </View>
        </Card>

        <View className="flex-row gap-3 mb-4">
          <View className="flex-1 bg-ink-card border border-ink-border rounded-2xl items-center py-4">
            <ProgressRing
              progress={user.readinessScore / 100}
              size={72}
              strokeWidth={7}
              value={`${user.readinessScore}`}
              color={colors.success}
            />
            <Text className="text-fg-subtle text-xs font-semibold mt-2">Readiness</Text>
          </View>
          <View className="flex-1 gap-3">
            <StatTile label="Recovery" value="Good" />
            <StatTile label="Load" value="Moderate" />
          </View>
        </View>

        <PaywallGate requiredTier="gold" userTier={tier} label="Daily adaptive coaching">
          <PressableCard className="mb-6 flex-row items-center gap-3">
            <View className="w-10 h-10 rounded-xl bg-salmon/15 items-center justify-center">
              <TrendingUp color={colors.salmon} size={18} />
            </View>
            <View className="flex-1">
              <Text className="text-fg font-bold text-sm">Adaptive plan adjusted</Text>
              <Text className="text-fg-subtle text-xs mt-0.5">
                Tomorrow's session intensity lowered based on last night's sleep
              </Text>
            </View>
          </PressableCard>
        </PaywallGate>

        <SectionHeader title="Insights" />
        <View className="gap-3">
          {COACHING_INSIGHTS.map((insight) => (
            <PressableCard key={insight.id} onPress={() => router.push(`/(tabs)/coachify/${insight.id}`)}>
              <View className="flex-row items-center justify-between mb-2">
                <Badge label={insight.category.toUpperCase()} tone={severityTone[insight.severity]} />
                <Text className="text-fg-subtle text-xs">{insight.date}</Text>
              </View>
              <Text className="text-fg font-bold text-sm">{insight.title}</Text>
              <Text className="text-fg-subtle text-sm mt-1">{insight.summary}</Text>
            </PressableCard>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
