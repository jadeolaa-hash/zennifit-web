import Svg, { Path, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { colors } from '@/constants/theme';

type Props = {
  size?: number;
  mood?: 'default' | 'flying' | 'resting';
};

export function DragonMascot({ size = 96, mood = 'default' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <Defs>
        <LinearGradient id="dragonBody" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor={colors.salmonLight} />
          <Stop offset="1" stopColor={colors.garnet} />
        </LinearGradient>
      </Defs>

      <Path
        d="M20 78C24 54 40 34 62 30c14-3 22 6 18 16-3 8-14 8-18 2 6 10-2 20-14 20-6 0-10-3-12-8-4 10-10 16-16 18z"
        fill="url(#dragonBody)"
      />
      <Path
        d="M62 30c8-10 22-14 32-8 6 4 6 10 0 12-8 3-18-2-22-8z"
        fill="url(#dragonBody)"
      />
      <Path
        d="M14 84c-4 6-6 12-4 18 6-2 12-6 15-12-4-2-8-4-11-6z"
        fill={colors.garnetDark}
      />
      <Circle cx="88" cy="30" r="3.2" fill={colors.ink} />
      <Path
        d="M96 24c4-4 10-4 13 0-3 4-9 5-13 0z"
        fill={colors.salmon}
        opacity={mood === 'resting' ? 0.4 : 1}
      />
      <Path
        d="M30 70c10-4 22-4 30 4-10 6-22 4-30-4z"
        fill={colors.salmonLight}
        opacity={0.5}
      />
    </Svg>
  );
}
