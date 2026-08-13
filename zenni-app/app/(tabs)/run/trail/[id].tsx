import { View, Text, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter, Redirect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Star, MapPin } from 'lucide-react-native';
import { ScreenHeader, TrailMapPreview, Badge, StatTile, Button, NativeOnly } from '@/components/ui';
import { TRAILS, Difficulty } from '@/data/trails';
import { colors } from '@/constants/theme';

const difficultyTone: Record<Difficulty, 'success' | 'warning' | 'salmon'> = {
  easy: 'success',
  moderate: 'warning',
  hard: 'salmon',
};

export default function TrailDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const trail = TRAILS.find((t) => t.id === id);

  if (!trail) return <Redirect href="/(tabs)/run" />;

  return (
    <SafeAreaView className="flex-1 bg-ink" edges={['top']}>
      <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 32 }}>
        <ScreenHeader title="Trail" back />

        <TrailMapPreview height={200} routePath={trail.routePath} />

        <View className="flex-row items-center justify-between mt-4">
          <Text className="text-fg text-2xl font-extrabold flex-1">{trail.name}</Text>
          <Badge label={trail.difficulty.toUpperCase()} tone={difficultyTone[trail.difficulty]} />
        </View>
        <View className="flex-row items-center gap-1 mt-1">
          <MapPin color={colors.textMuted} size={13} />
          <Text className="text-fg-subtle text-sm">{trail.location}</Text>
        </View>
        <View className="flex-row items-center gap-1 mt-1">
          <Star color={colors.warning} size={13} fill={colors.warning} />
          <Text className="text-fg-muted text-sm font-semibold">
            {trail.rating} · {trail.reviewCount} reviews
          </Text>
        </View>

        <View className="flex-row gap-3 my-4">
          <StatTile label="Distance" value={`${trail.distanceKm}`} unit="km" />
          <StatTile label="Elevation" value={`${trail.elevationM}`} unit="m" />
          <StatTile label="Est. time" value={`${trail.estMinutes}`} unit="min" />
        </View>

        <View className="flex-row flex-wrap gap-2 mb-4">
          {trail.tags.map((tag) => (
            <Badge key={tag} label={tag} tone="neutral" />
          ))}
        </View>

        <Text className="text-fg font-bold text-base mb-2">About this trail</Text>
        <Text className="text-fg-subtle text-sm leading-5 mb-6">{trail.description}</Text>

        <NativeOnly message="Start GPS tracking on the Zenni app">
          <Button label="Start This Trail" fullWidth size="lg" onPress={() => router.push('/(tabs)/run/active')} />
        </NativeOnly>
      </ScrollView>
    </SafeAreaView>
  );
}
