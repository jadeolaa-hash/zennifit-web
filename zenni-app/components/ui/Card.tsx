import { View, ViewProps, Pressable, PressableProps } from 'react-native';

type CardProps = ViewProps & { className?: string };

export function Card({ className, children, ...rest }: CardProps) {
  return (
    <View
      className={`bg-ink-card border border-ink-border rounded-2xl p-4 ${className ?? ''}`}
      {...rest}
    >
      {children}
    </View>
  );
}

type PressableCardProps = PressableProps & { className?: string };

export function PressableCard({ className, children, ...rest }: PressableCardProps) {
  return (
    <Pressable
      className={`bg-ink-card border border-ink-border active:border-salmon active:opacity-90 rounded-2xl p-4 ${
        className ?? ''
      }`}
      {...rest}
    >
      {children}
    </Pressable>
  );
}
