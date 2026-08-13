import { View, Text, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter, Redirect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clock, Layers } from 'lucide-react-native';
import { ScreenHeader, Badge, StatTile, PressableCard, PaywallGate } from '@/components/ui';
import { useAppState } from '@/context/AppStateContext';
import { PROGRAMS, Level } from '@/data/programs';
import { colors } from '@/constants/theme';

const levelTone: Record<Level, 'success' | 'warning' | 'salmon'> = {
  Beginner: 'success',
  Intermediate: 'warning',
  Advanced: 'salmon',
};

export default function ProgramDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { tier } = useAppState();
  const program = PROGRAMS.find((p) => p.id === id);

  if (!program) return <Redirect href="/(tabs)/train" />;

  return (
    <SafeAreaView className="flex-1 bg-ink" edges={['top']}>
      <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 32 }}>
        <ScreenHeader title="Program" back />

        <View className="flex-row items-center justify-between mb-1">
          <Text className="text-fg text-2xl font-extrabold flex-1">{program.name}</Text>
          <Badge label={program.level.toUpperCase()} tone={levelTone[program.level]} />
        </View>
        <Text className="text-fg-subtle text-sm mb-4">{program.coach} · {program.discipline}</Text>

        <View className="flex-row gap-3 mb-4">
          <StatTile label="Weeks" value={`${program.weeks}`} />
          <StatTile label="Days / week" value={`${program.daysPerWeek}`} />
          <StatTile label="Level" value={program.level} />
        </View>

        <Text className="text-fg-subtle text-sm leading-5 mb-5">{program.summary}</Text>

        <View className="flex-row items-center gap-2 mb-3">
          <Layers color={colors.salmon} size={16} />
          <Text className="text-fg font-bold text-base">Weekly structure</Text>
        </View>
        <View className="gap-2 mb-6">
          {program.weeklyFocus.map((focus, i) => (
            <View key={focus} className="flex-row items-center gap-3 bg-ink-card border border-ink-border rounded-xl px-3 py-2.5">
              <View className="w-6 h-6 rounded-full bg-salmon/15 items-center justify-center">
                <Text className="text-salmon text-xs font-bold">{i + 1}</Text>
              </View>
              <Text className="text-fg-subtle text-sm flex-1">{focus}</Text>
            </View>
          ))}
        </View>

        <PaywallGate requiredTier={program.requiredTier} userTier={tier} label="Full daily workouts">
          <View>
            <Text className="text-fg font-bold text-base mb-3">Days</Text>
            <View className="gap-3">
              {program.days.map((day) => (
                <PressableCard key={day.id} onPress={() => router.push(`/(tabs)/train/workout/${day.id}`)}>
                  <Text className="text-fg font-bold text-sm">{day.title}</Text>
                  <Text className="text-fg-subtle text-xs mt-0.5">{day.focus}</Text>
                  <View className="flex-row items-center gap-1 mt-2">
                    <Clock color={colors.textMuted} size={12} />
                    <Text className="text-fg-muted text-xs font-semibold">{day.durationMin} min · {day.exercises.length} exercises</Text>
                  </View>
                </PressableCard>
              ))}
            </View>
          </View>
        </PaywallGate>
      </ScrollView>
    </SafeAreaView>
  );
}
