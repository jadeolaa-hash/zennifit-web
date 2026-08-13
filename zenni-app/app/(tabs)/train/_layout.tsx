import { Stack } from 'expo-router';
import { colors } from '@/constants/theme';

export default function TrainLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.ink } }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="program/[id]" />
      <Stack.Screen name="workout/[id]" />
    </Stack>
  );
}
