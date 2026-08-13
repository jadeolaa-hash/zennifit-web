import { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Star, MapPin, TrendingUp } from 'lucide-react-native';
import {
  ScreenHeader,
  SectionHeader,
  SegmentedControl,
  PressableCard,
  Badge,
  StatTile,
  TrailMapPreview,
  Button,
  NativeOnly,
  PaywallGate,
} from '@/components/ui';
import { useAppState } from '@/context/AppStateContext';
import { TRAILS, Difficulty } from '@/data/trails';
import { RECENT_RUNS } from '@/data/runs';
import { colors } from '@/constants/theme';

const difficultyTone: Record<Difficulty, 'success' | 'warning' | 'salmon'> = {
  easy: 'success',
  moderate: 'warning',
  hard: 'salmon',
};

export default function RunTab() {
  const [segment, setSegment] = useState<'trails' | 'performance'>('trails');
  const router = useRouter();
  const { tier } = useAppState();

  return (
    <SafeAreaView className="flex-1 bg-ink" edges={['top']}>
      <View className="px-5 pt-2">
        <ScreenHeader title="Run" subtitle="Trails, hikes & performance" />
        <SegmentedControl
          value={segment}
          onChange={setSegment}
          options={[
            { value: 'trails', label: 'Trails' },
            { value: 'performance', label: 'Performance' },
          ]}
        />
      </View>

      {segment === 'trails' ? (
        <ScrollView className="flex-1 px-5 mt-4" contentContainerStyle={{ paddingBottom: 32 }}>
          <NativeOnly compact message="Start a live GPS run on the Zenni app">
            <Button label="Start a Run" fullWidth onPress={() => router.push('/(tabs)/run/active')} />
          </NativeOnly>

          <SectionHeader title="Discover trails" />
          <View className="gap-3">
            {TRAILS.map((trail) => (
              <PressableCard key={trail.id} onPress={() => router.push(`/(tabs)/run/trail/${trail.id}`)}>
                <TrailMapPreview height={100} routePath={trail.routePath} />
                <View className="flex-row items-center justify-between mt-3">
                  <Text className="text-fg font-bold text-base flex-1">{trail.name}</Text>
                  <Badge label={trail.difficulty.toUpperCase()} tone={difficultyTone[trail.difficulty]} />
                </View>
                <View className="flex-row items-center gap-1 mt-1">
                  <MapPin color={colors.textMuted} size={12} />
                  <Text className="text-fg-subtle text-xs">{trail.location}</Text>
                </View>
                <View className="flex-row items-center gap-4 mt-2">
                  <Text className="text-fg-muted text-xs font-semibold">{trail.distanceKm} km</Text>
                  <Text className="text-fg-muted text-xs font-semibold">{trail.elevationM} m gain</Text>
                  <View className="flex-row items-center gap-1">
                    <Star color={colors.warning} size={12} fill={colors.warning} />
                    <Text className="text-fg-muted text-xs font-semibold">
                      {trail.rating} ({trail.reviewCount})
                    </Text>
                  </View>
                </View>
              </PressableCard>
            ))}
          </View>
        </ScrollView>
      ) : (
        <ScrollView className="flex-1 px-5 mt-4" contentContainerStyle={{ paddingBottom: 32 }}>
          <View className="flex-row gap-3 mb-4">
            <StatTile label="This week" value="21.4" unit="km" accent />
            <StatTile label="Avg pace" value="5:24" unit="/km" />
            <StatTile label="Runs" value="4" />
          </View>

          <PaywallGate requiredTier="gold" userTier={tier} label="Phone vs. smartband performance sync">
            <View className="bg-ink-card border border-ink-border rounded-2xl p-4 mb-2">
              <View className="flex-row items-center gap-2 mb-3">
                <TrendingUp color={colors.salmon} size={16} />
                <Text className="text-fg font-bold text-sm">Phone vs. Zenni Band accuracy</Text>
              </View>
              <Text className="text-fg-subtle text-xs mb-3">
                Your band's pace readings are averaging 2% faster than phone GPS across your last 5 runs.
              </Text>
              <View className="flex-row gap-3">
                <StatTile label="Phone avg pace" value="5:42" unit="/km" />
                <StatTile label="Band avg pace" value="5:33" unit="/km" accent />
              </View>
            </View>
          </PaywallGate>

          <SectionHeader title="Recent runs" />
          <View className="gap-3">
            {RECENT_RUNS.map((run) => (
              <PressableCard key={run.id} onPress={() => router.push('/(tabs)/run/summary')}>
                <View className="flex-row items-center justify-between">
                  <Text className="text-fg font-bold text-sm">{run.title}</Text>
                  <Text className="text-fg-subtle text-xs">{run.date}</Text>
                </View>
                <View className="flex-row items-center gap-4 mt-2">
                  <Text className="text-fg-muted text-xs font-semibold">{run.distanceKm} km</Text>
                  <Text className="text-fg-muted text-xs font-semibold">{run.durationMin} min</Text>
                  <Text className="text-fg-muted text-xs font-semibold">{run.avgPaceMinPerKm.toFixed(2)} /km</Text>
                </View>
              </PressableCard>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
