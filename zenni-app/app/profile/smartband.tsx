import { View, Text, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Watch, Heart, Footprints, Moon } from 'lucide-react-native';
import { ScreenHeader, Card, Badge, NativeOnly, StatTile } from '@/components/ui';
import { useAppState } from '@/context/AppStateContext';
import { colors } from '@/constants/theme';

export default function Smartband() {
  const { user, bandConnected, setBandConnected } = useAppState();

  return (
    <SafeAreaView className="flex-1 bg-ink" edges={['top']}>
      <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 32 }}>
        <ScreenHeader title="Smartband" subtitle="Connection & performance sync" back />

        <Card className="flex-row items-center gap-3 mb-5">
          <View
            className="w-12 h-12 rounded-2xl items-center justify-center"
            style={{ backgroundColor: bandConnected ? `${colors.success}22` : `${colors.textMuted}22` }}
          >
            <Watch color={bandConnected ? colors.success : colors.textMuted} size={22} />
          </View>
          <View className="flex-1">
            <Text className="text-fg font-bold text-base">{user.bandModel}</Text>
            <Badge
              label={bandConnected ? 'CONNECTED' : 'DISCONNECTED'}
              tone={bandConnected ? 'success' : 'neutral'}
              className="mt-1"
            />
          </View>
        </Card>

        <NativeOnly message="Pairing a smartband over Bluetooth requires the Zenni mobile app">
          <View className="flex-row items-center justify-between bg-ink-card border border-ink-border rounded-xl px-4 py-3.5 mb-5">
            <Text className="text-fg font-semibold text-sm">Band connected</Text>
            <Switch
              value={bandConnected}
              onValueChange={setBandConnected}
              trackColor={{ true: colors.salmon, false: colors.inkBorder }}
            />
          </View>
        </NativeOnly>

        <Text className="text-fg font-bold text-base mb-3">Today from your band</Text>
        <View className="flex-row gap-3 mb-5">
          <StatTile label="Resting HR" value="54" unit="bpm" />
          <StatTile label="Steps" value="6.2k" />
          <StatTile label="Sleep" value="7h 42m" />
        </View>

        <View className="gap-2 mb-6">
          <SyncRow icon={Heart} label="Heart rate" desc="Continuous during workouts" />
          <SyncRow icon={Footprints} label="Pace & cadence" desc="Compared against phone GPS" />
          <SyncRow icon={Moon} label="Sleep & recovery" desc="Feeds your Coachify readiness score" />
        </View>

        <Text className="text-fg-subtle text-xs text-center">
          Full performance sync (pace, splits, cadence comparison) requires Gold or above.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function SyncRow({ icon: Icon, label, desc }: { icon: typeof Heart; label: string; desc: string }) {
  return (
    <View className="flex-row items-center gap-3 bg-ink-card border border-ink-border rounded-xl px-4 py-3">
      <View className="w-9 h-9 rounded-full bg-salmon/15 items-center justify-center">
        <Icon color={colors.salmon} size={16} />
      </View>
      <View className="flex-1">
        <Text className="text-fg font-semibold text-sm">{label}</Text>
        <Text className="text-fg-subtle text-xs mt-0.5">{desc}</Text>
      </View>
    </View>
  );
}
