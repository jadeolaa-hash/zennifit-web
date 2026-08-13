import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Lock } from 'lucide-react-native';
import { TierId, TIERS, meetsTier } from '@/constants/pricing';
import { Button } from './Button';

type Props = {
  requiredTier: TierId;
  userTier: TierId;
  children: React.ReactNode;
  label?: string;
};

export function PaywallGate({ requiredTier, userTier, children, label }: Props) {
  const router = useRouter();
  const unlocked = meetsTier(userTier, requiredTier);

  if (unlocked) return <>{children}</>;

  const tier = TIERS[requiredTier];

  return (
    <View className="rounded-2xl overflow-hidden border border-ink-border">
      <View pointerEvents="none" style={{ opacity: 0.25 }}>
        {children}
      </View>
      <View className="absolute inset-0 items-center justify-center bg-ink/80 px-6 py-8">
        <View
          className="w-11 h-11 rounded-full items-center justify-center mb-3"
          style={{ backgroundColor: `${tier.color}33` }}
        >
          <Lock color={tier.color} size={20} />
        </View>
        <Text className="text-fg text-base font-bold text-center">
          {label ?? `${tier.name}+ feature`}
        </Text>
        <Text className="text-fg-subtle text-sm text-center mt-1 mb-4">
          Upgrade to {tier.name} to unlock this
        </Text>
        <Button
          label={`Upgrade to ${tier.name}`}
          size="sm"
          onPress={() => router.push('/profile/pricing')}
        />
      </View>
    </View>
  );
}
