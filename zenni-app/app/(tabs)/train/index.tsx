import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dumbbell, Calendar } from 'lucide-react-native';
import { ScreenHeader, SectionHeader, PressableCard, Badge, PaywallGate, Card } from '@/components/ui';
import { useAppState } from '@/context/AppStateContext';
import { PROGRAMS, Level } from '@/data/programs';
import { colors } from '@/constants/theme';

const levelTone: Record<Level, 'success' | 'warning' | 'salmon'> = {
  Beginner: 'success',
  Intermediate: 'warning',
  Advanced: 'salmon',
};

export default function TrainHub() {
  const router = useRouter();
  const { tier } = useAppState();

  return (
    <SafeAreaView className="flex-1 bg-ink" edges={['top']}>
      <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 32 }}>
        <ScreenHeader title="Train" subtitle="Strength programs, Ladder-style" />

        <Card className="flex-row items-center gap-3 mb-5">
          <View className="w-10 h-10 rounded-xl bg-salmon/15 items-center justify-center">
            <Calendar color={colors.salmon} size={18} />
          </View>
          <View className="flex-1">
            <Text className="text-fg-subtle text-xs font-semibold uppercase">Today's session</Text>
            <Text className="text-fg text-sm font-bold mt-0.5">Better You: 6-Week Reset — Day 2</Text>
          </View>
        </Card>

        <SectionHeader title="Programs" />
        <View className="gap-3">
          {PROGRAMS.map((program) => (
            <PaywallGate
              key={program.id}
              requiredTier={program.requiredTier}
              userTier={tier}
              label={`${program.name} — ${program.requiredTier} feature`}
            >
              <PressableCard onPress={() => router.push(`/(tabs)/train/program/${program.id}`)}>
                <View className="flex-row items-center justify-between mb-1">
                  <Text className="text-fg font-bold text-base flex-1">{program.name}</Text>
                  <Badge label={program.level.toUpperCase()} tone={levelTone[program.level]} />
                </View>
                <Text className="text-fg-subtle text-xs">{program.coach} · {program.discipline}</Text>
                <Text className="text-fg-subtle text-sm mt-2">{program.summary}</Text>
                <View className="flex-row items-center gap-2 mt-3">
                  <Dumbbell color={colors.textMuted} size={13} />
                  <Text className="text-fg-muted text-xs font-semibold">
                    {program.weeks} weeks · {program.daysPerWeek}x/week
                  </Text>
                </View>
              </PressableCard>
            </PaywallGate>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
