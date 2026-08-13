import { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, Redirect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckCircle2, Circle, Timer } from 'lucide-react-native';
import { ScreenHeader, Button, Card } from '@/components/ui';
import { PROGRAMS } from '@/data/programs';
import { colors } from '@/constants/theme';

export default function WorkoutPlayer() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const day = PROGRAMS.flatMap((p) => p.days).find((d) => d.id === id);
  const [done, setDone] = useState<Record<number, boolean>>({});

  if (!day) return <Redirect href="/(tabs)/train" />;

  const completedCount = Object.values(done).filter(Boolean).length;

  return (
    <SafeAreaView className="flex-1 bg-ink" edges={['top']}>
      <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 32 }}>
        <ScreenHeader title={day.title} subtitle={day.focus} back />

        <View className="flex-row items-center gap-2 mb-5">
          <Timer color={colors.salmon} size={16} />
          <Text className="text-fg-subtle text-sm">
            {day.durationMin} min · {completedCount}/{day.exercises.length} done
          </Text>
        </View>

        <View className="gap-3 mb-6">
          {day.exercises.map((ex, i) => {
            const isDone = !!done[i];
            return (
              <Pressable key={ex.name} onPress={() => setDone((d) => ({ ...d, [i]: !d[i] }))}>
                <Card className={`flex-row items-center gap-3 ${isDone ? 'opacity-50' : ''}`}>
                  {isDone ? (
                    <CheckCircle2 color={colors.salmon} size={22} />
                  ) : (
                    <Circle color={colors.textMuted} size={22} />
                  )}
                  <View className="flex-1">
                    <Text className={`text-fg font-bold text-sm ${isDone ? 'line-through' : ''}`}>{ex.name}</Text>
                    <Text className="text-fg-subtle text-xs mt-0.5">
                      {ex.sets} sets × {ex.reps} · rest {ex.restSec}s
                    </Text>
                    {ex.notes ? <Text className="text-fg-subtle text-xs mt-0.5">{ex.notes}</Text> : null}
                  </View>
                </Card>
              </Pressable>
            );
          })}
        </View>

        <Button
          label={completedCount === day.exercises.length ? 'Workout complete' : 'Mark all complete'}
          fullWidth
          size="lg"
          disabled={completedCount === day.exercises.length}
          onPress={() =>
            setDone(Object.fromEntries(day.exercises.map((_, i) => [i, true])))
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
}
