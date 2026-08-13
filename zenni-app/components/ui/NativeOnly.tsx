import { View, Text, Platform } from 'react-native';
import { Smartphone } from 'lucide-react-native';

type Props = {
  children?: React.ReactNode;
  message?: string;
  compact?: boolean;
};

/**
 * Wraps hardware-dependent actions (GPS tracking, Bluetooth smartband sync).
 * On web these can't run for real, so we swap them for a styled notice while
 * the rest of the screen keeps rendering with mock data.
 */
export function NativeOnly({ children, message, compact }: Props) {
  if (Platform.OS !== 'web') return <>{children}</>;

  return (
    <View
      className={`bg-ink-card border border-ink-border rounded-2xl items-center ${
        compact ? 'px-4 py-3 flex-row gap-3' : 'px-6 py-6'
      }`}
    >
      <View className="w-10 h-10 rounded-full bg-salmon/15 items-center justify-center">
        <Smartphone color="#FF6B5B" size={18} />
      </View>
      <View className={compact ? 'flex-1' : 'items-center mt-2'}>
        <Text className={`text-fg font-bold ${compact ? 'text-sm' : 'text-base text-center'}`}>
          {message ?? 'Available on the Zenni iOS & Android app'}
        </Text>
        <Text
          className={`text-fg-subtle ${compact ? 'text-xs mt-0.5' : 'text-sm text-center mt-1'}`}
        >
          Download the mobile app to use GPS tracking and smartband sync
        </Text>
      </View>
    </View>
  );
}
