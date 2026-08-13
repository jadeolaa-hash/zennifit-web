import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader, TrailMapPreview, StatTile, Card, Button, PaywallGate } from '@/components/ui';
import { useAppState } from '@/context/AppStateContext';
import { RECENT_RUNS } from '@/data/runs';
import { colors } from '@/constants/theme';

export default function RunSummary() {
  const router = useRouter();
  const { tier } = useAppState();
  const run = RECENT_RUNS[0];
  const maxPace = Math.max(...run.splits.map((s) => s.paceMinPerKm));
  const minPace = Math.min(...run.splits.map((s) => s.paceMinPerKm));

  return (
    <SafeAreaView className="flex-1 bg-ink" edges={['top']}>
      <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 32 }}>
        <ScreenHeader title="Run Summary" back />

        <TrailMapPreview height={180} />

        <View className="flex-row gap-3 my-4">
          <StatTile label="Distance" value={`${run.distanceKm}`} unit="km" accent />
          <StatTile label="Duration" value={`${run.durationMin}`} unit="min" />
          <StatTile label="Avg pace" value={run.avgPaceMinPerKm.toFixed(2)} unit="/km" />
        </View>
        <View className="flex-row gap-3 mb-6">
          <StatTile label="Calories" value={`${run.calories}`} />
          <StatTile label="Elevation gain" value={`${run.elevationGainM}`} unit="m" />
          <StatTile label="Avg HR" value={`${run.avgHeartRate}`} unit="bpm" />
        </View>

        <Text className="text-fg font-bold text-base mb-3">Splits</Text>
        <Card className="mb-6">
          {run.splits.map((split) => {
            const widthPct = 30 + ((split.paceMinPerKm - minPace) / (maxPace - minPace || 1)) * 60;
            return (
              <View key={split.km} className="flex-row items-center mb-2 last:mb-0">
                <Text className="text-fg-subtle text-xs w-6">{split.km}</Text>
                <View className="flex-1 bg-ink-raised rounded-full h-3 mx-2 overflow-hidden">
                  <View
                    style={{ width: `${widthPct}%`, backgroundColor: colors.salmon }}
                    className="h-3 rounded-full"
                  />
                </View>
                <Text className="text-fg-muted text-xs w-10 text-right">{split.paceMinPerKm.toFixed(1)}</Text>
              </View>
            );
          })}
        </Card>

        <PaywallGate requiredTier="gold" userTier={tier} label="Phone vs. smartband comparison">
          <Card className="mb-6">
            <Text className="text-fg font-bold text-sm mb-3">Phone vs. Zenni Band</Text>
            <View className="flex-row gap-3">
              <StatTile label="Phone GPS pace" value={run.phonePaceMinPerKm.toFixed(2)} unit="/km" />
              <StatTile label="Band pace" value={run.bandPaceMinPerKm.toFixed(2)} unit="/km" accent />
            </View>
          </Card>
        </PaywallGate>

        <Button label="Back to Run" variant="secondary" fullWidth onPress={() => router.push('/(tabs)/run')} />
      </ScrollView>
    </SafeAreaView>
  );
}
