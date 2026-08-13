import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, Pause } from 'lucide-react-native';
import { Pressable } from 'react-native';
import { TrailMapPreview, Button, NativeOnly } from '@/components/ui';
import { colors } from '@/constants/theme';

export default function ActiveRun() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-ink">
      <View className="flex-row items-center justify-between px-5 pt-2">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-ink-card border border-ink-border items-center justify-center"
        >
          <X color="#F5F3F2" size={18} />
        </Pressable>
        <Text className="text-fg font-bold">Tracking</Text>
        <View className="w-10" />
      </View>

      <View className="px-5 mt-3">
        <NativeOnly compact message="Live GPS tracking runs on the Zenni mobile app" />
      </View>

      <View className="px-5 mt-4">
        <TrailMapPreview height={220} />
      </View>

      <View className="flex-1 items-center justify-center px-5">
        <Text className="text-fg-subtle text-sm font-semibold uppercase tracking-wide">Elapsed time</Text>
        <Text className="text-fg text-6xl font-extrabold mt-1">12:34</Text>

        <View className="flex-row gap-8 mt-8">
          <View className="items-center">
            <Text className="text-fg text-2xl font-extrabold">2.14</Text>
            <Text className="text-fg-subtle text-xs font-semibold mt-1">DISTANCE (KM)</Text>
          </View>
          <View className="items-center">
            <Text className="text-salmon text-2xl font-extrabold">5:52</Text>
            <Text className="text-fg-subtle text-xs font-semibold mt-1">PACE /KM</Text>
          </View>
          <View className="items-center">
            <Text className="text-fg text-2xl font-extrabold">148</Text>
            <Text className="text-fg-subtle text-xs font-semibold mt-1">HEART RATE</Text>
          </View>
        </View>
      </View>

      <View className="px-5 pb-8">
        <NativeOnly message="Pause/finish controls require the mobile app's live GPS session">
          <View className="flex-row gap-3">
            <Button label="Pause" variant="secondary" icon={<Pause color={colors.textPrimary} size={16} />} className="flex-1" />
            <Button label="Finish" variant="primary" className="flex-1" onPress={() => router.replace('/(tabs)/run/summary')} />
          </View>
        </NativeOnly>
      </View>
    </SafeAreaView>
  );
}
