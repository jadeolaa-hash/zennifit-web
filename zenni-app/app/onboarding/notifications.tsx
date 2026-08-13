import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell } from 'lucide-react-native';
import { OnboardingHeader, Button, Card } from '@/components/ui';
import { colors } from '@/constants/theme';

export default function NotificationsScreen() {
  const router = useRouter();
  const enterApp = () => router.replace('/(tabs)');

  return (
    <SafeAreaView className="flex-1 bg-ink" edges={['top', 'bottom']}>
      <View className="flex-1 px-6 pt-4">
        <OnboardingHeader progress={1} title="You're almost there" />

        <Card className="items-center py-8 mt-4">
          <View className="w-16 h-16 rounded-full bg-salmon/15 items-center justify-center mb-5">
            <Bell color={colors.salmon} size={28} />
          </View>
          <Text className="text-fg text-lg font-bold text-center">Enable notifications</Text>
          <Text className="text-fg-subtle text-sm text-center mt-2 max-w-[260px]">
            We'll remind you when it's time to train, when rest between sets has elapsed, and when
            Coachify has a new insight for you.
          </Text>
        </Card>
      </View>

      <View className="px-6 pb-6 gap-3">
        <Button label="Enable notifications" size="lg" fullWidth onPress={enterApp} />
        <Button label="Remind me later" variant="secondary" size="lg" fullWidth onPress={enterApp} />
      </View>
    </SafeAreaView>
  );
}
