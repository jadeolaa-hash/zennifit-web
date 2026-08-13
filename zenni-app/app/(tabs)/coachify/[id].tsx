import { View, Text, ScrollView } from 'react-native';
import { useLocalSearchParams, Redirect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckCircle2 } from 'lucide-react-native';
import { ScreenHeader, Card, Badge } from '@/components/ui';
import { COACHING_INSIGHTS } from '@/data/coachingInsights';
import { colors } from '@/constants/theme';

const severityTone = {
  positive: 'success',
  attention: 'warning',
  info: 'neutral',
} as const;

export default function InsightDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insight = COACHING_INSIGHTS.find((i) => i.id === id);

  if (!insight) return <Redirect href="/(tabs)/coachify" />;

  return (
    <SafeAreaView className="flex-1 bg-ink" edges={['top']}>
      <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 32 }}>
        <ScreenHeader title="Insight" back />

        <Badge label={insight.category.toUpperCase()} tone={severityTone[insight.severity]} className="mb-3" />
        <Text className="text-fg text-2xl font-extrabold mb-1">{insight.title}</Text>
        <Text className="text-fg-subtle text-sm mb-5">{insight.date}</Text>

        <Card className="mb-5">
          <Text className="text-fg-subtle text-sm leading-5">{insight.detail}</Text>
        </Card>

        <Text className="text-fg font-bold text-base mb-3">Coachify recommends</Text>
        <View className="gap-2">
          {insight.recommendations.map((rec) => (
            <View key={rec} className="flex-row items-start gap-2 bg-ink-card border border-ink-border rounded-xl p-3">
              <CheckCircle2 color={colors.salmon} size={16} style={{ marginTop: 2 }} />
              <Text className="text-fg-subtle text-sm flex-1">{rec}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
