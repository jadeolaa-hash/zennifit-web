import { View, Text, ScrollView } from 'react-native';
import { Check } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader, Button, Card } from '@/components/ui';
import { useAppState } from '@/context/AppStateContext';
import { TIER_ORDER, TIERS } from '@/constants/pricing';
import { colors } from '@/constants/theme';

export default function Pricing() {
  const { tier, setTier } = useAppState();

  return (
    <SafeAreaView className="flex-1 bg-ink" edges={['top']}>
      <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 32 }}>
        <ScreenHeader title="Plans" subtitle="Pick how deep your coaching & smartband data goes" back />

        <View className="gap-4">
          {TIER_ORDER.map((id) => {
            const t = TIERS[id];
            const isCurrent = tier === id;
            return (
              <Card
                key={id}
                className={isCurrent ? 'border-2' : ''}
                style={isCurrent ? { borderColor: t.color } : undefined}
              >
                <View className="flex-row items-center justify-between mb-1">
                  <Text className="text-fg text-xl font-extrabold" style={{ color: t.color }}>
                    {t.name}
                  </Text>
                  {isCurrent ? (
                    <View className="px-2.5 py-1 rounded-full bg-ink-raised">
                      <Text className="text-fg-subtle text-[10px] font-bold">CURRENT PLAN</Text>
                    </View>
                  ) : null}
                </View>
                <Text className="text-fg-subtle text-sm mb-1">{t.tagline}</Text>
                <Text className="text-fg text-2xl font-extrabold mb-4">{t.priceLabel}</Text>

                <View className="gap-2 mb-4">
                  {t.features.map((f) => (
                    <View key={f} className="flex-row items-start gap-2">
                      <Check color={t.color} size={15} style={{ marginTop: 2 }} />
                      <Text className="text-fg-subtle text-sm flex-1">{f}</Text>
                    </View>
                  ))}
                </View>

                <Button
                  label={isCurrent ? 'Current plan' : `Switch to ${t.name}`}
                  variant={isCurrent ? 'secondary' : 'primary'}
                  fullWidth
                  disabled={isCurrent}
                  onPress={() => setTier(id)}
                />
              </Card>
            );
          })}
        </View>

        <Text className="text-fg-subtle text-xs text-center mt-6">
          This is a UI preview — plan switching here is a demo control, not a real payment.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
