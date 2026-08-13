import { View, Text, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter, Redirect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Clock } from 'lucide-react-native';
import { ScreenHeader, Badge, PaywallGate } from '@/components/ui';
import { useAppState } from '@/context/AppStateContext';
import { STUDIO_CONTENT, CREATORS } from '@/data/studioContent';

export default function StudioDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { tier } = useAppState();
  const content = STUDIO_CONTENT.find((c) => c.id === id);

  if (!content) return <Redirect href="/(tabs)/studio" />;
  const creator = CREATORS.find((c) => c.id === content.creatorId)!;

  return (
    <SafeAreaView className="flex-1 bg-ink" edges={['top']}>
      <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 32 }}>
        <ScreenHeader title="Studio" back />

        <PaywallGate requiredTier={content.requiredTier} userTier={tier} label={`${content.title} is a ${content.requiredTier}+ video`}>
          <LinearGradient
            colors={content.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ borderRadius: 20, height: 200, alignItems: 'center', justifyContent: 'center' }}
          >
            <Pressable className="w-16 h-16 rounded-full bg-black/30 items-center justify-center">
              <Play color="#fff" size={26} fill="#fff" />
            </Pressable>
          </LinearGradient>
        </PaywallGate>

        <View className="flex-row items-center gap-2 mt-4 mb-1">
          <Badge label={content.category.toUpperCase()} tone="neutral" />
          <View className="flex-row items-center gap-1">
            <Clock color="#75757C" size={12} />
            <Text className="text-fg-subtle text-xs">{content.durationMin} min</Text>
          </View>
        </View>
        <Text className="text-fg text-2xl font-extrabold mt-2 mb-1">{content.title}</Text>
        <Text className="text-fg-subtle text-sm mb-4">
          {creator.name} · {creator.specialty}
        </Text>
        <Text className="text-fg-subtle text-sm leading-5">{content.description}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
