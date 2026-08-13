import { View } from 'react-native';
import Svg, { Circle, Rect, G, Defs, LinearGradient, Stop } from 'react-native-svg';
import { colors } from '@/constants/theme';

export type MuscleZone = 'shoulders' | 'chest' | 'arms' | 'abs' | 'legs';

export const MUSCLE_ZONES: { key: MuscleZone; label: string }[] = [
  { key: 'shoulders', label: 'Shoulders' },
  { key: 'chest', label: 'Chest' },
  { key: 'arms', label: 'Arms' },
  { key: 'abs', label: 'Abs' },
  { key: 'legs', label: 'Legs' },
];

type Props = {
  selected: MuscleZone[];
  onToggle: (zone: MuscleZone) => void;
  size?: number;
};

type ZoneShape = { x: number; y: number; width: number; height: number; rx: number; rotation?: number };

const SHAPES: Record<MuscleZone, ZoneShape | ZoneShape[]> = {
  shoulders: { x: 64, y: 62, width: 72, height: 24, rx: 12 },
  chest: { x: 70, y: 90, width: 60, height: 46, rx: 16 },
  abs: { x: 78, y: 138, width: 44, height: 54, rx: 14 },
  arms: [
    { x: 34, y: 66, width: 22, height: 132, rx: 11, rotation: -6 },
    { x: 144, y: 66, width: 22, height: 132, rx: 11, rotation: 6 },
  ],
  legs: [
    { x: 72, y: 196, width: 26, height: 200, rx: 13 },
    { x: 102, y: 196, width: 26, height: 200, rx: 13 },
  ],
};

export function BodyModel({ selected, onToggle, size = 220 }: Props) {
  const height = size * 2;

  return (
    <View style={{ width: size, height, alignItems: 'center' }}>
      <Svg width={size} height={height} viewBox="0 0 200 440">
        <Defs>
          <LinearGradient id="zoneIdle" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={colors.inkCard} />
            <Stop offset="1" stopColor={colors.inkRaised} />
          </LinearGradient>
          <LinearGradient id="zoneSelected" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={colors.salmonLight} />
            <Stop offset="1" stopColor={colors.salmon} />
          </LinearGradient>
        </Defs>

        {/* Head + neck: decorative, not tappable */}
        <Circle cx={100} cy={36} r={22} fill={colors.inkBorder} />
        <Rect x={92} y={52} width={16} height={16} rx={4} fill={colors.inkBorder} />

        {MUSCLE_ZONES.map(({ key }) => {
          const isSelected = selected.includes(key);
          const shapes = Array.isArray(SHAPES[key]) ? (SHAPES[key] as ZoneShape[]) : [SHAPES[key] as ZoneShape];
          return shapes.map((shape, i) => {
            const rect = (
              <Rect
                x={shape.x}
                y={shape.y}
                width={shape.width}
                height={shape.height}
                rx={shape.rx}
                fill={isSelected ? 'url(#zoneSelected)' : 'url(#zoneIdle)'}
                stroke={isSelected ? colors.salmonLight : colors.inkBorder}
                strokeWidth={isSelected ? 2 : 1}
                opacity={isSelected ? 1 : 0.9}
                onPress={() => onToggle(key)}
              />
            );
            if (!shape.rotation) return <G key={`${key}-${i}`}>{rect}</G>;
            const cx = shape.x + shape.width / 2;
            const cy = shape.y + shape.height / 2;
            return (
              <G key={`${key}-${i}`} transform={`rotate(${shape.rotation} ${cx} ${cy})`}>
                {rect}
              </G>
            );
          });
        })}
      </Svg>
    </View>
  );
}
