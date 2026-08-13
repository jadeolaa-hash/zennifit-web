import { Pressable, Text, ActivityIndicator, PressableProps } from 'react-native';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

type Props = PressableProps & {
  label: string;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-2',
  md: 'px-5 py-3.5',
  lg: 'px-6 py-4',
};

const textSizeClasses: Record<Size, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  loading,
  icon,
  fullWidth,
  disabled,
  className,
  ...rest
}: Props) {
  const isDisabled = disabled || loading;

  const base = 'rounded-full flex-row items-center justify-center gap-2 active:opacity-80';
  const variantClasses: Record<Variant, string> = {
    primary: 'bg-salmon',
    secondary: 'bg-ink-card border border-ink-border',
    outline: 'bg-transparent border border-salmon',
    ghost: 'bg-transparent',
  };
  const textVariantClasses: Record<Variant, string> = {
    primary: 'text-ink font-bold',
    secondary: 'text-fg font-semibold',
    outline: 'text-salmon font-bold',
    ghost: 'text-salmon font-semibold',
  };

  return (
    <Pressable
      disabled={isDisabled}
      className={`${base} ${variantClasses[variant]} ${sizeClasses[size]} ${
        fullWidth ? 'w-full' : ''
      } ${isDisabled ? 'opacity-50' : ''} ${className ?? ''}`}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#121214' : '#FF6B5B'} />
      ) : (
        <>
          {icon}
          <Text className={`${textVariantClasses[variant]} ${textSizeClasses[size]}`}>
            {label}
          </Text>
        </>
      )}
    </Pressable>
  );
}
