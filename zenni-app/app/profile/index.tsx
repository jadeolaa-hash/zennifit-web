import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, CreditCard, Watch, Bell, User, LogOut } from 'lucide-react-native';
import { ScreenHeader, Card, DragonMascot, TierBadge } from '@/components/ui';
import { useAppState } from '@/context/AppStateContext';
import { TIER_ORDER } from '@/constants/pricing';
import { colors } from '@/constants/theme';

export default function Profile() {
  const router = useRouter();
  const { user, tier, setTier } = useAppState();

  const rows = [
    { icon: CreditCard, label: 'Pricing & Plans', sub: 'Manage your Zenni subscription', href: '/profile/pricing' as const },
    { icon: Watch, label: 'Smartband', sub: 'Connection & sync settings', href: '/profile/smartband' as const },
    { icon: Bell, label: 'Notifications', sub: 'Coachify alerts & reminders', href: null },
    { icon: User, label: 'Account', sub: 'Personal details', href: null },
  ];

  return (
    <SafeAreaView className="flex-1 bg-ink" edges={['top']}>
      <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 32 }}>
        <ScreenHeader title="Profile" back />

        <Card className="flex-row items-center gap-4 mb-6">
          <View className="w-16 h-16 rounded-full bg-ink-raised items-center justify-center">
            <DragonMascot size={40} />
          </View>
          <View className="flex-1">
            <Text className="text-fg text-lg font-extrabold">{user.name}</Text>
            <View className="mt-1">
              <TierBadge tier={tier} />
            </View>
          </View>
        </Card>

        <Text className="text-fg-subtle text-xs font-semibold uppercase mb-2">
          Preview as (demo tier switcher)
        </Text>
        <View className="flex-row gap-2 mb-6">
          {TIER_ORDER.map((t) => (
            <Pressable
              key={t}
              onPress={() => setTier(t)}
              className={`flex-1 items-center py-2 rounded-xl border ${
                tier === t ? 'bg-salmon border-salmon' : 'bg-ink-card border-ink-border'
              }`}
            >
              <Text className={`text-xs font-bold capitalize ${tier === t ? 'text-ink' : 'text-fg-muted'}`}>
                {t}
              </Text>
            </Pressable>
          ))}
        </View>

        <View className="gap-2 mb-6">
          {rows.map((row) => (
            <Pressable
              key={row.label}
              disabled={!row.href}
              onPress={() => row.href && router.push(row.href)}
              className="flex-row items-center gap-3 bg-ink-card border border-ink-border rounded-xl px-4 py-3.5"
            >
              <View className="w-9 h-9 rounded-full bg-ink-raised items-center justify-center">
                <row.icon color={colors.salmon} size={16} />
              </View>
              <View className="flex-1">
                <Text className="text-fg font-semibold text-sm">{row.label}</Text>
                <Text className="text-fg-subtle text-xs mt-0.5">{row.sub}</Text>
              </View>
              {row.href ? <ChevronRight color={colors.textMuted} size={16} /> : null}
            </Pressable>
          ))}
        </View>

        <Pressable className="flex-row items-center justify-center gap-2 py-3">
          <LogOut color={colors.textMuted} size={16} />
          <Text className="text-fg-subtle text-sm font-semibold">Sign out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
