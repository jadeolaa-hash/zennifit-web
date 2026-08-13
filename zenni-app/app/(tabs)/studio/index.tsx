import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Play, Clock } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable } from 'react-native';
import { ScreenHeader, SectionHeader, Badge, PaywallGate } from '@/components/ui';
import { useAppState } from '@/context/AppStateContext';
import { STUDIO_CONTENT, CREATORS } from '@/data/studioContent';
import { meetsTier } from '@/constants/pricing';

export default function StudioHub() {
  const router = useRouter();
  const { tier } = useAppState();

  return (
    <SafeAreaView className="flex-1 bg-ink" edges={['top']}>
      <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 32 }}>
        <ScreenHeader title="Zenni Studio" subtitle="Coaching content from real creators" />

        {!meetsTier(tier, 'gold') ? (
          <View className="bg-ink-card border border-garnet rounded-2xl px-4 py-3 mb-5">
            <Text className="text-fg font-bold text-sm mb-1">Studio is included from Gold</Text>
            <Text className="text-fg-subtle text-xs">
              Upgrade to unlock the full creator catalog and watch on any device
            </Text>
          </View>
        ) : null}

        <SectionHeader title="Creators" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-5">
          <View className="flex-row gap-3">
            {CREATORS.map((creator) => (
              <View key={creator.id} className="items-center w-20">
                <View
                  className="w-16 h-16 rounded-full items-center justify-center mb-2"
                  style={{ backgroundColor: `${creator.color}22`, borderWidth: 1, borderColor: creator.color }}
                >
                  <Text className="text-lg font-extrabold" style={{ color: creator.color }}>
                    {creator.name.split(' ').map((n) => n[0]).join('')}
                  </Text>
                </View>
                <Text className="text-fg-subtle text-[11px] text-center" numberOfLines={1}>
                  {creator.name}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>

        <SectionHeader title="Watch now" />
        <View className="gap-3">
          {STUDIO_CONTENT.map((content) => {
            const creator = CREATORS.find((c) => c.id === content.creatorId)!;
            return (
              <PaywallGate key={content.id} requiredTier={content.requiredTier} userTier={tier}>
                <Pressable onPress={() => router.push(`/(tabs)/studio/${content.id}`)}>
                  <LinearGradient
                    colors={content.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ borderRadius: 16, padding: 16, minHeight: 110, justifyContent: 'space-between' }}
                  >
                    <View className="flex-row items-center justify-between">
                      <Badge label={content.category.toUpperCase()} tone="neutral" />
                      <View className="w-8 h-8 rounded-full bg-black/30 items-center justify-center">
                        <Play color="#fff" size={14} fill="#fff" />
                      </View>
                    </View>
                    <View>
                      <Text className="text-white font-extrabold text-base">{content.title}</Text>
                      <View className="flex-row items-center gap-3 mt-1">
                        <Text className="text-white/80 text-xs">{creator.name}</Text>
                        <View className="flex-row items-center gap-1">
                          <Clock color="#fff" size={11} />
                          <Text className="text-white/80 text-xs">{content.durationMin} min</Text>
                        </View>
                      </View>
                    </View>
                  </LinearGradient>
                </Pressable>
              </PaywallGate>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
