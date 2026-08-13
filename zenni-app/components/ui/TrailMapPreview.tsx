import { View } from 'react-native';
import Svg, { Path, Circle, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { colors } from '@/constants/theme';

type Props = {
  height?: number;
  routePath?: string;
  rounded?: boolean;
};

const DEFAULT_PATH =
  'M10,90 C40,70 30,40 60,35 C90,30 80,60 110,55 C140,50 130,20 170,15';

export function TrailMapPreview({ height = 160, routePath = DEFAULT_PATH, rounded = true }: Props) {
  return (
    <View
      style={{ height, overflow: 'hidden' }}
      className={`bg-ink-raised border border-ink-border ${rounded ? 'rounded-2xl' : ''}`}
    >
      <Svg width="100%" height="100%" viewBox="0 0 180 110" preserveAspectRatio="xMidYMid slice">
        <Defs>
          <LinearGradient id="mapBg" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#1C1C1F" />
            <Stop offset="1" stopColor="#232327" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="180" height="110" fill="url(#mapBg)" />
        {[20, 45, 70, 95].map((y) => (
          <Path key={y} d={`M0,${y} L180,${y - 6}`} stroke="#2E2E33" strokeWidth={1} />
        ))}
        <Path d={routePath} stroke={colors.salmon} strokeWidth={3} fill="none" strokeLinecap="round" />
        <Circle cx="10" cy="90" r="4" fill={colors.salmon} />
        <Circle cx="170" cy="15" r="4" fill={colors.garnet} stroke="#fff" strokeWidth={1} />
      </Svg>
    </View>
  );
}
