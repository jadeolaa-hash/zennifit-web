import { Stack } from 'expo-router';
import { colors } from '@/constants/theme';

export default function RunLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.ink } }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="trail/[id]" />
      <Stack.Screen name="active" options={{ presentation: 'fullScreenModal' }} />
      <Stack.Screen name="summary" />
    </Stack>
  );
}
