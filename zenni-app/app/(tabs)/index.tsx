import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Flame, ChevronRight, Watch } from 'lucide-react-native';
import {
  ScreenHeader,
  SectionHeader,
  Card,
  PressableCard,
  StatTile,
  ProgressRing,
  TierBadge,
  DragonMascot,
  Badge,
} from '@/components/ui';
import { useAppState } from '@/context/AppStateContext';
import { COACHING_INSIGHTS } from '@/data/coachingInsights';
import { TRAILS } from '@/data/trails';
import { colors } from '@/constants/theme';

export default function Home() {
  const router = useRouter();
  const { user, tier, bandConnected } = useAppState();
  const topInsight = COACHING_INSIGHTS[0];
  const nextTrail = TRAILS[0];
  const weeklyPct = user.weeklyProgressKm / user.weeklyGoalKm;

  return (
    <SafeAreaView className="flex-1 bg-ink" edges={['top']}>
      <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 32 }}>
        <ScreenHeader
          title={`Hey ${user.name}`}
          subtitle="Here's where things stand today"
          right={
            <Pressable
              onPress={() => router.push('/profile')}
              className="w-11 h-11 rounded-full bg-ink-card border border-ink-border items-center justify-center"
            >
              <DragonMascot size={26} />
            </Pressable>
          }
        />

        <View className="flex-row items-center gap-2 mb-4">
          <TierBadge tier={tier} />
          <View className="flex-row items-center gap-1 bg-ink-card border border-ink-border rounded-full px-2.5 py-1">
            <Flame color={colors.salmon} size={12} />
            <Text className="text-fg text-xs font-bold">{user.streakDays} day streak</Text>
          </View>
        </View>

        <Card className="flex-row items-center gap-4 mb-4">
          <ProgressRing
            progress={weeklyPct}
            size={84}
            strokeWidth={9}
            value={`${Math.round(weeklyPct * 100)}%`}
            label="WEEKLY"
          />
          <View className="flex-1">
            <Text className="text-fg-subtle text-xs font-semibold uppercase">Weekly distance</Text>
            <Text className="text-fg text-xl font-extrabold mt-1">
              {user.weeklyProgressKm}
              <Text className="text-fg-muted text-base font-semibold"> / {user.weeklyGoalKm} km</Text>
            </Text>
            <Text className="text-fg-subtle text-xs mt-1">Coachify readiness: {user.readinessScore}/100</Text>
          </View>
        </Card>

        <PressableCard className="mb-4 flex-row items-center gap-3" onPress={() => router.push('/(tabs)/train')}>
          <View className="w-10 h-10 rounded-xl bg-salmon/15 items-center justify-center">
            <Flame color={colors.salmon} size={18} />
          </View>
          <View className="flex-1">
            <Text className="text-fg-subtle text-xs font-semibold uppercase">Today's plan</Text>
            <Text className="text-fg text-sm font-bold mt-0.5">{user.todaysPlan}</Text>
          </View>
          <ChevronRight color={colors.textMuted} size={18} />
        </PressableCard>

        <PressableCard
          className="mb-6 flex-row items-center gap-3"
          onPress={() => router.push('/profile/smartband')}
        >
          <View
            className="w-10 h-10 rounded-xl items-center justify-center"
            style={{ backgroundColor: bandConnected ? `${colors.success}22` : `${colors.textMuted}22` }}
          >
            <Watch color={bandConnected ? colors.success : colors.textMuted} size={18} />
          </View>
          <View className="flex-1">
            <Text className="text-fg-subtle text-xs font-semibold uppercase">Smartband</Text>
            <Text className="text-fg text-sm font-bold mt-0.5">
              {bandConnected ? `${user.bandModel} connected` : 'Not connected'}
            </Text>
          </View>
          <Badge label={bandConnected ? 'SYNCED' : 'OFFLINE'} tone={bandConnected ? 'success' : 'neutral'} />
        </PressableCard>

        <SectionHeader
          title="Latest from Coachify"
          action="See all"
          onAction={() => router.push('/(tabs)/coachify')}
        />
        <PressableCard
          className="mb-6"
          onPress={() => router.push(`/(tabs)/coachify/${topInsight.id}`)}
        >
          <Badge
            label={topInsight.category.toUpperCase()}
            tone={topInsight.severity === 'positive' ? 'success' : topInsight.severity === 'attention' ? 'warning' : 'neutral'}
            className="mb-2"
          />
          <Text className="text-fg font-bold text-base">{topInsight.title}</Text>
          <Text className="text-fg-subtle text-sm mt-1">{topInsight.summary}</Text>
        </PressableCard>

        <SectionHeader
          title="Suggested trail"
          action="Explore"
          onAction={() => router.push('/(tabs)/run')}
        />
        <PressableCard onPress={() => router.push(`/(tabs)/run/trail/${nextTrail.id}`)}>
          <Text className="text-fg font-bold text-base">{nextTrail.name}</Text>
          <Text className="text-fg-subtle text-sm mt-1">
            {nextTrail.location} · {nextTrail.distanceKm} km · {nextTrail.difficulty}
          </Text>
        </PressableCard>
      </ScrollView>
    </SafeAreaView>
  );
}
