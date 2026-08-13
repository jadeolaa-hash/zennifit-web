import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors } from '@/constants/theme';

type Props = {
  progress: number; // 0..1
  size?: number;
  strokeWidth?: number;
  label?: string;
  value?: string;
  color?: string;
};

export function ProgressRing({
  progress,
  size = 96,
  strokeWidth = 10,
  label,
  value,
  color = colors.salmon,
}: Props) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(1, progress));
  const dashOffset = circumference * (1 - clamped);

  return (
    <View style={{ width: size, height: size }} className="items-center justify-center">
      <Svg
        width={size}
        height={size}
        style={{ position: 'absolute', transform: [{ rotate: '-90deg' }] }}
      >
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.inkBorder}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />
      </Svg>
      {value ? <Text className="text-fg text-xl font-extrabold">{value}</Text> : null}
      {label ? <Text className="text-fg-subtle text-[10px] font-semibold">{label}</Text> : null}
    </View>
  );
}
