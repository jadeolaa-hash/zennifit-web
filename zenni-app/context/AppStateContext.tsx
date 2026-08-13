import { createContext, useContext, useMemo, useState } from 'react';
import { TierId } from '@/constants/pricing';
import { MOCK_USER, UserProfile } from '@/data/user';

type AppState = {
  tier: TierId;
  setTier: (tier: TierId) => void;
  user: UserProfile;
  bandConnected: boolean;
  setBandConnected: (connected: boolean) => void;
};

const AppStateContext = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [tier, setTier] = useState<TierId>(MOCK_USER.tier);
  const [bandConnected, setBandConnected] = useState(MOCK_USER.connectedBand);

  const value = useMemo<AppState>(
    () => ({
      tier,
      setTier,
      user: MOCK_USER,
      bandConnected,
      setBandConnected,
    }),
    [tier, bandConnected]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
}
